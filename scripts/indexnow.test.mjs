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

test('dist sitemap has 28 production URLs', (t) => {
  const file = path.join(root, 'dist', 'sitemap.xml');
  if (!fs.existsSync(file)) return t.skip('dist not built');
  const locs = parseSitemapLocs(fs.readFileSync(file, 'utf8'));
  assert.equal(locs.length, 28);
  assert.ok(locs.every(isProductionUrl));
});
