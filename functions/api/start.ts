/**
 * POST /api/start
 *
 * /start/ application handler (Cloudflare Pages Function).
 * Browser → this function → Turnstile siteverify (action 'start') → Infomaniak SMTP
 * (mail.infomaniak.com:587, STARTTLS, authenticated):
 *   1. internal application email to ben.beh@arklens.ch (authoritative record,
 *      including the LEGAL ACCEPTANCE section), then
 *   2. localised confirmation to the applicant.
 * No database or KV record is written; KV is used for rate-limit counters only.
 * Logic lives in functions/_lib/start-handler.ts.
 *
 * Secrets / vars (never in client code):
 *   TURNSTILE_SECRET_KEY      Turnstile widget secret
 *   TURNSTILE_HOSTNAMES       (var) Comma-separated frontend hostnames accepted from siteverify
 *   INFOMANIAK_SMTP_USER      The real Infomaniak mailbox (not the swiss_contact alias)
 *   INFOMANIAK_SMTP_PASSWORD  Infomaniak device password
 * Bindings:
 *   RATE_LIMIT                KV namespace used for basic per-IP rate limiting
 */

import { connectInfomaniak } from '../_lib/mailer';
import { handleStart, type StartEnv } from '../_lib/start-handler';

interface Ctx {
  request: Request;
  env: StartEnv;
  waitUntil(promise: Promise<unknown>): void;
}

export const onRequestPost = ({ request, env }: Ctx): Promise<Response> =>
  handleStart(request, env, { connectMailer: connectInfomaniak });

// Anything other than POST
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
