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
// Deliver to the real mailbox: alias-to-same-alias mail was accepted (250) but never reached the inbox.
const MAIL_TO = 'ben.beh@arklens.ch';
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
  greet(): Promise<void>;
  ehlo(): Promise<void>;
  tls(): Promise<void>;
  auth(): Promise<void>;
  mail(): Promise<void>;
  rcpt(): Promise<void>;
  data(): Promise<void>;
  body(): Promise<void>;
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
  // TEMPORARY diagnostics: SMTP stage + 3-digit reply code only. Never server text,
  // credentials, addresses or message content.
  stage = 'connect';
  readonly trace: { stage: string; code: string }[] = [];

  /** Opens the session (connect, EHLO, STARTTLS, AUTH). Construct first so the trace survives failures. */
  async open(): Promise<void> {
    try {
      await this.initializeSmtpSession();
    } catch (e) {
      await this.socket.close().catch(() => {});
      throw e;
    }
    // Errors per message surface through send(); never log server text here.
    this.start().catch(() => {});
  }

  private async step(stage: string, fn: () => Promise<void>): Promise<void> {
    this.stage = stage;
    await fn();
  }

  override greet() { return this.step('greeting', () => super.greet()); }
  override ehlo() { return this.step(this.tlsActive ? 'ehlo_tls' : 'ehlo', () => super.ehlo()); }
  override mail() { return this.step('mail_from', () => super.mail()); }
  override rcpt() { return this.step('rcpt_to', () => super.rcpt()); }
  override data() { return this.step('data', () => super.data()); }
  override body() { return this.step('end_of_data', () => super.body()); }

  override async tls(): Promise<void> {
    await this.step('starttls', () => super.tls());
    this.tlsActive = true;
  }

  override async auth(): Promise<void> {
    this.stage = 'auth';
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
      if (!/^\d+-/.test(lines[lines.length - 2])) {
        this.trace.push({ stage: this.stage, code: /^\d{3}/.exec(lines[lines.length - 2] ?? '')?.[0] ?? '???' });
        return response;
      }
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

/**
 * 'ok'      token valid for this action and hostname
 * 'expired' Siteverify reported timeout-or-duplicate (token older than 5 min or already used):
 *           the visitor can fix this by getting a fresh token
 * 'failed'  anything else (missing config, invalid token, wrong hostname/action, network): fail closed
 */
type TurnstileResult = 'ok' | 'expired' | 'failed';

async function verifyTurnstile(token: unknown, ip: string, env: Env): Promise<TurnstileResult> {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? '').split(',').map((h) => h.trim()).filter(Boolean),
  );
  if (!env.TURNSTILE_SECRET_KEY || hostnames.size === 0) {
    console.error(JSON.stringify({ event: 'turnstile_misconfigured' })); // names only, no values
    return 'failed';
  }
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) return 'failed';

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    if (!res.ok) return 'failed';
    const result = (await res.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
      'error-codes'?: string[];
      metadata?: { result_with_testing_key?: boolean };
    };
    if (result.success !== true) {
      const codes = Array.isArray(result['error-codes']) ? result['error-codes'] : [];
      // Log Cloudflare's error codes only (no token, no IP) so failures are diagnosable.
      console.error(JSON.stringify({ event: 'turnstile_rejected', codes: codes.slice(0, 5) }));
      return codes.includes('timeout-or-duplicate') ? 'expired' : 'failed';
    }
    // Cloudflare test keys return no action; accept them only when explicitly enabled for local dev.
    const actionOk =
      (env.TURNSTILE_ALLOW_TEST_KEYS === 'true' && result.metadata?.result_with_testing_key) ||
      result.action === TURNSTILE_ACTION;
    if (!actionOk || !hostnames.has(result.hostname ?? '')) {
      console.error(JSON.stringify({ event: 'turnstile_mismatch', hostnameAllowed: hostnames.has(result.hostname ?? ''), actionOk: Boolean(actionOk) }));
      return 'failed';
    }
    return 'ok';
  } catch {
    return 'failed'; // fail closed
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

const CONFIRM_FROM = { name: 'Arklens', email: 'swiss_contact@arklens.ch' };
const CONFIRM_REPLY_TO = 'swiss_contact@arklens.ch';

/** Visitor acknowledgement copy. No form content beyond the first name; no tracking. */
const CONFIRM_COPY: Record<Fields['lang'], {
  subject: string; greeting: string; lines: string[]; closing: string; tagline: string;
}> = {
  en: {
    subject: 'We received your message — Arklens',
    greeting: 'Hi',
    lines: ['Thank you for contacting Arklens.', 'We’ve received your message and will get back to you as soon as possible.'],
    closing: 'Best regards,',
    tagline: 'Smarter technology for Swiss SMEs.',
  },
  fr: {
    subject: 'Nous avons bien reçu votre message — Arklens',
    greeting: 'Bonjour',
    lines: ['Merci d’avoir contacté Arklens.', 'Nous avons bien reçu votre message et nous vous répondrons dès que possible.'],
    closing: 'Meilleures salutations,',
    tagline: 'Des technologies plus intelligentes pour les PME suisses.',
  },
  de: {
    subject: 'Wir haben Ihre Nachricht erhalten — Arklens',
    greeting: 'Guten Tag',
    lines: ['Vielen Dank für Ihre Nachricht an Arklens.', 'Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich bei Ihnen.'],
    closing: 'Freundliche Grüsse',
    tagline: 'Intelligente Technologien für Schweizer KMU.',
  },
  it: {
    subject: 'Abbiamo ricevuto il tuo messaggio — Arklens',
    greeting: 'Buongiorno',
    lines: ['Grazie per aver contattato Arklens.', 'Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.'],
    closing: 'Cordiali saluti,',
    tagline: 'Tecnologie intelligenti per le PMI svizzere.',
  },
};

function buildConfirmation(f: Fields) {
  const c = CONFIRM_COPY[f.lang] ?? CONFIRM_COPY.en;
  // Full submitted name (already validated and single-line): no guessing at first names or titles.
  const greetingLine = f.name ? `${c.greeting} ${f.name},` : `${c.greeting},`;

  const text = [greetingLine, '', ...c.lines.flatMap((l) => [l, '']), c.closing, '', 'Arklens', c.tagline, 'arklens.ch'].join('\n');

  const p = 'margin:0 0 16px;font-size:15px;line-height:1.6';
  const html = `<!doctype html><html lang="${f.lang}"><body style="margin:0;padding:24px;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#111418">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E6EAF0;border-collapse:collapse">
<tr><td style="padding:20px 28px;border-bottom:2px solid #D52B1E;font-size:13px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#111418">Arklens</td></tr>
<tr><td style="padding:28px 28px 8px">
<p style="${p}">${escapeHtml(greetingLine)}</p>
${c.lines.map((l) => `<p style="${p}">${escapeHtml(l)}</p>`).join('\n')}
<p style="margin:24px 0 0;font-size:15px;line-height:1.6">${escapeHtml(c.closing)}</p>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6"><strong>Arklens</strong></p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E6EAF0;font-size:12px;line-height:1.6;color:#66727F">${escapeHtml(c.tagline)}<br>arklens.ch</td></tr>
</table></body></html>`;

  return { subject: c.subject, text, html };
}

async function sendEmail(f: Fields, env: Env): Promise<boolean> {
  const username = env.INFOMANIAK_SMTP_USER;
  const password = env.INFOMANIAK_SMTP_PASSWORD;
  if (!username || !password) return false;
  const { subject, text, html } = buildEmail(f, new Date());

  let mailer: StrictTlsMailer | undefined;
  let result: 'sent' | 'failed' = 'failed';
  let errorName = '';
  let confirmation: 'sent' | 'failed' | 'skipped' = 'skipped';
  let internalTraceEnd = -1;
  try {
    mailer = new StrictTlsMailer({
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
    await mailer.open();
    // Reply-To: bare address, already EMAIL_RE-validated and CR/LF-free.
    // 1. Internal notification (primary). If this fails, the form submission fails.
    await mailer.send({ from: MAIL_FROM, to: MAIL_TO, reply: f.email, subject, text, html });
    result = 'sent';
    internalTraceEnd = mailer.trace.length;

    // 2. Visitor acknowledgement, only after the internal mail was accepted.
    //    Its failure never fails the submission (avoids duplicate resubmissions).
    try {
      const confirm = buildConfirmation(f);
      await mailer.send({ from: CONFIRM_FROM, to: f.email, reply: CONFIRM_REPLY_TO, ...confirm });
      confirmation = 'sent';
    } catch (e) {
      confirmation = 'failed';
      console.error(JSON.stringify({ event: 'confirmation_email_failed', error: e instanceof Error ? e.name : 'unknown' }));
    }
    return true;
  } catch (e) {
    // Error class only: SMTP error messages can echo server text.
    errorName = e instanceof Error ? e.name : 'unknown';
    console.error(JSON.stringify({ event: 'contact_send_failed', error: errorName }));
    return false;
  } finally {
    const failedStage =
      result === 'failed' || confirmation === 'failed' ? mailer?.stage ?? 'construct' : undefined;
    const all = mailer ? [...mailer.trace] : [];
    const trace = internalTraceEnd >= 0 ? all.slice(0, internalTraceEnd) : all;
    const confirmationTrace = internalTraceEnd >= 0 ? all.slice(internalTraceEnd) : [];
    if (mailer) mailer.stage = 'quit';
    await mailer?.close().catch(() => {});
    // TEMPORARY diagnostics: stages and reply codes only.
    console.log(JSON.stringify({
      event: 'smtp_trace', result, confirmation, failedStage, error: errorName || undefined, trace, confirmationTrace,
    }));
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
    const trap =
      cleanLine(raw.company_url, 200) !== '' ? 'honeypot_filled'
      : !Number.isFinite(startedAt) ? 'no_started_at'
      : Date.now() - startedAt < MIN_FILL_MS ? 'too_fast'
      : '';
    if (trap) {
      console.log(JSON.stringify({ event: 'contact_trap', category: trap })); // TEMPORARY diagnostics
      return json(200, { ok: true });
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    if (!(await allowRequest(ip, env))) return json(429, { ok: false, error: 'rate_limited' });

    const { fields, invalid } = parseFields(raw);
    if (!fields) return json(422, { ok: false, error: 'invalid', fields: invalid });

    const turnstile = await verifyTurnstile(raw.turnstile_token, ip, env);
    if (turnstile === 'expired') return json(403, { ok: false, error: 'verification_expired' });
    if (turnstile !== 'ok') return json(403, { ok: false, error: 'verification_failed' });
    console.log(JSON.stringify({ event: 'turnstile_ok' })); // TEMPORARY diagnostics

    if (!(await sendEmail(fields, env))) return fail(502);

    return json(200, { ok: true });
  } catch {
    return fail(500);
  }
};

// Anything other than POST
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
