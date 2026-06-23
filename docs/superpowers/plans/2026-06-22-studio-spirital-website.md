# Studio Spirital Static Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page static website for Studio Spirital (Ptuj, Slovenia) — a home page with studio overview, services grid, and price list, plus individual pages for Elina and Maja.

**Architecture:** Pure HTML + CSS + minimal vanilla JS. Three standalone HTML files sharing one stylesheet and one JS file. Language toggle (Slovenian default / English) implemented with `data-sl`/`data-en` attributes on short text nodes and `data-lang` + `hidden` on block elements. No build tools, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties + Grid), vanilla JS (ES6), Playwright MCP (image download only)

---

## File Structure

```
/Users/miheec/Desktop/website/
├── index.html
├── elina.html
├── maja.html
├── css/
│   └── styles.css
├── js/
│   └── lang.js
└── images/
    ├── hero.jpg
    ├── elina-portrait.jpg
    ├── maja-portrait.jpg
    ├── gallery-elina-1.jpg … gallery-elina-4.jpg
    └── gallery-maja-1.jpg … gallery-maja-4.jpg
```

---

### Task 1: Git init + directory scaffold + CSS foundation

**Files:**
- Create: `css/styles.css`
- Create: `js/lang.js` (empty)
- Create: `.gitignore`

- [ ] **Step 1: Initialize git and create directories**

```bash
cd /Users/miheec/Desktop/website
git init
mkdir -p css js images
touch js/lang.js
echo ".superpowers/" > .gitignore
echo ".DS_Store" >> .gitignore
```

- [ ] **Step 2: Create `css/styles.css` with all design tokens and shared styles**

```css
/* css/styles.css */
:root {
  --bg-cream: #F5EFE6;
  --bg-white: #FFFDF9;
  --bg-dark: #3A2820;
  --brown-deep: #5C4033;
  --brown-mid: #8B6E5A;
  --terracotta: #C17F5E;
  --sand: #D4A97A;
  --brown-section: #8B4E2F;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg-cream); color: var(--brown-deep); font-family: var(--font-sans); line-height: 1.6; }
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* ── SECTION LABEL ── */
.section-label {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 16px;
}

/* ── NAV ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: var(--brown-deep);
  color: var(--bg-cream);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 56px;
  gap: 24px;
}
.nav-logo {
  font-family: var(--font-serif);
  font-size: 15px;
  letter-spacing: 3px;
  color: var(--bg-cream);
  white-space: nowrap;
}
.nav-links { display: flex; gap: 28px; }
.nav-links a {
  font-size: 13px;
  letter-spacing: 1px;
  color: var(--bg-cream);
  opacity: 0.8;
  transition: opacity 0.2s;
}
.nav-links a:hover { opacity: 1; }
.lang-toggle {
  background: transparent;
  border: 1px solid var(--sand);
  color: var(--sand);
  font-size: 12px;
  letter-spacing: 1px;
  padding: 4px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.lang-toggle:hover { background: var(--sand); color: var(--brown-deep); }

/* ── HERO ── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  padding: 64px 64px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--terracotta) 0%, var(--brown-section) 100%);
  z-index: 0;
}
.hero-bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.35;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(92,64,51,0.85) 0%, rgba(92,64,51,0.2) 60%, transparent 100%);
  z-index: 1;
}
.hero-content { position: relative; z-index: 2; color: var(--bg-white); }
.hero-location {
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 8px;
}
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 6vw, 72px);
  font-weight: normal;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hero-tagline {
  font-family: var(--font-serif);
  font-size: 16px;
  font-style: italic;
  letter-spacing: 1px;
  opacity: 0.9;
}
.hero--person {
  height: 70vh;
  min-height: 420px;
}
.hero--person .hero-bg img { opacity: 0.5; }

/* ── SECTIONS ── */
.section { padding: 72px 64px; }
.section--cream { background: var(--bg-cream); }
.section--white { background: var(--bg-white); }
.section--dark { background: var(--brown-deep); color: var(--bg-cream); }
.section--dark .section-label { color: var(--sand); }

/* ── ABOUT (home) ── */
.about-inner {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 48px;
  align-items: center;
  max-width: 960px;
}
.about-heading {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: normal;
  line-height: 1.4;
  margin-bottom: 16px;
}
.about-text { font-size: 15px; color: var(--brown-mid); line-height: 1.8; }
.about-image { width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: 12px; }

/* ── SERVICES GRID ── */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 960px;
}
.service-card {
  background: var(--bg-white);
  border-radius: 12px;
  padding: 28px 24px;
  text-align: center;
}
.service-icon { font-size: 28px; margin-bottom: 12px; }
.service-name { font-family: var(--font-serif); font-size: 16px; color: var(--brown-deep); margin-bottom: 6px; }
.service-desc { font-size: 13px; color: var(--brown-mid); }

/* ── PRICE LIST ── */
.price-list { max-width: 720px; }
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid rgba(212,169,122,0.2);
  gap: 16px;
}
.price-row:last-child { border-bottom: none; }
.price-service { font-size: 15px; color: var(--bg-cream); }
.price-detail { font-size: 12px; color: var(--brown-mid); margin-top: 3px; }
.price-amount { font-family: var(--font-serif); font-size: 18px; color: var(--sand); white-space: nowrap; }

/* ── TEAM CARDS ── */
.team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 720px;
}
.team-card {
  background: var(--bg-white);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  border: 1px solid #E8D5C4;
  display: block;
  transition: transform 0.2s, box-shadow 0.2s;
}
.team-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(92,64,51,0.12); }
.team-photo {
  width: 100px; height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 16px;
  background: var(--sand);
}
.team-name { font-family: var(--font-serif); font-size: 22px; color: var(--brown-deep); margin-bottom: 8px; }
.team-specialties { font-size: 12px; color: var(--brown-mid); margin-bottom: 20px; line-height: 1.6; }
.btn-pill {
  display: inline-block;
  background: var(--terracotta);
  color: var(--bg-white);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 24px;
  border-radius: 24px;
  transition: background 0.2s;
}
.btn-pill:hover { background: var(--brown-section); }

/* ── FOOTER ── */
.footer {
  background: var(--bg-dark);
  color: var(--brown-mid);
  padding: 32px 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-brand { font-family: var(--font-serif); font-size: 14px; color: var(--bg-cream); letter-spacing: 2px; }
.footer-location { font-size: 12px; margin-top: 4px; }
.footer-links { display: flex; gap: 20px; font-size: 13px; }
.footer-links a { color: var(--brown-mid); transition: color 0.2s; }
.footer-links a:hover { color: var(--sand); }
.footer-contact { font-size: 13px; text-align: right; }
.footer-phone { color: var(--sand); margin-top: 4px; }

/* ── PERSON ABOUT ── */
.person-about { max-width: 720px; }
.person-quote {
  font-family: var(--font-serif);
  font-size: 20px;
  font-style: italic;
  color: var(--brown-deep);
  line-height: 1.7;
  margin-bottom: 20px;
  padding-left: 20px;
  border-left: 3px solid var(--terracotta);
}
.person-bio { font-size: 15px; color: var(--brown-mid); line-height: 1.8; }

/* ── SERVICE LIST (subpages) ── */
.service-list { display: flex; flex-direction: column; gap: 12px; max-width: 720px; }
.service-item {
  background: var(--bg-white);
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid var(--terracotta);
  gap: 16px;
}
.service-item-name { font-size: 15px; color: var(--brown-deep); margin-bottom: 4px; }
.service-item-detail { font-size: 13px; color: var(--brown-mid); }
.service-item-price { font-family: var(--font-serif); font-size: 18px; color: var(--terracotta); white-space: nowrap; }

/* ── GALLERY ── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  max-width: 960px;
}
.gallery-img { aspect-ratio: 1; object-fit: cover; border-radius: 8px; width: 100%; }

/* ── CONTACT ── */
.contact-section {
  background: linear-gradient(135deg, var(--terracotta), var(--sand));
  padding: 72px 64px;
  text-align: center;
}
.contact-title {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--bg-white);
  font-weight: normal;
  margin-bottom: 8px;
}
.contact-subtitle { font-size: 14px; color: rgba(255,253,249,0.85); font-style: italic; margin-bottom: 32px; }
.contact-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-white);
  color: var(--brown-deep);
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 28px;
  transition: transform 0.2s;
}
.contact-btn:hover { transform: translateY(-2px); }
.contact-btn--outline {
  background: transparent;
  color: var(--bg-white);
  border: 1px solid rgba(255,253,249,0.5);
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav { padding: 0 16px; }
  .nav-links { display: none; }
  .hero, .section, .footer, .contact-section { padding-left: 24px; padding-right: 24px; }
  .hero { padding-bottom: 48px; }
  .about-inner { grid-template-columns: 1fr; }
  .about-image { max-width: 280px; margin: 0 auto; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: 1fr; max-width: 360px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .footer { flex-direction: column; text-align: center; }
  .footer-contact { text-align: center; }
}
@media (max-width: 480px) {
  .services-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Verify file exists and is non-empty**

```bash
wc -l css/styles.css
```
Expected: 200+ lines

- [ ] **Step 4: Commit**

```bash
git add .gitignore css/styles.css js/lang.js
git commit -m "chore: project scaffold with CSS design system"
```

---

### Task 2: Language toggle (`js/lang.js`)

**Files:**
- Modify: `js/lang.js`

- [ ] **Step 1: Write `js/lang.js`**

```javascript
// js/lang.js
(function () {
  var STORAGE_KEY = 'ss-lang';
  var current = localStorage.getItem(STORAGE_KEY) || 'sl';

  function apply(lang) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Short inline text: swap textContent
    document.querySelectorAll('[data-sl]').forEach(function (el) {
      el.textContent = lang === 'sl' ? el.dataset.sl : el.dataset.en;
    });

    // Block elements: toggle visibility
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== lang;
    });

    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'sl' ? 'SL | EN' : 'EN | SL';
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(current);
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(current === 'sl' ? 'en' : 'sl');
      });
    }
  });
})();
```

- [ ] **Step 2: Commit**

```bash
git add js/lang.js
git commit -m "feat: SL/EN language toggle with localStorage persistence"
```

---

### Task 3: Download images from Instagram

**Files:**
- Create: all files under `images/`

Use the Playwright MCP tool to navigate to each Instagram post, find the image `src` URL from the DOM, then download with `curl`.

- [ ] **Step 1: Navigate to @studiospirital and identify post image URLs**

Using Playwright: go to `https://www.instagram.com/studiospirital/`, take a snapshot to see the post grid. Click individual posts to get full-size `<img src="...">` URLs from the lightbox.

Download the studio atmosphere photo as hero:
```bash
curl -L -A "Mozilla/5.0" -o images/hero.jpg "<url-of-studio-atmosphere-post>"
```

Download Elina's portrait:
```bash
curl -L -A "Mozilla/5.0" -o images/elina-portrait.jpg "<url-of-elina-post>"
```

Download Maja's portrait:
```bash
curl -L -A "Mozilla/5.0" -o images/maja-portrait.jpg "<url-of-maja-post>"
```

Download 4 posts featuring Elina's work (reiki, meditation, exercise):
```bash
curl -L -A "Mozilla/5.0" -o images/gallery-elina-1.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-elina-2.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-elina-3.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-elina-4.jpg "<url>"
```

Download 4 posts featuring Maja's work (massage, dance):
```bash
curl -L -A "Mozilla/5.0" -o images/gallery-maja-1.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-maja-2.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-maja-3.jpg "<url>"
curl -L -A "Mozilla/5.0" -o images/gallery-maja-4.jpg "<url>"
```

- [ ] **Step 2: Verify all images downloaded**

```bash
ls -lh images/
```
Expected: 11 jpg files, each > 20KB

- [ ] **Step 3: Commit**

```bash
git add images/
git commit -m "feat: add images sourced from @studiospirital Instagram"
```

---

### Task 4: `index.html` — nav + hero

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with shell, nav, and hero**

```html
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studio Spirital — Masaže, Reiki, Gibanje · Ptuj</title>
  <meta name="description" content="Studio Spirital je prostor za masaže, reiki, meditacije in gibanje v Ptuju.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">STUDIO SPIRITAL</a>
    <ul class="nav-links">
      <li><a href="#o-nas" data-sl="O nas" data-en="About">O nas</a></li>
      <li><a href="#storitve" data-sl="Storitve" data-en="Services">Storitve</a></li>
      <li><a href="#cenik" data-sl="Cenik" data-en="Prices">Cenik</a></li>
      <li><a href="#ekipa" data-sl="Ekipa" data-en="Team">Ekipa</a></li>
    </ul>
    <button class="lang-toggle" id="langToggle">SL | EN</button>
  </nav>

  <section class="hero">
    <div class="hero-bg">
      <img src="images/hero.jpg" alt="Studio Spirital">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-location" data-sl="Ptuj, Slovenija" data-en="Ptuj, Slovenia">Ptuj, Slovenija</p>
      <h1 class="hero-title">Studio Spirital</h1>
      <p class="hero-tagline" data-sl="Masaže · Reiki · Gibanje · Duša" data-en="Massage · Reiki · Movement · Soul">Masaže · Reiki · Gibanje · Duša</p>
    </div>
  </section>

  <script src="js/lang.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open index.html
```
Expected: full-screen hero with studio photo (or gradient fallback), dark fixed nav, language toggle button. Click toggle — nav link text switches language.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: index.html shell with nav and hero"
```

---

### Task 5: `index.html` — About + Services sections

**Files:**
- Modify: `index.html`

Insert the following before `<script src="js/lang.js">`.

- [ ] **Step 1: Add About and Services sections**

```html
  <!-- ABOUT -->
  <section id="o-nas" class="section section--white">
    <p class="section-label" data-sl="O studiu" data-en="About the studio">O studiu</p>
    <div class="about-inner">
      <div>
        <h2 class="about-heading">
          <span data-sl="Prostor, kjer se srečata telo in duša" data-en="A space where body and soul meet">Prostor, kjer se srečata telo in duša</span>
        </h2>
        <p class="about-text" data-lang="sl">Studio Spirital je prostor, ki sta ga ustvarili dve ženski z enim skupnim namenom — podpirati ljudi na poti k večjemu stiku s seboj. Skupaj ustvarjava prostor, kjer se srečujejo gibanje in mir, telo in duša, intuicija in prisotnost.</p>
        <p class="about-text" data-lang="en" hidden>Studio Spirital is a space created by two women with one shared purpose — supporting people on their path to a deeper connection with themselves. Together we create a space where movement and stillness, body and soul, intuition and presence meet.</p>
      </div>
      <img src="images/hero.jpg" alt="Studio Spirital" class="about-image">
    </div>
  </section>

  <!-- SERVICES -->
  <section id="storitve" class="section section--cream">
    <p class="section-label" data-sl="Naše storitve" data-en="Our services">Naše storitve</p>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">👐</div>
        <div class="service-name" data-sl="Masaže" data-en="Massages">Masaže</div>
        <div class="service-desc" data-sl="Telo & obraz" data-en="Body & face">Telo & obraz</div>
      </div>
      <div class="service-card">
        <div class="service-icon">✨</div>
        <div class="service-name">Reiki</div>
        <div class="service-desc" data-sl="Energijsko zdravljenje" data-en="Energy healing">Energijsko zdravljenje</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🌿</div>
        <div class="service-name">Elivital®</div>
        <div class="service-desc" data-sl="Joga + pilates + energija" data-en="Yoga + pilates + energy">Joga + pilates + energija</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🧘</div>
        <div class="service-name" data-sl="Meditacije" data-en="Meditations">Meditacije</div>
        <div class="service-desc" data-sl="Notranji mir" data-en="Inner peace">Notranji mir</div>
      </div>
      <div class="service-card">
        <div class="service-icon">💃</div>
        <div class="service-name" data-sl="Ples" data-en="Dance">Ples</div>
        <div class="service-desc" data-sl="Latin & intuitivni ples" data-en="Latin & intuitive dance">Latin & intuitivni ples</div>
      </div>
      <div class="service-card">
        <div class="service-icon">🌙</div>
        <div class="service-name" data-sl="Kanaliziranje" data-en="Channeling">Kanaliziranje</div>
        <div class="service-desc" data-sl="Individualne seje" data-en="Individual sessions">Individualne seje</div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open index.html
```
Expected: About section with photo, 6 service cards in 3-column grid. Language toggle switches all text. Smooth scroll from nav anchors works.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add About and Services sections to index.html"
```

---

### Task 6: `index.html` — Price List + Team + Footer

**Files:**
- Modify: `index.html`

Insert the following before `<script src="js/lang.js">`.

- [ ] **Step 1: Add Price List, Team, and Footer**

```html
  <!-- PRICE LIST -->
  <section id="cenik" class="section section--dark">
    <p class="section-label" data-sl="Cenik" data-en="Price list">Cenik</p>
    <div class="price-list">
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Masaža hrbta" data-en="Back massage">Masaža hrbta</div>
          <div class="price-detail" data-sl="60 min" data-en="60 min">60 min</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Glow masaža obraza" data-en="Glow facial massage">Glow masaža obraza</div>
          <div class="price-detail" data-sl="45 min · ventuse + maderoterapija" data-en="45 min · ventouse + maderotherapy">45 min · ventuse + maderoterapija</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Reiki terapija" data-en="Reiki therapy">Reiki terapija</div>
          <div class="price-detail" data-sl="60 min" data-en="60 min">60 min</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Individualno kanaliziranje" data-en="Individual channeling">Individualno kanaliziranje</div>
          <div class="price-detail" data-sl="60 min" data-en="60 min">60 min</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Elivital® vadba" data-en="Elivital® class">Elivital® vadba</div>
          <div class="price-detail" data-sl="mesečna vadba · Ptuj mestni park" data-en="monthly class · Ptuj city park">mesečna vadba · Ptuj mestni park</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
      <div class="price-row">
        <div>
          <div class="price-service" data-sl="Latinski / intuitivni ples" data-en="Latin / intuitive dance">Latinski / intuitivni ples</div>
          <div class="price-detail" data-sl="delavnica" data-en="workshop">delavnica</div>
        </div>
        <div class="price-amount">— €</div>
      </div>
    </div>
  </section>

  <!-- TEAM -->
  <section id="ekipa" class="section section--cream">
    <p class="section-label" data-sl="Spoznaj naju" data-en="Meet us">Spoznaj naju</p>
    <div class="team-grid">
      <a href="elina.html" class="team-card">
        <img src="images/elina-portrait.jpg" alt="Elina" class="team-photo">
        <div class="team-name">Elina</div>
        <div class="team-specialties" data-sl="Reiki · Meditacije · Kanaliziranje · Vadba" data-en="Reiki · Meditations · Channeling · Movement">Reiki · Meditacije · Kanaliziranje · Vadba</div>
        <span class="btn-pill" data-sl="SPOZNAJ →" data-en="MEET →">SPOZNAJ →</span>
      </a>
      <a href="maja.html" class="team-card">
        <img src="images/maja-portrait.jpg" alt="Maja" class="team-photo">
        <div class="team-name">Maja</div>
        <div class="team-specialties" data-sl="Masaže · Ples" data-en="Massages · Dance">Masaže · Ples</div>
        <span class="btn-pill" data-sl="SPOZNAJ →" data-en="MEET →">SPOZNAJ →</span>
      </a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div>
      <div class="footer-brand">STUDIO SPIRITAL</div>
      <div class="footer-location" data-sl="Ptuj, Slovenija" data-en="Ptuj, Slovenia">Ptuj, Slovenija</div>
    </div>
    <div class="footer-contact">
      <div data-sl="Pokličite nas:" data-en="Call us:">Pokličite nas:</div>
      <div class="footer-phone">+386 — — — —</div>
    </div>
    <div class="footer-links">
      <a href="https://www.instagram.com/studiospirital/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/profile.php?id=61587043018835" target="_blank" rel="noopener">Facebook</a>
    </div>
  </footer>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open index.html
```
Expected: Price list rows on dark brown background with sand-colored amounts, two team portrait cards with hover lift effect, footer with phone placeholder and social links. Full page scrolls smoothly.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Price List, Team, and Footer to index.html — home page complete"
```

---

### Task 7: `elina.html` — complete page

**Files:**
- Create: `elina.html`

- [ ] **Step 1: Create `elina.html`**

```html
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elina — Studio Spirital</title>
  <meta name="description" content="Elina — Reiki, meditacije, kanaliziranje in vadba. Studio Spirital, Ptuj.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">← STUDIO SPIRITAL</a>
    <ul class="nav-links"></ul>
    <button class="lang-toggle" id="langToggle">SL | EN</button>
  </nav>

  <section class="hero hero--person">
    <div class="hero-bg">
      <img src="images/elina-portrait.jpg" alt="Elina">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-location">Studio Spirital</p>
      <h1 class="hero-title">Elina</h1>
      <p class="hero-tagline" data-sl="Reiki · Meditacije · Kanaliziranje · Vadba" data-en="Reiki · Meditations · Channeling · Movement">Reiki · Meditacije · Kanaliziranje · Vadba</p>
    </div>
  </section>

  <section class="section section--white">
    <p class="section-label" data-sl="O Elini" data-en="About Elina">O Elini</p>
    <div class="person-about">
      <p class="person-quote" data-lang="sl">"Elina v svet prinaša nežnost, intuicijo in globino."</p>
      <p class="person-quote" data-lang="en" hidden>"Elina brings gentleness, intuition and depth into the world."</p>
      <p class="person-bio" data-lang="sl">Kot medij ustvarja meditacije, izvaja individualna kanaliziranja, vodi vadbe ter reiki terapije. S svojim delom odpira prostor za notranji mir, jasnost in stik s seboj.</p>
      <p class="person-bio" data-lang="en" hidden>As a medium she creates meditations, conducts individual channeling sessions, leads movement classes and reiki therapies. Her work opens a space for inner peace, clarity and connection with oneself.</p>
    </div>
  </section>

  <section class="section section--cream">
    <p class="section-label" data-sl="Storitve & cenik" data-en="Services & prices">Storitve & cenik</p>
    <div class="service-list">
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Reiki terapija" data-en="Reiki therapy">Reiki terapija</div>
          <div class="service-item-detail" data-sl="Energijsko zdravljenje · 60 min" data-en="Energy healing · 60 min">Energijsko zdravljenje · 60 min</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Individualno kanaliziranje" data-en="Individual channeling">Individualno kanaliziranje</div>
          <div class="service-item-detail" data-sl="Osebna seja · 60 min" data-en="Personal session · 60 min">Osebna seja · 60 min</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Elivital® vadba" data-en="Elivital® class">Elivital® vadba</div>
          <div class="service-item-detail" data-sl="Joga + pilates + energija · Ptuj mestni park, pon & čet" data-en="Yoga + pilates + energy · Ptuj city park, Mon & Thu">Joga + pilates + energija · Ptuj mestni park, pon & čet</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Meditacija" data-en="Meditation">Meditacija</div>
          <div class="service-item-detail" data-sl="Skupinska ali individualna seja" data-en="Group or individual session">Skupinska ali individualna seja</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <p class="section-label" data-sl="Galerija" data-en="Gallery">Galerija</p>
    <div class="gallery-grid">
      <img src="images/gallery-elina-1.jpg" alt="" class="gallery-img">
      <img src="images/gallery-elina-2.jpg" alt="" class="gallery-img">
      <img src="images/gallery-elina-3.jpg" alt="" class="gallery-img">
      <img src="images/gallery-elina-4.jpg" alt="" class="gallery-img">
    </div>
  </section>

  <div class="contact-section">
    <h2 class="contact-title" data-sl="Stopite v stik z Elino" data-en="Get in touch with Elina">Stopite v stik z Elino</h2>
    <p class="contact-subtitle" data-sl="Za informacije ali dogovor pokličite ali pišite" data-en="For information or to make an appointment, call or message">Za informacije ali dogovor pokličite ali pišite</p>
    <div class="contact-actions">
      <a href="tel:+386000000000" class="contact-btn">
        <span>📞</span>
        <span>+386 — — — —</span>
      </a>
      <a href="https://www.instagram.com/studiospirital/" target="_blank" rel="noopener" class="contact-btn contact-btn--outline">
        <span>📸</span>
        <span>@studiospirital</span>
      </a>
    </div>
  </div>

  <footer class="footer">
    <div>
      <div class="footer-brand">STUDIO SPIRITAL</div>
      <div class="footer-location" data-sl="Ptuj, Slovenija" data-en="Ptuj, Slovenia">Ptuj, Slovenija</div>
    </div>
    <div class="footer-contact">
      <div data-sl="Pokličite nas:" data-en="Call us:">Pokličite nas:</div>
      <div class="footer-phone">+386 — — — —</div>
    </div>
    <div class="footer-links">
      <a href="https://www.instagram.com/studiospirital/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/profile.php?id=61587043018835" target="_blank" rel="noopener">Facebook</a>
    </div>
  </footer>

  <script src="js/lang.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open elina.html
```
Expected: Person hero with portrait, italic bio quote, 4 service cards, 4-image gallery, contact section with phone + Instagram, footer. Language toggle switches all text. "← STUDIO SPIRITAL" returns to home.

- [ ] **Step 3: Commit**

```bash
git add elina.html
git commit -m "feat: add Elina subpage"
```

---

### Task 8: `maja.html` — complete page

**Files:**
- Create: `maja.html`

- [ ] **Step 1: Create `maja.html`**

```html
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maja — Studio Spirital</title>
  <meta name="description" content="Maja — masaže, latinski in intuitivni ples. Studio Spirital, Ptuj.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <nav class="nav">
    <a href="index.html" class="nav-logo">← STUDIO SPIRITAL</a>
    <ul class="nav-links"></ul>
    <button class="lang-toggle" id="langToggle">SL | EN</button>
  </nav>

  <section class="hero hero--person">
    <div class="hero-bg">
      <img src="images/maja-portrait.jpg" alt="Maja">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-location">Studio Spirital</p>
      <h1 class="hero-title">Maja</h1>
      <p class="hero-tagline" data-sl="Masaže · Ples · Gibanje" data-en="Massages · Dance · Movement">Masaže · Ples · Gibanje</p>
    </div>
  </section>

  <section class="section section--white">
    <p class="section-label" data-sl="O Maji" data-en="About Maja">O Maji</p>
    <div class="person-about">
      <p class="person-quote" data-lang="sl">"Maja v Studio Spirital prinaša gibanje, dotik in življenjsko energijo."</p>
      <p class="person-quote" data-lang="en" hidden>"Maja brings movement, touch and life energy into Studio Spirital."</p>
      <p class="person-bio" data-lang="sl">Ustvarja delavnice latina in intuitivnega plesa, skozi masaže telesa in obraza pa pomaga sproščati napetosti in vzpostavljati življenjsko ravnovesje.</p>
      <p class="person-bio" data-lang="en" hidden>She creates Latin and intuitive dance workshops, and through body and facial massages helps release tension and restore life balance.</p>
    </div>
  </section>

  <section class="section section--cream">
    <p class="section-label" data-sl="Storitve & cenik" data-en="Services & prices">Storitve & cenik</p>
    <div class="service-list">
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Masaža hrbta" data-en="Back massage">Masaža hrbta</div>
          <div class="service-item-detail" data-sl="Sprostitev mišic · 60 min" data-en="Muscle relaxation · 60 min">Sprostitev mišic · 60 min</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Glow masaža obraza" data-en="Glow facial massage">Glow masaža obraza</div>
          <div class="service-item-detail" data-sl="Ventuse + maderoterapija · 45 min" data-en="Ventouse + maderotherapy · 45 min">Ventuse + maderoterapija · 45 min</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Latinski ples — delavnica" data-en="Latin dance — workshop">Latinski ples — delavnica</div>
          <div class="service-item-detail" data-sl="Skupinska delavnica" data-en="Group workshop">Skupinska delavnica</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-item-name" data-sl="Intuitivni ples — delavnica" data-en="Intuitive dance — workshop">Intuitivni ples — delavnica</div>
          <div class="service-item-detail" data-sl="Skupinska delavnica" data-en="Group workshop">Skupinska delavnica</div>
        </div>
        <div class="service-item-price">— €</div>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <p class="section-label" data-sl="Galerija" data-en="Gallery">Galerija</p>
    <div class="gallery-grid">
      <img src="images/gallery-maja-1.jpg" alt="" class="gallery-img">
      <img src="images/gallery-maja-2.jpg" alt="" class="gallery-img">
      <img src="images/gallery-maja-3.jpg" alt="" class="gallery-img">
      <img src="images/gallery-maja-4.jpg" alt="" class="gallery-img">
    </div>
  </section>

  <div class="contact-section">
    <h2 class="contact-title" data-sl="Stopite v stik z Majo" data-en="Get in touch with Maja">Stopite v stik z Majo</h2>
    <p class="contact-subtitle" data-sl="Za informacije ali dogovor pokličite ali pišite" data-en="For information or to make an appointment, call or message">Za informacije ali dogovor pokličite ali pišite</p>
    <div class="contact-actions">
      <a href="tel:+386000000000" class="contact-btn">
        <span>📞</span>
        <span>+386 — — — —</span>
      </a>
      <a href="https://www.instagram.com/studiospirital/" target="_blank" rel="noopener" class="contact-btn contact-btn--outline">
        <span>📸</span>
        <span>@studiospirital</span>
      </a>
    </div>
  </div>

  <footer class="footer">
    <div>
      <div class="footer-brand">STUDIO SPIRITAL</div>
      <div class="footer-location" data-sl="Ptuj, Slovenija" data-en="Ptuj, Slovenia">Ptuj, Slovenija</div>
    </div>
    <div class="footer-contact">
      <div data-sl="Pokličite nas:" data-en="Call us:">Pokličite nas:</div>
      <div class="footer-phone">+386 — — — —</div>
    </div>
    <div class="footer-links">
      <a href="https://www.instagram.com/studiospirital/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/profile.php?id=61587043018835" target="_blank" rel="noopener">Facebook</a>
    </div>
  </footer>

  <script src="js/lang.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open maja.html
```
Expected: Same structure as Elina page, Maja's portrait, massage + dance services, gallery, contact section.

- [ ] **Step 3: Commit**

```bash
git add maja.html
git commit -m "feat: add Maja subpage"
```

---

### Task 9: Cross-page QA + mobile check

**Files:**
- Possibly modify: `css/styles.css`

- [ ] **Step 1: Test all three pages on mobile viewport (375px)**

Open each page in the browser. Use DevTools → toggle device toolbar → set to 375px width. Verify:
- Nav: links hidden, logo + toggle visible
- Hero text readable and not overflowing
- Services grid: 2 columns
- Team cards: stack to 1 column
- Gallery: 2 columns
- Footer: stacks vertically, centered

Fix any layout issues in `css/styles.css`.

- [ ] **Step 2: Verify all internal links**

- `index.html` → click Elina card → `elina.html` loads ✓
- `index.html` → click Maja card → `maja.html` loads ✓
- `elina.html` → click "← STUDIO SPIRITAL" → `index.html` loads ✓
- `maja.html` → click "← STUDIO SPIRITAL" → `index.html` loads ✓
- All pages → footer Instagram link → opens instagram.com/studiospirital ✓
- All pages → footer Facebook link → opens facebook.com/profile page ✓

- [ ] **Step 3: Verify language toggle across pages**

1. Load `index.html` in Slovenian (default) ✓
2. Click toggle → switches to English ✓
3. Navigate to `elina.html` → still in English (localStorage persists) ✓
4. Reload page → language persists ✓
5. Toggle back to Slovenian → all text reverts ✓

- [ ] **Step 4: Commit any fixes**

```bash
git add css/styles.css
git commit -m "fix: mobile layout and cross-page QA"
```

---

### Task 10: Fill in prices and phone numbers (client handoff)

This task is completed by the client when they provide actual data, or by the developer when the client sends it.

- [ ] **Step 1: Find all price placeholders**

```bash
grep -n "— €" index.html elina.html maja.html
```
Replace each `— €` with the actual price (e.g. `45 €`).

- [ ] **Step 2: Find all phone number placeholders**

```bash
grep -rn "386 — — — —\|tel:+386000000000" index.html elina.html maja.html
```
Replace `+386 — — — —` with the actual phone number in display text, and `tel:+386000000000` with the actual `tel:` URI (e.g. `tel:+38641234567`).

- [ ] **Step 3: Commit**

```bash
git add index.html elina.html maja.html
git commit -m "content: update prices and phone numbers"
```
