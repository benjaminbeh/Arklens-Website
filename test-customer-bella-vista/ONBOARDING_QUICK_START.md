# Customer Onboarding Quick Start

One-page reference for experienced team members. See `ONBOARDING_CHECKLIST.md` for detailed procedures.

## Pre-Flight (Before Starting)

- [ ] Customer content received and complete
- [ ] Domain confirmed (owned or to be purchased)
- [ ] Customer approved Terms of Use

## Setup (30 minutes)

```bash
# 1. Create from template
cp -r customer-template/ customers/[customer-name]/
cd customers/[customer-name]/

# 2. Fill data files
# Edit all files in src/data/

# 3. Add images
# Optimize and place in public/images/

# 4. Update config
# Edit astro.config.mjs (site URL)

# 5. Validate & test
npm install
npm run validate
npm run dev
# → Check http://localhost:4321

# 6. Build
npm run build
npm run preview
```

## Deploy (15 minutes)

```bash
# 1. Create Cloudflare project
wrangler login
wrangler pages project create [customer-name]

# 2. Deploy
wrangler pages deploy dist --project-name=[customer-name] --branch=main

# 3. Verify
# → Check [customer-name].pages.dev
```

## DNS Setup (Customer does this)

**Send to customer:**

```
Add this DNS record:
Type: CNAME
Name: www
Value: [customer-name].pages.dev

Wait 5-60 minutes for DNS to propagate.
```

## Go Live (10 minutes)

1. Customer confirms DNS setup
2. Cloudflare Dashboard → Pages → [customer-name] → Custom domains
3. Add domain: `www.customer-domain.ch`
4. Wait for SSL (5-10 min)
5. Test: `https://www.customer-domain.ch`

## Customer Handover (15 minutes)

- [ ] Send welcome email with:
  - Live site URL
  - How to request updates (email updates@arklens.ch)
  - Customer Ownership Guide link
  - Support contact
- [ ] Document customer in tracking system
- [ ] Schedule 30-day check-in

## Troubleshooting

**Build fails?** → `npm run validate` → Fix data errors  
**Deploy fails?** → `wrangler whoami` → Re-login if needed  
**Domain not working?** → `dig www.domain.ch` → Check DNS  
**Images broken?** → Check paths in JSON match `public/images/`

---

**Total Time:** ~2 hours (excluding customer wait times)

**Need detailed steps?** See `ONBOARDING_CHECKLIST.md`
