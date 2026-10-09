/**
 * Request-security and sanitising helpers for Pages Functions.
 * Copied from functions/api/contact.ts without behaviour changes (contact.ts is
 * intentionally left untouched); parameterised for the Turnstile action, the
 * rate-limit key prefix and the URL length. `_lib` exports no onRequest*, so
 * Cloudflare Pages creates no route for it.
 */

export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface BaseEnv {
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
  RATE_LIMIT?: KV;
  /** Local development only (.dev.vars). Never set in production. */
  TURNSTILE_ALLOW_TEST_KEYS?: string;
}

export const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

// Pragmatic address check: one @, no spaces, dotted domain with a 2+ letter TLD.
export const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
export const PHONE_RE = /^[0-9+()./\s-]{5,40}$/;

/** Single-line text: strip control chars (incl. CR/LF, which prevents header injection), collapse whitespace. */
export function cleanLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Multi-line text: keep newlines, strip other control chars, normalise line endings. */
export function cleanText(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** '' for empty input, null when invalid, otherwise the normalised URL (max `max` chars). */
export function normaliseUrl(value: string, max: number): string | null {
  if (!value) return '';
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.') || url.username || url.password) return null;
    return url.toString().slice(0, max);
  } catch {
    return null;
  }
}

/**
 * 'ok'      token valid for this action and hostname
 * 'expired' Siteverify reported timeout-or-duplicate (token older than 5 min or already used):
 *           the visitor can fix this by getting a fresh token
 * 'failed'  anything else (missing config, invalid token, wrong hostname/action, network): fail closed
 */
export type TurnstileResult = 'ok' | 'expired' | 'failed';

export async function verifyTurnstile(
  token: unknown,
  ip: string,
  env: BaseEnv,
  expectedAction: string,
): Promise<TurnstileResult> {
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
      result.action === expectedAction;
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
export async function allowRequest(
  ip: string,
  env: BaseEnv,
  prefix: string,
  rate = { windowSeconds: 600, max: 5 },
): Promise<boolean> {
  if (!env.RATE_LIMIT) return true; // binding missing: Turnstile remains the primary control
  const data = new TextEncoder().encode(`${prefix}${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const key = 'rl:' + [...new Uint8Array(digest)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
  const now = Math.floor(Date.now() / 1000);

  try {
    const stored = await env.RATE_LIMIT.get(key);
    const state = stored ? (JSON.parse(stored) as { count: number; reset: number }) : null;
    const current = state && state.reset > now ? state : { count: 0, reset: now + rate.windowSeconds };
    if (current.count >= rate.max) return false;
    current.count += 1;
    await env.RATE_LIMIT.put(key, JSON.stringify(current), {
      expirationTtl: Math.max(60, current.reset - now),
    });
    return true;
  } catch {
    return true; // never block legitimate visitors because KV is unavailable
  }
}

export function isAllowedOrigin(request: Request, env: BaseEnv): boolean {
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
