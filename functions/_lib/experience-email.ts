/**
 * Pure email builders for /api/experience (no worker-mailer import, so they can be
 * tested in Node). The internal email is the authoritative V1 application record.
 */

import { XP_LABELS, type XpInterest, type XpLanguage, type XpLevel, type XpMode, type XpSituation, type XpStart, type XpTime } from '../../src/lib/experience-apply';
import { cleanLine, escapeHtml } from './security';

export type XpLang = 'en' | 'fr' | 'de' | 'it';

export interface ExperienceApplication {
  name: string;
  email: string;
  /** '' when not given */
  region: string;
  languages: Partial<Record<XpLanguage, XpLevel>>;
  /** '' when not given; when set, otherLanguageLevel is set too */
  otherLanguage: string;
  otherLanguageLevel: XpLevel | '';
  situation: XpSituation | '';
  interests: XpInterest[];
  skills: string;
  learn: string;
  start: XpStart;
  time: XpTime;
  mode: XpMode | '';
  links: string[];
  page: string;
  lang: XpLang;
}

export interface ExperienceRecord {
  applicationId: string;
  /** Server-generated ISO 8601 UTC timestamp; never taken from the client. */
  submittedAt: string;
  expectationsAccepted: true;
  ackVersion: string;
}

const SUBJECT_NAME_MAX = 80;
const DATE_LOCALES: Record<XpLang, string> = { en: 'en-GB', fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };

const td = (k: string, v: string) =>
  `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #E6EAF0;font-size:13px;color:#4F5B68;width:170px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E6EAF0;font-size:14px;vertical-align:top;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`;

export function languageSummary(app: ExperienceApplication): string {
  const rows = (Object.entries(app.languages) as [XpLanguage, XpLevel][]).map(
    ([code, level]) => `${XP_LABELS.languages[code]}: ${XP_LABELS.levels[level]}`,
  );
  if (app.otherLanguage && app.otherLanguageLevel) rows.push(`${app.otherLanguage}: ${XP_LABELS.levels[app.otherLanguageLevel]}`);
  return rows.join('\n');
}

export function buildExperienceEmail(app: ExperienceApplication, record: ExperienceRecord, submittedAt: Date) {
  const zurichTime = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Zurich' }).format(submittedAt);
  const dash = '—';

  const about: [string, string][] = [
    ['Application ID', record.applicationId],
    ['Submitted', `${record.submittedAt} (${zurichTime} Europe/Zurich)`],
    ['Website language', app.lang.toUpperCase()],
    ['Name', app.name],
    ['Email', app.email],
    ['Canton / region', app.region || dash],
    ['Languages', languageSummary(app)],
    ['Current situation', app.situation ? XP_LABELS.situations[app.situation] : dash],
    ['Project interests', app.interests.map((i) => XP_LABELS.interests[i]).join('\n')],
    ['Could start', XP_LABELS.start[app.start]],
    ['Usual time available', XP_LABELS.time[app.time]],
    ['Remote / on-site', app.mode ? XP_LABELS.mode[app.mode] : dash],
    ['Profile / work links', app.links.length ? app.links.join('\n') : dash],
    ['Source page', app.page],
  ];
  const texts: [string, string][] = [
    ['Skills, tools or experience they could bring', app.skills],
    ['What they would like to learn', app.learn],
  ];
  const ack: [string, string][] = [
    ['Expectations acknowledged', 'Yes'],
    ['Acknowledged at', record.submittedAt],
    ['Acknowledgement version', record.ackVersion],
  ];

  const nameChars = Array.from(app.name);
  const subjectName = nameChars.length > SUBJECT_NAME_MAX ? nameChars.slice(0, SUBJECT_NAME_MAX - 1).join('').trimEnd() + '…' : app.name;
  const subject = cleanLine(`[ARKLENS EXPERIENCE] ${record.applicationId} — ${subjectName}`, 200);

  const text = [
    'New Arklens Experience Programme application from arklens.ch',
    '',
    ...about.flatMap(([k, v]) => (v.includes('\n') ? [`${k}:`, ...v.split('\n').map((l) => `  ${l}`)] : [`${k}: ${v}`])),
    '',
    ...texts.flatMap(([k, v]) => [`${k}:`, v, '']),
    'EXPECTATIONS',
    ...ack.map(([k, v]) => `${k}: ${v}`),
    '',
    '—',
    'Reply to this email to answer the applicant directly.',
  ].join('\n');

  const block = (k: string, v: string) =>
    `<tr><td style="padding:20px 24px 4px;font-size:13px;color:#4F5B68">${escapeHtml(k)}</td></tr>
<tr><td style="padding:0 24px 8px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#111418">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #E6EAF0;border-collapse:collapse">
<tr><td style="padding:20px 24px;border-bottom:2px solid #D52B1E;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4F5B68">Arklens Experience Programme application</td></tr>
<tr><td style="padding:8px 24px 0"><table role="presentation" width="100%" style="border-collapse:collapse">
${about.map(([k, v]) => td(k, v)).join('\n')}
</table></td></tr>
${texts.map(([k, v]) => block(k, v)).join('\n')}
<tr><td style="padding:20px 24px 4px;font-size:12px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#111418;border-top:1px solid #E6EAF0">Expectations</td></tr>
<tr><td style="padding:0 24px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">
${ack.map(([k, v]) => td(k, v)).join('\n')}
</table></td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #E6EAF0;font-size:12px;color:#66727F">Reply to this email to answer the applicant directly.</td></tr>
</table></body></html>`;

  return { subject, text, html };
}

/** Applicant acknowledgement. Confirms receipt only: not an acceptance, no deadline. */
const CONFIRM_COPY: Record<XpLang, {
  subject: string;
  greeting: string;
  intro: string[];
  reference: string;
  submitted: string;
  disclaimer: string;
  closing: string;
  tagline: string;
}> = {
  en: {
    subject: 'We received your application — Arklens Experience Programme',
    greeting: 'Hi',
    intro: [
      'Thank you for applying to the Arklens Experience Programme.',
      'We’ve received your application. We’ll review your interests, skills and availability against suitable projects.',
    ],
    reference: 'Application reference:',
    submitted: 'Submitted:',
    disclaimer: 'Submitting an application doesn’t guarantee a project, and timing depends on the opportunities available. This email confirms that we received your application; it is not an acceptance.',
    closing: 'Best regards,',
    tagline: 'Arklens Experience Programme',
  },
  fr: {
    subject: 'Nous avons bien reçu votre candidature — Arklens Experience Programme',
    greeting: 'Bonjour',
    intro: [
      'Merci pour votre candidature à l’Arklens Experience Programme.',
      'Nous avons bien reçu votre candidature. Nous allons examiner vos centres d’intérêt, vos compétences et vos disponibilités au regard des projets adaptés.',
    ],
    reference: 'Référence de la candidature\u00A0:',
    submitted: 'Envoyée le\u00A0:',
    disclaimer: 'L’envoi d’une candidature ne garantit pas un projet, et les délais dépendent des opportunités disponibles. Cet e-mail confirme uniquement la réception de votre candidature\u00A0; il ne s’agit pas d’une acceptation.',
    closing: 'Meilleures salutations,',
    tagline: 'Arklens Experience Programme',
  },
  de: {
    subject: 'Wir haben Ihre Bewerbung erhalten — Arklens Experience Programme',
    greeting: 'Guten Tag',
    intro: [
      'Vielen Dank für Ihre Bewerbung für das Arklens Experience Programme.',
      'Wir haben Ihre Bewerbung erhalten und prüfen Ihre Interessen, Fähigkeiten und Verfügbarkeit im Hinblick auf passende Projekte.',
    ],
    reference: 'Referenz Ihrer Bewerbung:',
    submitted: 'Gesendet am:',
    disclaimer: 'Eine Bewerbung garantiert kein Projekt, und der Zeitpunkt hängt von den verfügbaren Möglichkeiten ab. Diese E-Mail bestätigt nur den Eingang Ihrer Bewerbung; sie ist keine Zusage.',
    closing: 'Freundliche Grüsse',
    tagline: 'Arklens Experience Programme',
  },
  it: {
    subject: 'Abbiamo ricevuto la tua candidatura — Arklens Experience Programme',
    greeting: 'Buongiorno',
    intro: [
      'Grazie per la tua candidatura all’Arklens Experience Programme.',
      'Abbiamo ricevuto la tua candidatura. Valuteremo i tuoi interessi, le tue competenze e la tua disponibilità in base ai progetti adatti.',
    ],
    reference: 'Riferimento della candidatura:',
    submitted: 'Inviata il:',
    disclaimer: 'L’invio di una candidatura non garantisce un progetto e i tempi dipendono dalle opportunità disponibili. Questa e-mail conferma solo che abbiamo ricevuto la tua candidatura: non si tratta di un’accettazione.',
    closing: 'Cordiali saluti,',
    tagline: 'Arklens Experience Programme',
  },
};

export function buildExperienceConfirmation(name: string, lang: XpLang, applicationId: string, submittedAt: Date) {
  const c = CONFIRM_COPY[lang] ?? CONFIRM_COPY.en;
  const submitted = new Intl.DateTimeFormat(DATE_LOCALES[lang] ?? DATE_LOCALES.en, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Zurich',
  }).format(submittedAt);
  const pairs: [string, string][] = [
    [c.reference, applicationId],
    [c.submitted, submitted],
  ];
  const greetingLine = name ? `${c.greeting} ${name},` : `${c.greeting},`;

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
