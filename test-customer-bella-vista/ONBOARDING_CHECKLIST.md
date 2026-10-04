# Customer Onboarding Checklist

Complete guide for onboarding new customers to the Arklens Free Website Programme.

## Overview

**Estimated time:** 2-4 hours (depending on content readiness)  
**Team members needed:** 1 (technical team member)  
**Customer involvement:** Minimal (provide content, approve final site)

---

## Phase 1: Pre-Onboarding (Before Technical Setup)

### ☐ 1.1 Initial Customer Contact

- [ ] Customer submits interest via `/start` page
- [ ] Arklens team acknowledges receipt (within 24 hours)
- [ ] Schedule initial consultation call/meeting
- [ ] Explain Free Website Programme terms (see Terms of Use)
- [ ] Confirm customer owns or will purchase domain

**Documents to share:**
- Terms of Use
- Customer Ownership Guide
- Content collection form (see 1.2)

---

### ☐ 1.2 Content Collection

Send customer the content collection form. Required information:

**Business Information:**
- [ ] Business name
- [ ] Tagline/slogan
- [ ] Business description (2-3 paragraphs)
- [ ] Year founded (optional)
- [ ] Logo (SVG or PNG with transparency preferred)
- [ ] Brand color (hex code if known, or visual examples)
- [ ] Languages needed (EN, FR, DE, IT)

**Contact Details:**
- [ ] Primary email
- [ ] Primary phone number
- [ ] WhatsApp number (if different)
- [ ] Physical address (street, city, postal code)
- [ ] Google Maps link or coordinates (optional)
- [ ] Booking/reservation URL (if applicable)

**Business Hours:**
- [ ] Regular weekly schedule
- [ ] Timezone
- [ ] Known holiday closures
- [ ] Special notes about hours

**Services/Products:**
For each service:
- [ ] Service name
- [ ] Description
- [ ] Price or price range
- [ ] Image (high quality, min 800x600px)
- [ ] Category (if multiple service types)

**Social Media:**
- [ ] Facebook page URL
- [ ] Instagram profile URL
- [ ] TripAdvisor listing URL
- [ ] Google Maps/Google Business URL
- [ ] LinkedIn, Twitter, YouTube (if applicable)

**Team (Optional):**
- [ ] Show team section? (yes/no)
- [ ] For each member: Name, role, bio, photo, email

**Call-to-Action:**
- [ ] Primary CTA text and destination
- [ ] Secondary CTA text and destination (optional)
- [ ] Any promotional banners?

**Images:**
- [ ] Hero/header image (1920x1080px minimum)
- [ ] Service images (one per service)
- [ ] Team photos (if applicable, 400x400px square)
- [ ] Gallery images (optional)

---

### ☐ 1.3 Domain Verification

**Customer-Managed DNS (Default):**
- [ ] Confirm customer owns domain or plans to purchase
- [ ] Verify domain is not already in use
- [ ] Explain DNS setup process to customer
- [ ] Confirm customer can access domain registrar

**Arklens-Managed DNS (If Requested):**
- [ ] Customer requests Arklens DNS management
- [ ] Explain additional complexity (nameserver changes)
- [ ] Obtain domain registrar access details
- [ ] Schedule domain transfer timing

**Document:**
- Domain: ______________________
- Registrar: ____________________
- DNS Management: [ ] Customer [ ] Arklens
- Current Status: [ ] Owned [ ] To Purchase

---

### ☐ 1.4 Content Review & Approval

- [ ] Review all collected content for completeness
- [ ] Check image quality and formats
- [ ] Verify all required fields are filled
- [ ] Confirm language preferences
- [ ] Get customer approval to proceed with setup

---

## Phase 2: Technical Setup (Internal Arklens Team)

### ☐ 2.1 Repository Creation

```bash
# 1. Copy template to new customer directory
cp -r customer-template/ customers/[customer-name]/
cd customers/[customer-name]/

# 2. Initialize Git repository
git init
git add .
git commit -m "Initial setup from template"

# 3. Create remote repository (GitHub/GitLab)
# Follow your preferred Git hosting setup
```

**Naming convention:** Use customer business name, lowercase, hyphenated
- Example: `bella-vista-restaurant`
- Example: `alpine-wellness-spa`

- [ ] Repository created
- [ ] Initial commit made
- [ ] Remote repository configured

---

### ☐ 2.2 Data File Population

Fill in all JSON files in `src/data/`:

**business.json:**
- [ ] name
- [ ] tagline
- [ ] description
- [ ] logo path (after image upload)
- [ ] brandColor
- [ ] languages
- [ ] defaultLanguage
- [ ] founded (optional)
- [ ] email
- [ ] phone

**services.json:**
- [ ] Add each service with complete details
- [ ] Set appropriate categories
- [ ] Assign display order
- [ ] Link to service images

**hours.json:**
- [ ] Set regular weekly hours
- [ ] Add special hours/holidays
- [ ] Set timezone
- [ ] Add any notes

**contact.json:**
- [ ] email
- [ ] phone
- [ ] whatsapp (if applicable)
- [ ] address (all fields)
- [ ] coordinates (if available)
- [ ] bookingUrl (if applicable)

**social.json:**
- [ ] Add all provided social media URLs
- [ ] Verify URL formats

**team.json:**
- [ ] Set showTeam (true/false)
- [ ] Add team members (if applicable)

**cta.json:**
- [ ] Configure primary CTA
- [ ] Configure secondary CTA (if needed)
- [ ] Set up banner (if needed)

---

### ☐ 2.3 Image Processing

```bash
# Create image directories if needed
mkdir -p public/images/{hero,services,team,gallery}
```

**For each image:**
- [ ] Optimize file size (use ImageOptim, Squoosh, or similar)
- [ ] Convert to WebP if possible (with JPG/PNG fallback)
- [ ] Resize to appropriate dimensions
- [ ] Rename with descriptive, URL-friendly names
- [ ] Place in correct directory

**Image checklist:**
- [ ] Logo → `public/images/logo.[ext]`
- [ ] Hero image → `public/images/hero/[name].jpg`
- [ ] Service images → `public/images/services/[service-name].jpg`
- [ ] Team photos → `public/images/team/[member-name].jpg`
- [ ] Update JSON files with correct image paths

---

### ☐ 2.4 Configuration Updates

**astro.config.mjs:**
```javascript
export default defineConfig({
  // ... other config
  site: 'https://www.customer-domain.ch', // ← Update this
});
```

**package.json:**
```json
{
  "name": "customer-name-website", // ← Update this
}
```

**README.md (optional):**
- [ ] Update customer-specific details
- [ ] Add deployment history section

- [ ] Configuration files updated
- [ ] Customer-specific details set

---

### ☐ 2.5 Data Validation

```bash
# Install dependencies
npm install

# Validate all data files
npm run validate
```

- [ ] All dependencies installed
- [ ] Data validation passes
- [ ] No schema errors

**If validation fails:**
1. Read error messages carefully
2. Fix data format issues
3. Re-run validation
4. Repeat until all files valid

---

### ☐ 2.6 Local Testing

```bash
# Start development server
npm run dev
```

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Images display correctly
- [ ] Business hours display correctly
- [ ] Contact information correct
- [ ] Services display properly
- [ ] CTAs work correctly
- [ ] Responsive on mobile (test in DevTools)

**Test checklist:**
- [ ] Homepage
- [ ] Services page
- [ ] Contact page
- [ ] About page (if applicable)
- [ ] Language switcher (if bilingual)

---

### ☐ 2.7 Build & Pre-Deploy Check

```bash
# Build for production
npm run build
```

- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No broken links
- [ ] All images found

```bash
# Preview production build
npm run preview
```

- [ ] Preview works correctly
- [ ] Final visual check
- [ ] Test all interactive elements

---

## Phase 3: Cloudflare Setup

### ☐ 3.1 Create Cloudflare Pages Project

```bash
# Login to Cloudflare
wrangler login

# Create new project
wrangler pages project create [customer-name]
```

**Project naming:**
- Use same name as repository
- Lowercase, hyphenated
- Example: `bella-vista-restaurant`

- [ ] Cloudflare Pages project created
- [ ] Project name documented: __________________

---

### ☐ 3.2 Initial Deployment

```bash
# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=[customer-name] --branch=main
```

- [ ] Deployment successful
- [ ] Preview URL works: _________________________.pages.dev
- [ ] Site loads correctly on preview URL
- [ ] All content displays properly

**If deployment fails:**
1. Check wrangler authentication
2. Verify project name
3. Check build output (`dist/` directory exists)
4. Review error messages

---

### ☐ 3.3 Configure Cloudflare Pages Settings

In Cloudflare Dashboard → Pages → [customer-name]:

**Settings:**
- [ ] Build settings: Not needed (we deploy pre-built)
- [ ] Environment variables: None needed (unless specific requirements)
- [ ] Build cache: Enabled (default)

**Analytics (Optional):**
- [ ] Enable Web Analytics (free tier)
- [ ] Configure custom events (if needed)

---

## Phase 4: DNS & Domain Setup

### ☐ 4.1 Customer-Managed DNS (Default Path)

**Instructions for customer:**

Send customer email with these instructions:

```
Subject: DNS Setup for Your Arklens Website

Hello [Customer Name],

Your website is ready! To make it live at www.your-domain.ch, please add this DNS record in your domain registrar's control panel:

Type: CNAME
Name: www
Value: [customer-name].pages.dev
TTL: Auto or 3600

Steps:
1. Log in to your domain registrar (where you bought your domain)
2. Find "DNS Settings" or "DNS Management"
3. Add the CNAME record above
4. Save changes

DNS changes can take 5-60 minutes to propagate.

Once DNS is set up, reply to this email and we'll complete the final connection.

Need help? We're here to assist!

Best regards,
Arklens Team
```

- [ ] Instructions sent to customer
- [ ] Awaiting customer DNS setup confirmation

**Once customer confirms DNS is set:**

---

### ☐ 4.2 Add Custom Domain in Cloudflare

In Cloudflare Dashboard → Pages → [customer-name] → Custom domains:

- [ ] Click "Set up a custom domain"
- [ ] Enter: `www.customer-domain.ch`
- [ ] Cloudflare verifies DNS automatically
- [ ] SSL certificate issued (5-10 minutes)
- [ ] Custom domain status: Active

**Test custom domain:**
- [ ] https://www.customer-domain.ch loads
- [ ] SSL certificate valid (green padlock)
- [ ] All pages accessible
- [ ] No mixed content warnings

---

### ☐ 4.3 Apex Domain Redirect (Optional)

If customer wants `customer-domain.ch` → `www.customer-domain.ch`:

**Customer-managed DNS:**
- [ ] Instruct customer to add redirect in registrar
- [ ] Or use CNAME flattening if available

**Arklens-managed DNS:**
- [ ] Add page rule in Cloudflare
- [ ] Or set up redirect rule

---

### ☐ 4.4 Arklens-Managed DNS (Alternative Path)

**If customer transferred domain to Arklens Cloudflare:**

- [ ] Domain added to Cloudflare account
- [ ] Nameservers updated at registrar
- [ ] DNS propagated (24-48 hours)
- [ ] DNS records configured:
  ```
  CNAME   www    [customer-name].pages.dev
  CNAME   @      [customer-name].pages.dev (proxied)
  ```
- [ ] Custom domains added to Pages project
- [ ] SSL certificates issued
- [ ] Both apex and www work correctly

---

## Phase 5: Customer Delivery

### ☐ 5.1 Final Quality Check

- [ ] Full site walkthrough on production domain
- [ ] Test all links and buttons
- [ ] Verify contact information
- [ ] Check business hours display
- [ ] Test contact form (if applicable)
- [ ] Verify images load correctly
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Check page load speed
- [ ] Verify SSL certificate
- [ ] Test language switcher (if bilingual)

---

### ☐ 5.2 Customer Review & Approval

- [ ] Send preview link to customer
- [ ] Request customer review
- [ ] Document any change requests
- [ ] Make requested changes
- [ ] Re-deploy if changes made
- [ ] Get final customer approval

---

### ☐ 5.3 Documentation

**Create customer folder with:**

- [ ] Customer information sheet
  - Business name
  - Domain
  - Cloudflare project name
  - Repository location
  - Contact person and email
  - Onboarding date

- [ ] Initial CHANGELOG entry
  - [ ] Add date and "Initial website launch" entry

- [ ] Technical details
  - [ ] Languages enabled
  - [ ] Features enabled (team section, booking, etc.)
  - [ ] Special configurations

---

### ☐ 5.4 Handover Communication

Send customer welcome email:

```
Subject: Welcome to Arklens - Your Website is Live! 🎉

Hello [Customer Name],

Congratulations! Your website is now live at https://www.your-domain.ch

What's Next:

UPDATES
To update your website content (hours, services, prices, etc.), simply email us at updates@arklens.ch with your changes. We typically process updates within 1-2 business days.

YOUR WEBSITE INCLUDES
✅ Professional, mobile-friendly design
✅ Your business information and services
✅ Contact details and location
✅ [Add other features: team profiles, booking system, etc.]

IMPORTANT DOCUMENTS
- Customer Ownership Guide: [link]
- Terms of Use: [link]

SUPPORT
Questions? Email us at support@arklens.ch or reply to this message.

Thank you for choosing Arklens!

Best regards,
The Arklens Team
```

- [ ] Welcome email sent
- [ ] Customer confirms receipt
- [ ] Customer has all necessary documentation

---

### ☐ 5.5 Internal Handoff

**Update internal tracking:**

- [ ] Add customer to active customers list
- [ ] Add to monitoring/analytics dashboard
- [ ] Schedule 30-day check-in
- [ ] Add to support system
- [ ] Update capacity planning (for Free Website Programme limits)

**Team notification:**

- [ ] Notify team of new customer launch
- [ ] Share customer details in team channel
- [ ] Assign ongoing support contact

---

## Phase 6: Post-Launch (Within 30 Days)

### ☐ 6.1 Monitoring

- [ ] Week 1: Check site daily for issues
- [ ] Week 2-4: Check site every 2-3 days
- [ ] Monitor Cloudflare analytics
- [ ] Check for any customer-reported issues
- [ ] Verify SSL certificate renewal (automatic, but confirm)

---

### ☐ 6.2 30-Day Check-In

- [ ] Email customer for feedback
- [ ] Ask about any desired changes
- [ ] Offer additional features (if applicable)
- [ ] Check customer satisfaction
- [ ] Document feedback

**Sample check-in email:**

```
Subject: How's Your New Website Working?

Hello [Customer Name],

It's been a month since we launched your website! We'd love to hear how it's working for you.

Quick Check:
- Is everything displaying correctly?
- Any content updates needed?
- Questions about managing your site?
- Features you'd like to add?

We're here to help! Just reply to this email.

Best regards,
Arklens Team
```

---

## Troubleshooting Common Issues

### Build Fails

**Symptoms:** `npm run build` fails  
**Solutions:**
- [ ] Run `npm run validate` to check data files
- [ ] Check for TypeScript errors: `npm run astro check`
- [ ] Verify all image paths exist
- [ ] Check for missing dependencies: `rm -rf node_modules && npm install`

### Deployment Fails

**Symptoms:** `wrangler pages deploy` fails  
**Solutions:**
- [ ] Verify Wrangler authentication: `wrangler whoami`
- [ ] Check project exists: `wrangler pages project list`
- [ ] Verify `dist/` directory exists
- [ ] Try re-building: `npm run build`

### Domain Not Working

**Symptoms:** Custom domain doesn't load  
**Solutions:**
- [ ] Check DNS propagation: `dig www.customer-domain.ch`
- [ ] Verify CNAME points to correct `.pages.dev` URL
- [ ] Wait 5-60 minutes for DNS propagation
- [ ] Check Cloudflare Pages custom domain status
- [ ] Verify SSL certificate issued

### Images Not Loading

**Symptoms:** Broken image placeholders  
**Solutions:**
- [ ] Verify image paths in JSON files match actual files
- [ ] Check images are in `public/images/` directory
- [ ] Ensure paths start with `/images/` not `public/images/`
- [ ] Re-build and re-deploy
- [ ] Check browser console for 404 errors

---

## Time Estimates

**By phase:**

- Phase 1 (Pre-Onboarding): 30-60 minutes
- Phase 2 (Technical Setup): 1-2 hours
- Phase 3 (Cloudflare Setup): 15-30 minutes
- Phase 4 (DNS & Domain): 15-30 minutes + waiting time
- Phase 5 (Customer Delivery): 30-60 minutes
- Phase 6 (Post-Launch): Ongoing

**Total active time:** 2-4 hours  
**Total elapsed time:** 1-3 days (including customer responses and DNS propagation)

---

## Success Criteria

Onboarding is complete when:

- ✅ Website live on customer's custom domain
- ✅ SSL certificate active and valid
- ✅ All customer content displayed correctly
- ✅ Customer has approved final site
- ✅ Customer has received all documentation
- ✅ Internal documentation complete
- ✅ Monitoring and support established

---

**Checklist Version:** 1.0.0  
**Last Updated:** 2026-09-26  
**Maintained by:** Arklens Team

---

## Appendix: Quick Reference

### Essential Commands

```bash
# Setup
npm install
npm run validate

# Development
npm run dev

# Build & Deploy
npm run build
npm run preview
wrangler pages deploy dist --project-name=[name] --branch=main

# Validation
npm run astro check
npm run validate
```

### Essential Links

- Customer Template: `customer-template/`
- Operations Guide: `OPERATIONS_GUIDE.md`
- Technical Architecture: `TECHNICAL_ARCHITECTURE.md`
- Deployment Guide: `customer-template/DEPLOY.md`

### Support Contacts

- Technical issues: dev-team@arklens.ch
- Customer communication: support@arklens.ch
- Urgent issues: [escalation contact]
