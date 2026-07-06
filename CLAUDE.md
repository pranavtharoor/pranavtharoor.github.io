# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio site deployed via GitHub Pages at pranavtharoor.github.io. No build system — edit files directly and push to deploy.

## Development

Open `index.html` in a browser to preview. For live reloading:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

This is a single-page static site. All files are served as-is by GitHub Pages.

- **`index.html`** — The entire site, fully self-contained: all markup, one inline `<style>`, and inline `<script>` blocks at the end of `<body>`. It does not load `css/styles.css`, `js/script.js`, or `js/mouse.js` — those are legacy files from previous designs, kept in the repo but unused.
- **`img/IMG_1265.MP4`** — Portrait lake video used as the full-bleed hero background.
- **`img/me-min.png`** — Profile photo (currently unused by `index.html`).
- **`blog/`** — Separate static blog pages, not linked from the main page.
- **`Resume.pdf`** — Resume (currently not linked from the page).
- **`CNAME`** — GitHub Pages custom domain config.

## Key Design Notes

The design direction is "cinematic editorial": dark, typographic, restrained. The user actively avoids anything that reads as AI-generated — no cards, pills, borders/border-radius, purple gradients, hover lifts, or drop shadows. Prefer hairline dividers, type hierarchy, and subtle color shifts.

- **Design tokens** (in `:root`): `--ink` (near-black background), `--bone` (warm off-white text), `--muted`, `--gold` (champagne accent, used sparingly), `--line` (hairline rgba borders), `--ease` (expo-out curve for reveals).
- **Type system**: Fraunces (display serif — masthead, section titles, job roles), Hanken Grotesk (body), IBM Plex Mono (small uppercase labels via `.mono`). Loaded from Google Fonts.
- **Hero**: full-bleed autoplaying video, mirrored with `rotateY(180deg)`, graded with a CSS `filter` plus a vignette overlay (`.hero-video::after`). Scroll parallax moves the video at 0.18× scroll speed via the `--parallax` custom property (rAF-throttled). Autoplay is defensive: retries on `loadedmetadata`/`canplay`, first touch/click/scroll, and `visibilitychange`; iOS's native play overlay is hidden via `::-webkit-media-controls`. The video stays visible on mobile.
- **Motion**: hero lines rise in with masked reveals on load; everything else uses `[data-reveal]` + IntersectionObserver adding `.is-in` (optional stagger via inline `--d` delay). A slow CSS marquee strip sits below the hero (content duplicated twice for a seamless loop — edit both `.marquee-set` blocks identically). Film grain is a fixed, animated SVG-noise overlay (`.grain`). All motion is disabled under `prefers-reduced-motion`.
- **Icons/glyphs**: use inline SVG, not Unicode glyphs — Fraunces lacks symbols like `↗`, and mobile font fallback renders them as emoji (this bit us once with the footer arrow).
- **Footer**: giant "Let's talk" serif mailto with underline-draw link hovers, plus a live Bangalore clock (`.js-clock`, updated via `Intl.DateTimeFormat` with `Asia/Kolkata`).
