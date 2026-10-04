# Arklens Operations Guide

**Internal Technical Operations Documentation**

---

## Purpose

This guide provides step-by-step procedures for the Arklens team to manage customer websites while maintaining the core ownership principle:

**The customer owns the business and domain. Arklens manages the infrastructure while providing the service.**

---

## Repository Structure

### Per-Customer Repository Model

```
arklens-customers/
├── customer-a/              # Example: Restaurant Bella Vista
│   ├── README.md            # Customer info and notes
│   ├── src/                 # Website source
│   ├── public/              # Static assets
│   ├── package.json
│   ├── astro.config.mjs
│   ├── tailwind.config.mjs
│   ├── wrangler.toml        # Cloudflare config
│   └── .env.example         # Environment variable template
├── customer-b/              # Example: Consulting ABC
│   └── ...
└── customer-c/              # Example: Garage XYZ
    └── ...
```

### Customer README Template

Each customer folder includes a README with:

```markdown
# Customer: [Business Name]

**Domain:** example.ch  
**Cloudflare Project:** customer-a  
**Contact:** contact@example.ch  
**Service Start:** 2026-01-15  
**Service Tier:** Free Website Programme  

## Business Details
- Industry: Restaurant
- Location: Zurich, Switzerland
- Languages: German, English

## Technical Configuration
- Framework: Astro 4.x
- Deployment: Cloudflare Pages (customer-a)
- DNS: Customer-managed at Infomaniak
- Email: Customer's Google Workspace (separate)

## Custom Features
- Online reservation form
- Multilingual (DE/EN)
- Gallery with 50+ images

## Deployment
```bash
cd customer-a
npm run build
wrangler pages deploy dist --project-name=customer-a --branch=production
```

## Notes
- Customer prefers email updates before deployments
- Reservations send to: bookings@example.ch
- Images optimized to max 1MB each
```

---

## Customer Onboarding Process

### Step 1: Repository Setup

```bash
# Create new customer repository from template
cd arklens-customers/
mkdir customer-newname
cd customer-newname

# Initialize from Arklens template
git init
cp -r ../template-basic/* .

# Update package.json
npm init -y
npm install astro typescript tailwindcss @astrojs/tailwind

# Initial commit
git add .
git commit -m "Initial setup for Customer NewName"
```

### Step 2: Cloudflare Pages Project Creation

```bash
# Create Cloudflare Pages project
wrangler pages project create customer-newname \
  --production-branch=main \
  --build-command="npm run build" \
  --build-output-dir="dist"

# Verify project created
wrangler pages project list | grep customer-newname
```

### Step 3: Configure Custom Domain

**Via Cloudflare Dashboard:**
1. Open Pages project: `customer-newname`
2. Navigate to: Custom domains
3. Click: Set up a custom domain
4. Enter customer's domain: `example.ch`
5. Note DNS records provided by Cloudflare

**Provide to Customer:**
```
To connect your domain, add these DNS records at your registrar:

Type: CNAME
Name: @ (or example.ch)
Value: customer-newname.pages.dev

OR

Type: A
Name: @
Value: 76.76.21.21

Type: A  
Name: @
Value: 99.83.190.102
```

### Step 4: Initial Deployment

```bash
cd customer-newname

# Build site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist \
  --project-name=customer-newname \
  --branch=production \
  --commit-message="Initial deployment"

# Verify deployment
# Check: https://customer-newname.pages.dev
```

### Step 5: DNS Verification

**Wait for customer to configure DNS, then:**

```bash
# Check DNS propagation
dig example.ch
nslookup example.ch

# Check SSL certificate
curl -I https://example.ch

# Verify site loads
curl https://example.ch
```

**Expected:**
- DNS resolves to Cloudflare IPs
- SSL certificate valid (issued by Cloudflare)
- Site loads correctly

### Step 6: Final Verification Checklist

- [ ] Website loads at customer's domain
- [ ] HTTPS working (green padlock)
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Customer contacted for approval

---

## Customer Update Deployment

### Standard Content Update

```bash
# Navigate to customer folder
cd arklens-customers/customer-a

# Pull latest changes
git pull origin main

# Make content updates
# Edit files in src/content/ or src/pages/

# Test locally
npm run dev
# Open: http://localhost:4321

# Build for production
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist \
  --project-name=customer-a \
  --branch=production \
  --commit-message="Update: [description]"

# Verify deployment
# Check: https://customer-domain.ch

# Commit and push changes
git add .
git commit -m "Update: [description]"
git push origin main
```

### Emergency Rollback

```bash
# View deployment history
wrangler pages deployment list --project-name=customer-a

# Rollback to previous deployment
wrangler pages deployment rollback \
  --project-name=customer-a \
  --deployment-id=[previous-deployment-id]

# Verify rollback successful
# Check: https://customer-domain.ch
```

### Scheduled Maintenance Update

For updates affecting multiple customers:

```bash
# Update template or shared components
cd arklens-customers/template-basic
# Make updates to shared components

# Test with one customer first
cd ../customer-a
npm update [package]
npm run build
npm test  # if tests exist
wrangler pages deploy dist --project-name=customer-a

# If successful, roll out to other customers
for customer in customer-b customer-c customer-d; do
  cd ../$customer
  npm update [package]
  npm run build
  wrangler pages deploy dist --project-name=$customer
done
```

---

## DNS Management

### Customer-Managed DNS (Recommended)

**Setup Process:**

1. Provide DNS records to customer:
   ```
   Add at your registrar (e.g., Infomaniak, GoDaddy):
   
   Type: CNAME
   Name: www
   Value: customer-a.pages.dev
   TTL: Auto or 3600
   
   Type: CNAME
   Name: @  (or root domain)
   Value: customer-a.pages.dev
   TTL: Auto or 3600
   ```

2. Customer updates DNS at their registrar
3. Wait for DNS propagation (typically 1-24 hours)
4. Verify DNS resolution
5. Cloudflare automatically provisions SSL

**Troubleshooting DNS Issues:**

```bash
# Check DNS resolution
dig customer-domain.ch

# Check DNS propagation globally
# Use: https://www.whatsmydns.net

# Check Cloudflare DNS status
wrangler pages deployment list --project-name=customer-a

# Verify custom domain in Cloudflare
# Dashboard → Pages → customer-a → Custom domains
```

### Arklens-Managed DNS (Alternative)

**Setup Process:**

1. Customer changes nameservers at registrar to Cloudflare nameservers
2. Add domain to Cloudflare (Arklens account)
3. Configure all DNS records in Cloudflare:
   ```
   A    @     76.76.21.21      (Cloudflare IP)
   A    @     99.83.190.102    (Cloudflare IP)
   CNAME www   customer-a.pages.dev
   MX   @     [customer's email provider MX records]
   TXT  @     [SPF, DKIM records for email]
   ```
4. Wait for nameserver propagation (24-48 hours)
5. Verify all services working (website, email)

**Important:** Document this arrangement clearly in customer service agreement.

---

## SSL/TLS Certificate Management

### Automatic SSL (Default)

**Cloudflare handles SSL automatically:**
- Certificates provision within 24 hours of DNS configuration
- Automatic renewal every 90 days
- No manual intervention required

**Verification:**

```bash
# Check SSL certificate
curl -vI https://customer-domain.ch 2>&1 | grep -A 10 "SSL connection"

# Check certificate expiry
echo | openssl s_client -servername customer-domain.ch -connect customer-domain.ch:443 2>/dev/null | openssl x509 -noout -dates

# Expected output:
# notBefore: [date]
# notAfter: [date in future]
```

**If SSL not working:**

1. Verify DNS is correctly pointing to Cloudflare
2. Check Cloudflare Pages custom domain status
3. Wait 24 hours for certificate provisioning
4. Check Cloudflare SSL/TLS settings (should be "Full" or "Full (strict)")
5. Contact Cloudflare support if issue persists

---

## Customer Data Export

### On-Demand Export Request

When customer requests data export, prepare the **Customer Asset Package** (content, customer-owned media, business data, URL list, DNS records) as described in EXPORT_PACKAGE_GUIDE.md.

> Website code is **not** part of a standard export. Run Step 1 only if a Source Code Buyout or Migration Package is signed (Terms of Use, Section 5.5).

**Step 1: Prepare Website Code Export (Migration Package only)**

```bash
cd arklens-customers/customer-a

# Create clean export (no node_modules, no .git)
mkdir -p ../exports/customer-a-export-$(date +%Y%m%d)
rsync -av --exclude='node_modules' --exclude='.git' --exclude='dist' \
  ./ ../exports/customer-a-export-$(date +%Y%m%d)/

# Create archive
cd ../exports
zip -r customer-a-export-$(date +%Y%m%d).zip customer-a-export-$(date +%Y%m%d)/
```

**Step 2: Export Customer Data (if applicable)**

```bash
# If using Cloudflare D1 database
wrangler d1 export customer-a-db --output=customer-a-data.sql

# If using external database
# Use database-specific export tools

# Include in export package
cp customer-a-data.sql exports/customer-a-export-$(date +%Y%m%d)/data/
```

**Step 3: Create Documentation Package**

Create handover documentation:
```
customer-a-handover/
├── README.md                # Overview and setup instructions
├── DEPLOYMENT.md            # How to deploy
├── ARCHITECTURE.md          # How site is built
├── DNS_CONFIG.txt           # Current DNS configuration
├── code/                    # Website source code
│   ├── src/
│   ├── public/
│   └── package.json
└── data/                    # Exported data
    └── database.sql
```

**Step 4: Deliver to Customer**

- Upload to secure file sharing (e.g., Dropbox, Google Drive, or customer's preferred method)
- Send download link via email
- Include setup instructions
- Offer brief technical support call if needed

---

## Customer Offboarding / Migration

### Customer Leaving Arklens

**Step 1: Confirm Departure (T-7 days)**

- Receive customer's migration notice
- Confirm migration date
- Prepare handover package
- Schedule handover call (optional)

**Step 2: Prepare Handover Package (T-5 days)**

- Prepare the Customer Asset Package (see Customer Data Export above)
- Export all customer data
- Website code only if a Migration Package is signed
- Create documentation package
- Test that export is complete

**Step 3: Deliver Handover Package (T-3 days)**

- Send customer their complete website and data
- Provide setup instructions
- Offer technical consultation call
- Confirm customer received files successfully

**Step 4: Transition Period (T to T+7 days)**

- Keep current hosting active
- Customer or new provider sets up new hosting
- Customer updates DNS to point to new hosting
- Monitor that transition is successful

**Step 5: Decommission (T+7 days)**

- Verify customer's new site is live
- Verify DNS has switched over
- Decommission Cloudflare Pages project:
  ```bash
  wrangler pages project delete customer-a
  ```
- Remove custom domain from Cloudflare
- Archive customer repository:
  ```bash
  cd arklens-customers
  mv customer-a archived/customer-a-$(date +%Y%m%d)
  ```
- Delete customer data per privacy policy
- Update internal customer records

**Step 6: Post-Departure (T+30 days)**

- Final confirmation customer transition successful
- Remove from monitoring and alerting
- Archive all related documentation
- Update financial records

---

## Monitoring and Maintenance

### Uptime Monitoring

**Setup per customer:**

Use uptime monitoring service (e.g., UptimeRobot, Pingdom, Cloudflare Health Checks):

```yaml
Monitor Config:
  URL: https://customer-domain.ch
  Check Interval: 5 minutes
  Alert Email: ops@arklens.ch
  Alert After: 2 consecutive failures
```

**Alert Response:**

1. Verify site is actually down (check from multiple locations)
2. Check Cloudflare status: https://www.cloudflarestatus.com
3. Check Cloudflare Pages deployment status
4. Check DNS resolution
5. If DNS issue: Contact customer to verify DNS unchanged
6. If hosting issue: Check Cloudflare dashboard for errors
7. If widespread: May be Cloudflare incident
8. Notify customer of issue and ETA for resolution

### SSL Certificate Monitoring

**Should never be needed** (Cloudflare auto-renews), but monitor as safety:

```bash
# Weekly check of all customer SSL certificates
for customer in customer-a customer-b customer-c; do
  domain=$(cat $customer/wrangler.toml | grep "routes" | head -1)
  expiry=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -enddate)
  echo "$customer ($domain): $expiry"
done
```

**Alert if certificate expires in < 30 days** (should never happen with Cloudflare auto-renewal)

### Performance Monitoring

**Monthly performance check:**

```bash
# Use Lighthouse CI for each customer
npx lighthouse https://customer-domain.ch \
  --output=html \
  --output-path=./reports/customer-a-$(date +%Y%m).html \
  --view

# Check Core Web Vitals
# Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

**If performance degrades:**
- Check for large unoptimized images
- Review recent code changes
- Check Cloudflare caching configuration
- Optimize build output

---

## Security Procedures

### Security Incident Response

**If security vulnerability discovered:**

1. **Assess severity:**
   - Critical: Actively exploited, data breach
   - High: Exploitable vulnerability, no active exploitation
   - Medium: Requires specific conditions
   - Low: Theoretical vulnerability

2. **Immediate action (Critical/High):**
   - Identify affected customers
   - Deploy fix or mitigation immediately
   - Notify affected customers within 24 hours
   - Document incident

3. **Planned update (Medium/Low):**
   - Schedule fix in next maintenance window
   - Test thoroughly before deployment
   - Deploy to all customers
   - Document in changelog

### Dependency Updates

**Monthly security updates:**

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Test thoroughly
npm run build
npm run test  # if tests exist

# Deploy to test customer first
cd customer-a
npm run build
wrangler pages deploy dist --project-name=customer-a

# If successful, roll out to all customers
```

### API Key and Secret Rotation

**Quarterly rotation of Arklens-managed secrets:**

```bash
# Rotate Cloudflare API token
# 1. Create new token in Cloudflare dashboard
# 2. Update in CI/CD secrets
# 3. Test deployments work
# 4. Revoke old token

# Rotate customer-specific secrets (if managed by Arklens)
wrangler pages secret put API_KEY --project-name=customer-a
# Enter new secret when prompted
```

---

## Troubleshooting Guide

### Site Not Loading

**Checklist:**

1. Check DNS:
   ```bash
   dig customer-domain.ch
   nslookup customer-domain.ch
   ```
   - Should resolve to Cloudflare IPs
   - If not: Customer DNS configuration issue

2. Check Cloudflare Pages status:
   ```bash
   wrangler pages deployment list --project-name=customer-a
   ```
   - Latest deployment should be "Success"
   - If "Failed": Check build logs

3. Check custom domain in Cloudflare:
   - Dashboard → Pages → customer-a → Custom domains
   - Status should be "Active"

4. Check SSL certificate:
   ```bash
   curl -I https://customer-domain.ch
   ```
   - Should return 200 OK
   - Should have valid SSL

### Build Failures

**If deployment fails:**

1. Check build logs:
   ```bash
   wrangler pages deployment list --project-name=customer-a
   wrangler pages deployment tail --project-name=customer-a
   ```

2. Test build locally:
   ```bash
   cd customer-a
   npm run build
   ```

3. Common issues:
   - Missing dependency: `npm install`
   - Node version mismatch: Update `.node-version` file
   - TypeScript errors: Fix type errors
   - Asset path issues: Check `astro.config.mjs`

4. Fix and redeploy:
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=customer-a
   ```

### DNS Issues

**Customer DNS not resolving:**

1. Verify customer updated DNS:
   - Ask customer to send screenshot of DNS settings
   - Verify records match what we provided

2. Check DNS propagation:
   - Use: https://www.whatsmydns.net
   - May take 24-48 hours

3. Verify Cloudflare custom domain:
   - Should be "Active" in Cloudflare dashboard
   - If "Pending": Waiting for DNS
   - If "Failed": DNS misconfigured

### SSL Certificate Issues

**Certificate not provisioning:**

1. Verify DNS pointing to Cloudflare (prerequisite)
2. Wait 24 hours for automatic provisioning
3. Check Cloudflare SSL/TLS mode:
   - Should be "Full" or "Full (strict)"
4. Check custom domain status in Pages
5. If still failing after 48 hours:
   - Contact Cloudflare support
   - Provide domain name and project name

---

## Emergency Procedures

### Cloudflare Outage

**If Cloudflare is down:**

1. Check Cloudflare status: https://www.cloudflarestatus.com
2. Monitor incident updates
3. Notify affected customers:
   - "We're aware of a Cloudflare outage affecting your website. Cloudflare is working on resolution. We'll update you when service is restored."
4. No action needed on our side (Cloudflare handles infrastructure)
5. Follow up when resolved

### Customer Domain Expired

**If customer's domain expired:**

1. Notify customer immediately:
   - "Your domain [example.ch] appears to have expired. Please renew it with your registrar to restore your website."
2. Provide registrar contact information if known
3. Website hosting remains active (customer pays for renewal)
4. Follow up to confirm renewal
5. Verify site accessible after renewal

### Data Loss or Corruption

**If customer data lost or corrupted:**

1. Stop all deployments immediately
2. Assess extent of data loss
3. Restore from most recent backup:
   ```bash
   cd arklens-customers/customer-a
   git log  # Find last good commit
   git checkout [commit-hash] -- .
   npm run build
   wrangler pages deploy dist --project-name=customer-a
   ```
4. Notify customer of incident and restoration
5. Document incident and implement prevention measures

---

## Best Practices

### Code Quality
- ✅ Lint code before committing
- ✅ Test builds locally before deploying
- ✅ Use TypeScript for type safety
- ✅ Follow Astro and Tailwind best practices
- ✅ Optimize images before adding to site

### Deployment Safety
- ✅ Always test in staging (test customer) first
- ✅ Deploy during low-traffic hours when possible
- ✅ Keep previous deployment ID for quick rollback
- ✅ Verify deployment successful before notifying customer
- ✅ Monitor for 24 hours after major updates

### Customer Communication
- ✅ Set expectations for update timelines
- ✅ Notify before major updates
- ✅ Confirm changes after deployment
- ✅ Document all change requests
- ✅ Keep communication professional and clear

### Documentation
- ✅ Update customer README for configuration changes
- ✅ Document custom features or integrations
- ✅ Keep deployment history in git commits
- ✅ Record customer preferences and special requests
- ✅ Maintain internal wiki for common issues

---

## Useful Commands Reference

```bash
# Cloudflare Pages
wrangler pages project list
wrangler pages project create [name]
wrangler pages deployment list --project-name=[name]
wrangler pages deploy dist --project-name=[name]
wrangler pages deployment tail --project-name=[name]

# DNS
dig [domain]
nslookup [domain]
whois [domain]

# SSL
curl -I https://[domain]
openssl s_client -servername [domain] -connect [domain]:443

# Git
git log --oneline
git checkout [commit-hash]
git revert [commit-hash]

# Astro
npm run dev          # Local development
npm run build        # Production build
npm run preview      # Preview production build

# Node/NPM
npm install
npm update
npm audit
npm run [script]
```

---

**Document Version:** 1.0  
**Last Updated:** September 27, 2026  
**Maintained By:** Arklens Technical Team  
**Access:** Internal only - Arklens operations team
