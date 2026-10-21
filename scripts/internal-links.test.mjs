// Internal-link tests: every internal link should point at a canonical URL (trailing slash), so no
// link costs a 308 redirect hop. Run: node --test scripts/internal-links.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Sorted recursive walk returning files whose name matches `re`.
function walk(dir, re) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, re));
    else if (re.test(entry.name)) out.push(full);
  }
  return out;
}

const stripQueryAndHash = (s) => s.split(/[?#]/)[0];

test('localized paths in src end with a trailing slash', () => {
  const bad = [];
  for (const file of walk(path.join(root, 'src'), /\.(astro|ts)$/)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/getLocalizedPath\(\s*['"`]([^'"`]*)['"`]/g)) {
      const p = stripQueryAndHash(m[1]);
      if (!p.endsWith('/')) bad.push(`${path.relative(root, file)}: ${m[1]}`);
    }
  }
  assert.deepEqual(bad, [], `getLocalizedPath literals without trailing slash:\n${bad.join('\n')}`);
});

test('internal <a href> links in dist point at built pages with a trailing slash', (t) => {
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) return t.skip('dist not built');
  const bad = [];
  for (const file of walk(dist, /\.html$/)) {
    const rel = path.relative(dist, file);
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
      const href = m[1];
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const p = stripQueryAndHash(href);
      if (p.startsWith('/cdn-cgi/') || /\.[a-z0-9]+$/i.test(p)) continue;
      if (!p.endsWith('/') || !fs.existsSync(path.join(dist, p, 'index.html'))) bad.push(`${rel} -> ${href}`);
    }
  }
  assert.deepEqual(bad, [], `internal links that are not canonical built pages:\n${bad.join('\n')}`);
});
