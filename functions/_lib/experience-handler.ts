/**
 * /api/experience request handling (Experience Programme applications), separated
 * from the route so it can be tested in Node with a fake mailer, clock and RNG.
 * Same security pipeline and mail order as /api/start (functions/_lib/start-handler.ts):
 * origin → content type → size → JSON → honeypot/fill-time → rate limit → validation
 * → Turnstile → internal email (authoritative) → applicant confirmation (best effort).
 *
 * Expectations acknowledgement (strict): only the JSON boolean `true` in
 * `expectationsAccepted` counts. The timestamp, application ID and acknowledgement
 * version are generated here; client-supplied values are ignored.
 */

import { CONTACT_LANGS } from '../../src/lib/contact';
import {
  TURNSTILE_ACTION_EXPERIENCE,
  XP_ACK_VERSION,
  XP_INTERESTS,
  XP_LANGUAGES,
  XP_LEVELS,
  XP_LIMITS,
  XP_MODE,
  XP_SITUATIONS,
  XP_START,
  XP_TIME,
  type XpInterest,
  type XpLanguage,
  type XpLevel,
} from '../../src/lib/experience-apply';
import {
  EMAIL_RE,
  allowRequest,
  cleanLine,
  cleanText,
  isAllowedOrigin,
  json,
  normaliseUrl,
  verifyTurnstile,
  type BaseEnv,
} from './security';
import { buildExperienceConfirmation, buildExperienceEmail, type ExperienceApplication, type ExperienceRecord } from './experience-email';
import type { Mailer } from './start-handler';

export interface ExperienceEnv extends BaseEnv {
  INFOMANIAK_SMTP_USER?: string;
  INFOMANIAK_SMTP_PASSWORD?: string;
}

export interface ExperienceDeps {
  /** Resolves to null when SMTP is not configured. */
  connectMailer(env: ExperienceEnv): Promise<Mailer | null>;
  now?(): Date;
  randomBytes?(n: number): Uint8Array;
}

const MIN_FILL_MS = 3000;
const RATE_PREFIX = 'arklens-experience:';
// Higher than /api/start: schools, universities and workplaces may share one external IP.
const RATE = { windowSeconds: 600, max: 10 };

// Same sender/recipient setup as /api/start.
const MAIL_FROM = { name: 'Arklens Website', email: 'swiss_contact@arklens.ch' };
const MAIL_TO = 'ben.beh@arklens.ch';
const CONFIRM_FROM = { name: 'Arklens', email: 'swiss_contact@arklens.ch' };
const CONFIRM_REPLY_TO = 'swiss_contact@arklens.ch';

const fail = (status = 400) => json(status, { ok: false, error: 'send_failed' });
const defaultRandomBytes = (n: number) => crypto.getRandomValues(new Uint8Array(n));

/** EXP-YYYYMMDD-XXXXXXXX: UTC date + 8 uppercase hex chars from 4 random bytes. Server-side only. */
export function makeExperienceId(now: Date, randomBytes: (n: number) => Uint8Array = defaultRandomBytes): string {
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = [...randomBytes(4)].map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `EXP-${date}-${suffix}`;
}

const oneOf = <T extends readonly string[]>(list: T, value: unknown): T[number] | undefined => {
  const v = cleanLine(value, 30);
  return list.find((x) => x === v);
};

export function parseExperience(raw: Record<string, unknown>): { app?: ExperienceApplication; invalid?: string[] } {
  const invalid: string[] = [];
  const L = XP_LIMITS;

  const name = cleanLine(raw.name, L.name + 1);
  if (name.length < 2 || name.length > L.name) invalid.push('name');

  const email = cleanLine(raw.email, L.email + 1).toLowerCase();
  if (email.length > L.email || !EMAIL_RE.test(email)) invalid.push('email');

  const region = cleanLine(raw.region, L.region + 1);
  if (region.length > L.region) invalid.push('region');

  // Languages: { en?: level, fr?: level, ... }. Unknown keys or levels are rejected.
  const languages: Partial<Record<XpLanguage, XpLevel>> = {};
  let languagesOk = true;
  const langRaw = raw.languages;
  if (langRaw && typeof langRaw === 'object' && !Array.isArray(langRaw)) {
    for (const [k, v] of Object.entries(langRaw as Record<string, unknown>)) {
      const code = XP_LANGUAGES.find((c) => c === k);
      const level = oneOf(XP_LEVELS, v);
      if (!code || !level) { languagesOk = false; continue; }
      languages[code] = level;
    }
  } else if (langRaw !== undefined) {
    languagesOk = false;
  }

  const otherLanguage = cleanLine(raw.otherLanguage, L.otherLanguage + 1);
  const otherLevelRaw = cleanLine(raw.otherLanguageLevel, 30);
  const otherLanguageLevel = otherLevelRaw ? oneOf(XP_LEVELS, otherLevelRaw) : '';
  // Both or neither.
  if (otherLanguage.length > L.otherLanguage || otherLanguageLevel === undefined || Boolean(otherLanguage) !== Boolean(otherLanguageLevel)) {
    invalid.push('otherLanguage');
  }
  const languageCount = Object.keys(languages).length + (otherLanguage && otherLanguageLevel ? 1 : 0);
  if (!languagesOk || languageCount === 0) invalid.push('languages');

  const situationRaw = cleanLine(raw.situation, 30);
  const situation = situationRaw ? oneOf(XP_SITUATIONS, situationRaw) : '';
  if (situation === undefined) invalid.push('situation');

  const interests: XpInterest[] = [];
  if (Array.isArray(raw.interests) && raw.interests.length <= XP_INTERESTS.length) {
    for (const v of raw.interests) {
      const i = oneOf(XP_INTERESTS, v);
      if (!i) { interests.length = 0; break; }
      if (!interests.includes(i)) interests.push(i);
    }
  }
  if (interests.length === 0) invalid.push('interests');

  const skills = cleanText(raw.skills, L.skills + 1);
  if (skills.length < L.textMin || skills.length > L.skills) invalid.push('skills');

  const learn = cleanText(raw.learn, L.learn + 1);
  if (learn.length < L.textMin || learn.length > L.learn) invalid.push('learn');

  const start = oneOf(XP_START, raw.start);
  if (!start) invalid.push('start');
  const time = oneOf(XP_TIME, raw.time);
  if (!time) invalid.push('time');
  const modeRaw = cleanLine(raw.mode, 30);
  const mode = modeRaw ? oneOf(XP_MODE, modeRaw) : '';
  if (mode === undefined) invalid.push('mode');

  // Up to two optional links; each must be a valid http(s) URL when given.
  const links: string[] = [];
  const linksRaw = Array.isArray(raw.links) ? raw.links : [];
  if (linksRaw.length > L.links) invalid.push('links');
  linksRaw.slice(0, L.links).forEach((v, i) => {
    const s = cleanLine(v, L.url + 1);
    if (!s) return;
    const url = normaliseUrl(s, L.url);
    if (!url || s.length > L.url) invalid.push(`link${i + 1}`);
    else links.push(url);
  });

  if (raw.expectationsAccepted !== true) invalid.push('expectationsAccepted');

  const page = cleanLine(raw.page, L.page).replace(/[^A-Za-z0-9/_\-.?=&%#]/g, '') || '/experience/apply';
  const langCode = cleanLine(raw.lang, 5).toLowerCase();
  const lang = CONTACT_LANGS.find((l) => l === langCode) ?? 'en';

  if (invalid.length || !start || !time || situation === undefined || mode === undefined || otherLanguageLevel === undefined) {
    return { invalid };
  }
  return {
    app: {
      name, email, region, languages, otherLanguage, otherLanguageLevel, situation, interests,
      skills, learn, start, time, mode, links, page, lang,
    },
  };
}

export async function handleExperience(request: Request, env: ExperienceEnv, deps: ExperienceDeps): Promise<Response> {
  const clock = deps.now ?? (() => new Date());
  try {
    if (!isAllowedOrigin(request, env)) return fail(403);
    if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) return fail(415);

    const length = Number(request.headers.get('Content-Length') ?? '0');
    if (length > XP_LIMITS.body) return fail(413);
    const bodyText = await request.text();
    if (bodyText.length > XP_LIMITS.body) return fail(413);

    let raw: Record<string, unknown>;
    try {
      const parsed = JSON.parse(bodyText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail(400);
      raw = parsed as Record<string, unknown>;
    } catch {
      return fail(400);
    }

    // Honeypot and fill-time trap: pretend success so bots learn nothing (no ID, no mail).
    const startedAt = Number(raw.started_at);
    const elapsed = clock().getTime() - startedAt;
    const tooFast = elapsed >= 0 && elapsed < MIN_FILL_MS;
    if (cleanLine(raw.company_url, 200) !== '' || !Number.isFinite(startedAt) || tooFast) {
      return json(200, { ok: true });
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    if (!(await allowRequest(ip, env, RATE_PREFIX, RATE))) return json(429, { ok: false, error: 'rate_limited' });

    const { app, invalid } = parseExperience(raw);
    if (!app) return json(422, { ok: false, error: 'invalid', fields: invalid });

    const turnstile = await verifyTurnstile(raw.turnstile_token, ip, env, TURNSTILE_ACTION_EXPERIENCE);
    if (turnstile === 'expired') return json(403, { ok: false, error: 'verification_expired' });
    if (turnstile !== 'ok') return json(403, { ok: false, error: 'verification_failed' });

    const now = clock();
    const record: ExperienceRecord = {
      applicationId: makeExperienceId(now, deps.randomBytes),
      submittedAt: now.toISOString(),
      expectationsAccepted: true,
      ackVersion: XP_ACK_VERSION,
    };

    let mailer: Mailer | null = null;
    let confirmationSent = false;
    try {
      mailer = await deps.connectMailer(env);
      if (!mailer) {
        console.error(JSON.stringify({ event: 'experience_send_failed', error: 'config' }));
        return fail(502);
      }
      // 1. Internal email = authoritative record. If this fails, the submission fails.
      const internal = buildExperienceEmail(app, record, now);
      await mailer.send({ from: MAIL_FROM, to: MAIL_TO, reply: app.email, ...internal });

      // 2. Applicant confirmation; its failure never fails the submission (avoids duplicates).
      try {
        const confirm = buildExperienceConfirmation(app.name, app.lang, record.applicationId, now);
        await mailer.send({ from: CONFIRM_FROM, to: app.email, reply: CONFIRM_REPLY_TO, ...confirm });
        confirmationSent = true;
      } catch (e) {
        console.error(JSON.stringify({ event: 'experience_confirmation_email_failed', error: e instanceof Error ? e.name : 'unknown' }));
      }
    } catch (e) {
      console.error(JSON.stringify({ event: 'experience_send_failed', error: e instanceof Error ? e.name : 'unknown' }));
      return fail(502);
    } finally {
      await mailer?.close().catch(() => {});
    }

    return json(200, { ok: true, applicationId: record.applicationId, confirmationSent });
  } catch {
    return fail(500);
  }
}
