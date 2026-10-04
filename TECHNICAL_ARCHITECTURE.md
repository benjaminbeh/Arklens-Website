# Arklens Technical Architecture

**Version:** 1.0  
**Date:** September 27, 2026  
**Status:** Production Architecture

---

## Core Principle

**The customer owns the business and domain. Arklens manages the infrastructure while providing the service.**

This separation ensures customers retain full control of their digital assets while Arklens handles all technical complexity.

---

## Ownership Model

### What Customers Own

Customers retain complete ownership and control of:

- ✅ **Domain name** - Purchased through registrar of their choice
- ✅ **Registrar account** - Customer maintains direct registrar relationship
- ✅ **Domain renewal payments** - Paid directly to registrar
- ✅ **Business content** - All text, images, logos, media
- ✅ **Business data** - Customer information, analytics, form submissions
- ✅ **Email accounts** - Business email services (if separate from hosting)
- ✅ **External paid subscriptions** - Unless explicitly included in Arklens service agreement

### What Arklens Owns

Unless agreed otherwise in writing, Arklens retains ownership of source code, templates, reusable components, design systems, development frameworks, automation scripts, deployment systems, internal tools and reusable AI/workflow components. Customers receive the rights needed to use their website through the Arklens service. Source code is only transferred under a separate Source Code Buyout or Migration Package (Terms of Use, Section 5.5).

**Customer rights:**
- Transfer domain to another provider at any time
- Receive all content and data on request (Customer Asset Package)
- Terminate service and migrate elsewhere
- Receive technical handover assistance

### What Arklens Manages (During Service)

Arklens handles all technical infrastructure during the service period:

- ✅ **Website deployment** - Build and deployment pipeline
- ✅ **Cloudflare hosting** - Pages/Workers hosting infrastructure
- ✅ **Cloudflare configuration** - Pages, Workers, DNS, SSL/TLS
- ✅ **DNS configuration** - Where required for hosting (customer domain points to Arklens infrastructure)
- ✅ **SSL/TLS certificates** - Automatic certificate provisioning and renewal
- ✅ **Technical deployment** - Code updates, version management
- ✅ **Website maintenance** - Updates per agreed service scope
- ✅ **Infrastructure monitoring** - Uptime, performance, security
- ✅ **Backups** - Website code and configuration backups

**Arklens does NOT provide:**
- Customer administrator access to Arklens Cloudflare account
- Direct customer access to Workers/Pages dashboard
- Customer access to deployment controls
- Customer access to DNS management UI (unless technically required)

### Why Customers Don't Get Cloudflare Admin Access

Cloudflare is **infrastructure, not a customer CMS:**

1. **Security:** Prevents accidental misconfiguration or service disruption
2. **Separation:** One customer cannot see another customer's sites or data
3. **Simplicity:** Customers shouldn't need to understand Workers, Pages, DNS, or SSL
4. **Support:** Arklens maintains single point of technical responsibility
5. **Quality:** Consistent deployment and configuration standards

**The customer experience should be:**
- "My website works"
- "Arklens handles the technical details"
- "I can leave or export my site any time"

NOT:
- "I need to learn Cloudflare Workers"
- "How do I configure DNS records?"
- "Why is my SSL certificate expired?"

---

## Technical Separation Architecture

### Per-Customer Repository Model

Each customer website is maintained in its own repository:

```
arklens-customer-websites/
├── customer-a/              # Restaurant website
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── astro.config.mjs
│   └── wrangler.toml        # Customer A's Cloudflare config
├── customer-b/              # Consultant website
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── astro.config.mjs
│   └── wrangler.toml        # Customer B's Cloudflare config
└── customer-c/              # Garage website
    ├── src/
    ├── public/
    ├── package.json
    ├── astro.config.mjs
    └── wrangler.toml        # Customer C's Cloudflare config
```

**Benefits:**
- ✅ Each customer's code is completely separate
- ✅ One customer can be exported without touching others
- ✅ Different customers can have different dependencies/versions
- ✅ Clear boundaries for handover or migration
- ✅ Git history per customer
- ✅ Independent deployment schedules

**Alternative: Monorepo with Workspaces**

If using a monorepo approach (e.g., for shared components):

```
arklens-websites/
├── packages/
│   ├── shared-components/   # Reusable UI components
│   ├── shared-styles/       # Common design system
│   └── shared-utils/        # Utilities
├── customers/
│   ├── customer-a/
│   ├── customer-b/
│   └── customer-c/
└── package.json             # Workspace root
```

**Requirements for monorepo:**
- Each customer must be independently buildable
- No cross-customer imports or dependencies
- Shared packages versioned and locked per customer
- Export individual customer without exposing others

---

## Cloudflare Multi-Tenant Architecture

### Current Architecture (Single Customer)

```
Domain: arklens.ch → Cloudflare Pages → Astro Static Site
```

**Configuration:**
- Single Cloudflare Pages project: `arklens`
- Single domain: `arklens.ch`
- Direct wrangler deployment

### Future Multi-Tenant Architecture

#### Option 1: Multiple Cloudflare Pages Projects (Recommended)

Each customer gets their own Cloudflare Pages project:

```
Customer A: restaurant-example.ch → Cloudflare Pages (project: customer-a)
Customer B: consultant-abc.ch    → Cloudflare Pages (project: customer-b)
Customer C: garage-xyz.ch        → Cloudflare Pages (project: customer-c)
```

**Deployment per customer:**
```bash
cd customer-a/
wrangler pages deploy dist --project-name=customer-a

cd customer-b/
wrangler pages deploy dist --project-name=customer-b
```

**Benefits:**
- ✅ Complete technical separation
- ✅ Independent deployments
- ✅ Per-customer analytics and logs
- ✅ Easy handover (transfer Pages project ownership)
- ✅ No shared infrastructure risk
- ✅ Scales to hundreds of customers

**Cloudflare Configuration:**
- Each Pages project has its own custom domain
- Each project has independent build settings
- Separate environment variables per project
- Independent deployment history

#### Option 2: Single Worker with Domain Routing

Single Cloudflare Worker routes multiple domains:

```typescript
// worker.ts
export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Route to appropriate customer site
    switch(hostname) {
      case 'restaurant-example.ch':
        return fetch(request, { backend: 'customer-a' });
      case 'consultant-abc.ch':
        return fetch(request, { backend: 'customer-b' });
      case 'garage-xyz.ch':
        return fetch(request, { backend: 'customer-c' });
      default:
        return new Response('Not found', { status: 404 });
    }
  }
}
```

**Benefits:**
- ✅ Centralized routing logic
- ✅ Shared caching strategy
- ✅ Single deployment for infrastructure updates

**Drawbacks:**
- ❌ Customers not technically separated (harder to handover)
- ❌ Single point of failure
- ❌ More complex to migrate individual customers
- ❌ Shared logs and analytics

**Recommendation:** Use Option 1 (Multiple Pages Projects) for customer separation and easier handover.

---

## Deployment Architecture

### Automated CI/CD Pipeline (Future)

```yaml
# GitHub Actions example per customer
name: Deploy Customer A

on:
  push:
    branches: [main]
    paths:
      - 'customer-a/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
        working-directory: ./customer-a
      - run: npm run build
        working-directory: ./customer-a
      - run: npx wrangler pages deploy dist --project-name=customer-a
        working-directory: ./customer-a
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

**Per-customer deployment triggers:**
- Automatic on code changes
- Manual deployment via CLI
- Scheduled deployments for updates
- Rollback capability to previous versions

### Manual Deployment (Current)

For early customers or custom work:

```bash
# Build customer site
cd customer-a/
npm install
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=customer-a --branch=production
```

---

## DNS Configuration Model

### Customer DNS Setup (Recommended)

**Customer manages registrar, points to Arklens infrastructure:**

1. Customer keeps domain at their registrar (e.g., Infomaniak, GoDaddy, Namecheap)
2. Customer updates DNS records per Arklens instructions:
   ```
   Type: CNAME
   Name: @  (or www)
   Value: customer-a.pages.dev
   ```
   OR
   ```
   Type: A
   Name: @
   Value: [Cloudflare IP addresses provided by Arklens]
   ```

3. Arklens configures custom domain in Cloudflare Pages
4. SSL certificate automatically provisioned by Cloudflare

**Customer retains:**
- Full registrar account access
- Ability to change DNS at any time
- Control over domain transfers
- Email DNS records (MX, SPF, DKIM)

**Arklens provides:**
- Clear DNS setup instructions
- Technical support during setup
- Verification of correct configuration
- SSL certificate management

### Arklens-Managed DNS (Alternative)

If customer prefers Arklens to fully manage DNS:

1. Customer delegates nameservers to Cloudflare
2. Arklens manages all DNS records via Cloudflare
3. Customer still owns domain at registrar

**Customer retains:**
- Domain ownership and registrar account
- Ability to change nameservers back at any time
- Control over domain renewal

**Arklens manages:**
- All DNS records (website, email, etc.)
- SSL certificates
- DNS changes for website updates

**Important:** Document this arrangement clearly in service agreement. Customer must understand they can reclaim DNS control at any time.

---

## Data Architecture

### Customer Content Storage

**Content in Git Repository:**
```
customer-a/
├── src/
│   ├── content/           # Markdown content
│   │   ├── services/
│   │   ├── about.md
│   │   └── contact.md
│   └── data/              # Structured data
│       ├── business-info.json
│       ├── services.json
│       └── team.json
└── public/
    └── uploads/           # Images, PDFs, etc.
        ├── logo.png
        ├── team/
        └── gallery/
```

**Benefits:**
- ✅ Version control for all content
- ✅ Easy export (git clone)
- ✅ Audit trail of changes
- ✅ Rollback capability

### Customer Form Data / Dynamic Data

**For dynamic data (contact forms, bookings, etc.):**

**Option 1: Cloudflare D1 Database (per customer)**
```
customer-a-db (D1)
  ├── contacts
  ├── bookings
  └── reviews

customer-b-db (D1)
  ├── contacts
  └── quotes
```

**Option 2: External Database (customer owns)**
```
Customer maintains their own database
Arklens connects via API or credentials
Customer retains full ownership and export rights
```

**Option 3: Third-party SaaS (customer account)**
```
Forms → Customer's Typeform/Airtable/Google Sheets
Bookings → Customer's Calendly/Acuity
CRM → Customer's HubSpot/Pipedrive
```

**Data export policy:**
- Provide data export on request within 7 days
- Standard formats: JSON, CSV, SQL dump
- Include all customer data, no redactions
- Provide documentation of data structure

---

## Security Architecture

### API Keys and Secrets

**Arklens-managed (infrastructure):**
- Cloudflare API tokens (Arklens account)
- Deployment credentials (Arklens owned)
- Infrastructure secrets (not shared with customers)

**Customer-managed (business services):**
- Email service API keys (if customer owns email)
- Payment processor keys (Stripe, PayPal - customer account)
- Third-party integrations (customer's API keys)
- Analytics tokens (customer's Google Analytics, etc.)

**Storage:**
- Arklens secrets: Wrangler secrets, GitHub Secrets, encrypted vault
- Customer secrets: Stored securely, encrypted, per-customer isolation
- Never commit secrets to git
- Rotate secrets on customer offboarding

### SSL/TLS Certificates

**Fully managed by Arklens via Cloudflare:**
- Automatic certificate provisioning
- Automatic renewal
- Support for custom domains
- No customer action required

**Customer benefits:**
- Always-on HTTPS
- No certificate expiration issues
- Automatic security updates

---

## Handover and Migration Process

### When Customer Leaves Arklens

**1. Customer-Owned Assets (Immediate Access)**
   - Domain: Already owned, no handover needed
   - Registrar account: Already owned
   - Email: Already owned (if separate)
   - Content: Customer provides new hosting details

**2. Arklens Provides (Within 7 days)**
   - Customer Asset Package: all customer content, media files and business data
   - Page URL list (for redirects and SEO)
   - Database export of customer data (if applicable)
   - Website source code only if a Source Code Buyout or Migration Package is signed
   - DNS configuration recommendations
   - Reasonable technical support during transition (per Terms)

**3. Migration Support**

Arklens assists with:
- Providing the Customer Asset Package
- Exporting customer data
- DNS reconfiguration guidance
- Explanation of technical stack
- Recommendations for new hosting

Arklens is NOT responsible for:
- Performing the migration
- Setting up new hosting
- Debugging issues with new provider
- Ongoing support after handover

**4. Technical Handover Package**

```
customer-a-handover.zip
├── README.md              # Setup instructions for new host
├── code/                  # Full website code
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── astro.config.mjs
├── data/                  # Exported data
│   ├── database.sql
│   └── analytics.json
├── docs/
│   ├── architecture.md    # How the site is built
│   ├── deployment.md      # How to deploy
│   └── dependencies.md    # Required services/APIs
└── dns-config.txt         # Current DNS settings
```

---

## Future Scalability Considerations

### Supporting 100+ Customers

**Repository Strategy:**
- Use monorepo with workspaces for shared components
- Or use individual repos with template scaffolding
- Automated repository creation from template

**Deployment Automation:**
- CI/CD pipeline per customer or triggered by customer path
- Automated Cloudflare Pages project creation
- Scripted DNS setup verification
- Automated SSL provisioning checks

**Customer Management Dashboard (Internal):**
```
Arklens Admin Dashboard
├── Customer list
├── Deployment status per customer
├── Domain/SSL status
├── Quick deploy buttons
├── Analytics overview
└── Support ticket tracking
```

**Infrastructure as Code:**
```typescript
// Terraform or Wrangler config per customer
const customerConfig = {
  name: 'customer-a',
  domain: 'restaurant-example.ch',
  pages_project: 'customer-a',
  build_command: 'npm run build',
  output_directory: 'dist',
};
```

**Monitoring and Alerting:**
- Uptime monitoring per customer domain
- SSL expiration alerts (should never fire with Cloudflare auto-renewal)
- Build failure notifications
- Performance degradation alerts

---

## Technology Stack

### Current Stack
- **Framework:** Astro (static site generation)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages
- **DNS/CDN:** Cloudflare
- **SSL:** Cloudflare automatic certificates
- **Deployment:** Wrangler CLI

### Per-Customer Dependencies
```json
{
  "name": "customer-a-website",
  "dependencies": {
    "astro": "^4.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

### Shared Components (Optional)
```
@arklens/components    # Reusable UI components
@arklens/design-system # Design tokens
@arklens/utils         # Common utilities
```

**Important:** Pin shared component versions per customer to prevent breaking changes.

---

## Documentation for Customers

### Customer-Facing Documentation

**What customers should know:**
1. "You own your domain and content"
2. "Arklens manages the technical hosting"
3. "You can get your content and data anytime"
4. "Your domain can be transferred to another provider"
5. "Your website is separate from other customers"

**What customers should NOT need to know:**
- How Cloudflare Pages works
- What DNS records are configured
- How Workers or build pipelines function
- Technical details of hosting architecture

### Internal Documentation

**For Arklens team:**
1. How to onboard a new customer (repo setup, deployment)
2. How to deploy customer updates
3. How to troubleshoot customer issues
4. How to handover a customer site
5. Emergency procedures (site down, security incident)

---

## Key Principles Summary

1. **Customer owns business assets** - Domain, content, data always belong to customer
2. **Arklens manages infrastructure** - Hosting, deployment, DNS, SSL handled by Arklens
3. **Technical separation** - Each customer site is isolated, so its assets can be handed over cleanly
4. **No shared infrastructure risk** - One customer issue doesn't affect others
5. **Cloudflare is infrastructure** - Not a customer CMS or control panel
6. **Clean handover** - Customer leaves with domain, content and data; Arklens technology stays with Arklens unless separately transferred
7. **Scalable architecture** - Design supports growth to hundreds of customers

---

## Next Steps for Implementation

### Immediate (Arklens Demo Site)
- ✅ Current single-site architecture is appropriate for demo
- ✅ Document ownership model in customer-facing materials
- ✅ Prepare handover template documentation

### Phase 1: First Paying Customers (1-5 customers)
- [ ] Create per-customer repository structure
- [ ] Set up per-customer Cloudflare Pages projects
- [ ] Document DNS setup process for customers
- [ ] Create customer onboarding checklist
- [ ] Build customer handover package template

### Phase 2: Scale (5-20 customers)
- [ ] Implement CI/CD pipeline per customer
- [ ] Build internal customer management dashboard
- [ ] Automate Cloudflare Pages project creation
- [ ] Set up monitoring and alerting per customer
- [ ] Create customer self-service documentation

### Phase 3: Growth (20+ customers)
- [ ] Consider monorepo with workspaces
- [ ] Implement infrastructure as code (Terraform/Wrangler config)
- [ ] Build automated testing per customer
- [ ] Implement automated backups per customer
- [ ] Consider white-label management platform

---

**Document Version:** 1.0  
**Last Updated:** September 27, 2026  
**Maintained By:** Arklens Technical Team  
**Review Frequency:** Quarterly or on significant architecture changes
