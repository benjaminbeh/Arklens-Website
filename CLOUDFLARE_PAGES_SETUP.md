# Cloudflare Pages Automatic Deployment Setup

## Standard Setup (Recommended)

Cloudflare Pages natively integrates with GitHub - no GitHub Actions required!

### One-Time Setup in Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Select your account → "Workers & Pages"

2. **Create/Connect Pages Project**
   - Click "Create application" → "Pages"
   - Click "Connect to Git"
   - Authorize GitHub access
   - Select repository: `benjaminbeh/Arklens-Website`

3. **Configure Build Settings**
   ```
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   Node version: 18 (or latest LTS)
   ```

4. **Environment Variables** (if needed)
   - None required for basic Astro build

5. **Custom Domain**
   - Add custom domain: `www.arklens.ch` and `arklens.ch`
   - Cloudflare will auto-configure DNS

### How It Works

**Automatic Deployments:**
- ✅ Push to `main` branch → Production deployment (www.arklens.ch)
- ✅ Push to any other branch → Preview deployment (unique URL)
- ✅ Pull requests → Preview deployment with comment link
- ✅ Deploy time: 1-3 minutes typically
- ✅ Rollback available from dashboard

**What Happens:**
1. You push code to GitHub
2. Cloudflare detects the push (via webhook)
3. Cloudflare builds your site (`npm run build`)
4. Cloudflare deploys to global edge network
5. Your site is live at www.arklens.ch

**No manual steps, no GitHub Actions, no CLI commands needed!**

---

## Branch Strategy Options

### Option A: Simple (Current Setup)
```
main → Production (www.arklens.ch)
```
- Direct push to main = instant production deploy
- Simple, fast, good for solo/small team

### Option B: Dev Branch (Recommended for Teams)
```
dev → Preview (dev-arklens.pages.dev)
main → Production (www.arklens.ch)
```
- Work on `dev` branch
- Merge `dev` → `main` for production
- Safer, allows testing on preview URL first

### Option C: Full Workflow
```
feature/* → Preview (feature-name.arklens.pages.dev)
dev → Preview (dev-arklens.pages.dev)
main → Production (www.arklens.ch)
```
- Feature branches for development
- Merge to dev for staging
- Merge to main for production

---

## Current Configuration Files

Your project is already configured:

**wrangler.toml**
```toml
name = "arklens"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"
```

**package.json**
```json
{
  "scripts": {
    "build": "astro check && astro build"
  }
}
```

✅ Ready to deploy!

---

## Verification

After setup, test the deployment:

1. Make a small change (e.g., update a translation)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```
3. Check Cloudflare Pages dashboard for build progress
4. Site should update in 1-3 minutes

---

## Troubleshooting

**Build fails?**
- Check build logs in Cloudflare dashboard
- Verify Node.js version (should be 18+)
- Ensure all dependencies in package.json

**Site not updating?**
- Check webhook is connected (Settings → Builds & deployments)
- Verify correct branch is configured
- Check build didn't fail silently

**521 Error (Origin Down)?**
- Project not deployed yet
- Build failed - check dashboard
- DNS not configured correctly

---

## Next Steps

1. Complete the one-time Cloudflare dashboard setup above
2. Push your current changes to GitHub
3. Wait 1-3 minutes for automatic deployment
4. Visit www.arklens.ch to see your updated site!

All your handover documentation updates will be live immediately.
