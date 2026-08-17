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

- **`index.html`** — The entire site, fully self-contained: all markup, one inline `<style>`, and inline `<script>` blocks at the end of `<body>`. There are no external CSS or JS files.
- **`img/IMG_1265.MP4`** — Portrait lake video used as the full-bleed hero background.
- **`img/me-min.png`** — Profile photo. Not used by `index.html`; kept as a candidate `og:image` source.
- **`img/og.jpg`** — 1200×630 social card: a mirrored, graded frame of the hero footage with the masthead set in real Fraunces. `og:image` is absolute and carries a `?v=` — bump it whenever the file is replaced or Facebook and LinkedIn will keep serving the cached copy. Fraunces is not installed locally, so regenerating this means downloading the TTFs from Google Fonts first; otherwise ffmpeg silently falls back to Georgia.
- **`404.html`** — Served automatically by GitHub Pages. Standalone copy of the design tokens, grain, and clock; it shares nothing with `index.html`, so a token change needs applying in both.

The legacy `css/`, `js/`, `blog/`, and `Resume.pdf` files from earlier designs were deleted — don't recreate them. Recover from git history if ever needed.
- **`CNAME`** — GitHub Pages custom domain config.

## Key Design Notes

The design direction is "cinematic editorial": dark, typographic, restrained. The user actively avoids anything that reads as AI-generated — no cards, pills, borders/border-radius, purple gradients, hover lifts, or drop shadows. Prefer hairline dividers, type hierarchy, and subtle color shifts.

- **Design tokens** (in `:root`): `--ink` (near-black background), `--bone` (warm off-white text), `--muted`, `--gold` (champagne accent, used sparingly), `--line` (hairline rgba borders), `--ease` (expo-out curve for reveals).
- **Type system**: Fraunces (display serif — masthead, section titles, job roles), Hanken Grotesk (body), IBM Plex Mono (small uppercase labels via `.mono`). Loaded from Google Fonts.
- **Hero**: full-bleed autoplaying video, mirrored with `rotateY(180deg)`, graded with a CSS `filter` plus a vignette overlay (`.hero-video::after`). Scroll parallax moves the video at 0.18× scroll speed via the `--parallax` custom property (rAF-throttled). Autoplay is defensive: retries on `loadedmetadata`/`canplay`, first touch/click/scroll, and `visibilitychange`; iOS's native play overlay is hidden via `::-webkit-media-controls`. The video stays visible on mobile. `.hero-credit` names the footage (Ana Sagar Lake, Ajmer — Dec 2025) the way a film credits a location; it sits above `( Scroll )` in `.hero-aside`, and since the scroll cue is hidden under 640px the aside re-aligns left so the credit still reads.
- **Motion**: hero lines rise in with masked reveals on load; everything else uses `[data-reveal]` + IntersectionObserver adding `.is-in` (optional stagger via inline `--d` delay). A slow CSS marquee strip sits below the hero (content duplicated twice for a seamless loop — edit both `.marquee-set` blocks identically). Film grain is a fixed, animated SVG-noise overlay (`.grain`). All motion is disabled under `prefers-reduced-motion`.
- **Icons/glyphs**: use inline SVG, not Unicode glyphs — Fraunces lacks symbols like `↗`, and mobile font fallback renders them as emoji (this bit us once with the footer arrow).
- **Off the Clock** (`#offtheclock`): horizontal strip of self-hosted stills/clips that bleeds off the right edge (`margin-right: -5vw`), native scroll with `scroll-snap`, scrollbar hidden. Items are 3:4, desaturated at rest and full colour on hover. **Never use Instagram embeds here** — they inject a light-mode card and external script that break the whole design direction.
  - The strip's contents come from the **`OFF_THE_CLOCK` array** in the inline script; the markup is an empty `.otc-strip` div. Reorder by moving a line, add by copying one. `clip: true` builds a `<video>` (muted, looped, `preload="none"`, played only while on screen) instead of an `<img>`.
  - An item whose media 404s deletes itself, and the section deletes itself if none remain, so missing assets can't ship a broken strip. Stills are `loading="lazy"` and clips are `preload="none"`, so that cleanup only runs once the section is scrolled near, not at page load.
  - **Every clip needs a matching `otc-<slug>-poster.jpg`** (the script derives the path from the `src`). A clip that is never allowed to play renders as an empty box without one — iOS Low Power Mode refuses even muted autoplay, and no amount of retrying `play()` changes that. Playback is retried on first touch/click and on `visibilitychange`, and is skipped entirely under `prefers-reduced-motion`, where the posters stand in.
  - Media files live in `img/` as `otc-<slug>.jpg|mp4` — slugs, not indices, so reordering never means renaming. Encode stills at ~1000px wide and clips at 960px tall, and **always pass `-map_metadata -1`** so embedded GPS from the original photo is not published.
  - Section indices are sequential — adding a section means renumbering the ones after it.
- **Print** (`@media print` at the end of the `<style>`): `Cmd+P` is the CV — that is why there is no `Resume.pdf`. Ink on white, film/nav/marquee/strip dropped, link targets printed via `a::after { content: attr(href) }`. Two traps when editing: anything coloured `--bone` vanishes on white (`.hero-top .mono span` had to be forced dark), and the section indices are hidden because dropping Off the Clock would leave them reading 01, 02, 04. To preview it, `sed 's/@media print {/@media screen {/' index.html > _tmp.html`, look at that, then delete it.
- **Footer**: giant "Let's talk" serif mailto with underline-draw link hovers, plus a live Bangalore clock (`.js-clock`, updated via `Intl.DateTimeFormat` with `Asia/Kolkata`).
