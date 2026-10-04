# Architecture Documentation - Summary

**Date:** September 27, 2026  
**Status:** Production Architecture Defined

---

## Overview

The Arklens technical architecture has been fully documented to support scalable, customer-owned web hosting with clear separation between customer assets and Arklens-managed infrastructure.

---

## Core Principle

**The customer owns the business and domain. Arklens manages the infrastructure while providing the service.**

This principle guides all technical and operational decisions.

---

## Documentation Structure

### 1. TECHNICAL_ARCHITECTURE.md
**Audience:** Technical team, architects, developers  
**Purpose:** Complete technical architecture documentation

**Contents:**
- Ownership model (what customers own vs. what Arklens manages)
- Per-customer repository architecture
- Multi-tenant Cloudflare hosting strategy
- DNS and SSL management models
- Data storage and export architecture
- Security architecture
- Handover and migration procedures
- Scalability considerations (1 → 100+ customers)
- Technology stack details

**Key Sections:**
- Per-customer repository model (customer-a/, customer-b/, customer-c/)
- Multiple Cloudflare Pages projects (recommended for separation)
- Customer-managed DNS vs. Arklens-managed DNS options
- Clean handover process and export package structure

---

### 2. CUSTOMER_OWNERSHIP_GUIDE.md
**Audience:** Customers (current and prospective)  
**Purpose:** Explain ownership model in plain language

**Contents:**
- What customers own (domain, content, data, email, subscriptions)
- What Arklens manages (hosting, deployment, DNS, SSL, maintenance)
- Why customers don't get Cloudflare account access
- Migration process if customer leaves
- Frequently asked questions

**Key Messages:**
- "You own your business assets - no lock-in"
- "Arklens handles technical complexity"
- "You can export and migrate anytime"
- "Cloudflare is infrastructure, not a customer control panel"

**Customer-Facing:** Yes - can be published or shared with customers

---

### 3. OPERATIONS_GUIDE.md
**Audience:** Arklens operations team  
**Purpose:** Step-by-step operational procedures

**Contents:**
- Repository structure and setup
- Customer onboarding process (6 steps)
- Deployment procedures
- DNS management (both models)
- SSL/TLS management
- Data export procedures
- Customer offboarding/migration (6 steps)
- Monitoring and maintenance
- Security procedures
- Troubleshooting guide
- Emergency procedures

**Key Procedures:**
- How to onboard a new customer
- How to deploy updates
- How to handle customer migration
- How to respond to incidents
- Common troubleshooting scenarios

**Internal Only:** Yes - operational procedures for team

---

### 4. ARCHITECTURE_SUMMARY.md (This Document)
**Audience:** All stakeholders  
**Purpose:** Quick reference to architecture documentation

---

## Key Architectural Decisions

### 1. Per-Customer Repository Model
**Decision:** Each customer website in separate repository or clear workspace  
**Rationale:**
- Complete technical separation
- Easy customer handover
- No cross-customer dependencies
- Clear export boundaries

**Structure:**
```
arklens-customers/
├── customer-a/    # Complete, self-contained website
├── customer-b/    # Complete, self-contained website
└── customer-c/    # Complete, self-contained website
```

### 2. Multiple Cloudflare Pages Projects
**Decision:** One Cloudflare Pages project per customer (not one shared Worker)  
**Rationale:**
- Technical separation (security, data isolation)
- Independent deployments
- Per-customer analytics and logs
- Easy ownership transfer if customer leaves
- Scales cleanly to hundreds of customers

**Implementation:**
```
Customer A: restaurant.ch → Cloudflare Pages (project: customer-a)
Customer B: consultant.ch → Cloudflare Pages (project: customer-b)
Customer C: garage.ch     → Cloudflare Pages (project: customer-c)
```

### 3. Customer-Managed DNS (Default)
**Decision:** Customers keep DNS at their registrar by default  
**Rationale:**
- Customer retains full control
- No nameserver delegation required
- Customer can switch hosting anytime
- Clear ownership boundaries

**Alternative:** Arklens-managed DNS via Cloudflare (opt-in)
- Customer delegates nameservers
- Arklens manages DNS records
- Clearly documented in service agreement
- Customer can reclaim DNS control anytime

### 4. No Customer Cloudflare Account Access
**Decision:** Customers do NOT receive Cloudflare account access  
**Rationale:**
- Cloudflare is infrastructure, not a customer CMS
- Prevents accidental misconfiguration
- Maintains customer separation
- Simplifies customer experience
- Clear technical responsibility

**Customer experience:** "My website works" (not "How do I configure Workers?")

### 5. Automatic SSL/TLS
**Decision:** Cloudflare manages all SSL certificates automatically  
**Rationale:**
- No customer action required
- No certificate expiration issues
- Automatic renewals
- Always-on HTTPS

**Customer benefit:** "Secure website, zero maintenance"

---

## Customer Ownership Model (Summary)

### ✅ Customer Owns
- Domain name and registrar account
- Domain renewal payments
- Business content (text, images, media)
- Business data (forms, bookings, analytics)
- Email accounts and services
- External paid subscriptions
- **Right to export and migrate anytime**

### 🔧 Arklens Manages (During Service)
- Website deployment and hosting
- Cloudflare Pages/Workers configuration
- DNS configuration (where required)
- SSL/TLS certificates
- Technical deployment pipeline
- Website maintenance
- Infrastructure monitoring

### ❌ Customer Does NOT Get
- Cloudflare account administrator access
- Direct deployment or Worker controls
- DNS management UI (unless delegated)
- Infrastructure-level access

---

## Migration and Handover Process

### Customer Leaves Arklens

**Timeline:** 7-14 days

**Step 1: Customer notifies intent to migrate**
- Arklens acknowledges and sets migration date

**Step 2: Arklens prepares handover package (within 7 days)**
- Customer Asset Package: all content, media files and business data
- Website source code only if a Source Code Buyout or Migration Package is signed (Terms 5.5)
- Database export (if applicable)
- Technical documentation
- DNS configuration details
- Setup instructions

**Step 3: Handover package delivered**
- Secure file transfer
- Documentation included
- Technical support call offered

**Step 4: Transition period**
- Customer or new provider sets up new hosting
- Customer updates DNS to new hosting
- Arklens keeps old hosting active during transition

**Step 5: DNS switchover**
- Customer points domain to new hosting
- DNS propagation (24-48 hours)
- Both sites accessible during propagation

**Step 6: Arklens decommissions**
- Verify customer's new site live
- Delete Cloudflare Pages project
- Archive customer repository
- Delete customer data per privacy policy

---

## Scalability Architecture

### Current: Demo Site (1 site)
- Single repository: `/Volumes/SD Card128/Arklens/Website`
- Single Cloudflare Pages project: `arklens`
- Manual deployment via wrangler CLI

### Phase 1: Early Customers (1-5 customers)
- Per-customer repositories
- Per-customer Cloudflare Pages projects
- Manual deployment per customer
- Individual DNS setup
- Customer onboarding checklist

### Phase 2: Scale (5-20 customers)
- CI/CD pipeline (GitHub Actions)
- Automated deployments per customer
- Internal customer dashboard
- Monitoring per customer
- Self-service customer documentation

### Phase 3: Growth (20+ customers)
- Monorepo with workspaces (optional)
- Infrastructure as code (Terraform/Wrangler)
- Automated Cloudflare project creation
- Customer self-service portal
- Automated testing per customer
- White-label management platform

**Architecture supports:** Hundreds of customers with proper automation

---

## Technology Stack

### Core Technologies
- **Framework:** Astro (static site generation)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages
- **CDN:** Cloudflare
- **SSL:** Cloudflare automatic certificates
- **Deployment:** Wrangler CLI

### Per-Customer Configuration
- Independent package.json
- Independent dependencies (can vary between customers)
- Independent build configuration
- Independent deployment settings

### Shared Components (Optional Future)
- Design system package
- Reusable UI components
- Common utilities
- **Important:** Versioned and locked per customer

---

## Security Considerations

### Customer Separation
- ✅ Each customer in separate repository
- ✅ Each customer in separate Cloudflare project
- ✅ No shared database (unless explicitly designed)
- ✅ Independent deployments
- ✅ Separate logs and analytics

### Secret Management
- Arklens secrets: GitHub Secrets, Wrangler secrets
- Customer secrets: Per-customer environment variables
- Never commit secrets to git
- Rotate secrets on offboarding

### Data Protection
- Customer data isolated per customer
- Export on request within 7 days
- Delete on offboarding per privacy policy
- Backups maintained during service period

---

## Operations Workflows

### Customer Onboarding (New Customer)
1. Create customer repository from template
2. Create Cloudflare Pages project
3. Configure custom domain
4. Initial deployment
5. DNS verification
6. Final checklist and customer approval

**Time:** 1-2 hours per customer (mostly waiting for DNS)

### Customer Update (Content Change)
1. Pull latest code
2. Make content updates
3. Test locally
4. Build for production
5. Deploy to Cloudflare Pages
6. Verify and commit

**Time:** 15-30 minutes per update

### Customer Offboarding (Migration)
1. Receive customer notice
2. Prepare handover package
3. Deliver to customer
4. Transition period (customer sets up new hosting)
5. DNS switchover
6. Decommission after verification

**Time:** 7-14 days (mostly customer-side work)

---

## Documentation Maintenance

### Review Frequency
- **TECHNICAL_ARCHITECTURE.md:** Quarterly or on major architecture changes
- **CUSTOMER_OWNERSHIP_GUIDE.md:** Quarterly or on service model changes
- **OPERATIONS_GUIDE.md:** Monthly or as procedures evolve
- **ARCHITECTURE_SUMMARY.md:** With any above changes

### Update Triggers
- New customer onboarding procedures
- Technology stack changes
- Cloudflare platform updates
- Security incidents or improvements
- Customer feedback requiring clarification
- Scale milestones (5, 20, 50, 100 customers)

### Version Control
- All architecture documents in git
- Version number in each document
- Changelog maintained
- Team notified of updates

---

## Key Success Metrics

### Customer Ownership
- ✅ 100% customers can export their website
- ✅ 0% customers locked into Arklens infrastructure
- ✅ Clear handover process documented and tested

### Technical Separation
- ✅ Each customer independently deployable
- ✅ Each customer's assets can be handed over independently
- ✅ No cross-customer dependencies
- ✅ Zero data leakage between customers

### Operational Efficiency
- ✅ Onboarding time < 2 hours
- ✅ Deployment time < 30 minutes
- ✅ Offboarding package ready within 7 days
- ✅ 99.9%+ uptime per customer site

### Scalability Readiness
- ✅ Architecture supports 100+ customers
- ✅ Automation plan defined
- ✅ Monitoring strategy documented
- ✅ Handover process proven

---

## Next Steps

### Immediate
- ✅ Architecture documentation complete
- ✅ Ownership model clearly defined
- ✅ Operations procedures documented
- [ ] Share CUSTOMER_OWNERSHIP_GUIDE.md with first paying customer
- [ ] Create customer repository template
- [ ] Test handover package process

### Phase 1 (First 5 Customers)
- [ ] Set up per-customer repository structure
- [ ] Create first customer Cloudflare Pages project
- [ ] Document customer onboarding experience
- [ ] Refine operations procedures based on real experience
- [ ] Create customer-facing handover documentation

### Phase 2 (5-20 Customers)
- [ ] Implement CI/CD pipeline
- [ ] Build internal customer dashboard
- [ ] Automate monitoring per customer
- [ ] Create customer self-service docs
- [ ] Implement automated testing

### Phase 3 (20+ Customers)
- [ ] Evaluate monorepo approach
- [ ] Implement infrastructure as code
- [ ] Build customer self-service portal
- [ ] Implement white-label management platform
- [ ] Scale automation and monitoring

---

## Questions and Contact

**For Technical Questions:**
- Review: TECHNICAL_ARCHITECTURE.md
- Team: Arklens Technical Team

**For Customer Communication:**
- Use: CUSTOMER_OWNERSHIP_GUIDE.md
- Customize as needed for customer

**For Operations:**
- Follow: OPERATIONS_GUIDE.md
- Update procedures as learned

**For Architecture Changes:**
- Propose changes with rationale
- Update all affected documents
- Notify team and stakeholders

---

## Conclusion

The Arklens architecture is designed to:
- ✅ Respect customer ownership of business assets
- ✅ Provide clean separation between customers
- ✅ Enable easy customer migration and handover
- ✅ Scale efficiently to hundreds of customers
- ✅ Maintain clear technical responsibility
- ✅ Simplify customer experience (hide complexity)

**Core principle upheld throughout:**

**The customer owns the business and domain. Arklens manages the infrastructure while providing the service.**

---

**Document Version:** 1.0  
**Last Updated:** September 27, 2026  
**Related Documents:**
- TECHNICAL_ARCHITECTURE.md
- CUSTOMER_OWNERSHIP_GUIDE.md
- OPERATIONS_GUIDE.md
- Terms of Use (legal framework)
- Privacy Policy (data handling)
