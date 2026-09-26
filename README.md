# Arklens - Swiss SME Digital Services Platform

A production-ready marketing website for Arklens, offering free professional websites to Swiss small businesses with a pathway to digital transformation, automation, and practical AI services.

## 🎯 Project Overview

**URL:** www.arklens.ch  
**Tech Stack:** Astro + TypeScript + Tailwind CSS  
**Hosting:** Cloudflare Pages (planned)  
**Languages:** French (primary), English, German, Italian

## 🚀 Current Status

### ✅ Completed Sections

1. **Hero Section** - Main value proposition with CTAs and website mockup
2. **Customer Paths** - Three entry points (no website, update website, need more features)
3. **Free Offer** - Detailed checklist of what's included for CHF 0
4. **Why Free** - Transparency section explaining the business model
5. **Industry Examples** - 8 industry templates showcase
6. **How It Works** - 3-step process visualization
7. **Digital Services** - 11 optional add-on services
8. **Progression** - Website → Digital Tools → Integrations → Automation → AI
9. **Automation Examples** - 6 practical AI/automation use cases
10. **Digital Business Check** - Assessment teaser with example score
11. **Swiss Trust** - 7 trust indicators for Swiss market
12. **FAQ** - 8 common questions with detailed answers
13. **Final CTA** - Closing conversion section

### 🏗️ Architecture

```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro    # Navigation with language switcher
│   ├── Footer.astro    # Site footer
│   ├── Hero.astro
│   ├── CustomerPaths.astro
│   ├── FreeOffer.astro
│   ├── WhyFree.astro
│   ├── IndustryExamples.astro
│   ├── HowItWorks.astro
│   ├── DigitalServices.astro
│   ├── Progression.astro
│   ├── AutomationExamples.astro
│   ├── DigitalCheck.astro
│   ├── SwissTrust.astro
│   ├── FAQ.astro
│   └── FinalCTA.astro
├── layouts/
│   └── BaseLayout.astro # Main layout with SEO
├── pages/
│   └── index.astro      # Homepage
├── i18n/
│   └── index.ts         # Translation system (4 languages)
└── styles/
    └── global.css       # Tailwind + custom styles
```

### 🌍 Internationalization

The site is built with full i18n support:
- **French (fr)** - Primary language, fully translated
- **English (en)** - Fully translated  
- **German (de)** - In progress
- **Italian (it)** - In progress

Language switcher in header, SEO metadata per language, URL structure ready for `/de/`, `/it/` paths.

### 🎨 Design System

**Colors:**
- Primary: Blue (#0ea5e9) for CTAs and brand
- Neutral: Gray scale for text and backgrounds
- Trust indicators: Green for checkmarks

**Typography:**
- Font: Inter (Google Fonts)
- Display: 2.5rem - 4.5rem (headings)
- Heading: 1.25rem - 2rem (section titles)
- Body: 1rem - 1.125rem (paragraphs)

**Components:**
- Cards with hover effects
- Rounded corners (xl, 2xl)
- Soft shadows
- Smooth transitions

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile navigation menu
- Touch-friendly interactions
- Optimized for all screen sizes

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit http://localhost:4321

### Build

```bash
npm run build
```

Output in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## 📋 Remaining Tasks

### High Priority
1. Complete German & Italian translations
2. Create onboarding form flow (multi-step)
3. Add Cloudflare Pages deployment configuration
4. Create Privacy Policy & Legal pages
5. Add real industry example screenshots/mockups
6. Implement contact form functionality

### Medium Priority
7. Add smooth scroll animations
8. Optimize images and add lazy loading
9. Create sitemap.xml generation
10. Add structured data (LocalBusiness schema)
11. Implement analytics tracking (privacy-friendly)
12. Add "improve website" flow differentiation

### Nice to Have
13. Add testimonials section
14. Create case studies/success stories
15. Add live chat widget
16. Build interactive Digital Business Check tool
17. Add blog/resources section
18. Create email templates for lead follow-up

## 🚢 Deployment

### Cloudflare Pages (Recommended)

1. Connect repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Environment variables: None required for static site

### Custom Domain Setup

1. Add `www.arklens.ch` in Cloudflare Pages
2. Configure DNS records
3. SSL/HTTPS automatic

## 📊 SEO & Performance

### Implemented
- Semantic HTML5
- Meta tags (title, description)
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- robots.txt
- Favicon
- Mobile responsive
- Fast static site

### To Add
- Sitemap.xml
- Structured data (Organization, LocalBusiness)
- Image alt texts (comprehensive)
- Performance optimization (Core Web Vitals)
- Accessibility audit (WCAG 2.2 AA)

## 🔒 Privacy & Compliance

- No tracking cookies (yet)
- No third-party scripts (except Google Fonts)
- GDPR-ready architecture
- Customer owns their domain
- Transparent data handling

## 🎯 Business Model

### Free Tier
- One-page professional website
- Free hosting on Cloudflare
- SSL/HTTPS included
- Mobile responsive
- Basic SEO
- Customer-owned domain (customer pays registration)

### Paid Services (Add-ons)
- Additional languages
- Extra pages
- Booking systems
- Payment integration
- Business email
- SEO optimization
- Analytics
- CRM integration
- Automation & AI services

## 📞 Support

For development questions, create an issue in the repository.

## 📝 License

Proprietary - © 2025 Arklens

---

**Built with** ❤️ **for Swiss SMEs**
