# Tracker Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Turkish marketing landing for Tracker that collects demo requests via email, mirroring Tracker's Warm Modernist v2 design tokens.

**Architecture:** Next.js 16 App Router app, single `page.tsx` composing nine section components. A Server Action submits validated form data through Nodemailer/Gmail SMTP to `info@collbrai.com`. A standalone Playwright script captures four screenshots from a running Tracker dev server and commits them as static assets in `public/screenshots/`. No database, no analytics, no auth.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, TypeScript strict, Tailwind v4 (CSS-first @theme), shadcn (base-ui), Poppins (next/font), Zod, react-hook-form, Nodemailer, Vitest, Playwright (script-only).

**Spec:** [`docs/superpowers/specs/2026-05-22-tracker-landing-design.md`](../specs/2026-05-22-tracker-landing-design.md)

**Project root:** `C:\Users\fatih\OneDrive\Masaüstü\tracker-landing\` — all paths below are relative to this root unless absolute.

> **Windows note:** Use the Bash tool for `git`, `npm`, and shell commands (the project already has bash working). PowerShell also fine. Avoid `&&` chains in PowerShell — use `;` or separate commands.

> **Next.js 16 caveat:** This Next.js has breaking changes vs. training data. Before writing any non-trivial App Router / Server Action code, read the relevant guide in `node_modules/next/dist/docs/`.

---

## File Structure

```
tracker-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, Poppins, metadata
│   │   ├── page.tsx                # Composes all sections
│   │   ├── globals.css             # Tailwind import + tokens + base
│   │   ├── sitemap.ts              # Single-route sitemap
│   │   ├── robots.ts               # Allow all
│   │   └── actions/
│   │       └── submit-demo.ts      # Server Action
│   ├── components/
│   │   ├── nav.tsx                 # Sticky top bar
│   │   ├── hero.tsx                # Section 1
│   │   ├── problem.tsx             # Section 2
│   │   ├── pillars.tsx             # Section 3
│   │   ├── screenshots.tsx         # Section 4 (client component, tabs)
│   │   ├── how-it-works.tsx        # Section 5
│   │   ├── faq.tsx                 # Section 6
│   │   ├── contact.tsx             # Section 7 (client component, form)
│   │   ├── footer.tsx              # Section 8
│   │   └── ui/                     # shadcn primitives
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── textarea.tsx
│   └── lib/
│       ├── demo-schema.ts          # Zod schema (shared client/server)
│       ├── mail.ts                 # Nodemailer wrapper
│       ├── rate-limit.ts           # In-memory rate limiter
│       └── utils.ts                # cn() helper (shadcn convention)
├── scripts/
│   └── capture-screens.ts          # Playwright capture script
├── public/
│   └── screenshots/
│       ├── dashboard.png           # produced by capture-screens
│       ├── kanban.png
│       ├── sprint.png
│       └── task-detail.png
├── tests/
│   ├── demo-schema.test.ts
│   ├── rate-limit.test.ts
│   ├── mail.test.ts
│   └── submit-demo.test.ts
├── docs/superpowers/{specs,plans}/  # already exists
├── .env.example
├── .env.local                       # gitignored
├── .gitignore                       # already exists
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts               # minimal Tailwind v4 stub
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.env.example`, `README.md`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/utils.ts`

- [ ] **Step 1: Init package.json with exact deps**

Create `package.json`:

```json
{
  "name": "tracker-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "screens": "tsx scripts/capture-screens.ts",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "16.2.6",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "zod": "^3.23.0",
    "nodemailer": "^6.9.16",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "lucide-react": "^0.469.0",
    "@radix-ui/react-accordion": "^1.2.2"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/nodemailer": "^6.4.17",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.5.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "16.2.6",
    "prettier": "^3.4.0",
    "vitest": "^2.1.0",
    "@vitejs/plugin-react": "^4.3.0",
    "playwright": "^1.49.0",
    "tsx": "^4.19.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts, postcss, eslint configs**

`next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { reactStrictMode: true };
export default nextConfig;
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`eslint.config.mjs`:
```js
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [...compat.extends("next/core-web-vitals", "next/typescript")];
```

- [ ] **Step 4: Create .env.example**

```
# Demo form mail dispatch
GMAIL_SMTP_USER=info@collbrai.com
GMAIL_SMTP_APP_PASSWORD=replace-with-app-password
DEMO_REQUEST_TO=info@collbrai.com

# Screenshot capture (used by scripts/capture-screens.ts)
TRACKER_BASE_URL=http://localhost:3000
TRACKER_ADMIN_EMAIL=admin@tracker.local
TRACKER_ADMIN_PASSWORD=admin123
```

- [ ] **Step 5: Create src/lib/utils.ts (shadcn convention)**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Create placeholder src/app files**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tracker — Küçük ekipler için günlük + sprint görev takibi",
  description:
    "Jira'nın karmaşası olmadan, 3-15 kişilik ekipler için günlük fix ve haftalık sprint görevlerini tek arayüzde takip et. Self-hosted, Türkçe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:
```tsx
export default function HomePage() {
  return <main className="min-h-screen">Tracker landing (bootstrap)</main>;
}
```

`src/app/globals.css` (full tokens in Task 2):
```css
@import "tailwindcss";
```

- [ ] **Step 7: Install deps and verify dev server starts**

```bash
cd "C:/Users/fatih/OneDrive/Masaüstü/tracker-landing"
npm install
npm run dev
```

Expected: server starts on http://localhost:3000, browser shows "Tracker landing (bootstrap)" with Poppins font. Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: bootstrap Next.js 16 + Tailwind v4 + Poppins"
```

---

## Task 2: Design Tokens (globals.css with Tailwind v4 @theme)

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write full token CSS**

Replace `src/app/globals.css` entirely with:

```css
@import "tailwindcss";

@theme inline {
  --color-paper: #faf7f2;
  --color-paper-soft: #fdfbf6;
  --color-paper-deeper: #f3ede0;
  --color-ink: #1a1814;
  --color-ink-soft: #6b6259;
  --color-ink-mute: #8a7e6e;
  --color-hairline: #e8e0d0;
  --color-hairline-soft: #f0e9d9;
  --color-ochre: #b8860b;
  --color-ochre-soft: #f5e6c0;
  --color-ochre-deep: #8a6608;
  --color-clay: #c84630;

  /* dark-blok scope (final CTA only) */
  --color-paper-dark: #1a1814;
  --color-paper-dark-soft: #1f1c16;
  --color-paper-dark-deeper: #16140f;
  --color-ink-dark: #f0e8d8;
  --color-ink-dark-soft: #b8ad9a;
  --color-hairline-dark: #3a342c;
  --color-ochre-dark: #d4a444;

  --font-sans: var(--font-poppins), system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-paper);
    color: var(--color-ink);
  }
  ::selection {
    background-color: var(--color-ochre);
    color: var(--color-paper);
  }
  *:focus-visible {
    outline: 2px solid var(--color-ochre);
    outline-offset: 2px;
    border-radius: 4px;
  }
}
```

- [ ] **Step 2: Verify token visual in browser**

Run `npm run dev`. Open http://localhost:3000. Body bg should be warm paper (`#faf7f2`), not white. Use DevTools Computed tab to confirm `background-color: rgb(250, 247, 242)`.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: warm modernist v2 color tokens (light + dark-blok)"
```

---

## Task 3: shadcn primitives (accordion, button, input, textarea)

We won't run the `shadcn` CLI — Next.js 16 compatibility is uncertain. We add the four primitives manually following the shadcn structure.

**Files:**
- Create: `components.json`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/ui/accordion.tsx`

- [ ] **Step 1: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "stone",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 2: Create src/components/ui/button.tsx**

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink/90",
        ochre: "bg-ochre text-paper hover:bg-ochre-deep",
        ghost: "text-ink hover:text-ochre-deep border-b border-ink",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
```

- [ ] **Step 3: Create src/components/ui/input.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md bg-paper-dark-deeper border border-hairline-dark px-3 py-2 text-sm text-ink-dark-soft placeholder:text-ink-dark-soft/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-dark",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
```

- [ ] **Step 4: Create src/components/ui/textarea.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[80px] w-full rounded-md bg-paper-dark-deeper border border-hairline-dark px-3 py-2 text-sm text-ink-dark-soft placeholder:text-ink-dark-soft/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-dark",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
```

- [ ] **Step 5: Create src/components/ui/accordion.tsx**

```tsx
"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-hairline", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-ink transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-ochre transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm text-ink-soft data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: build succeeds with 0 type errors.

- [ ] **Step 7: Commit**

```bash
git add components.json src/components/ui
git commit -m "feat: shadcn primitives — button, input, textarea, accordion"
```

---

## Task 4: Nav Component

**Files:**
- Create: `src/components/nav.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/nav.tsx**

```tsx
export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-paper-soft/95 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold text-sm text-ink">
          <span className="w-2 h-2 rounded-full bg-ochre" aria-hidden />
          Tracker
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
          <a href="#pillars" className="hover:text-ink transition-colors">Özellikler</a>
          <a href="#how" className="hover:text-ink transition-colors">Nasıl çalışır</a>
          <a href="#faq" className="hover:text-ink transition-colors">SSS</a>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center h-8 px-3 rounded-md bg-ink text-paper text-xs font-medium hover:bg-ink/90"
        >
          Demo iste
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

```tsx
import { Nav } from "@/components/nav";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="top" className="min-h-screen" />
    </>
  );
}
```

- [ ] **Step 3: Visual check**

`npm run dev` → http://localhost:3000. Nav should be sticky, brand left, 3 links center (hidden on mobile), Demo iste button right.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/app/page.tsx
git commit -m "feat: sticky top nav with brand mark and demo CTA"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/hero.tsx**

```tsx
export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-4">
        3–15 kişilik ekipler için
      </p>
      <h1 className="text-5xl md:text-7xl font-bold leading-[0.98] tracking-[-0.035em] text-ink max-w-3xl">
        Bugün ne yapacağını
        <br />
        <span className="text-ochre">tek bakışta</span> gör.
      </h1>
      <p className="mt-6 text-base md:text-lg text-ink-soft max-w-xl leading-relaxed">
        Jira&apos;nın karmaşası, Notion&apos;un dağınıklığı olmadan. Günlük fix + haftalık sprint tek arayüzde.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex items-center h-11 px-5 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink/90"
        >
          Demo iste →
        </a>
        <a href="#pillars" className="inline-flex items-center h-11 px-2 text-sm text-ink border-b border-ink">
          Özellikleri gör
        </a>
      </div>
      <p className="mt-6 text-xs text-ink-mute">Self-hosted · 2 dakikada kuruluyor</p>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace `page.tsx`:
```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Visual check**

`npm run dev` → confirm: eyebrow ochre uppercase, "tek bakışta" ochre, dark ink button + underline secondary, meta line below.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: hero section with ochre accent headline"
```

---

## Task 6: Problem Statement Section

**Files:**
- Create: `src/components/problem.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/problem.tsx**

```tsx
const problems = [
  "\"Bugün ne yapmam gerekiyordu?\" mailde, Slack'te, Trello'da kayıp.",
  "Sprint hedefi açık ama günlük fix'ler nereye düştüğünü kimse bilmiyor.",
  "Müdür: \"Ekibimde kim ne yapıyor, kimin yükü fazla?\" — cevap yok.",
];

export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">
        Tanıdık geldi mi?
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        Küçük ekiplerde günlük kaos hep aynı.
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {problems.map((p, i) => (
          <div key={i} className="bg-paper-soft border-l-[3px] border-clay px-5 py-4 rounded-r-md">
            <p className="text-sm text-ink leading-relaxed">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + visual check**

Add `<Problem />` to `page.tsx` after `<Hero />`. Confirm clay (`#c84630`) left bar on each card.

- [ ] **Step 3: Commit**

```bash
git add src/components/problem.tsx src/app/page.tsx
git commit -m "feat: problem statement with 3 clay-bar cards"
```

---

## Task 7: Pillars Section

**Files:**
- Create: `src/components/pillars.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/pillars.tsx**

```tsx
import { Focus, Columns3, Server, Users } from "lucide-react";

const pillars = [
  { icon: Focus, title: "Günlük odak", body: "Sabah aç, bugünkü görevini gör. Standup, bildirim, fix listesi tek yerde." },
  { icon: Columns3, title: "Sprint takip", body: "Kanban + dense tablo + kapasite. Sprint açıl-kapanışı tek tık." },
  { icon: Server, title: "Self-hosted", body: "Verin senin sunucunda. Subscription yok, bulut kilidi yok." },
  { icon: Users, title: "3 rol, tek workspace", body: "Yönetici/Müdür/Üye. Bir uygulama, ek modül kurma yok." },
];

export function Pillars() {
  return (
    <section id="pillars" className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">
        Tracker farkı
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        4 net değer. Daha fazlası değil.
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-paper-soft border border-hairline rounded-lg p-5">
            <div className="w-8 h-8 rounded-md bg-ochre-soft text-ochre-deep grid place-items-center mb-3">
              <Icon className="w-4 h-4" aria-hidden />
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">{title}</h3>
            <p className="text-xs text-ink-soft leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + visual check**

Add to `page.tsx`. Confirm 4 cards on desktop, 2x2 on tablet, single column on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/pillars.tsx src/app/page.tsx
git commit -m "feat: pillars section with 4 value cards and lucide icons"
```

---

## Task 8: How-It-Works Section

**Files:**
- Create: `src/components/how-it-works.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/how-it-works.tsx**

```tsx
const steps = [
  { n: 1, title: "Kur", body: "Sunucuna Docker'la veya systemd ile. Run-book hazır." },
  { n: 2, title: "Ekibini davet et", body: "Admin login + in-app davet veya CSV bulk import." },
  { n: 3, title: "İlk sprint'i aç", body: "Görevler, kanban, mail bildirimleri ilk günden çalışıyor." },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">3 adım</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-10 max-w-2xl">
        Bir öğleden sonrada hazır.
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="bg-paper-soft rounded-lg p-5 border border-hairline">
            <div className="w-7 h-7 rounded-full bg-ochre text-paper grid place-items-center text-xs font-bold mb-3">
              {s.n}
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">{s.title}</h3>
            <p className="text-xs text-ink-soft leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + visual check + Commit**

```bash
git add src/components/how-it-works.tsx src/app/page.tsx
git commit -m "feat: how-it-works section with 3 numbered steps"
```

---

## Task 9: FAQ Section

**Files:**
- Create: `src/components/faq.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/faq.tsx**

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Self-hosted nasıl çalışıyor? Ne lazım?",
    a: "Node.js 20+ ve Postgres (Supabase'in self-host'u veya bağımsız). Docker compose ile veya doğrudan systemd'le çalışır. Run-book repo'da hazır.",
  },
  {
    q: "Verim güvende mi? Şifreleme, yedekleme?",
    a: "Veri kendi sunucunda. Postgres encryption-at-rest sunucu tarafında. Yedekleme stratejisi sana ait — pg_dump cron örneği dokümantasyonda var.",
  },
  {
    q: "Maksimum kaç kişi kullanabilir?",
    a: "Tasarım hedefi 3-15 kişilik ekipler. Teknik olarak 50 kişiye kadar test edildi. 100+ için ayrı bir konuşma yapmamız gerek.",
  },
  {
    q: "Mail bildirimleri nasıl yapılıyor?",
    a: "Gmail SMTP veya kendi SMTP sağlayıcın (SendGrid, Mailgun, vb.). Görev atama, sprint açılış/kapanış, standup ve stale digest için otomatik mail çıkar.",
  },
  {
    q: "Mevcut Trello/Jira'dan veri taşınabilir mi?",
    a: "CSV bulk import komutu mevcut. Trello/Jira'dan CSV export → Tracker import. Etiketler, atamalar, durumlar korunur.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">Sık sorulanlar</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-8">
        Hemen aklına gelenler.
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

- [ ] **Step 2: Wire + visual check + Commit**

Click each accordion item — opens single, chevron rotates.

```bash
git add src/components/faq.tsx src/app/page.tsx
git commit -m "feat: faq accordion with 5 items"
```

---

## Task 10: Footer

**Files:**
- Create: `src/components/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/footer.tsx**

```tsx
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-paper-deeper border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr] mb-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-ink mb-2">
              <span className="w-2 h-2 rounded-full bg-ochre" aria-hidden />
              Tracker
            </div>
            <p className="text-xs text-ink-soft leading-relaxed max-w-xs mb-4">
              3-15 kişilik ekipler için günlük fix + haftalık sprint takibi. Self-hosted, Türkçe.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="GitHub" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:info@collbrai.com" aria-label="Email" className="w-8 h-8 grid place-items-center rounded-md bg-paper border border-hairline text-ink-soft hover:text-ink">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.12em] text-ink font-semibold mb-3">Ürün</h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li><a href="#pillars" className="hover:text-ink">Özellikler</a></li>
              <li><a href="#how" className="hover:text-ink">Nasıl çalışır</a></li>
              <li><a href="#" className="hover:text-ink">Self-hosted kurulum</a></li>
              <li><a href="#" className="hover:text-ink">Sürüm notları</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] uppercase tracking-[0.12em] text-ink font-semibold mb-3">İletişim</h5>
            <ul className="space-y-2 text-xs text-ink-soft">
              <li><a href="#contact" className="hover:text-ink">Demo iste</a></li>
              <li><a href="mailto:info@collbrai.com" className="hover:text-ink">info@collbrai.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-hairline text-xs text-ink-mute">
          © 2026 Tracker · Türkiye&apos;de yapıldı
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Wire + visual check + Commit**

```bash
git add src/components/footer.tsx src/app/page.tsx
git commit -m "feat: footer with 3-col grid and social icons"
```

---

## Task 11: Demo Form Schema (Zod) — TDD

**Files:**
- Create: `tests/demo-schema.test.ts`, `src/lib/demo-schema.ts`, `vitest.config.ts`

- [ ] **Step 1: Create vitest.config.ts**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "node", globals: false },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

- [ ] **Step 2: Write failing test**

`tests/demo-schema.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { demoSchema } from "@/lib/demo-schema";

describe("demoSchema", () => {
  const valid = {
    name: "Ahmet Yılmaz",
    email: "ahmet@firma.com",
    company: "ACME Yazılım",
    teamSize: "3-15" as const,
    message: "Sprint takibi arıyoruz",
    honeypot: "",
  };

  it("accepts a valid payload", () => {
    expect(demoSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty name", () => {
    const r = demoSchema.safeParse({ ...valid, name: "" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const r = demoSchema.safeParse({ ...valid, email: "nope" });
    expect(r.success).toBe(false);
  });

  it("rejects bad teamSize", () => {
    const r = demoSchema.safeParse({ ...valid, teamSize: "huge" as never });
    expect(r.success).toBe(false);
  });

  it("rejects message > 500 chars", () => {
    const r = demoSchema.safeParse({ ...valid, message: "a".repeat(501) });
    expect(r.success).toBe(false);
  });

  it("allows empty message (optional)", () => {
    const r = demoSchema.safeParse({ ...valid, message: "" });
    expect(r.success).toBe(true);
  });

  it("rejects non-empty honeypot (bot)", () => {
    const r = demoSchema.safeParse({ ...valid, honeypot: "I am a bot" });
    expect(r.success).toBe(false);
  });
});
```

- [ ] **Step 3: Run tests to confirm failure**

```bash
npm test -- tests/demo-schema.test.ts
```

Expected: 7 tests fail (`Cannot find module @/lib/demo-schema`).

- [ ] **Step 4: Implement src/lib/demo-schema.ts**

```ts
import { z } from "zod";

export const teamSizeValues = ["1-5", "3-15", "16-50", "50+"] as const;
export type TeamSize = (typeof teamSizeValues)[number];

export const demoSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı").max(80),
  email: z.string().email("Geçerli bir e-mail gir"),
  company: z.string().min(2, "Şirket adı en az 2 karakter").max(120),
  teamSize: z.enum(teamSizeValues),
  message: z.string().max(500, "Mesaj 500 karakteri aşamaz").optional().or(z.literal("")),
  honeypot: z.string().max(0, "spam"),
});

export type DemoInput = z.infer<typeof demoSchema>;
```

- [ ] **Step 5: Run tests to confirm pass**

```bash
npm test -- tests/demo-schema.test.ts
```

Expected: 7 pass.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts tests/demo-schema.test.ts src/lib/demo-schema.ts
git commit -m "feat: demo form zod schema with tests"
```

---

## Task 12: Rate Limiter — TDD

**Files:**
- Create: `tests/rate-limit.test.ts`, `src/lib/rate-limit.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 22, 12, 0, 0));
  });

  it("allows up to 3 requests per IP per minute", () => {
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
  });

  it("rejects 4th request within the minute", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    expect(checkRateLimit("1.2.3.4").ok).toBe(false);
  });

  it("resets after 60 seconds", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    vi.advanceTimersByTime(60_001);
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
  });

  it("tracks per-IP independently", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    expect(checkRateLimit("5.6.7.8")).toEqual({ ok: true });
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- tests/rate-limit.test.ts
```

- [ ] **Step 3: Implement src/lib/rate-limit.ts**

```ts
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

type Entry = { count: number; windowStart: number };
const store = new Map<string, Entry>();

export function checkRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return { ok: false };
  }

  entry.count += 1;
  return { ok: true };
}

export function resetRateLimit() {
  store.clear();
}
```

- [ ] **Step 4: Run to confirm pass + Commit**

```bash
npm test
git add tests/rate-limit.test.ts src/lib/rate-limit.ts
git commit -m "feat: in-memory rate limiter with tests"
```

---

## Task 13: Mail Wrapper — TDD with mock

**Files:**
- Create: `tests/mail.test.ts`, `src/lib/mail.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMailMock = vi.fn().mockResolvedValue({ messageId: "fake-id" });

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: sendMailMock })),
  },
}));

import { sendDemoMail } from "@/lib/mail";

describe("sendDemoMail", () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    process.env.GMAIL_SMTP_USER = "info@collbrai.com";
    process.env.GMAIL_SMTP_APP_PASSWORD = "fakepass";
    process.env.DEMO_REQUEST_TO = "info@collbrai.com";
  });

  it("sends mail with composed subject and body", async () => {
    const result = await sendDemoMail({
      name: "Ali Veli",
      email: "ali@firma.com",
      company: "ACME",
      teamSize: "3-15",
      message: "Test",
      meta: { ip: "1.2.3.4", userAgent: "Mozilla", timestamp: "2026-05-22T12:00:00Z" },
    });
    expect(result.ok).toBe(true);
    expect(sendMailMock).toHaveBeenCalledOnce();
    const call = sendMailMock.mock.calls[0][0];
    expect(call.to).toBe("info@collbrai.com");
    expect(call.subject).toContain("Demo");
    expect(call.subject).toContain("ACME");
    expect(call.text).toContain("ali@firma.com");
    expect(call.text).toContain("3-15");
    expect(call.text).toContain("1.2.3.4");
  });

  it("returns ok:false when transport throws", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("smtp down"));
    const result = await sendDemoMail({
      name: "X", email: "x@y.com", company: "Z", teamSize: "3-15",
      meta: { ip: "0.0.0.0", userAgent: "", timestamp: "" },
    });
    expect(result.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- tests/mail.test.ts
```

- [ ] **Step 3: Implement src/lib/mail.ts**

```ts
import nodemailer from "nodemailer";
import type { TeamSize } from "./demo-schema";

interface DemoMailInput {
  name: string;
  email: string;
  company: string;
  teamSize: TeamSize;
  message?: string;
  meta: { ip: string; userAgent: string; timestamp: string };
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_APP_PASSWORD,
    },
  });
  return transporter;
}

export async function sendDemoMail(input: DemoMailInput): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.DEMO_REQUEST_TO;
  if (!to) return { ok: false, error: "missing DEMO_REQUEST_TO" };

  const subject = `Demo talebi — ${input.company} (${input.teamSize})`;
  const text = [
    `İsim:    ${input.name}`,
    `E-mail:  ${input.email}`,
    `Şirket:  ${input.company}`,
    `Boyut:   ${input.teamSize}`,
    `Mesaj:   ${input.message || "(boş)"}`,
    "",
    "— meta —",
    `IP:        ${input.meta.ip}`,
    `UA:        ${input.meta.userAgent}`,
    `Timestamp: ${input.meta.timestamp}`,
  ].join("\n");

  try {
    await getTransporter().sendMail({
      from: process.env.GMAIL_SMTP_USER,
      to,
      replyTo: input.email,
      subject,
      text,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
```

- [ ] **Step 4: Run to confirm pass + Commit**

```bash
npm test
git add tests/mail.test.ts src/lib/mail.ts
git commit -m "feat: nodemailer wrapper for demo mail dispatch"
```

---

## Task 14: submitDemoRequest Server Action — TDD

**Files:**
- Create: `tests/submit-demo.test.ts`, `src/app/actions/submit-demo.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { resetRateLimit } from "@/lib/rate-limit";

vi.mock("@/lib/mail", () => ({
  sendDemoMail: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({
    "x-forwarded-for": "9.9.9.9",
    "user-agent": "TestUA",
  }),
}));

import { submitDemoRequest } from "@/app/actions/submit-demo";
import { sendDemoMail } from "@/lib/mail";

const validInput = {
  name: "Test User",
  email: "test@firma.com",
  company: "TestCo",
  teamSize: "3-15" as const,
  message: "",
  honeypot: "",
};

describe("submitDemoRequest", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.clearAllMocks();
  });

  it("returns ok:true on valid input and calls sendDemoMail", async () => {
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(true);
    expect(sendDemoMail).toHaveBeenCalledOnce();
  });

  it("returns validation errors when input is invalid", async () => {
    const result = await submitDemoRequest({ ...validInput, email: "bad" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/email/i);
  });

  it("rejects honeypot-filled input as spam without sending mail", async () => {
    const result = await submitDemoRequest({ ...validInput, honeypot: "BUY VIAGRA" });
    expect(result.ok).toBe(false);
    expect(sendDemoMail).not.toHaveBeenCalled();
  });

  it("rate limits after 3 submissions in a minute", async () => {
    await submitDemoRequest(validInput);
    await submitDemoRequest(validInput);
    await submitDemoRequest(validInput);
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/çok fazla|rate/i);
  });

  it("returns ok:false when mail send fails", async () => {
    vi.mocked(sendDemoMail).mockResolvedValueOnce({ ok: false, error: "smtp" });
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- tests/submit-demo.test.ts
```

- [ ] **Step 3: Implement src/app/actions/submit-demo.ts**

```ts
"use server";

import { headers } from "next/headers";
import { demoSchema, type DemoInput } from "@/lib/demo-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendDemoMail } from "@/lib/mail";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitDemoRequest(raw: DemoInput): Promise<SubmitResult> {
  const parsed = demoSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? "Geçersiz veri" };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0]!.trim();
  const userAgent = h.get("user-agent") ?? "";

  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return { ok: false, error: "Çok fazla deneme — lütfen birkaç dakika sonra tekrar dene." };
  }

  const { honeypot: _honeypot, ...payload } = parsed.data;
  const result = await sendDemoMail({
    ...payload,
    meta: { ip, userAgent, timestamp: new Date().toISOString() },
  });

  if (!result.ok) {
    return { ok: false, error: "Mail gönderilemedi. Lütfen info@collbrai.com adresine yaz." };
  }
  return { ok: true };
}
```

- [ ] **Step 4: Run to confirm pass + Commit**

```bash
npm test
git add tests/submit-demo.test.ts src/app/actions/submit-demo.ts
git commit -m "feat: submit-demo server action with validation, rate-limit, mail"
```

---

## Task 15: Contact Section UI (form + success state)

**Files:**
- Create: `src/components/contact.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/contact.tsx**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail } from "lucide-react";
import { demoSchema, type DemoInput, teamSizeValues } from "@/lib/demo-schema";
import { submitDemoRequest } from "@/app/actions/submit-demo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const trustSignals = [
  { t: "24 saat içinde dönüş", d: "İş günü içinde direkt mail" },
  { t: "30 dakikalık demo", d: "Senin takvimine uygun" },
  { t: "Kredi kartı yok", d: "Bağlayıcı bir şey yok" },
  { t: "Türkçe destek", d: "Senin saatinde, senin dilinde" },
];

export function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "", email: "", company: "",
      teamSize: "3-15", message: "", honeypot: "",
    },
  });

  const teamSize = watch("teamSize");

  const onSubmit = async (data: DemoInput) => {
    setSubmitState("submitting");
    setErrMsg("");
    const result = await submitDemoRequest(data);
    if (result.ok) {
      setSubmitState("success");
    } else {
      setSubmitState("error");
      setErrMsg(result.error);
    }
  };

  return (
    <section id="contact" className="bg-paper-dark text-ink-dark py-20 border-t border-hairline-dark">
      <div className="mx-auto max-w-6xl px-6 grid gap-14 md:grid-cols-2 items-start">

        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-ochre-dark font-semibold mb-3">Demo talebi</p>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.025em] mb-4">
            Ekibini <span className="text-ochre-dark">Tracker&apos;a</span><br />taşımaya hazır mısın?
          </h3>
          <p className="text-sm text-ink-dark-soft leading-relaxed mb-6 max-w-md">
            30 dakikalık bir demo&apos;da kendi senaryonuza özel kurulum gösteriyoruz. Sorularını cevaplayıp ekibine uygun mu birlikte karar veriyoruz.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {trustSignals.map((s) => (
              <div key={s.t} className="flex gap-2 items-start text-xs text-ink-dark-soft">
                <div className="w-5 h-5 rounded-full bg-ochre-dark/15 text-ochre-dark grid place-items-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="block text-ink-dark font-medium">{s.t}</strong>
                  {s.d}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 border-t border-hairline-dark">
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-dark-soft font-semibold mb-2">
              Form doldurmayı tercih etmiyorsan
            </p>
            <a href="mailto:info@collbrai.com" className="inline-flex items-center gap-2 text-sm text-ink-dark">
              <Mail className="w-4 h-4 text-ochre-dark" />
              info@collbrai.com
            </a>
          </div>
        </div>

        <div className="bg-paper-dark-soft border border-hairline-dark rounded-xl p-6">
          {submitState === "success" ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-ochre-dark/15 text-ochre-dark grid place-items-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-ink-dark mb-1">Teşekkürler!</h4>
              <p className="text-sm text-ink-dark-soft">24 saat içinde sana dönüyoruz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h4 className="text-base font-semibold text-ink-dark mb-1">Demo iste</h4>
              <p className="text-xs text-ink-dark-soft mb-5">Aşağıyı doldur, 24 saat içinde sana dönüyoruz.</p>

              {submitState === "error" && (
                <div className="mb-4 px-3 py-2 rounded-md bg-clay/15 border border-clay/30 text-xs text-clay">
                  {errMsg}
                </div>
              )}

              <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="mb-3">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Adın</label>
                <Input {...register("name")} placeholder="Adın" />
                {errors.name && <p className="mt-1 text-[11px] text-clay">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">E-mail</label>
                  <Input type="email" {...register("email")} placeholder="ornek@sirket.com" />
                  {errors.email && <p className="mt-1 text-[11px] text-clay">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Şirket</label>
                  <Input {...register("company")} placeholder="Şirket / takım" />
                  {errors.company && <p className="mt-1 text-[11px] text-clay">{errors.company.message}</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Ekip boyutu</label>
                <div className="flex flex-wrap gap-1.5">
                  {teamSizeValues.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValue("teamSize", v, { shouldValidate: true })}
                      className={cn(
                        "px-3.5 py-2 rounded-full text-xs border transition-colors",
                        teamSize === v
                          ? "bg-ochre-dark text-paper-dark-deeper border-ochre-dark"
                          : "bg-paper-dark-deeper text-ink-dark-soft border-hairline-dark"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Mesaj (opsiyonel)</label>
                <Textarea {...register("message")} placeholder="Ne tür bir görev takibi yapıyorsunuz şu an?" />
                {errors.message && <p className="mt-1 text-[11px] text-clay">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="w-full h-11 rounded-md bg-ochre-dark text-paper-dark-deeper text-sm font-semibold hover:bg-ochre disabled:opacity-50"
              >
                {submitState === "submitting" ? "Gönderiliyor…" : "Demo iste →"}
              </button>
              <p className="mt-2.5 text-[10px] text-ink-dark-soft/70 text-center">
                Mailini sadece sana cevap vermek için kullanırız.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Final `page.tsx`:
```tsx
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
import { Screenshots } from "@/components/screenshots";
import { HowItWorks } from "@/components/how-it-works";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <Screenshots />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

Note: `<Screenshots />` is added in Task 16; if running tasks in order, you can comment that line out until Task 16 is done, or build Task 16 first.

- [ ] **Step 3: Smoke test the form**

Set `.env.local` with real Gmail SMTP app password. `npm run dev`. Fill the form with valid data. Confirm:
- Submit button shows "Gönderiliyor…"
- Form swaps to success state
- Mail arrives at info@collbrai.com

Then test with invalid email — inline error appears under field. Submit with honeypot via DevTools — gets generic error.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact.tsx src/app/page.tsx
git commit -m "feat: contact section with demo form and success state"
```

---

## Task 16: Screenshots Section (placeholder PNGs first)

**Files:**
- Create: `src/components/screenshots.tsx`, `public/screenshots/.gitkeep`, 4 placeholder PNGs

- [ ] **Step 1: Create placeholder PNGs**

Until Task 18's capture script is run, use 16:9 paper-soft placeholders. Easiest: copy any 1440x900 paper-toned PNG four times. Or create stub via:

```bash
mkdir -p public/screenshots
touch public/screenshots/.gitkeep
```

Then drop any 4 sample images named `dashboard.png`, `kanban.png`, `sprint.png`, `task-detail.png` (1600x900 or similar 16:9). Real screenshots produced in Task 18 will replace these.

- [ ] **Step 2: Create src/components/screenshots.tsx**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dashboard", label: "Dashboard", src: "/screenshots/dashboard.png" },
  { id: "kanban", label: "Kanban", src: "/screenshots/kanban.png" },
  { id: "sprint", label: "Sprint board", src: "/screenshots/sprint.png" },
  { id: "task-detail", label: "Görev detay", src: "/screenshots/task-detail.png" },
] as const;

export function Screenshots() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("dashboard");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-hairline">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ochre font-semibold mb-3">Gerçek arayüz</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-ink mb-8 max-w-2xl">
        İlk bakışta ne göreceksin.
      </h2>

      <div role="tablist" className="inline-flex gap-1 p-1 rounded-lg bg-paper-soft border border-hairline mb-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs transition-colors",
              active === t.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-paper-soft border border-hairline">
        <Image
          key={current.id}
          src={current.src}
          alt={`Tracker ${current.label} ekranı`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          priority={current.id === "dashboard"}
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire + visual check + Commit**

Uncomment `<Screenshots />` in `page.tsx`. Tabs switch image with no flicker.

```bash
git add src/components/screenshots.tsx public/screenshots/ src/app/page.tsx
git commit -m "feat: screenshots section with 4-tab switcher"
```

---

## Task 17: SEO — sitemap, robots, OG metadata

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `public/og-image.png` (placeholder)
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create src/app/sitemap.ts**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tracker.collbrai.com";
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

- [ ] **Step 2: Create src/app/robots.ts**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tracker.collbrai.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Add OG image placeholder**

Drop a 1200x630 PNG to `public/og-image.png`. Easiest first version: a screenshot of the rendered hero (Cmd+Shift+S in browser, crop to 1200x630). Replace later with a designed one.

- [ ] **Step 4: Extend metadata in src/app/layout.tsx**

Replace the `metadata` export with:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tracker.collbrai.com"),
  title: "Tracker — Küçük ekipler için günlük + sprint görev takibi",
  description:
    "Jira'nın karmaşası olmadan, 3-15 kişilik ekipler için günlük fix ve haftalık sprint görevlerini tek arayüzde takip et. Self-hosted, Türkçe.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "Tracker — Bugün ne yapacağını tek bakışta gör",
    description: "3-15 kişilik ekipler için günlük + sprint görev takibi. Self-hosted, Türkçe.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracker — Bugün ne yapacağını tek bakışta gör",
    description: "3-15 kişilik ekipler için günlük + sprint görev takibi. Self-hosted, Türkçe.",
    images: ["/og-image.png"],
  },
};
```

- [ ] **Step 5: Verify**

`npm run dev` → visit `/sitemap.xml`, `/robots.txt`. Both should serve correct content. View page source — OG tags present.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx public/og-image.png
git commit -m "feat: sitemap, robots, and og metadata"
```

---

## Task 18: Screenshot Capture Script

**Files:**
- Create: `scripts/capture-screens.ts`

- [ ] **Step 1: Create scripts/capture-screens.ts**

```ts
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.TRACKER_BASE_URL ?? "http://localhost:3000";
const EMAIL = process.env.TRACKER_ADMIN_EMAIL ?? "admin@tracker.local";
const PASSWORD = process.env.TRACKER_ADMIN_PASSWORD ?? "admin123";
const OUT_DIR = path.join(process.cwd(), "public", "screenshots");

const captures = [
  { route: "/dashboard", file: "dashboard.png" },
  { route: "/board", file: "kanban.png" },
  { route: "/sprint", file: "sprint.png" },
];

async function captureFirstTask(page: import("playwright").Page) {
  await page.goto(`${BASE}/tasks`, { waitUntil: "networkidle" });
  const firstLink = page.locator('a[href^="/tasks/"]').first();
  await firstLink.waitFor({ state: "visible", timeout: 5_000 });
  const href = await firstLink.getAttribute("href");
  if (!href) throw new Error("No task link found on /tasks page");
  await page.goto(`${BASE}${href}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT_DIR, "task-detail.png"), fullPage: false });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "tr-TR",
  });
  const page = await context.newPage();

  // login
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.fill('input[name="email"], input[type="email"]', EMAIL);
  await page.fill('input[name="password"], input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 10_000 });

  for (const c of captures) {
    console.log(`[capture] ${c.route} → ${c.file}`);
    await page.goto(`${BASE}${c.route}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(OUT_DIR, c.file), fullPage: false });
  }

  console.log("[capture] /tasks/[first] → task-detail.png");
  await captureFirstTask(page);

  await browser.close();
  console.log(`[capture] done — ${OUT_DIR}`);
}

main().catch((err) => {
  console.error("[capture] error:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 3: Run capture against Tracker dev**

Open a separate terminal in Tracker repo (`C:\Users\fatih\Desktop\tracker`):
```bash
npm run dev
```

Then in tracker-landing:
```bash
npm run screens
```

Expected: 4 PNGs in `public/screenshots/` (overwrites Task 16 placeholders).

If login selectors fail, inspect Tracker's `/login` page DOM and adjust selectors in the script. The current selectors are generic guesses (`input[name="email"]`, etc.).

- [ ] **Step 4: Commit**

```bash
git add scripts/capture-screens.ts public/screenshots/*.png
git commit -m "feat: playwright screenshot capture script + initial captures"
```

---

## Task 19: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# Tracker Landing

Marketing landing for Tracker (collbrai.com).

## Stack
Next.js 16 (App Router), TypeScript strict, Tailwind v4, shadcn primitives, Poppins.

## Quickstart

\`\`\`bash
npm install
cp .env.example .env.local   # fill GMAIL_SMTP_APP_PASSWORD
npm run dev
\`\`\`

Open http://localhost:3000.

## Commands

| Command | Purpose |
|---|---|
| \`npm run dev\` | Dev server (port 3000) |
| \`npm run build\` | Production build |
| \`npm start\` | Run production build |
| \`npm test\` | Vitest smoke tests |
| \`npm run lint\` | ESLint |
| \`npm run screens\` | Capture screenshots from Tracker dev server (port 3000) |

## Screenshot pipeline

1. Start Tracker dev server (\`C:\\Users\\fatih\\Desktop\\tracker\` → \`npm run dev\`)
2. In this repo: \`npm run screens\`
3. PNGs land in \`public/screenshots/\` — commit them.

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

Recommended: Vercel. Connect repo, set env vars (\`GMAIL_SMTP_USER\`, \`GMAIL_SMTP_APP_PASSWORD\`, \`DEMO_REQUEST_TO\`, \`NEXT_PUBLIC_SITE_URL\`). Auto-deploy on push.

Alternative: self-host alongside Tracker on the same server. \`npm run build\` then \`npm start\` behind a reverse proxy.

## Design spec

See [\`docs/superpowers/specs/2026-05-22-tracker-landing-design.md\`](./docs/superpowers/specs/2026-05-22-tracker-landing-design.md).
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: readme with quickstart, commands, and smoke checklist"
```

---

## Task 20: Final Smoke Pass

- [ ] **Step 1: Run full check**

```bash
npm run lint
npm test
npm run build
```

All three must pass with zero errors.

- [ ] **Step 2: Manual browser walk**

`npm start` (production build) → http://localhost:3000. Walk the checklist from `README.md`. Note any issues; fix and commit each separately.

- [ ] **Step 3: Lighthouse**

In Chrome DevTools → Lighthouse → run on http://localhost:3000 (mobile + desktop). Confirm all four scores ≥ 90.

If any score < 90, capture findings and address in follow-up commits. Common issues: missing alt text, unoptimized images, missing `<meta description>` (we set it, but double-check final render).

- [ ] **Step 4: Final commit only if there were fix-up changes**

If no changes needed, no commit.

---

## Self-Review (orchestrator)

This plan covers all 13 spec sections:

| Spec § | Covered by |
|---|---|
| 1 Amaç / Non-goals | Task 1 (bootstrap scope), Task 15 (Contact form scope) |
| 2 Konumlandırma | Task 5 (Hero copy) |
| 3 Tech Stack | Task 1 (deps), Task 3 (shadcn), Task 11/12/13/14 (validation/mail/server-action) |
| 4 Token'lar | Task 2 |
| 5.1 Nav | Task 4 |
| 5.2 Hero | Task 5 |
| 5.3 Problem | Task 6 |
| 5.4 Pillars | Task 7 |
| 5.5 Screenshots | Task 16 + Task 18 |
| 5.6 How-it-works | Task 8 |
| 5.7 FAQ | Task 9 |
| 5.8 Contact + form | Task 15 + Tasks 11–14 (backend) |
| 5.9 Footer | Task 10 |
| 6 Dosya yapısı | Captured throughout |
| 7 Demo form veri akışı | Tasks 11–15 |
| 8 Screenshot pipeline | Task 18 |
| 9 SEO/perf | Task 17 + Task 20 (Lighthouse) |
| 10 Test stratejisi | Tasks 11–14 (Vitest), Task 20 (manual + Lighthouse) |
| 11 Açık sorular | Deferred to deploy time (no implementation task) |
| 12 Risk | Acknowledged in Task 16 (placeholder PNGs first), Task 18 (selector caveat) |
| 13 v2 | Out of scope — no tasks |

No type-name mismatches: `DemoInput`, `TeamSize`, `submitDemoRequest`, `sendDemoMail`, `checkRateLimit`, `resetRateLimit` are consistent across schema → mail → server-action → contact form.
