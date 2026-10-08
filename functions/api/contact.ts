/**
 * POST /api/contact
 *
 * Contact form handler (Cloudflare Pages Function).
 * Browser → this function → Turnstile siteverify → Infomaniak SMTP
 * (mail.infomaniak.com:587, STARTTLS, authenticated) → swiss_contact@arklens.ch.
 * Port 25 is never used.
 *
 * Secrets / vars (never in client code):
 *   TURNSTILE_SECRET_KEY      Turnstile widget secret
 *   TURNSTILE_HOSTNAMES       (var) Comma-separated frontend hostnames accepted from siteverify
 *   INFOMANIAK_SMTP_USER      The real Infomaniak mailbox (not the swiss_contact alias)
 *   INFOMANIAK_SMTP_PASSWORD  Infomaniak device password
 * Bindings:
 *   RATE_LIMIT                KV namespace used for basic per-IP rate limiting
 */

import { WorkerMailer, LogLevel, type EmailOptions, type WorkerMailerOptions } from 'worker-mailer';
import { CONTACT_REASONS, CONTACT_LANGS, CONTACT_LIMITS, TURNSTILE_ACTION } from '../../src/lib/contact';

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
  INFOMANIAK_SMTP_USER?: string;
  INFOMANIAK_SMTP_PASSWORD?: string;
  RATE_LIMIT?: KV;
  /** Local development only (.dev.vars). Never set in production. */
  TURNSTILE_ALLOW_TEST_KEYS?: string;
}

interface Ctx {
  request: Request;
  env: Env;
  waitUntil(promise: Promise<unknown>): void;
}

const REASONS = CONTACT_REASONS;
const LIMITS = CONTACT_LIMITS;

const RATE = { windowSeconds: 600, max: 5 };
const MIN_FILL_MS = 3000;

// Not secret: fixed by the business. Credentials come from env only.
const SMTP_HOST = 'mail.infomaniak.com';
const SMTP_PORT = 587;
const MAIL_FROM = { name: 'Arklens Website', email: 'swiss_contact@arklens.ch' };
const MAIL_TO = 'swiss_contact@arklens.ch';
const SUBJECT_BUSINESS_MAX = 80; // keeps the RFC 2047-encoded Subject well under 998 chars; full name is in the body

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
class StrictTlsMailer extends MailerBase {
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

// Pragmatic address check: one @, no spaces, dotted domain with a 2+ letter TLD.
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const PHONE_RE = /^[0-9+()./\s-]{5,40}$/;

type Fields = {
  name: string;
  business: string;
  email: string;
  reason: (typeof REASONS)[number];
  message: string;
  phone: string;
  website: string;
  page: string;
  lang: (typeof CONTACT_LANGS)[number];
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

// One generic error for every failure the visitor cannot fix themselves.
const fail = (status = 400) => json(status, { ok: false, error: 'send_failed' });

/** Single-line text: strip control chars (incl. CR/LF, which prevents header injection), collapse whitespace. */
function cleanLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Multi-line text: keep newlines, strip other control chars, normalise line endings. */
function cleanText(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normaliseUrl(value: string): string | null {
  if (!value) return '';
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.') || url.username || url.password) return null;
    return url.toString().slice(0, LIMITS.website);
  } catch {
    return null;
  }
}

function parseFields(raw: Record<string, unknown>): { fields?: Fields; invalid?: string[] } {
  const invalid: string[] = [];

  const name = cleanLine(raw.name, LIMITS.name);
  const business = cleanLine(raw.business, LIMITS.business);
  const email = cleanLine(raw.email, LIMITS.email + 1).toLowerCase();
  const reasonRaw = cleanLine(raw.reason, 60);
  const message = cleanText(raw.message, LIMITS.message + 1);
  const phone = cleanLine(raw.phone, LIMITS.phone + 1);
  const websiteRaw = cleanLine(raw.website, LIMITS.website + 1);
  const page = cleanLine(raw.page, LIMITS.page).replace(/[^A-Za-z0-9/_\-.?=&%#]/g, '') || '/contact';
  const langRaw = cleanLine(raw.lang, 5).toLowerCase();
  const lang = CONTACT_LANGS.find((l) => l === langRaw) ?? 'en';

  if (name.length < 2) invalid.push('name');
  if (business.length < 2) invalid.push('business');
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) invalid.push('email');
  const reason = REASONS.find((r) => r === reasonRaw);
  if (!reason) invalid.push('reason');
  if (message.length < LIMITS.messageMin || message.length > LIMITS.message) invalid.push('message');
  if (phone && (phone.length > LIMITS.phone || !PHONE_RE.test(phone))) invalid.push('phone');
  const website = normaliseUrl(websiteRaw);
  if (website === null || websiteRaw.length > LIMITS.website) invalid.push('website');

  if (invalid.length || !reason) return { invalid };
  return { fields: { name, business, email, reason, message, phone, website: website ?? '', page, lang } };
}

async function verifyTurnstile(token: unknown, ip: string, env: Env): Promise<boolean> {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? '').split(',').map((h) => h.trim()).filter(Boolean),
  );
  if (!env.TURNSTILE_SECRET_KEY || hostnames.size === 0) return false;
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    if (!res.ok) return false;
    const result = (await res.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
      metadata?: { result_with_testing_key?: boolean };
    };
    // Cloudflare test keys return no action; accept them only when explicitly enabled for local dev.
    if (env.TURNSTILE_ALLOW_TEST_KEYS === 'true' && result.metadata?.result_with_testing_key) {
      return result.success === true && hostnames.has(result.hostname ?? '');
    }
    return result.success === true && result.action === TURNSTILE_ACTION && hostnames.has(result.hostname ?? '');
  } catch {
    return false; // fail closed
  }
}

/** Basic fixed-window rate limit per IP. Returns true when the request may proceed. */
async function allowRequest(ip: string, env: Env): Promise<boolean> {
  if (!env.RATE_LIMIT) return true; // binding missing: Turnstile remains the primary control
  const data = new TextEncoder().encode(`arklens-contact:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const key = 'rl:' + [...new Uint8Array(digest)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
  const now = Math.floor(Date.now() / 1000);

  try {
    const stored = await env.RATE_LIMIT.get(key);
    const state = stored ? (JSON.parse(stored) as { count: number; reset: number }) : null;
    const current = state && state.reset > now ? state : { count: 0, reset: now + RATE.windowSeconds };
    if (current.count >= RATE.max) return false;
    current.count += 1;
    await env.RATE_LIMIT.put(key, JSON.stringify(current), {
      expirationTtl: Math.max(60, current.reset - now),
    });
    return true;
  } catch {
    return true; // never block legitimate visitors because KV is unavailable
  }
}

function buildEmail(f: Fields, submittedAt: Date) {
  const zurichTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Zurich',
  }).format(submittedAt);

  const rows: [string, string][] = [
    ['Name', f.name],
    ['Business / organisation', f.business],
    ['Email', f.email],
    ...(f.phone ? [['Phone', f.phone] as [string, string]] : []),
    ...(f.website ? [['Website URL', f.website] as [string, string]] : []),
    ['Reason', f.reason],
    ['Submitted', `${submittedAt.toISOString()} (${zurichTime} Europe/Zurich)`],
    ['Website language', f.lang.toUpperCase()],
    ['Source page', f.page],
  ];

  const businessChars = Array.from(f.business); // code points, so surrogate pairs aren't split
  const subjectBusiness =
    businessChars.length > SUBJECT_BUSINESS_MAX
      ? businessChars.slice(0, SUBJECT_BUSINESS_MAX - 1).join('').trimEnd() + '…'
      : f.business;
  const subject = cleanLine(`[ARKLENS CONTACT] ${f.reason} — ${subjectBusiness}`, 200);

  const text = [
    'New contact form submission from arklens.ch',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    f.message,
    '',
    '—',
    'Reply to this email to answer the sender directly.',
  ].join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#111418">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #E6EAF0;border-collapse:collapse">
<tr><td style="padding:20px 24px;border-bottom:2px solid #D52B1E;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4F5B68">Arklens contact form</td></tr>
<tr><td style="padding:8px 24px 0"><table role="presentation" width="100%" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #E6EAF0;font-size:13px;color:#4F5B68;width:160px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E6EAF0;font-size:14px;vertical-align:top">${escapeHtml(v)}</td></tr>`,
  )
  .join('\n')}
</table></td></tr>
<tr><td style="padding:20px 24px 4px;font-size:13px;color:#4F5B68">Message</td></tr>
<tr><td style="padding:0 24px 24px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(f.message)}</td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #E6EAF0;font-size:12px;color:#66727F">Reply to this email to answer the sender directly.</td></tr>
</table></body></html>`;

  return { subject, text, html };
}

async function sendEmail(f: Fields, env: Env): Promise<boolean> {
  const username = env.INFOMANIAK_SMTP_USER;
  const password = env.INFOMANIAK_SMTP_PASSWORD;
  if (!username || !password) return false;
  const { subject, text, html } = buildEmail(f, new Date());

  let mailer: StrictTlsMailer | undefined;
  try {
    mailer = await StrictTlsMailer.connect({
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
    // Reply-To: bare address, already EMAIL_RE-validated and CR/LF-free.
    await mailer.send({ from: MAIL_FROM, to: MAIL_TO, reply: f.email, subject, text, html });
    return true;
  } catch (e) {
    // Error class only: SMTP error messages can echo server text.
    console.error(JSON.stringify({ event: 'contact_send_failed', error: e instanceof Error ? e.name : 'unknown' }));
    return false;
  } finally {
    await mailer?.close().catch(() => {});
  }
}

function isAllowedOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    const allowed = new Set(
      (env.TURNSTILE_HOSTNAMES ?? '').split(',').map((h) => h.trim()).filter(Boolean),
    );
    allowed.add(new URL(request.url).hostname);
    return allowed.has(host);
  } catch {
    return false;
  }
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  try {
    if (!isAllowedOrigin(request, env)) return fail(403);
    if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) return fail(415);

    const length = Number(request.headers.get('Content-Length') ?? '0');
    if (length > LIMITS.body) return fail(413);
    const bodyText = await request.text();
    if (bodyText.length > LIMITS.body) return fail(413);

    let raw: Record<string, unknown>;
    try {
      const parsed = JSON.parse(bodyText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail(400);
      raw = parsed as Record<string, unknown>;
    } catch {
      return fail(400);
    }

    // Honeypot and fill-time trap: pretend success so bots learn nothing.
    const startedAt = Number(raw.started_at);
    if (cleanLine(raw.company_url, 200) !== '' || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
      return json(200, { ok: true });
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    if (!(await allowRequest(ip, env))) return json(429, { ok: false, error: 'rate_limited' });

    const { fields, invalid } = parseFields(raw);
    if (!fields) return json(422, { ok: false, error: 'invalid', fields: invalid });

    if (!(await verifyTurnstile(raw.turnstile_token, ip, env))) {
      return json(403, { ok: false, error: 'verification_failed' });
    }

    if (!(await sendEmail(fields, env))) return fail(502);

    return json(200, { ok: true });
  } catch {
    return fail(500);
  }
};

// Anything other than POST
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
