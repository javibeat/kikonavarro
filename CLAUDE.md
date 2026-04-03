# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website for Kiko Navarro (kikonavarro.es), a House music DJ/producer. Static site hosted on GitHub Pages with a dark minimalist theme.

## Development Commands

```bash
npm run dev          # Local dev server on port 3000 (live-server)
npm run build        # Build CSS + optimize images
npm run build:css    # Minify style.css → style.min.css (PostCSS + cssnano)
npm run test         # Lighthouse audit (requires dev server running)
```

## Architecture

**Static HTML site** — no framework, no SSR. Each page is a standalone `.html` file at the root. GitHub Pages serves it via `_config.yml` (Jekyll passthrough, no actual Jekyll processing).

**Component system** — `assets/js/components.js` fetches shared HTML fragments at runtime via `fetch()` and injects them into placeholder elements:
- `assets/components/navbar.html` → `<nav id="navbar">`
- `assets/components/footer.html` → `<footer id="footer-placeholder">`
- After navbar loads, `initNavbar()` sets up scroll behavior, hamburger menu, and active link highlighting.

**Discography is data-driven** — `assets/data/discography.json` contains all albums/singles/remixes/compilations. `assets/js/discography-generator.js` (class `DiscographyGenerator`) reads this JSON and renders the discography page sections dynamically.

**CSS** — Single `assets/css/style.css` with self-hosted Montserrat font faces. CSS custom properties defined in `:root` (dark palette: `--bg-black: #050505`, `--bg-surface: #0a0b10`, white accent). A separate `critical.css` and `base.css` exist in `assets/css/modules/`.

**Page-specific JS** — Some pages load additional scripts: `gallery-lightbox.js` (press pictures), `tabs-disco.js` / `tabs-press.js` (tab navigation), `menu.js`.

## Key Conventions

- All pages include `components.js` with `defer` — it handles navbar/footer injection on `DOMContentLoaded`.
- Images go in `assets/img/` with `loading="lazy"` on non-hero images.
- SEO: every page should have Open Graph tags, Twitter cards, canonical URL, and JSON-LD structured data.
- Domain: `kikonavarro.es` (set in `CNAME` file).
- Font: Montserrat (weights 200–700), loaded from `assets/fonts/`.
