# Arklens Website Deployment Guide

## Quick Start: Standard Cloudflare Pages Setup

### ✅ Recommended Approach: Native GitHub Integration

**This is the standard, simplest method - no code changes needed!**

#### One-Time Setup (5 minutes)

1. **Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Go to: Workers & Pages → Create application → Pages → Connect to Git

2. **Connect GitHub Repository**
   - Authorize Cloudflare to access GitHub
   - Select: `benjaminbeh/Arklens-Website`

3. **Build Configuration**
   ```
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Framework preset: Astro
   ```

4. **Custom Domain**
   - Add: `arklens.ch` and `www.arklens.ch`
   - Cloudflare auto-configures DNS

#### How Automatic Deployment Works

```
┌─────────────────────────────────────────────────────────┐
│  You: git push origin main                              │
│           ↓                                              │
│  GitHub: Receives push                                  │
│           ↓                                              │
│  Cloudflare: Webhook triggers build                     │
│           ↓                                              │
│  Build: npm run build (1-2 minutes)                     │
│           ↓                                              │
│  Deploy: Push to global edge network                    │
│           ↓                                              │
│  Live: www.arklens.ch updated (1-3 min total)          │
└─────────────────────────────────────────────────────────┘
```

**Every push to `main` = Automatic production deployment!**

---

## Current Project Status

### ✅ Your Code is Ready
- Astro site configured correctly
- Build command works: `npm run build`
- Output directory: `dist/`
- wrangler.toml configured

### 📦 Recent Updates (Ready to Deploy)
- Customer handover process documentation
- Updated homepage messaging (CHF 0, Free Website Programme)
- Expanded FAQ (12 questions)
- Terms of Use with exit rights
- Domain ownership protections

### 🚀 Next Steps
1. **Complete Cloudflare Pages setup** (see above)
2. **Push current changes to GitHub:**
   ```bash
   git add .
   git commit -m "Add customer handover process and update messaging"
   git push origin main
   ```
3. **Wait 1-3 minutes** for automatic deployment
4. **Verify** at www.arklens.ch

---

## Branch Strategy (Optional)

### Current Setup: Simple
```
main → Production (www.arklens.ch)
```
- ✅ Direct and fast
- ✅ Good for solo/small team
- ⚠️ No staging environment

### Recommended: With Dev Branch
```
dev → Preview (dev.arklens.pages.dev)
main → Production (www.arklens.ch)
```

**To implement:**
```bash
# Create dev branch
git checkout -b dev
git push -u origin dev

# Update Cloudflare Pages settings:
# - Production branch: main
# - Preview branches: All branches
```

**Workflow:**
1. Work on `dev` branch
2. Test at preview URL: `dev.arklens.pages.dev`
3. When ready: merge `dev` → `main`
4. Production auto-deploys

---

## Deployment Commands Reference

### Local Development
```bash
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Git Workflow
```bash
# Make changes
git add .
git commit -m "Description of changes"
git push origin main    # → Triggers automatic production deployment

# Or work on dev branch
git checkout dev
git add .
git commit -m "Description of changes"
git push origin dev     # → Triggers preview deployment
```

### Manual Deploy (via Wrangler CLI)
```bash
npm run build
npx wrangler pages deploy dist --project-name=arklens
```
*Note: Not needed if using GitHub integration*

---

## Monitoring Deployments

### Cloudflare Dashboard
- Build logs: Workers & Pages → arklens → View logs
- Deployment history: See all past deployments
- Rollback: Click any previous deployment → "Rollback to this deployment"

### GitHub
- Check Actions tab for workflow runs (if using GitHub Actions)
- Cloudflare comments on Pull Requests with preview links

---

## Troubleshooting

### Site shows 521 Error
- **Cause:** No active deployment
- **Fix:** Complete Cloudflare Pages setup and deploy

### Build Fails
- **Check:** Cloudflare Pages build logs
- **Common issues:**
  - Node.js version (needs 18+)
  - Missing dependencies
  - TypeScript errors

### Changes Not Showing
- **Wait:** 1-3 minutes for deployment
- **Check:** Cloudflare dashboard for build status
- **Try:** Hard refresh (Cmd+Shift+R on Mac)
- **Verify:** Correct branch is deployed

### DNS Not Working
- **Check:** Custom domain configuration in Cloudflare
- **Wait:** DNS propagation (up to 24 hours, usually minutes)
- **Verify:** Both `arklens.ch` and `www.arklens.ch` configured

---

## Files Created for Deployment

```
Project Root
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Optional GitHub Actions workflow
│       └── README.md           # When to use GitHub Actions
├── wrangler.toml               # Cloudflare configuration (already exists)
├── CLOUDFLARE_PAGES_SETUP.md  # Detailed setup instructions
└── DEPLOYMENT_GUIDE.md         # This file
```

---

## Summary

**Standard Setup (Recommended):**
1. Connect GitHub repo in Cloudflare dashboard
2. Configure build settings
3. Push to main branch
4. Site automatically deploys!

**That's it! No GitHub Actions, no secrets, no manual steps.**

For detailed instructions, see: `CLOUDFLARE_PAGES_SETUP.md`

For GitHub Actions alternative, see: `.github/workflows/README.md`
