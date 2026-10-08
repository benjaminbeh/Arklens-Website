/**
 * Shared contact-form configuration, imported by the /contact page (client)
 * and the /api/contact Pages Function (server). Contains no secrets.
 */

export const CONTACT_REASONS = [
  'General enquiry',
  'Free website',
  'Improve existing website',
  'Add features',
  'Automation / AI',
  'Contributor / student',
  'Partnership',
  'Other',
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

// Mirrors `locales` in src/i18n; kept separate so the function bundle does not pull in the dictionaries.
export const CONTACT_LANGS = ['en', 'fr', 'de', 'it'] as const;

export const CONTACT_LIMITS = {
  body: 20_000,
  name: 100,
  business: 150,
  email: 254,
  phone: 40,
  website: 300,
  message: 5000,
  messageMin: 10,
  page: 200,
} as const;

export const TURNSTILE_ACTION = 'contact';

/**
 * Turnstile site key (public by design).
 * The dev value is Cloudflare's always-pass test key, used only by `astro dev`
 * and local `wrangler pages dev`.
 */
export const TURNSTILE_SITE_KEY_PROD = '0x4AAAAAAFRTSPzwb29eFkW0';
export const TURNSTILE_SITE_KEY_TEST = '1x00000000000000000000AA';
