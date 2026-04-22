# Continuum — AI Training & Advisory

Practical AI training and advisory designed for real business environments — from executive
awareness through to enterprise-level adoption.

This repository contains the corporate website for Continuum, built with a techy, synthwave-inspired
aesthetic that matches the brand palette (teal gradient `#6FE7D2 → #2BB6A8` on near-black `#05070A`).

## Stack

- **Next.js 15** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with CSS-variable driven light/dark theming
- **next-themes** for theme toggling (defaults to dark)
- **next-intl** scaffolded with `en-ZA` default locale for future global expansion
- **framer-motion** for section reveals and micro-interactions
- **zod** for contact-form validation on both client and server

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

| Script          | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Local dev server (Turbopack)      |
| `npm run build` | Production build                  |
| `npm run start` | Start the production server       |

## Project structure

```
src/
  app/
    [locale]/            # locale-aware pages
      page.tsx           # Home
      services/
      about/
      insights/
      contact/
    api/contact/route.ts # stubbed contact endpoint (logs + returns ok)
    layout.tsx           # root html, fonts, metadata, favicons
  components/
    hero/ParticleHero.tsx    # canvas synthwave animation
    sections/                # composed page sections
    site/                    # Nav, Footer, ThemeProvider, etc.
    ui/                      # Button, Card, Input, Badge, Section
  content/                   # plain-data sources (services, nav)
  lib/                       # cn, i18n, routing, navigation, schema
  messages/                  # next-intl translation catalogs
  styles/globals.css         # Tailwind v4 + brand tokens
middleware.ts                # next-intl locale routing
```

## Hero animation

The home hero uses a **Canvas 2D** "synthwave" implementation
(`src/components/hero/ParticleHero.tsx`) combining a drifting perspective grid with a field of
glowing particles using additive blending. It:

- scales with `devicePixelRatio`,
- pauses when the tab is hidden or the canvas scrolls off-screen,
- respects `prefers-reduced-motion` (renders a single static frame),
- adapts its palette between light and dark themes.

## Internationalisation

`next-intl` is wired with `en-ZA` as the only active locale. Adding another (for example `en-GB`
or `fr`) is a two-step change:

1. add the locale code to `routing.locales` in `src/lib/routing.ts`
2. add a matching JSON file in `src/messages/`

The middleware and `[locale]` segment handle the rest.

## Contact form

The form at `/contact` validates with the shared `zod` schema in `src/lib/contactSchema.ts` and
posts to `src/app/api/contact/route.ts`. In v1 the endpoint logs the submission server-side and
returns `{ ok: true }` — it is ready to be swapped for a real provider (Resend, Postmark, etc.)
without touching the front-end.

## Brand assets

Favicons live in `public/` as `favicon-dark.jpg` and `favicon-light.jpg`; the browser picks the
right one via `prefers-color-scheme` thanks to `metadata.icons` in the root layout.
