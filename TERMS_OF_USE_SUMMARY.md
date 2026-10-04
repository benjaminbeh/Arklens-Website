# Terms of Use - Implementation Summary

**Date:** September 27, 2026  
**New Page:** /terms  
**Deployment:** https://e01a2fc4.arklens.pages.dev/terms

---

## ✅ Completed

Created comprehensive Terms of Use page with dedicated **Free Website Programme** section.

---

## 📋 Free Website Programme Section - Complete Coverage

The new Section 2 of the Terms of Use clearly defines all requested principles:

### 2.1 Programme Description
✅ States it's a promotional service  
✅ Not guaranteed to continue indefinitely  
✅ Includes free website creation and free hosting  

### 2.2 Programme Status and Changes
✅ Arklens may modify, suspend, or discontinue the programme  
✅ Right to change scope, eligibility, technical specs  
✅ Clear authority to end the programme  

### 2.3 Notice Period for Programme Changes
✅ **60 days' advance notice** for ending free hosting (general case)  
✅ Shorter/immediate notice allowed for:
   - Security threats or vulnerabilities
   - Misuse or abuse of service
   - Legal or regulatory requirements
   - Urgent technical issues
   - Terms violations

### 2.4 No Retrospective Charges
✅ **Explicit guarantee:** Never charge retrospectively for services previously provided free  
✅ New charges only apply from date of agreement going forward  

### 2.5 Your Options if the Programme Ends
✅ Four clear options provided:
   1. Continue with Arklens under new paid terms (requires agreement)
   2. Assume hosting/infrastructure costs directly
   3. Migrate website to another provider
   4. Discontinue the website

### 2.6 Agreement to Future Paid Services
✅ Explicit written agreement required before any charges  
✅ Must clearly communicate: pricing, services, start date, payment terms, how to decline  
✅ **No automatic conversion to paid service**

### 2.7 Domain Ownership
✅ Customer always retains domain ownership and control  
✅ Domain purchased through registrar of customer's choice  
✅ Can transfer domain at any time  

### 2.8 Third-Party Costs
✅ Clear list of costs that remain customer's responsibility:
   - Domain registration and renewal
   - Business email services
   - Premium APIs or integrations
   - External databases/storage
   - Premium software/plugins
   - Payment processing fees
   - SMS/voice/communication services

### 2.9 Migration and Technical Assistance
✅ Arklens provides reasonable technical assistance for migration:
   - Business content, customer-owned assets and business data
   - DNS configuration guidance
   - Handover support
   - Technical documentation

✅ States that Arklens source code, templates and reusable components are not automatically included (see 5.5)
✅ Clarifies Arklens not responsible for migration itself

### 2.10 Fair Use: No Resale or White-Labelling (added October 2026)
✅ Programme is for the participating business's own use
✅ Not for obtaining development work for resale, white-labelling, supplying another company's client, transferring to unrelated third parties, incorporating Arklens code into another provider's offering, or circumventing paid work
✅ Arklens may reject, suspend or discontinue participation

### Section 3: Service Exit (updated October 2026)
✅ Standard exit deliverable renamed to **Customer Asset Package**: content, customer-owned media, business/customer data, page URL list, DNS settings
✅ Source code, templates, components, design systems and the compiled build excluded unless agreed under 5.5
✅ Standard handover remains free; source-code arrangements may involve a fee

### Section 5: Intellectual Property (rewritten October 2026)
✅ 5.1 What the customer owns (domains, provided logos/images/text, business data, customer data)
✅ 5.2 What Arklens owns (source code, templates, components, design systems, frameworks, automation scripts, deployment systems, internal tools, reusable AI/workflow components)
✅ 5.3 Customer receives only the rights needed to use the website as provided; no resale, white-labelling or transfer without written agreement
✅ 5.4 Open-source and third-party components remain under their own licences
✅ 5.5 Source-code transfer, Migration Package, licence expansion or IP buyout only by separate written agreement, may involve a fee

---

## 🚫 What's NOT in the Terms (As Requested)

❌ No "free forever" language anywhere  
❌ No promises of indefinite continuation  
❌ No guarantees of permanent free service  
❌ No invented legal entity details  

---

## 📄 Other Legal Sections Included

The Terms also include standard sections (not rewritten, newly created):

1. **Acceptance of Terms** - Agreement to terms by using service
2. **Use of Services** - Acceptable use policy
3. **Intellectual Property** - Rights to customer content vs. Arklens technology
4. **Data Protection and Privacy** - Links to Privacy Policy
5. **Service Availability** - No guarantee of uninterrupted service
6. **Limitation of Liability** - Standard liability limits under Swiss law
7. **Termination** - How service can be terminated
8. **Changes to Terms** - How terms may be updated
9. **Governing Law and Jurisdiction** - Swiss law applies
10. **Contact Information** - How to reach Arklens

---

## ⚠️ Legal Review Requirements

**Two prominent warnings added:**

1. **Top of page (amber alert box):**
   > "These Terms of Use are provided as a template and must be reviewed by a qualified Swiss legal advisor before being used in production."

2. **Bottom of page (gray notice box):**
   > "These Terms of Use must be reviewed and approved by a qualified Swiss legal advisor before use in production. This template should be adapted to accurately reflect your business practices, legal entity structure, and compliance with all applicable Swiss and European regulations including data protection (FADP/GDPR), consumer protection, and contract law."

---

## 🌍 Language Support

✅ Full English/French bilingual support (lang variable controls content)  
✅ All section headings translated  
✅ All body content translated  
✅ Dynamic date formatting per language  

---

## 🎯 Key Design Principles Followed

1. **Plain, understandable language** - Written for Swiss SMEs, not lawyers
2. **Clear structure** - Numbered sections with descriptive subsections
3. **Customer-friendly tone** - Explains options, not just restrictions
4. **Transparency** - Honest about programme limitations and changes
5. **Fairness** - Protects customer from retrospective charges
6. **Practical guidance** - Lists specific examples and options

---

## 📱 Integration

✅ Added to Footer navigation under "Legal" section  
✅ Consistent styling with other legal pages (legal.astro, privacy.astro)  
✅ Responsive design verified  
✅ Accessible to all screen sizes  

---

## 🔄 Update Path

To update Terms in production:

1. Have Swiss legal advisor review and modify terms.astro
2. Update placeholders: [Company details to be confirmed]
3. Remove or customize warning boxes once legally approved
4. Update "Last updated" date
5. Consider adding version number for change tracking
6. Notify existing users of material changes via email

---

## 📊 File Structure

```
src/pages/
  ├── terms.astro       ← NEW (Terms of Use)
  ├── privacy.astro     ← Existing (Privacy Policy)
  └── legal.astro       ← Existing (Legal Notice)

src/components/
  └── Footer.astro      ← Updated (added Terms link)
```

---

## ✅ Deployment

**URL:** https://e01a2fc4.arklens.pages.dev/terms  
**Status:** ✅ Live  
**Pages Generated:** 5 (index, start, legal, privacy, terms)  
**Build:** Clean (0 errors, 0 warnings)  

---

## 🎯 Next Steps (Before Production)

1. **Legal Review:** Engage Swiss legal advisor to review terms
2. **Entity Details:** Add actual company registration details
3. **Customize:** Adjust any sections for your specific business model
4. **Version Control:** Consider adding version numbers or effective dates
5. **User Notification:** Plan how to notify existing users of terms
6. **Acceptance Flow:** Consider adding "accept terms" checkbox to /start form
7. **Archive:** Keep dated versions of terms for historical reference

---

## 📝 Key Phrases for SEO/Reference

The Terms page includes these important customer-friendly phrases:

- "Free Website Programme"
- "60 days' notice"
- "no retrospective charges"
- "you always retain domain ownership"
- "reasonable technical assistance with migration"
- "explicit agreement required before any charges"
- "third-party costs remain your responsibility"

---

## Conclusion

✅ **Complete Terms of Use created with comprehensive Free Website Programme section**  
✅ **All requested principles clearly defined**  
✅ **Plain language appropriate for Swiss SMEs**  
✅ **No "free forever" promises**  
✅ **Marked for Swiss legal review**  
✅ **Ready for legal advisor customization**

The Terms provide clear, fair, and transparent conditions for the Free Website Programme while protecting both Arklens and customers.
