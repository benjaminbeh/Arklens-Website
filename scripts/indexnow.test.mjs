// Unit tests for scripts/indexnow.mjs (no network). Run: node --test scripts/indexnow.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isValidKey,
  isProductionUrl,
  parseSitemapLocs,
  pageSignature,
  distFileFor,
  diffSignatures,
  buildPayload,
  redact,
  writeKeyFile,
  isNoindexHtml,
  filterNoindex,
  formatSummary,
  runNotify,
} from './indexnow.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const page = ({
  title = 'Contact | Arklens',
  description = 'Talk to Arklens',
  canonical = 'https://www.arklens.ch/contact/',
  main = '<h1>Contact</h1><p>Write to us.</p>',
  head = '',
  outside = '',
} = {}) => `<!doctype html><html><head><title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">${head}</head>
<body><header>${outside}</header><main id="main">${main}</main><footer>Footer</footer></body></html>`;

test('isValidKey', () => {
  assert.equal(isValidKey('abcdef12'), true);
  assert.equal(isValidKey('a'.repeat(128)), true);
  assert.equal(isValidKey('A1-b2-C3-d4'), true);
  assert.equal(isValidKey('abcdef1'), false);
  assert.equal(isValidKey('a'.repeat(129)), false);
  assert.equal(isValidKey('abcd_ef12'), false);
  assert.equal(isValidKey('abcd ef12'), false);
  assert.equal(isValidKey(undefined), false);
});

test('isProductionUrl accepts only https://www.arklens.ch pages', () => {
  assert.equal(isProductionUrl('https://www.arklens.ch/fr/ai/'), true);
  assert.equal(isProductionUrl('https://www.arklens.ch/'), true);
  for (const u of [
    'https://arklens.ch/',
    'https://arklens.pages.dev/',
    'https://dev.arklens.pages.dev/',
    'https://abc123.arklens.pages.dev/',
    'http://www.arklens.ch/',
    'https://www.arklens.ch:8443/',
    'https://user:pw@www.arklens.ch/',
    'https://www.arklens.ch/api/start',
    'not a url',
    '',
    undefined,
  ]) {
    assert.equal(isProductionUrl(u), false, String(u));
  }
});

test('parseSitemapLocs', () => {
  const xml = '<urlset><url><loc> https://www.arklens.ch/ </loc></url><url><loc>https://www.arklens.ch/fr/?a=1&amp;b=2</loc></url></urlset>';
  assert.deepEqual(parseSitemapLocs(xml), ['https://www.arklens.ch/', 'https://www.arklens.ch/fr/?a=1&b=2']);
});

test('pageSignature ignores obfuscated e-mails, whitespace, scripts, hrefs and head-only changes', () => {
  const base = pageSignature(page({ main: '<p>Mail <a href="mailto:contact@arklens.ch">contact@arklens.ch</a> today.</p>' }));
  const cf = pageSignature(
    page({
      main: '<p>Mail <a href="/cdn-cgi/l/email-protection#ab"><span class="__cf_email__" data-cfemail="ab">[email&#160;protected]</span></a> today.</p>',
    }),
  );
  assert.equal(cf, base);
  assert.equal(pageSignature(page({ main: '<p>Mail\n   <a href="mailto:contact@arklens.ch">contact@arklens.ch</a>   today.</p>' })), base);
  assert.equal(
    pageSignature(page({ main: '<p>Mail <a href="mailto:contact@arklens.ch">contact@arklens.ch</a> today.</p><script>var x = "hidden text";</script>' })),
    base,
  );
  const a1 = pageSignature(page({ main: '<a href="/start">Start</a>' }));
  const a2 = pageSignature(page({ main: '<a href="/start/" class="btn">Start</a>' }));
  assert.equal(a1, a2);
  assert.equal(
    pageSignature(page({ head: '<script type="application/ld+json">{"@graph":[]}</script><meta property="og:site_name" content="Arklens">', outside: '<nav>New nav</nav>' })),
    pageSignature(page()),
  );
});

test('pageSignature changes for main text, title, description or canonical', () => {
  const base = pageSignature(page());
  assert.notEqual(pageSignature(page({ main: '<h1>Contact</h1><p>Write to us now.</p>' })), base);
  assert.notEqual(pageSignature(page({ title: 'Contact us | Arklens' })), base);
  assert.notEqual(pageSignature(page({ description: 'Talk to us' })), base);
  assert.notEqual(pageSignature(page({ canonical: 'https://www.arklens.ch/fr/contact/' })), base);
});

test('distFileFor', () => {
  assert.equal(distFileFor('https://www.arklens.ch/fr/ai/', 'dist'), path.join('dist', 'fr', 'ai', 'index.html'));
  assert.equal(distFileFor('https://www.arklens.ch/', 'dist'), path.join('dist', 'index.html'));
});

test('diffSignatures', () => {
  const O = 'https://www.arklens.ch';
  const before = {
    [`${O}/same/`]: { status: 'ok', sig: 's1' },
    [`${O}/changed/`]: { status: 'ok', sig: 'old' },
    [`${O}/gone/`]: { status: 'ok', sig: 'g' },
    [`${O}/was-absent/`]: { status: 'absent' },
    [`${O}/unknown/`]: { status: 'unknown' },
  };
  const after = {
    [`${O}/same/`]: 's1',
    [`${O}/changed/`]: 'new',
    [`${O}/was-absent/`]: 'x',
    [`${O}/new/`]: 'n',
    [`${O}/unknown/`]: 'u',
    'https://dev.arklens.pages.dev/new/': 'p',
  };
  const d = diffSignatures(before, after);
  assert.deepEqual(d.added, ['https://dev.arklens.pages.dev/new/', `${O}/new/`, `${O}/was-absent/`]);
  assert.deepEqual(d.changed, [`${O}/changed/`]);
  assert.deepEqual(d.removed, [`${O}/gone/`]);
  assert.deepEqual(d.unchanged, [`${O}/same/`]);
  assert.deepEqual(d.skipped, [`${O}/unknown/`]);
  assert.deepEqual(d.submit, [`${O}/changed/`, `${O}/gone/`, `${O}/new/`, `${O}/was-absent/`]);

  const all = diffSignatures(before, after, { all: true });
  assert.deepEqual(all.submit, [`${O}/changed/`, `${O}/new/`, `${O}/same/`, `${O}/unknown/`, `${O}/was-absent/`]);

  assert.deepEqual(diffSignatures({}, {}).submit, []);
  const dup = diffSignatures({ [`${O}/b/`]: { status: 'ok', sig: '1' } }, { [`${O}/b/`]: '2', [`${O}/a/`]: '3' });
  assert.deepEqual(dup.submit, [`${O}/a/`, `${O}/b/`]);
});

test('buildPayload', () => {
  assert.deepEqual(buildPayload('abcdef12', ['https://www.arklens.ch/']), {
    host: 'www.arklens.ch',
    key: 'abcdef12',
    keyLocation: 'https://www.arklens.ch/abcdef12.txt',
    urlList: ['https://www.arklens.ch/'],
  });
});

test('redact', () => {
  assert.equal(redact('key=abcdef12 at /abcdef12.txt', 'abcdef12'), 'key=*** at /***.txt');
  assert.equal(redact('nothing', ''), 'nothing');
});

test('writeKeyFile', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-test-'));
  try {
    const file = writeKeyFile(dir, 'abcdef12-XYZ');
    assert.equal(file, path.join(dir, 'abcdef12-XYZ.txt'));
    assert.equal(fs.readFileSync(file, 'utf8'), 'abcdef12-XYZ');
    assert.throws(() => writeKeyFile(dir, 'bad key!'));
    assert.throws(() => writeKeyFile(path.join(dir, 'missing'), 'abcdef12'));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Sitemap contents are checked against two independent sources instead of a hard-coded count:
//  (a) the `sitePages` × `locales` declarations in src/i18n/index.ts (what the sitemap route emits)
//  (b) the pages actually built into dist/: every <dir>/index.html without a robots noindex meta.
// Adding a route deliberately (page + sitePages entry) keeps the test green; a page missing from
// sitePages, a stale sitePages entry, or a noindex page leaking into the sitemap fails it.
const SITE = 'https://www.arklens.ch';
const NOINDEX_PAGES = ['/experience/apply/'];

function readI18nConst(src, name) {
  const m = src.match(new RegExp(`export const ${name} = \\[([^\\]]*)\\]`));
  assert.ok(m, `${name} not found in src/i18n/index.ts`);
  return [...m[1].matchAll(/'([^']*)'/g)].map((x) => x[1]);
}

function builtIndexPages(dist) {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') {
        const rel = path.relative(dist, dir).split(path.sep).filter(Boolean);
        const urlPath = '/' + rel.map((s) => s + '/').join('');
        const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(fs.readFileSync(p, 'utf8'));
        out.push({ urlPath, noindex });
      }
    }
  };
  walk(dist);
  return out;
}

const sorted = (xs) => [...xs].sort();
const diff = (a, b) => sorted([...a].filter((x) => !b.has(x)));

test('dist sitemap lists exactly the indexable localised pages', (t) => {
  const dist = path.join(root, 'dist');
  const file = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(file)) return t.skip('dist not built');
  const locs = parseSitemapLocs(fs.readFileSync(file, 'utf8'));
  const got = new Set(locs);
  assert.equal(got.size, locs.length, 'duplicate <loc> entries');
  assert.ok(locs.every(isProductionUrl));

  // (a) declared routes
  const i18nSrc = fs.readFileSync(path.join(root, 'src', 'i18n', 'index.ts'), 'utf8');
  const sitePages = readI18nConst(i18nSrc, 'sitePages');
  const locales = readI18nConst(i18nSrc, 'locales');
  assert.ok(sitePages.includes('/experience/'), 'sitePages should include /experience/');
  const localize = (p, l) => (l === 'en' ? p : `/${l}${p}`);
  const declared = new Set(sitePages.flatMap((p) => locales.map((l) => SITE + localize(p, l))));
  assert.deepEqual(diff(declared, got), [], 'declared pages missing from sitemap');
  assert.deepEqual(diff(got, declared), [], 'sitemap entries not declared in sitePages');

  // (b) built pages
  const built = builtIndexPages(dist);
  const indexable = new Set(built.filter((b) => !b.noindex).map((b) => SITE + b.urlPath));
  const noindex = new Set(built.filter((b) => b.noindex).map((b) => SITE + b.urlPath));
  assert.deepEqual(diff(indexable, got), [], 'built indexable pages missing from sitemap');
  assert.deepEqual(diff(got, indexable), [], 'sitemap entries without an indexable built page');

  // noindex pages (Experience application form in every locale) are built and excluded
  for (const p of NOINDEX_PAGES) {
    for (const l of locales) {
      const u = SITE + localize(p, l);
      assert.ok(noindex.has(u), `${u} should be built with robots noindex`);
      assert.ok(!got.has(u), `${u} must not be in the sitemap`);
    }
  }
  for (const u of noindex) assert.ok(!got.has(u), `noindex page ${u} must not be in the sitemap`);
});

// ---------------------------------------------------------------------------
// Noindex guard, failure warnings and deployment summary (temp dist, mocked fetch, no network)
// ---------------------------------------------------------------------------

test('isNoindexHtml', () => {
  assert.equal(isNoindexHtml('<meta name="robots" content="noindex">'), true);
  assert.equal(isNoindexHtml("<meta content='NoIndex, follow' name='Robots'>"), true);
  assert.equal(isNoindexHtml('<meta name="robots" content="none">'), true);
  assert.equal(isNoindexHtml('<meta name="bingbot" content="noindex">'), true);
  assert.equal(isNoindexHtml('<meta name="robots" content="index, follow">'), false);
  assert.equal(isNoindexHtml('<meta name="description" content="noindex in text">'), false);
  assert.equal(isNoindexHtml(page()), false);
});

const O = 'https://www.arklens.ch';
const TEST_KEY = 'testkey-ABCDEF12';
const indexable = (main) => page({ main });
const noindexPage = (main) => page({ main, head: '<meta name="robots" content="noindex">' });

/** Temp dist with the given { urlPath: html } pages and sitemap locs. */
function makeDist(pages, locs = Object.keys(pages).map((p) => O + p)) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-dist-'));
  for (const [p, html] of Object.entries(pages)) {
    fs.mkdirSync(path.join(dir, p), { recursive: true });
    fs.writeFileSync(path.join(dir, p, 'index.html'), html);
  }
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), `<urlset>${locs.map((l) => `<url><loc>${l}</loc></url>`).join('')}</urlset>`);
  return dir;
}

function writeSnapshot(dir, entries) {
  const file = path.join(dir, '..', `${path.basename(dir)}-before.json`);
  fs.writeFileSync(file, JSON.stringify({ version: 1, origin: O, entries }));
  return file;
}

/** fetch mock: key-file GET answers keyFile, POST answers post (status number or Error). */
function mockFetch({ keyFile = { status: 200, body: TEST_KEY }, post = 200 } = {}) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url, method: init.method || 'GET', body: init.body });
    if (init.method === 'POST') {
      if (post instanceof Error) throw post;
      return { status: post, text: async () => '' };
    }
    return { status: keyFile.status, text: async () => keyFile.body ?? '' };
  };
  return { fetchImpl, calls };
}

async function notifyWith(dist, opts, ctx) {
  const lines = [];
  const summaryFile = path.join(dist, '..', `${path.basename(dist)}-summary.md`);
  const s = await runNotify(
    { dist, ...opts },
    { key: TEST_KEY, inActions: true, isMain: true, allEnv: false, sleepImpl: async () => {}, out: (l) => lines.push(String(l)), summaryFile, ...ctx },
  );
  const summary = fs.existsSync(summaryFile) ? fs.readFileSync(summaryFile, 'utf8') : '';
  fs.rmSync(summaryFile, { force: true });
  const log = lines.join('\n');
  assert.ok(!log.includes(TEST_KEY) && !summary.includes(TEST_KEY), 'key must never be printed');
  return { s, log, summary };
}

const cleanup = (...ps) => ps.forEach((p) => p && fs.rmSync(p, { recursive: true, force: true }));

test('filterNoindex drops built noindex pages and keeps indexable and removed (unbuilt) URLs', () => {
  const dist = makeDist({ '/a/': indexable('<p>A</p>'), '/apply/': noindexPage('<p>Form</p>') });
  try {
    const r = filterNoindex([`${O}/a/`, `${O}/apply/`, `${O}/gone/`], dist);
    assert.deepEqual(r.submit, [`${O}/a/`, `${O}/gone/`]);
    assert.deepEqual(r.noindex, [`${O}/apply/`]);
  } finally {
    cleanup(dist);
  }
});

test('notify never submits a noindex page and writes a summary with reason counts', async () => {
  const pages = { '/': indexable('<p>Home v2</p>'), '/same/': indexable('<p>Same</p>'), '/apply/': noindexPage('<p>Form</p>') };
  const dist = makeDist(pages, [...Object.keys(pages).map((p) => O + p), 'https://arklens.pages.dev/x/']);
  const snap = writeSnapshot(dist, {
    [`${O}/`]: { status: 'ok', sig: 'old' },
    [`${O}/same/`]: { status: 'ok', sig: pageSignature(pages['/same/']) },
  });
  const { fetchImpl, calls } = mockFetch();
  try {
    const { s, log, summary } = await notifyWith(dist, { before: snap }, { fetchImpl });
    const posts = calls.filter((c) => c.method === 'POST');
    assert.equal(posts.length, 1);
    assert.deepEqual(JSON.parse(posts[0].body).urlList, [`${O}/`]);
    assert.equal(s.status, 'success');
    assert.equal(s.http, 200);
    assert.equal(s.considered, 4);
    assert.equal(s.submitted, 1);
    assert.deepEqual(s.skippedBy, { unchanged: 1, noindex: 1, 'non-production': 1 });
    assert.ok(!log.includes('::warning::'), log);
    assert.equal(
      summary,
      [
        '### IndexNow summary',
        '',
        '- Mode: changed',
        '- URLs considered: 4',
        '- Submitted: 1',
        '- Skipped: 3 (unchanged 1, noindex 1, non-production 1)',
        '- Status: success (HTTP 200): OK, URLs submitted',
        '',
        '',
      ].join('\n'),
    );
    assert.ok(log.includes('### IndexNow summary'), 'summary is also printed to stdout');
    assert.ok(!summary.includes('https://'), 'no URL lists in the step summary');
  } finally {
    cleanup(dist, snap);
  }
});

test('notify --all skips noindex pages that leaked into the sitemap', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>'), '/apply/': noindexPage('<p>Form</p>') });
  const { fetchImpl, calls } = mockFetch();
  try {
    const { s } = await notifyWith(dist, { all: true }, { fetchImpl });
    assert.deepEqual(JSON.parse(calls.find((c) => c.method === 'POST').body).urlList, [`${O}/`]);
    assert.equal(s.mode, 'all');
    assert.deepEqual([s.considered, s.submitted, s.skippedBy.noindex], [2, 1, 1]);
  } finally {
    cleanup(dist);
  }
});

test('notify warns on non-2xx IndexNow responses', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>') });
  try {
    for (const status of [403, 422, 429, 503]) {
      const { fetchImpl } = mockFetch({ post: status });
      const { s, log, summary } = await notifyWith(dist, { all: true }, { fetchImpl });
      assert.equal(s.status, 'failure');
      assert.equal(s.http, status);
      assert.equal(s.submitted, 0);
      assert.match(log, new RegExp(`::warning::\\[indexnow\\] IndexNow submission failed: HTTP ${status}`));
      assert.match(summary, new RegExp(`- Status: failure \\(HTTP ${status}\\)`));
    }
    const { fetchImpl } = mockFetch({ post: 202 });
    const { s } = await notifyWith(dist, { all: true }, { fetchImpl });
    assert.deepEqual([s.status, s.http, s.submitted], ['success', 202, 1]);
  } finally {
    cleanup(dist);
  }
});

test('notify warns on network errors and timeouts', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>') });
  try {
    const timeout = Object.assign(new Error('timed out'), { name: 'TimeoutError' });
    let r = await notifyWith(dist, { all: true }, { fetchImpl: mockFetch({ post: timeout }).fetchImpl });
    assert.equal(r.s.status, 'failure');
    assert.match(r.log, /::warning::\[indexnow\] IndexNow submission failed: request timed out/);
    assert.match(r.summary, /- Status: failure: request timed out; 1 URL\(s\) not submitted/);
    r = await notifyWith(dist, { all: true }, { fetchImpl: mockFetch({ post: new TypeError('fetch failed') }).fetchImpl });
    assert.match(r.log, /::warning::\[indexnow\] IndexNow submission failed: network error \(TypeError\)/);
  } finally {
    cleanup(dist);
  }
});

test('notify warns and does not submit when the key file check fails', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>') });
  try {
    for (const keyFile of [{ status: 404 }, { status: 200, body: 'other-key' }]) {
      const { fetchImpl, calls } = mockFetch({ keyFile });
      const { s, log } = await notifyWith(dist, { all: true }, { fetchImpl });
      assert.equal(calls.filter((c) => c.method === 'POST').length, 0);
      assert.equal(s.status, 'failure');
      assert.match(log, /::warning::\[indexnow\] IndexNow key file check failed/);
      assert.ok(!log.includes('.txt'), 'key file name is never printed');
    }
    const { fetchImpl, calls } = mockFetch({ keyFile: { status: 503 } });
    const { s, log } = await notifyWith(dist, { all: true }, { fetchImpl });
    assert.match(log, /::warning::\[indexnow\] could not verify the IndexNow key file \(HTTP 503\); submitting anyway/);
    assert.equal(calls.filter((c) => c.method === 'POST').length, 1);
    assert.equal(s.status, 'success');
  } finally {
    cleanup(dist);
  }
});

test('notify: missing snapshot is a warning when the key is set (changed mode)', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>') });
  try {
    const { fetchImpl, calls } = mockFetch();
    let r = await notifyWith(dist, { before: path.join(dist, 'nope.json') }, { fetchImpl });
    assert.match(r.log, /::warning::\[indexnow\] no snapshot of the live site; nothing submitted/);
    assert.equal(r.s.status, 'failure');
    assert.deepEqual(r.s.skippedBy, { 'no-snapshot': 1 });
    assert.equal(calls.length, 0);
    r = await notifyWith(dist, { dryRun: true }, { key: '', inActions: false, fetchImpl });
    assert.ok(!r.log.includes('WARNING'), 'no key: plain info, no warning');
    assert.equal(r.s.status, 'skipped');
  } finally {
    cleanup(dist);
  }
});

test('notify dry-run without a key never calls the network', async () => {
  const dist = makeDist({ '/': indexable('<p>Home</p>') });
  const fetchImpl = async () => assert.fail('network must not be used');
  try {
    const { s, log } = await notifyWith(dist, { all: true }, { key: '', inActions: false, isMain: false, fetchImpl });
    assert.equal(s.status, 'dry-run');
    assert.equal(s.submitted, 0);
    assert.match(log, /forcing dry-run/);
  } finally {
    cleanup(dist);
  }
});

test('formatSummary', () => {
  assert.equal(
    formatSummary({ mode: 'changed', considered: 32, submitted: 0, skippedBy: { unchanged: 32 }, status: 'success', http: 0, detail: 'nothing to submit' }),
    '### IndexNow summary\n\n- Mode: changed\n- URLs considered: 32\n- Submitted: 0\n- Skipped: 32 (unchanged 32)\n- Status: success: nothing to submit\n',
  );
});
