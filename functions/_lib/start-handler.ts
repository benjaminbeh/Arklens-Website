/**
 * /api/start request handling, separated from the route so it can be tested in
 * Node with a fake mailer, clock and RNG (dependency injection; no test flags).
 * Never imports worker-mailer: functions/api/start.ts wires in the real mailer.
 *
 * Terms acceptance rule (strict): only the JSON boolean `true` in `termsAccepted`
 * counts as acceptance. Missing, false, "true", "on", 1, null, objects, arrays:
 * all rejected with 422 and `termsAccepted` in `fields`.
 * The acceptance timestamp, application ID and legal versions are generated here;
 * any client-supplied `termsAcceptedAt`, `applicationId`, `termsVersion` or
 * `privacyVersion` is ignored.
 */

import { CONTACT_LANGS } from '../../src/lib/contact';
import { PRIVACY_VERSION, TERMS_VERSION } from '../../src/lib/legal';
import {
  START_INDUSTRIES,
  START_LIMITS,
  START_PATHS,
  START_PATHS_NEED_URL,
  TURNSTILE_ACTION_START,
} from '../../src/lib/start';
import {
  EMAIL_RE,
  PHONE_RE,
  allowRequest,
  cleanLine,
  cleanText,
  isAllowedOrigin,
  json,
  normaliseUrl,
  verifyTurnstile,
  type BaseEnv,
} from './security';
import {
  buildApplicantConfirmation,
  buildApplicationEmail,
  type AcceptanceRecord,
  type StartApplication,
} from './start-email';

export interface StartEnv extends BaseEnv {
  INFOMANIAK_SMTP_USER?: string;
  INFOMANIAK_SMTP_PASSWORD?: string;
}

export interface OutgoingMail {
  from: { name: string; email: string };
  to: string;
  reply: string;
  subject: string;
  text: string;
  html: string;
}

export interface Mailer {
  send(mail: OutgoingMail): Promise<void>;
  close(): Promise<void>;
}

export interface StartDeps {
  /** Resolves to null when SMTP is not configured. */
  connectMailer(env: StartEnv): Promise<Mailer | null>;
  now?(): Date;
  randomBytes?(n: number): Uint8Array;
}

const MIN_FILL_MS = 3000;
const RATE_PREFIX = 'arklens-start:';

const MAIL_FROM = { name: 'Arklens Website', email: 'swiss_contact@arklens.ch' };
// Deliver to the real mailbox: alias-to-same-alias mail was accepted (250) but never reached the inbox.
const MAIL_TO = 'ben.beh@arklens.ch';
const CONFIRM_FROM = { name: 'Arklens', email: 'swiss_contact@arklens.ch' };
const CONFIRM_REPLY_TO = 'swiss_contact@arklens.ch';

// One generic error for every failure the visitor cannot fix themselves.
const fail = (status = 400) => json(status, { ok: false, error: 'send_failed' });

const defaultRandomBytes = (n: number) => crypto.getRandomValues(new Uint8Array(n));

/** ARK-YYYYMMDD-XXXXXXXX: UTC date + 8 uppercase hex chars from 4 random bytes. Server-side only. */
export function makeApplicationId(now: Date, randomBytes: (n: number) => Uint8Array = defaultRandomBytes): string {
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = [...randomBytes(4)].map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `ARK-${date}-${suffix}`;
}

export function parseStart(raw: Record<string, unknown>): { app?: StartApplication; invalid?: string[] } {
  const invalid: string[] = [];
  const L = START_LIMITS;

  const pathRaw = cleanLine(raw.path, 20);
  const path = START_PATHS.find((p) => p === pathRaw);
  if (!path) invalid.push('path');

  const needsUrl = (START_PATHS_NEED_URL as readonly string[]).includes(pathRaw);
  let currentWebsite = '';
  if (needsUrl) {
    const websiteRaw = cleanLine(raw.currentWebsite, L.website + 1);
    const website = normaliseUrl(websiteRaw, L.website);
    if (!website || websiteRaw.length > L.website) invalid.push('currentWebsite');
    else currentWebsite = website;
  }

  const businessName = cleanLine(raw.businessName, L.business);
  if (!businessName) invalid.push('businessName');

  const industryRaw = cleanLine(raw.industry, 30);
  const industry = START_INDUSTRIES.find((i) => i === industryRaw);
  if (!industry) invalid.push('industry');

  const goalsRaw = cleanText(raw.goals, L.goals + 1);
  if (goalsRaw.length > L.goals) invalid.push('goals');

  // Same rules as the contact form (min 2, max 100), but over-long input is rejected, not truncated.
  const name = cleanLine(raw.name, L.name + 1);
  if (name.length < 2 || name.length > L.name) invalid.push('name');

  const email = cleanLine(raw.email, L.email + 1).toLowerCase();
  if (email.length > L.email || !EMAIL_RE.test(email)) invalid.push('email');

  const phone = cleanLine(raw.phone, L.phone + 1);
  if (phone && (phone.length > L.phone || !PHONE_RE.test(phone))) invalid.push('phone');

  // Strict: JSON boolean true only.
  if (raw.termsAccepted !== true) invalid.push('termsAccepted');

  const page = cleanLine(raw.page, L.page).replace(/[^A-Za-z0-9/_\-.?=&%#]/g, '') || '/start';
  const langRaw = cleanLine(raw.lang, 5).toLowerCase();
  const lang = CONTACT_LANGS.find((l) => l === langRaw) ?? 'en';

  if (invalid.length || !path || !industry) return { invalid };
  return { app: { path, currentWebsite, businessName, industry, goals: goalsRaw, name, email, phone, page, lang } };
}

export async function handleStart(request: Request, env: StartEnv, deps: StartDeps): Promise<Response> {
  const clock = deps.now ?? (() => new Date());
  try {
    if (!isAllowedOrigin(request, env)) return fail(403);
    if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) return fail(415);

    const length = Number(request.headers.get('Content-Length') ?? '0');
    if (length > START_LIMITS.body) return fail(413);
    const bodyText = await request.text();
    if (bodyText.length > START_LIMITS.body) return fail(413);

    let raw: Record<string, unknown>;
    try {
      const parsed = JSON.parse(bodyText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail(400);
      raw = parsed as Record<string, unknown>;
    } catch {
      return fail(400);
    }

    // Honeypot and fill-time trap: pretend success so bots learn nothing (no ID, no mail).
    // Only a genuinely fast fill (0 <= elapsed < MIN_FILL_MS) is trapped. A negative elapsed means the
    // browser clock is ahead of the server, so it is not treated as spam (Turnstile still runs).
    const startedAt = Number(raw.started_at);
    const elapsed = clock().getTime() - startedAt;
    const tooFast = elapsed >= 0 && elapsed < MIN_FILL_MS;
    if (cleanLine(raw.company_url, 200) !== '' || !Number.isFinite(startedAt) || tooFast) {
      return json(200, { ok: true });
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    if (!(await allowRequest(ip, env, RATE_PREFIX))) return json(429, { ok: false, error: 'rate_limited' });

    const { app, invalid } = parseStart(raw);
    if (!app) return json(422, { ok: false, error: 'invalid', fields: invalid });

    const turnstile = await verifyTurnstile(raw.turnstile_token, ip, env, TURNSTILE_ACTION_START);
    if (turnstile === 'expired') return json(403, { ok: false, error: 'verification_expired' });
    if (turnstile !== 'ok') return json(403, { ok: false, error: 'verification_failed' });

    // Server-generated: timestamp, ID and versions. Client values are never read.
    const now = clock();
    const applicationId = makeApplicationId(now, deps.randomBytes);
    const record: AcceptanceRecord = {
      termsAccepted: true,
      termsAcceptedAt: now.toISOString(),
      termsVersion: TERMS_VERSION,
      privacyVersion: PRIVACY_VERSION,
      language: app.lang,
      email: app.email,
      name: app.name,
      businessName: app.businessName,
      applicationId,
    };

    let mailer: Mailer | null = null;
    let confirmationSent = false;
    try {
      mailer = await deps.connectMailer(env);
      if (!mailer) {
        console.error(JSON.stringify({ event: 'start_send_failed', error: 'config' }));
        return fail(502);
      }
      // 1. Internal application email = authoritative record. If this fails, the submission fails.
      //    Reply-To: bare address, already EMAIL_RE-validated and CR/LF-free.
      const internal = buildApplicationEmail(app, record, now);
      await mailer.send({ from: MAIL_FROM, to: MAIL_TO, reply: app.email, ...internal });

      // 2. Applicant confirmation, only after the internal email was accepted.
      //    Its failure never fails the submission (avoids duplicate resubmissions).
      try {
        const confirm = buildApplicantConfirmation(record, now);
        await mailer.send({ from: CONFIRM_FROM, to: app.email, reply: CONFIRM_REPLY_TO, ...confirm });
        confirmationSent = true;
      } catch (e) {
        console.error(JSON.stringify({ event: 'start_confirmation_email_failed', error: e instanceof Error ? e.name : 'unknown' }));
      }
    } catch (e) {
      // Error class only: SMTP error messages can echo server text.
      console.error(JSON.stringify({ event: 'start_send_failed', error: e instanceof Error ? e.name : 'unknown' }));
      return fail(502);
    } finally {
      await mailer?.close().catch(() => {});
    }

    return json(200, { ok: true, applicationId, confirmationSent });
  } catch {
    return fail(500);
  }
}
