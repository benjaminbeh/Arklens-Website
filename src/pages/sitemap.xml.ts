import type { APIRoute } from 'astro';
import { getLocalizedPath, hreflangs, locales, sitePages } from '@i18n/index';

const SITE = 'https://www.arklens.ch';

// One <url> per page and locale, each listing all locale alternates plus x-default (EN).
// lastmod is omitted on purpose: a build date would be misleading.
const urls = sitePages.flatMap((page) => {
  const links = [
    ...locales.map(
      (code) => `    <xhtml:link rel="alternate" hreflang="${hreflangs[code]}" href="${SITE}${getLocalizedPath(page, code)}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${page}"/>`,
  ].join('\n');
  return locales.map((lang) => `  <url>\n    <loc>${SITE}${getLocalizedPath(page, lang)}</loc>\n${links}\n  </url>`);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
