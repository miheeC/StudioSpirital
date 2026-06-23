# Studio Spirital Website — Design Spec

**Date:** 2026-06-22
**Project:** Static website for Studio Spirital, Ptuj, Slovenia
**Instagram:** @studiospirital

---

## Overview

A static, 3-page website presenting Studio Spirital — a wellness and spiritual studio in Ptuj, Slovenia, run by Elina and Maja. The site has no booking functionality; it presents services, price lists, and contact information (phone numbers). Images are sourced from their Instagram account.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — studio overview, services grid, price list, team preview |
| `elina.html` | Elina's personal page |
| `maja.html` | Maja's personal page |

---

## Language

- **Default:** Slovenian
- **Toggle:** SL / EN switch in the navigation, implemented with JavaScript using `data-sl` / `data-en` attributes on text nodes
- All content authored in both languages inline in the HTML

---

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-cream` | `#F5EFE6` | Page background, section backgrounds |
| `--bg-white` | `#FFFDF9` | Card backgrounds |
| `--bg-dark` | `#3A2820` | Footer |
| `--brown-deep` | `#5C4033` | Primary text, nav background |
| `--brown-mid` | `#8B6E5A` | Secondary text |
| `--terracotta` | `#C17F5E` | Accent, CTAs, left border on service cards |
| `--sand` | `#D4A97A` | Secondary accent, price text |
| `--brown-section` | `#8B4E2F` | Hero gradient end |

### Typography
- **Headings:** Georgia (serif) — letter-spacing 2–3px, uppercase labels
- **Body:** System sans-serif (or Lato/Inter via Google Fonts)
- **Italic quotes:** Georgia italic for personal bios

### Spacing & Shape
- Sections: `padding: 28–32px`
- Cards/sections: `border-radius: 8px`
- CTA buttons: `border-radius: 24px` (pill shape)
- Section label style: `10px, letter-spacing: 3px, uppercase, color: --terracotta`

---

## Home Page (`index.html`)

### Sections (top to bottom)

1. **Fixed Navigation**
   - Left: Studio Spirital logo/name (links to `index.html`)
   - Center: anchor links — O nas · Storitve · Cenik · Ekipa
   - Right: SL | EN language toggle

2. **Hero**
   - Full-screen height, background Instagram photo of the studio/atmosphere
   - Overlay gradient: `--terracotta` → `--brown-section`
   - Content: location ("Ptuj, Slovenija"), studio name, tagline ("Masaže · Reiki · Gibanje · Duša")
   - No booking button — contact info in footer

3. **About Studio** (`#o-nas`)
   - Short bio paragraph (from Instagram pinned post)
   - One studio photo (right-aligned)

4. **Services Grid** (`#storitve`)
   - 6-card grid, 3 columns on desktop / 2 on mobile
   - Services: Masaže, Reiki, Elivital®, Meditacije, Ples, Kanaliziranje
   - Each card: emoji icon, service name, short description

5. **Price List** (`#cenik`)
   - Dark background (`--brown-deep`)
   - Table-style rows: service name · duration · price in `--sand`
   - Prices to be filled in by client

6. **Meet the Team** (`#ekipa`)
   - Two portrait cards side by side → link to `elina.html` and `maja.html`
   - Each card: circular photo, name, specialties, "Spoznaj →" button

7. **Footer**
   - Studio name + location
   - Phone number(s) — **to be provided by client**
   - Links: Instagram, Facebook

---

## Subpages (`elina.html` / `maja.html`)

Both pages share the same structure, with different content.

### Sections (top to bottom)

1. **Navigation** — same as home, with "← Studio Spirital" back link on left

2. **Hero**
   - Large portrait photo (right side), gradient overlay left
   - Name in large serif type
   - Her specialties as subtitle

3. **About** (`O Elini` / `O Maji`)
   - Personal quote in italic
   - Bio paragraph

4. **Services & Price List**
   - Cards with left terracotta border accent
   - Each: service name, description, duration, price

5. **Gallery**
   - 4-photo grid from her Instagram posts

6. **Contact**
   - Gradient background (`--terracotta` → `--sand`)
   - Phone number (pill button)
   - Instagram link

7. **Footer** — same as home

---

### Elina's Content
- **Specialties:** Reiki, Meditacije, Kanaliziranje, Vadba
- **Bio source:** Instagram pinned post — "Elina v svet prinaša nežnost, intuicijo in globino. Kot medij ustvarja meditacije, izvaja individualna kanaliziranja, vodi vadbe ter reiki terapije."
- **Services:** Reiki terapija, Individualno kanaliziranje, Meditacija & vadba (Elivital® praksa), outdoor classes Mon/Thu in Ptuj city park

### Maja's Content
- **Specialties:** Masaže, Ples
- **Bio source:** Instagram pinned post — "Maja v Studio Spirital prinaša gibanje, dotik in življenjsko energijo. Ustvarja delavnice latina in intuitivnega plesa, skozi masaže telesa in obraza pa pomaga sproščati napetosti."
- **Services:** Masaža hrbta, Glow masaža obraza (ventuse + maderoterapija), Latinski & intuitivni ples

---

## Images

Sourced from Instagram (@studiospirital) using Playwright during build. Images downloaded to `/images/` directory:
- `images/hero.jpg` — studio atmosphere photo
- `images/elina-portrait.jpg` — Elina portrait
- `images/maja-portrait.jpg` — Maja portrait
- `images/gallery-elina-1..4.jpg` — Elina's Instagram photos
- `images/gallery-maja-1..4.jpg` — Maja's Instagram photos

---

## Technical Notes

- Pure HTML + CSS + minimal vanilla JS (language toggle only)
- No frameworks, no build tools — fully static
- Mobile responsive via CSS Grid and media queries
- Language toggle: JS reads `data-sl` / `data-en` attributes and swaps text on click; default state = Slovenian
- Navigation smooth-scroll to anchor sections on home page
- Prices are hardcoded text — client updates HTML directly to change prices

---

## Out of Scope

- No booking/reservation system
- No contact form (phone number only)
- No CMS or admin panel
- No animations beyond CSS transitions on hover
