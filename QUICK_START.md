# Arklens Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd arklens-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:4321

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Type check
npm run astro check

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Quick File Reference

### Adding a New Section

1. Create component in `src/components/`:
```typescript
---
import type { Language } from '@i18n/index';
import { useTranslations } from '@i18n/index';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);
---

<section class="section bg-white">
  <div class="container-custom">
    <h2>{t('section.title')}</h2>
  </div>
</section>
```

2. Add translations in `src/i18n/index.ts`:
```typescript
export const ui = {
  en: {
    'section.title': 'My Section',
  },
  fr: {
    'section.title': 'Ma Section',
  },
  // ... de, it
}
```

3. Import in `src/pages/index.astro`:
```typescript
import MySection from '@components/MySection.astro';

// In <main>:
<MySection lang={lang} />
```

---

## 🎨 Design System Quick Reference

### Colors
```css
/* Primary */
bg-primary-600     /* Buttons */
text-primary-600   /* Links */

/* Neutral */
bg-neutral-50      /* Light backgrounds */
bg-neutral-900     /* Dark text */

/* Backgrounds */
bg-white           /* Main sections */
bg-neutral-50      /* Alternate sections */
```

### Typography
```css
text-display-md    /* Large headings */
text-heading-lg    /* Section titles */
text-body-lg       /* Large text */
```

### Components
```css
.btn              /* Base button */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.btn-lg           /* Large button */

.card             /* Base card */
.card-hover       /* Card with hover effect */

.section          /* Section spacing */
.container-custom /* Container max-width */
```

---

## 🌍 Adding Translations

1. Add keys to all 4 languages in `src/i18n/index.ts`:
```typescript
export const ui = {
  en: { 'key': 'English text' },
  fr: { 'key': 'Texte français' },
  de: { 'key': 'Deutscher Text' },
  it: { 'key': 'Testo italiano' },
}
```

2. Use in components:
```typescript
{t('key')}
```

---

## 📄 Adding a New Page

1. Create file in `src/pages/`:
```typescript
// src/pages/about.astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';

const lang = 'fr';
---

<BaseLayout title="About" description="About us" lang={lang}>
  <Header lang={lang} />
  <main>
    <div class="container-custom pt-32 pb-24">
      <h1>About Page</h1>
    </div>
  </main>
  <Footer lang={lang} />
</BaseLayout>
```

2. Add to navigation if needed in `src/components/Header.astro`

---

## 🔧 Common Tasks

### Change Primary Color
Edit `tailwind.config.mjs`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR',
    // ... other shades
  }
}
```

### Update Meta Tags
Edit `src/layouts/BaseLayout.astro`:
```typescript
<meta name="description" content={description} />
```

### Add Google Fonts
Edit `src/layouts/BaseLayout.astro` in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font" rel="stylesheet" />
```

### Modify Footer
Edit `src/components/Footer.astro`

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

### Type Errors
```bash
# Regenerate types
npm run astro check
```

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

---

## 📱 Testing

### Responsive Design
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test: Mobile (375px), Tablet (768px), Desktop (1440px)

### Accessibility
- Use keyboard navigation (Tab, Enter)
- Check focus indicators
- Test with screen reader

### Performance
```bash
npm run build
npm run preview
# Then run Lighthouse in Chrome DevTools
```

---

## 🚀 Deployment

### To Cloudflare Pages

1. **Via Dashboard:**
   - Push to Git
   - Connect repository in Cloudflare Pages
   - Build command: `npm run build`
   - Output: `dist`

2. **Via CLI:**
```bash
npm run build
wrangler pages deploy dist --project-name=arklens
```

---

## 📦 Project Structure

```
src/
├── components/     → Reusable UI components
├── layouts/        → Page layouts
├── pages/          → Routes (file-based routing)
├── i18n/           → Translations
└── styles/         → Global CSS

public/             → Static assets (copied as-is)
dist/               → Build output (generated)
```

---

## 🎯 Development Workflow

1. **Create branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes**
   - Edit components
   - Update translations
   - Test locally

3. **Build and test**
   ```bash
   npm run build
   npm run preview
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add feature"
   git push origin feature/my-feature
   ```

5. **Deploy**
   - Merge to main
   - Cloudflare auto-deploys

---

## 💡 Tips & Best Practices

- Use TypeScript for type safety
- Keep components small and focused
- Follow existing naming conventions
- Test in multiple browsers
- Optimize images before adding
- Check mobile responsiveness
- Update translations for all languages
- Run build before committing

---

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

## 🆘 Need Help?

1. Check README.md for detailed info
2. Review existing components for examples
3. Check Astro documentation
4. Review PROJECT_SUMMARY.md for architecture

---

**Happy coding! 🚀**
