# Arklens Deployment Guide

## Cloudflare Pages Deployment

### Prerequisites

1. Cloudflare account
2. Git repository (GitHub, GitLab, etc.)
3. Domain `www.arklens.ch` configured in Cloudflare

### Step 1: Connect Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to access your repository
4. Select the Arklens repository

### Step 2: Configure Build Settings

```
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
```

### Step 3: Environment Variables

No environment variables required for the static site.

### Step 4: Deploy

Click **Save and Deploy**

Cloudflare will:
- Install dependencies
- Run the build
- Deploy to CDN
- Generate a preview URL (e.g., `arklens.pages.dev`)

### Step 5: Custom Domain

1. In Cloudflare Pages project settings → **Custom domains**
2. Add `www.arklens.ch`
3. Cloudflare will automatically:
   - Configure DNS
   - Provision SSL certificate
   - Enable HTTPS

### Build Time

Expected build time: 1-2 minutes

### Deployment URLs

- **Production**: https://www.arklens.ch
- **Preview**: https://arklens.pages.dev

## Manual Deployment (Alternative)

### Using Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy dist --project-name=arklens
```

## Continuous Deployment

Cloudflare Pages automatically deploys when you push to the production branch:

- Push to `main` → Production deployment
- Push to other branches → Preview deployment

## Post-Deployment Checklist

### Verify Deployment

- [ ] Homepage loads correctly
- [ ] All sections render properly
- [ ] Language switcher works (FR, EN, DE, IT)
- [ ] Mobile navigation functions
- [ ] Forms are accessible (when implemented)
- [ ] SSL certificate is active (HTTPS)
- [ ] Custom domain resolves correctly

### Performance

- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify loading speed from Switzerland

### SEO

- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags
- [ ] Check Open Graph images
- [ ] Test social media previews

### Analytics Setup (Optional)

1. Add Cloudflare Web Analytics
2. Or integrate privacy-friendly analytics (Plausible, Fathom)
3. Configure in Cloudflare Dashboard → Analytics

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Pages project → **Deployments**
2. Find the previous successful deployment
3. Click **...** → **Rollback to this deployment**

## Monitoring

- **Uptime**: Cloudflare Pages has 99.99% uptime
- **Errors**: Check Cloudflare Dashboard → Analytics → Error logs
- **Traffic**: View in Cloudflare Analytics

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)

## Domain Configuration

### DNS Settings

Ensure these records exist in Cloudflare DNS:

```
Type: CNAME
Name: www
Target: arklens.pages.dev
Proxy status: Proxied (orange cloud)
```

```
Type: A (or CNAME)
Name: @ (root)
Target: Redirect to www.arklens.ch
```

### SSL/TLS Settings

- **SSL/TLS encryption mode**: Full (strict)
- **Always Use HTTPS**: Enabled
- **Automatic HTTPS Rewrites**: Enabled

## Performance Optimization

Cloudflare automatically provides:

- **Global CDN**: Content served from 200+ data centers
- **Brotli compression**: Automatic text compression
- **HTTP/3**: Modern protocol support
- **Image optimization**: Automatic (if enabled)

## Troubleshooting

### Build Fails

Check:
1. Node.js version (18+)
2. `package.json` dependencies
3. Build logs in Cloudflare Dashboard

### Domain Not Resolving

Check:
1. DNS propagation (can take 24-48 hours)
2. SSL certificate status
3. Cloudflare proxy settings

### 404 Errors

- Verify build output directory is `dist`
- Check that index.html exists in dist/
- Review routing configuration

## Cost

Cloudflare Pages Free Tier includes:
- Unlimited bandwidth
- Unlimited requests
- 500 builds/month
- 1 concurrent build

This is sufficient for the Arklens marketing site.

## Security

- **DDoS protection**: Included automatically
- **SSL**: Free automatic certificates
- **Bot protection**: Basic included
- **Firewall**: Available in Cloudflare settings

## Next Steps After Deployment

1. Monitor analytics for first week
2. Submit to Google Search Console
3. Set up monitoring/alerts (Uptime Robot, etc.)
4. Test conversion funnels
5. Implement contact form backend (Cloudflare Workers)
6. Add privacy policy and legal pages
7. Set up customer onboarding automation
