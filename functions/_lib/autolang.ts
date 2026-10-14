/**
 * Automatic language selection for the generic root URL "/" (pure logic).
 *
 * Used by functions/index.ts. Dependency-free and type-strippable so Node can
 * import it directly in scripts/autolang.test.mjs.
 *
 * Decision order (first match wins; null = serve the static English root):
 *   0. Method not GET/HEAD                         → null (HEAD is treated like GET)
 *   1. Path not exactly "/"                         → null
 *   2. Host not production and no arklens_autolang_test=1 cookie → null
 *      (production hosts ignore the test cookie entirely)
 *   3. Likely bot / crawler / link previewer       → null
 *   4. Valid arklens_lang cookie: en → null; fr|de|it → "/<lang>/"
 *   5. Same-site Referer (internal navigation)     → null
 *   6. No Accept-Language header                   → null
 *   7. Best supported Accept-Language: fr|de|it → "/<lang>/"; en or none → null
 *
 * Never reads IPs or geo data, never writes cookies.
 */

export const LANGS = ['en', 'fr', 'de', 'it'] as const;
export type Lang = (typeof LANGS)[number];
export type RedirectTarget = '/fr/' | '/de/' | '/it/';

export const LANG_COOKIE = 'arklens_lang';
export const TEST_COOKIE = 'arklens_autolang_test';

const PRODUCTION_HOSTS = ['www.arklens.ch', 'arklens.ch'];
const MAX_ACCEPT_LANGUAGE_CHARS = 512;
const MAX_ACCEPT_LANGUAGE_ENTRIES = 20;

export interface CfProps {
  botManagement?: { verifiedBot?: boolean } | null;
  verifiedBotCategory?: string | null;
}

export interface RootRedirectInput {
  method: string;
  url: URL;
  cookie: string | null;
  acceptLanguage: string | null;
  userAgent: string | null;
  referer: string | null;
  cf?: CfProps | null;
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** All values of a cookie name in a Cookie header (raw, trimmed). */
function cookieValues(cookieHeader: string | null | undefined, name: string): string[] {
  if (!cookieHeader) return [];
  const values: string[] = [];
  for (const part of cookieHeader.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    values.push(part.slice(eq + 1).trim());
  }
  return values;
}

/**
 * Saved manual language choice. Only exact lowercase en|fr|de|it is accepted;
 * missing, invalid, empty or conflicting duplicate values return null.
 */
export function readLangCookie(cookieHeader: string | null | undefined): Lang | null {
  const values = cookieValues(cookieHeader, LANG_COOKIE);
  if (values.length === 0) return null;
  const first = values[0];
  if (!isLang(first)) return null;
  if (values.some((v) => v !== first)) return null;
  return first;
}

function hasTestCookie(cookieHeader: string | null | undefined): boolean {
  return cookieValues(cookieHeader, TEST_COOKIE).includes('1');
}

const LANG_RANGE = /^(\*|[a-z]{1,8}(-[a-z0-9]{1,8})*)$/i;
const QVALUE = /^(0(\.\d{0,3})?|1(\.0{0,3})?)$/;

/**
 * Best supported language from an Accept-Language header (RFC 9110 weights,
 * RFC 4647 lookup on the primary subtag). Entries with q=0, "*" and malformed
 * entries are ignored; ties keep header order. Input is capped at 512 chars
 * and 20 entries.
 */
export function pickFromAcceptLanguage(header: string | null | undefined): Lang | null {
  if (!header) return null;
  const entries = header.slice(0, MAX_ACCEPT_LANGUAGE_CHARS).split(',').slice(0, MAX_ACCEPT_LANGUAGE_ENTRIES);
  const ranked: { lang: string; q: number; index: number }[] = [];
  entries.forEach((entry, index) => {
    const [rawTag, ...params] = entry.split(';');
    const tag = rawTag.trim();
    if (!LANG_RANGE.test(tag) || tag === '*') return;
    let q = 1;
    for (const param of params) {
      const [key, value = ''] = param.split('=').map((s) => s.trim());
      if (key.toLowerCase() !== 'q') continue;
      if (!QVALUE.test(value)) return; // malformed weight: drop entry
      q = Number(value);
    }
    if (q <= 0) return;
    ranked.push({ lang: tag.split('-')[0].toLowerCase(), q, index });
  });
  ranked.sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { lang } of ranked) {
    if (isLang(lang)) return lang;
  }
  return null;
}

const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|google|bing|yandex|baidu|duckduck|applebot|gptbot|chatgpt|oai-searchbot|openai|claude|anthropic|perplexity|whatsapp|telegram|skypeuripreview|embedly|lighthouse|headlesschrome|ia_archiver/i;

/** Conservative crawler / link-preview check. False positives only mean "serve English as today". */
export function isLikelyBot(userAgent: string | null | undefined, cf?: CfProps | null): boolean {
  if (cf?.botManagement?.verifiedBot === true) return true;
  if (typeof cf?.verifiedBotCategory === 'string' && cf.verifiedBotCategory.trim() !== '') return true;
  const ua = (userAgent ?? '').trim();
  if (ua === '') return true;
  return BOT_UA.test(ua);
}

export function isProductionHost(host: string | null | undefined): boolean {
  return PRODUCTION_HOSTS.includes((host ?? '').toLowerCase());
}

/** Referer from an Arklens production origin (https) or from the current request host. */
function isSameSiteReferer(referer: string | null | undefined, url: URL): boolean {
  if (!referer) return false;
  let ref: URL;
  try {
    ref = new URL(referer);
  } catch {
    return false;
  }
  const host = ref.hostname.toLowerCase();
  if (ref.protocol === 'https:' && isProductionHost(host)) return true;
  return ref.host.toLowerCase() === url.host.toLowerCase();
}

function targetFor(lang: Lang): RedirectTarget | null {
  return lang === 'en' ? null : (`/${lang}/` as RedirectTarget);
}

/** Redirect target for a request to "/", or null to serve the static English root. Never throws. */
export function decideRootRedirect(input: RootRedirectInput): RedirectTarget | null {
  try {
    const method = input.method.toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') return null;

    const url = input.url;
    if (url.pathname !== '/') return null;

    if (!isProductionHost(url.hostname) && !hasTestCookie(input.cookie)) return null;

    if (isLikelyBot(input.userAgent, input.cf)) return null;

    const saved = readLangCookie(input.cookie);
    if (saved) return targetFor(saved);

    if (isSameSiteReferer(input.referer, url)) return null;

    if (!input.acceptLanguage) return null;

    const picked = pickFromAcceptLanguage(input.acceptLanguage);
    return picked ? targetFor(picked) : null;
  } catch {
    return null; // fail open
  }
}

/** Relative Location for a redirect, preserving the original query string. */
export function redirectLocation(target: RedirectTarget, url: URL): string {
  return target + url.search;
}
