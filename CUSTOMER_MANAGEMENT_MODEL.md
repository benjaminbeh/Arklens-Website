# Customer Website Management Model

**Version:** 1.0  
**Date:** September 27, 2026  
**Status:** MVP Architecture with Future Dashboard Preparation

---

## Core Principle

**Customers manage their business information. Arklens manages the technology.**

Customers should update their business details without understanding:
- ❌ Cloudflare
- ❌ DNS
- ❌ Git
- ❌ Astro
- ❌ Deployment pipelines
- ❌ SSL/TLS
- ❌ Workers

---

## Management Model Evolution

### Phase 1: MVP - Manual Updates (Current)

**How it works:**
1. Customer emails Arklens with change request
2. Arklens team makes the change
3. Arklens deploys update
4. Customer approves result

**Customer experience:**
- Send email: "Please update opening hours to..."
- Receive confirmation: "Updated, please review"
- No technical knowledge required

**Included in Free Website Programme:**
- Initial website build
- One revision round during setup
- Basic updates during first month

**Paid service (future):**
- Ongoing text updates
- Opening hours changes
- Image replacements
- New services/pages
- Additional languages

### Phase 2: Self-Service Dashboard (Future)

**How it works:**
1. Customer logs into Arklens Dashboard
2. Customer updates business information in forms
3. Customer clicks "Publish"
4. Website rebuilds and deploys automatically

**Customer experience:**
- Login to dashboard
- Update business info in simple forms
- Click "Publish"
- Website live in 2-3 minutes

**No technical knowledge required** - just business information management.

---

## Data Architecture (Dashboard-Ready)

### Structured Business Data

All customer business information stored in structured data files that can be edited manually (MVP) or via dashboard (future):

```
customer-a/
├── src/
│   ├── data/
│   │   ├── business.json          # Business name, description, branding
│   │   ├── services.json          # Services offered
│   │   ├── hours.json             # Opening hours
│   │   ├── contact.json           # Contact details
│   │   ├── social.json            # Social media links
│   │   ├── team.json              # Team members
│   │   └── cta.json               # Calls to action
│   ├── content/
│   │   ├── about.md               # About page content
│   │   ├── services/              # Service detail pages
│   │   │   ├── service-1.md
│   │   │   └── service-2.md
│   │   └── legal/
│   │       ├── privacy.md
│   │       └── terms.md
│   └── pages/
│       ├── index.astro            # Consumes data/*.json
│       ├── services.astro
│       └── contact.astro
└── public/
    └── uploads/
        ├── logo.png
        ├── hero-image.jpg
        └── gallery/
            ├── image-1.jpg
            ├── image-2.jpg
            └── image-3.jpg
```

### Example Data Files

**src/data/business.json**
```json
{
  "name": "Restaurant Bella Vista",
  "tagline": "Authentic Italian cuisine in the heart of Zurich",
  "description": "Family-owned restaurant serving traditional Italian dishes since 1995. Fresh ingredients, homemade pasta, and warm hospitality.",
  "logo": "/uploads/logo.png",
  "brandColor": "#c41e3a",
  "languages": ["de", "en"]
}
```

**src/data/services.json**
```json
{
  "services": [
    {
      "id": "lunch",
      "name": "Lunch Menu",
      "shortDescription": "Fresh daily lunch specials",
      "description": "Monday to Friday, 11:30 - 14:30. Three-course menu with seasonal ingredients.",
      "price": "CHF 25",
      "image": "/uploads/services/lunch.jpg",
      "active": true
    },
    {
      "id": "dinner",
      "name": "À la carte Dinner",
      "shortDescription": "Traditional Italian dinner menu",
      "description": "Extensive selection of antipasti, pasta, meat and fish dishes.",
      "price": "From CHF 35",
      "image": "/uploads/services/dinner.jpg",
      "active": true
    },
    {
      "id": "catering",
      "name": "Event Catering",
      "shortDescription": "Catering for your special events",
      "description": "Private events, corporate functions, weddings. Custom menus available.",
      "price": "On request",
      "image": "/uploads/services/catering.jpg",
      "active": true
    }
  ]
}
```

**src/data/hours.json**
```json
{
  "timezone": "Europe/Zurich",
  "regularHours": {
    "monday": { "open": "11:30", "close": "22:00", "closed": false },
    "tuesday": { "open": "11:30", "close": "22:00", "closed": false },
    "wednesday": { "open": "11:30", "close": "22:00", "closed": false },
    "thursday": { "open": "11:30", "close": "22:00", "closed": false },
    "friday": { "open": "11:30", "close": "23:00", "closed": false },
    "saturday": { "open": "17:00", "close": "23:00", "closed": false },
    "sunday": { "closed": true }
  },
  "specialHours": [
    {
      "date": "2026-12-24",
      "note": "Christmas Eve - Closed",
      "closed": true
    },
    {
      "date": "2026-12-25",
      "note": "Christmas Day - Closed",
      "closed": true
    }
  ],
  "notes": "Kitchen closes 30 minutes before closing time"
}
```

**src/data/contact.json**
```json
{
  "email": "info@bellavista-zurich.ch",
  "phone": "+41 44 123 45 67",
  "address": {
    "street": "Bahnhofstrasse 123",
    "city": "Zurich",
    "postalCode": "8001",
    "country": "Switzerland"
  },
  "coordinates": {
    "latitude": 47.3769,
    "longitude": 8.5417
  },
  "bookingUrl": "https://booking-system.example.com/bellavista",
  "formEmail": "bookings@bellavista-zurich.ch"
}
```

**src/data/social.json**
```json
{
  "facebook": "https://facebook.com/bellavistazurich",
  "instagram": "https://instagram.com/bellavistazurich",
  "tripadvisor": "https://tripadvisor.com/restaurant/bellavista-zurich",
  "googleMaps": "https://maps.google.com/?cid=123456789"
}
```

**src/data/team.json**
```json
{
  "members": [
    {
      "id": "mario",
      "name": "Mario Rossi",
      "role": "Head Chef",
      "bio": "30 years experience in Italian cuisine",
      "photo": "/uploads/team/mario.jpg",
      "order": 1
    },
    {
      "id": "giulia",
      "name": "Giulia Bianchi",
      "role": "Restaurant Manager",
      "bio": "Ensuring every guest feels at home",
      "photo": "/uploads/team/giulia.jpg",
      "order": 2
    }
  ]
}
```

**src/data/cta.json**
```json
{
  "primary": {
    "text": "Reserve a Table",
    "url": "/contact",
    "type": "internal"
  },
  "secondary": {
    "text": "View Menu",
    "url": "/menu.pdf",
    "type": "download"
  }
}
```

---

## Website Component Architecture

### Data-Driven Components

All components consume structured data, never hardcoded content:

**src/components/BusinessHours.astro**
```astro
---
import hours from '@data/hours.json';

const { regularHours, specialHours, notes } = hours;
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Check if there's a special hour for today
const today = new Date().toISOString().split('T')[0];
const todaySpecial = specialHours?.find(sh => sh.date === today);
---

<section class="hours">
  <h2>Opening Hours</h2>
  
  {todaySpecial && (
    <div class="special-notice">
      <strong>{todaySpecial.note}</strong>
    </div>
  )}
  
  <ul>
    {daysOfWeek.map(day => {
      const dayHours = regularHours[day];
      return (
        <li>
          <span class="day">{day}</span>
          {dayHours.closed ? (
            <span class="closed">Closed</span>
          ) : (
            <span class="time">{dayHours.open} - {dayHours.close}</span>
          )}
        </li>
      );
    })}
  </ul>
  
  {notes && <p class="notes">{notes}</p>}
</section>
```

**src/components/ServiceList.astro**
```astro
---
import services from '@data/services.json';

// Only show active services
const activeServices = services.services.filter(s => s.active);
---

<section class="services">
  <h2>Our Services</h2>
  
  <div class="service-grid">
    {activeServices.map(service => (
      <div class="service-card">
        {service.image && (
          <img src={service.image} alt={service.name} />
        )}
        <h3>{service.name}</h3>
        <p class="short-desc">{service.shortDescription}</p>
        <p class="description">{service.description}</p>
        {service.price && (
          <p class="price">{service.price}</p>
        )}
      </div>
    ))}
  </div>
</section>
```

**src/components/ContactInfo.astro**
```astro
---
import contact from '@data/contact.json';
import social from '@data/social.json';
---

<section class="contact">
  <h2>Contact Us</h2>
  
  <div class="contact-details">
    <div class="phone">
      <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
        {contact.phone}
      </a>
    </div>
    
    <div class="email">
      <a href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    </div>
    
    <div class="address">
      <p>{contact.address.street}</p>
      <p>{contact.address.postalCode} {contact.address.city}</p>
      <p>{contact.address.country}</p>
    </div>
    
    {contact.bookingUrl && (
      <div class="booking">
        <a href={contact.bookingUrl} class="btn-primary">
          Book a Table
        </a>
      </div>
    )}
  </div>
  
  <div class="social-links">
    {social.facebook && (
      <a href={social.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
    )}
    {social.instagram && (
      <a href={social.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    )}
    {social.tripadvisor && (
      <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer">
        TripAdvisor
      </a>
    )}
  </div>
</section>
```

### Benefits of This Architecture

✅ **Dashboard-ready:** Data files can be updated by API  
✅ **Clean separation:** Business data separate from code  
✅ **Version control:** Changes tracked in Git  
✅ **Type safety:** JSON schemas validate data structure  
✅ **Easy manual edits:** Arklens team can edit JSON files in MVP  
✅ **Future-proof:** Dashboard updates same files without code changes  

---

## Current Change Process (MVP)

### Customer Requests Update

**Example email from customer:**

> Subject: Update opening hours
> 
> Hi Arklens,
> 
> Please update our opening hours:
> - Monday to Friday: 11:30 - 22:00
> - Saturday: 17:00 - 23:00
> - Sunday: Closed
> 
> Also, please add a note that the kitchen closes 30 minutes before closing.
> 
> Thanks,
> Mario

### Arklens Updates Data

```bash
# Navigate to customer repository
cd arklens-customers/customer-bellavista

# Edit opening hours
nano src/data/hours.json

# Update JSON:
{
  "regularHours": {
    "monday": { "open": "11:30", "close": "22:00", "closed": false },
    ...
  },
  "notes": "Kitchen closes 30 minutes before closing time"
}

# Test locally
npm run dev

# Build and deploy
npm run build
wrangler pages deploy dist --project-name=customer-bellavista

# Verify live site
curl -I https://bellavista-zurich.ch

# Commit changes
git add src/data/hours.json
git commit -m "Update opening hours per customer request"
git push origin main
```

### Arklens Confirms with Customer

> Subject: Re: Update opening hours
> 
> Hi Mario,
> 
> Opening hours have been updated on your website. Please review:
> https://bellavista-zurich.ch
> 
> Changes made:
> - Updated Monday-Friday hours to 11:30-22:00
> - Updated Saturday hours to 17:00-23:00
> - Confirmed Sunday closed
> - Added kitchen closing note
> 
> Let me know if you'd like any adjustments.
> 
> Best regards,
> Arklens Team

---

## Future Self-Service Dashboard

### Dashboard Architecture

```
Arklens Dashboard (Web Application)
├── Authentication (customer login)
├── Customer Data API
│   ├── GET /api/customer/{id}/business
│   ├── PUT /api/customer/{id}/business
│   ├── GET /api/customer/{id}/services
│   ├── PUT /api/customer/{id}/services
│   ├── ... (for all data files)
├── Image Upload Service
│   └── Upload to customer's /public/uploads/
├── Build Trigger Service
│   └── Trigger Cloudflare Pages deployment
└── Frontend (React/Vue/Svelte)
    └── Business information forms
```

### Dashboard User Interface (Mockup)

```
╔══════════════════════════════════════════════════════════════╗
║  Arklens Dashboard                              [Logout]     ║
╠══════════════════════════════════════════════════════════════╣
║                                                                ║
║  Restaurant Bella Vista                                        ║
║  https://bellavista-zurich.ch                    [View Site]  ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ Navigation                                               │ ║
║  │ ○ Business Information                                  │ ║
║  │ ○ Services                                              │ ║
║  │ ● Opening Hours           ← Currently viewing           │ ║
║  │ ○ Images                                                │ ║
║  │ ○ Contact Details                                       │ ║
║  │ ○ Social Links                                          │ ║
║  │ ○ Team Members                                          │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  Opening Hours                                                 ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ Monday      [11:30] to [22:00]        [x] Closed        │ ║
║  │ Tuesday     [11:30] to [22:00]        [ ] Closed        │ ║
║  │ Wednesday   [11:30] to [22:00]        [ ] Closed        │ ║
║  │ Thursday    [11:30] to [22:00]        [ ] Closed        │ ║
║  │ Friday      [11:30] to [23:00]        [ ] Closed        │ ║
║  │ Saturday    [17:00] to [23:00]        [ ] Closed        │ ║
║  │ Sunday      ─────────────────          [✓] Closed        │ ║
║  │                                                          │ ║
║  │ Additional Notes:                                        │ ║
║  │ [Kitchen closes 30 minutes before closing time________] │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  Special Hours (Holidays/Closures)                            ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 2026-12-24  [Christmas Eve - Closed    ]  [Remove]      │ ║
║  │ 2026-12-25  [Christmas Day - Closed    ]  [Remove]      │ ║
║  │                                           [+ Add Date]    │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  [Cancel]                      [Save Draft]  [Publish Now]    ║
║                                                                ║
║  Last published: 2026-09-20 14:30                             ║
║  Draft saved: 2026-09-27 10:15                                ║
╚══════════════════════════════════════════════════════════════╝
```

### Dashboard Sections

**1. Business Information**
- Business name
- Tagline
- Description
- Logo upload
- Brand color picker
- Languages offered

**2. Services**
- List of services
- Add/edit/remove services
- Service name, description, price
- Service image upload
- Active/inactive toggle

**3. Opening Hours**
- Regular hours per day
- Closed days
- Special hours (holidays, closures)
- Additional notes

**4. Images**
- Upload images
- Organize into galleries
- Set hero image
- Crop/resize tools
- Alt text for accessibility

**5. Contact Details**
- Email address
- Phone number
- Physical address
- Booking URL
- Form recipient email

**6. Social Links**
- Facebook, Instagram, LinkedIn
- TripAdvisor, Google Maps
- Other social platforms

**7. Team Members** (optional)
- Team member name, role, bio
- Photo upload
- Display order

**8. Calls to Action**
- Primary CTA (text, link)
- Secondary CTA (text, link)
- Button styles

### Dashboard Backend API

**Technology Options:**
- Cloudflare Workers (API endpoints)
- Cloudflare D1 (database for user auth, sessions)
- Customer data stored in Git repository or Cloudflare KV

**API Endpoints:**

```typescript
// GET customer business data
GET /api/v1/customers/{customerId}/data/business
Response: { ...business.json contents }

// UPDATE customer business data
PUT /api/v1/customers/{customerId}/data/business
Request: { ...updated business.json }
Response: { success: true }

// PUBLISH changes (trigger build)
POST /api/v1/customers/{customerId}/publish
Response: { 
  success: true, 
  deploymentId: "abc123",
  estimatedTime: "2-3 minutes"
}

// GET deployment status
GET /api/v1/customers/{customerId}/deployments/latest
Response: {
  status: "building" | "success" | "failed",
  url: "https://customer-domain.ch",
  timestamp: "2026-09-27T10:30:00Z"
}

// UPLOAD image
POST /api/v1/customers/{customerId}/uploads
Request: multipart/form-data (image file)
Response: { 
  success: true, 
  url: "/uploads/image-123.jpg" 
}
```

### How Dashboard Updates Work

**Flow:**

```
Customer logs in
    ↓
Dashboard loads current data from Git/API
    ↓
Customer edits opening hours in form
    ↓
Customer clicks "Save Draft"
    ↓
API saves changes to customer's data files
    ↓
Customer reviews changes
    ↓
Customer clicks "Publish Now"
    ↓
API commits changes to Git
    ↓
API triggers Cloudflare Pages build
    ↓
Website rebuilds with new data
    ↓
Website deploys (2-3 minutes)
    ↓
Customer receives notification: "Published"
    ↓
Customer clicks "View Site" to verify
```

**No technical knowledge required** - customer just fills forms and clicks "Publish".

---

## Data Storage Strategy

### Option 1: Git-Based (Recommended for MVP → Dashboard)

**Current (MVP):**
- Data files in Git repository
- Arklens manually edits and commits
- Standard Git workflow

**Future (Dashboard):**
- Dashboard API commits to Git via GitHub API
- Automated commit messages
- Full version history maintained
- Cloudflare Pages watches repo for changes

**Benefits:**
- ✅ Seamless transition from MVP to dashboard
- ✅ Full version history
- ✅ Easy rollback if needed
- ✅ Backup built-in
- ✅ No additional database needed

**Implementation:**
```typescript
// Dashboard API commits changes
async function updateCustomerData(customerId, dataType, newData) {
  const repoPath = `customers/${customerId}/src/data/${dataType}.json`;
  
  // Commit to GitHub via API
  await githubAPI.updateFile({
    path: repoPath,
    content: JSON.stringify(newData, null, 2),
    message: `Update ${dataType} via dashboard`,
    branch: 'main'
  });
  
  // Cloudflare Pages automatically detects commit and rebuilds
}
```

### Option 2: Database + Git Sync

**Storage:**
- Customer data in Cloudflare D1 database
- Dashboard reads/writes to D1
- Periodic sync to Git for version control
- Git acts as backup and source of truth

**Benefits:**
- ✅ Faster dashboard response
- ✅ More flexible querying
- ✅ Real-time updates possible

**Drawbacks:**
- ❌ More complex architecture
- ❌ Two sources of truth to sync
- ❌ Additional infrastructure

### Option 3: Cloudflare KV

**Storage:**
- Customer data in Cloudflare KV
- Dashboard updates KV
- Website reads from KV at build time or runtime
- Periodic backup to Git

**Benefits:**
- ✅ Very fast reads
- ✅ Global edge distribution

**Drawbacks:**
- ❌ Eventually consistent (not immediate)
- ❌ Less suitable for version history
- ❌ Additional infrastructure

**Recommendation:** Start with Option 1 (Git-based) for MVP → Dashboard continuity.

---

## Pricing Model for Changes

### Included in Free Website Programme

- Initial website build
- One revision round during setup
- One month of minor updates (text, hours, contact info)

### Paid Change Requests (Examples)

**Simple changes** (CHF 0 - 50):
- Update opening hours
- Change phone number or email
- Update service descriptions
- Add/remove social links
- Update team member information

**Medium changes** (CHF 50 - 150):
- Add new service
- Replace multiple images
- Update business description
- Add special hours or closures

**Complex changes** (CHF 150 - 500):
- Add new page
- Add additional language
- New integration (booking system, payment)
- Restructure services
- Custom feature

### Self-Service Dashboard (Future)

**Free tier:**
- Unlimited basic updates (hours, contact, services)
- Image uploads (reasonable limits)
- Publish changes yourself

**Paid tier:** (Optional for advanced features)
- Additional languages
- Advanced integrations
- Analytics dashboard
- A/B testing
- Priority support

**Dashboard enables:**
- Instant updates (no wait for Arklens)
- Unlimited changes (within service tier)
- Real-time preview before publishing
- Change history and rollback

---

## Technical Implementation Roadmap

### Phase 1: MVP (Current) - Manual Updates

**Timeframe:** Now - First 5-10 customers

**Implementation:**
- ✅ Data-driven architecture in place
- ✅ All business data in JSON files
- ✅ Components consume structured data
- ✅ Manual update workflow established

**Process:**
1. Customer emails change request
2. Arklens edits JSON files
3. Arklens deploys to Cloudflare Pages
4. Customer approves

**Effort:** ~15-30 minutes per update

### Phase 2: Simple API (5-20 customers)

**Timeframe:** After 10-20 customers

**Implementation:**
- [ ] Create API for common updates
- [ ] Email-based update interface (customer sends structured email)
- [ ] Automated parsing and validation
- [ ] Automated deployment trigger
- [ ] Customer notification on publish

**Example:**
```
Customer sends email:
To: updates@arklens.ch
Subject: Update - Opening Hours

Monday: 11:30-22:00
Tuesday: 11:30-22:00
...
```

API parses email, updates hours.json, deploys automatically.

**Effort:** ~5 minutes per update (mostly automated)

### Phase 3: Self-Service Dashboard (20+ customers)

**Timeframe:** After 20-50 customers

**Implementation:**
- [ ] Build Arklens Dashboard web app
- [ ] Customer authentication system
- [ ] Web forms for all business data types
- [ ] Image upload and management
- [ ] Draft/publish workflow
- [ ] Preview before publish
- [ ] Deployment status tracking
- [ ] Email notifications

**Technology Stack:**
- Frontend: React/Vue/Svelte + Tailwind CSS
- API: Cloudflare Workers
- Auth: Cloudflare Access or Auth0
- Database: Cloudflare D1 (user accounts, sessions)
- Storage: Git repositories (customer data)
- Deployment: Cloudflare Pages (dashboard itself)

**Customer Experience:**
1. Login to dashboard.arklens.ch
2. Edit business information in forms
3. Upload images via drag-and-drop
4. Click "Publish"
5. Website live in 2-3 minutes
6. Receive email confirmation

**Effort:** 0 minutes for Arklens (customer self-service)

---

## Dashboard Development Phases

### Phase 3A: Basic Dashboard

**Features:**
- Login/authentication
- View current business data
- Edit business information
- Edit opening hours
- Edit contact details
- Publish changes
- View deployment status

**MVP Dashboard:** Covers 80% of update requests

### Phase 3B: Image Management

**Features:**
- Upload images
- Image gallery
- Crop/resize tools
- Alt text editor
- Set hero/featured images

### Phase 3C: Advanced Features

**Features:**
- Service management (add/edit/remove)
- Team member management
- Multi-language content
- Change history and rollback
- Preview before publish
- Scheduled publishing

### Phase 3D: Analytics and Insights

**Features:**
- Website traffic dashboard
- Form submission tracking
- Popular services insights
- Visitor demographics
- Performance metrics

---

## Data Schema Validation

### JSON Schema for Validation

To ensure data consistency between manual edits and dashboard:

**schemas/business.schema.json**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "tagline", "description"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100
    },
    "tagline": {
      "type": "string",
      "maxLength": 200
    },
    "description": {
      "type": "string",
      "minLength": 50,
      "maxLength": 1000
    },
    "logo": {
      "type": "string",
      "pattern": "^/uploads/.*\\.(png|jpg|jpeg|svg)$"
    },
    "brandColor": {
      "type": "string",
      "pattern": "^#[0-9A-Fa-f]{6}$"
    },
    "languages": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["de", "fr", "it", "en"]
      },
      "minItems": 1,
      "maxItems": 4
    }
  }
}
```

**Validation in build process:**
```javascript
// validate-data.js
import Ajv from 'ajv';
import businessSchema from './schemas/business.schema.json';
import businessData from './src/data/business.json';

const ajv = new Ajv();
const validate = ajv.compile(businessSchema);

if (!validate(businessData)) {
  console.error('Invalid business data:', validate.errors);
  process.exit(1);
}
```

**Add to package.json:**
```json
{
  "scripts": {
    "validate": "node validate-data.js",
    "build": "npm run validate && astro build"
  }
}
```

**Benefits:**
- ✅ Prevents invalid data from breaking website
- ✅ Dashboard uses same schemas for form validation
- ✅ Consistent validation between manual and automated updates

---

## Customer Experience Comparison

### MVP Manual Updates

**Customer:**
1. Emails: "Please update opening hours"
2. Waits: 2-24 hours
3. Reviews: Checks updated website
4. Responds: "Looks good" or "Small adjustment needed"

**Pros:**
- ✅ No learning curve
- ✅ Personal service
- ✅ Included in free programme (limited scope)

**Cons:**
- ❌ Requires Arklens availability
- ❌ Wait time for updates
- ❌ May incur costs for frequent changes

### Future Dashboard

**Customer:**
1. Logs in: dashboard.arklens.ch
2. Updates: Changes opening hours in form
3. Publishes: Clicks "Publish" button
4. Confirms: Website live in 2-3 minutes

**Pros:**
- ✅ Instant updates (when customer wants)
- ✅ No wait for Arklens
- ✅ Unlimited changes (within tier)
- ✅ No technical knowledge required
- ✅ Preview before publishing

**Cons:**
- ❌ Customer must learn dashboard (one-time)
- ❌ May require paid tier for advanced features

---

## Security and Access Control

### Dashboard Authentication

**User roles:**
- **Owner:** Full access to all business data and publishing
- **Editor:** Can edit content but not publish
- **Viewer:** Read-only access

**Authentication methods:**
- Email + password with 2FA
- Magic links (passwordless)
- SSO for enterprise customers (future)

**Session management:**
- Secure session cookies
- Automatic logout after inactivity
- Device tracking for security

### API Security

**Access control:**
- Customer can only access their own data
- API keys per customer
- Rate limiting per customer
- Audit log of all changes

**Data validation:**
- JSON schema validation
- XSS prevention
- SQL injection prevention (if using DB)
- File upload restrictions (type, size)

---

## Migration Path: Manual → Dashboard

### For Existing Customers

**When dashboard launches:**

1. **Arklens notifies customers:**
   - "New feature: Manage your website yourself"
   - "Update opening hours, services, contact info instantly"
   - "No technical knowledge required"

2. **Customer receives invitation:**
   - Email with dashboard login link
   - Initial password or magic link
   - Quick start guide

3. **Customer onboarding:**
   - Login to dashboard
   - See current business information already loaded
   - Quick tutorial video (2 minutes)
   - Make first test update

4. **Gradual adoption:**
   - Customers can continue emailing Arklens
   - Or use dashboard when ready
   - Hybrid approach during transition

5. **Support available:**
   - Email support for dashboard questions
   - Video tutorials for common tasks
   - Help documentation

**No customer is forced to use dashboard** - both methods available during transition.

---

## Key Principles Summary

### Customer Experience

✅ **Simple:** Manage business info, not technology  
✅ **Fast:** Publish changes in minutes (dashboard) or hours (manual)  
✅ **Flexible:** Email updates (MVP) or self-service (dashboard)  
✅ **Safe:** Preview before publish, rollback available  
✅ **No learning curve:** Forms and buttons, not code  

### Technical Architecture

✅ **Data-driven:** All content in structured JSON files  
✅ **Dashboard-ready:** Same data files updated by API  
✅ **Version controlled:** Full history in Git  
✅ **Validated:** JSON schemas prevent errors  
✅ **Scalable:** Architecture supports 100+ customers  

### Business Model

✅ **Free website:** Initial build + limited updates  
✅ **Paid changes:** Manual updates beyond included scope  
✅ **Future dashboard:** Self-service with tiered pricing  
✅ **No lock-in:** Customer can export and migrate  

---

## Next Steps

### Immediate (MVP)
- ✅ Data-driven architecture implemented
- ✅ JSON data files structure defined
- ✅ Components consuming structured data
- [ ] Document JSON schemas for all data types
- [ ] Create validation scripts
- [ ] Test manual update workflow with first customer

### Short Term (5-20 customers)
- [ ] Build simple API for common updates
- [ ] Create customer update request form (web form → API)
- [ ] Automate deployment triggers
- [ ] Implement email notifications

### Medium Term (20+ customers)
- [ ] Design dashboard UI/UX
- [ ] Build dashboard authentication
- [ ] Implement dashboard Phase 3A (basic editing)
- [ ] Add image upload and management
- [ ] Launch beta with selected customers

### Long Term (50+ customers)
- [ ] Advanced dashboard features
- [ ] Analytics and insights
- [ ] Mobile app for dashboard
- [ ] WhiteAPI integrations for booking, payments

---

**Document Version:** 1.0  
**Last Updated:** September 27, 2026  
**Next Review:** After first 5 customers onboarded  
**Related Documents:**
- TECHNICAL_ARCHITECTURE.md (infrastructure)
- OPERATIONS_GUIDE.md (manual update procedures)
- CUSTOMER_OWNERSHIP_GUIDE.md (what customers own)
