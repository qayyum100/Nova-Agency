# Fieldnote — Design Agency Homepage

A one-page Next.js site for a fictional design studio, built for the
Next.js Developer Internship task.

## Tech stack

- **Next.js 14** (App Router, functional components only)
- **TypeScript**
- **Tailwind CSS** — theming via CSS variables (`app/globals.css`) so light
  and dark mode share one set of components
- **next/font** for self-hosted Google Fonts (Fraunces + Inter) — no
  external font requests at runtime
- No UI library, no template — every section is a hand-built component

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

for a production build.

> Note: `next/font` fetches Fraunces and Inter from Google Fonts **at build
> time**. If you build this in a sandboxed/offline environment you'll see a
> `NextFontError` — that's a network restriction, not a code issue. It
> builds normally with regular internet access (including on Vercel).

## Project structure

```
app/
  layout.tsx       — fonts, metadata, dark-mode flash prevention
  page.tsx          — composes the four sections
  globals.css       — design tokens (light + dark) and base styles
components/
  SiteHeader.tsx    — sticky nav + theme toggle
  Hero.tsx          — hero section
  Services.tsx      — services section
  Portfolio.tsx     — portfolio grid
  Contact.tsx       — contact form (client component)
  SiteFooter.tsx
  ThemeToggle.tsx   — dark mode toggle, persists to localStorage
```

## Design decisions

- **Concept:** Fieldnote is styled as a small, research-grounded studio
  rather than a generic "creative agency" — the copy, palette, and layout
  are built around that specific idea instead of a template.
- **Palette:** paper `#FBFAF7`, ink `#14140F`, accent `#2B4EFF` (cobalt),
  muted `#6B6B5E`, hairline `#DEDBD1`. Dark mode swaps these via a `.dark`
  class rather than duplicating components.
- **Portfolio thumbnails:** project images are CSS gradient panels instead
  of stock photography, since no real client photography exists for a
  fictional studio and stand-in stock photos would misrepresent the work.
  Swap in real project images by dropping files into `public/` and
  replacing the `swatch` background with an `<Image />` inside
  `components/Portfolio.tsx`.
- **Services:** presented as hairline-divided rows rather than boxed
  cards — the four offerings aren't a ranked sequence, so there's no
  01/02/03 numbering.

## Assumptions / additional features

- Placeholder studio name, tagline, service descriptions, and project
  names, since the brief didn't provide real content.
- Contact form does client-side validation and shows an in-page success
  state; it doesn't call a backend or send real email (no API was
  specified in the brief). Wire it up to an API route, form service (e.g.
  Formspree), or server action to make it functional.
- Dark mode toggle, SEO metadata (title/description/OpenGraph), and
  responsive layout down to mobile are implemented as bonus items.
- Accessibility: visible keyboard focus states, `aria-invalid` /
  `aria-describedby` on form fields, `prefers-reduced-motion` respected.

## Deployment

Push to a GitHub repo and import it on [Vercel](https://vercel.com/new) —
no environment variables or extra configuration are required.
