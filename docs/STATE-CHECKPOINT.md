# State Checkpoint: Infra8 website (start a new session here)

Last updated: 2026-09-30. Live: https://infra8-website.vercel.app (production, deployed from local branch `theme/blueprint`, latest commit `ec6ef97`).
Repo: https://github.com/abdullahali-web3/infra8-website (private).

**GitHub is up to date (pushed 2026-09-30).** `main` and `theme/blueprint` point to the same commit, locally and on GitHub: the blueprint theme was fast-forwarded into `main` at the client's request ("I don't want my old design"). The classic theme survives only in git history (snapshot `6a71a5c`).

**Session status at handover:** all pages below are live, and every button leads to a real page. The one blocker for real leads is that **the contact form has no delivery channel** (section 6). Until one is set, submissions show a "couldn't send" message. The user was told and chose to deploy anyway.

## 1. Goal
A B2B marketing site for Infra8, a senior engineering team that **builds MVPs** for founders and **runs cloud, DevOps and security** for live products ("build it, then run it"). It must rank (SEO), be quoted by answer engines (AEO) and cited by AI assistants (GEO), and turn visitors into two leads: "Get MVP estimate in 24 hours" and "Free infra audit". The client (the user) reviews each round, sends screenshots, and asks to deploy when happy. Copy is written by us ("manage content by yourself"), within the no-unbacked-claims rule.

## 2. Where things stand

### Branches
- `theme/blueprint`: **the live site and the working branch**, tracked on GitHub.
- `main`: identical to `theme/blueprint` (fast-forwarded 2026-09-30). The blueprint theme is the only design; the client confirmed it and does not want the classic one.
- The classic-only files (`StepArt`, `AiPipeline`, `ProofArt`, `FinalArt`, `ToolOrbits`, `ui/Button`, `ui/PillButton`, orbit CSS, `SvgDefs` gradients) are unused and still in the tree. The client has now confirmed the theme, so they can be deleted: ask first, then build to verify nothing imports them.

### Pages (all static)
| Route | What it is |
|---|---|
| `/` | Homepage: hero with the Figma tile lattice, client strip, ticker, Services, How it works, AI-native workflow, Our stack (exploded layers), Work, Testimonials + stats, FAQ, final CTA |
| `/services` | Hub: hero, AEO answer, 3 service cards, comparison `<table>`, FAQ, CTA |
| `/services/mvp-development`, `/services/product-development`, `/services/cloud-devops-management` | Template `ServicePage`: hero, AEO answer, fit / not a fit, 6 deliverables, 4-step process, tools, pricing model with a minimum price, FAQ, related services, CTA |
| `/company/about` | AEO answer, "Why Infra8" (heading on the side, 6 icon rows: `ReasonRows`), 4 commitments, **placeholder** team grid (6), ways to work with us, CTA. No careers strip |
| `/company/how-we-integrate-ai` | Security concerns Q&A, where AI helps (dev + CloudOps), AI vs engineer table, 6 guardrails, FAQ, new `AiGateIso` illustration |
| `/resources/insights` + 8 articles at `/resources/insights/[slug]` | Text-only cards with a category filter; articles have a short answer, takeaways, TOC, tables, callouts, related service and articles |
| `/resources/careers` | Roles we hire for (no icons; not open postings), how we work, hiring steps, then an email CTA to `siteConfig.careersEmail` (**empty: shows a highlighted `[careers email]` placeholder** until the client sends it). Careers is not in the contact form; a job listing page and flow come later |
| `/company` and `/resources` | 307 redirects to About and Insights (`next.config.ts`) |
| `/products` | Catalogue of our own SaaS products (`src/lib/products.ts`): SVG thumbnail per product (`ProductThumb`), a card that opens a leave-site confirm `<dialog>` (`ProductLauncher`), then the product site in a new tab; a "Your product could be next" cell; why we build our own. Featured products (3) also appear in the Products mega menu |
| `/privacy-policy`, `/terms-of-service`, `/cookie-policy` | Template policies for the future **Wyoming LLC** (`src/lib/legal.ts`, template `LegalPage`). Every entity detail is a highlighted `[placeholder]` and a Draft notice shows while `LEGAL_DRAFT = true`. Checklist: `docs/LEGAL-PLACEHOLDERS.md`. They describe the site as it is today (Vercel hosting, no analytics or ad cookies) and must be updated when forms or analytics are added. Not legal advice: needs lawyer review |
| `/contact` | The one destination for every estimate, audit and contact button (service CTAs set `?topic=mvp/team/audit/careers`, which preselects the topic; `CTA.contact` is plain `/contact` with nothing preselected, and the topic is then required). Form order: "Connect With Us" heading, name/email, company/timeline, topic, message; the form sits in a dotted frame and leads, the aside (what happens next, benefits) is quieter. Form: Server Action `app/contact/actions.ts` (server-side validation, honeypot + 3-second bot check, keeps values on error) and a client form (`components/contact/ContactForm.tsx`, `useActionState`, focus moves to the error summary). Aside: what happens next. FAQ below |
| Custom 404 (`app/not-found.tsx`) | Every unmatched URL and every `notFound()` call: "This Page Doesn't Exist", new `NotFoundIso` (missing tile), popular links, noindex. Returns HTTP 404 |

### Next likely asks
**Connect lead delivery** (section 6: Resend key + inbox, or a webhook), real products, real legal details once the LLC exists, analytics (then update the privacy and cookie policies), OG images, production domain.

## 3. Design system ("blueprint" theme)
- **Frame:**
  - Every page sits in `BlueprintColumn`: a white column with hairline rails at the strip's edges and faint dotted gutters.
  - Sections are `BpSection` (hairline on top; `flush` means no top padding), separated by `SectionGap` (a dotted band).
  - There are **no** gaps before Our stack and Get started on the homepage (client request).
- **Headings:**
  - `SectionHead` = a small `Eyebrow` (blue square + mono label) + `SlashHeading` (`/ Two-line Title Case heading /`), with an optional sub on the right.
  - Page heroes (`ServiceHero`, `PageHero`) have **breadcrumbs only, no eyebrow**, and an H1 with `text-balance`.
- **Headings scale and wrap consistently** (client, 2026-10-03): H1/H2 use fluid tokens `text-h1` / `text-h2` (clamp, 52px / 44px at desktop) with `text-balance`; a `
` in heading copy is only a hint and renders as a space, so no width or zoom level strands one word on a line. `SlashHeading` caps at `max-w-[15em]` (about two lines). `design/orphans.mjs` scans pages for stubby lines.
- **Switches** (tabs and filters) use `ui/Segmented`: a light track with a sliding white thumb and count badges; one row that scrolls sideways on phones.
- **Icon beside text:** the text gets `[text-box:trim-start_cap_alphabetic]` so the `IconTile` top meets the cap height.
- **Typography:**
  - Google Sans Flex (display), Inter (body) and Geist Mono (labels).
  - **One heading font**: no serif accent words; the Newsreader font was removed.
  - **Title Case** for all H1/H2 and card titles (short words like for/of/and lowercase).
- **Header:** 80px desktop / 64px mobile, squashing to 64 / 56px on scroll.
- **Square markers** (eyebrows, buttons, tags, bullets) are 8px (`size-2`): a whole number of device pixels at 100/125/150/200% scaling, so they never render as rectangles. Their labels use `[text-box:trim-both_cap_alphabetic]` so the square centres on the capitals.
- **Final CTA** (`FinalCta`): always a single neutral "Partner With Us"; "Explore Services" is added everywhere except the service pages and /services (`explore={false}`).
- **All services carry equal weight** (client, 2026-10-02). General pages (home hero, About, AI page, Services hub, Products, footer, shared final CTA) use a neutral "Partner With Us" to `/contact` with no topic preselected. Service-specific CTAs appear only where every service gets its own (service cards, How it works tabs, each service page and its final CTA via `FinalCta cta=`).
- **Buttons:** `BlockButton` (redesigned 2026-10-03 after the client called the mono-caps version "casual"): square, 48px tall, Inter 15px medium in **Title Case**, and a 48px arrow cell split off by a hairline. Hover: a colour wipe, and the chevron slides out while a new one slides in. `outline` has a 20% ink border. The `card` variant turns blue when its `group/card` parent is hovered. Real `<button>`s (form submit, dialogs) use `blockButtonClass()` + `BlockButtonBody` (`icon` swaps the arrow, `arrow={false}` drops the cell). Mono caps stay for eyebrows, tags and small text links only.
- **Icons:** Lucide only. `ChevronRight` replaces every text arrow, and benefit lists use green `CircleCheck` (`Benefits`).
- **Content icons are Primer Octicons** (GitHub's set, `@primer/octicons-react`), keyed through `ServiceIcon` + `ICONS` in `components/ui/icons.ts`, always shown in `IconTile` (hairline square, **ink at rest, blue on `group/card` hover**, the same everywhere). Sizes: `line` (28px, top-aligned with a 28px text line), `sm`, `md` (44px with the native 24px drawing). Lucide stays for interface glyphs (chevrons, ticks). No square bullets in lists. Article body lists use a small brand `ChevronRight`. Squares remain only as the eyebrow/tag marker.
- **Form controls:** no native `<select>`; use `ui/Select` (themed listbox, full keyboard support, posts via a hidden input).
- **Cards:**
  - Cells share hairlines rail to rail. On hover a blue line draws along the top and the title turns blue. Nothing is pre-highlighted.
  - Grids that can be filtered, or whose last row may be incomplete, use the "clip" pattern: each cell has `border-r border-b` and the wrapper is `overflow-hidden` with the inner `-mr-px -mb-px`.
- **Illustrations:**
  - Isometric line art built from `src/lib/iso.ts` + `components/illustrations/iso/*` (`IsoBox` tones: paper, brand, solid, ghost, accent/accentSolid, which turn blue on card hover). Real tool logos lie on the top faces (`FaceLogo`, `LogoTile`).
  - Scenes:
    - `StageIso` (Launch / Build / Scale)
    - `DocIso` (scope, architecture and audit sheets)
    - `CtaIso` (build + run board, used in the final CTA; the client allows it to repeat)
    - `LayerStack` (homepage stack)
    - `AiGateIso` (AI page only)
    - `CareersIso` (careers hero only: a team board of four desks, one dashed "open seat")
    - `ServicesIso` (/services hero only: launch, build and run platforms stepping up, joined by a marching path)
  - Hero = `HeroLattice` (the Figma lattice, lifting tiles).
  - **Do not reuse a scene on a new page** (the final CTA is the exception).
- **Mega menu:** full width, aligned to the column. Services cards show their stage scenes, and Products shows the 3 featured products with thumbnails (clicking opens the leave-site dialog). Company and Resources are text-only (the client disliked icons there).
- **Insights cards:** text only (the client disliked repeated illustrations).
- **Motion:**
  - Only H1/H2 words reveal from below; other text fades in.
  - How it works and the AI tabs auto-advance; hovering a step fills its bar and holds it.
  - Layer stack: a GSAP scrub plus auto-cycling.
  - CSS loops for the iso scenes.
  - Everything respects reduced motion.

## 4. Content and data (single sources)
- `src/lib/content.ts`: `ROUTES`, `NAV` (mega menu data; `art` on service links, `allLabel` per panel), homepage copy, `STATS`, **placeholder** `TESTIMONIALS`, `FAQ`, `FOOTER` (Services, Company, Resources + legal).
- `src/lib/services.ts`: the three `Service` records and `SERVICES_HUB`. The minimum prices live in `pricing.minimum`.
- `src/lib/company.ts`: `ABOUT` and `AI_PAGE`. `src/lib/insights.ts`: 8 articles as typed blocks. `src/lib/careers.ts`.
- `src/lib/site.ts`: entity data (the domain and socials are still TODO). `public/llms.txt` lists every page, the minimum prices and the AI policy.
- SEO:
  - `pageMetadata()` in `src/lib/metadata.ts` sets title, description, canonical and OG for each page.
  - JSON-LD: Organization/WebSite in the root layout; Service/BreadcrumbList/FAQPage on service pages (`ServiceJsonLd`); BlogPosting on articles; AboutPage; Blog.
  - `sitemap.ts` covers every live route.

## 5. Unconfirmed facts: the client must sign off before a real launch
1. **Minimum prices** (live now): MVP from $8,000 (client set it on 2026-10-03, down from the brief's $10,000), dedicated team from $8,000/month, managed DevOps retainer from $4,000/month. These are the brief's bracketed "from" values. They appear on the service pages, in 3 articles and in llms.txt.
2. **Products** are 5 invented samples (Tallyloop, Driftguard, Shipnote, Quotewell, Formpilot) linking to example.com, each tagged "Sample"; no product schema until real. **Testimonials** are sample quotes with "Client name" and a visible "Sample quote" tag. **Team** profiles are placeholders (`/content/team/placeholder.svg`, tagged). The client-strip logos are Figma template placeholders.
3. **AI policies** on the AI page: tools used on business terms that don't train on client code, no secrets or customer data in prompts, AI has no production access, human approval on every deploy, opt-out on request. Also confirm the tool list.
4. Retainers month-to-month after an initial 3 months; a 4–6 hour time-zone overlap with US East/EU; the hiring steps on Careers; an ATS link if wanted (applications currently come through `/contact?topic=careers`).
5. **Legal**: the 17 placeholders in `docs/LEGAL-PLACEHOLDERS.md` (LLC name, Wyoming addresses, emails, effective date, court county, providers, retention periods, liability cap).
6. The production domain and email, and real impact numbers (years, projects shipped) if wanted.
7. **Social profile URLs** for Facebook, X, LinkedIn and Trustpilot (`siteConfig.socials`). The footer shows all four marks (grey, brand colour on hover); each becomes a link (and joins `sameAs`) once its URL is set.
8. **Careers email** (`siteConfig.careersEmail`), shown on the careers page CTA.

## 6. Lead delivery (must be set before leads can arrive)
The contact form sends nothing until one of these is set in Vercel (Project → Settings → Environment Variables → Production):
- **Email via Resend:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and optionally `CONTACT_FROM_EMAIL` (needs a verified sending domain; without it Resend's test sender is used).
- **Webhook:** `CONTACT_WEBHOOK_URL` for Slack, Zapier, Make or a CRM. It receives JSON with the lead fields plus a Slack-style `text` summary.

Both can be set; a lead counts as delivered if either accepts it. With neither, visitors see "We couldn't send your message just now" (their text is kept) and the server logs a warning. Tested end to end locally with a webhook receiver on 2026-09-30.

## 7. Technical notes and gotchas
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4 (`@theme` tokens in `globals.css`), Motion, GSAP (plugins registered only in `src/lib/gsap.ts`), lucide-react.
- Commands: `npm run dev -- -p 3100`, `npm run build`, `npm run lint` (the only warnings are in the git-ignored `design/` scripts).
- Deploy: `vercel deploy --prod --yes` from the project root (CLI account `mabdullahaliofficial-9377`). There is no Git auto-deploy. A one-off "Not authorized" response was transient; retrying worked.
- **Next 16 scroll:** a global `scroll-behavior: smooth` is no longer overridden on navigation. The fix is `data-scroll-behavior="smooth"` on `<html>` plus `ScrollReset` (scrolls to 0 on a pathname change unless the URL has a hash).
- Internal page links use `next/link`; hash links stay `<a>`. Dynamic segments: `params` is a Promise; articles use `generateStaticParams` + `dynamicParams = false`.
- Tailwind v4: never put two utilities for the same property on one element (use exclusive states like `max-lg:not-first:border-t` / `lg:nth-[n+3]:border-t`). `translate`/`rotate`/`scale` are standalone properties (`transition-[translate]`). Class names must appear literally (use maps like `COLS`).
- Screenshots: the helper scripts live in git-ignored `design/` (`fullurl.mjs`, `vp.mjs`, `sec.mjs`). In Git Bash, pass URL paths without a leading `/`. Full-page captures can show reveal sections and lazy logos as blank, so confirm with a viewport capture.
- Editing via Python heredocs: use `chr(92)+'n'` for a literal `\n` inside JS strings, or the Edit tool.
- The auto-mode command checker sometimes fails transiently; retry once or use the file tools.

## 8. Working rules from the client
- Deploy only when asked. Commits happen on `theme/blueprint` as part of each deploy. Never push or merge without asking; when a push is approved, fast-forward `main` to match so GitHub's default branch shows the current site.
- Verify every change in the browser (desktop plus 360–1024 widths, overflow check) before reporting.
- Keep the design conversion-first and uncluttered; the client rejected "too geometric" details before.
- No invented numbers, clients, people, certifications or job openings. Placeholders must be visibly marked.
