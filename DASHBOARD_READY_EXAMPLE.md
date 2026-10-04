# Dashboard-Ready Website Structure Example

**Practical implementation guide for building customer websites that work with both manual updates (MVP) and future dashboard**

---

## Example Customer: Restaurant Bella Vista

Domain: `bellavista-zurich.ch`  
Business: Italian restaurant in Zurich  
Current: Manual updates via Arklens  
Future: Self-service dashboard

---

## Repository Structure

```
customer-bellavista/
├── README.md                    # Customer notes
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.toml
├── src/
│   ├── data/                    # ← All editable business data
│   │   ├── business.json        # Business info
│   │   ├── services.json        # Menu/services
│   │   ├── hours.json           # Opening hours
│   │   ├── contact.json         # Contact details
│   │   ├── social.json          # Social links
│   │   ├── team.json            # Staff (optional)
│   │   └── cta.json             # Call-to-action buttons
│   ├── components/              # Reusable UI components
│   │   ├── BusinessHours.astro
│   │   ├── ServiceList.astro
│   │   ├── ContactInfo.astro
│   │   └── SocialLinks.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── menu.astro           # Menu page
│   │   └── contact.astro        # Contact page
│   └── styles/
│       └── global.css
└── public/
    ├── uploads/                 # ← Customer-uploaded images
    │   ├── logo.png
    │   ├── hero.jpg
    │   ├── menu/
    │   │   ├── pasta.jpg
    │   │   └── pizza.jpg
    │   └── gallery/
    │       ├── interior-1.jpg
    │       └── interior-2.jpg
    └── favicon.svg
```

---

## Data Files (Editable by Dashboard)

### src/data/business.json

```json
{
  "$schema": "../schemas/business.schema.json",
  "name": "Restaurant Bella Vista",
  "tagline": "Authentic Italian cuisine in the heart of Zurich",
  "description": "Family-owned restaurant serving traditional Italian dishes since 1995. We use fresh, locally-sourced ingredients and make our pasta by hand every day. Come experience the warmth of Italian hospitality.",
  "logo": "/uploads/logo.png",
  "heroImage": "/uploads/hero.jpg",
  "brandColor": "#c41e3a",
  "languages": ["de", "en"],
  "establishedYear": 1995,
  "cuisine": ["Italian", "Mediterranean"],
  "features": ["Vegetarian options", "Gluten-free available", "Outdoor seating", "Wheelchair accessible"]
}
```

### src/data/services.json

```json
{
  "$schema": "../schemas/services.schema.json",
  "services": [
    {
      "id": "lunch",
      "name": {
        "de": "Mittagsmenü",
        "en": "Lunch Menu"
      },
      "shortDescription": {
        "de": "Frische tägliche Mittagsmenüs",
        "en": "Fresh daily lunch specials"
      },
      "description": {
        "de": "Montag bis Freitag, 11:30 - 14:30. Drei-Gänge-Menü mit saisonalen Zutaten.",
        "en": "Monday to Friday, 11:30 - 14:30. Three-course menu with seasonal ingredients."
      },
      "price": "CHF 25",
      "image": "/uploads/menu/lunch.jpg",
      "active": true,
      "order": 1,
      "tags": ["popular", "weekday"]
    },
    {
      "id": "dinner",
      "name": {
        "de": "À la carte Abendessen",
        "en": "À la carte Dinner"
      },
      "shortDescription": {
        "de": "Traditionelle italienische Abendkarte",
        "en": "Traditional Italian dinner menu"
      },
      "description": {
        "de": "Große Auswahl an Antipasti, Pasta, Fleisch- und Fischgerichten.",
        "en": "Extensive selection of antipasti, pasta, meat and fish dishes."
      },
      "price": "From CHF 35",
      "image": "/uploads/menu/dinner.jpg",
      "active": true,
      "order": 2,
      "tags": ["evening"]
    },
    {
      "id": "catering",
      "name": {
        "de": "Event-Catering",
        "en": "Event Catering"
      },
      "shortDescription": {
        "de": "Catering für Ihre besonderen Anlässe",
        "en": "Catering for your special events"
      },
      "description": {
        "de": "Private Feiern, Firmenveranstaltungen, Hochzeiten. Individuelle Menüs verfügbar.",
        "en": "Private events, corporate functions, weddings. Custom menus available."
      },
      "price": {
        "de": "Auf Anfrage",
        "en": "On request"
      },
      "image": "/uploads/menu/catering.jpg",
      "active": true,
      "order": 3,
      "tags": ["events"]
    }
  ]
}
```

### src/data/hours.json

```json
{
  "$schema": "../schemas/hours.schema.json",
  "timezone": "Europe/Zurich",
  "regularHours": {
    "monday": {
      "open": "11:30",
      "close": "22:00",
      "closed": false,
      "splitShift": false
    },
    "tuesday": {
      "open": "11:30",
      "close": "22:00",
      "closed": false,
      "splitShift": false
    },
    "wednesday": {
      "open": "11:30",
      "close": "22:00",
      "closed": false,
      "splitShift": false
    },
    "thursday": {
      "open": "11:30",
      "close": "22:00",
      "closed": false,
      "splitShift": false
    },
    "friday": {
      "open": "11:30",
      "close": "23:00",
      "closed": false,
      "splitShift": false
    },
    "saturday": {
      "open": "17:00",
      "close": "23:00",
      "closed": false,
      "splitShift": false
    },
    "sunday": {
      "closed": true
    }
  },
  "specialHours": [
    {
      "date": "2026-12-24",
      "note": {
        "de": "Heiligabend - Geschlossen",
        "en": "Christmas Eve - Closed"
      },
      "closed": true
    },
    {
      "date": "2026-12-25",
      "note": {
        "de": "Weihnachtstag - Geschlossen",
        "en": "Christmas Day - Closed"
      },
      "closed": true
    },
    {
      "date": "2026-12-31",
      "open": "17:00",
      "close": "01:00",
      "note": {
        "de": "Silvester - Spezielle Öffnungszeiten",
        "en": "New Year's Eve - Special hours"
      },
      "closed": false
    }
  ],
  "notes": {
    "de": "Die Küche schließt 30 Minuten vor Geschäftsschluss",
    "en": "Kitchen closes 30 minutes before closing time"
  }
}
```

### src/data/contact.json

```json
{
  "$schema": "../schemas/contact.schema.json",
  "email": "info@bellavista-zurich.ch",
  "phone": "+41 44 123 45 67",
  "whatsapp": "+41 79 123 45 67",
  "address": {
    "street": "Bahnhofstrasse 123",
    "city": "Zurich",
    "postalCode": "8001",
    "canton": "ZH",
    "country": "Switzerland"
  },
  "coordinates": {
    "latitude": 47.3769,
    "longitude": 8.5417
  },
  "bookingUrl": "https://booking-system.example.com/bellavista",
  "menuPdfUrl": "/uploads/menu.pdf",
  "formEmails": {
    "general": "info@bellavista-zurich.ch",
    "reservations": "bookings@bellavista-zurich.ch",
    "events": "events@bellavista-zurich.ch"
  }
}
```

### src/data/social.json

```json
{
  "$schema": "../schemas/social.schema.json",
  "facebook": "https://facebook.com/bellavistazurich",
  "instagram": "https://instagram.com/bellavistazurich",
  "tripadvisor": "https://tripadvisor.com/restaurant/bellavista-zurich",
  "googleMaps": "https://maps.google.com/?cid=123456789",
  "linkedin": null,
  "twitter": null,
  "youtube": null
}
```

### src/data/team.json (Optional)

```json
{
  "$schema": "../schemas/team.schema.json",
  "showTeam": true,
  "members": [
    {
      "id": "mario",
      "name": "Mario Rossi",
      "role": {
        "de": "Küchenchef",
        "en": "Head Chef"
      },
      "bio": {
        "de": "30 Jahre Erfahrung in der italienischen Küche",
        "en": "30 years experience in Italian cuisine"
      },
      "photo": "/uploads/team/mario.jpg",
      "order": 1,
      "active": true
    },
    {
      "id": "giulia",
      "name": "Giulia Bianchi",
      "role": {
        "de": "Restaurantleiterin",
        "en": "Restaurant Manager"
      },
      "bio": {
        "de": "Sorgt dafür, dass sich jeder Gast wie zu Hause fühlt",
        "en": "Ensuring every guest feels at home"
      },
      "photo": "/uploads/team/giulia.jpg",
      "order": 2,
      "active": true
    }
  ]
}
```

### src/data/cta.json

```json
{
  "$schema": "../schemas/cta.schema.json",
  "primary": {
    "text": {
      "de": "Tisch reservieren",
      "en": "Reserve a Table"
    },
    "url": "/contact",
    "type": "internal",
    "style": "primary",
    "icon": "calendar"
  },
  "secondary": {
    "text": {
      "de": "Menü ansehen",
      "en": "View Menu"
    },
    "url": "/menu.pdf",
    "type": "download",
    "style": "secondary",
    "icon": "document"
  }
}
```

---

## Component Implementation

### src/components/BusinessHours.astro

```astro
---
import hours from '@data/hours.json';

interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const { regularHours, specialHours, notes, timezone } = hours;

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayNames = {
  de: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

// Check if there's a special hour for today
const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
const todaySpecial = specialHours?.find(sh => sh.date === today);
---

<section class="business-hours">
  <h2>{lang === 'en' ? 'Opening Hours' : 'Öffnungszeiten'}</h2>
  
  {todaySpecial && (
    <div class="special-notice bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="font-semibold text-yellow-800">
        {todaySpecial.note[lang]}
      </p>
    </div>
  )}
  
  <ul class="hours-list space-y-2">
    {daysOfWeek.map((day, index) => {
      const dayHours = regularHours[day];
      const dayName = dayNames[lang][index];
      
      return (
        <li class="flex justify-between items-center py-2 border-b border-neutral-200">
          <span class="day font-medium text-neutral-900">{dayName}</span>
          {dayHours.closed ? (
            <span class="closed text-neutral-500">{lang === 'en' ? 'Closed' : 'Geschlossen'}</span>
          ) : (
            <span class="time text-neutral-700">{dayHours.open} - {dayHours.close}</span>
          )}
        </li>
      );
    })}
  </ul>
  
  {notes && notes[lang] && (
    <p class="notes text-sm text-neutral-600 mt-4 italic">
      {notes[lang]}
    </p>
  )}
  
  {specialHours && specialHours.length > 0 && (
    <details class="mt-4">
      <summary class="cursor-pointer text-sm text-primary-600 hover:text-primary-700">
        {lang === 'en' ? 'Special hours' : 'Besondere Öffnungszeiten'}
      </summary>
      <ul class="mt-2 space-y-1 text-sm">
        {specialHours.map(special => (
          <li class="text-neutral-600">
            {new Date(special.date).toLocaleDateString(lang === 'de' ? 'de-CH' : 'en-GB')}: {special.note[lang]}
          </li>
        ))}
      </ul>
    </details>
  )}
</section>
```

### src/components/ServiceList.astro

```astro
---
import services from '@data/services.json';

interface Props {
  lang?: 'de' | 'en';
  featured?: boolean;
}

const { lang = 'de', featured = false } = Astro.props;

// Only show active services
let displayServices = services.services.filter(s => s.active);

// Sort by order
displayServices = displayServices.sort((a, b) => a.order - b.order);

// If featured, only show services with 'popular' tag
if (featured) {
  displayServices = displayServices.filter(s => s.tags?.includes('popular'));
}
---

<section class="services">
  <h2>{lang === 'en' ? 'Our Services' : 'Unsere Angebote'}</h2>
  
  <div class="service-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {displayServices.map(service => (
      <div class="service-card bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
        {service.image && (
          <img 
            src={service.image} 
            alt={service.name[lang]} 
            class="w-full h-48 object-cover"
          />
        )}
        <div class="p-6">
          <h3 class="text-heading-md mb-2 text-neutral-900">
            {service.name[lang]}
          </h3>
          <p class="text-sm text-neutral-600 mb-3">
            {service.shortDescription[lang]}
          </p>
          <p class="text-neutral-700 mb-4">
            {service.description[lang]}
          </p>
          {service.price && (
            <p class="price font-semibold text-primary-600">
              {typeof service.price === 'string' ? service.price : service.price[lang]}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
</section>
```

### src/components/ContactInfo.astro

```astro
---
import contact from '@data/contact.json';
import social from '@data/social.json';
import { Phone, Mail, MapPin, ExternalLink } from '@lucide/astro';

interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
---

<section class="contact-info">
  <h2>{lang === 'en' ? 'Contact Us' : 'Kontakt'}</h2>
  
  <div class="grid md:grid-cols-2 gap-8">
    <div class="contact-details space-y-4">
      <div class="flex items-start space-x-3">
        <Phone size={24} class="text-primary-600 mt-1" stroke-width={2} />
        <div>
          <p class="font-semibold text-neutral-900">
            {lang === 'en' ? 'Phone' : 'Telefon'}
          </p>
          <a 
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            class="text-primary-600 hover:text-primary-700"
          >
            {contact.phone}
          </a>
        </div>
      </div>
      
      <div class="flex items-start space-x-3">
        <Mail size={24} class="text-primary-600 mt-1" stroke-width={2} />
        <div>
          <p class="font-semibold text-neutral-900">Email</p>
          <a 
            href={`mailto:${contact.email}`}
            class="text-primary-600 hover:text-primary-700"
          >
            {contact.email}
          </a>
        </div>
      </div>
      
      <div class="flex items-start space-x-3">
        <MapPin size={24} class="text-primary-600 mt-1" stroke-width={2} />
        <div>
          <p class="font-semibold text-neutral-900">
            {lang === 'en' ? 'Address' : 'Adresse'}
          </p>
          <p class="text-neutral-700">
            {contact.address.street}<br />
            {contact.address.postalCode} {contact.address.city}<br />
            {contact.address.country}
          </p>
        </div>
      </div>
      
      {contact.bookingUrl && (
        <div class="mt-6">
          <a 
            href={contact.bookingUrl} 
            class="inline-flex items-center btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {lang === 'en' ? 'Book a Table' : 'Tisch reservieren'}
            <ExternalLink size={20} class="ml-2" stroke-width={2} />
          </a>
        </div>
      )}
    </div>
    
    <div class="map">
      {contact.coordinates && (
        <iframe
          width="100%"
          height="300"
          style="border:0"
          loading="lazy"
          allowfullscreen
          src={`https://www.google.com/maps?q=${contact.coordinates.latitude},${contact.coordinates.longitude}&output=embed`}
        ></iframe>
      )}
    </div>
  </div>
  
  {(social.facebook || social.instagram || social.tripadvisor) && (
    <div class="social-links mt-8 pt-8 border-t border-neutral-200">
      <p class="font-semibold text-neutral-900 mb-4">
        {lang === 'en' ? 'Follow Us' : 'Folgen Sie uns'}
      </p>
      <div class="flex space-x-4">
        {social.facebook && (
          <a 
            href={social.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-neutral-600 hover:text-primary-600"
          >
            Facebook
          </a>
        )}
        {social.instagram && (
          <a 
            href={social.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-neutral-600 hover:text-primary-600"
          >
            Instagram
          </a>
        )}
        {social.tripadvisor && (
          <a 
            href={social.tripadvisor} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-neutral-600 hover:text-primary-600"
          >
            TripAdvisor
          </a>
        )}
      </div>
    </div>
  )}
</section>
```

---

## Page Implementation

### src/pages/index.astro

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import business from '@data/business.json';
import cta from '@data/cta.json';
import BusinessHours from '@components/BusinessHours.astro';
import ServiceList from '@components/ServiceList.astro';
import ContactInfo from '@components/ContactInfo.astro';

const lang = 'de'; // Or detect from URL/browser
---

<BaseLayout 
  title={business.name}
  description={business.tagline}
  lang={lang}
>
  <!-- Hero Section -->
  <section class="hero relative h-screen">
    <img 
      src={business.heroImage} 
      alt={business.name}
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center text-white">
      <h1 class="text-display-lg mb-6">{business.name}</h1>
      <p class="text-body-lg mb-8 max-w-2xl">{business.tagline}</p>
      <div class="flex space-x-4">
        <a href={cta.primary.url} class="btn btn-primary btn-lg">
          {cta.primary.text[lang]}
        </a>
        {cta.secondary && (
          <a href={cta.secondary.url} class="btn btn-secondary btn-lg">
            {cta.secondary.text[lang]}
          </a>
        )}
      </div>
    </div>
  </section>
  
  <!-- About Section -->
  <section class="py-16 bg-white">
    <div class="container-custom">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-display-sm mb-6">
          {lang === 'en' ? 'About Us' : 'Über uns'}
        </h2>
        <p class="text-body-lg text-neutral-700">
          {business.description}
        </p>
        {business.establishedYear && (
          <p class="mt-4 text-neutral-600">
            {lang === 'en' ? `Established in ${business.establishedYear}` : `Gegründet ${business.establishedYear}`}
          </p>
        )}
      </div>
    </div>
  </section>
  
  <!-- Services Section -->
  <section class="py-16 bg-neutral-50">
    <div class="container-custom">
      <ServiceList lang={lang} featured={true} />
    </div>
  </section>
  
  <!-- Opening Hours Section -->
  <section class="py-16 bg-white">
    <div class="container-custom max-w-3xl">
      <BusinessHours lang={lang} />
    </div>
  </section>
  
  <!-- Contact Section -->
  <section class="py-16 bg-neutral-50">
    <div class="container-custom">
      <ContactInfo lang={lang} />
    </div>
  </section>
</BaseLayout>
```

---

## Manual Update Example (MVP)

### Customer Request

**Email from customer:**

> Subject: Update - New Service
>
> Hi Arklens,
>
> We'd like to add a new service to our website:
>
> **Service Name:** Weekend Brunch  
> **Short Description:** Delicious brunch every Saturday and Sunday  
> **Full Description:** Join us for our new weekend brunch menu featuring fresh pastries, eggs benedict, pancakes, and Italian coffee specialties. Available Saturday and Sunday, 10:00 - 14:00.  
> **Price:** CHF 35 per person  
> **Image:** (attached: brunch.jpg)
>
> Also, please update our Saturday opening hours to start at 10:00 instead of 17:00.
>
> Thanks!  
> Mario

### Arklens Updates

**Step 1: Add image**
```bash
cd customer-bellavista/public/uploads/menu/
# Save attached brunch.jpg
```

**Step 2: Update services.json**
```json
{
  "services": [
    // ... existing services ...
    {
      "id": "brunch",
      "name": {
        "de": "Wochenend-Brunch",
        "en": "Weekend Brunch"
      },
      "shortDescription": {
        "de": "Köstlicher Brunch jeden Samstag und Sonntag",
        "en": "Delicious brunch every Saturday and Sunday"
      },
      "description": {
        "de": "Besuchen Sie uns für unser neues Wochenend-Brunch-Menü mit frischen Backwaren, Eggs Benedict, Pancakes und italienischen Kaffeespezialitäten. Verfügbar Samstag und Sonntag, 10:00 - 14:00.",
        "en": "Join us for our new weekend brunch menu featuring fresh pastries, eggs benedict, pancakes, and Italian coffee specialties. Available Saturday and Sunday, 10:00 - 14:00."
      },
      "price": "CHF 35",
      "image": "/uploads/menu/brunch.jpg",
      "active": true,
      "order": 4,
      "tags": ["new", "weekend"]
    }
  ]
}
```

**Step 3: Update hours.json**
```json
{
  "regularHours": {
    // ... other days ...
    "saturday": {
      "open": "10:00",  // Changed from 17:00
      "close": "23:00",
      "closed": false,
      "splitShift": false
    }
  }
}
```

**Step 4: Deploy**
```bash
npm run build
wrangler pages deploy dist --project-name=customer-bellavista
git add .
git commit -m "Add Weekend Brunch service, update Saturday hours"
git push origin main
```

**Step 5: Confirm with customer**

> Subject: Re: Update - New Service
>
> Hi Mario,
>
> Your website has been updated:
> ✓ Added Weekend Brunch service with image
> ✓ Updated Saturday opening hours to 10:00
>
> Please review: https://bellavista-zurich.ch
>
> Let me know if you'd like any adjustments!
>
> Best regards,  
> Arklens Team

---

## Future Dashboard Update (Same Result)

### Customer Uses Dashboard

**Step 1: Login**
- Customer visits: dashboard.arklens.ch
- Enters email and password
- Sees dashboard for Bella Vista

**Step 2: Add Service**
- Clicks: "Services" in navigation
- Clicks: "+ Add Service" button
- Fills form:
  - Name (DE): "Wochenend-Brunch"
  - Name (EN): "Weekend Brunch"
  - Short description (both languages)
  - Full description (both languages)
  - Price: "CHF 35"
  - Upload image: brunch.jpg
  - Active: ✓
  - Tags: weekend, new
- Clicks: "Save"

**Step 3: Update Hours**
- Clicks: "Opening Hours" in navigation
- Updates Saturday: Open: 10:00
- Clicks: "Save"

**Step 4: Publish**
- Reviews changes in preview
- Clicks: "Publish Now"
- Sees: "Publishing... estimated 2-3 minutes"
- Receives email: "Your website has been published"
- Clicks: "View Site" to verify

**Total time:** 5-10 minutes, no Arklens involvement needed.

---

## Key Benefits of This Architecture

### For MVP (Manual Updates)

✅ **Simple data files** - Easy for Arklens team to edit  
✅ **Version control** - All changes tracked in Git  
✅ **Validation** - JSON schemas prevent errors  
✅ **Fast updates** - Edit JSON, deploy, done  
✅ **Clear structure** - Easy to find what to change  

### For Future Dashboard

✅ **API-ready** - Data files can be updated via API  
✅ **No rebuilding** - Same architecture works with dashboard  
✅ **Validated input** - Forms use same JSON schemas  
✅ **Instant preview** - Data changes visible immediately  
✅ **Customer-friendly** - Business info, not code  

### For Customers

✅ **No technical knowledge** - Manage business info only  
✅ **Fast updates** - Manual (hours) or instant (dashboard)  
✅ **Always accurate** - Update hours, services, contact anytime  
✅ **No vendor lock-in** - Data exports cleanly  
✅ **Progressive enhancement** - Start manual, move to dashboard when ready  

---

## Transition Timeline

### Month 1-3: MVP
- Manual updates via email
- Arklens edits JSON files
- Deploy manually
- Document customer update patterns

### Month 3-6: API Development
- Build simple update API
- Email-to-API integration
- Automated deployments
- Customer receives instant confirmations

### Month 6-12: Dashboard Beta
- Build dashboard UI
- Limited beta with selected customers
- Gather feedback
- Iterate on UX

### Month 12+: Dashboard Production
- Full dashboard launch
- All customers invited
- Self-service updates
- Arklens focuses on complex features

---

**Document Version:** 1.0  
**Last Updated:** September 27, 2026  
**Example Customer:** Restaurant Bella Vista (demonstration only)  
**Related Documents:**
- CUSTOMER_MANAGEMENT_MODEL.md (full architecture)
- OPERATIONS_GUIDE.md (manual update procedures)
