# Arklens Customer Website Template

This template provides a complete, data-driven website structure for Arklens customers. All customer-specific content is managed through JSON files in `src/data/`.

## Quick Start

1. **Clone this template** for your customer
2. **Update JSON files** in `src/data/` with customer information
3. **Add images** to `public/images/`
4. **Deploy** to Cloudflare Pages

## Architecture

### Data-Driven Design
All customer content lives in JSON files. This allows:
- ✅ Simple manual updates (MVP)
- ✅ Future API integration
- ✅ Self-service dashboard (Phase 3)
- ✅ No code changes needed for content updates

### File Structure

```
customer-template/
├── src/
│   ├── data/              # All customer content (JSON)
│   │   ├── business.json  # Business info, branding
│   │   ├── services.json  # Services/products offered
│   │   ├── hours.json     # Opening hours, schedules
│   │   ├── contact.json   # Contact details, location
│   │   ├── social.json    # Social media links
│   │   ├── team.json      # Team members (optional)
│   │   └── cta.json       # Call-to-action settings
│   ├── components/        # Reusable UI components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Website pages
│   └── styles/            # Global styles
├── public/
│   └── images/            # Customer images
├── package.json           # Dependencies
├── astro.config.mjs       # Astro configuration
└── tsconfig.json          # TypeScript configuration
```

## Data Files Guide

### 1. business.json
Core business information and branding.

```json
{
  "name": "Business Name",
  "tagline": "Short tagline",
  "description": "Longer description of the business",
  "logo": "/images/logo.png",
  "brandColor": "#0070e0",
  "languages": ["en", "fr"],
  "defaultLanguage": "en"
}
```

### 2. services.json
Services or products offered.

```json
{
  "services": [
    {
      "id": "service-1",
      "name": "Service Name",
      "description": "Service description",
      "price": "CHF 50",
      "image": "/images/services/service-1.jpg",
      "active": true,
      "order": 1,
      "category": "category-name"
    }
  ]
}
```

### 3. hours.json
Business hours and special schedules.

```json
{
  "regularHours": {
    "monday": { "open": "09:00", "close": "18:00", "closed": false },
    "tuesday": { "open": "09:00", "close": "18:00", "closed": false },
    "wednesday": { "open": "09:00", "close": "18:00", "closed": false },
    "thursday": { "open": "09:00", "close": "18:00", "closed": false },
    "friday": { "open": "09:00", "close": "18:00", "closed": false },
    "saturday": { "open": "10:00", "close": "16:00", "closed": false },
    "sunday": { "open": "", "close": "", "closed": true }
  },
  "specialHours": [
    {
      "date": "2024-12-25",
      "description": "Christmas Day",
      "closed": true
    }
  ],
  "timezone": "Europe/Zurich",
  "notes": "Additional notes about hours"
}
```

### 4. contact.json
Contact information and location.

```json
{
  "email": "info@customer.ch",
  "phone": "+41 XX XXX XX XX",
  "address": {
    "street": "Street Name 123",
    "city": "City",
    "postalCode": "1234",
    "country": "Switzerland"
  },
  "coordinates": {
    "lat": 46.9480,
    "lng": 7.4474
  },
  "bookingUrl": "https://booking.customer.ch"
}
```

### 5. social.json
Social media and review platform links.

```json
{
  "facebook": "https://facebook.com/customer",
  "instagram": "https://instagram.com/customer",
  "tripadvisor": "https://tripadvisor.com/customer",
  "googleMaps": "https://maps.google.com/customer",
  "linkedin": "",
  "twitter": ""
}
```

### 6. team.json (Optional)
Team member profiles.

```json
{
  "showTeam": true,
  "members": [
    {
      "id": "member-1",
      "name": "Full Name",
      "role": "Position",
      "bio": "Short biography",
      "image": "/images/team/member-1.jpg",
      "email": "member@customer.ch",
      "active": true,
      "order": 1
    }
  ]
}
```

### 7. cta.json
Call-to-action configuration.

```json
{
  "primary": {
    "text": "Book Now",
    "url": "/contact",
    "enabled": true
  },
  "secondary": {
    "text": "Learn More",
    "url": "/services",
    "enabled": true
  },
  "banner": {
    "enabled": false,
    "text": "Special offer text",
    "linkText": "Details",
    "linkUrl": "/offers"
  }
}
```

## Updating Customer Content

### Manual Updates (MVP - Current)

1. **Receive update request** from customer via email
2. **Edit JSON files** in `src/data/` with new information
3. **Commit changes** to Git
4. **Deploy** to Cloudflare Pages (automatic)

### Future: Self-Service Dashboard (Phase 3)

Customers will update their content through a simple web interface:
- No technical knowledge required
- Real-time preview
- Automatic deployment
- No access to Cloudflare/Git needed

## Image Management

### Image Locations

- **Logo**: `public/images/logo.png`
- **Hero images**: `public/images/hero/`
- **Service images**: `public/images/services/`
- **Team photos**: `public/images/team/`
- **Gallery**: `public/images/gallery/`

### Image Guidelines

- **Format**: WebP preferred (fallback to JPG/PNG)
- **Hero images**: 1920x1080px minimum
- **Service images**: 800x600px minimum
- **Team photos**: 400x400px (square)
- **Logo**: SVG preferred, PNG with transparency as fallback
- **Optimization**: Always optimize images before upload

## Deployment

### Cloudflare Pages Setup

Each customer gets their own Cloudflare Pages project:

```bash
# Initial setup
wrangler pages project create customer-name

# Deploy
npm run build
wrangler pages deploy dist --project-name=customer-name --branch=main
```

### Custom Domain

Customers manage their own DNS:

1. **Customer adds CNAME** to their DNS: `www.customer.ch → customer-name.pages.dev`
2. **Arklens adds custom domain** in Cloudflare Pages dashboard
3. **SSL certificate** issued automatically by Cloudflare

## Development

### Local Development

```bash
npm install
npm run dev
```

Open http://localhost:4321

### Build

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Ownership Model

### Customer Owns
- ✅ **Domain name** (customer.ch)
- ✅ **Business content** (text, images, data)
- ✅ **Customer data** (contact lists, bookings)
- ✅ **Brand assets** (logos, photos)

### Arklens Manages
- 🔧 **Hosting infrastructure** (Cloudflare Pages)
- 🔧 **Website codebase** (Astro framework)
- 🔧 **Deployments** (updates, maintenance)
- 🔧 **Technical support** (troubleshooting, optimization)

## Support

### For Arklens Team
- See `OPERATIONS_GUIDE.md` for onboarding/deployment procedures
- See `TECHNICAL_ARCHITECTURE.md` for architecture details
- See `CUSTOMER_MANAGEMENT_MODEL.md` for update workflow

### For Customers
- See `CUSTOMER_OWNERSHIP_GUIDE.md` for plain-language ownership explanation
- Contact Arklens team for content updates
- Manage your own domain DNS

## Migration Path

### Free Website Programme End
If the Free Website Programme ends, customers have 60 days to:
1. **Continue with paid hosting** (Arklens-managed)
2. **Export data and migrate** (Arklens assists)
3. **Self-host** (receive full codebase)
4. **Switch to another provider** (data export provided)

See Terms of Use for full details.

## License

- **Code**: Licensed to customer as part of service
- **Customer content**: Owned by customer
- **Arklens branding**: Removed upon handover

---

**Template Version**: 1.0.0  
**Last Updated**: 2026-09-26  
**Maintained by**: Arklens Team
