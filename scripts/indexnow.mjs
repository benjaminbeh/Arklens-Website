#!/usr/bin/env node
// IndexNow for the production site https://www.arklens.ch (CI, main branch only).
//
// Modes (see .github/workflows/deploy.yml):
//   write-key --dist dist
//       Production (GITHUB_REF=refs/heads/main) only: writes dist/<INDEXNOW_KEY>.txt so the
//       key file is deployed with the site and becomes public at https://www.arklens.ch/<key>.txt.
//   snapshot --dist dist --out <file>
//       Before the deploy: fetches the currently live production pages and stores a text
//       signature per URL (title, description, canonical, <main> text).
//   notify --dist dist --before <file> [--all] [--dry-run]
//       After a successful production deploy: compares the snapshot with the freshly built dist
//       and submits only new, materially changed or removed www.arklens.ch URLs.
//       --all (or INDEXNOW_ALL=true) submits every sitemap URL (one-time initial submit).
//       --dry-run prints the (redacted) payload and never POSTs.
//
// Safety: the key comes only from the INDEXNOW_KEY environment variable (GitHub secret) and is
// never printed. Missing/invalid config and network/protocol failures are logged as warnings and
// exit 0, so IndexNow can never fail a deployment. Only https://www.arklens.ch/ URLs are submitted.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const ORIGIN = 'https://www.arklens.ch';
export const HOST = 'www.arklens.ch';
export const ENDPOINT = 'https://api.indexnow.org/indexnow';
export const UA = 'ArklensIndexNow/1.0 (+https://www.arklens.ch/)';
export const MAX_URLS = 10000;

// ---------------------------------------------------------------------------
// Pure helpers (unit-tested in scripts/indexnow.test.mjs)
// ---------------------------------------------------------------------------

/** IndexNow key format: 8–128 characters of a-z, A-Z, 0-9 and '-'. */
export function isValidKey(key) {
  return typeof key === 'string' && /^[A-Za-z0-9-]{8,128}$/.test(key);
}

/** True only for public production page URLs: https://www.arklens.ch/... outside /api/. */
export function isProductionUrl(u) {
  let url;
  try {
    url = new URL(u);
  } catch {
    return false;
  }
  return (
    url.protocol === 'https:' &&
    url.hostname === HOST &&
    url.port === '' &&
    url.username === '' &&
    url.password === '' &&
    !url.pathname.startsWith('/api/')
  );
}

/** Returns the trimmed <loc> values of a sitemap. */
export function parseSitemapLocs(xml) {
  const locs = [];
  const re = /<loc>([\s\S]*?)<\/loc>/gi;
  let m;
  while ((m = re.exec(String(xml)))) {
    const loc = decodeEntities(m[1]).trim();
    if (loc) locs.push(loc);
  }
  return locs;
}

function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, n) => safeCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function safeCodePoint(n) {
  try {
    return String.fromCodePoint(n);
  } catch {
    return '';
  }
}

function attr(tag, name) {
  const m = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag);
  return m ? (m[2] ?? m[3] ?? '') : null;
}

function findTag(html, tagName, pred) {
  const re = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  let m;
  while ((m = re.exec(html))) {
    if (pred(m[0])) return m[0];
  }
  return null;
}

/**
 * Text signature of a page: sha256 of title, meta description, canonical and the visible text
 * of <main>. Scripts/styles, markup, attributes (hrefs, classes), JSON-LD, header/footer and
 * e-mail addresses (incl. Cloudflare "[email protected]" obfuscation) do not affect it.
 */
export function pageSignature(html) {
  const doc = String(html);
  const title = decodeEntities((/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(doc) || [, ''])[1]).replace(/\s+/g, ' ').trim();
  const descTag = findTag(doc, 'meta', (t) => (attr(t, 'name') || '').toLowerCase() === 'description');
  const description = decodeEntities(descTag ? attr(descTag, 'content') || '' : '').trim();
  const canonTag = findTag(doc, 'link', (t) => (attr(t, 'rel') || '').toLowerCase() === 'canonical');
  const canonical = decodeEntities(canonTag ? attr(canonTag, 'href') || '' : '').trim();
  const mainHtml = (/<main\b[^>]*>([\s\S]*)<\/main>/i.exec(doc) || [, ''])[1];
  const mainText = decodeEntities(
    mainHtml
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\[email\s*protected\]/gi, ' ')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return createHash('sha256').update([title, description, canonical, mainText].join('\n')).digest('hex');
}

/** dist file that Astro builds for a page URL (directory-style routes). */
export function distFileFor(url, distDir) {
  return path.join(distDir, decodeURIComponent(new URL(url).pathname), 'index.html');
}

/**
 * before: { [url]: { status: 'ok', sig } | { status: 'absent' } | { status: 'unknown' } }
 * after:  { [url]: sig }
 */
export function diffSignatures(before, after, { all = false } = {}) {
  const b = before || {};
  const a = after || {};
  const added = [];
  const changed = [];
  const removed = [];
  const unchanged = [];
  const skipped = [];
  for (const url of Object.keys(a)) {
    const prev = b[url];
    if (!prev || prev.status === 'absent') added.push(url);
    else if (prev.status === 'ok') (prev.sig === a[url] ? unchanged : changed).push(url);
    else skipped.push(url);
  }
  for (const [url, prev] of Object.entries(b)) {
    if (!(url in a) && prev && prev.status === 'ok') removed.push(url);
  }
  const candidates = all ? Object.keys(a) : [...added, ...changed, ...removed];
  const submit = [...new Set(candidates.filter(isProductionUrl))].sort().slice(0, MAX_URLS);
  const sort = (x) => x.sort();
  return {
    added: sort(added),
    changed: sort(changed),
    removed: sort(removed),
    unchanged: sort(unchanged),
    skipped: sort(skipped),
    submit,
  };
}

export function buildPayload(key, urls) {
  return { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: urls };
}

/** Replaces every occurrence of the key with ***. */
export function redact(text, key) {
  const s = String(text);
  return key ? s.split(key).join('***') : s;
}

/** Writes <distDir>/<key>.txt containing exactly the key (UTF-8, no newline). */
export function writeKeyFile(distDir, key) {
  if (!isValidKey(key)) throw new Error('invalid IndexNow key format');
  if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
    throw new Error(`dist directory not found: ${distDir}`);
  }
  const file = path.join(distDir, `${key}.txt`);
  fs.writeFileSync(file, key, 'utf8');
  return file;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const KEY = (process.env.INDEXNOW_KEY || '').trim();
const IN_ACTIONS = process.env.GITHUB_ACTIONS === 'true';
const IS_MAIN = process.env.GITHUB_REF === 'refs/heads/main';

function info(msg) {
  console.log(redact(`[indexnow] ${msg}`, KEY));
}
function warn(msg) {
  const line = redact(`[indexnow] ${msg}`, KEY);
  console.log(IN_ACTIONS ? `::warning::${line}` : `WARNING ${line}`);
}

function parseArgs(argv) {
  const [mode, ...rest] = argv;
  const opts = { mode, all: false, dryRun: false };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--all') opts.all = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--dist' || a === '--out' || a === '--before') {
      const v = rest[++i];
      if (!v) throw new UsageError(`missing value for ${a}`);
      opts[a.slice(2)] = v;
    } else throw new UsageError(`unknown argument: ${a}`);
  }
  if (!['write-key', 'snapshot', 'notify'].includes(mode)) throw new UsageError(`unknown mode: ${mode ?? '(none)'}`);
  if (!opts.dist) throw new UsageError('--dist is required');
  if (mode === 'snapshot' && !opts.out) throw new UsageError('--out is required for snapshot');
  return opts;
}

class UsageError extends Error {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, timeoutMs = 10000) {
  return fetch(url, {
    redirect: 'manual',
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(timeoutMs),
  });
}

function readDistLocs(distDir) {
  const file = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(file)) return null;
  return parseSitemapLocs(fs.readFileSync(file, 'utf8')).filter(isProductionUrl);
}

async function pool(items, size, fn) {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(size, queue.length) }, async () => {
    while (queue.length) await fn(queue.shift());
  });
  await Promise.all(workers);
}

function cmdWriteKey(opts) {
  if (!IS_MAIN) return info('not production (GITHUB_REF is not refs/heads/main); skipped');
  if (!KEY) return info('INDEXNOW_KEY not set; IndexNow disabled');
  if (!isValidKey(KEY)) return warn('INDEXNOW_KEY has an invalid format (need 8-128 chars of A-Z a-z 0-9 -); key file not written');
  try {
    writeKeyFile(opts.dist, KEY);
    info('key file written to dist (name redacted)');
  } catch (e) {
    warn(`could not write key file: ${e.message}`);
  }
}

async function cmdSnapshot(opts) {
  if (!KEY) return info('INDEXNOW_KEY not set; IndexNow disabled; no snapshot');
  const outAbs = path.resolve(opts.out);
  const distAbs = path.resolve(opts.dist);
  if (outAbs === distAbs || outAbs.startsWith(distAbs + path.sep)) {
    return warn('--out must be outside the dist directory; no snapshot written');
  }
  const distLocs = readDistLocs(opts.dist);
  if (!distLocs) return warn(`no sitemap.xml in ${opts.dist}; no snapshot written`);
  let liveLocs = [];
  try {
    const res = await get(`${ORIGIN}/sitemap.xml`);
    if (res.status === 200) liveLocs = parseSitemapLocs(await res.text()).filter(isProductionUrl);
    else warn(`live sitemap returned HTTP ${res.status}; using the dist sitemap only`);
  } catch (e) {
    warn(`live sitemap fetch failed (${e.name}); using the dist sitemap only`);
  }
  const urls = [...new Set([...distLocs, ...liveLocs])].sort();
  const entries = {};
  await pool(urls, 4, async (url) => {
    try {
      const res = await get(url);
      if (res.status === 200) entries[url] = { status: 'ok', sig: pageSignature(await res.text()) };
      else if (res.status === 404 || res.status === 410) entries[url] = { status: 'absent' };
      else entries[url] = { status: 'unknown', http: res.status };
    } catch (e) {
      entries[url] = { status: 'unknown', error: e.name };
    }
  });
  const counts = {};
  for (const e of Object.values(entries)) counts[e.status] = (counts[e.status] || 0) + 1;
  try {
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, JSON.stringify({ version: 1, origin: ORIGIN, createdAt: new Date().toISOString(), entries }, null, 2));
  } catch (e) {
    return warn(`could not write snapshot: ${e.message}`);
  }
  info(`snapshot of ${urls.length} live URLs: ${JSON.stringify(counts)}`);
  const unknown = Object.entries(entries).filter(([, e]) => e.status === 'unknown');
  if (unknown.length) warn(`${unknown.length} URL(s) could not be fetched and will not be compared: ${unknown.map(([u, e]) => `${u} (${e.http ?? e.error})`).join(', ')}`);
}

function readSnapshot(file) {
  if (!file) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data && data.version === 1 && data.origin === ORIGIN && data.entries && typeof data.entries === 'object') return data.entries;
  } catch {
    // fall through
  }
  return null;
}

async function verifyKeyFile(key) {
  const url = `${ORIGIN}/${key}.txt`;
  let last = 'no response';
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await get(url);
      lastStatus = res.status;
      const body = res.status === 200 ? (await res.text()).trim() : '';
      if (res.status === 200 && body === key) return { ok: true };
      last = res.status === 200 ? 'HTTP 200 with unexpected content' : `HTTP ${res.status}`;
    } catch (e) {
      lastStatus = 0;
      last = e.name;
    }
    if (attempt < 6) await sleep(10000);
  }
  // 404 or wrong content = real misconfiguration; transient/blocked responses = submit anyway.
  const abort = lastStatus === 404 || last === 'HTTP 200 with unexpected content';
  return { ok: false, abort, reason: last };
}

const STATUS_TEXT = {
  200: 'OK, URLs submitted',
  202: 'accepted; key validation pending',
  400: 'bad request (invalid format)',
  403: 'forbidden (key not valid / key file not found)',
  422: 'unprocessable (URLs do not belong to the host or key mismatch)',
  429: 'too many requests',
};

async function post(payload) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'User-Agent': UA },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      if (res.status >= 500 && attempt === 1) {
        warn(`IndexNow returned HTTP ${res.status}; retrying once in 5 s`);
        await sleep(5000);
        continue;
      }
      return res.status;
    } catch (e) {
      if (attempt === 1) {
        warn(`IndexNow request failed (${e.name}); retrying once in 5 s`);
        await sleep(5000);
        continue;
      }
      throw e;
    }
  }
  return 0;
}

async function cmdNotify(opts) {
  const all = opts.all || process.env.INDEXNOW_ALL === 'true';
  let dryRun = opts.dryRun;
  if (!dryRun && !(IN_ACTIONS && IS_MAIN)) {
    dryRun = true;
    info('not a production CI run (needs GITHUB_ACTIONS=true and GITHUB_REF=refs/heads/main); forcing dry-run');
  }
  let key = KEY;
  if (!key) {
    if (!dryRun) return info('INDEXNOW_KEY not set; IndexNow disabled');
    key = 'dry-run-key';
  } else if (!isValidKey(key)) {
    return warn('INDEXNOW_KEY has an invalid format; nothing submitted');
  }

  const distLocs = readDistLocs(opts.dist);
  if (!distLocs) return warn(`no sitemap.xml in ${opts.dist}; nothing submitted`);
  const after = {};
  for (const url of distLocs) {
    const file = distFileFor(url, opts.dist);
    if (!fs.existsSync(file)) {
      warn(`dist file missing for ${url}; skipped`);
      continue;
    }
    after[url] = pageSignature(fs.readFileSync(file, 'utf8'));
  }

  let before = {};
  if (!all) {
    const snap = readSnapshot(opts.before);
    if (!snap) return info('no snapshot; nothing submitted; use workflow input indexnow_all for a full submit');
    before = snap;
  }
  const d = diffSignatures(before, after, { all });
  info(`mode=${all ? 'all' : 'changed'} added=${d.added.length} changed=${d.changed.length} removed=${d.removed.length} unchanged=${d.unchanged.length} skipped(unknown)=${d.skipped.length}`);
  if (!d.submit.length) return info('no new or materially changed URLs; nothing submitted');
  info(`${d.submit.length} URL(s) to submit:\n  ${d.submit.join('\n  ')}`);

  const payload = buildPayload(key, d.submit);
  if (dryRun) {
    console.log(redact(`[indexnow] dry-run payload (not sent):\n${JSON.stringify(payload, null, 2)}`, key));
    return;
  }

  const check = await verifyKeyFile(key);
  if (!check.ok) {
    if (check.abort) return warn(`key file check failed (${check.reason}); nothing submitted. Is INDEXNOW_KEY unchanged since the deploy?`);
    warn(`could not verify key file (${check.reason}); submitting anyway`);
  }
  try {
    const status = await post(payload);
    const text = STATUS_TEXT[status] || 'unexpected response';
    if (status === 200 || status === 202) info(`IndexNow HTTP ${status}: ${text}; ${d.submit.length} URL(s)`);
    else warn(`IndexNow HTTP ${status}: ${text}; ${d.submit.length} URL(s) not accepted`);
  } catch (e) {
    warn(`IndexNow request failed (${e.name}); nothing submitted`);
  }
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`[indexnow] usage error: ${e.message}`);
      console.error('usage: node scripts/indexnow.mjs write-key|snapshot|notify --dist <dir> [--out <file>] [--before <file>] [--all] [--dry-run]');
      process.exit(2);
    }
    throw e;
  }
  if (opts.mode === 'write-key') cmdWriteKey(opts);
  else if (opts.mode === 'snapshot') await cmdSnapshot(opts);
  else await cmdNotify(opts);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((e) => {
    warn(`unexpected error: ${e && e.message ? e.message : e}`);
    process.exit(1);
  });
}
