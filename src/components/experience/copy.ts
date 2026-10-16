/**
 * Copy for the Arklens Experience Programme page (/experience/).
 *
 * Phase 1: English only. FR/DE/IT currently reuse the English object so the
 * localised routes render for dev review; the Swiss-localisation pass replaces
 * them with objects of the same `ExperienceCopy` shape (type-checked).
 *
 * Positioning rules (see the approved proposal): no "volunteer", "intern",
 * "unpaid" or "free work" wording, and no statement about pay or legal status
 * until the programme structure has been reviewed.
 */
import type { Language } from '@i18n/index';

/**
 * Phase 2 sets this to '/experience/apply/'. While it is null the hero CTA
 * scrolls to the final call to action and the final CTA renders as a disabled
 * preview, so nobody is sent to the SME /start/ flow or a missing page.
 */
export const APPLY_PATH: string | null = null;

const en = {
  meta: {
    // BaseLayout appends " | Arklens".
    title: 'Experience Programme',
    description:
      'Take part in real projects connected to real businesses. Build practical experience for your CV, develop working knowledge and make professional connections along the way.',
  },
  hero: {
    eyebrow: 'Arklens Experience Programme',
    titleLead: 'Learn by doing.',
    titleAccent: 'Build something real.',
    lead: 'Take part in real projects connected to real businesses. Build practical experience for your CV, develop working knowledge and make professional connections along the way.',
    cta: 'Apply for the programme',
    secondary: 'See how it works',
    points: ['Open to different backgrounds', 'Matched to available projects', 'Scope agreed before you start'],
    flowLabel: 'From your skills to experience you keep',
    flow: ['Your skills', 'A real business need', 'Your contribution', 'Experience you keep'],
  },
  why: {
    eyebrow: 'Why it exists',
    title: 'Make your time count.',
    lead: 'Whether you’re studying, looking for your next role, changing direction or between opportunities, time spent on real projects builds something you keep: experience, knowledge and connections.',
    support: 'Stay active. Keep learning. Keep building.',
  },
  // Unnumbered subheading inside section 01 (no eyebrow).
  gain: {
    title: 'Experience that moves you forward',
    lead: 'Build practical experience, working knowledge, stronger skills and professional connections you can take into your next opportunity.',
    cards: [
      { title: 'Real experience', text: 'Take part in genuine projects with real goals and real constraints, not made-up exercises.' },
      { title: 'Something for your CV', text: 'Gain project experience you can describe to future employers in concrete terms.' },
      { title: 'Working knowledge', text: 'See how projects, businesses, customers and technology fit together outside the classroom.' },
      { title: 'Professional connections', text: 'Meet people and businesses naturally through the projects you take part in.' },
      { title: 'New and stronger skills', text: 'Practise what you already know and pick up new skills by applying them.' },
      { title: 'Momentum', text: 'Stay active and productive while you study, look for work or decide your next step.' },
    ],
  },
  cv: {
    eyebrow: 'Your CV',
    title: 'Experience you can talk about',
    lead: 'Employers often ask what you have actually done. A real project gives you a concrete answer: the problem, your part in it and what you learned.',
    example: 'Example',
    studiedLabel: 'What you studied',
    studied: '“I studied marketing.”',
    builtLabel: 'What you helped build',
    built: '“I worked on a website project for a small business. I researched what customers were looking for, drafted the content and revised it after feedback.”',
    line: 'Instead of only listing what you studied, you can talk about something you helped build, improve or solve.',
    takeawayTitle: 'What you take away depends on the project',
    takeaways: [
      'A clear picture of your role and contribution',
      'Skills and tools you have used in practice',
      'Where confidentiality allows, work you can show',
    ],
    note: 'Some client work is confidential, so not every project can be shown publicly. References aren’t automatic. The programme isn’t a formal qualification or certification.',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Real projects. Real business needs.',
    lead: 'Projects come from genuine needs, not fictional classroom briefs. Many have nothing to do with code: they involve content, research, design, languages or the way a business runs.',
    groups: [
      { title: 'Websites & digital tools', items: ['Websites', 'Digital tools', 'Customer experience'] },
      { title: 'AI, automation & data', items: ['AI', 'Automation', 'Data'] },
      { title: 'Business & research', items: ['Business processes', 'Research', 'Project support'] },
      { title: 'Content, design & languages', items: ['Content', 'Marketing', 'Design', 'Localisation & languages'] },
    ],
    note: 'Available projects change over time, so not every area has an opening at every moment.',
  },
  connections: {
    eyebrow: 'Connections',
    title: 'Build connections through real work',
    lead: 'Networking happens naturally when people work on something useful together. Projects can create opportunities to meet businesses and professionals you might not otherwise encounter.',
    items: ['Swiss SMEs and business owners', 'Professionals from different industries', 'The Arklens team', 'Other programme participants'],
    regions: 'Depending on the project, you may work with businesses from different industries and regions of Switzerland.',
    note: 'How much direct contact you have depends on the project. A project may open doors, but there are no guarantees.',
  },
  audience: {
    eyebrow: 'Who it’s for',
    title: 'Experience starts somewhere.',
    lead: 'You don’t need a perfect CV or years of experience. What matters is what you can bring, what you want to learn and whether there is a project that fits.',
    line: 'You might be studying, between roles, changing career, returning to work or simply looking to build experience in a new area.',
    groups: [
      'Students',
      'Recent graduates',
      'People looking for their next role',
      'Career changers',
      'People returning to work',
      'Self-taught learners',
      'People building digital or AI skills',
      'People in work who want experience in a new area',
      'Experienced professionals who want to stay active or learn something new',
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'How it works',
    lead: 'A simple process, with clear expectations before anything starts.',
    steps: [
      { title: 'Apply', text: 'Tell us about yourself, your skills, your interests and what you would like to learn.' },
      { title: 'We review the fit', text: 'We look at current projects and where your skills or learning goals could fit.' },
      { title: 'Get matched', text: 'If there is a suitable opportunity, we discuss the project, what is expected and the time involved before anything starts.' },
      { title: 'Put your skills into practice', text: 'Take part in the project, with guidance and review along the way.' },
      { title: 'Take it forward', text: 'Leave with experience, knowledge and connections you can build on.' },
    ],
    stepLabel: (n: number) => `Step ${n}: `,
    note: 'Applying doesn’t guarantee a project. Opportunities depend on the projects available and on fit.',
  },
  expectations: {
    eyebrow: 'Good to know',
    title: 'Clear expectations from the start',
    lead: 'We want everyone to know what the programme is, and what it isn’t.',
    items: [
      'Applying doesn’t guarantee a project. Projects depend on availability and fit.',
      'Taking part doesn’t guarantee employment, with Arklens or anyone else.',
      'Scope and expected time commitment are agreed before any work starts.',
      'Some projects involve confidential information and require confidentiality.',
      'Access to client systems and data is limited to what the project needs.',
      'Not every project can be shown publicly or added to a portfolio.',
      'References and recommendations aren’t automatic.',
      'Future paid work may sometimes be possible, but it is never promised.',
    ],
  },
  final: {
    eyebrow: 'Take the next step',
    title: 'A project may open doors. Even when it doesn’t, you leave with something real.',
    lead: 'Experience, knowledge and connections you can take forward, whatever comes next.',
    cta: 'Apply for the programme',
    contact: 'Questions? Contact us',
    // Dev-preview only, shown while APPLY_PATH is null.
    preview: 'Preview: applications are not open yet.',
  },
};

export type ExperienceCopy = typeof en;

// TODO(localisation): replace the English placeholders with Swiss FR / DE / IT copy.
const copy: Record<Language, ExperienceCopy> = { en, fr: en, de: en, it: en };

export function experienceCopy(lang: Language): ExperienceCopy {
  return copy[lang];
}
