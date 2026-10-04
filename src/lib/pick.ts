import type { Language } from '@i18n/index';

/**
 * Inline copy helper for component-level strings that are not (yet) in the
 * central i18n dictionary. Falls back to English when a language is missing.
 */
export type Copy = { en: string } & Partial<Record<Exclude<Language, 'en'>, string>>;

export function pick(lang: Language, copy: Copy): string {
  return copy[lang] ?? copy.en;
}
