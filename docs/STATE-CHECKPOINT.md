# State Checkpoint — Infra8 homepage (paste into a fresh session)

Last updated: 2026-09-29. Live: https://infra8-website.vercel.app · Repo: https://github.com/abdullahali-web3/infra8-website (private, `main`).

## 1. Ultimate goal
Ship a professional B2B marketing site for a client (Infra8, a senior engineering team that builds MVPs and runs cloud/DevOps). It must be SEO + GEO + AEO friendly, use GSAP + Motion + custom illustrations, and match the client's Figma design exactly where Figma exists. We are now **improving the homepage one section at a time**. Nav, hero, trust strip and Services cards are finished; do not redo them unless asked.

## 2. Established facts and decisions

**Figma source of truth:** https://www.figma.com/design/n21KkJmFYtBWvVhTpgE7DM/Anydesign.studio?node-id=98-26651 (frame "Homepage v1", 1440 wide). Sections that exist in Figma: nav `98:26695`, hero text `114:26780`, hero illustration `115:32214`, trust strip `164:510`, "Our services" cards `171:698`, "How it works" `177:762`. Figma MCP is connected (`whoami` works). A 1x reference render is at `design/figma-1440-mcp.png` (git-ignored, local only; refreshed 2026-09-29 from node `98:26651` via `get_screenshot`). **`design/figma-1440.png` is STALE** (it still shows the old mono-uppercase nav and buttons). Figma changes under you, so re-render before comparing, and always trust the MCP over any cached image.

**Status by section**
| Section | State |
|---|---|
| Nav, Hero, Client strip | DONE. Re-matched to the current Figma on 2026-09-29 (pill buttons, Inter nav, strip spacing fixed: title row 52px, hatch panels 90px, hero bottom padding 98px). Verified by measured rows against a fresh Figma render |
| Services (3 stage cards) | DONE. Exactly per Figma `171:698`: no bullets, no price line, Figma card copy and pills (verified to ~0.3px). Bullet copy is still in Figma as hidden layers if the client wants it back |
| Commitments (4 cards) | **REMOVED** at the client's request (2026-09-29): component, illustration, data and nav entry deleted (recoverable from git history) |
| How it works (2 tabs) | DONE 2026-09-29 per Figma `177:762`: layout, copy, tab names, Title Case H2, Figma pill CTA, 22px card titles, STEP→title 20px and title→text 12px, flat hover (white + 1px `#e7e7e7`, no shadow/lift). All 8 illustrations rebuilt as flat product-UI mockups (`StepArt.tsx`) |
| Pricing | **REMOVED** at the client's request (2026-09-29): section, `PRICING` data, nav/footer links, the Build card's details link and the placeholder pricing table in `public/llms.txt` |
| Tool stack | DONE 2026-09-29, client-directed (no Figma): a dome of three orbits with 32 real tool logos and category pills travelling around it, a stats bar inside the inner arc, then heading, category chips, two "why this stack" notes and a CTA. `ToolOrbits.tsx` + `.orbit-*` CSS in `globals.css`, data in `STACK` (`content.ts`) |
| AI workflow, Proof, Fit, FAQ, Final CTA, Footer | First pass, no Figma. Need review |

**Design rules the client has given (apply to every section)**
- Typography: Google Sans Flex (headings, buttons), Inter (body), Geist Mono (labels and nav ONLY), Newsreader italic weight 200 for the thin serif accent word ("and", "for", "of"). Colors: brand `#0654fe`, orange accent `#ff9c33`, greys `#f1f1f1` `#f7f7f7`, line `#e7e7e7`.
- Body text max 16px. Exceptions where Figma specifies 18px: the hero sub and the Services section sub (`SectionHeading figma subSize`, 16px on mobile). **Nav items are Inter 14px, sentence case** (client override of Figma's 16px; Figma has Inter, not Geist Mono, in the nav), **32px apart** (client override of Figma's 40px). The dropdown chevron is drawn at its native 7.2x4.2px inside a 6x3 layout box, exactly as Figma does. The Services sub is capped at 520px on purpose so it breaks "...or hand us / your cloud and DevOps once you're live at scale." (Figma's 722px leaves a long first line and a short second).
- Animation: only H1/H2 headings use the word-by-word reveal from below the baseline (fast, ~0.65s). All other text and blocks just fade in. Implemented in `src/components/ui/RevealText.tsx` by tag.
- Buttons (changed 2026-09-29): **nav, hero and Services use the Figma pill** (`src/components/ui/PillButton.tsx`): 8px padding, 32px white chip with a chevron, primary = brand blue, secondary = `#f1f1f1`; every label is Inter 16px in title case (the client asked for the service-card buttons to match the hero's, overriding Figma's Geist Mono caps there; cards keep Figma's full-width layout). **Hover:** a darker fill (`brand-deep` / `surface-deep`) wipes in from the left and exits to the right; the chevron never moves. It fires only on the button's own hover/focus (named `group/pill`), never because a parent card is hovered. **The Services cards have no hover effect of their own** (no lift, border or shadow; client asked for it removed). The older corner-bracket `Button.tsx` is still used by the sections not yet reviewed (Commitments, How it works, Tool stack, Pricing, Proof, FAQ, Final CTA). **Open question for the client: switch the whole site to the Figma pill?**
- Serif accent words ("and", "of", "for") are Newsreader italic **weight 400** (tried 200, 300 and 500 on 2026-09-29: the client found 200 and 300 too light and 500 too bold); one shared style in `RevealText`, `SectionHeading` (light variant) and `FinalCta`.
- Nav: 108px tall at the top of the page; once scrolled it shrinks to a slim 64px translucent bar (78 to 56px on mobile) with a hairline and a slightly smaller Contact button. Implemented with transforms only (the header keeps a fixed layout height so nothing shifts). An open mobile menu keeps the full-height bar.
- Wherever tools are mentioned, use real brand logos (`public/content/logos/*.svg`, map in `src/lib/logos.ts`). Do not write tools as plain text.
- Illustration style: polished glass cards, soft gradients, logo badges, ribbons (like the client's reference screenshots), never flat/clip-art. Shared kit: `src/components/illustrations/art.tsx` and global gradients in `SvgDefs.tsx`.
- Hero and strip copy is taken exactly from Figma. The client said **not to follow the earlier chat copy for the hero and strip**. Other sections still use the chat copy (`docs/PROJECT-BRIEF.md`, `src/lib/content.ts`); expect the client to give new direction per section.

**Hero/strip specifics**
- H1: "We Build MVPs for Founders and Run Dedicated DevOps, Cyber & Cloud Infra Management". Buttons "Let's Discuss Your Project" / "See Services". Nav: Services, Products, Company, Resources (each with a chevron dropdown; dropdown items are our placeholders) + "Contact Us".
- Hero lattice logos are raster cut-outs from Figma's own render (`public/content/hero/*.png`, made by `design/crop-logos.mjs`), because Figma's exported SVGs depend on parent transforms. **They are now cut at native resolution from Figma's own 4x render** (`design/crop-logos-4x.mjs` reads `design/hero-illu-4x.png`, exported with `download_assets` at `defaultScale: 4`, then writes `public/content/hero/*.png` and `design/hero-logo-boxes-4x.json`; measured ~27% crisper edges than the old 1x-upscaled cut-outs). `get_screenshot` cannot upscale past the node's natural 1x size, so use `download_assets` (max scale 4) whenever you need more resolution. The originals are backed up in `design/hero-old-backup/`.
- The client strip fades in **after** the hero (`src/components/RevealAfterLoad.tsx`: never sooner than 0.9s after the page mounts, and with no delay if the visitor scrolls to it later). Before, its server-rendered HTML was visible immediately while the hero elements were still hidden, so on load the strip showed up alone.
- The middle Services card is a "featured" card: 24px taller than its neighbours on desktop (negative margins plus extra padding, so its content and buttons stay aligned with the other two). Set by `featured: true` in `STAGES`.
- Client strip is an infinite hover-to-pause marquee. **Its five logos (AlphaWave, Codecraft_, Biosynthesis, Calescence, Clandestine) are Figma template placeholders, not real clients.** Client chose to keep them. Replace before real launch.
- Text-box trim (`[text-box:trim-both_cap_alphabetic]`) is used in the hero, strip, nav labels, buttons and Services to match Figma spacing (supported in Chrome/Edge/Safari; Firefox falls back to normal spacing). `SectionHeading` takes an opt-in `figma` prop that turns on trim, the 18px sub and a 3.5px desktop top-pad on the H2 (Figma's line box is taller when the serif accent is on the line). Unreviewed sections leave it off.
- Services cards deliberately differ from Figma in one invisible way: Figma's Scale primary button has a 1px white border on a white card (50px tall vs 48px). We keep all pills 48px.

**Unconfirmed facts (placeholders, need client confirmation before launch):** prices (no longer shown anywhere: the Services price line and the Pricing section were removed), "3 months" retainer term, "4–6 hours" time-zone overlap, "named senior engineers", production domain, contact email/lead routing, real client logos, sample deliverables (currently illustrated mockups labelled SAMPLE).

## 3. Technical specs and constraints
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4 (`@theme` tokens in `src/app/globals.css`), Motion (`motion/react`), GSAP + `@gsap/react` (plugins registered only in `src/lib/gsap.ts`).
- Commands: `npm run dev` (use `-p 3100`), `npm run build`, `npm run lint`. Screenshot helpers live in `scripts/` and (git-ignored) `design/`.
- Deploy: Vercel CLI only. Run `vercel deploy --prod --yes` from the project root. Git auto-deploy is NOT connected because the Vercel login (`mabdullahaliofficial-9377`) and GitHub (`abdullahali-web3`) are different accounts. `NEXT_PUBLIC_SITE_URL` is set in Vercel production to `https://infra8-website.vercel.app` (add it with `printf`, not PowerShell pipes, and `site.ts` trims it).
- Git identity is set repo-locally to `abdullahali-web3` with the GitHub noreply email. Commit only when asked; end commits with the Co-Authored-By line.
- Gotchas learned: (1) never put an SVG `transform` attribute on a Motion element that animates scale/y — wrap it in a static `<g transform>`; (2) GSAP rotating an SVG group around a fixed point needs `svgOrigin`, not `transformOrigin` px; (3) illustration gradients/filters are defined once in `SvgDefs` and referenced by id; (4) tab panels render both tabs in the DOM (`hidden` attr) for SEO; (5) keep `overflow-x` under control on mobile (grid children need `minmax(0,1fr)`); (6) on Windows use the Bash tool for shell scripts; the auto-mode classifier sometimes errors transiently, just retry; (7) Tailwind v4 `translate-*`, `scale-*`, `rotate-*` are standalone properties, so transition them with `transition-[translate]` / `[scale]` / `[rotate]` (not `transition-[transform]`); (8) the global `:focus-visible` rule must not set `border-radius` (it is unlayered, so it beats `rounded-full` and turns a focused pill into a rounded rectangle); (9) `transition-colors` also fades `outline-color`, so read a focus ring's colour ~500ms after focusing; (10) puppeteer `clip` is in document coordinates, so scroll and screenshot the viewport when checking a sticky header; (12) a plain Tailwind `group-hover:` fires when ANY ancestor with `.group` is hovered, so a button inside a `group` card reacts to the card; give reusable components a named group (`group/pill`, `group-hover/pill:`); (11) `scripts/audit-layout.mjs` is a generic template whose expected gutters (48/32/24) do not match this project (80/32/20), so it fails identically before and after any change; compare its output against the deployed baseline instead of treating FAIL as a regression.
- Content data lives in `src/lib/content.ts` (nav, clients, stages, steps, pricing, FAQ; FAQ also feeds FAQPage JSON-LD in `HomeJsonLd.tsx`). SEO/GEO entity data in `src/lib/site.ts`, `public/llms.txt`, `robots.ts` (AI crawlers allowed).
- Not built yet: forms and lead routing (all CTAs scroll to `#get-started`), analytics, inner pages (see `docs/EXECUTION-PLAN.md`), OG image, real domain.

## 4. Outstanding questions and immediate next step
Workflow for the next session: take the homepage **one section at a time**. For each: (a) if Figma has it, fetch it with the Figma MCP and match it exactly (compare screenshots side by side at 1440 and 390); (b) if not, agree copy and design with the client first; (c) apply the design rules above; (d) build, lint, screenshot, commit, deploy, share the link.

Suggested order and the first question for each:
1. ~~Services cards (Figma `171:698`)~~ DONE 2026-09-29, matched exactly to Figma (no bullets, no price line).
2. ~~How it works (Figma `177:762`)~~ DONE 2026-09-29. Order on the page now matches Figma: Services, hatch band, How it works (60px hatch-to-eyebrow measured).
3. Next, one by one: AI workflow, Proof, Fit, FAQ, Final CTA, Footer. These still use the older corner-bracket `Button`, gradient/glass illustrations and un-trimmed `SectionHeading`; bring each to the same system (Figma pill `PillButton`, flat minimal illustrations like `StepArt.tsx`, `SectionHeading figma`, card language below).
- **Card language (Services + How it works):** `#f7f7f7` card, 1px transparent border, 16px radius, 24px inner padding; illustration panel `#f1f1f1`. Services cards have no hover; How it works cards turn white with a 1px `#e7e7e7` stroke on hover. Secondary button inside a grey card is the `white` `PillButton` variant (white pill, `#f1f1f1` chip).
- **Illustration language (client rule, 2026-09-29):** the old gradient/glass/shadow illustrations read as cartoonish. New ones are flat product-UI mockups: one white window with a 1px `#e7e7e7` hairline cropped by a light panel, ink text, one brand-blue accent, orange/green only as tiny status chips, real tool logos on hairline tiles, NO gradients, filters, shadows or inner shadows. Colours come from theme tokens via Tailwind `fill-*`/`stroke-*`. Numbers inside mockups are illustrative, not client claims. References: the client's Antigravity-style/identity-product screenshots and Figma's own sample table card.

Open items to ask the client: real client logos or keep template ones; production domain and email; final pricing; lead routing (form, email, CRM); whether nav dropdown items (Products, Resources) should link to real pages; whether the whole site should switch to the Figma `PillButton` (the older corner-bracket `Button` is still used by AI workflow, Proof, FAQ, Final CTA). **The Tool stack stats (32 tools, 3 clouds, 24 hrs) are derived from data and from the brief's "estimate in 24 hours" promise; ask the client for real numbers (years, projects shipped) if they want impact stats.**

## 5. Client request log, 2026-09-29 (built on Sonnet; the client will re-verify everything in a fresh Opus 5.5 session)
Treat every line as an acceptance check. "Client override" means the client chose a value that differs from Figma.

**Round 1 (nav, hero, strip, services)**
1. Nav exact to current Figma via the MCP; nav items 14px (client override of Figma's 16px).
2. Hero and nav buttons = the Figma pill (white chevron chip), not the old corner-bracket buttons.
3. Nav on scroll must shrink to a slim, elegant bar (built: 108px to 64px, 78px to 56px on mobile, transform-only).
4. H1 "and" too light: raise the weight.
5. Hero buttons exact to Figma including the 12px gap.
6. Services section exactly as in Figma (no chat-copy bullets/price line).
7. Deploy.

**Round 2**
1. Nav dropdown chevrons too small: match Figma (native 7.2x4.2 in a 6x3 box).
2. Nav item spacing: reduce by 8px (client override; 40px to 32px).
3. "and" still too light: raise the weight again.
4. Button hover: chevron must not move; the darker colour sweeps left to right.
5. Services sub-headline: first line far too long; re-wrap so two lines balance, upper line slightly longer (520px cap; breaks "...or hand us / your cloud and DevOps...").
6. Service-card buttons must be identical to the hero buttons (Inter 16px, title case, same padding/radius/colours).
7. Deploy.

**Round 3**
1. "and" now too bold: settle between (final: Newsreader italic 400, shared accent style).
2. Service cards: no hover effect at all; buttons react only to their own hover (named `group/pill`).
3. Deploy.

**Round 4**
1. Hero illustration blurry: logos re-cut at native resolution from Figma's 4x export (`design/crop-logos-4x.mjs`).
2. "Our engineers have shipped at" was visible on load before the hero: strip now fades in after the hero (`RevealAfterLoad`).
3. Middle Services card slightly taller than the other two (24px, content stays aligned).
4. Deploy.

**Round 5**
1. Services cards use the How it works card colour (`#f7f7f7`).
2. "View Service Details" button white instead of grey; its arrow circle `#f1f1f1` (`PillButton variant="white"`).
3. Remove the Commitments section.
4. How it works, bring into consistency: same button style and title-case labels; heading-to-text spacing smaller than STEP-to-heading spacing; slightly smaller card titles; hover = white + `#e7e7e7` stroke with no shadow; illustrations rebuilt sleek, minimal and professional (Antigravity-style, like the screenshots shared), no gradients/shadows/inner shadows.
5. Deploy all of it.

**Round 6 (pricing, tool stack)**
1. Remove the Pricing section (done, plus every link and claim that pointed at it).
2. Rebuild the Tool stack like the reference image: a stats bar and tool logos moving in orbits, "exact effects" (built: three hairline arcs, logos and group pills travelling around them and staying upright, stats inside the inner arc that count up on scroll, hover pauses all motion, reduced-motion respected).
3. Deploy (only if asked in that message).

**Judgement calls worth a second look** (my interpretation, not the client's words): "Contact Us" label kept at 16px while links are 14px; accent-word weight applied site-wide; service-card buttons kept full-width (Figma layout) with hero typography; Figma's Scale primary button is 50px tall (invisible white border), ours 48px everywhere; 3.5px top pad on the Services H2 to match Figma's taller line box; illustration copy and numbers are invented sample UI text; How it works Cloud/DevOps track copy is ours (Figma only defines Product Development); hero bottom padding 98px and strip title row 52px were derived from Figma metadata.

**Also: the Tool stack was designed from a single reference screenshot (a semicircle of arcs, avatar/pill badges, three stats, headline, chips), so its motion speeds (90/130/180 s per turn), badge size and pocket around the stats are my choices. Technique: rings rotate around the stage's bottom-centre; each item is nested `slot (rotate θ) > arm (translateY -r) > counter (reverse spin, same duration) > upright (rotate -θ)`, so nothing needs JS; sizes use container-query units.

**Not done / still open:** nothing from 2026-09-29 is committed; the older `Button` still exists for unreviewed sections; nav dropdown items are placeholders; `scripts/audit-layout.mjs` config is a generic template (fails identically before/after).
