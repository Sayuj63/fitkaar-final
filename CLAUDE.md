# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fitkaar is a custom Shopify theme for a women-led, customizable clothing brand. The store is connected to `nca4r0-at.myshopify.com`.

## Commands

```bash
# Start local dev server (preview at http://127.0.0.1:9292)
npm run dev              # or: shopify theme dev

# Run tests
npm test                 # runs jest
npm run test:founders-banner  # single test file

# Push theme to Shopify
shopify theme push

# Auth (if needed)
shopify auth login --store nca4r0-at.myshopify.com
```

## Architecture

### Layout & Rendering Flow

`layout/theme.liquid` → loads Alpine.js (CDN v3), `theme.css.liquid`, `cart.js`, then renders:
1. `{% section 'announcement-bar' %}`
2. `{% section 'header' %}`
3. `{{ content_for_layout }}` (page-specific template)
4. `{% section 'footer' %}`

### Templates (JSON) → Sections (Liquid)

Templates in `templates/` are JSON files that reference sections. Key mappings:
- `product.json` → `sections/product-page.liquid` (1,900+ lines, most complex file)
- `page.about-us.json` → `sections/about-page.liquid` (scrapbook parallax layout)
- `page.process.json` → `sections/process-page.liquid` (custom order form)
- `index.json` → multiple sections (hero, featured products, CTA, testimonials, reels)

### CSS Architecture

- **Global styles**: `assets/theme.css.liquid` — CSS variables, utility classes, base styles
- **Section styles**: Each section has its own `<style>` block inline (not separate CSS files)
- **Brand colors** (CSS variables):
  - `--color-primary`: `#000c5b` (dark navy)
  - `--color-secondary`: `#71b6c8` (teal)
  - `--color-accent`: `#bfdbe3` (light blue)
- **Fonts**: League Spartan (headings), Raleway (secondary), Helvetica Neue (body)

### JavaScript

- **Alpine.js v3** (CDN) — used for all interactive UI: mobile menu, product page carousel/variant selection, accordions
- **`assets/cart.js`** — vanilla JS `FitkaarCart` class for cart AJAX operations
- **No build step** — JS is written directly in `<script>` blocks inside section files

### Product Page Variant System (`sections/product-page.liquid`)

Products use 3 Shopify options: **Type** (Hoodie, Tee, etc.), **Colour**, **Size**.

The Alpine.js `productPage()` function manages:
- Carousel with swipe support and transition overlays
- `selectType()` / `selectColor()` / `selectSize()` — update variant, find matching gallery image via `data-image-id` attributes
- `visibleImages` computed — filters gallery by image alt text matching selected colour
- `_findSlideForVariant()` — matches variant's featured image to carousel slide

**Image alt text convention**: Set to the colour name (e.g., "Black", "Brown") so gallery filtering works.

### About Page (`sections/about-page.liquid`)

3-column grid layout with sticky parallax center image. On mobile (<=768px), JS merges left/right story columns into chronological order via `data-order` attributes on `.story-group` elements.

### Custom Order Form (`sections/process-page.liquid`)

Multi-product form (up to 5 products). Each product block has apparel/colour/quantity/size. Colour options update dynamically based on apparel type via JS `coloursByApparel` object. Design fee auto-multiplies by product count.

## Key Conventions

- Sections are self-contained: HTML + `<style>` + `<script>` + `{% schema %}` all in one `.liquid` file
- Schema settings at bottom of section files define Shopify admin customizer fields
- Images referenced either via `{{ 'filename' | asset_url }}` (local assets) or full Shopify CDN URLs
- Shopify contact forms use `{% form 'contact' %}` with `contact[field_name]` inputs
