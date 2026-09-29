# Infra8 — Execution Plan

Sequenced so copy and facts come before design, and design before code (the chat's own rule). Each phase ends with a check before the next starts.

## Phase 0 — Foundation (DONE)
Next.js 16 + TS + Tailwind v4, Motion, GSAP, Claude config and reviewers, SEO/GEO/AEO base (metadata, JSON-LD Organization/ProfessionalService, robots with AI crawlers, sitemap, manifest, llms.txt), verify scripts. `npm run build` and `npm run lint` pass.

## Phase 1 — Lock facts and strategy (client input needed)
- Answer the open questions in `docs/PROJECT-BRIEF.md` section 6.
- Competitor audit (8–10 competitors) and pricing validation.
- Keyword research pass: validate the keyword map against real volume/difficulty; finalize primary keyword per page.
- Output: filled `src/lib/site.ts` and `public/llms.txt`, approved pricing table.

## Phase 2 — Design system and visual direction
- Brand tokens in `globals.css` `@theme` (color, type scale, spacing, radius, shadows), light/dark decision, font choice.
- Illustration language: define a small SVG system (Launch / Build / Scale scenes, architecture and pipeline diagrams, estimate-card visual) in a consistent stroke/fill style.
- Motion language: decide what gets Motion (reveals, hovers, tabs) vs GSAP (scroll-driven Launch→Build→Scale story, SVG path drawing, pinned "how it works").
- Figma frames for hero, stage cards, how-it-works, stack, pricing (Figma MCP is connected). Needs approval before build.

## Phase 3 — Homepage build (section by section, one component each)
Order: Nav + Hero (with estimate card) → trust/stack strip → stage cards → four commitments → how it works (two tracks, GSAP) → AI workflow → tool stack (tabs) → pricing snapshot → proof → who it's for → FAQ (with FAQPage JSON-LD matching visible text) → final CTA → footer.
Each section: build, screenshot, compare to design, run `audit:layout`.

## Phase 4 — Conversion plumbing
- Estimate form (MVP track) and audit request form (infra track): validation, spam protection, email/CRM delivery, thank-you state with "what happens next".
- Analytics and event tracking (CTA clicks per door, form starts/submits) to run the two-door vs single-CTA test the chat recommended.
- Calendly or booking link for the scoping call and audit.

## Phase 5 — Inner pages (each with its own metadata, JSON-LD, sitemap entry)
1. /pricing (full ranges plus what moves price; `Service`/`Offer` schema).
2. /mvp-development, /dedicated-development-team, /cloud-devops, /infra-audit (buyer-specific problem framing lives here).
3. /how-we-work, /company (named engineers, `Person` schema), /work (sample deliverables until case studies exist).
4. /insights (articles targeting the long-tail keywords; AEO-formatted Q&A).

## Phase 6 — SEO, GEO, AEO hardening
- Per-page unique title/description/canonical, breadcrumbs schema, OG images (`opengraph-image`), internal linking map.
- AEO: question-style headings with 40–60 word direct answers, FAQ/HowTo-style sections, real tables for pricing and comparisons.
- GEO: consistent entity facts everywhere, sameAs profiles (LinkedIn, GitHub, Clutch), llms.txt kept current, citations to real sources, presence on directories (Clutch, GoodFirms) once real.
- Google Search Console + Bing Webmaster verification, submit sitemap; track AI-referral traffic.

## Phase 7 — Quality gates and launch
- Performance: Lighthouse targets (LCP < 2.5s, CLS < 0.1, INP < 200ms), image/font optimization, GSAP loaded only where used.
- Accessibility: keyboard, focus, contrast, reduced-motion (Motion global config, GSAP `matchMedia`).
- Run `code-quality-reviewer` and `security-auditor` subagents; security headers/CSP; form abuse review.
- Responsive audit at all widths (`npm run audit:layout`) and real-device check.
- Create GitHub repo, connect Vercel (push-to-deploy, preview URLs), set `NEXT_PUBLIC_SITE_URL`, point the client's domain, redirects, 404 page.

## Phase 8 — Post-launch (first 90 days)
- Ship the first 2–3 case studies or sample deliverables as proof appears.
- Publish 1–2 insight articles per month aimed at the long-tail keywords.
- Review Search Console queries and the two-door click split; iterate hero and pricing.

## Decisions needed from you before Phase 2
1. Domain and brand assets available? Existing Figma or design direction?
2. Visual tone (e.g. dark technical, light editorial, playful illustrated).
3. Where should leads go (email, HubSpot, Slack, a CRM)?
4. Do you want the GitHub repo created private under `abdullahali-web3`, and Vercel connected now or later?
