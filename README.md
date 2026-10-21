# Malorfa — personal brand website

Production-ready MVP for a multifaceted professional brand: **corporate risk & insurance**, **plant-tropist**, **solo travel**, and **published author**—one cohesive visual system, not four microsites.

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS v4**

All personal details, credentials, book titles, plant species, destinations, and contact info are clearly marked `[PLACEHOLDER: …]` so you can swap real content safely. Nothing on this site implies a real insurance license or firm affiliation.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

Deploy on Vercel: connect the repo and use the default Next.js preset. The pages render without environment variables. The contact form and newsletter need the keys in [Environment variables](#environment-variables) before submissions succeed.

---

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home — positioning, trust strip, services, books, travel, plants CTAs |
| `/about` | Biography, timeline, values, credentials placeholders |
| `/services` | Risk & insurance offerings, process, case studies, FAQ |
| `/risk-insurance` | Alias → `/services` |
| `/plants` | Collection, care tips, partner nursery catalog stubs |
| `/travel` | Solo travel journal listing |
| `/travel/[slug]` | Story detail (+ plants noted on the road) |
| `/books` | Author works grid, excerpts, speaking/press stubs |
| `/books/[slug]` | Book detail |
| `/author` | Alias → `/books` |
| `/contact` | Contact form (Resend) + email / calendar stubs |

---

## Project structure

```
src/
  app/                 # App Router pages, layout, and form route handlers
  components/
    layout/            # Header, Footer
    ui/                # Button, Card, SectionHeader, etc.
    forms/             # ContactForm
    effects/           # Hero motion, tip widget, cursor, grain
  content/             # Editable placeholder content (swap first)
  hooks/               # Motion preference hooks
  lib/                 # cn / clsx helpers
public/
  media/               # Hero video + poster placeholders
  og-placeholder.svg   # Open Graph placeholder
```

**Content first:** edit files in `src/content/` (`site.ts`, `about.ts`, `services.ts`, `plants.ts`, `travel.ts`, `books.ts`, `testimonials.ts`).

---

## Design system

- **Type:** Cormorant Garamond (display) + Source Sans 3 (body)
- **Palette:** ink, forest, sage, moss, stone, sand, ivory, muted brass — refined botanical greens without a nursery-only look
- **Tokens:** CSS variables in `src/app/globals.css`; reusable components for nav, footer, buttons, cards, CTAs, forms, testimonials
- **Motion:** Motion library for hero reveal; CSS for leaf rustle / grain; scroll-driven plant SVG; honors `prefers-reduced-motion`

---

## Wow-factor add-on

First-visit enhancements layered onto the core IA (not separate microsites):

1. **Interactive hero (plant growth + light parallax)** — An original SVG plant unfurls as you scroll through the hero; the dual-identity video layers shift subtly. Static full-growth plant + frozen video when `prefers-reduced-motion` is on.
2. **Hero dual-identity video** — Muted, looping, `playsInline` autoplay video contrasting boardroom ↔ greenhouse tones (`/public/media/hero-dual-identity.mp4` + `hero-dual-identity-poster.svg`). Pauses when off-screen; never plays with sound. Hero copy remains readable via scrim and stands alone if the video fails.
3. **Micro-interactions** — Leaf accents rustle on hover (nav, facets, plant cards). **Today’s plant tip** widget on Home and `/plants` rotates from a local 14-tip array by calendar day (`YYYY-MM-DD`), with `localStorage` day key.
4. **Signature detail — custom cursor** — Soft leaf/dot cursor on fine-pointer desktops only; default cursor restored on touch devices and when reduced motion is preferred. (Ambient audio toggle was not added—cursor is the single signature.)
5. **Extra moment — soft page-load reveal** — Hero brand, headline, support copy, CTAs, and media stagger in once on first paint (disabled under reduced motion). Travel cards also use a lightweight CSS film-grain overlay for editorial texture.

### Swap in real client media

| Asset | Path | Notes |
|-------|------|--------|
| Dual-identity video | `public/media/hero-dual-identity.mp4` | Replace with 6–12s muted H.264 clip (boardroom ↔ greenhouse/garden). Keep poster aspect similar to avoid CLS. |
| Video poster | `public/media/hero-dual-identity-poster.svg` | Replace with `.webp`/`.jpg` and update `poster` in `HeroVideo.tsx` if needed. |
| Tips | `src/content/dailyTips.ts` | Edit the 14 sample tips / plant names. |

### Accessibility & motion

- `prefers-reduced-motion: reduce` → no plant growth animation, no parallax, no custom cursor, no staggered reveal; video paused; content fully usable.
- Tip widget is keyboard-readable and announces the day key via `aria-live`.
- Video is decorative/`aria-hidden`; headline and CTAs do not depend on it.

---

## Figma references (adapted, not copied)

Visual language drew structure, typography hierarchy, spacing, and section *ideas* from Figma Community templates. Layouts, assets, and copy were **not** copied; the system is original.

1. **Emily** — Warm personal-brand hero and writerly about energy; informed the human, story-driven voice beside corporate pages.
2. **Expert X** — Consultant trust patterns: services grids, process steps, and credible CTA bands for risk & insurance.
3. **Insighter** — Business-strategist case-study / outcome card patterns and boardroom-ready section rhythm.
4. **Grace** — Creative portfolio showcase pacing for books and personal facets without clutter.
5. **Author Website Landing Pages** — Book grid, detail, excerpt, and speaking/press placeholder patterns.
6. **Travel Blog or Magazine** — Editorial listing + story detail for the solo travel journal.
7. **PlantLover** — Collection gallery, care tips, and light partner-nursery catalog (no checkout).
8. **Natasha** — Personal portfolio nav clarity and polished multi-page cohesion.

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. Set the same names in Vercel (Project → Settings → Environment Variables) for Production, and for Preview if those deployments should accept submissions. Never commit real keys. The site builds without them; a missing key returns a clear error and does not print the secret.

| Name | Required | Purpose |
|------|----------|---------|
| `RESEND_API_KEY` | Contact form | Resend API key with sending access on `notifications.malorfa.com`. |
| `BUTTONDOWN_API_KEY` | Newsletter | Buttondown API token (`Authorization: Token …`). |
| `RESEND_FROM_EMAIL` | No | From address for both contact emails. Default: `Malorfa Aryee <hello@notifications.malorfa.com>` |
| `CONTACT_ADMIN_EMAIL` | No | Inbox that receives contact notes, and the reply-to on the confirmation. Default: `hello@malorfa.com` |

Contact submissions send two emails through Resend: an admin notification (reply-to is the sender) and a confirmation to the sender (reply-to is `CONTACT_ADMIN_EMAIL`). Newsletter signups call Buttondown `POST /v1/subscribers`. New subscribers stay on Buttondown’s double opt-in unless you later change that in the request. An address that is already subscribed gets a friendly confirmation instead of an error.

Both forms validate on the server, include a hidden honeypot, reject instant submits, and apply a small in-memory rate limit (5 attempts per 10 minutes per IP, per server instance).

Preview the contact emails locally:

```bash
npx tsx scripts/render-email-previews.ts
```

HTML and plain-text files are written to `email-previews/`.

### Resend and Buttondown setup

- Resend: the sending domain `notifications.malorfa.com` must stay verified, and the from address must be on that domain. `hello@malorfa.com` is the destination inbox, not the Resend from address.
- Buttondown: create an API key for the newsletter. Subscribers receive a confirmation email before they are counted as regular. Passing the visitor IP helps Buttondown’s firewall; do not enable the bypass-firewall header.

---

## TODOs before launch

- [ ] Replace all `[PLACEHOLDER: …]` copy, photos, and credentials with real (verified) details
- [ ] Replace hero dual-identity **video** + **poster** in `public/media/`
- [x] Wire **contact form** through Resend (`RESEND_API_KEY`)
- [x] Wire **newsletter** through Buttondown (`BUTTONDOWN_API_KEY`)
- [ ] Add `RESEND_API_KEY` and `BUTTONDOWN_API_KEY` in Vercel
- [ ] Set `site.calendarUrl` and any remaining social placeholders
- [ ] Point `metadataBase` / `siteUrl` at `https://malorfa.com` (still `https://malorfa.vercel.app` in `src/lib/seo.ts`)
- [ ] Add real OG images; replace `public/og-placeholder.svg`
- [ ] Optional: partner nursery deep links or a lightweight commerce integration
- [ ] Legal pages (privacy / terms) beyond footer stubs

---

## Phased rollout plan

### Phase 0 — Foundations (done in this MVP)
Ship the multi-route site, design tokens, reusable components, and placeholder content. Validate voice and IA with stakeholders.

### Phase 1 — Identity & content
Real name, photography, biography, verified credentials, book metadata, and plant collection. Tighten SEO titles/descriptions per page.

### Phase 2 — Lead capture
Contact form and newsletter are connected (Resend and Buttondown). Still to do: scheduling link, and optional CRM tagging by topic (consulting / speaking / plants / media).

### Phase 3 — Editorial depth
Expand travel and plant journal (MDX or CMS). Add more case studies (with client approval). Speaking calendar.

### Phase 4 — Light commerce / partnerships
Partner nursery fulfillment links or shop embed if desired—still optional; keep brand primary over catalog.

### Phase 5 — Polish & measure
Analytics, performance pass, accessibility audit, OG images, and a simple content update checklist for the owner.

---

## License note

Template inspired by public Figma Community examples for learning/structure only. Do not redistribute scraped Figma assets. Site content placeholders are fictional.
