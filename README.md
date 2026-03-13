# Food Story Page

A static, production-ready web page built with Webpack + SCSS, with CMS-ready content architecture.

## Tech Stack

- HTML + SCSS + Vanilla JavaScript
- Webpack (bundling)
- Babel (JS transpilation)
- Build-time prerender script for static HTML output

## Project Structure

```text
exam123/
├─ index.html
├─ package.json
├─ webpack.config.js
├─ scripts/
│  └─ prerender-index.cjs
├─ assets/
│  ├─ js/
│  │  ├─ app.js
│  │  ├─ data/
│  │  │  └─ content.js
│  │  └─ functions/
│  │     ├─ render-content.js
│  │     ├─ image-modal.js
│  │     ├─ cards-links.js
│  │     └─ section-reveal.js
│  ├─ scss/
│  │  ├─ style.scss
│  │  ├─ common/
│  │  └─ components/
│  └─ images/
└─ dest/   (generated build output)
```

## Install and Run

### 1) Install dependencies

```bash
npm install
```

### 2) Build for production

```bash
npm run build
```

This does two things:

1. Runs `scripts/prerender-index.cjs` to generate static section HTML in `index.html` from `assets/js/data/content.js`
2. Runs Webpack production build to output `dest/js/main.js` and `dest/css/style.css`

### 3) Serve locally

Use any static server (example):

```bash
npx serve .
```

Then open the local URL printed in terminal.

### Optional: watch mode during development

```bash
npm run dev
```

This rebuilds assets on file changes (watch mode).

## How Page Rendering Works

### Build-time (before visiting page)

- `assets/js/data/content.js` is the single content source.
- `scripts/prerender-index.cjs` reads that data and injects pre-rendered gallery/cards markup into `index.html`.
- Result: HTML is present before JavaScript runs (better SEO and no-JS resilience).

### Runtime (when visiting page)

When `dest/js/main.js` loads, `assets/js/app.js` runs on `DOMContentLoaded`:

1. `renderContent()`
   - Re-renders gallery/cards from `content.js`
   - Applies fallback UI/logging if containers or data are missing
2. `imageModal()`
   - Enables modal only for gallery images
   - Adds focus trap + background inert handling for accessibility
3. `cardsLinkLogger()`
   - Uses delegated click listener on cards links
   - Logs click details and preserves secure link behavior
4. `sectionReveal()`
   - Reveals sections when in viewport (IntersectionObserver)
5. Adds `js-ready` class to `<body>` to activate JS-dependent animations

## CMS Readiness

This project is CMS-ready because content is modular and centralized:

- Update `assets/js/data/content.js` to replace text, links, and images
- Re-run `npm run build` to regenerate static HTML and bundles

No layout/component rewrite is needed to change content.
