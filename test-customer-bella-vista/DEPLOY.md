# Deployment Guide

This guide explains how to deploy customer websites to Cloudflare Pages.

## Prerequisites

- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)
- Cloudflare account access (Arklens team only)
- Customer domain configured

## Initial Setup

### 1. Create Cloudflare Pages Project

```bash
# Login to Cloudflare (Arklens team only)
wrangler login

# Create new project for customer
wrangler pages project create customer-name
```

**Naming convention**: Use customer business name in lowercase, hyphenated
- Example: `bella-vista-restaurant`
- Example: `alpine-wellness-spa`

### 2. Configure Project Settings

In Cloudflare Dashboard:
1. Go to Pages project settings
2. **Build settings**: Not needed (we deploy pre-built)
3. **Environment variables**: None required for static sites
4. **Custom domains**: Add customer domain after DNS is configured

### 3. Update Project Configuration

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  // ... other config
  site: 'https://www.customer.ch', // Customer's domain
});
```

## Deployment Process

### Standard Deployment

```bash
# 1. Install dependencies
npm install

# 2. Validate data files (optional but recommended)
npm run validate

# 3. Build the website
npm run build

# 4. Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=customer-name --branch=main
```

### Quick Deploy Script

```bash
# All-in-one deployment
npm run deploy
```

This runs: `build` → `wrangler pages deploy`

### Preview Deployment

For testing before production:

```bash
# Deploy to preview environment
wrangler pages deploy dist --project-name=customer-name --branch=preview
```

Preview URL: `preview.customer-name.pages.dev`

## Custom Domain Setup

### Customer-Managed DNS (Default)

**Customer side:**
1. Add CNAME record: `www.customer.ch → customer-name.pages.dev`
2. Optional: Add redirect from apex: `customer.ch → www.customer.ch`

**Arklens side:**
1. Go to Cloudflare Pages project
2. **Custom domains** → **Add custom domain**
3. Enter: `www.customer.ch`
4. Cloudflare verifies DNS automatically
5. SSL certificate issued within minutes

### Arklens-Managed DNS (Optional)

If customer transfers domain to Arklens Cloudflare account:

1. **Add domain to Cloudflare**
   - Domains → Add domain
   - Update nameservers at registrar

2. **Configure DNS**
   ```
   CNAME   www    customer-name.pages.dev
   CNAME   @      customer-name.pages.dev (proxied)
   ```

3. **Add custom domain to Pages**
   - Add both `customer.ch` and `www.customer.ch`
   - Enable automatic HTTPS redirect

## Continuous Deployment

### Manual Updates (Current MVP)

1. **Receive update request** from customer
2. **Edit JSON files** in `src/data/`
3. **Commit to Git**
   ```bash
   git add src/data/
   git commit -m "Update: customer name - description"
   git push
   ```
4. **Deploy**
   ```bash
   npm run deploy
   ```

### Future: Automated CI/CD

When customer repos are on GitHub:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy dist --project-name=customer-name
```

## Rollback

If deployment has issues:

```bash
# List recent deployments
wrangler pages deployment list --project-name=customer-name

# View specific deployment
wrangler pages deployment tail <deployment-id> --project-name=customer-name

# Rollback via Cloudflare Dashboard
# Pages → customer-name → Deployments → Rollback to previous
```

## Monitoring

### Check Deployment Status

```bash
# List all deployments
wrangler pages deployment list --project-name=customer-name

# View deployment logs
wrangler pages deployment tail --project-name=customer-name
```

### Analytics

Available in Cloudflare Dashboard:
- **Pages Analytics**: Traffic, performance metrics
- **Web Analytics**: Visitor insights (if enabled)

## Troubleshooting

### Build Fails

```bash
# Check for TypeScript errors
npm run astro check

# Check for data validation errors
npm run validate

# Clean build
rm -rf dist/ .astro/
npm run build
```

### Deployment Fails

```bash
# Verify Wrangler authentication
wrangler whoami

# Re-login if needed
wrangler login

# Check project exists
wrangler pages project list
```

### Site Not Loading

1. **Check custom domain DNS**
   ```bash
   dig www.customer.ch
   ```
   Should point to Cloudflare IPs or Pages CNAME

2. **Check SSL certificate**
   - Should be issued automatically
   - May take 5-10 minutes initially

3. **Check deployment status**
   - Cloudflare Dashboard → Pages → customer-name
   - Verify deployment is "Success"

### 404 Errors

- Check `astro.config.mjs` site URL matches domain
- Verify all page files are in `src/pages/`
- Check image paths match `public/` structure

## Performance Optimization

### Before Deployment

1. **Optimize images**
   - Use WebP format
   - Compress with tools like ImageOptim, Squoosh
   - Resize to appropriate dimensions

2. **Validate data**
   ```bash
   npm run validate
   ```

3. **Test locally**
   ```bash
   npm run preview
   ```

### After Deployment

1. **Enable Cloudflare optimizations**
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - HTTP/3

2. **Test performance**
   - Lighthouse audit
   - WebPageTest
   - Cloudflare Observatory

## Security

### Access Control

- ✅ Only Arklens team has Cloudflare access
- ✅ Customer websites are publicly accessible
- ✅ No authentication required for public pages

### HTTPS

- ✅ Automatic SSL certificates
- ✅ Always use HTTPS enabled by default
- ✅ HSTS headers configured

### Content Security

- No sensitive data in JSON files
- No API keys or credentials in codebase
- Customer data stays in customer-controlled systems

## Cost Management

### Cloudflare Pages Free Tier

- ✅ Unlimited sites
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 1 build at a time

For Arklens: Monitor build quota across all customer sites.

## Support

### For Arklens Team

- See `OPERATIONS_GUIDE.md` for procedures
- See `TECHNICAL_ARCHITECTURE.md` for architecture
- Internal Slack: #customer-deployments

### For Customers

- Email: support@arklens.ch
- Documentation: Customer dashboard (future)
- Updates: Via email (current MVP)

---

**Last Updated**: 2026-09-26  
**Maintained by**: Arklens Team
