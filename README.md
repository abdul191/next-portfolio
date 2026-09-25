# Abdul Rehman — Full-Stack Developer Portfolio

Production portfolio built with **Next.js (App Router), React, TypeScript, Tailwind CSS v4**, and `next-intl` with three fully translated locales: **English**, **Urdu**, and **Arabic (RTL)**.

## Stack

- Next.js 16 (Turbopack) — App Router, SSG
- React 19, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`), shadcn/ui components
- `next-intl` for i18n + RTL routing (`/en`, `/ur`, `/ar`)
- `next-themes` for dark/light mode
- `lottie-react` v3 for inline Lottie animations
- `react-icons` (Font Awesome / Ionicons)

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Verification gates

```bash
npx tsc --noEmit     # typecheck (expect 0 errors)
npm run lint         # eslint
npm run build        # production build (expect 61 SSG pages + middleware)
```

Dev smoke test: start `npm run dev`, then check `/`, `/en`, `/ur`, `/ar` and detail pages return 200. Kill the dev server on Windows:

```bash
netstat -ano | grep ":3000" | grep LISTEN | awk '{print $5}' | sort -u | while read pid; do taskkill //F //PID "$pid"; done
```

## Project Structure

```
src/
  app/
    [locale]/             # localized pages (home composed on [locale]/page.tsx)
      about/ articles/ projects/ services/ contact/
    globals.css           # theme tokens, .container-section, animations
    layout.tsx            # root layout
  components/             # Hero, Skills, Services, Experience, AboutMe,
                          # Portfolio (carousel), Testimonials (carousel),
                          # Articles, ContactMe, Navbar, Footer,
                          # Stagger, PageReveal, LottieAnimation,
                          # Languages, Modes
  animations/rings.json   # radar-pulse Lottie asset
  data/                   # site.ts (CV), projects.ts (7 projects), project-images.ts
  i18n/                   # routing + navigation (next-intl)
  messages/               # en.json / ur.json / ar.json (full CV content)
public/Resume.pdf         # NOTE: still the old CV — replace with full-stack CV
```

## Key Implementation Notes

- **Content is the real CV**: 4 jobs, 7 real projects, skills, certifications are sourced from `src/data/*` + `src/messages/*.json`.
- **Unified layout**: all sections and pages use a single container width (`max-w-[84rem]` via the `.container-section` utility in `globals.css`); section vertical rhythm is `py-12 sm:py-16`.
- **Carousels**: `Portfolio` (grouped slides, perView via `matchMedia`) and `Testimonials` (single card). Both are RTL-aware (`translateX(${isRtl ? '' : '-'}${index * 100}%)`, swipe `isNext = (delta < 0) !== isRtl`), support arrows/dots, 5s autoplay with pause on hover/focus.
- **PageReveal** wraps `<main>` keyed by pathname; `Stagger` reveals items on scroll (IntersectionObserver).
- **Lottie sizing gotcha**: `lottie-react` v3 renders inside `.lottie-display` which forces `width/height:100%` and ignores sizing classes. `LottieAnimation.tsx` wraps the animation in an explicitly-sized `div` (via `className`) and sets `style={{width:'100%',height:'100%'}}` so it can never blow up or overflow layout. Keep that pattern for any new Lottie usage.
- **React Compiler is enabled** — avoid manual `useCallback` (lint rule `react-hooks/preserve-manual-memoization`) and synchronous `setState` inside effects (`react-hooks/set-state-in-effect`); use `useSyncExternalStore` for matchMedia; clamp state at render.
- **Header**: sticky 69px bar, one row on desktop (logo | links | language + theme + Download CV at the end, `whitespace-nowrap` on the CV button), solidifies to ~95% opaque + `backdrop-blur-xl` once scrolled. Anchor sections use `scroll-mt-20`.
- **Contact form (ContactMe)** uses EmailJS. Required host env vars (see `.env.local`):
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = `service_gx0f59h`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = `template_gvovijl`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — falls back to an error state if empty.

## Pending / Known Gaps

- `public/Resume.pdf` is still the **old CV** — needs replacing with the current full-stack CV.
- Per-locale `generateMetadata` only exists on project/article detail pages; other pages use generic metadata.
- No `sitemap.ts`, `robots.ts`, or web app **manifest** yet.
- Default favicon; no OG/social image; no custom logo polish beyond `src/assets/logo.png`.
- Not deployed yet; no test suite.
- EmailJS keys must be set again on the deploy host (`NEXT_PUBLIC_*`).