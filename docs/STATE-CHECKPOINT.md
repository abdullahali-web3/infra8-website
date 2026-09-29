# State Checkpoint — Infra8 homepage (paste into a fresh session)

Last updated: 2026-09-29. Live: https://infra8-website.vercel.app · Repo: https://github.com/abdullahali-web3/infra8-website (private, `main`).

## 1. Ultimate goal
Ship a professional B2B marketing site for a client (Infra8, a senior engineering team that builds MVPs and runs cloud/DevOps). It must be SEO + GEO + AEO friendly, use GSAP + Motion + custom illustrations, and match the client's Figma design exactly where Figma exists. We are now **improving the homepage one section at a time**. Hero and trust strip are finished; do not redo them unless asked.

## 2. Established facts and decisions

**Figma source of truth:** https://www.figma.com/design/n21KkJmFYtBWvVhTpgE7DM/Anydesign.studio?node-id=98-26651 (frame "Homepage v1", 1440 wide). Sections that exist in Figma: nav `98:26695`, hero text `114:26780`, hero illustration `115:32214`, trust strip `164:510`, "Our services" cards `171:698`, "How it works" `177:762`. Figma MCP is connected (`whoami` works). A 1x reference render is at `design/figma-1440.png` (git-ignored, local only).

**Status by section**
| Section | State |
|---|---|
| Nav, Hero, Client strip | DONE, matches Figma pixel-for-pixel (verified by side-by-side compare) |
| Services (3 stage cards) | First pass. Matches Figma layout, adds bullets + price line from chat copy. Needs section review |
| Commitments (4 cards) | First pass, no Figma. Needs review |
| How it works (2 tabs) | First pass, Figma has 4 step cards; ours use custom illustrations. Needs review |
| AI workflow, Tool stack, Pricing, Proof, Fit, FAQ, Final CTA, Footer | First pass, no Figma. Need review |

**Design rules the client has given (apply to every section)**
- Typography: Google Sans Flex (headings, buttons), Inter (body), Geist Mono (labels and nav ONLY), Newsreader italic weight 200 for the thin serif accent word ("and", "for", "of"). Colors: brand `#0654fe`, orange accent `#ff9c33`, greys `#f1f1f1` `#f7f7f7`, line `#e7e7e7`.
- Body text max 16px (the hero sub is 18px because Figma specifies it; that is the only exception). Nav is 16px Geist Mono exactly as Figma.
- Animation: only H1/H2 headings use the word-by-word reveal from below the baseline (fast, ~0.65s). All other text and blocks just fade in. Implemented in `src/components/ui/RevealText.tsx` by tag.
- Buttons: NOT the Figma pill. Use the corner-bracket style from the client's reference image, Google Sans, sentence/title case, no arrow chip. Primary = filled brand blue. Secondary = outlined grey. `light` / `ghost-light` variants are for the blue CTA panel. Component: `src/components/ui/Button.tsx`.
- Wherever tools are mentioned, use real brand logos (`public/content/logos/*.svg`, map in `src/lib/logos.ts`). Do not write tools as plain text.
- Illustration style: polished glass cards, soft gradients, logo badges, ribbons (like the client's reference screenshots), never flat/clip-art. Shared kit: `src/components/illustrations/art.tsx` and global gradients in `SvgDefs.tsx`.
- Hero and strip copy is taken exactly from Figma. The client said **not to follow the earlier chat copy for the hero and strip**. Other sections still use the chat copy (`docs/PROJECT-BRIEF.md`, `src/lib/content.ts`); expect the client to give new direction per section.

**Hero/strip specifics**
- H1: "We Build MVPs for Founders and Run Dedicated DevOps, Cyber & Cloud Infra Management". Buttons "Let's Discuss Your Project" / "See Services". Nav: Services, Products, Company, Resources (each with a chevron dropdown; dropdown items are our placeholders) + "Contact Us".
- Hero lattice logos are raster cut-outs from Figma's own render (`public/content/hero/*.png`, made by `design/crop-logos.mjs`), because Figma's exported SVGs depend on parent transforms. They are 1x-sourced, upscaled 3x.
- Client strip is an infinite hover-to-pause marquee. **Its five logos (AlphaWave, Codecraft_, Biosynthesis, Calescence, Clandestine) are Figma template placeholders, not real clients.** Client chose to keep them. Replace before real launch.
- Text-box trim (`[text-box:trim-both_cap_alphabetic]`) is used in the hero to match Figma spacing (supported in Chrome/Edge/Safari; Firefox falls back to normal spacing).

**Unconfirmed facts (placeholders, need client confirmation before launch):** prices ($10k, $8k/mo, $4k/mo and the pricing table), "3 months" retainer term, "4–6 hours" time-zone overlap, "named senior engineers", production domain, contact email/lead routing, real client logos, sample deliverables (currently illustrated mockups labelled SAMPLE).

## 3. Technical specs and constraints
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4 (`@theme` tokens in `src/app/globals.css`), Motion (`motion/react`), GSAP + `@gsap/react` (plugins registered only in `src/lib/gsap.ts`).
- Commands: `npm run dev` (use `-p 3100`), `npm run build`, `npm run lint`. Screenshot helpers live in `scripts/` and (git-ignored) `design/`.
- Deploy: Vercel CLI only. Run `vercel deploy --prod --yes` from the project root. Git auto-deploy is NOT connected because the Vercel login (`mabdullahaliofficial-9377`) and GitHub (`abdullahali-web3`) are different accounts. `NEXT_PUBLIC_SITE_URL` is set in Vercel production to `https://infra8-website.vercel.app` (add it with `printf`, not PowerShell pipes, and `site.ts` trims it).
- Git identity is set repo-locally to `abdullahali-web3` with the GitHub noreply email. Commit only when asked; end commits with the Co-Authored-By line.
- Gotchas learned: (1) never put an SVG `transform` attribute on a Motion element that animates scale/y — wrap it in a static `<g transform>`; (2) GSAP rotating an SVG group around a fixed point needs `svgOrigin`, not `transformOrigin` px; (3) illustration gradients/filters are defined once in `SvgDefs` and referenced by id; (4) tab panels render both tabs in the DOM (`hidden` attr) for SEO; (5) keep `overflow-x` under control on mobile (grid children need `minmax(0,1fr)`); (6) on Windows use the Bash tool for shell scripts; the auto-mode classifier sometimes errors transiently, just retry.
- Content data lives in `src/lib/content.ts` (nav, clients, stages, steps, pricing, FAQ; FAQ also feeds FAQPage JSON-LD in `HomeJsonLd.tsx`). SEO/GEO entity data in `src/lib/site.ts`, `public/llms.txt`, `robots.ts` (AI crawlers allowed).
- Not built yet: forms and lead routing (all CTAs scroll to `#get-started`), analytics, inner pages (see `docs/EXECUTION-PLAN.md`), OG image, real domain.

## 4. Outstanding questions and immediate next step
Workflow for the next session: take the homepage **one section at a time**. For each: (a) if Figma has it, fetch it with the Figma MCP and match it exactly (compare screenshots side by side at 1440 and 390); (b) if not, agree copy and design with the client first; (c) apply the design rules above; (d) build, lint, screenshot, commit, deploy, share the link.

Suggested order and the first question for each:
1. **Services cards (Figma `171:698`)**: keep the bullets and price line from the chat copy, or match Figma's cards exactly (no bullets/price)? Confirm final card copy.
2. **How it works (Figma `177:762`)**: which steps/copy, and should our illustrations replace Figma's placeholder table images?
3. Then Commitments, AI workflow, Tool stack, Pricing, Proof, Fit, FAQ, Final CTA, Footer, one by one.

Open items to ask the client: real client logos or keep template ones; production domain and email; final pricing; lead routing (form, email, CRM); whether nav dropdown items (Products, Resources) should link to real pages.
