// Unit tests for functions/_lib/autolang.ts (automatic language selection on "/").
// Run: node --test scripts/autolang.test.mjs
// Node 22.18+ / 25 strip TypeScript types natively, so the .ts module is imported directly.
// The Function wrapper (functions/index.ts) uses an extensionless import, so the wrapper
// tests bundle it in memory with the esbuild already in node_modules (via Astro/Vite;
// no new dependency) and import the result from a data: URL.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import {
  LANGS,
  isLang,
  readLangCookie,
  pickFromAcceptLanguage,
  isLikelyBot,
  isProductionHost,
  decideRootRedirect,
  redirectLocation,
} from '../functions/_lib/autolang.ts';

const CHROME_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const SAME_SITE = 'https://www.arklens.ch/ai/';

/** Build a decision input; defaults to a production human visit to "/" with no cookie/referer. */
const req = ({
  method = 'GET',
  url = 'https://www.arklens.ch/',
  cookie = null,
  acceptLanguage = null,
  userAgent = CHROME_UA,
  referer = null,
  cf = undefined,
} = {}) => ({ method, url: new URL(url), cookie, acceptLanguage, userAgent, referer, cf });

const decide = (opts) => decideRootRedirect(req(opts));

test('helpers: LANGS, isLang, isProductionHost', () => {
  assert.deepEqual([...LANGS], ['en', 'fr', 'de', 'it']);
  assert.equal(isLang('fr'), true);
  assert.equal(isLang('FR'), false);
  assert.equal(isLang('xx'), false);
  assert.equal(isProductionHost('www.arklens.ch'), true);
  assert.equal(isProductionHost('arklens.ch'), true);
  assert.equal(isProductionHost('dev.arklens.pages.dev'), false);
  assert.equal(isProductionHost('arklens.pages.dev'), false);
  assert.equal(isProductionHost('localhost'), false);
});

// FIRST-TIME VISITORS
test('first-time: fr-CH, fr-FR → /fr/', () => {
  assert.equal(decide({ acceptLanguage: 'fr-CH' }), '/fr/');
  assert.equal(decide({ acceptLanguage: 'fr-FR,fr;q=0.9,en;q=0.8' }), '/fr/');
});
test('first-time: de-CH, de-DE → /de/', () => {
  assert.equal(decide({ acceptLanguage: 'de-CH' }), '/de/');
  assert.equal(decide({ acceptLanguage: 'de-DE,de;q=0.9' }), '/de/');
});
test('first-time: it-CH, it-IT → /it/', () => {
  assert.equal(decide({ acceptLanguage: 'it-CH' }), '/it/');
  assert.equal(decide({ acceptLanguage: 'it-IT,it;q=0.9' }), '/it/');
});
test('first-time: en-CH, en-US, ms-MY → serve', () => {
  assert.equal(decide({ acceptLanguage: 'en-CH' }), null);
  assert.equal(decide({ acceptLanguage: 'en-US,en;q=0.9' }), null);
  assert.equal(decide({ acceptLanguage: 'ms-MY' }), null);
});
test('first-time: q-weights', () => {
  assert.equal(decide({ acceptLanguage: 'ms-MY,de;q=0.7,en;q=0.5' }), '/de/');
  assert.equal(decide({ acceptLanguage: 'en-GB,fr;q=0.9' }), null);
  assert.equal(decide({ acceptLanguage: 'de;q=0.2,it;q=0.8' }), '/it/');
  assert.equal(decide({ acceptLanguage: 'fr;q=0' }), null);
  assert.equal(decide({ acceptLanguage: '*' }), null);
  assert.equal(decide({ acceptLanguage: '*;q=1,it;q=0.5' }), '/it/');
});
test('Accept-Language parsing: ties, malformed, oversized', () => {
  assert.equal(pickFromAcceptLanguage('fr-CH,fr;q=0.9,en;q=0.8'), 'fr');
  assert.equal(pickFromAcceptLanguage('de,it'), 'de'); // tie keeps header order
  assert.equal(pickFromAcceptLanguage('it;q=0.5,de;q=0.5'), 'it');
  assert.equal(pickFromAcceptLanguage(''), null);
  assert.equal(pickFromAcceptLanguage(null), null);
  assert.equal(pickFromAcceptLanguage(';;;,,,==='), null);
  assert.equal(pickFromAcceptLanguage('fr;q=abc,de;q=0.4'), 'de'); // malformed weight dropped
  assert.equal(pickFromAcceptLanguage('fr;q=2'), null);
  assert.equal(pickFromAcceptLanguage('f_r,de'), 'de'); // malformed tag dropped
  assert.equal(pickFromAcceptLanguage('FR-ch'), 'fr');
  // 20-entry cap: a supported language as entry 21 is ignored
  const many = Array.from({ length: 20 }, (_, i) => `x${String.fromCharCode(97 + i)}`).join(',');
  assert.equal(pickFromAcceptLanguage(`${many},fr`), null);
  // 512-char cap: a supported language beyond 512 chars is ignored
  assert.equal(pickFromAcceptLanguage(`${'a'.repeat(600)},fr`), null);
  assert.equal(decide({ acceptLanguage: `${'a'.repeat(600)},fr` }), null);
});

// MANUAL OVERRIDE
test('manual override: fr browser + cookie=en → serve; de browser + cookie=it → /it/', () => {
  assert.equal(decide({ acceptLanguage: 'fr-CH', cookie: 'arklens_lang=en' }), null);
  assert.equal(decide({ acceptLanguage: 'de-CH', cookie: 'arklens_lang=it' }), '/it/');
  assert.equal(decide({ acceptLanguage: 'en-US', cookie: 'other=1; arklens_lang=fr' }), '/fr/');
});

// INVALID COOKIES
test('invalid cookies fall back to Accept-Language', () => {
  for (const cookie of ['arklens_lang=xx', 'arklens_lang=FR', 'arklens_lang=', 'arklens_lang=de; arklens_lang=it']) {
    assert.equal(decide({ acceptLanguage: 'fr-CH', cookie }), '/fr/', cookie);
  }
  assert.equal(readLangCookie('arklens_lang=xx'), null);
  assert.equal(readLangCookie('arklens_lang=FR'), null);
  assert.equal(readLangCookie('arklens_lang='), null);
  assert.equal(readLangCookie('arklens_lang=de; arklens_lang=it'), null);
  assert.equal(readLangCookie('x_arklens_lang=de'), null);
  assert.equal(readLangCookie(null), null);
  assert.equal(readLangCookie('a=1; arklens_lang=de'), 'de');
});

// INTERNAL NAVIGATION
test('internal navigation', () => {
  assert.equal(decide({ acceptLanguage: 'fr-CH' }), '/fr/', 'fr, no cookie, direct');
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: SAME_SITE }), null, 'fr, same-site referer');
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: 'https://arklens.ch/' }), null, 'apex referer');
  assert.equal(decide({ acceptLanguage: 'de-CH', referer: SAME_SITE }), null, 'de, same-site referer');
  assert.equal(
    decide({ acceptLanguage: 'it-CH', cookie: 'arklens_lang=de', referer: SAME_SITE }),
    '/de/',
    'cookie beats same-site referer',
  );
  assert.equal(decide({ acceptLanguage: 'fr-CH', cookie: 'arklens_lang=en', referer: SAME_SITE }), null);
  assert.equal(decide({ acceptLanguage: 'fr-CH', cookie: 'arklens_lang=xx', referer: SAME_SITE }), null);
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: 'https://www.google.com/' }), '/fr/', 'external');
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: 'https://www.arklens.ch.evil.example/' }), '/fr/');
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: 'not a url' }), '/fr/');
  assert.equal(decide({ acceptLanguage: 'fr-CH', referer: null }), '/fr/', 'no referer');
});

// HEAD
test('HEAD is treated like GET', () => {
  assert.equal(decide({ method: 'HEAD', acceptLanguage: 'fr-CH' }), '/fr/');
  assert.equal(decide({ method: 'HEAD', acceptLanguage: 'fr-CH', referer: SAME_SITE }), null);
  assert.equal(decide({ method: 'HEAD', acceptLanguage: 'en-US', cookie: 'arklens_lang=it' }), '/it/');
});

// NON-GET METHODS
test('non-GET/HEAD methods → serve', () => {
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    assert.equal(decide({ method, acceptLanguage: 'fr-CH', cookie: 'arklens_lang=de' }), null, method);
  }
});

// PATH
test('only exact "/" is eligible', () => {
  for (const url of ['https://www.arklens.ch/index.html', 'https://www.arklens.ch/ai/', 'https://www.arklens.ch/fr/']) {
    assert.equal(decide({ url, acceptLanguage: 'fr-CH' }), null, url);
  }
});

// PREVIEW
test('preview hosts: off without test cookie, on with it; production ignores it', () => {
  const dev = 'https://dev.arklens.pages.dev/';
  assert.equal(decide({ url: dev, acceptLanguage: 'fr-CH' }), null);
  assert.equal(decide({ url: dev, acceptLanguage: 'fr-CH', cookie: 'arklens_autolang_test=1' }), '/fr/');
  assert.equal(decide({ url: dev, acceptLanguage: 'fr-CH', cookie: 'arklens_autolang_test=0' }), null);
  assert.equal(decide({ url: 'https://abc123.arklens.pages.dev/', acceptLanguage: 'de-CH' }), null);
  assert.equal(decide({ url: 'https://arklens.pages.dev/', acceptLanguage: 'de-CH' }), null);
  assert.equal(decide({ url: 'http://localhost:8788/', acceptLanguage: 'de-CH' }), null);
  assert.equal(
    decide({ url: 'http://localhost:8788/', acceptLanguage: 'de-CH', cookie: 'arklens_autolang_test=1' }),
    '/de/',
  );
  // Same-host referer counts as internal navigation on previews too.
  assert.equal(
    decide({ url: dev, acceptLanguage: 'fr-CH', cookie: 'arklens_autolang_test=1', referer: `${dev}ai/` }),
    null,
  );
  // Production ignores the test cookie.
  assert.equal(decide({ acceptLanguage: 'en-US', cookie: 'arklens_autolang_test=1' }), null);
  assert.equal(decide({ acceptLanguage: 'fr-CH' }), '/fr/');
  assert.equal(decide({ url: 'https://arklens.ch/', acceptLanguage: 'fr-CH' }), '/fr/');
  assert.equal(decide({ acceptLanguage: 'fr-CH', cookie: 'arklens_autolang_test=0' }), '/fr/');
});

// CRAWLERS
test('crawlers and link previewers are never redirected', () => {
  const uas = [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)',
    'Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://www.anthropic.com)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
    'Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
    'Twitterbot/1.0',
    '',
  ];
  for (const userAgent of uas) {
    assert.equal(isLikelyBot(userAgent), true, userAgent);
    assert.equal(decide({ userAgent, acceptLanguage: 'fr-CH,fr;q=0.9' }), null, userAgent);
  }
  assert.equal(decide({ userAgent: null, acceptLanguage: 'fr-CH' }), null, 'missing UA');
  assert.equal(isLikelyBot(CHROME_UA), false);
  // Our own IndexNow snapshot fetch sends no Accept-Language.
  assert.equal(decide({ userAgent: 'ArklensIndexNow/1.0', acceptLanguage: null }), null);
  // Cloudflare bot signals are honoured when present.
  assert.equal(decide({ acceptLanguage: 'fr-CH', cf: { botManagement: { verifiedBot: true } } }), null);
  assert.equal(decide({ acceptLanguage: 'fr-CH', cf: { verifiedBotCategory: 'Search Engine Crawler' } }), null);
  assert.equal(decide({ acceptLanguage: 'fr-CH', cf: { botManagement: { verifiedBot: false }, verifiedBotCategory: '' } }), '/fr/');
});

test('no Accept-Language → serve', () => {
  assert.equal(decide({ acceptLanguage: null }), null);
  assert.equal(decide({ acceptLanguage: '' }), null);
});

// QUERY PRESERVATION
test('redirect Location preserves the query string', () => {
  const url = new URL('https://www.arklens.ch/?utm_source=x');
  const target = decideRootRedirect(req({ url: url.href, acceptLanguage: 'fr-CH' }));
  assert.equal(target, '/fr/');
  assert.equal(redirectLocation(target, url), '/fr/?utm_source=x');
  assert.equal(redirectLocation('/de/', new URL('https://www.arklens.ch/')), '/de/');
});

// FAIL OPEN
test('exceptions fail open (serve)', () => {
  const throwing = {
    method: 'GET',
    get url() {
      throw new Error('boom');
    },
    cookie: null,
    acceptLanguage: 'fr-CH',
    userAgent: CHROME_UA,
    referer: null,
  };
  assert.equal(decideRootRedirect(throwing), null);
  assert.equal(decideRootRedirect({ ...req({ acceptLanguage: 'fr-CH' }), method: undefined }), null);
});

// FUNCTION WRAPPER (functions/index.ts) with a stub next()
const loadHandler = async () => {
  const out = await build({
    entryPoints: [fileURLToPath(new URL('../functions/index.ts', import.meta.url))],
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    write: false,
  });
  const code = out.outputFiles[0].text;
  return (await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)).onRequest;
};

const call = async (onRequest, { method = 'GET', url = 'https://www.arklens.ch/', headers = {}, staticHeaders = {} } = {}) => {
  let nextCalls = 0;
  const next = async () => {
    nextCalls++;
    return new Response(method === 'HEAD' ? null : '<html>EN</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html', ...staticHeaders },
    });
  };
  const request = new Request(url, { method, headers: { 'User-Agent': CHROME_UA, ...headers } });
  const res = await onRequest({ request, next });
  return { res, nextCalls };
};

test('wrapper: 302 shape (Location+query, Cache-Control, Vary, empty body, no Set-Cookie)', async () => {
  const onRequest = await loadHandler();
  for (const method of ['GET', 'HEAD']) {
    const { res, nextCalls } = await call(onRequest, {
      method,
      url: 'https://www.arklens.ch/?utm_source=x',
      headers: { 'Accept-Language': 'fr-CH' },
    });
    assert.equal(res.status, 302, method);
    assert.equal(res.headers.get('Location'), '/fr/?utm_source=x');
    assert.equal(res.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(res.headers.get('Vary'), 'Accept-Language, Cookie');
    assert.equal(res.headers.get('Set-Cookie'), null);
    assert.equal(await res.text(), '');
    assert.equal(nextCalls, 0);
  }
  const { res } = await call(onRequest, { headers: { 'Accept-Language': 'en-US', Cookie: 'arklens_lang=it' } });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('Location'), '/it/');
  assert.equal(res.headers.get('Set-Cookie'), null);
});

test('wrapper: pass-through returns next() unchanged on production, no Set-Cookie', async () => {
  const onRequest = await loadHandler();
  const { res, nextCalls } = await call(onRequest, { headers: { 'Accept-Language': 'en-US' } });
  assert.equal(nextCalls, 1);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), '<html>EN</html>');
  assert.equal(res.headers.get('X-Robots-Tag'), null);
  assert.equal(res.headers.get('Set-Cookie'), null);
  const post = await call(onRequest, { method: 'POST', headers: { 'Accept-Language': 'fr-CH' } });
  assert.equal(post.res.status, 200);
  assert.equal(post.nextCalls, 1);
});

test('wrapper: pages.dev pass-through keeps or adds X-Robots-Tag noindex', async () => {
  const onRequest = await loadHandler();
  const dev = 'https://dev.arklens.pages.dev/';
  // _headers not applied → safeguard adds it
  const added = await call(onRequest, { url: dev, headers: { 'Accept-Language': 'fr-CH' } });
  assert.equal(added.res.status, 200);
  assert.equal(added.res.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(await added.res.text(), '<html>EN</html>');
  // _headers already applied → left untouched
  const kept = await call(onRequest, {
    url: dev,
    method: 'HEAD',
    headers: { 'Accept-Language': 'en-US' },
    staticHeaders: { 'X-Robots-Tag': 'noindex' },
  });
  assert.equal(kept.res.headers.get('X-Robots-Tag'), 'noindex');
  // dev with the test cookie redirects like production
  const redirected = await call(onRequest, {
    url: dev,
    headers: { 'Accept-Language': 'fr-CH', Cookie: 'arklens_autolang_test=1' },
  });
  assert.equal(redirected.res.status, 302);
  assert.equal(redirected.res.headers.get('Location'), '/fr/');
});

test('wrapper: exception in decision input fails open to next()', async () => {
  const onRequest = await loadHandler();
  const request = new Request('https://www.arklens.ch/', { headers: { 'Accept-Language': 'fr-CH', 'User-Agent': CHROME_UA } });
  Object.defineProperty(request, 'headers', { get() { throw new Error('boom'); } });
  let nextCalls = 0;
  const res = await onRequest({ request, next: async () => (nextCalls++, new Response('EN')) });
  assert.equal(res.status, 200);
  assert.equal(nextCalls, 1);
});
