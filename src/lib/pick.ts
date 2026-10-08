import type { Language } from '@i18n/index';

/**
 * Inline copy helper for component- or page-local strings that are not in the
 * central i18n dictionary. Every locale is required, so a missing translation
 * is a type error in `astro check` rather than a silent English fallback.
 */
export type Copy = Record<Language, string>;

export function pick(lang: Language, copy: Copy): string {
  return copy[lang] ?? copy.en;
}
