# State Checkpoint: Infra8 website (start a new session here)

Last updated: 2026-09-30. Live: https://infra8-website.vercel.app (production, deployed from branch `theme/blueprint`).
Repo: https://github.com/abdullahali-web3/infra8-website (private). Nothing has been pushed to GitHub yet; all work is local commits.

## 1. Goal
A B2B marketing site for Infra8, a senior engineering team that **builds MVPs** for founders and **runs cloud, DevOps and security** for live products ("build it, then run it"). It must rank (SEO), be quoted by answer engines (AEO) and cited by AI assistants (GEO), and turn visitors into two leads: "Get MVP estimate in 24 hours" and "Free infra audit". The client (the user) reviews each round, sends screenshots, and asks to deploy when happy. Copy is written by us ("manage content by yourself"), within the no-unbacked-claims rule.

## 2. Where things stand

### Branches
- `theme/blueprint`: **the live site and the working branch.** It has not been merged into `main`; ask before merging.
- `main`: the old "classic" theme (snapshot `6a71a5c`), kept for reference only.
- On the blueprint branch, the classic-only files (`StepArt`, `AiPipeline`, `ProofArt`, `FinalArt`, `ToolOrbits`, `ui/Button`, `ui/PillButton`, orbit CSS, `SvgDefs` gradients) are unused. Delete them once the client confirms the theme is final.

### Pages (all static)
| Route | What it is |
|---|---|
| `/` | Homepage: hero with the Figma tile lattice, client strip, ticker, Services, How it works, AI-native workflow, Our stack (exploded layers), Work, Testimonials + stats, FAQ, final CTA |
| `/services` | Hub: hero, AEO answer, 3 service cards, comparison `<table>`, FAQ, CTA |
| `/services/mvp-development`, `/services/product-development`, `/services/cloud-devops-management` | Template `ServicePage`: hero, AEO answer, fit / not a fit, 6 deliverables, 4-step process, tools, pricing model with a minimum price, FAQ, related services, CTA |
| `/company/about` | Story, 4 commitments, **placeholder** team grid (6), ways to work with us, careers strip, CTA |
| `/company/how-we-integrate-ai` | Security concerns Q&A, where AI helps (dev + CloudOps), AI vs engineer table, 6 guardrails, FAQ, new `AiGateIso` illustration |
| `/resources/insights` + 8 articles at `/resources/insights/[slug]` | Text-only cards with a category filter; articles have a short answer, takeaways, TOC, tables, callouts, related service and articles |
| `/resources/careers` | How we work, roles we hire for (not open postings), hiring steps, apply CTA |
| `/company` and `/resources` | 307 redirects to About and Insights (`next.config.ts`) |
| **Still 404** | `/products`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy` (linked from nav and footer) |

### Next likely asks
Products page, policy pages, forms and lead routing (every CTA currently scrolls to `#get-started`), OG images, analytics, production domain.

## 3. Design system ("blueprint" theme)
- **Frame:**
  - Every page sits in `BlueprintColumn`: a white column with hairline rails at the strip's edges and faint dotted gutters.
  - Sections are `BpSection` (hairline on top; `flush` means no top padding), separated by `SectionGap` (a dotted band).
  - There are **no** gaps before Our stack and Get started on the homepage (client request).
- **Headings:**
  - `SectionHead` = a small `Eyebrow` (blue square + mono label) + `SlashHeading` (`/ Two-line Title Case heading /`), with an optional sub on the right.
  - Page heroes (`ServiceHero`, `PageHero`) have **breadcrumbs only, no eyebrow**, and an H1 with `text-balance`.
- **Typography:**
  - Google Sans Flex (display), Inter (body) and Geist Mono (labels).
  - **One heading font**: no serif accent words; the Newsreader font was removed.
  - **Title Case** for all H1/H2 and card titles (short words like for/of/and lowercase).
- **Buttons:** `BlockButton`: square, mono caps, a small square marker, and a wipe on hover. The `card` variant turns blue when its `group/card` parent is hovered. Full-width buttons end in a Lucide `ChevronRight`.
- **Icons:** Lucide only. `ChevronRight` replaces every text arrow, and benefit lists use green `CircleCheck` (`Benefits`).
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
  - Hero = `HeroLattice` (the Figma lattice, lifting tiles).
  - **Do not reuse a scene on a new page** (the final CTA is the exception).
- **Mega menu:** full width, aligned to the column. Only the Services cards have visuals (their stage scenes). Company, Products and Resources are text-only (the client disliked icons there).
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
1. **Minimum prices** (live now): MVP from $10,000, dedicated team from $8,000/month, managed DevOps retainer from $4,000/month. These are the brief's bracketed "from" values. They appear on the service pages, in 3 articles and in llms.txt.
2. **Testimonials** are sample quotes with "Client name" and a visible "Sample quote" tag. **Team** profiles are placeholders (`/content/team/placeholder.svg`, tagged). The client-strip logos are Figma template placeholders.
3. **AI policies** on the AI page: tools used on business terms that don't train on client code, no secrets or customer data in prompts, AI has no production access, human approval on every deploy, opt-out on request. Also confirm the tool list.
4. Retainers month-to-month after an initial 3 months; a 4–6 hour time-zone overlap with US East/EU; the hiring steps on Careers; a careers email or ATS link (apply currently goes to `/#get-started`).
5. The production domain and email, and real impact numbers (years, projects shipped) if wanted.

## 6. Technical notes and gotchas
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4 (`@theme` tokens in `globals.css`), Motion, GSAP (plugins registered only in `src/lib/gsap.ts`), lucide-react.
- Commands: `npm run dev -- -p 3100`, `npm run build`, `npm run lint` (the only warnings are in the git-ignored `design/` scripts).
- Deploy: `vercel deploy --prod --yes` from the project root (CLI account `mabdullahaliofficial-9377`). There is no Git auto-deploy. A one-off "Not authorized" response was transient; retrying worked.
- **Next 16 scroll:** a global `scroll-behavior: smooth` is no longer overridden on navigation. The fix is `data-scroll-behavior="smooth"` on `<html>` plus `ScrollReset` (scrolls to 0 on a pathname change unless the URL has a hash).
- Internal page links use `next/link`; hash links stay `<a>`. Dynamic segments: `params` is a Promise; articles use `generateStaticParams` + `dynamicParams = false`.
- Tailwind v4: never put two utilities for the same property on one element (use exclusive states like `max-lg:not-first:border-t` / `lg:nth-[n+3]:border-t`). `translate`/`rotate`/`scale` are standalone properties (`transition-[translate]`). Class names must appear literally (use maps like `COLS`).
- Screenshots: the helper scripts live in git-ignored `design/` (`fullurl.mjs`, `vp.mjs`, `sec.mjs`). In Git Bash, pass URL paths without a leading `/`. Full-page captures can show reveal sections and lazy logos as blank, so confirm with a viewport capture.
- Editing via Python heredocs: use `chr(92)+'n'` for a literal `\n` inside JS strings, or the Edit tool.
- The auto-mode command checker sometimes fails transiently; retry once or use the file tools.

## 7. Working rules from the client
- Deploy only when asked. Commits happen on `theme/blueprint` as part of each deploy. Never push or merge without asking.
- Verify every change in the browser (desktop plus 360–1024 widths, overflow check) before reporting.
- Keep the design conversion-first and uncluttered; the client rejected "too geometric" details before.
- No invented numbers, clients, people, certifications or job openings. Placeholders must be visibly marked.
