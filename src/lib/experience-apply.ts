/**
 * Shared Experience Programme application configuration, imported by the
 * /experience/apply page (client) and the /api/experience Pages Function (server).
 * Contains no secrets.
 */

/** Spoken languages offered as rows in the form (plus one optional free-text "other" language). */
export const XP_LANGUAGES = ['en', 'fr', 'de', 'it'] as const;
export type XpLanguage = (typeof XP_LANGUAGES)[number];

/** Practical self-assessed levels (not an exam scale). */
export const XP_LEVELS = ['basic', 'conversational', 'working', 'fluent'] as const;
export type XpLevel = (typeof XP_LEVELS)[number];

export const XP_SITUATIONS = ['student', 'graduate', 'looking', 'changing', 'returning', 'employed', 'selftaught', 'other'] as const;
export type XpSituation = (typeof XP_SITUATIONS)[number];

/** The four project groups shown on /experience/, plus "not sure yet". */
export const XP_INTERESTS = ['web', 'ai', 'business', 'content', 'unsure'] as const;
export type XpInterest = (typeof XP_INTERESTS)[number];

export const XP_START = ['asap', 'month', 'quarter', 'later'] as const;
export type XpStart = (typeof XP_START)[number];

export const XP_TIME = ['hours', 'halfday', 'day', 'more', 'depends'] as const;
export type XpTime = (typeof XP_TIME)[number];

export const XP_MODE = ['remote', 'onsite', 'either'] as const;
export type XpMode = (typeof XP_MODE)[number];

export const XP_LIMITS = {
  body: 30_000,
  name: 100,
  email: 254,
  region: 80,
  otherLanguage: 60,
  skills: 2000,
  learn: 1500,
  url: 300,
  links: 2,
  page: 200,
  /** Minimum length for the two required free-text answers. */
  textMin: 10,
} as const;

export const TURNSTILE_ACTION_EXPERIENCE = 'experience';

/**
 * Identifies the expectations wording the applicant acknowledged (recorded in the
 * internal email). Bump when the text changes.
 */
export const XP_ACK_VERSION = '2026-10-21';

/** Server-generated application ID: EXP-<UTC YYYYMMDD>-<8 uppercase hex from 4 random bytes>. */
export const EXPERIENCE_ID_RE = /^EXP-\d{8}-[0-9A-F]{8}$/;

/** English labels for the internal email (same wording as the EN page). */
export const XP_LABELS = {
  languages: { en: 'English', fr: 'French', de: 'German', it: 'Italian' } satisfies Record<XpLanguage, string>,
  levels: { basic: 'Basic', conversational: 'Conversational', working: 'Working proficiency', fluent: 'Fluent / native' } satisfies Record<XpLevel, string>,
  situations: {
    student: 'Student',
    graduate: 'Recently finished my studies',
    looking: 'Looking for my next role',
    changing: 'Changing career',
    returning: 'Returning to work',
    employed: 'Employed and looking to build experience in a new area',
    selftaught: 'Self-taught / independent learner',
    other: 'Other',
  } satisfies Record<XpSituation, string>,
  interests: {
    web: 'Websites & digital tools',
    ai: 'AI, automation & data',
    business: 'Business & research',
    content: 'Content, design & languages',
    unsure: 'Other / not sure yet',
  } satisfies Record<XpInterest, string>,
  start: {
    asap: 'As soon as a suitable project is available',
    month: 'Within the next month',
    quarter: 'In 1–3 months',
    later: 'Later / flexible',
  } satisfies Record<XpStart, string>,
  time: {
    hours: 'A few hours per week',
    halfday: 'Around half a day per week',
    day: 'Around one day per week',
    more: 'More than one day per week',
    depends: 'It depends on the project',
  } satisfies Record<XpTime, string>,
  mode: { remote: 'Remote', onsite: 'On-site', either: 'Either' } satisfies Record<XpMode, string>,
};
