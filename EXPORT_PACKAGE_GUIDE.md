# Export Package Guide - Technical Documentation

**Purpose:** Define what is returned to customers on exit, what is only released under a separate agreement, and how to package it securely.

**Audience:** Arklens technical team preparing export packages

**Last Updated:** October 4, 2026

---

## Overview

When a customer leaves Arklens, they always receive what belongs to them: their domain, business content, customer-owned assets and data. This is the **Customer Asset Package**. It is free and standard for every handover.

Arklens technology (source code, templates, reusable components, design systems, development frameworks, automation scripts, deployment systems, internal tools and reusable AI/workflow components) remains Arklens property. It is **only** handed over when a **Source Code Buyout or Migration Package** has been agreed separately in writing (Terms of Use, Section 5.5).

> **Rule of thumb:** Domain + business content = customer. Arklens technology + source code = Arklens.

### Key Principles

1. **Customer assets always go back:** Everything the customer owns is returned, promptly and at no charge
2. **No automatic source-code transfer:** Source code and the compiled build are released only under a signed agreement
3. **Security:** Remove Arklens internal credentials and other customers' data from anything delivered
4. **Portability:** Use standard, readable formats (text, image files, CSV/JSON) any provider can work with
5. **Fair use:** Confirm the request comes from the participating business, not a third party seeking free development for resale or white-labelling (Terms 2.10)

---

## Package Types

### Standard: Customer Asset Package (always, no charge)

**Purpose:** Return everything the customer owns, in formats any provider can use.

**Contents:**
```
customer-name-assets-YYYY-MM-DD.zip
│
├── README.md                          # What's inside and how a new provider can use it
│
├── content/                           # Customer's business content
│   ├── content.md                     # All page text in plain, readable form
│   ├── business.json
│   ├── services.json
│   ├── hours.json
│   ├── contact.json
│   ├── social.json
│   └── team.json
│
├── media/                             # Customer-provided originals
│   ├── logo/
│   └── images/
│
├── data/                              # Business and customer data held by Arklens
│   └── form-submissions.csv           # If applicable
│
├── site-map/
│   └── urls.csv                       # Page URLs, titles and meta descriptions (for redirects and SEO)
│
└── dns/
    ├── current-dns-records.txt
    └── DNS_CONFIGURATION.md
```

**Never included in the Customer Asset Package:** source code, templates, components, design-system files, compiled build, deployment configuration, automation scripts.

**File Size:** Typically 5-40 MB (depends on images)

---

### Optional: Migration Package (only with a signed agreement)

Prepare these **only** when the handover file contains a signed Source Code Buyout, Migration Package, licence expansion or IP buyout. Record the agreement reference in the export log. The agreement defines the scope (for example source code, static build, or both) and the licence granted.

### Migration Package A: Source Code Package

**Purpose:** Website source code for the customer’s developer. Only when a Source Code Buyout or Migration Package covering source code is signed.

**Contents:**
```
customer-name-source-YYYY-MM-DD.zip
│
├── README.md                          # Deployment and setup guide
├── DEPLOYMENT_GUIDE.md                # Platform-specific instructions
├── CHANGELOG.md                       # Customer's update history
│
├── package.json                       # Dependencies
├── package-lock.json                  # Dependency lock file
├── astro.config.mjs                   # Astro configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.mjs                # Tailwind CSS configuration
│
├── .gitignore                         # Git ignore file
├── .env.example                       # Environment variables template (no real values!)
│
├── src/
│   ├── components/                    # UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── BusinessHours.astro
│   │   ├── ServiceList.astro
│   │   ├── ContactInfo.astro
│   │   └── [other components]
│   │
│   ├── layouts/                       # Page layouts
│   │   └── BaseLayout.astro
│   │
│   ├── pages/                         # Website pages
│   │   ├── index.astro                # Homepage
│   │   ├── services.astro
│   │   ├── contact.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   └── legal.astro
│   │
│   ├── data/                          # Content data files
│   │   ├── business.json
│   │   ├── services.json
│   │   ├── hours.json
│   │   ├── contact.json
│   │   ├── social.json
│   │   ├── team.json
│   │   └── cta.json
│   │
│   └── styles/                        # Global styles
│       └── global.css
│
├── public/                            # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       ├── logo.png
│       ├── hero/
│       ├── services/
│       ├── team/
│       └── gallery/
│
└── docs/                              # Additional documentation
    ├── DNS_CONFIGURATION.md
    ├── SSL_SETUP.md
    └── TROUBLESHOOTING.md
```

**File Size:** Typically 10-50 MB (depends on images)

---

### Migration Package B: Static Build Package

**Purpose:** Pre-built HTML/CSS/JS for immediate deployment. The compiled build contains Arklens templates and components, so it is also only provided under a signed Migration Package.

**Contents:**
```
customer-name-static-YYYY-MM-DD.zip
│
├── DEPLOYMENT.md                      # How to deploy these files
│
└── dist/                              # Built static site
    ├── index.html
    ├── services.html
    ├── contact.html
    ├── about.html
    ├── privacy.html
    ├── legal.html
    │
    ├── _astro/                        # Compiled assets
    │   ├── [hash].css                 # Compiled CSS
    │   └── [hash].js                  # Compiled JavaScript
    │
    └── images/                        # Optimized images
        ├── logo.png
        ├── hero/
        ├── services/
        ├── team/
        └── gallery/
```

**File Size:** Typically 5-30 MB

**Use cases:**
- Simple hosting on any static host
- No build process required
- Fastest deployment option

---

## Package Preparation Procedure

### Step 1: Pre-Export Verification

Before creating export package, verify:

#### ☐ 1.1 Customer Identification
- [ ] Confirm customer identity
- [ ] Verify authorization (legitimate handover request)
- [ ] Check account status
- [ ] Confirm the requester is the participating business itself (Terms 2.10)
- [ ] Confirm package scope: Customer Asset Package only, or Migration Package (requires signed agreement on file)

#### ☐ 1.2 Repository Status Check
- [ ] Locate customer's repository
- [ ] Verify it's the correct customer
- [ ] Check for uncommitted changes
- [ ] Ensure latest version deployed
- [ ] Review CHANGELOG.md for recent updates

#### ☐ 1.3 Data Integrity Check
- [ ] All JSON data files present
- [ ] No corrupt or missing images
- [ ] All pages accessible
- [ ] No broken links or 404s
- [ ] Build currently succeeds

---

### Step 1B: Customer Asset Package Preparation (always)

#### ☐ 1B.1 Collect Customer Content
- [ ] Export all page text into `content/content.md` (readable, no markup)
- [ ] Copy content data files (business, services, hours, contact, social, team)
- [ ] Remove any Arklens template text or placeholder copy

#### ☐ 1B.2 Collect Customer-Owned Media
- [ ] Copy customer-provided logos and images (original resolution where available)
- [ ] Exclude Arklens-made design assets, icons and illustrations

#### ☐ 1B.3 Export Business and Customer Data
- [ ] Export form submissions or other customer data held by Arklens (CSV)
- [ ] Confirm data belongs only to this customer

#### ☐ 1B.4 Site Map and DNS
- [ ] Create `site-map/urls.csv` (URL, page title, meta description)
- [ ] Record current DNS records and include DNS_CONFIGURATION.md

#### ☐ 1B.5 Archive
```bash
zip -r customer-name-assets-YYYY-MM-DD.zip customer-name-assets/ -x "*/.DS_Store"
sha256sum customer-name-assets-YYYY-MM-DD.zip > package-checksums.txt
```

> **Stop here unless a Migration Package is signed.** Steps 2 and 3 apply only when the handover file contains a signed Source Code Buyout or Migration Package. Record the agreement reference before continuing.

---

### Step 2: Source Code Preparation (Migration Package only)

#### ☐ 2.1 Clone Clean Copy

```bash
# Create export workspace
mkdir -p exports/customer-name-YYYY-MM-DD
cd exports/customer-name-YYYY-MM-DD

# Clone customer repository
git clone /path/to/customer/repo customer-name-source

cd customer-name-source
```

#### ☐ 2.2 Security Audit - CRITICAL

**Remove Arklens Internal Items:**

```bash
# Check for Arklens credentials (should not exist, but verify)
grep -r "CLOUDFLARE_API" .
grep -r "ARKLENS_INTERNAL" .
grep -r "wrangler" . --exclude-dir=node_modules

# Remove any found credentials
# (Better: these should never be in customer repos)
```

**Check for Other Customers' Data:**

```bash
# Verify no cross-customer contamination
# Look for references to other customer names, domains, etc.
grep -r "other-customer-name" .
grep -r "other-customer-domain.ch" .
```

**Remove Arklens Proprietary Code:**

- [ ] Customer template is fine (customer has license to use)
- [ ] Custom Arklens platform code should NOT be in customer repo
- [ ] Internal tools or scripts should NOT be included

**Verify .env.example:**

- [ ] Create .env.example if not present
- [ ] Include only variable names, NO real values
- [ ] Document what each variable is for

```bash
# .env.example content:
# SITE_URL=https://www.your-domain.ch
# CONTACT_EMAIL=your-email@example.com
# (Add environment variables if any used)
```

#### ☐ 2.3 Clean Build Files

```bash
# Remove build artifacts
rm -rf dist/
rm -rf .astro/
rm -rf node_modules/

# Remove development files
rm -rf .vercel/ .netlify/ .wrangler/

# Keep .gitignore (useful for customer)
```

#### ☐ 2.4 Update Documentation

**README.md:**

```markdown
# [Customer Business Name] Website

This is the source code for your website, provided under your Source Code Buyout / Migration Package agreement.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open http://localhost:4321

### Build for Production

\`\`\`bash
npm run build
\`\`\`

Output will be in `dist/` folder.

### Deploy

See DEPLOYMENT_GUIDE.md for detailed deployment instructions for:
- Cloudflare Pages
- Netlify
- Vercel
- Self-hosted servers
- Other platforms

## Project Structure

- `src/pages/` - Website pages
- `src/components/` - Reusable UI components
- `src/data/` - Content (business info, services, hours, etc.)
- `public/` - Static assets (images, favicon, etc.)

## Updating Content

Edit JSON files in `src/data/`:
- `business.json` - Business name, tagline, logo, brand color
- `services.json` - Services/products you offer
- `hours.json` - Business hours and schedules
- `contact.json` - Contact information and location
- `social.json` - Social media links
- `team.json` - Team member profiles
- `cta.json` - Call-to-action buttons and banners

After editing, run `npm run build` to see changes.

## Support

This export was provided by Arklens as part of your service agreement.

For questions about your website:
- Review the included documentation
- Contact your web developer
- Or reach out to Arklens at support@arklens.ch (during transition period)

## License

Website code: Provided under your signed Source Code Buyout / Migration Package agreement (see that agreement for the rights granted)
Your content: You own all rights
Images: You own all rights to images you provided

Third-party dependencies: See package.json for individual licenses
```

**DEPLOYMENT_GUIDE.md:**

Create comprehensive guide covering:
- Cloudflare Pages (recommended, free tier available)
- Netlify (alternative)
- Vercel (alternative)
- Self-hosted (Apache, Nginx)
- DNS configuration steps
- SSL certificate setup

*See Deployment Guide Template section below*

**DNS_CONFIGURATION.md:**

```markdown
# DNS Configuration Guide

## Your Current DNS Settings (Arklens Hosting)

CNAME  www  →  customer-name.pages.dev

## Configuring DNS for New Hosting

Your new hosting provider will give you DNS settings. They typically look like:

**Option 1: CNAME (most common)**
\`\`\`
CNAME  www  →  your-new-host.provider.com
\`\`\`

**Option 2: A Record**
\`\`\`
A  @  →  123.456.789.012 (IP address)
\`\`\`

## Steps to Update DNS

### If You Manage DNS

1. Log in to your domain registrar (where you bought your domain)
2. Find "DNS Management" or "DNS Settings"
3. Update the CNAME or A record with settings from new host
4. Save changes
5. Wait 5-60 minutes for propagation

### If Arklens Manages DNS

We'll assist with:
- Providing current DNS settings
- Transferring control back to you
- OR updating DNS to point to your new hosting

Contact us at support@arklens.ch for DNS assistance.

## Verifying DNS Changes

After updating DNS:

**Command line:**
\`\`\`bash
dig www.your-domain.ch
\`\`\`

**Online tools:**
- https://dnschecker.org
- https://whatsmydns.net

Your domain should now point to new hosting!

## SSL Certificate

Most modern hosts (Cloudflare, Netlify, Vercel) provide free automatic SSL certificates. After DNS propagates, SSL typically activates within 10-30 minutes.

If using self-hosted:
- Use Let's Encrypt (free): https://letsencrypt.org
- Your hosting provider may offer SSL
- Contact your developer for assistance
```

#### ☐ 2.5 Create Checksums

```bash
# Generate checksums for integrity verification
cd exports/customer-name-YYYY-MM-DD

# Create checksums file
find customer-name-source -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  -exec sha256sum {} \; > checksums.txt

# Verify checksums
sha256sum -c checksums.txt
```

---

### Step 3: Static Build Preparation (Migration Package only)

#### ☐ 3.1 Fresh Build

```bash
cd customer-name-source

# Install dependencies
npm install

# Run production build
npm run build

# Verify build succeeded
ls -la dist/

# Test build locally
npm run preview
# Open http://localhost:4321 and verify all pages work
```

#### ☐ 3.2 Build Verification

**Check all pages present:**
- [ ] index.html (homepage)
- [ ] All content pages
- [ ] Legal pages
- [ ] 404.html (if applicable)

**Check assets compiled:**
- [ ] CSS files in _astro/
- [ ] JavaScript files in _astro/
- [ ] Images optimized and present

**Check for errors:**
```bash
# Look for broken references
grep -r "undefined" dist/
grep -r "null" dist/
```

**Test critical functionality:**
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Images display
- [ ] Forms function (if applicable)
- [ ] Responsive on mobile
- [ ] No console errors

#### ☐ 3.3 Copy Build

```bash
# Copy dist folder to export
cp -r dist/ ../customer-name-static/dist/

cd ../customer-name-static
```

#### ☐ 3.4 Add Deployment Instructions

Create `DEPLOYMENT.md`:

```markdown
# Static Site Deployment

This folder contains your pre-built website ready for deployment.

## What's Inside

- `dist/` folder with all website files
- HTML, CSS, JavaScript, and images
- Ready to deploy to any static hosting

## Quick Deploy Options

### Option 1: Cloudflare Pages (Recommended)

1. Sign up at https://pages.cloudflare.com (free)
2. Create new project
3. Upload the `dist/` folder
4. Connect your domain in settings
5. SSL automatically configured

### Option 2: Netlify

1. Sign up at https://netlify.com (free)
2. Drag & drop the `dist/` folder
3. Connect your domain
4. SSL automatically configured

### Option 3: Vercel

1. Sign up at https://vercel.com (free)
2. Import the `dist/` folder
3. Connect your domain
4. SSL automatically configured

### Option 4: Self-Hosted Server

Upload `dist/` contents to your web server:

**Using FTP/SFTP:**
Upload all files from `dist/` to your web root (usually `public_html/` or `www/`)

**Using SSH:**
\`\`\`bash
scp -r dist/* user@yourserver.com:/var/www/html/
\`\`\`

**Server Requirements:**
- Any web server (Apache, Nginx, IIS)
- No PHP, database, or special software needed
- Just serve static files

## Updating Content

To update content, you'll need the source code package.

Static build is a snapshot - changes require rebuilding from source.

## Need Help?

- Contact your new hosting provider's support
- Consult with a web developer
- Review full documentation in source code package
```

---

### Step 4: Package Creation (Migration Package only; the Customer Asset Package is archived in Step 1B.5)

#### ☐ 4.1 Archive Source Code

```bash
cd exports/customer-name-YYYY-MM-DD

# Create ZIP archive
zip -r customer-name-source-YYYY-MM-DD.zip customer-name-source/ \
  -x "*/node_modules/*" \
  -x "*/.git/*" \
  -x "*/.DS_Store"

# Verify archive
unzip -l customer-name-source-YYYY-MM-DD.zip | head -20

# Check size
du -h customer-name-source-YYYY-MM-DD.zip
```

#### ☐ 4.2 Archive Static Build

```bash
# Create ZIP archive
zip -r customer-name-static-YYYY-MM-DD.zip customer-name-static/

# Verify archive
unzip -l customer-name-static-YYYY-MM-DD.zip | head -20

# Check size
du -h customer-name-static-YYYY-MM-DD.zip
```

#### ☐ 4.3 Generate Final Checksums

```bash
# Checksum for source package
sha256sum customer-name-source-YYYY-MM-DD.zip > package-checksums.txt

# Checksum for static package
sha256sum customer-name-static-YYYY-MM-DD.zip >> package-checksums.txt

# Display checksums
cat package-checksums.txt
```

---

### Step 5: Quality Assurance

#### ☐ 5.1 Security Final Check

**Two-person verification recommended:**

**Reviewer 1: Security Audit**
- [ ] Unzip packages to temp location
- [ ] Search for "arklens" internal references: `grep -ri "arklens_internal"`
- [ ] Search for "cloudflare" API keys: `grep -ri "cloudflare_api"`
- [ ] Search for other customer names: `grep -ri "other-customer"`
- [ ] Verify no real credentials in .env.example or code
- [ ] Customer Asset Package: confirm it contains no source code, templates, components or compiled build
- [ ] Migration Package: confirm contents match the scope of the signed agreement
- [ ] Confirm only customer-owned content

**Reviewer 2: Completeness Check**
- [ ] Customer Asset Package: all content, media, data, URL list and DNS records present
- [ ] Migration Package only: extract packages
- [ ] Run `npm install && npm run build` on source package
- [ ] Verify build succeeds
- [ ] Check all pages present in static build
- [ ] Verify all images load
- [ ] Test local preview works
- [ ] Confirm documentation complete and accurate

**Sign-off:**
```
Security Review: [Name] [Date] ✓
Completeness Review: [Name] [Date] ✓
```

#### ☐ 5.2 Documentation Completeness

**Verify included:**
- [ ] README.md with quick start
- [ ] DEPLOYMENT_GUIDE.md with platform instructions
- [ ] DNS_CONFIGURATION.md with DNS steps
- [ ] CHANGELOG.md with customer's update history
- [ ] package.json with all dependencies listed
- [ ] .env.example (if environment variables used)
- [ ] Troubleshooting guide or tips

---

### Step 6: Delivery Preparation

#### ☐ 6.1 Upload to Secure Storage

**For packages >100 MB:**

Use secure file transfer service:
- [ ] Upload to internal secure file server OR
- [ ] Use approved third-party secure transfer (e.g., Swiss Transfer, Tresorit)
- [ ] Set expiration: 30 days
- [ ] Require password (send separately)
- [ ] Log download access

**For packages <100 MB:**

- [ ] Can send via encrypted email
- [ ] Use PGP or similar encryption
- [ ] Include checksums in email body

#### ☐ 6.2 Prepare Delivery Email

**Template:**

```
Subject: [Customer Name] Your Customer Asset Package - Ready

Dear [Customer Name],

Your Customer Asset Package is ready for download. It contains everything that belongs to your business.

## Download Link

**Customer Asset Package**
Link: [secure download URL]
Size: [X] MB
SHA256: [checksum]
Expires: [date - 30 days from now]

[ONLY IF A MIGRATION PACKAGE WAS AGREED - agreement ref: ______]
**Migration Package** ([source code / static build], as agreed)
Link: [secure download URL]
Size: [X] MB
SHA256: [checksum]
Expires: [date - 30 days from now]

## Verification

After downloading, verify package integrity:

**Mac/Linux:**
\`\`\`bash
sha256sum customer-name-assets-YYYY-MM-DD.zip
\`\`\`

**Windows (PowerShell):**
\`\`\`powershell
Get-FileHash customer-name-assets-YYYY-MM-DD.zip -Algorithm SHA256
\`\`\`

Checksums should match the values above.

## What's Included

✓ All your business text and content
✓ Your logos, photos and images
✓ Business and customer data we held for you
✓ A list of your page addresses (to keep links and search visibility)
✓ Your current DNS settings and DNS instructions

Arklens source code, templates and reusable components are not part of this package. If you would like to keep running the existing website as it is, we can discuss a Source Code Buyout or Migration Package.

## Next Steps

1. **Download and save** the package in a secure location
2. **Verify the checksum**
3. **Share it with your new provider or developer**
4. **Update DNS** when your new site is ready (see the DNS guide)
5. **Schedule a support session** if needed: reply to this email

## Support Available

You have up to [1-2 hours] of handover support included:
- DNS configuration help
- Answering your new provider's questions
- Questions about the package

**Support available until:** [date]
**Contact:** support@arklens.ch or reply to this email

## Important Notes

- **Backup:** Save these files securely
- **Domain:** You control your domain - see the DNS guide for configuration
- **Timeline:** Downloads expire in 30 days (re-request if needed)

Questions? We're here to help.

Best regards,
[Your name]
Arklens Technical Team
```

#### ☐ 6.3 Internal Documentation

**Record in customer handover folder:**

```
handovers/customer-name-YYYY-MM-DD/export-delivery/
├── export-log.md                  # What was exported, when, by whom
├── security-audit-checklist.pdf   # Completed security checklist
├── qa-sign-off.pdf                # Quality assurance sign-off
├── package-checksums.txt          # Checksums file
├── delivery-email.txt             # Copy of email sent
├── migration-agreement.pdf        # ONLY if a Migration Package was agreed
└── local-backups/                 # Backup copies (30-day retention)
    ├── customer-name-assets-YYYY-MM-DD.zip
    └── [migration package files, if agreed]
```

**Export Log Template:**

```markdown
# Export Package Log

**Customer:** [Business Name]
**Domain:** [domain.ch]
**Export ID:** EXP-YYYY-MM-###
**Date:** [Date and time]

## Packages Created

### Customer Asset Package (standard)
- **Filename:** customer-name-assets-YYYY-MM-DD.zip
- **Size:** [X] MB
- **Checksum:** [SHA256]
- **Contents:** Business content, customer-owned media, customer data, URL list, DNS records
- **Prepared by:** [Team member name]
- **Verified by:** [Reviewer name]

### Migration Package (only if agreed)
- **Agreement reference:** [ref or "not applicable"]
- **Scope agreed:** [source code / static build / licence expansion / IP buyout]

#### Source Code Package
- **Filename:** customer-name-source-YYYY-MM-DD.zip
- **Size:** [X] MB
- **Checksum:** [SHA256]
- **Contents:** Astro source code, components, data files, images
- **Prepared by:** [Team member name]
- **Verified by:** [Reviewer name]

#### Static Build Package
- **Filename:** customer-name-static-YYYY-MM-DD.zip
- **Size:** [X] MB
- **Checksum:** [SHA256]
- **Contents:** Built HTML/CSS/JS, optimized images
- **Prepared by:** [Team member name]
- **Verified by:** [Reviewer name]

## Security Audit

- [x] No Arklens internal credentials
- [x] No other customer data
- [x] Customer Asset Package contains no Arklens source code, templates, components or compiled build
- [x] Any Migration Package matches the signed agreement scope
- [x] .env.example contains no real values
- [x] Only customer-owned content included

**Audited by:** [Name] on [Date]

## Quality Assurance

- [x] Customer Asset Package complete (content, media, data, URLs, DNS)
- [x] Migration Package only: build tested, all pages present
- [x] All images load correctly
- [x] Documentation complete
- [x] Deployment guides accurate
- [x] Checksums verified

**QA by:** [Name] on [Date]

## Delivery

- **Method:** [Secure file transfer / Encrypted email]
- **Sent to:** [customer email]
- **Sent by:** [team member]
- **Sent on:** [Date and time]
- **Expiration:** [30 days from delivery]

## Notes

[Any special considerations, customer-specific instructions, known issues, etc.]
```

---

## Deployment Guide Template (Migration Package only)

Create `DEPLOYMENT_GUIDE.md` for inclusion in a signed Migration Package. For a Customer Asset Package, include only DNS_CONFIGURATION.md and the README describing the package contents:

```markdown
# Website Deployment Guide

This guide covers deploying your website to various hosting platforms.

## Table of Contents

1. [Cloudflare Pages](#cloudflare-pages) (Recommended)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [Self-Hosted Server](#self-hosted)
5. [DNS Configuration](#dns-configuration)
6. [SSL Certificates](#ssl-certificates)

---

## Cloudflare Pages (Recommended)

**Why Cloudflare Pages:**
- Free tier (unlimited bandwidth!)
- Automatic SSL
- Global CDN
- Simple deployment
- Same platform Arklens used

### Option A: Deploy Static Build (Easiest)

1. **Sign up:**
   - Go to https://pages.cloudflare.com
   - Create free account

2. **Create project:**
   - Click "Create a project"
   - Choose "Upload assets"
   - Upload contents of `dist/` folder (from static package)

3. **Configure domain:**
   - In project settings, click "Custom domains"
   - Add your domain: www.your-domain.ch
   - Follow DNS instructions (see DNS Configuration section)

4. **SSL:**
   - Automatic! Cloudflare provisions SSL within minutes

5. **Done!**
   Your site is live at your custom domain.

### Option B: Deploy from Source (More Control)

1. **Prerequisites:**
   - Git repository (GitHub, GitLab, or Bitbucket)
   - Source code package uploaded to repository

2. **Sign up:**
   - https://pages.cloudflare.com
   - Create free account

3. **Connect repository:**
   - Click "Create a project"
   - Choose "Connect to Git"
   - Authorize Cloudflare to access your repo

4. **Configure build:**
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18

5. **Deploy:**
   - Click "Save and Deploy"
   - First build takes 2-5 minutes
   - Subsequent builds automatic on git push

6. **Custom domain:**
   - Same as Option A step 3

**Updates:**
- Option A: Re-upload `dist/` contents to update
- Option B: Push to Git repository (automatic deployment)

---

## Netlify

**Why Netlify:**
- Free tier available
- Drag-and-drop deployment
- Automatic SSL
- Simple interface

### Deployment Steps

1. **Sign up:**
   - https://netlify.com
   - Create free account

2. **Deploy:**
   - Drag `dist/` folder onto Netlify dashboard
   - OR connect Git repository (similar to Cloudflare Pages)

3. **Custom domain:**
   - Settings → Domain management
   - Add custom domain: www.your-domain.ch
   - Follow DNS instructions

4. **SSL:**
   - Automatic with Let's Encrypt

---

## Vercel

**Why Vercel:**
- Free tier available
- Excellent performance
- Automatic SSL
- Easy Git integration

### Deployment Steps

1. **Sign up:**
   - https://vercel.com
   - Create free account

2. **Deploy:**
   - Import Git repository
   - OR use Vercel CLI: `vercel --prod`

3. **Configure:**
   - Framework: Astro
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Custom domain:**
   - Project settings → Domains
   - Add your domain
   - Follow DNS instructions

---

## Self-Hosted Server

**Prerequisites:**
- Web server (Apache, Nginx, IIS, etc.)
- SSH access or FTP access
- Basic server administration knowledge

### Using Static Build (Easiest for Self-Hosting)

1. **Upload files:**
   - Extract `dist/` folder from static package
   - Upload via SFTP/FTP to web root:
     - Typically: `/var/www/html/` or `public_html/`
   
   **Example using scp:**
   \`\`\`bash
   scp -r dist/* user@yourserver.com:/var/www/html/
   \`\`\`

2. **Web server configuration:**
   
   **Apache (.htaccess):**
   \`\`\`apache
   # Redirect to HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # Handle client-side routing
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   \`\`\`
   
   **Nginx (nginx.conf):**
   \`\`\`nginx
   server {
       listen 80;
       server_name www.your-domain.ch;
       
       # Redirect to HTTPS
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       server_name www.your-domain.ch;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   \`\`\`

3. **SSL Certificate:**
   - Use Let's Encrypt (free): https://letsencrypt.org
   - Or use your hosting provider's SSL
   
   **Let's Encrypt with Certbot:**
   \`\`\`bash
   sudo certbot --nginx -d www.your-domain.ch
   \`\`\`

4. **Test:**
   - Visit https://www.your-domain.ch
   - Verify all pages load
   - Check SSL certificate valid

---

## DNS Configuration

After deploying to your chosen platform, configure DNS.

### What You'll Need

Your hosting provider gives you either:

**CNAME record:** (most common)
\`\`\`
CNAME  www  →  your-site.pages.dev  (Cloudflare Pages)
CNAME  www  →  your-site.netlify.app  (Netlify)
CNAME  www  →  your-site.vercel.app  (Vercel)
\`\`\`

**A record:** (for self-hosted)
\`\`\`
A  @  →  123.456.789.012  (your server IP)
\`\`\`

### DNS Update Steps

1. **Log in to domain registrar**
   - Where you bought your domain (Namecheap, GoDaddy, Gandi, etc.)

2. **Find DNS settings**
   - Look for: "DNS Management", "DNS Settings", "Nameservers", or "Advanced DNS"

3. **Update records**
   - Delete old CNAME for `www` (if exists)
   - Add new CNAME or A record (from your host)
   - TTL: 3600 (or auto)

4. **Save changes**

5. **Wait for propagation**
   - Usually 5-60 minutes
   - Sometimes up to 24 hours

### Verify DNS

**Command line:**
\`\`\`bash
dig www.your-domain.ch
nslookup www.your-domain.ch
\`\`\`

**Online tools:**
- https://dnschecker.org
- https://whatsmydns.net

### Apex Domain (yourdomain.ch without www)

**Option 1: Redirect to www (recommended)**
Most registrars offer URL forwarding:
- Redirect `yourdomain.ch` → `www.yourdomain.ch`

**Option 2: CNAME flattening**
Some providers (Cloudflare) support CNAME at apex:
\`\`\`
CNAME  @  →  your-site.pages.dev
\`\`\`

**Option 3: A record**
Point apex to same server as www (self-hosted only)

---

## SSL Certificates

### Cloudflare Pages, Netlify, Vercel
✅ **Automatic!** SSL provisioned within 10-30 minutes after DNS propagates.

### Self-Hosted

**Let's Encrypt (Free & Recommended):**

1. **Install Certbot:**
   \`\`\`bash
   # Ubuntu/Debian
   sudo apt install certbot python3-certbot-nginx
   
   # CentOS/RHEL
   sudo yum install certbot python3-certbot-nginx
   \`\`\`

2. **Get certificate:**
   \`\`\`bash
   sudo certbot --nginx -d www.your-domain.ch
   \`\`\`

3. **Auto-renewal:**
   Certbot sets up automatic renewal (certificates expire every 90 days)
   
   Test renewal:
   \`\`\`bash
   sudo certbot renew --dry-run
   \`\`\`

**Or use your hosting provider's SSL** (often included)

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Run `npm install` to install dependencies
- Check Node.js version (need 18+)

**Error: "Port already in use"**
- Another process using port 4321
- Kill process or use different port

### Site Not Loading

**DNS not propagating:**
- Wait longer (up to 24 hours)
- Check DNS with `dig www.your-domain.ch`
- Verify correct DNS records at registrar

**SSL errors:**
- Wait for SSL to provision (10-30 min)
- Clear browser cache
- Check hosting platform's SSL status

### Images Not Loading

**Incorrect paths:**
- Images should be in `public/images/`
- Referenced in code as `/images/filename.jpg`

**Missing files:**
- Verify images in export package
- Re-upload missing images

---

## Support

### During Transition Period

Arklens support available at support@arklens.ch until [transition date]

### After Transition

- **Hosting support:** Contact your hosting provider
- **Developer help:** Hire a web developer familiar with:
  - Astro (if using source code)
  - Static site hosting
  - DNS configuration

### Useful Resources

- **Astro Docs:** https://docs.astro.build
- **Cloudflare Pages:** https://developers.cloudflare.com/pages
- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **Let's Encrypt:** https://letsencrypt.org/getting-started
```

---

## Data Retention Policy

### Export Package Retention

**Duration:** 30 days after delivery

**Storage:**
- [ ] Keep secure backups of delivered export packages
- [ ] Store in encrypted, access-controlled location
- [ ] Log access to export packages

**After 30 days:**
- [ ] Delete export package copies from transfer service
- [ ] Archive one copy internally (for disputes/recovery)
- [ ] Archive retention: 1 year
- [ ] After 1 year: Permanent deletion (unless legal hold)

### Customer Repository Retention

**After handover:**
- [ ] Repository archived (read-only)
- [ ] Kept for 90 days minimum
- [ ] After 90 days: Deletion (unless customer returns or dispute)

---

## Security Considerations

### What MUST Be Removed

❌ **Never include:**
- Arklens Cloudflare API tokens
- Arklens Wrangler credentials
- Database passwords (if any)
- API keys for Arklens services
- Other customers' data or code
- Arklens proprietary platform code
- Internal tools or admin interfaces

### What SHOULD Be Included

✅ **Always include (Customer Asset Package):**
- Customer's business content and text
- Customer-provided logos, images and media
- Business and customer data held by Arklens
- URL list and DNS records
- Documentation for the new provider

✅ **Only with a signed Migration Package:**
- Website source code and/or compiled static build, as defined in the agreement
- Open-source dependencies list (package.json)
- Configuration files (sanitized)

### Audit Trail

**Document:**
- Who prepared export
- Who reviewed export
- What was included/excluded
- Date and time
- Customer it was delivered to
- Checksums for verification

---

## Appendix: File Size Guidelines

### Typical Export Package Sizes

**Customer Asset Package:**
- Usually 5-40 MB, mostly images

**Source code package (Migration Package only):**
- Small site (5 pages, 10 images): 5-15 MB
- Medium site (10 pages, 30 images): 15-40 MB
- Large site (20+ pages, 100+ images): 40-100 MB

**Static build package:**
- Usually 30-50% smaller than source
- Optimized images reduce size significantly

### If Package Too Large (>100 MB)

- Use file compression (ZIP with high compression)
- Verify no large files accidentally included:
  - No `node_modules/` (should be excluded)
  - No `.git/` history (should be excluded)
  - No video files (unless intentional)
- Consider splitting into multiple archives if necessary
- Use secure large-file transfer service

---

## Export Package Checklist Summary

Use this quick checklist for every export:

### Pre-Export
- [ ] Customer identity verified
- [ ] Handover authorized
- [ ] Repository located and current

### Preparation
- [ ] Requester is the participating business (Terms 2.10)
- [ ] Scope confirmed: Customer Asset Package, plus Migration Package only if signed
- [ ] Customer content, media, data, URL list and DNS records collected
- [ ] Security audit completed
- [ ] Migration Package only: clean copy cloned, build tested

### Packaging
- [ ] Customer Asset Package archived
- [ ] Migration Package archived (only if signed, agreement ref recorded)
- [ ] Checksums generated
- [ ] QA review completed
- [ ] Two-person sign-off

### Delivery
- [ ] Uploaded to secure transfer
- [ ] Delivery email sent
- [ ] Internal documentation complete
- [ ] Backup copies retained

### Post-Delivery
- [ ] Customer confirms receipt
- [ ] Checksums verified by customer
- [ ] Support session scheduled (if needed)
- [ ] 30-day retention timer started

---

**Document Owner:** Arklens Technical Team  
**Last Reviewed:** October 4, 2026  
**Next Review:** December 26, 2026  
**Version:** 1.1.0
