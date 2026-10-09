/**
 * Infomaniak SMTP connection with mandatory STARTTLS.
 * StrictTlsMailer is copied verbatim from functions/api/contact.ts (which stays
 * untouched). Port 25 is never used.
 */

import { WorkerMailer, LogLevel, type EmailOptions, type WorkerMailerOptions } from 'worker-mailer';

// Not secret: fixed by the business. Credentials come from env only.
export const SMTP_HOST = 'mail.infomaniak.com';
export const SMTP_PORT = 587;

export interface SmtpEnv {
  INFOMANIAK_SMTP_USER?: string;
  INFOMANIAK_SMTP_PASSWORD?: string;
}

/**
 * Internals of worker-mailer 1.2.1 (pinned exactly in package.json) that the
 * subclass below relies on. Re-check this shape whenever the version changes.
 */
interface MailerInternals {
  socket: { close(): Promise<void> };
  reader: ReadableStreamDefaultReader<Uint8Array>;
  allowAuth: boolean;
  initializeSmtpSession(): Promise<void>;
  start(): Promise<void>;
  tls(): Promise<void>;
  auth(): Promise<void>;
  read(): Promise<string>;
  send(options: EmailOptions): Promise<void>;
  close(error?: Error): Promise<void>;
}
const MailerBase = WorkerMailer as unknown as new (options: WorkerMailerOptions) => MailerInternals;

/**
 * worker-mailer with mandatory STARTTLS.
 * - The library treats STARTTLS as opportunistic and sends AUTH in cleartext if the
 *   server's EHLO doesn't advertise it (downgrade). Here AUTH refuses to run until
 *   the TLS upgrade has completed, and refuses to skip authentication.
 * - The library's read() spins when the server closes the socket; this one throws.
 * - If the session setup fails, the socket is closed explicitly.
 */
export class StrictTlsMailer extends MailerBase {
  private tlsActive = false;

  static async connect(options: WorkerMailerOptions): Promise<StrictTlsMailer> {
    const mailer = new StrictTlsMailer(options);
    try {
      await mailer.initializeSmtpSession();
    } catch (e) {
      await mailer.socket.close().catch(() => {});
      throw e;
    }
    // Errors per message surface through send(); never log server text here.
    mailer.start().catch(() => {});
    return mailer;
  }

  override async tls(): Promise<void> {
    await super.tls();
    this.tlsActive = true;
  }

  override async auth(): Promise<void> {
    if (!this.tlsActive) throw new Error('STARTTLS not established');
    if (!this.allowAuth) throw new Error('SMTP AUTH not offered');
    await super.auth();
  }

  override async read(): Promise<string> {
    const decoder = new TextDecoder('utf-8');
    let response = '';
    for (;;) {
      const { value, done } = await this.reader.read();
      if (done) throw new Error('SMTP connection closed');
      if (!value) continue;
      response += decoder.decode(value, { stream: true });
      if (!response.endsWith('\n')) continue;
      const lines = response.split(/\r?\n/);
      if (!/^\d+-/.test(lines[lines.length - 2])) return response;
    }
  }
}

/** Authenticated Infomaniak session, or null when the SMTP secrets are missing. */
export async function connectInfomaniak(env: SmtpEnv): Promise<StrictTlsMailer | null> {
  const username = env.INFOMANIAK_SMTP_USER;
  const password = env.INFOMANIAK_SMTP_PASSWORD;
  if (!username || !password) return null;
  return StrictTlsMailer.connect({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    startTls: true,
    credentials: { username, password },
    authType: ['plain', 'login'],
    // Higher levels log raw SMTP traffic, including base64 AUTH.
    logLevel: LogLevel.NONE,
    socketTimeoutMs: 10_000,
    responseTimeoutMs: 10_000,
  });
}
