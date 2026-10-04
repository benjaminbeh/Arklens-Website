# GitHub Actions Setup (Optional)

## ⚠️ Important Note

**You probably don't need this GitHub Actions workflow!**

Cloudflare Pages has **built-in GitHub integration** that's simpler and faster. The native integration is the standard approach.

## When to Use GitHub Actions

Use the `deploy.yml` workflow only if you need:
- Custom build steps before deployment
- Third-party integrations (testing, notifications, etc.)
- Multi-environment deployments with complex logic
- GitHub-specific features

## Setup Instructions (If Using GitHub Actions)

### 1. Get Cloudflare Credentials

1. **API Token:**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Create Token → "Edit Cloudflare Workers" template
   - Or use "API Tokens" → "Create Token" → Custom Token
   - Permissions needed:
     - Account → Cloudflare Pages → Edit
   - Copy the token

2. **Account ID:**
   - Go to: https://dash.cloudflare.com
   - Select your account
   - Account ID is shown in the right sidebar
   - Or find it in URL: `dash.cloudflare.com/<account_id>`

### 2. Add GitHub Secrets

1. Go to: https://github.com/benjaminbeh/Arklens-Website/settings/secrets/actions
2. Click "New repository secret"
3. Add these secrets:
   - Name: `CLOUDFLARE_API_TOKEN`
     Value: (your API token from step 1)
   - Name: `CLOUDFLARE_ACCOUNT_ID`
     Value: (your account ID from step 1)

### 3. Push to GitHub

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

The workflow will trigger automatically on push to `main` or `dev` branches.

## Workflow Behavior

- **Push to `main`** → Production deployment (www.arklens.ch)
- **Push to `dev`** → Preview deployment
- **Pull Request** → Preview deployment with unique URL

## Recommended: Use Native Integration Instead

To use Cloudflare's built-in GitHub integration (simpler):
1. Delete this `.github/workflows/deploy.yml` file
2. Follow instructions in `CLOUDFLARE_PAGES_SETUP.md`
3. Connect your repo in Cloudflare dashboard
4. That's it! No secrets, no workflow files needed.

---

**TL;DR:** Use native Cloudflare Pages GitHub integration unless you specifically need GitHub Actions features.
