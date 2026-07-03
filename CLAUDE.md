# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static, no-build, single-page marketing site for APSYSTEM, a Korean B2B rental company for 5G routers/AP equipment used at educational events. Plain HTML/CSS/JS — no framework, no package manager, no bundler, no tests. There is nothing to `npm install`, build, lint, or run through a test suite.

- `index.html` — single page, all sections (header/nav, hero, stats, about, history, products, portfolio, clients, footer, call modal)
- `style.css` — all styles, organized as numbered sections in one file (see the `/* === N. ... === */` banner comments): 1 design tokens, 2 reset, 3 buttons, 4 header, 5 hero, 6 stats bar, 7 about, 8 products, 9 portfolio, 10 footer, 11 responsive/mobile, 12 phone-number popup modal
- `script.js` — vanilla JS, no dependencies, organized in the same numbered-section style: mobile nav toggle, product card reveal-on-click behavior, phone popup modal, scroll-reveal via `IntersectionObserver`

## Working with this codebase

- **To preview**: open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`). No build step exists or is needed.
- **Design tokens** (colors, fonts, container width) live in `:root` at the top of `style.css` — change values there rather than hardcoding colors elsewhere.
- **Content is in Korean**; the site targets Korean educational institutions (교육청/학교/연수원) as clients. Preserve existing tone and terminology when editing copy.
- Product images (`product-*.png`) and client logos (`client-*.png`) are referenced directly by filename from `index.html`; adding a new product or client means adding both the image asset and the corresponding markup block (product card in the `.products` section, or list item in `.clients-list`).
- The "렌탈상품 보기" (view rental products) flow is stateful: clicking it scrolls to `#products` and reveals product detail images via JS (`is-revealed` class); clicking a revealed card again opens the external Naver Smart Store link (`SMARTSTORE_URL` in `script.js`). Keep this two-step reveal-then-click behavior in mind when touching product cards.
