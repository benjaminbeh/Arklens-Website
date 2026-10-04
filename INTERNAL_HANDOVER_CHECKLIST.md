# Internal Handover Checklist - Arklens Team

**Purpose:** Step-by-step procedures for executing customer handovers in all scenarios.

**Audience:** Arklens team members handling customer transitions

**Last Updated:** September 26, 2026

---

## Quick Reference

| Scenario | Notice Period | Timeline | Primary Contact |
|----------|---------------|----------|-----------------|
| Customer-initiated exit | None required | 1-2 weeks | Customer success |
| Programme ending | 60 days minimum | 60+ days | All customers |
| Individual discontinuation | 60 days minimum | 60+ days | Specific customer |
| Abuse/security | Immediate possible | Immediate-7 days | Tech + Legal |

---

## Initial Assessment

When a handover is triggered, immediately determine:

### ☐ 1. Trigger Type

- [ ] **Customer-initiated:** Customer requests to leave
- [ ] **Programme ending:** Free Website Programme discontinuation
- [ ] **Service discontinuation:** Ending service for specific customer
- [ ] **Abuse/security:** Immediate action required
- [ ] **Arklens closure:** Company ceasing operations

### ☐ 2. Customer Status Check

**Gather information:**
- [ ] Customer name and business name
- [ ] Current website URL
- [ ] Domain ownership status (customer-managed or Arklens-managed DNS)
- [ ] Services active (hosting, custom features, integrations)
- [ ] Account standing (good standing, outstanding issues)
- [ ] Contract/agreement details
- [ ] Customer contact: primary email and phone

**Document in:** `[Customer tracking system] > Handover initiated`

### ☐ 3. Immediate Actions

- [ ] Acknowledge receipt (if customer-initiated) within 4 business hours
- [ ] Assign handover coordinator (team member responsible)
- [ ] Create handover folder: `handovers/[customer-name]-[date]/`
- [ ] Review customer's Terms of Use agreement
- [ ] Check for any special contract provisions

---

## Communication Protocol

### ☐ 4. Initial Contact Email

**Timeline:** Within 1-2 business days of handover trigger

**Template:**

```
Subject: Your Options - [Handover Reason]

Dear [Customer Name],

[Opening based on scenario - see templates below]

You have three clear options for your website:

**Option A: Continue with Arklens (Paid)**
Move to a paid hosting plan. Your website stays exactly as it is.
Estimated cost: CHF 20-50/month

**Option B: Move to Your Own Infrastructure**
We'll provide your Customer Asset Package (your content, images and data) and help you set up your own hosting.
Estimated cost: CHF 0-300 (one-time + hosting)

**Option C: Move to Another Provider**
Take your online presence to a different provider. We'll provide your Customer Asset Package and cooperate with your new provider.
Estimated cost: Varies by provider

Your domain always belongs to you. We'll help ensure a smooth transition regardless of which option you choose.

Arklens source code, templates and reusable components are not included automatically. If you'd like to keep running the existing website as it is, we can discuss a Source Code Buyout or Migration Package.

**Next Steps:**
1. Review the attached Handover Guide
2. Reply with your preferred option (or questions)
3. We'll schedule a brief call to discuss details

**Timeline:**
- You have [X days] to decide
- Handover support available until [date]
- Your website remains online until [date]

Questions? Reply to this email or call us at [phone number].

Best regards,
[Team member name]
Arklens Customer Success Team

Attachments: Customer_Handover_Guide.pdf
```

**Scenario-specific openings:**

**Customer-initiated:**
```
We received your request to move away from Arklens. While we're sorry to see you go, we're committed to making this transition as smooth as possible.
```

**Programme ending:**
```
As part of our business evolution, we're updating the Free Website Programme. We're reaching out to discuss your options for continuing your online presence.
```

**Individual discontinuation:**
```
Due to [reason: capacity constraints/programme changes], we need to transition your website to a new arrangement. We're here to help make this change as easy as possible.
```

### ☐ 5. Schedule Consultation Call

**Timeline:** Within 3-5 business days of initial email

**Preparation:**
- [ ] Review customer account thoroughly
- [ ] Prepare cost estimates for Option A (if applicable)
- [ ] Have export package specs ready
- [ ] Review domain setup (DNS configuration)
- [ ] Check for any custom integrations or services

**Call agenda:**
1. Understand customer needs and timeline
2. Explain each option in detail
3. Answer questions
4. Discuss costs (Option A) or technical requirements (B/C)
5. Confirm chosen option
6. Set next steps and timeline

**Document:**
- [ ] Customer's chosen option
- [ ] Specific requirements or concerns
- [ ] Agreed timeline
- [ ] Next action items

---

## Option A: Continue with Arklens (Paid Service)

### ☐ 6. Paid Service Transition

**Prerequisites:**
- [ ] Paid plans available and pricing confirmed
- [ ] Customer agrees to pricing
- [ ] Legal/billing ready to process

**Steps:**

#### 6.1 Prepare Agreement
- [ ] Generate service agreement with pricing
- [ ] Include service level details (uptime, support, updates)
- [ ] Specify billing cycle (monthly/annual)
- [ ] Define cancellation policy
- [ ] Send to customer for review

#### 6.2 Setup Billing
- [ ] Collect billing information securely
- [ ] Set up recurring payment system
- [ ] Configure invoicing
- [ ] Set first billing date (after free period ends)
- [ ] Send confirmation email

#### 6.3 Technical Setup
- [ ] No technical changes required (website stays as-is)
- [ ] Update internal account status: Free → Paid
- [ ] Configure any new features included in paid plan
- [ ] Update monitoring/alerts for paid tier

#### 6.4 Documentation
- [ ] Update customer record: Plan type, billing start date
- [ ] Provide customer with:
  - Service agreement (signed copy)
  - Invoice/receipt
  - Updated support contact info
  - Any new feature documentation

**Timeline:** 1-2 weeks to complete

**Result:** Customer continues with no interruption, paid service begins on specified date.

---

## Option B: Self-Host Migration

### ☐ 7. Customer Asset Package Preparation

**Timeline:** 1-2 business days to prepare

> **Scope rule:** Domain + business content = customer. Arklens technology + source code = Arklens. Prepare a Migration Package (source code and/or compiled build) **only** if a Source Code Buyout or Migration Package is signed and filed. See EXPORT_PACKAGE_GUIDE.md.

#### 7.0 Fair-Use and Scope Check
- [ ] Requester is the participating business (not an agency, freelancer or IT provider seeking free development for resale or white-labelling, Terms 2.10)
- [ ] Customer informed that source code is not included automatically
- [ ] If the customer wants the existing site as-is: Source Code Buyout / Migration Package quote requested from management
- [ ] Agreement reference recorded (or "not applicable")

#### 7.1 Gather Customer-Owned Assets

**Always include:**
- [ ] Business content
  - All page text in readable form (content.md)
  - Content data files (business, services, hours, contact, social, team)
- [ ] Customer-provided media
  - Logos, photos and images (original resolution where available)
- [ ] Business and customer data
  - Form submissions or other customer data held by Arklens (CSV)
- [ ] Site map
  - URL list with page titles and meta descriptions (for redirects and SEO)
- [ ] DNS
  - Current DNS records and DNS configuration guide

**Never include without a signed Migration Package:**
- [ ] Source code, templates, reusable components or design-system files
- [ ] Compiled static build (`dist/`)
- [ ] Deployment configuration, automation scripts or internal tools

#### 7.2 Security Review

**Before delivering, verify:**
- [ ] Remove any Arklens internal credentials
- [ ] Remove other customers' data or code
- [ ] Customer Asset Package contains no Arklens source code, templates, components or compiled build
- [ ] Any Migration Package matches the signed agreement scope exactly

#### 7.3 Package Files

**Standard package:**
```
customer-name-assets-[date].zip
├── README.md
├── content/
├── media/
├── data/
├── site-map/urls.csv
└── dns/
```

**Migration Package (only if signed):** source code and/or static build as defined in the agreement. Follow EXPORT_PACKAGE_GUIDE.md Steps 2-4.

**Checksums:**
- [ ] Generate SHA256 checksums for integrity verification
- [ ] Include checksums.txt in package

### ☐ 8. Delivery and Support

#### 8.1 Secure Delivery
- [ ] Upload to secure file transfer (if >100MB)
- [ ] OR send via encrypted email (if <100MB)
- [ ] Include download instructions
- [ ] Set expiration: 30 days

**Email template:**
```
Subject: Your Customer Asset Package - Ready for Download

Dear [Customer Name],

Your Customer Asset Package is ready. It contains everything that belongs to your business, ready for your own hosting or developer.

**Download Links:**
- Customer Asset Package: [secure link] (expires in 30 days)
- Checksums: [checksums.txt]
- [Only if agreed] Migration Package: [secure link] (agreement ref: ____)

**What's Included:**
✓ All your business text and content
✓ Your logos, photos and images
✓ Business and customer data we held for you
✓ A list of your page addresses
✓ DNS settings and domain configuration guide

Arklens source code, templates and reusable components are not included unless a Migration Package was agreed.

**Next Steps:**
1. Download the package and verify the checksum
2. Share it with your developer or hosting provider
3. Update DNS when your new site is ready
4. Contact us if you need assistance (1-2 hours support included)

**Support Available:**
Reply to this email or schedule a call: [calendly link]

We're here to help make your transition smooth!

Best regards,
[Team member]
```

#### 8.2 Handover Support Session

**Schedule:** Within 1 week of package delivery

**Preparation:**
- [ ] Review customer's chosen hosting platform
- [ ] Test deployment instructions for that platform
- [ ] Prepare DNS migration steps
- [ ] Have customer's current DNS settings documented

**Session agenda (1-2 hours):**
1. **Setup Review** (15 min)
   - Confirm customer downloaded packages
   - Verify files integrity (checksums)
   - Review folder structure

2. **Deployment Walkthrough** (30-45 min)
   - Guide through hosting platform setup
   - Help with deployment (Cloudflare Pages, Netlify, etc.)
   - Troubleshoot any build issues
   - Verify site builds successfully

3. **Domain Configuration** (15-30 min)
   - Review current DNS settings
   - Guide DNS changes to point to new hosting
   - Explain SSL certificate setup
   - Discuss testing (staging URL first)

4. **Testing** (15 min)
   - Verify new site loads correctly
   - Check all pages working
   - Verify images load
   - Test forms/interactions

5. **Cutover Plan** (10 min)
   - Agree on DNS switch timing
   - Confirm monitoring during transition
   - Provide contact for post-cutover issues

**Documentation:**
- [ ] Record session notes
- [ ] Document any custom configurations
- [ ] Note outstanding issues
- [ ] Set follow-up date

### ☐ 9. DNS Transition Assistance

#### 9.1 If Customer Manages DNS

**Provide:**
- [ ] Current DNS settings (for reference)
- [ ] New DNS settings (from their new hosting)
- [ ] Step-by-step instructions for their registrar
- [ ] Expected propagation time (5-60 minutes typical)
- [ ] Testing instructions (check DNS with `dig` or online tools)

**Template email:**
```
Your DNS Configuration Guide

Current Settings (Arklens):
CNAME  www  →  [customer-name].pages.dev

New Settings (Your Hosting):
[Provide specific settings from their new host]

Steps:
1. Log in to [their registrar]
2. Navigate to DNS Management
3. Update CNAME record for 'www'
4. Save changes
5. Wait 5-60 minutes for propagation
6. Test: Visit www.yourcustomer-domain.ch

Need help? We're available until [date].
```

#### 9.2 If Arklens Manages DNS

**Transfer control back:**

**Option 1: Update to customer control**
- [ ] Document current full DNS configuration
- [ ] Provide customer with all records
- [ ] Contact registrar to transfer DNS management to customer
- [ ] OR update nameservers to customer's choice
- [ ] Confirm customer has access within 24-48 hours

**Option 2: Direct update**
- [ ] With customer's permission, update DNS to point to new hosting
- [ ] Keep managing DNS temporarily (during transition only)
- [ ] Transfer back after successful cutover

**Always:**
- [ ] Send customer complete DNS records documentation
- [ ] Ensure customer has registrar access
- [ ] Confirm customer can manage DNS independently going forward

### ☐ 10. Cutover and Monitoring

#### 10.1 Pre-Cutover Checklist
- [ ] New site fully tested on staging/temp URL
- [ ] All pages working
- [ ] Images loading
- [ ] Forms functioning (if applicable)
- [ ] SSL certificate ready on new hosting
- [ ] Customer confirms ready to proceed

#### 10.2 DNS Switch
- [ ] Customer or Arklens updates DNS
- [ ] Record exact time of change
- [ ] Monitor propagation (15-60 min typical)
- [ ] Test from multiple locations

#### 10.3 Post-Cutover Monitoring (24-48 hours)
- [ ] Verify site accessible at domain
- [ ] Check SSL certificate working
- [ ] Monitor for any customer-reported issues
- [ ] Keep old hosting active for 48 hours (safety buffer)

#### 10.4 Decommission Old Hosting
**After 48-72 hours:**
- [ ] Confirm with customer: new site working perfectly
- [ ] Take final backup of old hosting
- [ ] Archive customer files internally (30-day retention)
- [ ] Deactivate old Cloudflare Pages project
- [ ] Remove DNS records (if Arklens-managed)
- [ ] Update internal records: Status = Migrated to self-host

**Timeline:** 2-4 weeks total from export to decommission

---

## Option C: Move to Another Provider

### ☐ 11. Export Package for New Provider

**Similar to Option B, but tailored for provider handoff:**

#### 11.1 Prepare Customer Asset Package

**Run the fair-use and scope check (§7.0). Include everything from Option B (§7.1) PLUS:**

- [ ] **Provider Handoff Documentation**
  - Plain-language summary of the current site (pages, features, integrations)
  - Content structure explanation
  - List of external services the customer uses (customer-owned accounts)

- [ ] **Rebuild-Friendly Formats**
  - Structured content exports (JSON, CSV, or Excel)
  - Image assets catalog
  - Sitemap of current pages
  - Customer brand details the customer supplied (logo colours, brand fonts)

- [ ] **Migration Notes**
  - Known dependencies on Cloudflare features (if any)
  - Forms handling approach
  - Analytics setup (if any)
  - Performance optimization notes

#### 11.2 Package Delivery

**Same secure delivery as Option B (§8.1)**

**Modified email template:**
```
Subject: Customer Asset Package for [Provider Name]

Dear [Customer Name],

Your Customer Asset Package is ready for handoff to your new provider.

**What's Included:**
✓ All content in structured formats
✓ All your images and media assets
✓ Business and customer data we held for you
✓ A list of current page addresses (for redirects and SEO)
✓ Plain-language summary of the current site
✓ DNS settings

**For Your New Provider:**
This package lets them rebuild your site in their preferred system while keeping your content, images and page addresses.

Arklens source code, templates and reusable components are not included. If you'd like the existing site transferred as it is, we can discuss a Source Code Buyout or Migration Package.

**Support Available:**
We're happy to speak with your new provider if technical questions arise.
Contact: [email] (available until [date])

Best regards,
[Team member]
```

### ☐ 12. Provider Coordination (If Requested)

**Optional but helpful:**

#### 12.1 New Provider Introduction Call

**If customer or new provider requests:**
- [ ] Schedule 30-60 min call
- [ ] Technical team member participates
- [ ] Review package contents
- [ ] Explain current architecture
- [ ] Answer technical questions
- [ ] Clarify any custom implementations

**Agenda:**
1. Current technical setup overview
2. Content structure explanation
3. Deployment process review
4. Domain/DNS handoff plan
5. Timeline coordination
6. Q&A

**Documentation:**
- [ ] Send call summary to customer and provider
- [ ] Note any commitments made
- [ ] Set follow-up if needed

#### 12.2 Technical Questions Support

**Up to 1 hour of email/chat support:**
- [ ] Answer provider's technical questions
- [ ] Clarify package contents
- [ ] Explain any unusual configurations
- [ ] Provide additional documentation if needed

**Response SLA:** Within 1 business day during transition period

### ☐ 13. Domain Transfer Coordination

**Same process as Option B (§9)**

**Additional considerations:**
- [ ] New provider may request specific DNS setup
- [ ] Coordinate timing with their launch schedule
- [ ] Ensure customer aware of testing period before DNS switch

### ☐ 14. Transition Completion

#### 14.1 Verify New Provider Launch
- [ ] Customer confirms new site live
- [ ] DNS pointing to new provider
- [ ] Customer satisfied with transition

#### 14.2 Decommission
**After customer confirmation (typically 7 days):**
- [ ] Final backup archive
- [ ] Deactivate old hosting
- [ ] Remove Arklens DNS management (if applicable)
- [ ] Update internal records: Status = Migrated to [provider name]
- [ ] Send transition completion email

**Timeline:** 2-6 weeks total (depends on new provider's schedule)

---

## Special Scenarios

### ☐ 15. Abuse or Security Issues

**When immediate action required:**

#### 15.1 Immediate Assessment
- [ ] Document specific violation or security issue
- [ ] Assess severity and risk
- [ ] Consult legal if necessary
- [ ] Determine appropriate notice period (0-7 days)

#### 15.2 Modified Notice Period

**If immediate (0-day notice):**
- [ ] Document urgent reason
- [ ] Take site offline if necessary (security)
- [ ] Notify customer immediately via email and phone
- [ ] Provide Customer Asset Package within 24 hours
- [ ] Offer emergency support

**If short notice (1-7 days):**
- [ ] Document violation clearly
- [ ] Notify customer with specific timeline
- [ ] Offer standard handover options
- [ ] Prepare Customer Asset Package immediately
- [ ] Fast-track handover process

**Always:**
- [ ] Document decision thoroughly
- [ ] Follow legal/compliance requirements
- [ ] Provide clear reasoning to customer
- [ ] Offer reasonable assistance despite circumstances

### ☐ 16. Programme-Wide Ending

**When ending Free Website Programme for all customers:**

#### 16.1 Planning (60+ days before)
- [ ] Executive decision documented
- [ ] Legal review of obligations
- [ ] Plan communication strategy
- [ ] Prepare mass email templates
- [ ] Setup support capacity (expect high volume)
- [ ] Create transition timeline

#### 16.2 Mass Notification (Day 1)
- [ ] Send personalized emails to all customers
- [ ] Include FAQ document
- [ ] Set up dedicated support channel
- [ ] Post public announcement (if appropriate)
- [ ] Schedule webinar or Q&A sessions

#### 16.3 Customer Segmentation
**Categorize customers for prioritization:**
- [ ] Interested in paid plans → Sales team
- [ ] Need self-host help → Technical team
- [ ] Moving to providers → Export team
- [ ] Inactive/expired → Standard process

#### 16.4 Batch Processing
- [ ] Create export packages in batches
- [ ] Schedule support sessions
- [ ] Coordinate transitions to avoid bottlenecks
- [ ] Monitor support queue daily

#### 16.5 Timeline Management
- [ ] Track each customer's chosen option
- [ ] Monitor progress toward deadlines
- [ ] Send reminder emails (45, 30, 14, 7 days before)
- [ ] Escalate customers approaching deadline with no decision

**Resources needed:**
- Multiple team members
- Extended support hours
- Automated communication tools
- Progress tracking system

### ☐ 17. Arklens Company Closure

**If Arklens ceases operations:**

#### 17.1 Emergency Preparation (if possible)
- [ ] Notify all customers immediately (60-day target)
- [ ] Auto-generate Customer Asset Packages for all
- [ ] Management decision: whether to release source code or grant customers a continued-use licence so their websites can keep running
- [ ] Secure delivery mechanism (bulk download portal)
- [ ] Partner with alternative provider for transition assistance (if possible)

#### 17.2 Package Delivery
- [ ] Provide download portal accessible for 90 days minimum
- [ ] Include all documentation
- [ ] No support commitments (best effort only)
- [ ] Clear instructions for self-service transition

#### 17.3 Domain Management
- [ ] If Arklens-managed: Transfer back to customers immediately
- [ ] Provide DNS records
- [ ] Coordinate with registrars for bulk transfers if needed

**Priority:** Ensure all customers can retrieve their assets and maintain website operations.

---

## Documentation Requirements

### ☐ 18. Record Keeping

**For each handover, maintain:**

#### 18.1 Handover Folder Structure
```
handovers/[customer-name]-[YYYY-MM-DD]/
├── initial-request.md (trigger documentation)
├── customer-communication/ (all emails, call notes)
├── option-chosen.md (customer's decision + reasoning)
├── delivered-packages/ (copies of what was delivered)
│   ├── customer-assets.zip
│   ├── migration-package/ (ONLY if signed; include agreement)
│   └── checksums.txt
├── support-sessions/ (notes from calls/meetings)
├── dns-config.md (DNS details before/after)
├── timeline.md (key dates and milestones)
└── completion-report.md (final summary)
```

#### 18.2 Completion Report Template

```markdown
# Handover Completion Report

**Customer:** [Name]
**Business:** [Business name]
**Domain:** [domain.ch]
**Handover ID:** [HO-YYYY-MM-###]

## Summary
- **Trigger:** [Customer exit / Programme ending / etc.]
- **Initiated:** [Date]
- **Completed:** [Date]
- **Duration:** [X weeks]
- **Chosen Option:** [A / B / C]

## Timeline
- [Date]: Handover initiated
- [Date]: Initial contact sent
- [Date]: Consultation call completed
- [Date]: Customer chose option [X]
- [Date]: Export package delivered (if B/C)
- [Date]: Support session completed (if B/C)
- [Date]: DNS cutover (if B/C)
- [Date]: Old hosting decommissioned
- [Date]: Handover closed

## Deliverables Provided
- [ ] Customer Asset Package
- [ ] Migration Package (only if signed; agreement ref: ____)
- [ ] Documentation
- [ ] Support session(s): [X hours]
- [ ] DNS assistance
- [ ] Other: [specify]

## Outcome
- **New hosting:** [Self-hosted / Provider name / Paid Arklens]
- **Customer satisfaction:** [Satisfied / Neutral / Dissatisfied]
- **Issues encountered:** [List any problems]
- **Lessons learned:** [What could improve]

## Final Status
- Old hosting decommissioned: [Yes/No - Date]
- Customer has domain control: [Yes - verified how]
- All assets delivered: [Yes]
- Support period ended: [Date]
- Internal records updated: [Yes]

**Handover completed by:** [Team member]
**Date:** [Date]
```

### ☐ 19. Internal Process Review

**After every 10 handovers OR quarterly:**
- [ ] Review all completion reports
- [ ] Identify common issues or bottlenecks
- [ ] Update procedures based on learnings
- [ ] Refine templates and documentation
- [ ] Update time estimates
- [ ] Share insights with team

---

## Quality Assurance

### ☐ 20. Pre-Delivery Checklist

**Before providing any package:**

#### Security Audit
- [ ] No Arklens internal credentials in files
- [ ] No other customer data present
- [ ] Customer Asset Package contains no Arklens source code, templates, components or compiled build
- [ ] Any Migration Package matches the signed agreement scope
- [ ] All sensitive comments removed
- [ ] .env.example provided (not real .env with secrets)

#### Completeness Check
- [ ] All customer images included
- [ ] All page text, data, URL list and DNS records included
- [ ] Documentation thorough and accurate
- [ ] Migration Package only: build instructions tested (npm install && npm run build)
- [ ] Checksums generated and verified

#### Quality Check
- [ ] README.md clear and comprehensive
- [ ] Migration Package only: deployment instructions accurate for stated platforms
- [ ] DNS configuration guide matches their specific setup
- [ ] No broken links in documentation
- [ ] Contact information current

**Sign-off:** Two team members verify package quality and scope

### ☐ 21. Post-Handover Follow-Up

**1 week after transition:**
- [ ] Email customer: "How did your transition go?"
- [ ] Request feedback on handover process
- [ ] Address any remaining issues
- [ ] Document feedback for process improvement

**30 days after transition:**
- [ ] Final check-in (if no issues at 1 week)
- [ ] Close handover ticket
- [ ] Archive documentation
- [ ] Remove from active handover tracking

---

## Communication Templates

### Template 1: Programme Ending Announcement

```
Subject: Important Update: Free Website Programme Transition

Dear [Customer Name],

We're writing to share an important update about the Arklens Free Website Programme.

**What's Changing:**
[Clearly explain the change - programme ending, evolving, restructuring, etc.]

**Timeline:**
- Today: This notification
- [60 days from now]: Last day of free hosting under current programme
- During this time: We're here to help you transition

**Your Website:**
Your website will continue running normally for the next 60 days. After that date, you'll need to choose one of three options to keep your online presence:

**Option A: Continue with Arklens**
Move to our paid hosting plan (CHF [X]/month)
- Same website, same team, same service
- No technical changes needed

**Option B: Your Own Infrastructure**
Run your online presence on hosting you control
- Your Customer Asset Package provided (content, images, data)
- We'll help you set it up
- Free handover assistance included

**Option C: Move to Another Provider**
Switch to a different web hosting company
- Your Customer Asset Package for easy transfer
- We'll cooperate with your new provider

Arklens source code and templates are not included automatically; a Source Code Buyout or Migration Package can be discussed if you want to keep the existing site as it is.

**What You Need to Do:**
1. Review your options (full guide attached)
2. Reply with your choice by [30 days from now]
3. We'll guide you through the transition

**Your Domain:**
Your domain name always belongs to you. Regardless of which option you choose, you maintain full control of your domain.

**Questions?**
We're here to help. Reply to this email, call us at [phone], or visit [FAQ URL].

We value your business and are committed to making this transition as smooth as possible.

Best regards,
[Name]
[Title]
Arklens Team

Attachments:
- Customer_Handover_Guide.pdf
- Frequently_Asked_Questions.pdf
```

### Template 2: Handover Completion Confirmation

```
Subject: Handover Complete - Thank You

Dear [Customer Name],

Your website transition is now complete!

**Summary:**
- Your website is [live at new location / running on paid plan]
- Domain: [domain.ch] - under your control ✓
- [Old hosting decommissioned / Billing active as of [date]]

**What You Received:**
[List: export packages, documentation, support hours used, etc.]

**Your New Setup:**
- Hosting: [Platform/Provider]
- Domain managed by: [Customer/Their provider]
- Website accessible at: https://[domain.ch]

**Support:**
While our formal handover period has ended, we're still here if you encounter issues related to the transition. Feel free to reach out within the next 30 days.

**Feedback:**
We'd love to hear about your experience. How did the handover process go? What could we improve? Reply to this email with your thoughts.

**Thank You:**
Thank you for being part of Arklens. We wish you continued success with your online presence!

Best regards,
[Team member]
Arklens Team

---

If you ever want to come back to Arklens, contact us at [email].
```

---

## Team Roles and Responsibilities

### Handover Coordinator (Primary Role)
**Responsibilities:**
- Owns entire handover process for assigned customer
- All customer communication
- Schedules and leads consultation calls
- Coordinates with technical team for export prep
- Monitors timeline and deadlines
- Documents process
- Closes handover when complete

### Technical Team
**Responsibilities:**
- Prepares export packages
- Security audit of exports
- Provides technical support sessions
- Assists with deployment troubleshooting
- DNS/SSL guidance
- Signs off on export quality

### Customer Success / Sales
**Responsibilities:**
- Handles Option A conversions (paid plans)
- Manages customer relationships
- Identifies upsell opportunities (where appropriate)
- Customer satisfaction monitoring

### Management
**Responsibilities:**
- Approves programme-wide changes
- Monitors handover volume and capacity
- Reviews process improvements
- Makes executive decisions on unusual cases
- Legal consultation as needed

---

## Success Metrics

Track these for process improvement:

### Efficiency Metrics
- Average time from trigger to completion (by option)
- Team hours spent per handover
- Customer response time to initial contact
- Export package preparation time
- Support session duration

### Quality Metrics
- Customer satisfaction score (post-handover survey)
- Successful transitions (completed vs. abandoned)
- Issues requiring escalation
- Export package quality (defects found)
- Documentation accuracy

### Business Metrics
- Option A conversion rate (to paid)
- Cost per handover
- Support hours per handover
- Handover volume trends

**Review quarterly:** Identify improvements, update procedures, adjust resources.

---

## Appendix: Handover Support Budget

### Time Allocation per Handover

**Option A: Continue with Arklens**
- Initial contact: 30 min
- Consultation call: 30 min
- Agreement/billing setup: 1 hour
- **Total: 2 hours**

**Option B: Self-Host**
- Initial contact: 30 min
- Consultation call: 45 min
- Export preparation: 2 hours
- Package delivery & docs: 30 min
- Support session: 1-2 hours
- DNS assistance: 30 min
- Monitoring & follow-up: 1 hour
- **Total: 6-7 hours**

**Option C: New Provider**
- Initial contact: 30 min
- Consultation call: 45 min
- Export preparation: 2 hours
- Package delivery & docs: 30 min
- Provider coordination (optional): 1 hour
- DNS assistance: 30 min
- Follow-up: 30 min
- **Total: 5-6 hours**

**Resource Planning:**
- 1 handover coordinator can manage 3-5 active handovers
- 1 technical team member supports 5-8 active exports
- Scale resources based on volume

---

## Quick Reference: Critical Don'ts

❌ **Never:**
- Include other customers' code or data in exports
- Expose Arklens internal systems or credentials
- Charge fees for standard handover process
- Delete customer data before confirmed successful transition
- Provide access to Arklens Cloudflare account
- Make promises beyond documented capabilities
- Skip security audit of packages
- Release source code, templates, components or the compiled build without a signed Migration Package
- Provide free development to agencies or third parties for resale or white-labelling (Terms 2.10)
- Decommission old hosting before customer confirmation

✅ **Always:**
- Verify customer identity before providing any package
- Document everything in handover folder
- Get customer confirmation in writing for key decisions
- Keep backup of customer files for 30 days post-handover
- Provide clear, accurate timeline expectations
- Follow 60-day notice requirement (unless abuse/security)
- Respect customer's domain ownership and return all customer-owned assets
- Maintain professionalism regardless of exit reason

---

**Document Owner:** Arklens Operations Team  
**Last Reviewed:** October 4, 2026  
**Next Review:** December 26, 2026  
**Version:** 1.1.0
