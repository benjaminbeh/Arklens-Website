# JSON Schema Documentation

This directory contains JSON schemas for validating customer data files. All schemas follow [JSON Schema Draft 07](https://json-schema.org/draft-07/json-schema-release-notes.html).

## Purpose

Schemas ensure:
- ✅ **Data integrity** - Required fields are present
- ✅ **Format validation** - URLs, emails, colors are correctly formatted
- ✅ **Type safety** - Numbers are numbers, booleans are booleans
- ✅ **Consistency** - IDs follow naming conventions
- ✅ **Prevention** - Catch errors before deployment

## Validation

### Automatic Validation

Run before every deployment:

```bash
npm run validate
```

This validates all JSON files in `src/data/` against their schemas.

### Manual Validation

Validate a specific file:

```bash
node scripts/validate-data.js
```

### In Editor

VS Code users get automatic validation:
1. Install **JSON Schema Validator** extension
2. Schemas are auto-detected via `$schema` property
3. Errors highlighted in real-time

## Schema Files

### business.json

Validates core business information.

**Required fields:**
- `name` - Business name (1-100 characters)
- `tagline` - Short slogan (1-150 characters)
- `description` - Longer description (1-500 characters)
- `brandColor` - Hex color (e.g., `#0070e0`)
- `languages` - Array of language codes (`["en", "fr"]`)
- `defaultLanguage` - Default language code (`"en"`)

**Optional fields:**
- `logo` - Path to logo image
- `founded` - Year founded (YYYY)
- `email` - Primary email (validated format)
- `phone` - Primary phone (validated format)

### services.json

Validates services/products offered.

**Structure:**
- `services` array (required)
  - `id` - Unique identifier (lowercase, hyphens)
  - `name` - Service name (string or multilingual object)
  - `description` - Service description (string or multilingual object)
  - `price` - Price string (e.g., `"CHF 50"`)
  - `priceNote` - Optional note (e.g., `"per hour"`)
  - `image` - Path to service image
  - `active` - Boolean (is service currently offered?)
  - `order` - Integer (display order, 1 = first)
  - `category` - Category identifier
  - `features` - Array of features (optional)

- `categories` array (optional)
  - `id` - Category identifier
  - `name` - Category name (string or multilingual object)

**Multilingual support:**
```json
{
  "name": {
    "en": "English name",
    "fr": "Nom français"
  }
}
```

Or simple string:
```json
{
  "name": "Service name"
}
```

### hours.json

Validates business hours and schedules.

**Required fields:**
- `regularHours` - Object with days of week
  - Each day has: `open`, `close`, `closed`
  - Times in `HH:MM` format (24-hour)
- `timezone` - IANA timezone (e.g., `"Europe/Zurich"`)

**Optional fields:**
- `specialHours` - Array of special dates
  - `date` - Date in `YYYY-MM-DD` format
  - `description` - What's special (string or multilingual)
  - `closed` - Boolean
  - `open`, `close` - Override hours (optional)
- `notes` - Additional notes (string or multilingual)

**Example:**
```json
{
  "regularHours": {
    "monday": { "open": "09:00", "close": "18:00", "closed": false },
    "sunday": { "open": "", "close": "", "closed": true }
  },
  "specialHours": [
    {
      "date": "2024-12-25",
      "description": "Christmas Day",
      "closed": true
    }
  ],
  "timezone": "Europe/Zurich"
}
```

### contact.json

Validates contact information and location.

**Required fields:**
- `email` - Email address (validated format)
- `phone` - Phone number (validated format)
- `address` - Object with:
  - `street` - Street address
  - `city` - City name
  - `postalCode` - Swiss postal code (4 digits)
  - `country` - Country name

**Optional fields:**
- `whatsapp` - WhatsApp number
- `coordinates` - Lat/lng object (Switzerland range validated)
- `bookingUrl` - Online booking URL
- `contactForm` - Form configuration object

**Example:**
```json
{
  "email": "info@business.ch",
  "phone": "+41 31 123 45 67",
  "address": {
    "street": "Bundesplatz 1",
    "city": "Bern",
    "postalCode": "3000",
    "country": "Switzerland"
  },
  "coordinates": {
    "lat": 46.9480,
    "lng": 7.4474
  }
}
```

### social.json

Validates social media and review platform links.

**All fields optional:**
- `facebook` - Facebook page URL
- `instagram` - Instagram profile URL
- `tripadvisor` - TripAdvisor listing URL
- `googleMaps` - Google Maps listing URL
- `linkedin` - LinkedIn page URL
- `twitter` - Twitter/X profile URL
- `youtube` - YouTube channel URL
- `tiktok` - TikTok profile URL
- `pinterest` - Pinterest profile URL

**URL validation:**
Each platform validates correct domain format.

**Example:**
```json
{
  "facebook": "https://facebook.com/mybusiness",
  "instagram": "https://instagram.com/mybusiness",
  "tripadvisor": "",
  "googleMaps": "https://google.com/maps/place/mybusiness"
}
```

### team.json

Validates team member profiles (optional feature).

**Required fields:**
- `showTeam` - Boolean (display team section?)
- `members` - Array of team members
  - `id` - Unique identifier
  - `name` - Full name
  - `role` - Job title (string or multilingual)
  - `active` - Boolean (currently active?)
  - `order` - Display order integer

**Optional fields per member:**
- `bio` - Biography (string or multilingual)
- `image` - Path to photo
- `email` - Member email
- `phone` - Member phone
- `social` - Object with `linkedin`, `twitter` URLs

**Example:**
```json
{
  "showTeam": true,
  "members": [
    {
      "id": "maria-schmidt",
      "name": "Maria Schmidt",
      "role": "Owner & Head Chef",
      "bio": "20 years of culinary experience...",
      "image": "/images/team/maria.jpg",
      "active": true,
      "order": 1
    }
  ]
}
```

### cta.json

Validates call-to-action configuration.

**Required fields:**
- `primary` - Primary CTA button
  - `text` - Button text (string or multilingual)
  - `url` - Target URL
  - `enabled` - Boolean (show button?)
  - `style` - `"solid"`, `"outline"`, or `"ghost"`

**Optional fields:**
- `secondary` - Secondary CTA button (same structure)
- `banner` - Promotional banner
  - `enabled` - Boolean
  - `text` - Banner message (string or multilingual)
  - `linkText` - Link text (string or multilingual)
  - `linkUrl` - Link URL
  - `dismissible` - Boolean (can user dismiss?)
  - `backgroundColor` - Hex color
  - `textColor` - Hex color

**Example:**
```json
{
  "primary": {
    "text": "Book Now",
    "url": "/contact",
    "enabled": true,
    "style": "solid"
  },
  "banner": {
    "enabled": false
  }
}
```

## Common Patterns

### Multilingual Fields

Many text fields support both simple strings and multilingual objects:

**Simple (monolingual):**
```json
{
  "name": "Service Name"
}
```

**Multilingual:**
```json
{
  "name": {
    "en": "Service Name",
    "fr": "Nom du Service",
    "de": "Dienstname",
    "it": "Nome del Servizio"
  }
}
```

Choose based on customer needs. Multilingual objects allow targeting multiple language audiences.

### IDs and Identifiers

All IDs must be:
- Lowercase
- Alphanumeric with hyphens
- Unique within their scope

**Good:** `premium-massage`, `member-1`, `holiday-special`  
**Bad:** `Premium Massage`, `member 1`, `holiday_special`

### Image Paths

All images must:
- Start with `/images/`
- Have valid extension: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- Match actual file location in `public/images/`

**Example:** `/images/services/massage-therapy.jpg`

### Colors

Colors must be in hex format: `#RRGGBB`

**Valid:** `#0070e0`, `#FF5733`, `#000000`  
**Invalid:** `0070e0`, `rgb(0,112,224)`, `blue`

### Dates and Times

**Dates:** `YYYY-MM-DD` format  
**Times:** `HH:MM` format (24-hour)  
**Timezones:** IANA format (e.g., `Europe/Zurich`)

## Validation Errors

### Common Errors

**Missing required field:**
```
❌ business.json - Invalid
   - : must have required property 'brandColor'
```
**Fix:** Add the required field.

**Invalid format:**
```
❌ contact.json - Invalid
   - /email: must match format "email"
```
**Fix:** Ensure email is properly formatted: `user@domain.com`

**Pattern mismatch:**
```
❌ services.json - Invalid
   - /services/0/id: must match pattern "^[a-z0-9-]+$"
```
**Fix:** Use only lowercase letters, numbers, and hyphens in IDs.

**Type mismatch:**
```
❌ hours.json - Invalid
   - /regularHours/monday/closed: must be boolean
```
**Fix:** Use `true` or `false`, not `"true"` or `1`.

## Extending Schemas

### Adding New Fields

1. **Edit schema file** in `schemas/`
2. **Add property definition**:
   ```json
   {
     "properties": {
       "newField": {
         "type": "string",
         "description": "Description of new field"
       }
     }
   }
   ```
3. **Update if required**:
   ```json
   {
     "required": ["existingField", "newField"]
   }
   ```
4. **Run validation** to test

### Schema Versioning

When making breaking changes:
1. Document in `CHANGELOG.md`
2. Provide migration guide
3. Update all customer data files
4. Test thoroughly before deployment

## Tools

### JSON Schema Validator (VS Code)

Install extension for real-time validation:
```
ext install jtjoo.json-schema-validator
```

### Online Validators

- [JSONSchemaLint](https://jsonschemalint.com/)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)

### Command Line

```bash
# Validate all data files
npm run validate

# Check specific file
node -e "require('./scripts/validate-data.js')"
```

## Support

### For Arklens Team

Questions about schemas? Contact the development team.

### For Future Dashboard

These schemas will power the self-service dashboard:
- Form field validation
- Real-time error messages
- Type-ahead suggestions
- Automatic formatting

---

**Schema Version**: 1.0.0  
**JSON Schema Draft**: 07  
**Last Updated**: 2026-09-26  
**Maintained by**: Arklens Development Team
