/**
 * Versions of the currently published legal texts (Terms of Use, Privacy Policy).
 * Imported by the Terms/Privacy pages ("Last updated") and by /api/start (acceptance record),
 * so the stored version always matches the text the applicant saw.
 *
 * Change a value ONLY when that legal wording materially changes.
 * A normal rebuild or deployment must never change these.
 * Contains no Astro or i18n imports so Pages Functions can import it.
 */
export const TERMS_VERSION = '2026-10-08';
export const PRIVACY_VERSION = '2026-10-08';

/** 'YYYY-MM-DD' → Date at 00:00 UTC. Throws on a malformed version. */
export function legalVersionDate(version: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(version);
  if (!m) throw new Error(`Invalid legal version: ${version}`);
  const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (date.toISOString().slice(0, 10) !== version) throw new Error(`Invalid legal version: ${version}`);
  return date;
}

/**
 * Formats a legal version date for display. Always in UTC, so the build machine's
 * time zone cannot shift the day.
 * numeric: same shape as toLocaleDateString(locale), e.g. 08/10/2026 (en-GB), 8.10.2026 (de-CH)
 * long:    e.g. 8 October 2026, 8 octobre 2026, 8. Oktober 2026, 8 ottobre 2026
 */
export function formatLegalVersion(version: string, locale: string, style: 'numeric' | 'long' = 'numeric'): string {
  const options: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
      : { timeZone: 'UTC' };
  return legalVersionDate(version).toLocaleDateString(locale, options);
}
