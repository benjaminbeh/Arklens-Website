/**
 * Copy for the Arklens Experience Programme page (/experience/).
 *
 * English is the source; FR/DE/IT are Swiss localisations (not literal
 * translations) with the same `ExperienceCopy` shape, so a missing string is a
 * type error.
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

// The programme name stays in English in every language (it is the programme's name).

/** Swiss French: "vous", PME, «\u00A0» quotes, no-break spaces before : and ? */
const fr: ExperienceCopy = {
  meta: {
    title: 'Experience Programme\u00A0: apprendre par la pratique',
    description:
      'Participez à de vrais projets liés à de vraies entreprises. Acquérez une expérience pratique à faire valoir dans votre CV, développez des connaissances concrètes et tissez des contacts professionnels au fil du projet.',
  },
  hero: {
    eyebrow: 'Arklens Experience Programme',
    titleLead: 'Apprendre en faisant.',
    titleAccent: 'Construire quelque chose de concret.',
    lead: 'Participez à de vrais projets liés à de vraies entreprises. Acquérez une expérience pratique à faire valoir dans votre CV, développez des connaissances concrètes et tissez des contacts professionnels au fil du projet.',
    cta: 'Postuler au programme',
    secondary: 'Voir comment ça marche',
    points: ['Ouvert à des parcours variés', 'Mise en relation selon les projets disponibles', 'Périmètre défini avant de commencer'],
    flowLabel: 'De vos compétences à l’expérience que vous gardez',
    flow: ['Vos compétences', 'Un vrai besoin d’entreprise', 'Votre contribution', 'L’expérience qui vous reste'],
  },
  why: {
    eyebrow: 'Pourquoi ce programme',
    title: 'Donnez de la valeur à votre temps.',
    lead: 'Que vous soyez en études, à la recherche de votre prochain poste, en reconversion ou entre deux opportunités, le temps passé sur de vrais projets vous laisse quelque chose de durable\u00A0: de l’expérience, des connaissances et des contacts.',
    support: 'Garder le rythme. Continuer d’apprendre. Continuer d’avancer.',
  },
  gain: {
    title: 'Une expérience qui vous fait avancer',
    lead: 'Acquérez de l’expérience pratique, des connaissances concrètes, des compétences renforcées et des contacts professionnels à emporter vers votre prochaine opportunité.',
    cards: [
      { title: 'Une vraie expérience', text: 'Participez à des projets réels, avec de vrais objectifs et de vraies contraintes, pas à des exercices inventés.' },
      { title: 'Un plus pour votre CV', text: 'Acquérez une expérience de projet que vous pourrez décrire concrètement à de futurs employeurs.' },
      { title: 'Des connaissances concrètes', text: 'Découvrez comment projets, entreprises, clients et technologie s’articulent en dehors des salles de cours.' },
      { title: 'Un réseau professionnel', text: 'Rencontrez des personnes et des entreprises tout naturellement, à travers les projets auxquels vous participez.' },
      { title: 'Des compétences nouvelles et renforcées', text: 'Mettez en pratique ce que vous savez déjà et acquérez de nouvelles compétences en les appliquant.' },
      { title: 'De l’élan', text: 'Gardez une activité utile pendant vos études, votre recherche d’emploi ou le temps de décider de la suite.' },
    ],
  },
  cv: {
    eyebrow: 'Votre CV',
    title: 'Une expérience dont vous pouvez parler',
    lead: 'Les employeurs demandent souvent ce que vous avez réellement fait. Un vrai projet vous donne une réponse concrète\u00A0: le problème, votre rôle et ce que vous avez appris.',
    example: 'Exemple',
    studiedLabel: 'Ce que vous avez étudié',
    studied: '«\u00A0J’ai étudié le marketing.\u00A0»',
    builtLabel: 'Ce que vous avez aidé à réaliser',
    built: '«\u00A0J’ai participé au projet de site web d’une petite entreprise. J’ai analysé ce que ses clients recherchaient, rédigé les contenus, puis je les ai retravaillés après les retours.\u00A0»',
    line: 'Au lieu de seulement citer vos études, vous pouvez parler de quelque chose que vous avez aidé à créer, à améliorer ou à résoudre.',
    takeawayTitle: 'Ce que vous en retirez dépend du projet',
    takeaways: [
      'Une idée claire de votre rôle et de votre contribution',
      'Des compétences et des outils utilisés en pratique',
      'Si la confidentialité le permet, des travaux à montrer',
    ],
    note: 'Certains travaux pour des clients sont confidentiels\u00A0: tous les projets ne peuvent donc pas être montrés publiquement. Les références ne sont pas automatiques. Le programme n’est ni une qualification formelle ni une certification.',
  },
  projects: {
    eyebrow: 'Projets',
    title: 'De vrais projets. De vrais besoins d’entreprise.',
    lead: 'Les projets partent de besoins réels, pas de cas d’école fictifs. Beaucoup n’ont rien à voir avec le code\u00A0: ils touchent aux contenus, à la recherche, au design, aux langues ou au fonctionnement d’une entreprise.',
    groups: [
      { title: 'Sites web et outils numériques', items: ['Sites web', 'Outils numériques', 'Expérience client'] },
      { title: 'IA, automatisation et données', items: ['IA', 'Automatisation', 'Données'] },
      { title: 'Organisation et recherche', items: ['Processus d’entreprise', 'Recherche', 'Appui aux projets'] },
      { title: 'Contenus, design et langues', items: ['Contenus', 'Marketing', 'Design', 'Localisation et langues'] },
    ],
    note: 'Les projets disponibles évoluent\u00A0: tous les domaines n’ont pas une place ouverte à tout moment.',
  },
  connections: {
    eyebrow: 'Réseau',
    title: 'Tisser des liens à travers de vrais projets',
    lead: 'Un réseau se construit naturellement quand on travaille ensemble sur quelque chose d’utile. Les projets peuvent être l’occasion de rencontrer des entreprises et des professionnels que vous n’auriez pas croisés autrement.',
    items: ['Des PME suisses et leurs dirigeants', 'Des professionnels de différents secteurs', 'L’équipe Arklens', 'D’autres participants au programme'],
    regions: 'Selon le projet, vous pourrez travailler avec des entreprises de différents secteurs et de différentes régions de Suisse.',
    note: 'Le niveau de contact direct dépend du projet. Un projet peut ouvrir des portes, mais rien n’est garanti.',
  },
  audience: {
    eyebrow: 'Pour qui',
    title: 'Toute expérience commence quelque part.',
    lead: 'Pas besoin d’un CV parfait ni d’années d’expérience. Ce qui compte, c’est ce que vous pouvez apporter, ce que vous voulez apprendre et l’existence d’un projet qui vous correspond.',
    line: 'Vous êtes peut-être en études, entre deux postes, en reconversion, en reprise d’activité ou vous souhaitez simplement acquérir de l’expérience dans un nouveau domaine.',
    groups: [
      'Étudiantes et étudiants',
      'Personnes récemment diplômées',
      'Personnes en recherche de leur prochain poste',
      'Personnes en reconversion',
      'Personnes qui reprennent une activité',
      'Autodidactes',
      'Personnes qui développent leurs compétences numériques ou en IA',
      'Personnes en emploi qui veulent de l’expérience dans un nouveau domaine',
      'Personnes expérimentées qui veulent rester actives ou apprendre du nouveau',
    ],
  },
  process: {
    eyebrow: 'Déroulement',
    title: 'Comment ça marche',
    lead: 'Un processus simple, avec des attentes claires avant de commencer.',
    steps: [
      { title: 'Postuler', text: 'Parlez-nous de vous, de vos compétences, de vos centres d’intérêt et de ce que vous aimeriez apprendre.' },
      { title: 'Nous évaluons les possibilités', text: 'Nous regardons les projets en cours et où vos compétences ou vos objectifs d’apprentissage pourraient trouver leur place.' },
      { title: 'Trouver le bon projet', text: 'S’il existe une opportunité adaptée, nous discutons du projet, des attentes et du temps nécessaire avant tout démarrage.' },
      { title: 'Mettre vos compétences en pratique', text: 'Participez au projet, avec un accompagnement et des retours tout au long du parcours.' },
      { title: 'Aller plus loin', text: 'Repartez avec de l’expérience, des connaissances et des contacts sur lesquels vous appuyer.' },
    ],
    stepLabel: (n: number) => `Étape ${n}\u00A0: `,
    note: 'Postuler ne garantit pas un projet. Les possibilités dépendent des projets disponibles et de l’adéquation avec votre profil.',
  },
  expectations: {
    eyebrow: 'Bon à savoir',
    title: 'Des attentes claires dès le départ',
    lead: 'Nous voulons que chacun sache ce qu’est le programme, et ce qu’il n’est pas.',
    items: [
      'Postuler ne garantit pas un projet. Les projets dépendent des disponibilités et de l’adéquation.',
      'Participer ne garantit pas un emploi, ni chez Arklens ni ailleurs.',
      'Le périmètre et le temps à prévoir sont convenus avant le début de tout travail.',
      'Certains projets impliquent des informations confidentielles et exigent la confidentialité.',
      'L’accès aux systèmes et aux données des clients est limité à ce dont le projet a besoin.',
      'Tous les projets ne peuvent pas être montrés publiquement ou intégrés à un portfolio.',
      'Les références et recommandations ne sont pas automatiques.',
      'Un travail rémunéré par la suite est parfois possible, mais il n’est jamais promis.',
    ],
  },
  final: {
    eyebrow: 'Passer à l’étape suivante',
    title: 'Un projet peut ouvrir des portes. Et même si ce n’est pas le cas, vous repartez avec du concret.',
    lead: 'De l’expérience, des connaissances et des contacts à emporter, quelle que soit la suite.',
    cta: 'Postuler au programme',
    contact: 'Des questions\u202F? Contactez-nous',
    preview: 'Aperçu\u00A0: les candidatures ne sont pas encore ouvertes.',
  },
};

/** Swiss Standard German: "Sie", KMU, «» quotes, ss instead of the sharp s. */
const de: ExperienceCopy = {
  meta: {
    title: 'Experience Programme: Lernen in der Praxis',
    description:
      'Wirken Sie an realen Projekten aus dem Unternehmensalltag mit. Sammeln Sie Erfahrung für Ihren Lebenslauf, bauen Sie Praxiswissen auf und knüpfen Sie dabei berufliche Kontakte.',
  },
  hero: {
    eyebrow: 'Arklens Experience Programme',
    titleLead: 'Lernen in der Praxis.',
    titleAccent: 'Etwas Konkretes aufbauen.',
    lead: 'Wirken Sie an realen Projekten aus dem Unternehmensalltag mit. Sammeln Sie Erfahrung für Ihren Lebenslauf, bauen Sie Praxiswissen auf und knüpfen Sie dabei berufliche Kontakte.',
    cta: 'Für das Programm bewerben',
    secondary: 'Zum Ablauf',
    points: ['Offen für unterschiedliche Werdegänge', 'Abgestimmt auf verfügbare Projekte', 'Umfang vor dem Start vereinbart'],
    flowLabel: 'Von Ihren Fähigkeiten zur Erfahrung, die bleibt',
    flow: ['Ihre Fähigkeiten', 'Ein konkreter Bedarf eines Unternehmens', 'Ihr Beitrag', 'Erfahrung, die bleibt'],
  },
  why: {
    eyebrow: 'Wozu das Programm',
    title: 'Machen Sie etwas aus Ihrer Zeit.',
    lead: 'Ob Sie studieren, Ihre nächste Stelle suchen, sich neu orientieren oder zwischen zwei Stationen stehen: Zeit in echten Projekten bringt Ihnen etwas, das bleibt – Erfahrung, Wissen und Kontakte.',
    support: 'Aktiv bleiben. Dazulernen. Weiterkommen.',
  },
  gain: {
    title: 'Erfahrung, die Sie weiterbringt',
    lead: 'Bauen Sie Praxiserfahrung, Fachwissen, gefestigte Fähigkeiten und berufliche Kontakte auf, die Sie in Ihre nächste Aufgabe mitnehmen können.',
    cards: [
      { title: 'Echte Praxiserfahrung', text: 'Wirken Sie an echten Projekten mit realen Zielen und realen Rahmenbedingungen mit, statt an erfundenen Übungen.' },
      { title: 'Etwas für Ihren Lebenslauf', text: 'Sammeln Sie Projekterfahrung, die Sie künftigen Arbeitgebern konkret beschreiben können.' },
      { title: 'Praxiswissen', text: 'Erleben Sie, wie Projekte, Unternehmen, Kundschaft und Technik ausserhalb des Hörsaals zusammenspielen.' },
      { title: 'Berufliche Kontakte', text: 'Lernen Sie Menschen und Unternehmen ganz natürlich über die Projekte kennen, an denen Sie mitwirken.' },
      { title: 'Neue und gestärkte Fähigkeiten', text: 'Setzen Sie ein, was Sie schon können, und lernen Sie Neues, indem Sie es anwenden.' },
      { title: 'Dranbleiben', text: 'Bleiben Sie aktiv und produktiv – während des Studiums, der Stellensuche oder während Sie Ihren nächsten Schritt planen.' },
    ],
  },
  cv: {
    eyebrow: 'Ihr Lebenslauf',
    title: 'Erfahrung, über die Sie sprechen können',
    lead: 'Arbeitgeber fragen oft, was Sie tatsächlich gemacht haben. Ein echtes Projekt liefert eine konkrete Antwort: das Problem, Ihr Beitrag und was Sie dabei gelernt haben.',
    example: 'Beispiel',
    studiedLabel: 'Was Sie studiert haben',
    studied: '«Ich habe Marketing studiert.»',
    builtLabel: 'Woran Sie mitgearbeitet haben',
    built: '«Ich habe beim Website-Projekt eines kleinen Unternehmens mitgearbeitet. Ich habe abgeklärt, was die Kundschaft sucht, die Texte entworfen und sie nach dem Feedback überarbeitet.»',
    line: 'Statt nur aufzuzählen, was Sie studiert haben, können Sie von etwas erzählen, das Sie mit aufgebaut, verbessert oder gelöst haben.',
    takeawayTitle: 'Was Sie mitnehmen, hängt vom Projekt ab',
    takeaways: [
      'Ein klares Bild Ihrer Rolle und Ihres Beitrags',
      'Fähigkeiten und Tools, die Sie in der Praxis eingesetzt haben',
      'Arbeiten, die Sie zeigen können, sofern die Vertraulichkeit es erlaubt',
    ],
    note: 'Manche Kundenarbeiten sind vertraulich, deshalb kann nicht jedes Projekt öffentlich gezeigt werden. Referenzen gibt es nicht automatisch. Das Programm ist weder eine formale Qualifikation noch eine Zertifizierung.',
  },
  projects: {
    eyebrow: 'Projekte',
    title: 'Echte Projekte. Echter Bedarf.',
    lead: 'Die Projekte entstehen aus echtem Bedarf, nicht aus erfundenen Fallbeispielen. Viele haben nichts mit Programmieren zu tun: Es geht um Inhalte, Recherche, Gestaltung, Sprachen oder darum, wie ein Unternehmen funktioniert.',
    groups: [
      { title: 'Websites und digitale Tools', items: ['Websites', 'Digitale Tools', 'Kundenerlebnis'] },
      { title: 'KI, Automatisierung und Daten', items: ['KI', 'Automatisierung', 'Daten'] },
      { title: 'Betrieb und Recherche', items: ['Geschäftsprozesse', 'Recherche', 'Projektunterstützung'] },
      { title: 'Inhalte, Design und Sprachen', items: ['Inhalte', 'Marketing', 'Design', 'Lokalisierung und Sprachen'] },
    ],
    note: 'Das Projektangebot ändert sich laufend, deshalb ist nicht in jedem Bereich jederzeit etwas offen.',
  },
  connections: {
    eyebrow: 'Kontakte',
    title: 'Kontakte, die durch echte Projekte entstehen',
    lead: 'Ein Netzwerk entsteht wie von selbst, wenn Menschen gemeinsam an etwas Sinnvollem arbeiten. Projekte können Gelegenheiten schaffen, Unternehmen und Fachleute kennenzulernen, denen Sie sonst vielleicht nie begegnet wären.',
    items: ['Schweizer KMU und ihre Inhaberinnen und Inhaber', 'Fachleute aus verschiedenen Branchen', 'Das Arklens-Team', 'Andere Teilnehmende des Programms'],
    regions: 'Je nach Projekt können Sie mit Unternehmen aus verschiedenen Branchen und Regionen der Schweiz zusammenarbeiten.',
    note: 'Wie viel direkten Kontakt Sie haben, hängt vom Projekt ab. Ein Projekt kann Türen öffnen, garantiert ist aber nichts.',
  },
  audience: {
    eyebrow: 'Für wen',
    title: 'Jede Erfahrung beginnt irgendwo.',
    lead: 'Sie brauchen weder einen perfekten Lebenslauf noch jahrelange Erfahrung. Entscheidend ist, was Sie mitbringen, was Sie lernen möchten und ob es ein passendes Projekt gibt.',
    line: 'Vielleicht studieren Sie, sind zwischen zwei Stellen, orientieren sich beruflich neu, steigen wieder ein oder möchten einfach Erfahrung in einem neuen Bereich sammeln.',
    groups: [
      'Studierende',
      'Absolventinnen und Absolventen',
      'Personen auf der Suche nach ihrer nächsten Stelle',
      'Quereinsteigerinnen und Quereinsteiger',
      'Wiedereinsteigerinnen und Wiedereinsteiger',
      'Autodidaktinnen und Autodidakten',
      'Personen, die digitale oder KI-Kompetenzen aufbauen',
      'Berufstätige, die Erfahrung in einem neuen Bereich sammeln möchten',
      'Erfahrene Fachleute, die aktiv bleiben oder Neues lernen möchten',
    ],
  },
  process: {
    eyebrow: 'Ablauf',
    title: 'So funktioniert’s',
    lead: 'Ein einfacher Ablauf – mit klaren Erwartungen, bevor etwas beginnt.',
    steps: [
      { title: 'Bewerben', text: 'Erzählen Sie uns von sich, Ihren Fähigkeiten, Ihren Interessen und davon, was Sie lernen möchten.' },
      { title: 'Wir prüfen, was passt', text: 'Wir schauen uns die laufenden Projekte an und prüfen, wo Ihre Fähigkeiten oder Lernziele passen könnten.' },
      { title: 'Das passende Projekt finden', text: 'Gibt es eine passende Möglichkeit, besprechen wir vor dem Start das Projekt, die Erwartungen und den Zeitaufwand.' },
      { title: 'Ihre Fähigkeiten in der Praxis einsetzen', text: 'Sie wirken am Projekt mit und erhalten dabei Begleitung und Rückmeldungen.' },
      { title: 'Weiterkommen', text: 'Sie nehmen Erfahrung, Wissen und Kontakte mit, auf denen Sie aufbauen können.' },
    ],
    stepLabel: (n: number) => `Schritt ${n}: `,
    note: 'Eine Bewerbung garantiert kein Projekt. Die Möglichkeiten hängen von den verfügbaren Projekten und davon ab, ob es passt.',
  },
  expectations: {
    eyebrow: 'Gut zu wissen',
    title: 'Klare Erwartungen von Anfang an',
    lead: 'Alle sollen wissen, was das Programm ist – und was nicht.',
    items: [
      'Eine Bewerbung garantiert kein Projekt. Projekte hängen von der Verfügbarkeit ab und davon, ob es passt.',
      'Die Teilnahme garantiert keine Anstellung, weder bei Arklens noch anderswo.',
      'Umfang und erwarteter Zeitaufwand werden vereinbart, bevor die Arbeit beginnt.',
      'Manche Projekte enthalten vertrauliche Informationen und erfordern Vertraulichkeit.',
      'Der Zugriff auf Systeme und Daten von Kunden ist auf das beschränkt, was das Projekt erfordert.',
      'Nicht jedes Projekt kann öffentlich gezeigt oder in ein Portfolio aufgenommen werden.',
      'Referenzen und Empfehlungen gibt es nicht automatisch.',
      'Eine spätere bezahlte Tätigkeit ist manchmal möglich, wird aber nie versprochen.',
    ],
  },
  final: {
    eyebrow: 'Der nächste Schritt',
    title: 'Ein Projekt kann Türen öffnen. Und selbst wenn nicht: Sie nehmen etwas Konkretes mit.',
    lead: 'Erfahrung, Wissen und Kontakte, die Sie weiterbringen – was auch immer als Nächstes kommt.',
    cta: 'Für das Programm bewerben',
    contact: 'Fragen? Kontaktieren Sie uns',
    preview: 'Vorschau: Bewerbungen sind noch nicht geöffnet.',
  },
};

/** Swiss Italian: "tu" (as elsewhere on the site), PMI, «» quotes. */
const it: ExperienceCopy = {
  meta: {
    title: 'Experience Programme: imparare facendo',
    description:
      'Partecipa a progetti reali legati a vere aziende. Acquisisci esperienza pratica per il tuo CV, sviluppa conoscenze concrete e crea contatti professionali lungo il percorso.',
  },
  hero: {
    eyebrow: 'Arklens Experience Programme',
    titleLead: 'Imparare facendo.',
    titleAccent: 'Costruire qualcosa di concreto.',
    lead: 'Partecipa a progetti reali legati a vere aziende. Acquisisci esperienza pratica per il tuo CV, sviluppa conoscenze concrete e crea contatti professionali lungo il percorso.',
    cta: 'Candidati al programma',
    secondary: 'Scopri come funziona',
    points: ['Aperto a percorsi diversi', 'In base ai progetti disponibili', 'Ambito definito prima di iniziare'],
    flowLabel: 'Dalle tue competenze all’esperienza che resta',
    flow: ['Le tue competenze', 'Un’esigenza aziendale reale', 'Il tuo contributo', 'L’esperienza che resta'],
  },
  why: {
    eyebrow: 'Perché esiste',
    title: 'Dai valore al tuo tempo.',
    lead: 'Che tu stia studiando, cercando il prossimo impiego, cambiando strada o sia tra un’opportunità e l’altra, il tempo dedicato a progetti reali ti lascia qualcosa che resta: esperienza, conoscenze e contatti.',
    support: 'Mantieni il ritmo. Continua a imparare. Continua a costruire.',
  },
  gain: {
    title: 'Un’esperienza che ti fa crescere',
    lead: 'Acquisisci esperienza pratica, conoscenze operative, competenze più solide e contatti professionali da portare nella tua prossima opportunità.',
    cards: [
      { title: 'Esperienza reale', text: 'Partecipa a progetti veri, con obiettivi e vincoli reali, non a esercizi inventati.' },
      { title: 'Qualcosa da mettere nel CV', text: 'Acquisisci un’esperienza di progetto da descrivere in modo concreto ai futuri datori di lavoro.' },
      { title: 'Conoscenze operative', text: 'Scopri come progetti, aziende, clienti e tecnologia si integrano fuori dall’aula.' },
      { title: 'Contatti professionali', text: 'Conosci persone e aziende in modo naturale, attraverso i progetti a cui partecipi.' },
      { title: 'Competenze nuove e più solide', text: 'Metti in pratica ciò che sai già e acquisisci nuove competenze applicandole.' },
      { title: 'Continuità', text: 'Mantieni il ritmo e usa bene il tuo tempo mentre studi, cerchi lavoro o decidi il prossimo passo.' },
    ],
  },
  cv: {
    eyebrow: 'Il tuo CV',
    title: 'Un’esperienza di cui puoi parlare',
    lead: 'I datori di lavoro chiedono spesso cosa hai fatto davvero. Un progetto reale ti dà una risposta concreta: il problema, il tuo ruolo e cosa hai imparato.',
    example: 'Esempio',
    studiedLabel: 'Cosa hai studiato',
    studied: '«Ho studiato marketing.»',
    builtLabel: 'Cosa hai contribuito a realizzare',
    built: '«Ho lavorato al progetto del sito web di una piccola azienda. Ho analizzato cosa cercavano i clienti, ho scritto i testi e li ho rivisti dopo i riscontri ricevuti.»',
    line: 'Invece di elencare solo cosa hai studiato, puoi raccontare qualcosa che hai contribuito a creare, migliorare o risolvere.',
    takeawayTitle: 'Cosa ti porti a casa dipende dal progetto',
    takeaways: [
      'Un’idea chiara del tuo ruolo e del tuo contributo',
      'Competenze e strumenti usati nella pratica',
      'Se la riservatezza lo consente, lavori da mostrare',
    ],
    note: 'Alcuni lavori per i clienti sono riservati, quindi non tutti i progetti si possono mostrare pubblicamente. Le referenze non sono automatiche. Il programma non è una qualifica formale né una certificazione.',
  },
  projects: {
    eyebrow: 'Progetti',
    title: 'Progetti reali. Esigenze aziendali reali.',
    lead: 'I progetti nascono da esigenze concrete, non da casi di studio inventati. Molti non hanno niente a che fare con il codice: riguardano contenuti, ricerca, design, lingue o il funzionamento di un’azienda.',
    groups: [
      { title: 'Siti web e strumenti digitali', items: ['Siti web', 'Strumenti digitali', 'Esperienza cliente'] },
      { title: 'IA, automazione e dati', items: ['IA', 'Automazione', 'Dati'] },
      { title: 'Organizzazione e ricerca', items: ['Processi aziendali', 'Ricerca', 'Supporto ai progetti'] },
      { title: 'Contenuti, design e lingue', items: ['Contenuti', 'Marketing', 'Design', 'Localizzazione e lingue'] },
    ],
    note: 'I progetti disponibili cambiano nel tempo, quindi non in ogni ambito c’è sempre un’opportunità aperta.',
  },
  connections: {
    eyebrow: 'Contatti',
    title: 'Costruisci contatti attraverso progetti reali',
    lead: 'Le relazioni nascono in modo naturale quando si lavora insieme a qualcosa di utile. I progetti possono offrire l’occasione di conoscere aziende e professionisti che altrimenti non avresti incontrato.',
    items: ['PMI svizzere e i loro titolari', 'Professionisti di settori diversi', 'Il team di Arklens', 'Altri partecipanti al programma'],
    regions: 'A seconda del progetto, potresti lavorare con aziende di settori e regioni diverse della Svizzera.',
    note: 'Quanto contatto diretto avrai dipende dal progetto. Un progetto può aprire porte, ma non ci sono garanzie.',
  },
  audience: {
    eyebrow: 'Per chi è',
    title: 'Ogni esperienza comincia da qualche parte.',
    lead: 'Non ti servono un CV perfetto né anni di esperienza. Conta ciò che puoi portare, ciò che vuoi imparare e se c’è un progetto adatto a te.',
    line: 'Forse stai studiando, sei tra un impiego e l’altro, stai cambiando carriera, stai rientrando nel mondo del lavoro o vuoi semplicemente fare esperienza in un nuovo ambito.',
    groups: [
      'Studenti',
      'Chi ha appena concluso gli studi',
      'Chi cerca il prossimo impiego',
      'Chi cambia carriera',
      'Chi rientra nel mondo del lavoro',
      'Autodidatti',
      'Chi sviluppa competenze digitali o di IA',
      'Chi lavora già e vuole fare esperienza in un nuovo ambito',
      'Professionisti esperti che vogliono restare attivi o imparare qualcosa di nuovo',
    ],
  },
  process: {
    eyebrow: 'Procedura',
    title: 'Come funziona',
    lead: 'Un percorso semplice, con aspettative chiare prima di iniziare.',
    steps: [
      { title: 'Candidati', text: 'Raccontaci di te, delle tue competenze, dei tuoi interessi e di cosa vorresti imparare.' },
      { title: 'Valutiamo la compatibilità', text: 'Esaminiamo i progetti in corso e dove le tue competenze o i tuoi obiettivi di apprendimento potrebbero inserirsi.' },
      { title: 'Troviamo il progetto giusto', text: 'Se c’è un’opportunità adatta, prima di iniziare parliamo del progetto, delle aspettative e del tempo richiesto.' },
      { title: 'Metti in pratica le tue competenze', text: 'Partecipa al progetto, con accompagnamento e riscontri lungo il percorso.' },
      { title: 'Fai tesoro dell’esperienza', text: 'Riparti con esperienza, conoscenze e contatti su cui costruire.' },
    ],
    stepLabel: (n: number) => `Fase ${n}: `,
    note: 'Candidarsi non garantisce un progetto. Le opportunità dipendono dai progetti disponibili e dalla compatibilità.',
  },
  expectations: {
    eyebrow: 'Da sapere',
    title: 'Aspettative chiare fin dall’inizio',
    lead: 'Vogliamo che tutti sappiano cosa è il programma, e cosa non è.',
    items: [
      'Candidarsi non garantisce un progetto. I progetti dipendono dalla disponibilità e dalla compatibilità.',
      'Partecipare non garantisce un impiego, né presso Arklens né altrove.',
      'Ambito e tempo richiesto vengono concordati prima dell’inizio di qualsiasi lavoro.',
      'Alcuni progetti riguardano informazioni riservate e richiedono riservatezza.',
      'L’accesso ai sistemi e ai dati dei clienti è limitato a ciò che serve al progetto.',
      'Non tutti i progetti possono essere mostrati pubblicamente o inseriti in un portfolio.',
      'Referenze e raccomandazioni non sono automatiche.',
      'In futuro un lavoro retribuito può talvolta essere possibile, ma non è mai promesso.',
    ],
  },
  final: {
    eyebrow: 'Il prossimo passo',
    title: 'Un progetto può aprire porte. E anche quando non succede, ti resta qualcosa di concreto.',
    lead: 'Esperienza, conoscenze e contatti da portare con te, qualunque cosa venga dopo.',
    cta: 'Candidati al programma',
    contact: 'Domande? Contattaci',
    preview: 'Anteprima: le candidature non sono ancora aperte.',
  },
};

const copy: Record<Language, ExperienceCopy> = { en, fr, de, it };

export function experienceCopy(lang: Language): ExperienceCopy {
  return copy[lang];
}
