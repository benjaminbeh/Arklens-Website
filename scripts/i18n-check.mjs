#!/usr/bin/env node
// Post-build i18n checks for the Arklens static site (design §10 (2), checks a–l).
// Reads dist/ only, uses Node built-ins only, exits non-zero with a per-file report.
// Usage: npm run build && npm run check:i18n
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.arklens.ch';
const LOCALES = ['en', 'fr', 'de', 'it'];
const NON_EN = ['fr', 'de', 'it'];
const REGION = { en: 'en-CH', fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };
const OG = { en: 'en_CH', fr: 'fr_CH', de: 'de_CH', it: 'it_CH' };
const PAGES = ['/', '/start/', '/contact/', '/legal/', '/privacy/', '/terms/'];
const MSG_ATTRS = ['sending', 'submit', 'invalid', 'rate-limited', 'verification', 'network', 'retry'];
const ASSET_PREFIXES = ['/api/', '/favicon', '/apple-touch-icon.png', '/android-chrome-', '/arklens-logo.png', '/_astro/', '/sitemap.xml', '/robots.txt'];
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
// Text-bearing attributes extracted for (f) and (g); `content` only on text-bearing meta tags.
const TEXT_ATTRS = ['aria-label', 'placeholder', 'alt', 'title'];
const TEXT_META = new Set(['title', 'description', 'og:title', 'og:description', 'twitter:title', 'twitter:description']);
const SHY = '\u00AD';

// ---------------------------------------------------------------- reporting
const failures = new Map(); // file -> string[]
const warnings = new Map();
const rel = (f) => path.relative(ROOT, f) || f;
function fail(file, check, msg) {
  const k = rel(file);
  if (!failures.has(k)) failures.set(k, []);
  failures.get(k).push(`(${check}) ${msg}`);
}
function warn(file, check, msg) {
  const k = rel(file);
  if (!warnings.has(k)) warnings.set(k, []);
  warnings.get(k).push(`(${check}) ${msg}`);
}
class ScriptError extends Error {}

// ---------------------------------------------------------------- decode + extract
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00A0' };
function decode(s, file) {
  return s.replace(/&(#\d+|#[xX][0-9a-fA-F]+|[A-Za-z][A-Za-z0-9]*);/g, (m, body) => {
    if (body[0] === '#') {
      const cp = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return String.fromCodePoint(cp);
    }
    if (Object.hasOwn(NAMED, body)) return NAMED[body];
    throw new ScriptError(`unsupported HTML entity ${m} in ${rel(file)}`);
  });
}

function readJsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
}

function strip(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

const ATTR_RE = /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
// Tokenises stripped HTML into tags (attrs decoded) and text nodes (decoded).
function tokenize(html, file) {
  const src = strip(html);
  const tokens = [];
  // Quote-aware, so a '>' inside an attribute value (e.g. Tailwind `[&>svg]:`) doesn't end the tag.
  const re = /<(\/?)([A-Za-z][A-Za-z0-9-]*)((?:\s+(?:[^>"']|"[^"]*"|'[^']*')*?)?)\s*(\/?)>|<![^>]*>/g;
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    if (m.index > last) {
      const raw = src.slice(last, m.index);
      tokens.push({ type: 'text', value: decode(raw, file) });
    }
    last = re.lastIndex;
    if (!m[2]) continue; // doctype
    const name = m[2].toLowerCase();
    if (m[1]) {
      tokens.push({ type: 'close', name });
      continue;
    }
    const attrs = {};
    for (const a of (m[3] || '').matchAll(ATTR_RE)) {
      const v = a[2] ?? a[3] ?? a[4] ?? '';
      attrs[a[1].toLowerCase()] = decode(v, file);
    }
    tokens.push({ type: 'open', name, attrs, selfClosing: !!m[4] || VOID.has(name) });
  }
  if (last < src.length) tokens.push({ type: 'text', value: decode(src.slice(last), file) });
  return tokens;
}

// Index of the token closing the element opened at tokens[i].
function closeIndex(tokens, i) {
  const t = tokens[i];
  if (t.selfClosing) return i;
  let depth = 0;
  for (let j = i; j < tokens.length; j++) {
    const x = tokens[j];
    if (x.type === 'open' && x.name === t.name && !x.selfClosing) depth++;
    else if (x.type === 'close' && x.name === t.name && --depth === 0) return j;
  }
  return tokens.length - 1;
}
const innerText = (tokens, i) =>
  tokens.slice(i + 1, closeIndex(tokens, i)).filter((x) => x.type === 'text').map((x) => x.value).join('');
const findOpen = (tokens, pred, from = 0) => {
  for (let i = from; i < tokens.length; i++) if (tokens[i].type === 'open' && pred(tokens[i])) return i;
  return -1;
};
const hasClass = (t, cls) => (t.attrs.class || '').split(/\s+/).includes(cls);

// Text values a reader sees or hears: text nodes + text attributes + text meta content.
function textValues(tokens) {
  const out = [];
  for (const t of tokens) {
    if (t.type === 'text') out.push(t.value);
    else if (t.type === 'open') {
      for (const a of TEXT_ATTRS) if (a in t.attrs) out.push(t.attrs[a]);
      for (const [k, v] of Object.entries(t.attrs)) if (k.startsWith('data-msg-') || k.startsWith('data-label-')) out.push(v);
      if (t.name === 'meta' && 'content' in t.attrs && TEXT_META.has(t.attrs.name || t.attrs.property || '')) out.push(t.attrs.content);
    }
  }
  return out;
}
const normalise = (s) => s.replaceAll(SHY, '').replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- matchers
const APOS_RE = /\p{L}'\p{L}/u;
function apostropheHits(values) {
  return values.filter((v) => APOS_RE.test(v)).map(normalise);
}
const AMOUNT = /CHF[\s\u00A0-]?\d[\d’'.,\-–]*/g;
const VALID = /^CHF\u00A0\d+(’\d{3})*(–\d+(’\d{3})*)?$/;
function amountHits(values) {
  const bad = [];
  for (const text of values) {
    for (const m of text.matchAll(AMOUNT)) {
      const v = m[0].replace(/\.$/, '');
      if (!VALID.test(v)) bad.push(JSON.stringify(v));
    }
  }
  return bad;
}
// Values relevant to (k): visible text plus content/aria-label attributes.
function amountValues(tokens) {
  const out = [];
  for (const t of tokens) {
    if (t.type === 'text') out.push(t.value);
    else if (t.type === 'open') {
      if ('aria-label' in t.attrs) out.push(t.attrs['aria-label']);
      if ('content' in t.attrs) out.push(t.attrs.content);
    }
  }
  return out;
}

// ---------------------------------------------------------------- self-tests
function selfTest() {
  const fx = '<fixture>';
  const g = apostropheHits(textValues(tokenize('<p>l&#39;offre</p>', fx)));
  if (g.length !== 1) throw new ScriptError('self-test failed: (g)');
  const k = amountHits(amountValues(tokenize('<p>CHF&nbsp;15-30</p>', fx)));
  if (k.length !== 1) throw new ScriptError('self-test failed: (k)');
  const okK = amountHits(amountValues(tokenize('<p>CHF&nbsp;15–30 and CHF&nbsp;0.</p>', fx)));
  if (okK.length !== 0) throw new ScriptError('self-test failed: (k) valid amounts reported');
  const d = textValues(tokenize('<p>Weber &amp; Partner</p>', fx));
  if (d.length !== 1 || d[0] !== 'Weber & Partner') throw new ScriptError('self-test failed: decoder');
  let threw = false;
  try { decode('&eacute;', fx); } catch { threw = true; }
  if (!threw) throw new ScriptError('self-test failed: decoder accepted an unsupported entity');
}

// ---------------------------------------------------------------- allowlist
function loadAllowlist() {
  const file = path.join(ROOT, 'scripts', 'i18n-allowlist.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const problems = [];
  for (const kind of ['terms', 'values']) {
    if (!Array.isArray(data[kind])) problems.push(`"${kind}" must be an array`);
    for (const [i, e] of (data[kind] || []).entries()) {
      const where = `${kind}[${i}] ${JSON.stringify(e?.v)}`;
      if (typeof e?.v !== 'string' || !e.v.trim()) problems.push(`${where}: missing "v"`);
      if (typeof e?.['//'] !== 'string' || !e['//'].trim()) problems.push(`${where}: missing "//" justification`);
      if ('locales' in e) {
        if (!Array.isArray(e.locales) || !e.locales.length || !e.locales.every((l) => NON_EN.includes(l))) {
          problems.push(`${where}: "locales" must be a non-empty array of fr|de|it`);
        }
      }
    }
  }
  if (problems.length) throw new ScriptError(`invalid scripts/i18n-allowlist.json:\n  ${problems.join('\n  ')}`);
  const applies = (e, lang) => !e.locales || e.locales.includes(lang);
  return {
    values: (lang) => new Set(data.values.filter((e) => applies(e, lang)).map((e) => normalise(e.v))),
    // Longest first, so multi-word terms ("Maison Dupont") are removed before their parts.
    terms: (lang) => data.terms.filter((e) => applies(e, lang)).map((e) => normalise(e.v)).sort((a, b) => b.length - a.length),
  };
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// True when every word token of `value` is covered by an applicable term or is numeric/punctuation.
function coveredByTerms(value, terms) {
  let rest = value;
  for (const term of terms) {
    rest = rest.replace(new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(term)}(?![\\p{L}\\p{N}])`, 'gu'), ' ');
  }
  return !/\p{L}/u.test(rest);
}

// ---------------------------------------------------------------- dist helpers
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
const fileFor = (lang, page) => path.join(DIST, lang === 'en' ? '' : lang, page, 'index.html');
const urlPath = (lang, page) => (lang === 'en' ? page : `/${lang}${page}`);
const withSlash = (p) => {
  const [pathname, rest = ''] = p.split(/(?=[?#])/);
  return (pathname.endsWith('/') ? pathname : `${pathname}/`) + rest;
};
function attrsOf(tokens, pred) {
  return tokens.filter((t) => t.type === 'open' && pred(t)).map((t) => t.attrs);
}

function contactReasons() {
  // Parsed from the source of truth so labels can't drift from the server validator.
  const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'contact.ts'), 'utf8');
  const block = src.match(/CONTACT_REASONS\s*=\s*\[([\s\S]*?)\]/);
  if (!block) throw new ScriptError('could not parse CONTACT_REASONS from src/lib/contact.ts');
  return new Set([...block[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map((m) => m[1] ?? m[2]));
}

function reasonOptions(tokens) {
  const i = findOpen(tokens, (t) => t.name === 'select' && t.attrs.id === 'reason');
  if (i < 0) return null;
  const end = closeIndex(tokens, i);
  const opts = [];
  for (let j = i + 1; j < end; j++) {
    if (tokens[j].type === 'open' && tokens[j].name === 'option') {
      opts.push({ value: tokens[j].attrs.value ?? null, label: normalise(innerText(tokens, j)) });
    }
  }
  return opts;
}

// ---------------------------------------------------------------- main
function main() {
  selfTest();
  if (!fs.existsSync(DIST)) throw new ScriptError('dist/ not found: run `npm run build` first');
  const allow = loadAllowlist();
  const reasons = contactReasons();
  const files = walk(DIST);

  // (a) page set
  const expected = new Set(LOCALES.flatMap((l) => PAGES.map((p) => fileFor(l, p))));
  const actual = new Set(files.filter((f) => path.basename(f) === 'index.html'));
  for (const f of expected) if (!actual.has(f)) fail(f, 'a', 'expected page missing');
  for (const f of actual) if (!expected.has(f)) fail(f, 'a', 'unexpected index.html page');
  if (fs.existsSync(path.join(DIST, 'en'))) fail(path.join(DIST, 'en'), 'a', 'dist/en/ must not exist');
  const notFound = path.join(DIST, '404.html');
  if (!fs.existsSync(notFound)) fail(notFound, 'a', '404.html missing');
  else {
    const tk = tokenize(fs.readFileSync(notFound, 'utf8'), notFound);
    const robots = attrsOf(tk, (t) => t.name === 'meta' && t.attrs.name === 'robots');
    if (!robots.some((a) => a.content === 'noindex')) fail(notFound, 'a', 'missing <meta name="robots" content="noindex">');
    if (attrsOf(tk, (t) => t.name === 'link' && t.attrs.rel === 'canonical').length) fail(notFound, 'a', 'must not have a canonical');
    if (attrsOf(tk, (t) => 'hreflang' in t.attrs && t.name === 'link').length) fail(notFound, 'a', 'must not have hreflang links');
  }

  // Parse every locale page once.
  const pages = new Map(); // `${lang}${page}` -> { file, raw, tokens }
  for (const lang of LOCALES) {
    for (const page of PAGES) {
      const file = fileFor(lang, page);
      if (!fs.existsSync(file)) continue;
      const raw = fs.readFileSync(file, 'utf8');
      pages.set(lang + page, { file, raw, tokens: tokenize(raw, file), lang, page });
    }
  }

  // EN counterpart value sets for (f) and (h)
  const enValues = new Map();
  for (const page of PAGES) {
    const p = pages.get('en' + page);
    if (p) enValues.set(page, new Set(textValues(p.tokens).map(normalise).filter(Boolean)));
  }
  const heroTrustCount = (tokens) => {
    const sec = findOpen(tokens, (t) => t.name === 'section' && t.attrs['aria-labelledby'] === 'hero-title');
    if (sec < 0) return -1;
    const ul = findOpen(tokens, (t) => t.name === 'ul' && hasClass(t, 'sm:flex-wrap') && hasClass(t, 'text-steel-700'), sec);
    if (ul < 0 || ul > closeIndex(tokens, sec)) return -1;
    const end = closeIndex(tokens, ul);
    let n = 0;
    for (let j = ul + 1; j < end; j++) if (tokens[j].type === 'open' && tokens[j].name === 'li') n++;
    return n;
  };
  const enHome = pages.get('en/');
  const enTrust = enHome ? heroTrustCount(enHome.tokens) : -1;
  const enReasons = pages.get('en/contact/') ? reasonOptions(pages.get('en/contact/').tokens) : null;

  for (const { file, raw, tokens, lang, page } of pages.values()) {
    const ownUrl = SITE + urlPath(lang, page);
    const values = textValues(tokens);

    // (b) SEO head
    const html = attrsOf(tokens, (t) => t.name === 'html')[0];
    if (html?.lang !== REGION[lang]) fail(file, 'b', `<html lang="${html?.lang}"> expected "${REGION[lang]}"`);
    const canon = attrsOf(tokens, (t) => t.name === 'link' && t.attrs.rel === 'canonical');
    if (canon.length !== 1 || canon[0].href !== ownUrl) fail(file, 'b', `canonical ${JSON.stringify(canon.map((c) => c.href))} expected ${ownUrl}`);
    const alts = attrsOf(tokens, (t) => t.name === 'link' && t.attrs.rel === 'alternate' && 'hreflang' in t.attrs);
    const wantAlts = { ...Object.fromEntries(LOCALES.map((l) => [REGION[l], SITE + urlPath(l, page)])), 'x-default': SITE + page };
    if (alts.length !== 5) fail(file, 'b', `${alts.length} hreflang links, expected 5`);
    for (const [hl, href] of Object.entries(wantAlts)) {
      const got = alts.filter((a) => a.hreflang === hl);
      if (got.length !== 1 || got[0].href !== href) fail(file, 'b', `hreflang ${hl} -> ${JSON.stringify(got.map((a) => a.href))} expected ${href}`);
    }
    const ogLoc = attrsOf(tokens, (t) => t.name === 'meta' && t.attrs.property === 'og:locale').map((a) => a.content);
    const ogAlt = attrsOf(tokens, (t) => t.name === 'meta' && t.attrs.property === 'og:locale:alternate').map((a) => a.content).sort();
    const wantOgAlt = LOCALES.filter((l) => l !== lang).map((l) => OG[l]).sort();
    if (ogLoc.length !== 1 || ogLoc[0] !== OG[lang]) fail(file, 'b', `og:locale ${JSON.stringify(ogLoc)} expected ${OG[lang]}`);
    if (JSON.stringify(ogAlt) !== JSON.stringify(wantOgAlt)) fail(file, 'b', `og:locale:alternate ${JSON.stringify(ogAlt)} expected ${JSON.stringify(wantOgAlt)}`);
    const ld = readJsonLd(raw);
    if (!ld.length) fail(file, 'b', 'no JSON-LD block');
    for (const block of ld) {
      let json;
      try { json = JSON.parse(block); } catch (e) { fail(file, 'b', `JSON-LD does not parse: ${e.message}`); continue; }
      const nodes = Array.isArray(json['@graph']) ? json['@graph'] : [json];
      const wp = nodes.filter((n) => n['@type'] === 'WebPage');
      if (wp.length !== 1 || wp[0].inLanguage !== REGION[lang]) fail(file, 'b', `JSON-LD WebPage inLanguage ${JSON.stringify(wp.map((n) => n.inLanguage))} expected ${REGION[lang]}`);
      else if (wp[0].url !== ownUrl) fail(file, 'b', `JSON-LD WebPage url ${wp[0].url} expected ${ownUrl}`);
    }
    const titleIdx = findOpen(tokens, (t) => t.name === 'title');
    const metaTexts = [titleIdx >= 0 ? innerText(tokens, titleIdx) : ''];
    for (const a of attrsOf(tokens, (t) => t.name === 'meta')) {
      const key = a.name || a.property || '';
      if (key === 'description' || key.startsWith('og:') || key.startsWith('twitter:')) metaTexts.push(a.content ?? '');
    }
    if (metaTexts.some((s) => s.includes(SHY))) fail(file, 'b', 'soft hyphen (U+00AD) in <title>, description or og:/twitter: content');

    // (d) locale persistence of internal links
    for (const t of tokens) {
      if (t.type !== 'open') continue;
      if ('data-lang-link' in t.attrs) {
        const { href, 'data-base-href': base, lang: target } = t.attrs;
        if (href !== base) fail(file, 'd', `switcher href ${href} !== data-base-href ${base}`);
        if (!LOCALES.includes(target)) fail(file, 'd', `switcher link has invalid lang="${target}"`);
        else if (withSlash(base ?? '') !== urlPath(target, page)) fail(file, 'd', `switcher ${target} -> ${base} expected ${urlPath(target, page)}`);
        continue;
      }
      if (lang === 'en') continue;
      for (const attr of ['href', 'data-base-href']) {
        const v = t.attrs[attr];
        if (!v || !v.startsWith('/') || v.startsWith('//')) continue;
        if (ASSET_PREFIXES.some((p) => v.startsWith(p))) continue;
        if (!new RegExp(`^/${lang}(?=$|[/?#])`).test(v)) fail(file, 'd', `<${t.name} ${attr}="${v}"> leaves /${lang}/`);
      }
    }

    // (e) no ß in German pages (raw file and decoded text)
    if (lang === 'de' && (raw.includes('ß') || values.some((v) => v.includes('ß')))) {
      const ctx = values.filter((v) => v.includes('ß')).map(normalise);
      fail(file, 'e', `contains ß${ctx.length ? `: ${ctx.map((c) => JSON.stringify(c)).join(', ')}` : ''}`);
    }

    // (f) leftover English
    if (lang !== 'en' && enValues.has(page)) {
      const en = enValues.get(page);
      const okValues = allow.values(lang);
      const terms = allow.terms(lang);
      const seen = new Set();
      for (const v of values.map(normalise)) {
        if (!v || seen.has(v) || !en.has(v)) continue;
        seen.add(v);
        if (okValues.has(v) || coveredByTerms(v, terms)) continue;
        fail(file, 'f', `identical to EN: ${JSON.stringify(v)}`);
      }
    }

    // (g) ASCII apostrophes between letters (EN warn-only)
    for (const hit of new Set(apostropheHits(values))) {
      (lang === 'en' ? warn : fail)(file, 'g', `ASCII apostrophe: ${JSON.stringify(hit)}`);
    }

    // (k) CHF amount formatting
    for (const bad of new Set(amountHits(amountValues(tokens)))) fail(file, 'k', `CHF amount ${bad} must match CHF\\u00A0n[–n]`);

    // (h) hero split + trust count
    if (page === '/') {
      const h1 = findOpen(tokens, (t) => t.name === 'h1' && t.attrs.id === 'hero-title');
      if (h1 < 0) fail(file, 'h', 'hero h1#hero-title missing');
      else {
        const end = closeIndex(tokens, h1);
        const span = findOpen(tokens, (t) => t.name === 'span' && hasClass(t, 'block'), h1);
        const accent = span > -1 && span < end ? normalise(innerText(tokens, span)) : '';
        const lead = normalise(tokens.slice(h1 + 1, span > -1 && span < end ? span : end).filter((x) => x.type === 'text').map((x) => x.value).join(''));
        if (!lead || !accent) fail(file, 'h', `hero h1 lacks lead/accent split (lead ${JSON.stringify(lead)}, accent ${JSON.stringify(accent)})`);
      }
      const n = heroTrustCount(tokens);
      if (n < 1) fail(file, 'h', 'hero trust list not found');
      else if (lang !== 'en' && n !== enTrust) fail(file, 'h', `hero trust items ${n}, EN has ${enTrust}`);
    }

    // (i) contact form client-script strings
    if (page === '/contact/') {
      const form = attrsOf(tokens, (t) => t.name === 'form' && t.attrs.id === 'contact-form')[0];
      if (!form) fail(file, 'i', '#contact-form missing');
      else {
        if (form['data-lang'] !== lang) fail(file, 'i', `data-lang="${form['data-lang']}" expected "${lang}"`);
        for (const k of MSG_ATTRS) if (!form[`data-msg-${k}`]?.trim()) fail(file, 'i', `data-msg-${k} missing or empty`);
      }
    }

    // (j) contact reason options
    if (page === '/contact/' && lang !== 'en') {
      const opts = reasonOptions(tokens);
      const okValues = allow.values(lang);
      if (!opts) fail(file, 'j', '#reason select missing');
      else {
        const enLabel = new Map((enReasons || []).map((o) => [o.value, o.label]));
        const got = new Set();
        for (const o of opts) {
          if (o.value === null) { fail(file, 'j', `option ${JSON.stringify(o.label)} has no value`); continue; }
          if (o.value !== '' && !reasons.has(o.value)) fail(file, 'j', `option value ${JSON.stringify(o.value)} not in CONTACT_REASONS`);
          got.add(o.value);
          if (!o.label) fail(file, 'j', `option ${JSON.stringify(o.value)} has an empty label`);
          else if (o.label === enLabel.get(o.value) && !okValues.has(o.label)) fail(file, 'j', `option ${JSON.stringify(o.value)} label identical to EN: ${JSON.stringify(o.label)}`);
        }
        for (const r of reasons) if (!got.has(r)) fail(file, 'j', `CONTACT_REASONS value ${JSON.stringify(r)} has no option`);
      }
    }

    // (l) start step indicator
    if (page === '/start/') {
      if (/\{n\}|\{t\}/.test(raw)) fail(file, 'l', 'literal {n} or {t} in output');
      const steps = tokens.map((t, i) => [t, i]).filter(([t]) => t.type === 'open' && t.name === 'fieldset' && hasClass(t, 'step'));
      if (steps.length !== 3) fail(file, 'l', `${steps.length} step fieldsets, expected 3`);
      steps.forEach(([, i], n) => {
        const eb = findOpen(tokens, (t) => t.name === 'span' && hasClass(t, 'eyebrow'), i);
        const text = eb > -1 && eb < closeIndex(tokens, i) ? normalise(innerText(tokens, eb)) : '';
        const digits = text.match(/\d+/g) || [];
        if (digits.join(',') !== `${n + 1},3`) fail(file, 'l', `step ${n + 1} eyebrow ${JSON.stringify(text)} expected step ${n + 1} of 3`);
      });
    }
  }

  // (c) sitemap
  const smFile = path.join(DIST, 'sitemap.xml');
  if (!fs.existsSync(smFile)) fail(smFile, 'c', 'sitemap.xml missing');
  else {
    const xml = fs.readFileSync(smFile, 'utf8');
    const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const locs = urls.map((u) => (u.match(/<loc>([^<]*)<\/loc>/) || [])[1]);
    const want = new Set([...actual].map((f) => SITE + '/' + path.relative(DIST, path.dirname(f)).split(path.sep).filter(Boolean).map((s) => s + '/').join('')));
    const got = new Set(locs);
    for (const u of want) if (!got.has(u)) fail(smFile, 'c', `missing <loc> ${u}`);
    for (const u of got) if (!want.has(u)) fail(smFile, 'c', `<loc> ${u} has no index.html page`);
    if (got.size !== locs.length) fail(smFile, 'c', 'duplicate <loc> entries');
    urls.forEach((u, i) => {
      const n = (u.match(/<xhtml:link\b[^>]*rel="alternate"/g) || []).length;
      if (n !== 5) fail(smFile, 'c', `${locs[i]} has ${n} alternates, expected 5`);
    });
  }

  // ---------------------------------------------------------------- report
  for (const [f, list] of warnings) {
    console.warn(`WARN ${f}`);
    for (const w of list) console.warn(`  ${w}`);
  }
  if (failures.size) {
    for (const [f, list] of failures) {
      console.error(`FAIL ${f}`);
      for (const e of list) console.error(`  ${e}`);
    }
    const total = [...failures.values()].reduce((n, l) => n + l.length, 0);
    console.error(`\ni18n check failed: ${total} problem(s) in ${failures.size} file(s).`);
    process.exit(1);
  }
  console.log(`i18n check passed: ${pages.size} locale pages + 404.html + sitemap.xml, self-tests ok.`);
}

try {
  main();
} catch (e) {
  if (e instanceof ScriptError) {
    console.error(e.message);
    process.exit(2);
  }
  throw e;
}
