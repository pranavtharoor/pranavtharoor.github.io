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

- **`index.html`** — The entire site. Contains all markup and inline `<style>` with its own design tokens (Inter/Fira Code fonts, dark theme with `--accent: #7c6af7`).
- **`css/styles.css`** — A separate, older stylesheet (Poppins/Montserrat fonts, `--primary-accent: #27b2e9`). Currently diverged from `index.html`'s inline styles — the two design systems are not in sync.
- **`js/script.js`** — Nav hide-on-scroll, mobile burger menu, smooth anchor scrolling, IntersectionObserver-based section reveal animations, custom dot cursor.
- **`js/mouse.js`** — Three.js WebGL blob rendered to `.cursor--canvas`. Uses a custom GLSL shader with Simplex noise for organic deformation driven by `time` and `mouse` uniforms. Three.js is loaded from CDN.
- **`img/me-min.png`** — Profile photo.
- **`Resume.pdf`** — Linked resume.
- **`CNAME`** — GitHub Pages custom domain config.

## Key Design Notes

- The custom cursor (`cursor: none` on body) is replaced by a small dot (`.cursor--small`) that tracks the mouse, and a full-viewport Three.js canvas behind the page content.
- Section reveal: sections start at `opacity: 0; transform: translateY(50px)` and transition to visible when the IntersectionObserver fires the `.is-visible` class.
- CSS variables in `index.html` inline styles (`--accent`, `--bg`, etc.) differ from those in `css/styles.css` (`--primary-accent`, `--bg-color`, etc.) — changes to one don't affect the other.
