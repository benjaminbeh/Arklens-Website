/**
 * POST /api/experience
 *
 * Arklens Experience Programme application handler (Cloudflare Pages Function).
 * Browser → this function → Turnstile siteverify (action 'experience') → Infomaniak SMTP
 * (mail.infomaniak.com:587, STARTTLS, authenticated):
 *   1. internal application email to ben.beh@arklens.ch (authoritative record), then
 *   2. localised confirmation to the applicant.
 * No database or KV record is written; KV is used for rate-limit counters only.
 * No file uploads. Logic lives in functions/_lib/experience-handler.ts.
 *
 * Uses the same secrets/bindings as /api/start:
 *   TURNSTILE_SECRET_KEY, TURNSTILE_HOSTNAMES (var), INFOMANIAK_SMTP_USER,
 *   INFOMANIAK_SMTP_PASSWORD, RATE_LIMIT (KV).
 */
import { connectInfomaniak } from '../_lib/mailer';
import { handleExperience, type ExperienceEnv } from '../_lib/experience-handler';
interface Ctx {
  request: Request;
  env: ExperienceEnv;
  waitUntil(promise: Promise<unknown>): void;
}
export const onRequestPost = ({ request, env }: Ctx): Promise<Response> =>
  handleExperience(request, env, { connectMailer: connectInfomaniak });
// Anything other than POST
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
