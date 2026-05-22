# Tracker Landing

Marketing landing for Tracker (collbrai.com).

## Stack
Next.js 16 (App Router), TypeScript strict, Tailwind v4, shadcn primitives, Poppins.

## Quickstart

```bash
npm install
cp .env.example .env.local   # fill GMAIL_SMTP_APP_PASSWORD
npm run dev
```

Open http://localhost:3000.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm test` | Vitest smoke tests |
| `npm run lint` | ESLint |
| `npm run screens` | Capture screenshots from Tracker dev server (port 3000) |

## Screenshot pipeline

1. Start Tracker dev server (`C:\Users\fatih\Desktop\tracker` → `npm run dev`)
2. In this repo: `npm run screens`
3. PNGs land in `public/screenshots/` — commit them.

## Manual smoke checklist before deploy

- [ ] Hero loads with Poppins + ochre eyebrow + "tek bakışta" ochre
- [ ] Problem cards have clay left bar
- [ ] Pillars: 4 cards desktop, 2x2 tablet, 1 col mobile
- [ ] Screenshot tabs switch image without flicker
- [ ] FAQ accordion: single-open, chevron rotates
- [ ] Contact form: valid input → success state in same place
- [ ] Contact form: invalid email → inline error under field
- [ ] Contact form: rate limited after 3 submissions (test with IP)
- [ ] Footer: mailto link works
- [ ] /sitemap.xml and /robots.txt serve
- [ ] OG image present in <head>

## Deploy

Recommended: Vercel. Connect repo, set env vars (`GMAIL_SMTP_USER`, `GMAIL_SMTP_APP_PASSWORD`, `DEMO_REQUEST_TO`, `NEXT_PUBLIC_SITE_URL`). Auto-deploy on push.

Alternative: self-host alongside Tracker on the same server. `npm run build` then `npm start` behind a reverse proxy.

## Design spec

See [`docs/superpowers/specs/2026-05-22-tracker-landing-design.md`](./docs/superpowers/specs/2026-05-22-tracker-landing-design.md).
