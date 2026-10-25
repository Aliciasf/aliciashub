# Alicia’s connection hub

A responsive, static personal site built with Vite, TypeScript, and original CSS and SVG network graphics. No application server or account setup is required.

## Local development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static host. The build uses relative asset paths, including for a GitHub Pages project path. This repository does not automatically deploy or change hosting settings.

## Editing the site

- `index.html`: introduction, interactive network, approach, and about copy.
- `src/main.ts`: reflections, field notes, filters, search, and reading dialogs. Each entry has a stable hash URL so it can be shared directly.
- `src/style.css`: responsive layout, typography, both themes, and reduced-motion preferences.
- `public/favicon.svg`: original copper orb favicon.
- The hero network uses semantic buttons over an SVG map. Its four lenses update explanatory copy; it does not perform matchmaking or represent live people or data.

The introductory writing is proposed site copy, with notes labeled as ideas in progress. It includes no invented publication history, credentials, testimonials, contact details, or client claims. The colophon credits the design inspiration and AI assistance. Google Fonts provides Bricolage Grotesque, Newsreader, and DM Sans; Georgia and sans-serif fallbacks keep the site usable if fonts cannot load. Theme preference is the only data saved locally; there is no analytics or remote form submission.

## Design references

The revised direction was informed by live inspection of [Hume](https://www.hume.ai/) for luminous network imagery, [Cosmos](https://www.cosmos.so/) for spacious typography, and [Are.na](https://www.are.na/) for thoughtful community-centered presentation. All site graphics and layouts are original. New Computer was inspected as well, but currently shows a wind-down notice and was not used as the visual direction.
