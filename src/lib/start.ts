/**
 * Shared /start/ application-form configuration, imported by the /start page (client)
 * and the /api/start Pages Function (server). Contains no secrets.
 */

export const START_PATHS = ['new', 'update', 'extend', 'check'] as const;
export type StartPath = (typeof START_PATHS)[number];

/** Starting points that require the current website URL. */
export const START_PATHS_NEED_URL = ['update', 'extend'] as const satisfies readonly StartPath[];

export const START_INDUSTRIES = [
  'restaurant',
  'beauty',
  'trades',
  'consultant',
  'health',
  'garage',
  'retail',
  'services',
  'other',
] as const;
export type StartIndustry = (typeof START_INDUSTRIES)[number];

/** English labels for the internal application email (same wording as the EN page). */
export const START_PATH_LABELS: Record<StartPath, string> = {
  new: 'I need a website',
  update: 'My website needs an update',
  extend: 'My website works, but I need more',
  check: 'Check my business first',
};

export const START_INDUSTRY_LABELS: Record<StartIndustry, string> = {
  restaurant: 'Restaurant / Café',
  beauty: 'Hair & Beauty',
  trades: 'Trades / Crafts',
  consultant: 'Consulting',
  health: 'Healthcare',
  garage: 'Garage / Automotive',
  retail: 'Retail / Shop',
  services: 'Professional Services',
  other: 'Other',
};

export const START_LIMITS = {
  body: 20_000,
  name: 100,
  business: 150,
  email: 254,
  phone: 40,
  website: 300,
  goals: 3000,
  page: 200,
} as const;

export const TURNSTILE_ACTION_START = 'start';

/** Server-generated application ID: ARK-<UTC YYYYMMDD>-<8 uppercase hex from 4 random bytes>. */
export const APPLICATION_ID_RE = /^ARK-\d{8}-[0-9A-F]{8}$/;
