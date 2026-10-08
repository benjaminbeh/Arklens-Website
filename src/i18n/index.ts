export const languages = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

const en = {
    'nav.howItWorks': 'How it works',
    'nav.whatWeOffer': 'What we offer',
    'nav.examples': 'Examples',
    'nav.forBusiness': 'For businesses',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Get started',
    
    // Hero
    'hero.title': 'Your business website. Free.',
    'hero.subtitle': 'We build or modernise a professional website for your Swiss business — using your own domain, with hosting included under the Free Website Programme.',
    'hero.cta.primary': 'Get my free website',
    'hero.cta.secondary': 'Improve my website',
    'hero.trust': 'Your domain always belongs to you · No long-term contract',
    
    // Free offer
    'freeOffer.title': 'A professional starting point — CHF\u00A00',
    'freeOffer.domain': 'You only pay for your domain registration and renewal. The domain remains yours. Website and hosting are included under the Free Website Programme.',
    'freeOffer.features.website': 'One-page professional website',
    'freeOffer.features.domain': 'Your own domain',
    'freeOffer.features.hosting': 'Hosting included (Free Website Programme)',
    'freeOffer.features.ssl': 'SSL / HTTPS',
    'freeOffer.features.mobile': 'Mobile responsive',
    'freeOffer.features.seo': 'Basic SEO',
    'freeOffer.features.intro': 'Business introduction',
    'freeOffer.features.services': 'Services section',
    'freeOffer.features.contact': 'Contact details',
    'freeOffer.features.hours': 'Opening hours',
    'freeOffer.features.map': 'Map & location',
    'freeOffer.features.social': 'Social links',
    'freeOffer.features.language': 'One language',
    'freeOffer.features.revision': 'One revision round',
    
    // Why free
    'whyFree.title': 'Why CHF\u00A00?',
    'whyFree.text1': 'Small businesses should be able to establish a professional digital presence without a large upfront investment.',
    'whyFree.text2': 'Under the Free Website Programme, we provide the essential website and hosting at no charge. If your business later needs additional features, automation or digital services, you can add them when they create value for you.',
    'whyFree.trust.noSetup': 'No hidden setup fee',
    'whyFree.trust.noHosting': 'No mandatory hosting subscription',
    'whyFree.trust.noCard': 'No credit card required',
    'whyFree.trust.optional': 'Paid services are optional',
    'whyFree.trust.clear': 'Clear pricing before paid work begins',
    'whyFree.trust.yourDomain': 'Your domain always belongs to you',

    // How it works
    'howItWorks.title': 'Simple from start to launch',
    'howItWorks.step1.title': 'Tell us about your business',
    'howItWorks.step1.text': 'Complete a short form with your services, contact information, logo and photos.',
    'howItWorks.step2.title': 'We build or improve your website',
    'howItWorks.step2.text': 'We create the first version using a professional template adapted to your business.',
    'howItWorks.step3.title': 'Review and go live',
    'howItWorks.step3.text': 'You receive one revision round, then we connect your domain and launch.',
    'howItWorks.cta': 'Start my website',
    
    // Examples
    'examples.title': 'See what your business could look like',
    'examples.restaurant': 'Restaurant / Café',
    'examples.beauty': 'Hairdresser / Beauty',
    'examples.trades': 'Tradesperson',
    'examples.consultant': 'Consultant',
    'examples.health': 'Healthcare',
    'examples.garage': 'Garage / Automotive',
    'examples.shop': 'Local Shop',
    'examples.services': 'Professional Services',

    // Progression
    'progression.title': 'Your website is only the beginning',
    'progression.text': 'Once your digital foundation is in place, we can help connect your tools, reduce repetitive work and introduce practical automation and AI into your business processes.',
    'progression.step1': 'Website',
    'progression.step2': 'Digital tools',
    'progression.step3': 'Connected systems',
    'progression.step4': 'Automation',
    'progression.step5': 'AI',

    // Automation Examples
    'automation.title': 'Save time on repetitive work',
    'automation.enquiries.title': 'Customer enquiries',
    'automation.enquiries.desc': 'Automatically categorise, route and prepare responses to incoming enquiries.',
    'automation.quotes.title': 'Quotations',
    'automation.quotes.desc': 'Create first drafts of quotations from customer requirements.',
    'automation.documents.title': 'Documents',
    'automation.documents.desc': 'Search company documents, manuals and internal information using natural language.',
    'automation.support.title': 'Customer support',
    'automation.support.desc': 'Answer common customer questions automatically.',
    'automation.admin.title': 'Administration',
    'automation.admin.desc': 'Move information between forms, spreadsheets, CRM and other business tools.',
    'automation.reporting.title': 'Reporting',
    'automation.reporting.desc': 'Summarise business information and recurring reports automatically.',

    // Swiss Trust
    'trust.title': 'Built for Swiss small businesses',
    'trust.domain': 'Customer-owned domain',
    'trust.pricing': 'Transparent CHF pricing',
    'trust.focus': 'Swiss-market focus',
    'trust.multilingual': 'Multilingual-ready',
    'trust.privacy': 'Privacy-conscious implementation',
    'trust.clear': 'Clear scope before paid work',
    'trust.subscription': 'No forced subscription',

    // FAQ
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What is the Free Website Programme?',
    'faq.a1': 'The Free Website Programme provides a basic one-page professional website and hosting at no charge. You only pay for your domain registration and renewal. Your domain always belongs to you, and you can leave the programme at any time.',
    'faq.q2': 'What do I have to pay for?',
    'faq.a2': 'Only your domain registration and renewal (typically CHF\u00A015–30 per year) unless you choose optional services like additional languages, booking systems, or automation.',
    'faq.q3': 'Who owns my domain?',
    'faq.a3': 'You do. We guide you to purchase it directly, so you always retain full ownership and control. You can transfer your domain to any provider at any time.',
    'faq.q4': 'Is hosting really included?',
    'faq.a4': 'Yes, for the basic static website under the Free Website Programme. Our infrastructure allows us to provide reliable, fast hosting at no cost.',
    'faq.q5': 'Can you improve my existing website?',
    'faq.a5': "Yes, we can modernise old websites, simplify difficult-to-use sites, or add new features to existing websites.",
    'faq.q6': 'Can I add another language later?',
    'faq.a6': 'Absolutely. Multilingual support is available as a paid add-on whenever you need it.',
    'faq.q7': 'Will I be forced into a subscription?',
    'faq.a7': 'No. All paid services are optional and clearly priced before any work begins.',
    'faq.q8': 'Can I move my domain later?',
    'faq.a8': 'Yes, because you own it. You can transfer your domain to any provider at any time. See our Terms of Use for details on service exit and data portability.',
    'faq.q9': "What happens if I want to leave Arklens?",
    'faq.a9': "You can leave at any time, with no penalty. You can continue with paid Arklens services, rebuild on your own infrastructure, or move to another provider. Your domain, business content and customer-owned assets go with you, and we provide reasonable help with the move.",
    'faq.q10': "Do I own my website?",
    'faq.a10': "You always own your domain name, business information, customer data and any logos, photos or content that you provide to Arklens.\n\nArklens retains ownership of its website source code, templates, reusable components, design systems, automation scripts and development tools unless a separate written agreement transfers those rights.",
    'faq.q11': "How long does the handover process take?",
    'faq.a11': "Typically 1–3 weeks. We help with DNS configuration, hand over your business content and customer-owned assets, and offer 1–2 hours of support to keep the transition smooth.",
    'faq.q12': "What if the Free Website Programme ends?",
    'faq.a12': "You will receive at least 60 days’ notice and clear information about your options. Your domain always belongs to you. We will hand over your business content and customer-owned assets and provide reasonable migration assistance so your online presence can continue.",
    'faq.q13': "Can I move my website to another provider?",
    'faq.a13': "Yes. Your domain always remains under your control and you can move it to another provider at any time.\n\nWe can also provide reasonable assistance with migrating your business content and customer-owned assets.\n\nArklens source code, templates and reusable components are not automatically included in a migration.",
    'faq.q14': "Can I take the source code with me?",
    'faq.a14': "The standard Free Website Programme does not include ownership or transfer of Arklens source code.\n\nIf you require the source code for your website, Arklens may offer a separate Source Code Buyout or Migration Package depending on the website and its complexity.",
    'faq.q15': "Can my existing web agency or IT provider use Arklens to build something for free?",
    'faq.a15': "The Free Website Programme is intended to help eligible businesses improve their own digital presence.\n\nIt may not be used by agencies, freelancers, IT providers or other third parties to obtain free development work for resale, white-labelling or incorporation into their own paid services.\n\nArklens may decline or discontinue participation where the programme appears to be used primarily for this purpose.",
    'faq.q16': "Can I give the Arklens website to another company?",
    'faq.a16': "The Free Website Programme is provided for the participating business’s own use.\n\nThe website, templates or source code may not be resold, white-labelled or transferred to another business without Arklens’ written agreement.\n\nYour own domain, business content and customer-owned assets remain yours.",

    // Final CTA
    'finalCta.title': 'Start with your website. Improve your business from there.',
    'finalCta.text': 'Whether you need a new website, want to modernise an old one or are ready to add new digital capabilities, start with a simple conversation.',
    'finalCta.primary': 'Get my free website',
    'finalCta.secondary': 'Improve my business',

    // Footer
    'footer.tagline': 'Websites, digital tools, automation and practical AI for Swiss small businesses.',
    'footer.privacy': 'Privacy Policy',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2025 Arklens. All rights reserved.',
    'footer.navHeading': 'Navigation',
    'footer.legalHeading': 'Legal',
    'footer.terms': 'Terms of Use',

    // Shared chrome and accessibility
    'nav.contact': 'Contact',
    'a11y.skip': 'Skip to content',
    'a11y.mainNav': 'Main navigation',
    'a11y.home': 'Arklens, home',
    'a11y.language': 'Language',
    'a11y.languageLabel': 'Language:',
    'examples.labelSeparator': ':',
    'a11y.openMenu': 'Open menu',
    'a11y.closeMenu': 'Close menu',
    'form.optional': 'Optional',
    'meta.orgDescription': 'Websites, digital tools, automation and practical AI for Swiss small businesses',
    'meta.country': 'Switzerland',
} as const;

export type UIKey = keyof typeof en;

const fr = {
    'nav.howItWorks': 'Comment ça marche',
    'nav.whatWeOffer': 'Notre offre',
    'nav.examples': 'Exemples',
    'nav.forBusiness': 'Pour les PME',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Commencer',

    // Hero
    'hero.title': 'Votre site web professionnel. Gratuit.',
    'hero.subtitle': 'Nous créons ou modernisons le site web de votre PME suisse, avec votre propre nom de domaine. L’hébergement est inclus dans le Programme Site web gratuit.',
    'hero.cta.primary': 'Demander mon site gratuit',
    'hero.cta.secondary': 'Améliorer mon site',
    'hero.trust': 'Votre nom de domaine vous appartient toujours · Pas de contrat à long terme',

    // Free offer
    'freeOffer.title': 'Un point de départ professionnel\u00A0: CHF\u00A00',
    'freeOffer.domain': 'Vous payez uniquement l’enregistrement et le renouvellement de votre nom de domaine, qui reste à vous. Le site web et l’hébergement sont inclus dans le Programme Site web gratuit.',
    'freeOffer.features.website': 'Site web professionnel d’une page',
    'freeOffer.features.domain': 'Votre propre nom de domaine',
    'freeOffer.features.hosting': 'Hébergement inclus (Programme Site web gratuit)',
    'freeOffer.features.ssl': 'SSL / HTTPS',
    'freeOffer.features.mobile': 'Adapté aux mobiles',
    'freeOffer.features.seo': 'SEO de base',
    'freeOffer.features.intro': 'Présentation de l’entreprise',
    'freeOffer.features.services': 'Rubrique prestations',
    'freeOffer.features.contact': 'Coordonnées',
    'freeOffer.features.hours': 'Heures d’ouverture',
    'freeOffer.features.map': 'Plan d’accès',
    'freeOffer.features.social': 'Liens vers vos réseaux sociaux',
    'freeOffer.features.language': 'Une langue',
    'freeOffer.features.revision': 'Une série de modifications',

    // Why free
    'whyFree.title': 'Pourquoi CHF\u00A00\u202F?',
    'whyFree.text1': 'Une petite entreprise doit pouvoir se doter d’une présence numérique professionnelle sans gros investissement de départ.',
    'whyFree.text2': 'Avec le Programme Site web gratuit, nous fournissons gratuitement le site web essentiel et son hébergement. Si votre entreprise a besoin plus tard d’autres fonctionnalités, d’automatisation ou de services numériques, vous les ajoutez au moment où ils vous apportent une réelle valeur.',
    'whyFree.trust.noSetup': 'Pas de frais de mise en service cachés',
    'whyFree.trust.noHosting': 'Pas d’abonnement d’hébergement obligatoire',
    'whyFree.trust.noCard': 'Aucune carte de crédit requise',
    'whyFree.trust.optional': 'Les prestations payantes sont facultatives',
    'whyFree.trust.clear': 'Des prix clairs avant tout travail payant',
    'whyFree.trust.yourDomain': 'Votre nom de domaine vous appartient toujours',

    // How it works
    'howItWorks.title': 'Simple, de la demande à la mise en ligne',
    'howItWorks.step1.title': 'Présentez-nous votre entreprise',
    'howItWorks.step1.text': 'Remplissez un court formulaire avec vos prestations, vos coordonnées, votre logo et vos photos.',
    'howItWorks.step2.title': 'Nous créons ou améliorons votre site',
    'howItWorks.step2.text': 'Nous réalisons une première version à partir d’un modèle professionnel adapté à votre entreprise.',
    'howItWorks.step3.title': 'Relecture et mise en ligne',
    'howItWorks.step3.text': 'Vous avez droit à une série de modifications, puis nous connectons votre nom de domaine et mettons le site en ligne.',
    'howItWorks.cta': 'Démarrer mon site',

    // Examples
    'examples.title': 'Voici à quoi pourrait ressembler votre site',
    'examples.restaurant': 'Restaurant / Café',
    'examples.beauty': 'Coiffure / Beauté',
    'examples.trades': 'Artisanat',
    'examples.consultant': 'Conseil',
    'examples.health': 'Santé',
    'examples.garage': 'Garage / Automobile',
    'examples.shop': 'Commerce de proximité',
    'examples.services': 'Services professionnels',

    // Progression
    'progression.title': 'Votre site web n’est qu’un début',
    'progression.text': 'Une fois votre base numérique en place, nous vous aidons à relier vos outils, à réduire les tâches répétitives et à intégrer l’automatisation et l’IA de manière concrète dans votre façon de travailler.',
    'progression.step1': 'Site web',
    'progression.step2': 'Outils numériques',
    'progression.step3': 'Systèmes connectés',
    'progression.step4': 'Automati\u00ADsation',
    'progression.step5': 'IA',

    // Automation Examples
    'automation.title': 'Gagnez du temps sur les tâches répétitives',
    'automation.enquiries.title': 'Demandes clients',
    'automation.enquiries.desc': 'Classer et transmettre les demandes entrantes, et préparer automatiquement les réponses.',
    'automation.quotes.title': 'Offres',
    'automation.quotes.desc': 'Établir un premier projet d’offre à partir des besoins du client.',
    'automation.documents.title': 'Documents',
    'automation.documents.desc': 'Chercher dans les documents, manuels et informations internes en posant simplement une question.',
    'automation.support.title': 'Service client',
    'automation.support.desc': 'Répondre automatiquement aux questions fréquentes des clients.',
    'automation.admin.title': 'Tâches administratives',
    'automation.admin.desc': 'Transférer les informations entre formulaires, tableurs, CRM et autres outils de l’entreprise.',
    'automation.reporting.title': 'Rapports',
    'automation.reporting.desc': 'Résumer automatiquement les chiffres clés et les rapports récurrents.',

    // Swiss Trust
    'trust.title': 'Pensé pour les PME suisses',
    'trust.domain': 'Le nom de domaine appartient au client',
    'trust.pricing': 'Prix transparents en CHF',
    'trust.focus': 'Axé sur le marché suisse',
    'trust.multilingual': 'Extensible à plusieurs langues',
    'trust.privacy': 'Mise en œuvre respectueuse de la protection des données',
    'trust.clear': 'Périmètre clair avant tout travail payant',
    'trust.subscription': 'Aucun abonnement imposé',

    // FAQ
    'faq.title': 'Questions fréquentes',
    'faq.q1': 'Qu’est-ce que le Programme Site web gratuit\u202F?',
    'faq.a1': 'Le Programme Site web gratuit comprend un site web professionnel simple d’une page et son hébergement, sans frais. Vous payez uniquement l’enregistrement et le renouvellement de votre nom de domaine. Le domaine vous appartient toujours et vous pouvez quitter le programme à tout moment.',
    'faq.q2': 'Qu’est-ce qui est payant\u202F?',
    'faq.a2': 'Uniquement l’enregistrement et le renouvellement de votre nom de domaine (en général CHF\u00A015–30 par an), sauf si vous choisissez des options comme des langues supplémentaires, un système de réservation ou de l’automatisation.',
    'faq.q3': 'À qui appartient mon nom de domaine\u202F?',
    'faq.a3': 'À vous. Nous vous guidons pour l’acheter directement, afin que vous en gardiez toujours la pleine propriété et le contrôle. Vous pouvez transférer votre domaine chez n’importe quel fournisseur, à tout moment.',
    'faq.q4': 'L’hébergement est-il vraiment inclus\u202F?',
    'faq.a4': 'Oui, pour le site web statique de base du Programme Site web gratuit. Notre infrastructure nous permet de proposer un hébergement fiable et rapide, sans frais.',
    'faq.q5': 'Pouvez-vous améliorer mon site actuel\u202F?',
    'faq.a5': 'Oui. Nous pouvons moderniser un site vieillissant, simplifier un site difficile à utiliser ou ajouter de nouvelles fonctionnalités à un site existant.',
    'faq.q6': 'Puis-je ajouter une autre langue plus tard\u202F?',
    'faq.a6': 'Oui, sans problème. Des langues supplémentaires sont disponibles en option payante, quand vous en avez besoin.',
    'faq.q7': 'Suis-je obligé de prendre un abonnement\u202F?',
    'faq.a7': 'Non. Toutes les prestations payantes sont facultatives et leur prix est clairement fixé avant le début des travaux.',
    'faq.q8': 'Puis-je transférer mon nom de domaine plus tard\u202F?',
    'faq.a8': 'Oui, puisqu’il vous appartient. Vous pouvez transférer votre domaine chez n’importe quel fournisseur, à tout moment. Nos Conditions d’utilisation précisent la sortie du service et la portabilité des données.',
    'faq.q9': 'Que se passe-t-il si je veux quitter Arklens\u202F?',
    'faq.a9': 'Vous pouvez partir à tout moment, sans pénalité. Vous pouvez continuer avec les services payants d’Arklens, reconstruire votre site sur votre propre infrastructure ou passer chez un autre fournisseur. Votre nom de domaine, vos contenus et les actifs qui vous appartiennent partent avec vous, et nous vous apportons une aide raisonnable pour le changement.',
    'faq.q10': 'Mon site web m’appartient-il\u202F?',
    'faq.a10': 'Vous restez toujours propriétaire de votre nom de domaine, de vos informations commerciales, de vos données clients ainsi que des logos, photos ou contenus que vous fournissez à Arklens.\n\nArklens reste propriétaire du code source de ses sites web, de ses modèles, de ses composants réutilisables, de ses systèmes de design, de ses scripts d’automatisation et de ses outils de développement, sauf si un accord écrit séparé transfère ces droits.',
    'faq.q11': 'Combien de temps prend le transfert\u202F?',
    'faq.a11': 'En général 1 à 3 semaines. Nous vous aidons à configurer le DNS, nous vous remettons vos contenus et les actifs qui vous appartiennent, et nous offrons 1 à 2 heures de support pour une transition sans accroc.',
    'faq.q12': 'Et si le Programme Site web gratuit prend fin\u202F?',
    'faq.a12': 'Vous recevrez un préavis d’au moins 60 jours et des informations claires sur vos options. Votre nom de domaine vous appartient toujours. Nous vous remettrons vos contenus et les actifs qui vous appartiennent et vous apporterons une aide raisonnable à la migration, afin que votre présence en ligne puisse continuer.',
    'faq.q13': 'Puis-je transférer mon site web chez un autre fournisseur\u202F?',
    'faq.a13': 'Oui. Votre nom de domaine reste toujours sous votre contrôle et vous pouvez le transférer chez un autre fournisseur à tout moment.\n\nNous pouvons aussi vous apporter une aide raisonnable pour migrer vos contenus et les actifs qui vous appartiennent.\n\nLe code source, les modèles et les composants réutilisables d’Arklens ne sont pas inclus automatiquement dans une migration.',
    'faq.q14': 'Puis-je récupérer le code source\u202F?',
    'faq.a14': 'Le Programme Site web gratuit standard n’inclut ni la propriété ni le transfert du code source d’Arklens.\n\nSi vous avez besoin du code source de votre site, Arklens peut proposer séparément un rachat du code source (Source Code Buyout) ou un forfait de migration, selon le site et sa complexité.',
    'faq.q15': 'Mon agence web ou mon prestataire informatique peut-il passer par Arklens pour obtenir un développement gratuit\u202F?',
    'faq.a15': 'Le Programme Site web gratuit vise à aider les entreprises éligibles à améliorer leur propre présence numérique.\n\nIl ne peut pas être utilisé par des agences, des indépendants, des prestataires informatiques ou d’autres tiers pour obtenir gratuitement des travaux de développement destinés à la revente, à une offre en marque blanche ou à l’intégration dans leurs propres services payants.\n\nArklens peut refuser ou mettre fin à une participation lorsque le programme semble être utilisé principalement à cette fin.',
    'faq.q16': 'Puis-je céder le site Arklens à une autre entreprise\u202F?',
    'faq.a16': 'Le Programme Site web gratuit est fourni pour l’usage propre de l’entreprise participante.\n\nLe site, les modèles ou le code source ne peuvent pas être revendus, proposés en marque blanche ou transférés à une autre entreprise sans l’accord écrit d’Arklens.\n\nVotre nom de domaine, vos contenus et les actifs qui vous appartiennent restent les vôtres.',

    // Final CTA
    'finalCta.title': 'Commencez par votre site web. Développez votre entreprise ensuite.',
    'finalCta.text': 'Nouveau site, modernisation d’un site existant ou nouvelles fonctionnalités numériques\u00A0: tout commence par un simple échange.',
    'finalCta.primary': 'Demander mon site gratuit',
    'finalCta.secondary': 'Développer mon entreprise',

    // Footer
    'footer.tagline': 'Sites web, outils numériques, automatisation et IA concrète pour les PME suisses.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.legal': 'Mentions légales',
    'footer.copyright': '© 2025 Arklens. Tous droits réservés.',
    'footer.navHeading': 'Navigation',
    'footer.legalHeading': 'Juridique',
    'footer.terms': 'Conditions d’utilisation',

    // Shared chrome and accessibility
    'nav.contact': 'Contact',
    'a11y.skip': 'Aller au contenu',
    'a11y.mainNav': 'Navigation principale',
    'a11y.home': 'Arklens, accueil',
    'a11y.language': 'Langue',
    'a11y.languageLabel': 'Langue\u00A0:',
    'examples.labelSeparator': '\u00A0:',
    'a11y.openMenu': 'Ouvrir le menu',
    'a11y.closeMenu': 'Fermer le menu',
    'form.optional': 'Facultatif',
    'meta.orgDescription': 'Sites web, outils numériques, automatisation et IA concrète pour les PME suisses',
    'meta.country': 'Suisse',
} satisfies Record<UIKey, string>;

const de = {
    'nav.howItWorks': 'So funktioniert’s',
    'nav.whatWeOffer': 'Angebot',
    'nav.examples': 'Beispiele',
    'nav.forBusiness': 'Für KMU',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Loslegen',

    // Hero
    'hero.title': 'Die Website für Ihr Unternehmen. Kostenlos.',
    'hero.subtitle': 'Wir erstellen oder modernisieren die Website Ihres Schweizer KMU, mit Ihrer eigenen Domain. Das Hosting ist im Programm «Kostenlose Website» inbegriffen.',
    'hero.cta.primary': 'Website kostenlos anfragen',
    'hero.cta.secondary': 'Meine Website verbessern',
    'hero.trust': 'Ihre Domain gehört immer Ihnen · Keine lange Vertragsbindung',

    // Free offer
    'freeOffer.title': 'Ein professioneller Start für CHF\u00A00',
    'freeOffer.domain': 'Sie bezahlen nur die Registrierung und Verlängerung Ihrer Domain. Die Domain gehört Ihnen. Website und Hosting sind im Programm «Kostenlose Website» inbegriffen.',
    'freeOffer.features.website': 'Professionelle Website mit einer Seite',
    'freeOffer.features.domain': 'Ihre eigene Domain',
    'freeOffer.features.hosting': 'Hosting inbegriffen (Programm «Kostenlose Website»)',
    'freeOffer.features.ssl': 'SSL / HTTPS',
    'freeOffer.features.mobile': 'Für Smartphones optimiert',
    'freeOffer.features.seo': 'Basis-SEO',
    'freeOffer.features.intro': 'Vorstellung Ihres Unternehmens',
    'freeOffer.features.services': 'Bereich Dienstleistungen',
    'freeOffer.features.contact': 'Kontaktangaben',
    'freeOffer.features.hours': 'Öffnungszeiten',
    'freeOffer.features.map': 'Karte und Standort',
    'freeOffer.features.social': 'Links zu Social Media',
    'freeOffer.features.language': 'Eine Sprache',
    'freeOffer.features.revision': 'Eine Korrekturrunde',

    // Why free
    'whyFree.title': 'Warum CHF\u00A00?',
    'whyFree.text1': 'Kleine Unternehmen sollen ohne grosse Anfangsinvestition zu einer professionellen digitalen Präsenz kommen.',
    'whyFree.text2': 'Im Programm «Kostenlose Website» stellen wir die grundlegende Website und das Hosting kostenlos bereit. Braucht Ihr Unternehmen später weitere Funktionen, Automatisierung oder digitale Dienstleistungen, ergänzen Sie diese dann, wenn sie Ihnen einen echten Nutzen bringen.',
    'whyFree.trust.noSetup': 'Keine versteckte Einrichtungsgebühr',
    'whyFree.trust.noHosting': 'Kein obligatorisches Hosting-Abo',
    'whyFree.trust.noCard': 'Keine Kreditkarte nötig',
    'whyFree.trust.optional': 'Kostenpflichtige Leistungen sind optional',
    'whyFree.trust.clear': 'Klare Preise, bevor kostenpflichtige Arbeit beginnt',
    'whyFree.trust.yourDomain': 'Ihre Domain gehört immer Ihnen',

    // How it works
    'howItWorks.title': 'Einfach, von der Anfrage bis zur Aufschaltung',
    'howItWorks.step1.title': 'Stellen Sie uns Ihr Unternehmen vor',
    'howItWorks.step1.text': 'Füllen Sie ein kurzes Formular aus: Dienstleistungen, Kontaktangaben, Logo und Fotos.',
    'howItWorks.step2.title': 'Wir erstellen oder verbessern Ihre Website',
    'howItWorks.step2.text': 'Wir erstellen eine erste Version auf Basis einer professionellen Vorlage, abgestimmt auf Ihr Unternehmen.',
    'howItWorks.step3.title': 'Prüfen und aufschalten',
    'howItWorks.step3.text': 'Sie erhalten eine Korrekturrunde. Danach verbinden wir Ihre Domain und schalten die Website auf.',
    'howItWorks.cta': 'Meine Website starten',

    // Examples
    'examples.title': 'So könnte Ihre Website aussehen',
    'examples.restaurant': 'Restaurant / Café',
    'examples.beauty': 'Coiffeur / Kosmetik',
    'examples.trades': 'Handwerk',
    'examples.consultant': 'Beratung',
    'examples.health': 'Gesundheit',
    'examples.garage': 'Garage / Auto',
    'examples.shop': 'Lokales Geschäft',
    'examples.services': 'Treuhand / Dienstleistungen',

    // Progression
    'progression.title': 'Ihre Website ist erst der Anfang',
    'progression.text': 'Steht Ihre digitale Grundlage, helfen wir Ihnen, Ihre Tools zu verbinden, Routinearbeit zu reduzieren und Automatisierung und KI praxisnah in Ihre Abläufe zu integrieren.',
    'progression.step1': 'Website',
    'progression.step2': 'Digitale Tools',
    'progression.step3': 'Vernetzte Systeme',
    'progression.step4': 'Automati\u00ADsierung',
    'progression.step5': 'KI',

    // Automation Examples
    'automation.title': 'Weniger Zeit für Routinearbeit',
    'automation.enquiries.title': 'Kundenanfragen',
    'automation.enquiries.desc': 'Eingehende Anfragen automatisch einordnen, weiterleiten und Antworten vorbereiten.',
    'automation.quotes.title': 'Offerten',
    'automation.quotes.desc': 'Erste Offertentwürfe direkt aus den Anforderungen der Kundschaft erstellen.',
    'automation.documents.title': 'Dokumente',
    'automation.documents.desc': 'Firmendokumente, Handbücher und interne Informationen mit einfachen Fragen durchsuchen.',
    'automation.support.title': 'Kundendienst',
    'automation.support.desc': 'Häufige Kundenfragen automatisch beantworten.',
    'automation.admin.title': 'Verwaltung',
    'automation.admin.desc': 'Informationen zwischen Formularen, Tabellen, CRM und weiteren Tools übertragen.',
    'automation.reporting.title': 'Berichte',
    'automation.reporting.desc': 'Geschäftszahlen und wiederkehrende Berichte automatisch zusammenfassen.',

    // Swiss Trust
    'trust.title': 'Für Schweizer KMU gemacht',
    'trust.domain': 'Die Domain gehört der Kundschaft',
    'trust.pricing': 'Transparente Preise in CHF',
    'trust.focus': 'Fokus auf den Schweizer Markt',
    'trust.multilingual': 'Mehrsprachig erweiterbar',
    'trust.privacy': 'Datenschutzbewusste Umsetzung',
    'trust.clear': 'Klarer Umfang vor kostenpflichtiger Arbeit',
    'trust.subscription': 'Kein Abo-Zwang',

    // FAQ
    'faq.title': 'Häufige Fragen',
    'faq.q1': 'Was ist das Programm «Kostenlose Website»?',
    'faq.a1': 'Das Programm «Kostenlose Website» umfasst eine einfache, professionelle Website mit einer Seite sowie das Hosting, ohne Kosten. Sie bezahlen nur die Registrierung und Verlängerung Ihrer Domain. Die Domain gehört immer Ihnen, und Sie können das Programm jederzeit verlassen.',
    'faq.q2': 'Was muss ich bezahlen?',
    'faq.a2': 'Nur die Registrierung und Verlängerung Ihrer Domain (meist CHF\u00A015–30 pro Jahr), ausser Sie entscheiden sich für Zusatzleistungen wie weitere Sprachen, ein Buchungssystem oder Automatisierung.',
    'faq.q3': 'Wem gehört meine Domain?',
    'faq.a3': 'Ihnen. Wir zeigen Ihnen, wie Sie sie direkt selbst kaufen. So behalten Sie immer das volle Eigentum und die Kontrolle. Sie können Ihre Domain jederzeit zu einem beliebigen Anbieter übertragen.',
    'faq.q4': 'Ist das Hosting wirklich inbegriffen?',
    'faq.a4': 'Ja, für die einfache statische Website im Programm «Kostenlose Website». Dank unserer Infrastruktur können wir zuverlässiges, schnelles Hosting kostenlos anbieten.',
    'faq.q5': 'Können Sie meine bestehende Website verbessern?',
    'faq.a5': 'Ja. Wir können ältere Websites modernisieren, schwer bedienbare Websites vereinfachen oder bestehende Websites um neue Funktionen ergänzen.',
    'faq.q6': 'Kann ich später eine weitere Sprache ergänzen?',
    'faq.a6': 'Ja, jederzeit. Weitere Sprachen sind als kostenpflichtige Erweiterung erhältlich, sobald Sie sie brauchen.',
    'faq.q7': 'Muss ich ein Abo abschliessen?',
    'faq.a7': 'Nein. Alle kostenpflichtigen Leistungen sind optional, und der Preis steht klar fest, bevor die Arbeit beginnt.',
    'faq.q8': 'Kann ich meine Domain später übertragen?',
    'faq.a8': 'Ja, denn sie gehört Ihnen. Sie können Ihre Domain jederzeit zu einem beliebigen Anbieter übertragen. Details zum Austritt aus dem Service und zur Datenportabilität finden Sie in unseren Nutzungsbedingungen.',
    'faq.q9': 'Was passiert, wenn ich Arklens verlassen möchte?',
    'faq.a9': 'Sie können jederzeit und ohne Vertragsstrafe gehen. Sie können mit kostenpflichtigen Arklens-Diensten weitermachen, Ihre Website auf eigener Infrastruktur neu aufbauen oder zu einem anderen Anbieter wechseln. Ihre Domain, Ihre Geschäftsinhalte und die Ihnen gehörenden Assets nehmen Sie mit, und wir unterstützen Sie in angemessenem Umfang beim Wechsel.',
    'faq.q10': 'Gehört mir meine Website?',
    'faq.a10': 'Ihr Domainname, Ihre Geschäftsangaben, Ihre Kundendaten sowie alle Logos, Fotos und Inhalte, die Sie Arklens zur Verfügung stellen, gehören immer Ihnen.\n\nArklens bleibt Eigentümerin ihres Website-Quellcodes, ihrer Vorlagen, wiederverwendbaren Komponenten, Designsysteme, Automatisierungs-Skripte und Entwicklungstools, sofern keine separate schriftliche Vereinbarung diese Rechte überträgt.',
    'faq.q11': 'Wie lange dauert die Übergabe?',
    'faq.a11': 'In der Regel 1–3 Wochen. Wir helfen bei der DNS-Konfiguration, übergeben Ihre Geschäftsinhalte und die Ihnen gehörenden Assets und bieten 1–2 Stunden Support für einen reibungslosen Übergang.',
    'faq.q12': 'Was passiert, wenn das Programm «Kostenlose Website» endet?',
    'faq.a12': 'Sie erhalten eine Vorankündigung von mindestens 60 Tagen sowie klare Informationen zu Ihren Möglichkeiten. Ihre Domain gehört immer Ihnen. Wir übergeben Ihnen Ihre Geschäftsinhalte und die Ihnen gehörenden Assets und unterstützen Sie in angemessenem Umfang bei der Migration, damit Ihre Online-Präsenz weiterbestehen kann.',
    'faq.q13': 'Kann ich mit meiner Website zu einem anderen Anbieter wechseln?',
    'faq.a13': 'Ja. Ihre Domain bleibt immer unter Ihrer Kontrolle, und Sie können sie jederzeit zu einem anderen Anbieter übertragen.\n\nWir können Sie auch in angemessenem Umfang bei der Migration Ihrer Geschäftsinhalte und der Ihnen gehörenden Assets unterstützen.\n\nQuellcode, Vorlagen und wiederverwendbare Komponenten von Arklens sind nicht automatisch Teil einer Migration.',
    'faq.q14': 'Kann ich den Quellcode mitnehmen?',
    'faq.a14': 'Das Programm «Kostenlose Website» umfasst in der Standardversion weder das Eigentum am Quellcode von Arklens noch dessen Übertragung.\n\nWenn Sie den Quellcode Ihrer Website benötigen, kann Arklens je nach Website und Komplexität separat eine Quellcode-Übernahme (Source Code Buyout) oder ein Migrationspaket anbieten.',
    'faq.q15': 'Kann meine Webagentur oder mein IT-Dienstleister Arklens nutzen, um kostenlos etwas entwickeln zu lassen?',
    'faq.a15': 'Das Programm «Kostenlose Website» soll berechtigten Unternehmen helfen, ihre eigene digitale Präsenz zu verbessern.\n\nAgenturen, Freischaffende, IT-Dienstleister oder andere Dritte dürfen es nicht nutzen, um kostenlose Entwicklungsarbeit für den Weiterverkauf, für White-Label-Angebote oder zur Integration in eigene kostenpflichtige Leistungen zu erhalten.\n\nArklens kann eine Teilnahme ablehnen oder beenden, wenn das Programm hauptsächlich zu diesem Zweck genutzt zu werden scheint.',
    'faq.q16': 'Kann ich die Arklens-Website an ein anderes Unternehmen weitergeben?',
    'faq.a16': 'Das Programm «Kostenlose Website» wird für die eigene Nutzung des teilnehmenden Unternehmens bereitgestellt.\n\nDie Website, die Vorlagen oder der Quellcode dürfen ohne schriftliche Zustimmung von Arklens nicht weiterverkauft, als White-Label angeboten oder an ein anderes Unternehmen übertragen werden.\n\nIhre Domain, Ihre Geschäftsinhalte und die Ihnen gehörenden Assets gehören weiterhin Ihnen.',

    // Final CTA
    'finalCta.title': 'Starten Sie mit Ihrer Website. Und entwickeln Sie Ihr Unternehmen von dort aus weiter.',
    'finalCta.text': 'Ob neue Website, Modernisierung oder neue digitale Funktionen: Alles beginnt mit einem einfachen Gespräch.',
    'finalCta.primary': 'Website kostenlos anfragen',
    'finalCta.secondary': 'Mein Unternehmen stärken',

    // Footer
    'footer.tagline': 'Websites, digitale Tools, Automatisierung und praxisnahe KI für Schweizer KMU.',
    // Soft hyphens: footer link columns are ~128 px wide at 320 px.
    'footer.privacy': 'Datenschutz\u00ADerklärung',
    'footer.legal': 'Impressum',
    'footer.copyright': '© 2025 Arklens. Alle Rechte vorbehalten.',
    'footer.navHeading': 'Navigation',
    'footer.legalHeading': 'Rechtliches',
    'footer.terms': 'Nutzungs\u00ADbedingungen',

    // Shared chrome and accessibility
    'nav.contact': 'Kontakt',
    'a11y.skip': 'Zum Inhalt springen',
    'a11y.mainNav': 'Hauptnavigation',
    'a11y.home': 'Arklens, Startseite',
    'a11y.language': 'Sprache',
    'a11y.languageLabel': 'Sprache:',
    'examples.labelSeparator': ':',
    'a11y.openMenu': 'Menü öffnen',
    'a11y.closeMenu': 'Menü schliessen',
    'form.optional': 'Optional',
    'meta.orgDescription': 'Websites, digitale Tools, Automatisierung und praxisnahe KI für Schweizer KMU',
    'meta.country': 'Schweiz',
} satisfies Record<UIKey, string>;

const it = {
    'nav.howItWorks': 'Come funziona',
    'nav.whatWeOffer': 'Offerta',
    'nav.examples': 'Esempi',
    'nav.forBusiness': 'Per le PMI',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Inizia',

    // Hero
    'hero.title': 'Il sito web della tua azienda. Gratuito.',
    'hero.subtitle': 'Creiamo o modernizziamo il sito web della tua PMI svizzera, con il tuo dominio. L’hosting è incluso nel Programma Sito web gratuito.',
    'hero.cta.primary': 'Richiedi il sito gratuito',
    'hero.cta.secondary': 'Migliora il mio sito',
    'hero.trust': 'Il dominio resta sempre tuo · Nessun contratto a lungo termine',

    // Free offer
    'freeOffer.title': 'Un punto di partenza professionale: CHF\u00A00',
    'freeOffer.domain': 'Paghi solo la registrazione e il rinnovo del dominio, che resta tuo. Sito web e hosting sono inclusi nel Programma Sito web gratuito.',
    'freeOffer.features.website': 'Sito web professionale di una pagina',
    'freeOffer.features.domain': 'Il tuo dominio',
    'freeOffer.features.hosting': 'Hosting incluso (Programma Sito web gratuito)',
    'freeOffer.features.ssl': 'SSL / HTTPS',
    'freeOffer.features.mobile': 'Ottimizzato per smartphone',
    'freeOffer.features.seo': 'SEO di base',
    'freeOffer.features.intro': 'Presentazione dell’azienda',
    'freeOffer.features.services': 'Sezione servizi',
    'freeOffer.features.contact': 'Dati di contatto',
    'freeOffer.features.hours': 'Orari di apertura',
    'freeOffer.features.map': 'Mappa e posizione',
    'freeOffer.features.social': 'Link ai social',
    'freeOffer.features.language': 'Una lingua',
    'freeOffer.features.revision': 'Un giro di modifiche',

    // Why free
    'whyFree.title': 'Perché CHF\u00A00?',
    'whyFree.text1': 'Una piccola azienda deve poter avere una presenza digitale professionale senza un grosso investimento iniziale.',
    'whyFree.text2': 'Con il Programma Sito web gratuito ti offriamo senza costi il sito web essenziale e l’hosting. Se in seguito la tua azienda avrà bisogno di altre funzionalità, di automazione o di servizi digitali, potrai aggiungerli quando ti portano un vantaggio concreto.',
    'whyFree.trust.noSetup': 'Nessun costo di attivazione nascosto',
    'whyFree.trust.noHosting': 'Nessun abbonamento di hosting obbligatorio',
    'whyFree.trust.noCard': 'Nessuna carta di credito richiesta',
    'whyFree.trust.optional': 'I servizi a pagamento sono facoltativi',
    'whyFree.trust.clear': 'Prezzi chiari prima di ogni lavoro a pagamento',
    'whyFree.trust.yourDomain': 'Il dominio è sempre tuo',

    // How it works
    'howItWorks.title': 'Semplice, dalla richiesta alla messa online',
    'howItWorks.step1.title': 'Presentaci la tua azienda',
    'howItWorks.step1.text': 'Compila un breve modulo con i tuoi servizi, i dati di contatto, il logo e le foto.',
    'howItWorks.step2.title': 'Creiamo o miglioriamo il tuo sito',
    'howItWorks.step2.text': 'Realizziamo una prima versione partendo da un modello professionale adattato alla tua azienda.',
    'howItWorks.step3.title': 'Verifica e pubblicazione',
    'howItWorks.step3.text': 'Hai a disposizione un giro di modifiche, poi colleghiamo il dominio e mettiamo online il sito.',
    'howItWorks.cta': 'Avvia il mio sito',

    // Examples
    'examples.title': 'Ecco come potrebbe essere il tuo sito',
    'examples.restaurant': 'Ristorante / bar',
    'examples.beauty': 'Parrucchiere / Estetica',
    'examples.trades': 'Artigianato',
    'examples.consultant': 'Consulenza',
    'examples.health': 'Salute',
    'examples.garage': 'Garage / Automobili',
    'examples.shop': 'Negozio di quartiere',
    'examples.services': 'Servizi professionali',

    // Progression
    'progression.title': 'Il sito web è solo l’inizio',
    'progression.text': 'Una volta posate le basi digitali, possiamo aiutarti a collegare i tuoi strumenti, ridurre il lavoro ripetitivo e introdurre automazione e IA concrete nei processi della tua azienda.',
    'progression.step1': 'Sito web',
    'progression.step2': 'Strumenti digitali',
    'progression.step3': 'Sistemi collegati',
    'progression.step4': 'Automazione',
    'progression.step5': 'IA',

    // Automation Examples
    'automation.title': 'Risparmia tempo sul lavoro ripetitivo',
    'automation.enquiries.title': 'Richieste dei clienti',
    'automation.enquiries.desc': 'Classificare e inoltrare le richieste in arrivo, e preparare in automatico le risposte.',
    'automation.quotes.title': 'Offerte',
    'automation.quotes.desc': 'Preparare una prima bozza di offerta in base alle esigenze del cliente.',
    'automation.documents.title': 'Documenti',
    'automation.documents.desc': 'Cercare in documenti aziendali, manuali e informazioni interne con semplici domande.',
    'automation.support.title': 'Assistenza clienti',
    'automation.support.desc': 'Rispondere in automatico alle domande frequenti dei clienti.',
    'automation.admin.title': 'Amministrazione',
    'automation.admin.desc': 'Trasferire dati tra moduli, fogli di calcolo, CRM e altri strumenti aziendali.',
    'automation.reporting.title': 'Reportistica',
    'automation.reporting.desc': 'Riassumere in automatico dati aziendali e report ricorrenti.',

    // Swiss Trust
    'trust.title': 'Pensato per le PMI svizzere',
    'trust.domain': 'Il dominio è del cliente',
    'trust.pricing': 'Prezzi trasparenti in CHF',
    'trust.focus': 'Orientato al mercato svizzero',
    'trust.multilingual': 'Predisposto per più lingue',
    'trust.privacy': 'Realizzazione attenta alla protezione dei dati',
    'trust.clear': 'Ambito chiaro prima di ogni lavoro a pagamento',
    'trust.subscription': 'Nessun abbonamento imposto',

    // FAQ
    'faq.title': 'Domande frequenti',
    'faq.q1': 'Che cos’è il Programma Sito web gratuito?',
    'faq.a1': 'Il Programma Sito web gratuito comprende un sito web professionale di base di una pagina e l’hosting, senza costi. Paghi solo la registrazione e il rinnovo del dominio. Il dominio resta sempre tuo e puoi lasciare il programma in qualsiasi momento.',
    'faq.q2': 'Cosa devo pagare?',
    'faq.a2': 'Solo la registrazione e il rinnovo del dominio (di solito CHF\u00A015–30 all’anno), a meno che tu scelga servizi opzionali come lingue aggiuntive, un sistema di prenotazione o l’automazione.',
    'faq.q3': 'Di chi è il mio dominio?',
    'faq.a3': 'Tuo. Ti guidiamo nell’acquisto diretto, così mantieni sempre la piena proprietà e il controllo. Puoi trasferire il dominio a qualsiasi fornitore in qualsiasi momento.',
    'faq.q4': 'L’hosting è davvero incluso?',
    'faq.a4': 'Sì, per il sito web statico di base del Programma Sito web gratuito. La nostra infrastruttura ci permette di offrire un hosting affidabile e veloce senza costi.',
    'faq.q5': 'Potete migliorare il mio sito attuale?',
    'faq.a5': 'Sì. Possiamo modernizzare un sito datato, semplificare un sito difficile da usare o aggiungere nuove funzionalità a un sito esistente.',
    'faq.q6': 'Posso aggiungere un’altra lingua in seguito?',
    'faq.a6': 'Certo. Altre lingue sono disponibili come opzione a pagamento, quando ti servono.',
    'faq.q7': 'Devo sottoscrivere un abbonamento?',
    'faq.a7': 'No. Tutti i servizi a pagamento sono facoltativi e il prezzo viene definito chiaramente prima di iniziare qualsiasi lavoro.',
    'faq.q8': 'Posso trasferire il mio dominio in seguito?',
    'faq.a8': 'Sì, perché è tuo. Puoi trasferire il dominio a qualsiasi fornitore in qualsiasi momento. Per i dettagli sull’uscita dal servizio e sulla portabilità dei dati consulta le nostre Condizioni d’uso.',
    'faq.q9': 'Cosa succede se voglio lasciare Arklens?',
    'faq.a9': 'Puoi andartene in qualsiasi momento, senza penali. Puoi continuare con i servizi a pagamento di Arklens, ricostruire il sito sulla tua infrastruttura o passare a un altro fornitore. Il dominio, i contenuti aziendali e gli asset di tua proprietà vengono con te, e ti offriamo un supporto ragionevole per il passaggio.',
    'faq.q10': 'Il sito web è mio?',
    'faq.a10': 'Il nome di dominio, le informazioni aziendali, i dati dei clienti e tutti i loghi, le foto o i contenuti che fornisci ad Arklens restano sempre tuoi.\n\nArklens resta proprietaria del codice sorgente dei suoi siti web, dei modelli, dei componenti riutilizzabili, dei design system, degli script di automazione e degli strumenti di sviluppo, salvo un accordo scritto separato che trasferisca tali diritti.',
    'faq.q11': 'Quanto dura il passaggio di consegne?',
    'faq.a11': 'Di solito 1–3 settimane. Ti aiutiamo con la configurazione DNS, ti consegniamo i contenuti aziendali e gli asset di tua proprietà e offriamo 1–2 ore di supporto per un passaggio senza intoppi.',
    'faq.q12': 'Cosa succede se il Programma Sito web gratuito termina?',
    'faq.a12': 'Riceverai un preavviso di almeno 60 giorni e informazioni chiare sulle tue opzioni. Il dominio resta sempre tuo. Ti consegneremo i contenuti aziendali e gli asset di tua proprietà e ti offriremo un supporto ragionevole per la migrazione, così la tua presenza online potrà continuare.',
    'faq.q13': 'Posso trasferire il mio sito a un altro fornitore?',
    'faq.a13': 'Sì. Il dominio resta sempre sotto il tuo controllo e puoi trasferirlo a un altro fornitore in qualsiasi momento.\n\nPossiamo anche offrirti un supporto ragionevole per migrare i contenuti aziendali e gli asset di tua proprietà.\n\nIl codice sorgente, i modelli e i componenti riutilizzabili di Arklens non sono inclusi automaticamente in una migrazione.',
    'faq.q14': 'Posso portare con me il codice sorgente?',
    'faq.a14': 'Il Programma Sito web gratuito standard non include la proprietà né il trasferimento del codice sorgente di Arklens.\n\nSe hai bisogno del codice sorgente del tuo sito, Arklens può offrire separatamente un riscatto del codice sorgente (Source Code Buyout) o un pacchetto di migrazione, in base al sito e alla sua complessità.',
    'faq.q15': 'La mia agenzia web o il mio fornitore IT possono usare Arklens per far sviluppare qualcosa gratuitamente?',
    'faq.a15': 'Il Programma Sito web gratuito ha lo scopo di aiutare le aziende idonee a migliorare la propria presenza digitale.\n\nNon può essere utilizzato da agenzie, liberi professionisti, fornitori IT o altri terzi per ottenere gratuitamente lavori di sviluppo da rivendere, da offrire in white label o da integrare nei propri servizi a pagamento.\n\nArklens può rifiutare o interrompere la partecipazione quando il programma sembra essere utilizzato principalmente a questo scopo.',
    'faq.q16': 'Posso cedere il sito Arklens a un’altra azienda?',
    'faq.a16': 'Il Programma Sito web gratuito è fornito per l’uso proprio dell’azienda partecipante.\n\nIl sito, i modelli o il codice sorgente non possono essere rivenduti, offerti in white label o trasferiti a un’altra azienda senza l’accordo scritto di Arklens.\n\nIl dominio, i contenuti aziendali e gli asset di tua proprietà restano tuoi.',

    // Final CTA
    'finalCta.title': 'Inizia dal sito web. Poi fai crescere la tua azienda.',
    'finalCta.text': 'Che ti serva un nuovo sito, voglia modernizzare quello attuale o aggiungere nuove funzioni digitali, tutto inizia con una semplice conversazione.',
    'finalCta.primary': 'Richiedi il sito gratuito',
    'finalCta.secondary': 'Migliora la mia azienda',

    // Footer
    'footer.tagline': 'Siti web, strumenti digitali, automazione e IA concreta per le PMI svizzere.',
    'footer.privacy': 'Informativa sulla privacy',
    'footer.legal': 'Note legali',
    'footer.copyright': '© 2025 Arklens. Tutti i diritti riservati.',
    'footer.navHeading': 'Navigazione',
    'footer.legalHeading': 'Informazioni legali',
    'footer.terms': 'Condizioni d’uso',

    // Shared chrome and accessibility
    'nav.contact': 'Contatti',
    'a11y.skip': 'Vai al contenuto',
    'a11y.mainNav': 'Navigazione principale',
    'a11y.home': 'Arklens, pagina iniziale',
    'a11y.language': 'Lingua',
    'a11y.languageLabel': 'Lingua:',
    'examples.labelSeparator': ':',
    'a11y.openMenu': 'Apri il menu',
    'a11y.closeMenu': 'Chiudi il menu',
    'form.optional': 'Facoltativo',
    'meta.orgDescription': 'Siti web, strumenti digitali, automazione e IA concreta per le PMI svizzere',
    'meta.country': 'Svizzera',
} satisfies Record<UIKey, string>;

export const ui = { en, fr, de, it } as const;

export const locales = ['en', 'fr', 'de', 'it'] as const satisfies readonly Language[];

/** BCP 47 language-region codes for <html lang> and hreflang. */
export const hreflangs: Record<Language, string> = { en: 'en-CH', fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };

/** Open Graph locale codes. */
export const ogLocales: Record<Language, string> = { en: 'en_CH', fr: 'fr_CH', de: 'de_CH', it: 'it_CH' };

/** Locales for Intl date formatting (EN keeps en-GB so existing output is unchanged). */
export const dateLocales: Record<Language, string> = { en: 'en-GB', fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };

/** Unprefixed (EN) paths of every page generated under src/pages/[...lang]/. */
export const sitePages = ['/', '/start/', '/contact/', '/legal/', '/privacy/', '/terms/'] as const;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: UIKey) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

/** getStaticPaths() result for [...lang] routes: EN unprefixed, FR/DE/IT prefixed. */
export function localeStaticPaths(): { params: { lang: string | undefined }; props: { lang: Language } }[] {
  return locales.map((code) => ({
    params: { lang: code === defaultLang ? undefined : code },
    props: { lang: code },
  }));
}

const LOCALE_PREFIX = /^\/(fr|de|it)(?=\/|$)/;

/** Removes a FR/DE/IT prefix: '/fr/contact/' -> '/contact/', '/fr' -> '/'. */
export function stripLocale(pathname: string): string {
  return pathname.replace(LOCALE_PREFIX, '') || '/';
}

/** Same page in another locale: ('/fr/contact/', 'de') -> '/de/contact/'. */
export function switchLocalePath(pathname: string, to: Language): string {
  return getLocalizedPath(stripLocale(pathname), to);
}

/** Normalises a pathname for canonical URLs: '/contact' | '/contact/index.html' -> '/contact/'. */
export function pagePath(pathname: string): string {
  let p = pathname.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (!p.endsWith('/')) p += '/';
  return p;
}
