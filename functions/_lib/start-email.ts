/**
 * Pure email builders for /api/start (no worker-mailer import, so they can be
 * tested in Node). The internal application email is the authoritative V1
 * application and acceptance record.
 */

import { START_INDUSTRY_LABELS, START_PATH_LABELS, type StartIndustry, type StartPath } from '../../src/lib/start';
import { formatLegalVersion } from '../../src/lib/legal';
import { cleanLine, escapeHtml } from './security';

export type StartLang = 'en' | 'fr' | 'de' | 'it';

export interface StartApplication {
  path: StartPath;
  /** '' unless the path needs a URL */
  currentWebsite: string;
  businessName: string;
  industry: StartIndustry;
  goals: string;
  /** Applicant contact name (validated, single-line). */
  name: string;
  email: string;
  phone: string;
  page: string;
  lang: StartLang;
}

/** What the applicant accepted, recorded server-side only. */
export interface AcceptanceRecord {
  termsAccepted: true;
  /** Server-generated ISO 8601 UTC timestamp; never taken from the client. */
  termsAcceptedAt: string;
  termsVersion: string;
  privacyVersion: string;
  language: StartLang;
  email: string;
  /** Applicant contact name (validated, single-line). */
  name: string;
  businessName: string;
  applicationId: string;
}

const SUBJECT_BUSINESS_MAX = 80; // keeps the RFC 2047-encoded Subject well under 998 chars; full name is in the body

// Mirrors dateLocales in src/i18n; kept local so the function bundle does not pull in the dictionaries.
const DATE_LOCALES: Record<StartLang, string> = { en: 'en-GB', fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };

const td = (k: string, v: string) =>
  `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #E6EAF0;font-size:13px;color:#4F5B68;width:160px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E6EAF0;font-size:14px;vertical-align:top">${escapeHtml(v)}</td></tr>`;

export function buildApplicationEmail(app: StartApplication, record: AcceptanceRecord, submittedAt: Date) {
  const zurichTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Zurich',
  }).format(submittedAt);

  const rows: [string, string][] = [
    ['Application ID', record.applicationId],
    ['Submitted', `${submittedAt.toISOString()} (${zurichTime} Europe/Zurich)`],
    ['Name', app.name],
    ['Email', app.email],
    ...(app.phone ? [['Phone', app.phone] as [string, string]] : []),
    ['Business name', app.businessName],
    ['Industry', START_INDUSTRY_LABELS[app.industry]],
    ['Starting point', START_PATH_LABELS[app.path]],
    ...(app.currentWebsite ? [['Current website', app.currentWebsite] as [string, string]] : []),
    ['Website language', app.lang.toUpperCase()],
    ['Source page', app.page],
  ];

  const legal: [string, string][] = [
    ['Terms accepted', 'Yes'],
    ['Accepted at', record.termsAcceptedAt],
    ['Terms version', record.termsVersion],
    ['Privacy acknowledged', 'Yes'],
    ['Privacy version', record.privacyVersion],
  ];

  const businessChars = Array.from(app.businessName); // code points, so surrogate pairs aren't split
  const subjectBusiness =
    businessChars.length > SUBJECT_BUSINESS_MAX
      ? businessChars.slice(0, SUBJECT_BUSINESS_MAX - 1).join('').trimEnd() + '…'
      : app.businessName;
  const subject = cleanLine(`[ARKLENS APPLICATION] ${record.applicationId} — ${subjectBusiness}`, 200);
  const goals = app.goals || '—';

  const text = [
    'New Arklens application from arklens.ch',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Goals:',
    goals,
    '',
    'LEGAL ACCEPTANCE',
    ...legal.map(([k, v]) => `${k}: ${v}`),
    '',
    '—',
    'Reply to this email to answer the applicant directly.',
  ].join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#111418">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #E6EAF0;border-collapse:collapse">
<tr><td style="padding:20px 24px;border-bottom:2px solid #D52B1E;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4F5B68">Arklens application</td></tr>
<tr><td style="padding:8px 24px 0"><table role="presentation" width="100%" style="border-collapse:collapse">
${rows.map(([k, v]) => td(k, v)).join('\n')}
</table></td></tr>
<tr><td style="padding:20px 24px 4px;font-size:13px;color:#4F5B68">Goals</td></tr>
<tr><td style="padding:0 24px 24px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(goals)}</td></tr>
<tr><td style="padding:20px 24px 4px;font-size:12px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#111418;border-top:1px solid #E6EAF0">Legal acceptance</td></tr>
<tr><td style="padding:0 24px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">
${legal.map(([k, v]) => td(k, v)).join('\n')}
</table></td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #E6EAF0;font-size:12px;color:#66727F">Reply to this email to answer the applicant directly.</td></tr>
</table></body></html>`;

  return { subject, text, html };
}

/** Applicant acknowledgement copy. No submitted business information; no tracking. */
const CONFIRM_COPY: Record<StartLang, {
  subject: string;
  greeting: string;
  intro: string[];
  reference: string;
  submitted: string;
  terms: string;
  privacy: string;
  disclaimer: string;
  closing: string;
  tagline: string;
}> = {
  en: {
    subject: 'We received your application — Arklens',
    greeting: 'Hi',
    intro: ['Thank you for your application to Arklens.', 'We have received your request and will review it.'],
    reference: 'Application reference:',
    submitted: 'Submitted:',
    terms: 'Terms of Use accepted (version):',
    privacy: 'Privacy Policy acknowledged (version):',
    disclaimer: 'Submitting an application does not mean that Arklens has accepted the project. We will contact you after reviewing your request.',
    closing: 'Best regards,',
    tagline: 'Smarter technology for Swiss SMEs.',
  },
  fr: {
    subject: 'Nous avons bien reçu votre demande — Arklens',
    greeting: 'Bonjour',
    intro: ['Merci pour votre demande auprès d’Arklens.', 'Nous avons bien reçu votre demande et allons l’examiner.'],
    reference: 'Référence de la demande\u00A0:',
    submitted: 'Envoyée le\u00A0:',
    terms: 'Conditions d’utilisation acceptées (version)\u00A0:',
    privacy: 'Prise de connaissance de la Politique de confidentialité (version)\u00A0:',
    disclaimer: 'L’envoi d’une demande ne signifie pas qu’Arklens a accepté le projet. Nous vous contacterons après avoir examiné votre demande.',
    closing: 'Meilleures salutations,',
    tagline: 'Des technologies plus intelligentes pour les PME suisses.',
  },
  de: {
    subject: 'Wir haben Ihre Anfrage erhalten — Arklens',
    greeting: 'Guten Tag',
    intro: ['Vielen Dank für Ihre Anfrage an Arklens.', 'Wir haben Ihre Anfrage erhalten und werden sie prüfen.'],
    reference: 'Referenz Ihrer Anfrage:',
    submitted: 'Gesendet am:',
    terms: 'Nutzungsbedingungen akzeptiert (Version):',
    privacy: 'Datenschutzerklärung zur Kenntnis genommen (Version):',
    disclaimer: 'Das Einreichen einer Anfrage bedeutet nicht, dass Arklens das Projekt angenommen hat. Wir melden uns bei Ihnen, nachdem wir Ihre Anfrage geprüft haben.',
    closing: 'Freundliche Grüsse',
    tagline: 'Intelligente Technologien für Schweizer KMU.',
  },
  it: {
    subject: 'Abbiamo ricevuto la tua richiesta — Arklens',
    greeting: 'Buongiorno',
    intro: ['Grazie per la tua richiesta ad Arklens.', 'Abbiamo ricevuto la tua richiesta e la esamineremo.'],
    reference: 'Riferimento della richiesta:',
    submitted: 'Inviata il:',
    terms: 'Condizioni d’uso accettate (versione):',
    privacy: 'Presa visione dell’Informativa sulla privacy (versione):',
    disclaimer: 'L’invio di una richiesta non significa che Arklens abbia accettato il progetto. Ti contatteremo dopo aver esaminato la tua richiesta.',
    closing: 'Cordiali saluti,',
    tagline: 'Tecnologie intelligenti per le PMI svizzere.',
  },
};

export function buildApplicantConfirmation(record: AcceptanceRecord, submittedAt: Date) {
  const lang = record.language;
  const c = CONFIRM_COPY[lang] ?? CONFIRM_COPY.en;
  const locale = DATE_LOCALES[lang] ?? DATE_LOCALES.en;
  const submitted = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Zurich',
  }).format(submittedAt);

  // Label on one line, value on the next.
  const pairs: [string, string][] = [
    [c.reference, record.applicationId],
    [c.submitted, submitted],
    [c.terms, formatLegalVersion(record.termsVersion, locale, 'long')],
    [c.privacy, formatLegalVersion(record.privacyVersion, locale, 'long')],
  ];

  // Full submitted name (validated, single-line); escaped below for HTML.
  const greetingLine = record.name ? `${c.greeting} ${record.name},` : `${c.greeting},`;

  const text = [
    greetingLine,
    '',
    ...c.intro.flatMap((l) => [l, '']),
    ...pairs.flatMap(([k, v]) => [k, v, '']),
    c.disclaimer,
    '',
    c.closing,
    '',
    'Arklens',
    c.tagline,
    'arklens.ch',
  ].join('\n');

  const p = 'margin:0 0 16px;font-size:15px;line-height:1.6';
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;padding:24px;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#111418">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E6EAF0;border-collapse:collapse">
<tr><td style="padding:20px 28px;border-bottom:2px solid #D52B1E;font-size:13px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#111418">Arklens</td></tr>
<tr><td style="padding:28px 28px 8px">
<p style="${p}">${escapeHtml(greetingLine)}</p>
${c.intro.map((l) => `<p style="${p}">${escapeHtml(l)}</p>`).join('\n')}
${pairs.map(([k, v]) => `<p style="${p}">${escapeHtml(k)}<br><strong>${escapeHtml(v)}</strong></p>`).join('\n')}
<p style="${p}">${escapeHtml(c.disclaimer)}</p>
<p style="margin:24px 0 0;font-size:15px;line-height:1.6">${escapeHtml(c.closing)}</p>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6"><strong>Arklens</strong></p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E6EAF0;font-size:12px;line-height:1.6;color:#66727F">${escapeHtml(c.tagline)}<br>arklens.ch</td></tr>
</table></body></html>`;

  return { subject: c.subject, text, html };
}
