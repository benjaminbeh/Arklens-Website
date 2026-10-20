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
    'nav.examples': 'Benefits',
    'nav.experience': 'Experience',
    'nav.forBusiness': 'For businesses',
    'nav.ai': 'AI',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Get started',
    
    // Hero
    // H1 is split at the first ". " into a lead line and the red price line.
    'hero.title': 'Your business website. Built for CHF\u00A00.',
    'hero.subtitle': 'A professional website programme designed for Swiss SMEs: we build or modernise your website on your own domain, with hosting included.',
    // Footnote for the asterisk on "CHF 0" (H1 and pricing row); the asterisk is added in Hero.astro.
    'hero.feeNote': 'CHF\u00A0120 one-time administration & launch fee applies. Payable after your application is accepted and before onboarding begins.',
    'hero.cta.primary': 'Start my application',
    'hero.cta.secondary': 'Improve my website',
    'hero.trust': 'Applying is free · Your domain always belongs to you · No long-term contract',
    
    // Free offer
    'freeOffer.title': 'Your professional website, without the hassle.',
    'freeOffer.lead': 'Refresh your existing site or start fresh with a clear, modern online presence that reflects your business and is easy for customers to understand.',
    'freeOffer.cardLabel': 'Website programme',
    'freeOffer.cardTitle': 'Simple from start to launch.',
    'freeOffer.cardBody': 'We take care of the technical side — from setup and hosting to security and launch — so you can stay focused on running your business.',
    'freeOffer.domain': 'You pay your domain provider directly for registration and renewal, and the domain remains yours.',
    'freeOffer.features.website': 'Professional one-page website',
    'freeOffer.features.domain': 'Your own domain',
    'freeOffer.features.hosting': 'Hosting included (Arklens Website Programme)',
    'freeOffer.features.ssl': 'Secure connection (HTTPS)',
    'freeOffer.features.mobile': 'Works well on mobile phones',
    'freeOffer.features.seo': 'Help customers find you on Google and through AI',
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
    'whyFree.text1': 'Small and medium-sized businesses in Switzerland should be able to establish a professional digital presence without a large upfront investment.',
    'whyFree.text2': 'Under the Arklens Website Programme, we design and build the essential website at CHF\u00A00 and include hosting. A CHF\u00A0120 one-time administration & launch fee covers the work around your project, from onboarding to launch. If your business later needs additional features, automation or digital services, you can add them when they create value for you.',
    'whyFree.trust.noSubscription': 'One-time fee, no subscription',
    'whyFree.trust.hosting': 'Hosting included',
    'whyFree.trust.noPaymentToApply': 'No payment to apply',
    'whyFree.trust.optional': 'Paid services are optional',
    'whyFree.trust.clear': 'Clear pricing before paid work begins',
    'whyFree.trust.yourDomain': 'Your domain always belongs to you',

    // How it works: apply → review → accepted + fee → onboarding / Digital Business Check → build at CHF 0 → launch
    'howItWorks.title': 'A simple path from application to launch',
    'howItWorks.step1.title': 'Apply',
    'howItWorks.step1.text': 'Complete a short form about your business. Applying is free.',
    'howItWorks.step2.title': 'We review your application',
    'howItWorks.step2.text': 'We check that the programme is a good fit for your business. If it is, we accept your application.',
    'howItWorks.step3.title': 'Pay the one-time fee',
    'howItWorks.step3.text': 'Once accepted, you pay the CHF\u00A0120 administration & launch fee. Onboarding and your Digital Business Check begin.',
    'howItWorks.step4.title': 'We build your website',
    'howItWorks.step4.text': 'We design and build your website at CHF\u00A00 using a professional template tailored to your business.',
    'howItWorks.step5.title': 'Review and go live',
    'howItWorks.step5.text': 'You receive one revision round, then we connect your domain and launch.',
    'howItWorks.cta': 'Start my application',
    // Progression
    'progression.title': 'Your website is only the beginning',
    'progression.text': 'Once your website is live, we can help your tools work together, take repetitive work off your hands and use automation and AI where they genuinely help.',
    'progression.step1': 'Website',
    'progression.step2': 'Digital tools',
    'progression.step3': 'Connected systems',
    'progression.step4': 'Automation',
    'progression.step5': 'AI',

    // Automation Examples
    'automation.title': 'Save time on repetitive work',
    'automation.enquiries.title': 'Customer enquiries',
    'automation.enquiries.desc': 'Automatically sort incoming enquiries, pass them to the right person and prepare replies.',
    'automation.quotes.title': 'Quotations',
    'automation.quotes.desc': 'Create first drafts of quotations from customer requirements.',
    'automation.documents.title': 'Documents',
    'automation.documents.desc': 'Search company documents, manuals and internal information by asking a plain question.',
    'automation.support.title': 'Customer support',
    'automation.support.desc': 'Answer common customer questions using information you approve.',
    'automation.admin.title': 'Administration',
    'automation.admin.desc': 'Move information between forms, spreadsheets, your customer records and other business tools.',
    'automation.reporting.title': 'Reporting',
    'automation.reporting.desc': 'Summarise business information and recurring reports automatically.',

    // Swiss Trust
    'trust.title': 'Built for Swiss SMEs and local businesses',
    'trust.domain': 'Customer-owned domain',
    'trust.pricing': 'Transparent CHF pricing',
    'trust.focus': 'Swiss-market focus',
    'trust.multilingual': 'Ready for more languages',
    'trust.privacy': 'Privacy considered from the start',
    'trust.clear': 'Clear scope before paid work',
    'trust.subscription': 'No forced subscription',

    // FAQ
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What is the Arklens Website Programme?',
    'faq.a1': 'The Arklens Website Programme helps Swiss small and medium-sized businesses create or modernise a professional online presence. We design and build a one-page professional website, include hosting, and guide you through the process from application to launch. Your domain always belongs to you, and you remain free to leave the programme at any time.',
    'faq.q2': 'Are there any other costs?',
    'faq.a2': 'You pay your domain registration and renewal directly, typically around CHF\u00A015–30 per year. Optional services such as additional languages, booking systems, automation or other enhancements are priced separately and always agreed before any work begins.',
    'faq.q3': 'Who owns my domain?',
    'faq.a3': 'You do. We help you purchase it directly, so you retain full ownership and control. You can transfer your domain to any provider at any time.',
    'faq.q4': 'Is hosting really included?',
    'faq.a4': 'Yes, for the basic static website under the Arklens Website Programme. Our infrastructure allows us to provide reliable, fast hosting at no cost.',
    'faq.q5': 'Can you improve my existing website?',
    'faq.a5': "Yes, we can modernise older websites, make difficult-to-use sites easier to use, or add new features to existing websites.",
    'faq.q6': 'Can I add another language later?',
    'faq.a6': 'Absolutely. Multilingual support is available as a paid add-on whenever you need it.',
    'faq.q7': 'Will I be forced into a subscription?',
    'faq.a7': 'No. The administration & launch fee is a one-time payment, not a subscription. All other paid services are optional and clearly priced before any work begins.',
    'faq.q8': 'Can I move my domain later?',
    'faq.a8': 'Yes, because you own it. You can transfer your domain to any provider at any time. See our Terms of Use for details on service exit and data portability.',
    'faq.q9': "What happens if I want to leave Arklens?",
    'faq.a9': "You can leave at any time, with no penalty. You can continue with paid Arklens services, rebuild on your own infrastructure, or move to another provider. Your domain, business content and customer-owned assets go with you, and we provide reasonable help with the move.",
    'faq.q10': "Do I own my website?",
    'faq.a10': "You always own your domain name, business information, customer data and any logos, photos or content that you provide to Arklens.\n\nArklens retains ownership of its website source code, templates, reusable components, design systems, automation scripts and development tools unless a separate written agreement transfers those rights.",
    'faq.q11': "How long does the handover process take?",
    'faq.a11': "Typically 1–3 weeks. We help with DNS configuration, hand over your business content and customer-owned assets, and offer 1–2 hours of support to keep the transition smooth.",
    'faq.q12': "What if the Arklens Website Programme ends?",
    'faq.a12': "You will receive at least 60 days’ notice and clear information about your options, unless urgent security, legal, misuse or operational reasons require shorter notice. Your domain always belongs to you. We will hand over your business content and customer-owned assets and provide reasonable migration assistance so your online presence can continue.",
    'faq.q13': "Can I move my website to another provider?",
    'faq.a13': "Yes. Your domain always remains under your control and you can move it to another provider at any time.\n\nWe can also provide reasonable assistance with migrating your business content and customer-owned assets.\n\nArklens source code, templates and reusable components are not automatically included in a migration.",
    'faq.q14': "Can I take the source code with me?",
    'faq.a14': "The standard Arklens Website Programme does not include ownership or transfer of Arklens source code.\n\nIf you require the source code for your website, Arklens may offer a separate Source Code Buyout or Migration Package depending on the website and its complexity.",
    'faq.q15': "Can my existing web agency or IT provider use Arklens to build something for free?",
    'faq.a15': "The Arklens Website Programme is intended to help eligible small and medium-sized businesses improve their own digital presence.\n\nIt may not be used by agencies, freelancers, IT providers or other third parties to obtain free development work for resale, white-labelling or incorporation into their own paid services.\n\nArklens may decline or discontinue participation where the programme appears to be used primarily for this purpose.",
    'faq.q16': "Can I give the Arklens website to another company?",
    'faq.a16': "The Arklens Website Programme is provided for the participating business’s own use.\n\nThe website, templates or source code may not be resold, white-labelled or transferred to another business without Arklens’ written agreement.\n\nYour own domain, business content and customer-owned assets remain yours.",
    'faq.q17': 'Why is there a CHF\u00A0120 fee if the website build is free?',
    'faq.a17': 'The design and development of your website are provided at CHF\u00A00. The CHF\u00A0120 one-time administration & launch fee covers the work around your project: reviewing your application and business information, onboarding, project preparation and coordination, setup administration, domain and DNS coordination where needed, launch preparation and the final administrative handover.\n\nIt does not pay for designing or developing your website, and hosting remains included.',
    'faq.q18': 'When do I pay the administration & launch fee?',
    'faq.a18': 'There is no charge to apply. If your business is accepted into the programme, the administration & launch fee is paid before onboarding and detailed project discussions begin. We send you the payment details together with your acceptance.\n\nIt is a one-time payment, not a subscription.',
    'faq.q19': 'Who is the Arklens Website Programme for?',
    'faq.a19': 'The programme is designed for Swiss small and medium-sized businesses that need a professional website or want to modernise an existing one: local shops and services, owner-managed and independent businesses, and small teams.\n\nApplications are reviewed individually to make sure the programme is a good fit.',
    'faq.q20': 'What is Arklens?',
    'faq.a20': 'Arklens is a Swiss digital partner for SMEs, helping businesses strengthen their online presence and adopt practical digital tools, automation and AI.',

    // Final CTA
    'finalCta.title': 'Start with your website. Improve your business from there.',
    'finalCta.text': 'Whether you need a first professional website, want to modernise an old one or are ready to add new features, it all starts with a short application.',
    'finalCta.primary': 'Apply for the programme',
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
    'nav.examples': 'Avantages',
    'nav.experience': 'Expérience',
    'nav.forBusiness': 'Pour les PME',
    'nav.ai': 'IA',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Commencer',

    // Hero
    'hero.title': 'Votre site web. Créé pour CHF\u00A00.',
    'hero.subtitle': 'Un programme de site web professionnel conçu pour les PME suisses\u00A0: nous créons ou modernisons votre site sur votre propre nom de domaine, hébergement inclus.',
    'hero.feeNote': 'Des frais uniques d’administration et de lancement de CHF\u00A0120 s’appliquent. Payables après l’acceptation de votre demande et avant la mise en route.',
    'hero.cta.primary': 'Commencer ma demande',
    'hero.cta.secondary': 'Améliorer mon site',
    'hero.trust': 'Demande gratuite · Votre nom de domaine vous appartient toujours · Pas de contrat à long terme',

    // Free offer
    'freeOffer.title': 'Votre site web professionnel, sans tracas.',
    'freeOffer.lead': 'Modernisez votre site actuel ou repartez de zéro avec une présence en ligne claire et moderne, à l’image de votre entreprise et facile à comprendre pour vos clients.',
    'freeOffer.cardLabel': 'Programme Site web',
    'freeOffer.cardTitle': 'Simple, du début à la mise en ligne.',
    'freeOffer.cardBody': 'Nous nous occupons de la partie technique — de la mise en place et de l’hébergement jusqu’à la sécurité et la mise en ligne — pour que vous puissiez vous concentrer sur votre entreprise.',
    'freeOffer.domain': 'Vous payez directement votre prestataire de domaine pour l’enregistrement et le renouvellement, et le nom de domaine reste à vous.',
    'freeOffer.features.website': 'Site web professionnel d’une page',
    'freeOffer.features.domain': 'Votre propre nom de domaine',
    'freeOffer.features.hosting': 'Hébergement inclus (Programme Site web Arklens)',
    'freeOffer.features.ssl': 'Connexion sécurisée (HTTPS)',
    'freeOffer.features.mobile': 'Adapté aux mobiles',
    'freeOffer.features.seo': 'Aider vos clients à vous trouver sur Google et via l’IA',
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
    'whyFree.text1': 'Une PME suisse doit pouvoir se doter d’une présence numérique professionnelle sans gros investissement de départ.',
    'whyFree.text2': 'Avec le Programme Site web Arklens, nous concevons et réalisons le site web essentiel pour CHF\u00A00 et incluons l’hébergement. Des frais uniques d’administration et de lancement de CHF\u00A0120 couvrent le travail autour de votre projet, de la mise en route à la mise en ligne. Si votre entreprise a besoin plus tard d’autres fonctionnalités, d’automatisation ou de services numériques, vous les ajoutez au moment où ils vous apportent une réelle valeur.',
    'whyFree.trust.noSubscription': 'Frais uniques, sans abonnement',
    'whyFree.trust.hosting': 'Hébergement inclus',
    'whyFree.trust.noPaymentToApply': 'Aucun paiement pour déposer une demande',
    'whyFree.trust.optional': 'Les prestations payantes sont facultatives',
    'whyFree.trust.clear': 'Des prix clairs avant tout travail payant',
    'whyFree.trust.yourDomain': 'Votre nom de domaine vous appartient toujours',

    // How it works
    'howItWorks.title': 'Un parcours simple, de la demande à la mise en ligne',
    'howItWorks.step1.title': 'Déposez votre demande',
    'howItWorks.step1.text': 'Remplissez un court formulaire sur votre entreprise. La demande est gratuite.',
    'howItWorks.step2.title': 'Nous examinons votre demande',
    'howItWorks.step2.text': 'Nous vérifions que le programme convient à votre entreprise. Si c’est le cas, nous acceptons votre demande.',
    'howItWorks.step3.title': 'Réglez les frais uniques',
    'howItWorks.step3.text': 'Une fois votre demande acceptée, vous réglez les frais d’administration et de lancement de CHF\u00A0120. La mise en route et votre évaluation numérique commencent.',
    'howItWorks.step4.title': 'Nous créons votre site',
    'howItWorks.step4.text': 'Nous concevons et réalisons votre site pour CHF\u00A00 à partir d’un modèle professionnel adapté à votre entreprise.',
    'howItWorks.step5.title': 'Relecture et mise en ligne',
    'howItWorks.step5.text': 'Vous avez droit à une série de modifications, puis nous connectons votre nom de domaine et mettons le site en ligne.',
    'howItWorks.cta': 'Commencer ma demande',
    // Progression
    'progression.title': 'Votre site web n’est qu’un début',
    'progression.text': 'Une fois votre site en ligne, nous vous aidons à faire fonctionner vos outils ensemble, à réduire les tâches répétitives et à utiliser l’automatisation et l’IA là où elles sont vraiment utiles.',
    'progression.step1': 'Site web',
    'progression.step2': 'Outils numériques',
    'progression.step3': 'Systèmes connectés',
    'progression.step4': 'Automati\u00ADsation',
    'progression.step5': 'IA',

    // Automation Examples
    'automation.title': 'Gagnez du temps sur les tâches répétitives',
    'automation.enquiries.title': 'Demandes clients',
    'automation.enquiries.desc': 'Trier automatiquement les demandes entrantes, les transmettre à la bonne personne et préparer les réponses.',
    'automation.quotes.title': 'Offres',
    'automation.quotes.desc': 'Établir un premier projet d’offre à partir des besoins du client.',
    'automation.documents.title': 'Documents',
    'automation.documents.desc': 'Chercher dans les documents, manuels et informations internes en posant simplement une question.',
    'automation.support.title': 'Service client',
    'automation.support.desc': 'Répondre aux questions fréquentes des clients à partir des informations que vous validez.',
    'automation.admin.title': 'Tâches administratives',
    'automation.admin.desc': 'Transférer les informations entre formulaires, tableurs, fichier clients et autres outils de l’entreprise.',
    'automation.reporting.title': 'Rapports',
    'automation.reporting.desc': 'Résumer automatiquement les chiffres clés et les rapports récurrents.',

    // Swiss Trust
    'trust.title': 'Pensé pour les PME suisses et les entreprises locales',
    'trust.domain': 'Le nom de domaine appartient au client',
    'trust.pricing': 'Prix transparents en CHF',
    'trust.focus': 'Axé sur le marché suisse',
    'trust.multilingual': 'Extensible à plusieurs langues',
    'trust.privacy': 'Protection des données prise en compte dès le départ',
    'trust.clear': 'Périmètre clair avant tout travail payant',
    'trust.subscription': 'Aucun abonnement imposé',

    // FAQ
    'faq.title': 'Questions fréquentes',
    'faq.q1': 'Qu’est-ce que le Programme Site web Arklens\u202F?',
    'faq.a1': 'Le Programme Site web Arklens aide les petites et moyennes entreprises suisses à créer ou à moderniser une présence en ligne professionnelle. Nous concevons et réalisons un site web professionnel d’une page, incluons l’hébergement et vous accompagnons de la demande jusqu’à la mise en ligne. Votre nom de domaine vous appartient toujours, et vous restez libre de quitter le programme à tout moment.',
    'faq.q2': 'Y a-t-il d’autres coûts\u202F?',
    'faq.a2': 'Vous payez directement l’enregistrement et le renouvellement de votre nom de domaine, en général environ CHF\u00A015–30 par an. Les services optionnels comme des langues supplémentaires, un système de réservation, de l’automatisation ou d’autres améliorations ont un prix séparé et sont toujours convenus avant le début des travaux.',
    'faq.q3': 'À qui appartient mon nom de domaine\u202F?',
    'faq.a3': 'À vous. Nous vous aidons à l’acheter directement, afin que vous en gardiez la pleine propriété et le contrôle. Vous pouvez transférer votre domaine chez n’importe quel fournisseur, à tout moment.',
    'faq.q4': 'L’hébergement est-il vraiment inclus\u202F?',
    'faq.a4': 'Oui, pour le site web statique de base du Programme Site web Arklens. Notre infrastructure nous permet de proposer un hébergement fiable et rapide, sans frais.',
    'faq.q5': 'Pouvez-vous améliorer mon site actuel\u202F?',
    'faq.a5': 'Oui. Nous pouvons moderniser un site vieillissant, simplifier un site difficile à utiliser ou ajouter de nouvelles fonctionnalités à un site existant.',
    'faq.q6': 'Puis-je ajouter une autre langue plus tard\u202F?',
    'faq.a6': 'Oui, sans problème. Des langues supplémentaires sont disponibles en option payante, quand vous en avez besoin.',
    'faq.q7': 'Suis-je obligé de prendre un abonnement\u202F?',
    'faq.a7': 'Non. Les frais d’administration et de lancement sont un paiement unique, pas un abonnement. Toutes les autres prestations payantes sont facultatives et leur prix est clairement fixé avant le début des travaux.',
    'faq.q8': 'Puis-je transférer mon nom de domaine plus tard\u202F?',
    'faq.a8': 'Oui, puisqu’il vous appartient. Vous pouvez transférer votre domaine chez n’importe quel fournisseur, à tout moment. Nos Conditions d’utilisation précisent la sortie du service et la portabilité des données.',
    'faq.q9': 'Que se passe-t-il si je veux quitter Arklens\u202F?',
    'faq.a9': 'Vous pouvez partir à tout moment, sans pénalité. Vous pouvez continuer avec les services payants d’Arklens, reconstruire votre site sur votre propre infrastructure ou passer chez un autre fournisseur. Votre nom de domaine, vos contenus et les actifs qui vous appartiennent partent avec vous, et nous vous apportons une aide raisonnable pour le changement.',
    'faq.q10': 'Mon site web m’appartient-il\u202F?',
    'faq.a10': 'Vous restez toujours propriétaire de votre nom de domaine, de vos informations commerciales, de vos données clients ainsi que des logos, photos ou contenus que vous fournissez à Arklens.\n\nArklens reste propriétaire du code source de ses sites web, de ses modèles, de ses composants réutilisables, de ses systèmes de design, de ses scripts d’automatisation et de ses outils de développement, sauf si un accord écrit séparé transfère ces droits.',
    'faq.q11': 'Combien de temps prend le transfert\u202F?',
    'faq.a11': 'En général 1 à 3 semaines. Nous vous aidons à configurer le DNS, nous vous remettons vos contenus et les actifs qui vous appartiennent, et nous offrons 1 à 2 heures de support pour une transition sans accroc.',
    'faq.q12': 'Et si le Programme Site web Arklens prend fin\u202F?',
    'faq.a12': 'Vous recevrez un préavis d’au moins 60 jours et des informations claires sur vos options, sauf si des raisons urgentes de sécurité, d’ordre juridique, d’abus ou d’exploitation imposent un délai plus court. Votre nom de domaine vous appartient toujours. Nous vous remettrons vos contenus et les actifs qui vous appartiennent et vous apporterons une aide raisonnable à la migration, afin que votre présence en ligne puisse continuer.',
    'faq.q13': 'Puis-je transférer mon site web chez un autre fournisseur\u202F?',
    'faq.a13': 'Oui. Votre nom de domaine reste toujours sous votre contrôle et vous pouvez le transférer chez un autre fournisseur à tout moment.\n\nNous pouvons aussi vous apporter une aide raisonnable pour migrer vos contenus et les actifs qui vous appartiennent.\n\nLe code source, les modèles et les composants réutilisables d’Arklens ne sont pas inclus automatiquement dans une migration.',
    'faq.q14': 'Puis-je récupérer le code source\u202F?',
    'faq.a14': 'Le Programme Site web Arklens standard n’inclut ni la propriété ni le transfert du code source d’Arklens.\n\nSi vous avez besoin du code source de votre site, Arklens peut proposer séparément un rachat du code source (Source Code Buyout) ou un forfait de migration, selon le site et sa complexité.',
    'faq.q15': 'Mon agence web ou mon prestataire informatique peut-il passer par Arklens pour obtenir un développement gratuit\u202F?',
    'faq.a15': 'Le Programme Site web Arklens vise à aider les PME éligibles à améliorer leur propre présence numérique.\n\nIl ne peut pas être utilisé par des agences, des indépendants, des prestataires informatiques ou d’autres tiers pour obtenir gratuitement des travaux de développement destinés à la revente, à une offre en marque blanche ou à l’intégration dans leurs propres services payants.\n\nArklens peut refuser ou mettre fin à une participation lorsque le programme semble être utilisé principalement à cette fin.',
    'faq.q16': 'Puis-je céder le site Arklens à une autre entreprise\u202F?',
    'faq.a16': 'Le Programme Site web Arklens est fourni pour l’usage propre de l’entreprise participante.\n\nLe site, les modèles ou le code source ne peuvent pas être revendus, proposés en marque blanche ou transférés à une autre entreprise sans l’accord écrit d’Arklens.\n\nVotre nom de domaine, vos contenus et les actifs qui vous appartiennent restent les vôtres.',
    'faq.q17': 'Pourquoi des frais de CHF\u00A0120 si la création du site est gratuite\u202F?',
    'faq.a17': 'La conception et le développement de votre site web sont fournis pour CHF\u00A00. Les frais uniques d’administration et de lancement de CHF\u00A0120 couvrent le travail autour de votre projet\u00A0: examen de votre demande et de vos informations d’entreprise, mise en route, préparation et coordination du projet, administration de la mise en place, coordination du domaine et du DNS si nécessaire, préparation de la mise en ligne et remise administrative finale.\n\nIls ne rémunèrent ni la conception ni le développement de votre site, et l’hébergement reste inclus.',
    'faq.q18': 'Quand dois-je payer les frais d’administration et de lancement\u202F?',
    'faq.a18': 'Le dépôt d’une demande est gratuit. Si votre entreprise est acceptée dans le programme, les frais d’administration et de lancement sont réglés avant la mise en route et les échanges détaillés sur le projet. Nous vous envoyons les informations de paiement avec l’acceptation de votre demande.\n\nIl s’agit d’un paiement unique, pas d’un abonnement.',
    'faq.q19': 'À qui s’adresse le Programme Site web Arklens\u202F?',
    'faq.a19': 'Le programme est conçu pour les petites et moyennes entreprises suisses qui ont besoin d’un site web professionnel ou qui souhaitent moderniser leur site actuel\u00A0: commerces et services locaux, entreprises indépendantes ou dirigées par leur propriétaire, petites équipes.\n\nChaque demande est examinée individuellement, afin de vérifier que le programme vous convient.',
    'faq.q20': 'Qu’est-ce qu’Arklens\u202F?',
    'faq.a20': 'Arklens est un partenaire numérique suisse pour les PME, qui aide les entreprises à renforcer leur présence en ligne et à adopter des outils numériques pratiques, l’automatisation et l’IA.',

    // Final CTA
    'finalCta.title': 'Commencez par votre site web. Développez votre entreprise ensuite.',
    'finalCta.text': 'Premier site professionnel, modernisation d’un site existant ou nouvelles fonctionnalités\u00A0: tout commence par une courte demande.',
    'finalCta.primary': 'Postuler au programme',
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
    'a11y.openMenu': 'Ouvrir le menu',
    'a11y.closeMenu': 'Fermer le menu',
    'form.optional': 'Facultatif',
    'meta.orgDescription': 'Sites web, outils numériques, automatisation et IA concrète pour les PME suisses',
    'meta.country': 'Suisse',
} satisfies Record<UIKey, string>;

const de = {
    'nav.howItWorks': 'So funktioniert’s',
    'nav.whatWeOffer': 'Angebot',
    'nav.examples': 'Vorteile',
    'nav.experience': 'Erfahrung',
    'nav.forBusiness': 'Für KMU',
    'nav.ai': 'KI',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Loslegen',

    // Hero
    'hero.title': 'Die Website für Ihr Unternehmen. Erstellt für CHF\u00A00.',
    'hero.subtitle': 'Ein professionelles Website-Programm für Schweizer KMU: Wir erstellen oder modernisieren Ihre Website auf Ihrer eigenen Domain, Hosting inklusive.',
    'hero.feeNote': 'Es fällt eine einmalige Administrations- und Lancierungspauschale von CHF\u00A0120 an. Zahlbar nach Annahme Ihrer Anfrage und vor Beginn des Onboardings.',
    'hero.cta.primary': 'Anfrage starten',
    'hero.cta.secondary': 'Meine Website verbessern',
    'hero.trust': 'Anfrage kostenlos · Ihre Domain gehört immer Ihnen · Keine lange Vertragsbindung',

    // Free offer
    'freeOffer.title': 'Ihre professionelle Website, ohne Aufwand.',
    'freeOffer.lead': 'Erneuern Sie Ihre bestehende Website oder starten Sie neu, mit einem klaren, modernen Online-Auftritt, der zu Ihrem Unternehmen passt und für Ihre Kundschaft leicht verständlich ist.',
    'freeOffer.cardLabel': 'Website-Programm',
    'freeOffer.cardTitle': 'Einfach vom Start bis zur Aufschaltung.',
    'freeOffer.cardBody': 'Wir kümmern uns um die Technik — von der Einrichtung und dem Hosting bis zur Sicherheit und Aufschaltung — damit Sie sich auf Ihr Unternehmen konzentrieren können.',
    'freeOffer.domain': 'Sie bezahlen Registrierung und Verlängerung Ihrer Domain direkt bei Ihrem Domain-Anbieter. Die Domain bleibt Ihre.',
    'freeOffer.features.website': 'Professionelle Website mit einer Seite',
    'freeOffer.features.domain': 'Ihre eigene Domain',
    'freeOffer.features.hosting': 'Hosting inbegriffen (Arklens Website-Programm)',
    'freeOffer.features.ssl': 'Sichere Verbindung (HTTPS)',
    'freeOffer.features.mobile': 'Für Smartphones optimiert',
    'freeOffer.features.seo': 'Hilft Ihrer Kundschaft, Sie auf Google und über KI zu finden',
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
    'whyFree.text1': 'Kleine und mittlere Unternehmen in der Schweiz sollen ohne grosse Anfangsinvestition zu einer professionellen digitalen Präsenz kommen.',
    'whyFree.text2': 'Im Arklens Website-Programm gestalten und erstellen wir die grundlegende Website für CHF\u00A00 und stellen das Hosting bereit. Eine einmalige Administrations- und Lancierungspauschale von CHF\u00A0120 deckt die Arbeit rund um Ihr Projekt, vom Onboarding bis zur Aufschaltung. Braucht Ihr Unternehmen später weitere Funktionen, Automatisierung oder digitale Dienstleistungen, ergänzen Sie diese dann, wenn sie Ihnen einen echten Nutzen bringen.',
    'whyFree.trust.noSubscription': 'Einmalige Pauschale, kein Abo',
    'whyFree.trust.hosting': 'Hosting inbegriffen',
    'whyFree.trust.noPaymentToApply': 'Keine Zahlung für die Anfrage',
    'whyFree.trust.optional': 'Kostenpflichtige Leistungen sind optional',
    'whyFree.trust.clear': 'Klare Preise, bevor kostenpflichtige Arbeit beginnt',
    'whyFree.trust.yourDomain': 'Ihre Domain gehört immer Ihnen',

    // How it works
    'howItWorks.title': 'Ein einfacher Weg von der Anfrage bis zur Aufschaltung',
    'howItWorks.step1.title': 'Anfrage senden',
    'howItWorks.step1.text': 'Füllen Sie ein kurzes Formular zu Ihrem Unternehmen aus. Die Anfrage ist kostenlos.',
    'howItWorks.step2.title': 'Wir prüfen Ihre Anfrage',
    'howItWorks.step2.text': 'Wir prüfen, ob das Programm zu Ihrem Unternehmen passt. Wenn ja, nehmen wir Ihre Anfrage an.',
    'howItWorks.step3.title': 'Einmalige Pauschale bezahlen',
    'howItWorks.step3.text': 'Nach der Annahme bezahlen Sie die Administrations- und Lancierungspauschale von CHF\u00A0120. Dann beginnen das Onboarding und Ihr Digital-Check.',
    'howItWorks.step4.title': 'Wir erstellen Ihre Website',
    'howItWorks.step4.text': 'Wir gestalten und entwickeln Ihre Website für CHF\u00A00 auf Basis einer professionellen Vorlage, abgestimmt auf Ihr Unternehmen.',
    'howItWorks.step5.title': 'Prüfen und aufschalten',
    'howItWorks.step5.text': 'Sie erhalten eine Korrekturrunde. Danach verbinden wir Ihre Domain und schalten die Website auf.',
    'howItWorks.cta': 'Anfrage starten',
    // Progression
    'progression.title': 'Ihre Website ist erst der Anfang',
    'progression.text': 'Sobald Ihre Website online ist, helfen wir Ihnen, Ihre Programme miteinander zu verbinden, Routinearbeit zu reduzieren und Automatisierung und KI dort einzusetzen, wo sie wirklich nützen.',
    'progression.step1': 'Website',
    'progression.step2': 'Digitale Tools',
    'progression.step3': 'Vernetzte Systeme',
    'progression.step4': 'Automati\u00ADsierung',
    'progression.step5': 'KI',

    // Automation Examples
    'automation.title': 'Weniger Zeit für Routinearbeit',
    'automation.enquiries.title': 'Kundenanfragen',
    'automation.enquiries.desc': 'Eingehende Anfragen automatisch sortieren, an die richtige Person weiterleiten und Antworten vorbereiten.',
    'automation.quotes.title': 'Offerten',
    'automation.quotes.desc': 'Erste Offertentwürfe direkt aus den Anforderungen der Kundschaft erstellen.',
    'automation.documents.title': 'Dokumente',
    'automation.documents.desc': 'Firmendokumente, Handbücher und interne Informationen mit einfachen Fragen durchsuchen.',
    'automation.support.title': 'Kundendienst',
    'automation.support.desc': 'Häufige Kundenfragen mit Informationen beantworten, die Sie freigeben.',
    'automation.admin.title': 'Verwaltung',
    'automation.admin.desc': 'Informationen zwischen Formularen, Tabellen, Kundendaten und weiteren Programmen übertragen.',
    'automation.reporting.title': 'Berichte',
    'automation.reporting.desc': 'Geschäftszahlen und wiederkehrende Berichte automatisch zusammenfassen.',

    // Swiss Trust
    'trust.title': 'Für Schweizer KMU und lokale Unternehmen gemacht',
    'trust.domain': 'Die Domain gehört der Kundschaft',
    'trust.pricing': 'Transparente Preise in CHF',
    'trust.focus': 'Fokus auf den Schweizer Markt',
    'trust.multilingual': 'Mehrsprachig erweiterbar',
    'trust.privacy': 'Datenschutz von Anfang an mitgedacht',
    'trust.clear': 'Klarer Umfang vor kostenpflichtiger Arbeit',
    'trust.subscription': 'Kein Abo-Zwang',

    // FAQ
    'faq.title': 'Häufige Fragen',
    'faq.q1': 'Was ist das Arklens Website-Programm?',
    'faq.a1': 'Das Arklens Website-Programm hilft kleinen und mittleren Unternehmen in der Schweiz, einen professionellen Online-Auftritt aufzubauen oder zu modernisieren. Wir gestalten und erstellen eine professionelle Website mit einer Seite, Hosting inklusive, und begleiten Sie von der Anfrage bis zur Aufschaltung. Ihre Domain gehört immer Ihnen, und Sie können das Programm jederzeit verlassen.',
    'faq.q2': 'Gibt es weitere Kosten?',
    'faq.a2': 'Registrierung und Verlängerung Ihrer Domain bezahlen Sie direkt, meist rund CHF\u00A015–30 pro Jahr. Zusatzleistungen wie weitere Sprachen, ein Buchungssystem, Automatisierung oder andere Erweiterungen werden separat berechnet und immer vor Beginn der Arbeit vereinbart.',
    'faq.q3': 'Wem gehört meine Domain?',
    'faq.a3': 'Ihnen. Wir helfen Ihnen, sie direkt selbst zu kaufen. So behalten Sie das volle Eigentum und die Kontrolle. Sie können Ihre Domain jederzeit zu einem beliebigen Anbieter übertragen.',
    'faq.q4': 'Ist das Hosting wirklich inbegriffen?',
    'faq.a4': 'Ja, für die einfache statische Website im Arklens Website-Programm. Dank unserer Infrastruktur können wir zuverlässiges, schnelles Hosting kostenlos anbieten.',
    'faq.q5': 'Können Sie meine bestehende Website verbessern?',
    'faq.a5': 'Ja. Wir können ältere Websites modernisieren, schwer bedienbare Websites vereinfachen oder bestehende Websites um neue Funktionen ergänzen.',
    'faq.q6': 'Kann ich später eine weitere Sprache ergänzen?',
    'faq.a6': 'Ja, jederzeit. Weitere Sprachen sind als kostenpflichtige Erweiterung erhältlich, sobald Sie sie brauchen.',
    'faq.q7': 'Muss ich ein Abo abschliessen?',
    'faq.a7': 'Nein. Die Administrations- und Lancierungspauschale ist eine einmalige Zahlung, kein Abo. Alle anderen kostenpflichtigen Leistungen sind optional, und der Preis steht klar fest, bevor die Arbeit beginnt.',
    'faq.q8': 'Kann ich meine Domain später übertragen?',
    'faq.a8': 'Ja, denn sie gehört Ihnen. Sie können Ihre Domain jederzeit zu einem beliebigen Anbieter übertragen. Details zum Austritt aus dem Service und zur Datenportabilität finden Sie in unseren Nutzungsbedingungen.',
    'faq.q9': 'Was passiert, wenn ich Arklens verlassen möchte?',
    'faq.a9': 'Sie können jederzeit und ohne Vertragsstrafe gehen. Sie können mit kostenpflichtigen Arklens-Diensten weitermachen, Ihre Website auf eigener Infrastruktur neu aufbauen oder zu einem anderen Anbieter wechseln. Ihre Domain, Ihre Geschäftsinhalte und die Ihnen gehörenden Assets nehmen Sie mit, und wir unterstützen Sie in angemessenem Umfang beim Wechsel.',
    'faq.q10': 'Gehört mir meine Website?',
    'faq.a10': 'Ihr Domainname, Ihre Geschäftsangaben, Ihre Kundendaten sowie alle Logos, Fotos und Inhalte, die Sie Arklens zur Verfügung stellen, gehören immer Ihnen.\n\nArklens bleibt Eigentümerin ihres Website-Quellcodes, ihrer Vorlagen, wiederverwendbaren Komponenten, Designsysteme, Automatisierungs-Skripte und Entwicklungstools, sofern keine separate schriftliche Vereinbarung diese Rechte überträgt.',
    'faq.q11': 'Wie lange dauert die Übergabe?',
    'faq.a11': 'In der Regel 1–3 Wochen. Wir helfen bei der DNS-Konfiguration, übergeben Ihre Geschäftsinhalte und die Ihnen gehörenden Assets und bieten 1–2 Stunden Support für einen reibungslosen Übergang.',
    'faq.q12': 'Was passiert, wenn das Arklens Website-Programm endet?',
    'faq.a12': 'Sie erhalten eine Vorankündigung von mindestens 60 Tagen sowie klare Informationen zu Ihren Möglichkeiten, ausser wenn dringende sicherheitsrelevante, rechtliche oder betriebliche Gründe oder ein Missbrauch eine kürzere Frist erfordern. Ihre Domain gehört immer Ihnen. Wir übergeben Ihnen Ihre Geschäftsinhalte und die Ihnen gehörenden Assets und unterstützen Sie in angemessenem Umfang bei der Migration, damit Ihre Online-Präsenz weiterbestehen kann.',
    'faq.q13': 'Kann ich mit meiner Website zu einem anderen Anbieter wechseln?',
    'faq.a13': 'Ja. Ihre Domain bleibt immer unter Ihrer Kontrolle, und Sie können sie jederzeit zu einem anderen Anbieter übertragen.\n\nWir können Sie auch in angemessenem Umfang bei der Migration Ihrer Geschäftsinhalte und der Ihnen gehörenden Assets unterstützen.\n\nQuellcode, Vorlagen und wiederverwendbare Komponenten von Arklens sind nicht automatisch Teil einer Migration.',
    'faq.q14': 'Kann ich den Quellcode mitnehmen?',
    'faq.a14': 'Das Arklens Website-Programm umfasst in der Standardversion weder das Eigentum am Quellcode von Arklens noch dessen Übertragung.\n\nWenn Sie den Quellcode Ihrer Website benötigen, kann Arklens je nach Website und Komplexität separat eine Quellcode-Übernahme (Source Code Buyout) oder ein Migrationspaket anbieten.',
    'faq.q15': 'Kann meine Webagentur oder mein IT-Dienstleister Arklens nutzen, um kostenlos etwas entwickeln zu lassen?',
    'faq.a15': 'Das Arklens Website-Programm soll berechtigten KMU helfen, ihre eigene digitale Präsenz zu verbessern.\n\nAgenturen, Freischaffende, IT-Dienstleister oder andere Dritte dürfen es nicht nutzen, um kostenlose Entwicklungsarbeit für den Weiterverkauf, für White-Label-Angebote oder zur Integration in eigene kostenpflichtige Leistungen zu erhalten.\n\nArklens kann eine Teilnahme ablehnen oder beenden, wenn das Programm hauptsächlich zu diesem Zweck genutzt zu werden scheint.',
    'faq.q16': 'Kann ich die Arklens-Website an ein anderes Unternehmen weitergeben?',
    'faq.a16': 'Das Arklens Website-Programm wird für die eigene Nutzung des teilnehmenden Unternehmens bereitgestellt.\n\nDie Website, die Vorlagen oder der Quellcode dürfen ohne schriftliche Zustimmung von Arklens nicht weiterverkauft, als White-Label angeboten oder an ein anderes Unternehmen übertragen werden.\n\nIhre Domain, Ihre Geschäftsinhalte und die Ihnen gehörenden Assets gehören weiterhin Ihnen.',
    'faq.q17': 'Warum eine Pauschale von CHF\u00A0120 trotz kostenloser Website-Erstellung?',
    'faq.a17': 'Gestaltung und Entwicklung Ihrer Website kosten CHF\u00A00. Die einmalige Administrations- und Lancierungspauschale von CHF\u00A0120 deckt die Arbeit rund um Ihr Projekt: die Prüfung Ihrer Anfrage und Ihrer Unternehmensangaben, das Onboarding, die Vorbereitung und Koordination des Projekts, die administrative Einrichtung, falls nötig die Koordination von Domain und DNS, die Vorbereitung der Aufschaltung und die abschliessende administrative Übergabe.\n\nGestaltung und Entwicklung der Website bezahlen Sie damit nicht, und das Hosting bleibt inbegriffen.',
    'faq.q18': 'Wann bezahle ich die Administrations- und Lancierungspauschale?',
    'faq.a18': 'Die Anfrage ist kostenlos. Wird Ihr Unternehmen ins Programm aufgenommen, bezahlen Sie die Administrations- und Lancierungspauschale vor Beginn des Onboardings und der detaillierten Projektgespräche. Die Zahlungsangaben erhalten Sie zusammen mit der Annahme Ihrer Anfrage.\n\nEs ist eine einmalige Zahlung, kein Abo.',
    'faq.q19': 'Für wen ist das Arklens Website-Programm gedacht?',
    'faq.a19': 'Das Programm ist für kleine und mittlere Unternehmen in der Schweiz gedacht, die eine professionelle Website brauchen oder ihre bestehende Website modernisieren möchten: lokale Geschäfte und Dienstleister, inhabergeführte und unabhängige Unternehmen sowie kleine Teams.\n\nWir prüfen jede Anfrage einzeln, damit das Programm auch wirklich zu Ihrem Unternehmen passt.',
    'faq.q20': 'Was ist Arklens?',
    'faq.a20': 'Arklens ist ein Schweizer Digitalpartner für KMU und hilft Unternehmen, ihren Online-Auftritt zu stärken und praktische digitale Tools, Automatisierung und KI einzusetzen.',

    // Final CTA
    'finalCta.title': 'Starten Sie mit Ihrer Website. Und entwickeln Sie Ihr Unternehmen von dort aus weiter.',
    'finalCta.text': 'Ob erste professionelle Website, Modernisierung oder neue Funktionen: Alles beginnt mit einer kurzen Anfrage.',
    'finalCta.primary': 'Teilnahme anfragen',
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
    'a11y.openMenu': 'Menü öffnen',
    'a11y.closeMenu': 'Menü schliessen',
    'form.optional': 'Optional',
    'meta.orgDescription': 'Websites, digitale Tools, Automatisierung und praxisnahe KI für Schweizer KMU',
    'meta.country': 'Schweiz',
} satisfies Record<UIKey, string>;

const it = {
    'nav.howItWorks': 'Come funziona',
    'nav.whatWeOffer': 'Offerta',
    'nav.examples': 'Vantaggi',
    'nav.experience': 'Esperienza',
    'nav.forBusiness': 'Per le PMI',
    'nav.ai': 'IA',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Inizia',

    // Hero
    'hero.title': 'Il sito web della tua azienda. Realizzato a CHF\u00A00.',
    'hero.subtitle': 'Un programma per siti web professionali pensato per le PMI svizzere: creiamo o modernizziamo il tuo sito sul tuo dominio, con hosting incluso.',
    'hero.feeNote': 'Si applica una tariffa unica di amministrazione e lancio di CHF\u00A0120. Da pagare dopo l’accettazione della richiesta e prima dell’avvio del progetto.',
    'hero.cta.primary': 'Inizia la mia richiesta',
    'hero.cta.secondary': 'Migliora il mio sito',
    'hero.trust': 'Richiesta gratuita · Il dominio resta sempre tuo · Nessun contratto a lungo termine',

    // Free offer
    'freeOffer.title': 'Il tuo sito web professionale, senza complicazioni.',
    'freeOffer.lead': 'Rinnova il tuo sito attuale o riparti da zero con una presenza online chiara e moderna, che rispecchia la tua azienda ed è facile da capire per i tuoi clienti.',
    'freeOffer.cardLabel': 'Programma Sito web',
    'freeOffer.cardTitle': 'Semplice, dall’inizio alla messa online.',
    'freeOffer.cardBody': 'Ci occupiamo noi della parte tecnica — dalla configurazione e dall’hosting fino alla sicurezza e alla messa online — così puoi concentrarti sulla tua attività.',
    'freeOffer.domain': 'Paghi direttamente il tuo provider per la registrazione e il rinnovo del dominio, che resta tuo.',
    'freeOffer.features.website': 'Sito web professionale di una pagina',
    'freeOffer.features.domain': 'Il tuo dominio',
    'freeOffer.features.hosting': 'Hosting incluso (Programma Sito web Arklens)',
    'freeOffer.features.ssl': 'Connessione sicura (HTTPS)',
    'freeOffer.features.mobile': 'Ottimizzato per smartphone',
    'freeOffer.features.seo': 'Aiutare i clienti a trovarti su Google e tramite l’IA',
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
    'whyFree.text1': 'Una piccola o media impresa svizzera deve poter avere una presenza digitale professionale senza un grosso investimento iniziale.',
    'whyFree.text2': 'Con il Programma Sito web Arklens progettiamo e realizziamo il sito web essenziale a CHF\u00A00 e includiamo l’hosting. Una tariffa unica di amministrazione e lancio di CHF\u00A0120 copre il lavoro attorno al tuo progetto, dall’avvio alla messa online. Se in seguito la tua azienda avrà bisogno di altre funzionalità, di automazione o di servizi digitali, potrai aggiungerli quando ti portano un vantaggio concreto.',
    'whyFree.trust.noSubscription': 'Tariffa unica, nessun abbonamento',
    'whyFree.trust.hosting': 'Hosting incluso',
    'whyFree.trust.noPaymentToApply': 'Nessun pagamento per inviare la richiesta',
    'whyFree.trust.optional': 'I servizi a pagamento sono facoltativi',
    'whyFree.trust.clear': 'Prezzi chiari prima di ogni lavoro a pagamento',
    'whyFree.trust.yourDomain': 'Il dominio è sempre tuo',

    // How it works
    'howItWorks.title': 'Un percorso semplice, dalla richiesta alla messa online',
    'howItWorks.step1.title': 'Invia la richiesta',
    'howItWorks.step1.text': 'Compila un breve modulo sulla tua azienda. Inviare la richiesta è gratuito.',
    'howItWorks.step2.title': 'Esaminiamo la richiesta',
    'howItWorks.step2.text': 'Verifichiamo che il programma sia adatto alla tua azienda. Se lo è, accettiamo la richiesta.',
    'howItWorks.step3.title': 'Paga la tariffa unica',
    'howItWorks.step3.text': 'Dopo l’accettazione paghi la tariffa di amministrazione e lancio di CHF\u00A0120. Poi iniziano l’avvio del progetto e la tua analisi digitale.',
    'howItWorks.step4.title': 'Realizziamo il tuo sito',
    'howItWorks.step4.text': 'Progettiamo e sviluppiamo il tuo sito a CHF\u00A00 partendo da un modello professionale adattato alla tua azienda.',
    'howItWorks.step5.title': 'Verifica e pubblicazione',
    'howItWorks.step5.text': 'Hai a disposizione un giro di modifiche, poi colleghiamo il dominio e mettiamo online il sito.',
    'howItWorks.cta': 'Inizia la mia richiesta',
    // Progression
    'progression.title': 'Il sito web è solo l’inizio',
    'progression.text': 'Quando il tuo sito è online, possiamo aiutarti a far funzionare insieme i tuoi strumenti, ridurre il lavoro ripetitivo e usare automazione e IA dove servono davvero.',
    'progression.step1': 'Sito web',
    'progression.step2': 'Strumenti digitali',
    'progression.step3': 'Sistemi collegati',
    'progression.step4': 'Automazione',
    'progression.step5': 'IA',

    // Automation Examples
    'automation.title': 'Risparmia tempo sul lavoro ripetitivo',
    'automation.enquiries.title': 'Richieste dei clienti',
    'automation.enquiries.desc': 'Smistare in automatico le richieste in arrivo, inoltrarle alla persona giusta e preparare le risposte.',
    'automation.quotes.title': 'Offerte',
    'automation.quotes.desc': 'Preparare una prima bozza di offerta in base alle esigenze del cliente.',
    'automation.documents.title': 'Documenti',
    'automation.documents.desc': 'Cercare in documenti aziendali, manuali e informazioni interne con semplici domande.',
    'automation.support.title': 'Assistenza clienti',
    'automation.support.desc': 'Rispondere alle domande frequenti dei clienti con informazioni che approvi tu.',
    'automation.admin.title': 'Amministrazione',
    'automation.admin.desc': 'Trasferire dati tra moduli, fogli di calcolo, anagrafica clienti e altri strumenti aziendali.',
    'automation.reporting.title': 'Reportistica',
    'automation.reporting.desc': 'Riassumere in automatico dati aziendali e report ricorrenti.',

    // Swiss Trust
    'trust.title': 'Pensato per le PMI svizzere e le aziende locali',
    'trust.domain': 'Il dominio è del cliente',
    'trust.pricing': 'Prezzi trasparenti in CHF',
    'trust.focus': 'Orientato al mercato svizzero',
    'trust.multilingual': 'Predisposto per più lingue',
    'trust.privacy': 'Privacy considerata fin dall’inizio',
    'trust.clear': 'Ambito chiaro prima di ogni lavoro a pagamento',
    'trust.subscription': 'Nessun abbonamento imposto',

    // FAQ
    'faq.title': 'Domande frequenti',
    'faq.q1': 'Che cos’è il Programma Sito web Arklens?',
    'faq.a1': 'Il Programma Sito web Arklens aiuta le piccole e medie imprese svizzere a creare o modernizzare una presenza online professionale. Progettiamo e realizziamo un sito web professionale di una pagina, includiamo l’hosting e ti accompagniamo dalla richiesta fino alla messa online. Il dominio resta sempre tuo e sei libero di lasciare il programma in qualsiasi momento.',
    'faq.q2': 'Ci sono altri costi?',
    'faq.a2': 'Paghi direttamente la registrazione e il rinnovo del dominio, di solito circa CHF\u00A015–30 all’anno. I servizi opzionali come lingue aggiuntive, un sistema di prenotazione, l’automazione o altri miglioramenti hanno un prezzo separato e sono sempre concordati prima di iniziare qualsiasi lavoro.',
    'faq.q3': 'Di chi è il mio dominio?',
    'faq.a3': 'Tuo. Ti aiutiamo ad acquistarlo direttamente, così mantieni la piena proprietà e il controllo. Puoi trasferire il dominio a qualsiasi fornitore in qualsiasi momento.',
    'faq.q4': 'L’hosting è davvero incluso?',
    'faq.a4': 'Sì, per il sito web statico di base del Programma Sito web Arklens. La nostra infrastruttura ci permette di offrire un hosting affidabile e veloce senza costi.',
    'faq.q5': 'Potete migliorare il mio sito attuale?',
    'faq.a5': 'Sì. Possiamo modernizzare un sito datato, semplificare un sito difficile da usare o aggiungere nuove funzionalità a un sito esistente.',
    'faq.q6': 'Posso aggiungere un’altra lingua in seguito?',
    'faq.a6': 'Certo. Altre lingue sono disponibili come opzione a pagamento, quando ti servono.',
    'faq.q7': 'Devo sottoscrivere un abbonamento?',
    'faq.a7': 'No. La tariffa di amministrazione e lancio è un pagamento unico, non un abbonamento. Tutti gli altri servizi a pagamento sono facoltativi e il prezzo viene definito chiaramente prima di iniziare qualsiasi lavoro.',
    'faq.q8': 'Posso trasferire il mio dominio in seguito?',
    'faq.a8': 'Sì, perché è tuo. Puoi trasferire il dominio a qualsiasi fornitore in qualsiasi momento. Per i dettagli sull’uscita dal servizio e sulla portabilità dei dati consulta le nostre Condizioni d’uso.',
    'faq.q9': 'Cosa succede se voglio lasciare Arklens?',
    'faq.a9': 'Puoi andartene in qualsiasi momento, senza penali. Puoi continuare con i servizi a pagamento di Arklens, ricostruire il sito sulla tua infrastruttura o passare a un altro fornitore. Il dominio, i contenuti aziendali e gli asset di tua proprietà vengono con te, e ti offriamo un supporto ragionevole per il passaggio.',
    'faq.q10': 'Il sito web è mio?',
    'faq.a10': 'Il nome di dominio, le informazioni aziendali, i dati dei clienti e tutti i loghi, le foto o i contenuti che fornisci ad Arklens restano sempre tuoi.\n\nArklens resta proprietaria del codice sorgente dei suoi siti web, dei modelli, dei componenti riutilizzabili, dei design system, degli script di automazione e degli strumenti di sviluppo, salvo un accordo scritto separato che trasferisca tali diritti.',
    'faq.q11': 'Quanto dura il passaggio di consegne?',
    'faq.a11': 'Di solito 1–3 settimane. Ti aiutiamo con la configurazione DNS, ti consegniamo i contenuti aziendali e gli asset di tua proprietà e offriamo 1–2 ore di supporto per un passaggio senza intoppi.',
    'faq.q12': 'Cosa succede se il Programma Sito web Arklens termina?',
    'faq.a12': 'Riceverai un preavviso di almeno 60 giorni e informazioni chiare sulle tue opzioni, salvo urgenti motivi di sicurezza, legali, operativi o di uso improprio che richiedano un preavviso più breve. Il dominio resta sempre tuo. Ti consegneremo i contenuti aziendali e gli asset di tua proprietà e ti offriremo un supporto ragionevole per la migrazione, così la tua presenza online potrà continuare.',
    'faq.q13': 'Posso trasferire il mio sito a un altro fornitore?',
    'faq.a13': 'Sì. Il dominio resta sempre sotto il tuo controllo e puoi trasferirlo a un altro fornitore in qualsiasi momento.\n\nPossiamo anche offrirti un supporto ragionevole per migrare i contenuti aziendali e gli asset di tua proprietà.\n\nIl codice sorgente, i modelli e i componenti riutilizzabili di Arklens non sono inclusi automaticamente in una migrazione.',
    'faq.q14': 'Posso portare con me il codice sorgente?',
    'faq.a14': 'Il Programma Sito web Arklens standard non include la proprietà né il trasferimento del codice sorgente di Arklens.\n\nSe hai bisogno del codice sorgente del tuo sito, Arklens può offrire separatamente un riscatto del codice sorgente (Source Code Buyout) o un pacchetto di migrazione, in base al sito e alla sua complessità.',
    'faq.q15': 'La mia agenzia web o il mio fornitore IT possono usare Arklens per far sviluppare qualcosa gratuitamente?',
    'faq.a15': 'Il Programma Sito web Arklens ha lo scopo di aiutare le PMI idonee a migliorare la propria presenza digitale.\n\nNon può essere utilizzato da agenzie, liberi professionisti, fornitori IT o altri terzi per ottenere gratuitamente lavori di sviluppo da rivendere, da offrire in white label o da integrare nei propri servizi a pagamento.\n\nArklens può rifiutare o interrompere la partecipazione quando il programma sembra essere utilizzato principalmente a questo scopo.',
    'faq.q16': 'Posso cedere il sito Arklens a un’altra azienda?',
    'faq.a16': 'Il Programma Sito web Arklens è fornito per l’uso proprio dell’azienda partecipante.\n\nIl sito, i modelli o il codice sorgente non possono essere rivenduti, offerti in white label o trasferiti a un’altra azienda senza l’accordo scritto di Arklens.\n\nIl dominio, i contenuti aziendali e gli asset di tua proprietà restano tuoi.',
    'faq.q17': 'Perché c’è una tariffa di CHF\u00A0120 se la creazione del sito è gratuita?',
    'faq.a17': 'La progettazione e lo sviluppo del tuo sito web costano CHF\u00A00. La tariffa unica di amministrazione e lancio di CHF\u00A0120 copre il lavoro attorno al tuo progetto: l’esame della richiesta e dei dati aziendali, l’avvio del progetto, la preparazione e il coordinamento, la configurazione amministrativa, se necessario il coordinamento di dominio e DNS, la preparazione della messa online e la consegna amministrativa finale.\n\nNon copre la progettazione né lo sviluppo del sito, e l’hosting resta incluso.',
    'faq.q18': 'Quando pago la tariffa di amministrazione e lancio?',
    'faq.a18': 'Inviare una richiesta è gratuito. Se la tua azienda viene accettata nel programma, la tariffa di amministrazione e lancio si paga prima dell’avvio del progetto e dei colloqui dettagliati. Ti inviamo i dati per il pagamento insieme all’accettazione della richiesta.\n\nÈ un pagamento unico, non un abbonamento.',
    'faq.q19': 'A chi si rivolge il Programma Sito web Arklens?',
    'faq.a19': 'Il programma è pensato per le piccole e medie imprese svizzere che hanno bisogno di un sito web professionale o vogliono modernizzare quello attuale: negozi e servizi locali, aziende indipendenti o gestite dai titolari, piccoli team.\n\nOgni richiesta viene esaminata individualmente, per verificare che il programma sia adatto alla tua azienda.',
    'faq.q20': 'Che cos’è Arklens?',
    'faq.a20': 'Arklens è un partner digitale svizzero per le PMI, che aiuta le aziende a rafforzare la propria presenza online e ad adottare strumenti digitali pratici, automazione e IA.',

    // Final CTA
    'finalCta.title': 'Inizia dal sito web. Poi fai crescere la tua azienda.',
    'finalCta.text': 'Che ti serva un primo sito professionale, voglia modernizzare quello attuale o aggiungere nuove funzioni, tutto inizia con una breve richiesta.',
    'finalCta.primary': 'Candidati al programma',
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
export const sitePages = ['/', '/start/', '/contact/', '/legal/', '/privacy/', '/terms/', '/ai/', '/experience/'] as const;

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
