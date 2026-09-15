# Nova Agency

A sleek dark-mode design agency homepage built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is occupied, Next.js will use the next available port.

## Production

```bash
npm run build
npm run start
```

## Structure

- `app/layout.tsx` - fonts, SEO metadata, and document shell
- `app/page.tsx` - page composition
- `app/globals.css` - dark design tokens, grid/orb motion, focus states, and reduced-motion rules
- `app/api/contact/route.ts` - server-side contact payload validation
- `components/Hero.tsx` - interactive hero and powered-by WEBOIN badge
- `components/Services.tsx` - service cards with Lucide icons
- `components/Portfolio.tsx` - responsive optimized Unsplash project grid
- `components/Contact.tsx` - controlled form, client validation, API submission, and success state

## Contact submissions

The contact form validates in the browser and on the server through `/api/contact`. The route currently acknowledges valid submissions but does not deliver email. Connect it to an email provider or database before production use.

## Accessibility

The page includes semantic sections, visible keyboard focus styles, `aria-invalid` and `aria-describedby` form relationships, responsive layouts, and reduced-motion support.
