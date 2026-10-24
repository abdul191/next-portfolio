# Abdul Rehman — Full-Stack Developer Portfolio

Production portfolio for a full-stack developer, built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4**, and `next-intl`. The site is fully localized in **English**, **Arabic**, and **Urdu** with RTL support.

The portfolio includes 10 project case studies, 6 long-form articles, service and experience sections, dark/light themes, and a working contact form.

## Stack

- Next.js 16.4 (Turbopack) — App Router, static generation, localized metadata
- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`) + shadcn/ui / Radix primitives
- `next-intl` — localized routing (`/en`, `/ar`, `/ur`), RTL, translations
- `next-themes` — dark/light/system theme
- `lottie-react` — hero animation
- `react-icons` — Font Awesome icon set
- `@emailjs/browser` — contact form delivery

## Routes

| Route | Description |
| --- | --- |
| `/{locale}` | Home — hero, skills, services, experience, projects, testimonials, articles, contact |
| `/{locale}/about` | About and background |
| `/{locale}/services` | Services and working process |
| `/{locale}/projects` | Project index with case-study previews |
| `/{locale}/projects/[slug]` | Case study: wide gallery, snapshot, overview, challenge/solution/outcome, features, links, related projects |
| `/{locale}/articles` | Article index with featured post |
| `/{locale}/articles/[slug]` | Long-form article with reading time, key takeaway, sharing, and related posts |
| `/{locale}/contact` | Two-column contact page with form and direct contact details |

Supported locales: `en`, `ar`, `ur`. Arabic and Urdu render RTL.

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_gx0f59h
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_gvovijl
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The service and template IDs have development fallbacks in `ContactMe.tsx`; the public key has no fallback, so submitting without it shows the error state.

### Verification gates

```bash
npx tsc --noEmit     # typecheck
npm run lint         # ESLint
npm run build        # production build — currently 69 static pages
```

Dev smoke test: start `npm run dev`, then check `/en`, `/ar`, `/ur`, `/en/projects`, `/en/projects/gtrack-esignature`, `/en/articles`, `/en/articles/react-performance-tips`, and `/en/contact`.

Stop a dev server on Windows:

```bash
netstat -ano | grep ":3000" | grep LISTEN | awk '{print $5}' | sort -u | while read pid; do taskkill //F //PID "$pid"; done
```

## Project Structure

```text
src/
  app/
    [locale]/
      about/
      articles/
        [slug]/
      contact/
      projects/
        [slug]/
      services/
      layout.tsx          # localized shell, theme, nav, footer, page transition
      page.tsx            # home composition
    globals.css           # theme tokens, shared utilities, animations
    global-not-found.tsx
  assets/
    images/projects/      # compressed project cover + gallery screenshots
  components/
    ArticleShare.tsx      # copy-link / X / LinkedIn sharing
    Portfolio.tsx         # project carousel on home
    ProjectGallery.tsx    # detail gallery with wide variant
    ContactMe.tsx         # shared form; section and page variants
    ...
  data/
    site.ts               # email, phone, socials, CV path
    projects.ts           # 10 project records
    project-images.ts     # covers + per-project galleries
    project-ui.tsx        # project colors/icons
    article-ui.tsx        # article accents + reading-time helper
  i18n/                   # next-intl routing + navigation
  messages/               # en.json / ar.json / ur.json
public/Resume.pdf         # still the older CV
```

## Content and Localization

- Long-form project and article copy lives in `src/messages/{en,ar,ur}.json`.
- Project metadata and URLs live in `src/data/projects.ts`.
- Project screenshots are stored in `src/assets/images/projects/` and mapped in `src/data/project-images.ts`.
- All three locale files must keep identical keys.
- The shared container width is `max-w-[84rem]`; section rhythm uses `py-12 sm:py-16` via `.container-section`.
- The contact page uses `<ContactMe variant="page" />`; the home page keeps the default section layout.

## Key Implementation Notes

- **Static generation**: all localized pages are prerendered. Detail routes use `generateStaticParams` for every locale and slug.
- **Project galleries** use `ProjectGallery` with `variant="wide"` on detail pages and the default frame on the project index. Thumbnails switch the active screenshot client-side.
- **Article UX** adds per-article accent gradients/icons, estimated reading time (`words / 180`, minimum 2 minutes), a derived key takeaway, and client-side sharing via `ArticleShare`.
- **Carousels**: `Portfolio` and `Testimonials` are RTL-aware, support arrows/dots, and autoplay every 5 seconds with pause on hover/focus.
- **Animations**: `PageReveal` transitions on pathname changes; `Reveal` and `Stagger` use `IntersectionObserver` for scroll reveals.
- **Client state**: prefer derived values and idempotent effects; avoid synchronous `setState` inside effects. Use `useSyncExternalStore` when subscribing to browser APIs such as `matchMedia`.
- **Lottie sizing**: `lottie-react` v3 ignores sizing classes inside `.lottie-display`. `LottieAnimation.tsx` wraps it in an explicitly sized container; keep that pattern.
- **Header**: sticky, single-row on desktop, becomes more opaque with `backdrop-blur-xl` after scrolling. Anchor targets use `scroll-mt-20`.
- **Contact form**: EmailJS submission with idle/sending/success/error states and a 500-character message limit.

## Pending / Known Gaps

- `public/Resume.pdf` is still the older CV and should be replaced.
- Case-study facts and copy should be reviewed before launch for accuracy.
- Contact and article-index routes do not define route-specific metadata yet; they inherit layout metadata.
- No `sitemap.ts`, `robots.ts`, web app manifest, or Open Graph image yet.
- Default favicon and placeholder public assets remain.
- No automated test suite.
- Not deployed yet; EmailJS variables must be configured on the hosting provider.
