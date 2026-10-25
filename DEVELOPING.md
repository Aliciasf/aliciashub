# Alicia’s garden

A responsive, static personal site built with Vite, TypeScript, and original SVG illustrations. No application server or account setup is required.

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

## Editing the garden

- `index.html`: introduction, navigation, now, and about copy.
- `src/main.ts`: reflections, field notes, filters, search, and reading dialogs. Each entry has a stable hash URL so it can be shared directly.
- `src/style.css`: responsive layout, typography, both themes, and reduced-motion preferences.
- `public/art/`: original botanical illustrations, authored as SVG.

The introductory writing is proposed site copy, with notes labeled as ideas in progress. It includes no invented publication history, credentials, testimonials, contact details, or client claims. The colophon credits the design inspiration and AI assistance. Google Fonts provides Fraunces and Lato; Georgia and sans-serif fallbacks keep the site usable if fonts cannot load. Theme preference is the only data saved locally; there is no analytics or remote form submission.
