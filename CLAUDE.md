# Infra8 — Project Instructions

> Root guardrails only. Detailed conventions live in `.claude/rules/`.
> Personal, uncommitted notes go in `CLAUDE.local.md` (gitignored).

## 🚧 Guardrails (read first)
- **Next.js may have breaking changes vs training data.** Check `node_modules/next/dist/docs/` (see `@AGENTS.md`) before using a Next API.
- **Verify before claiming done.** Run `npm run build`, then
  `node scripts/audit-layout.mjs <url>`, then screenshot the rendered section and
  compare it to the design — before saying it matches.
- **Never commit secrets.** `.env*` stays gitignored.
- **Ask before destructive or outward-facing actions** — force-push, deleting files you didn't create, changing deploy settings.
- **Commit/push only when asked**, in small focused chunks with clear messages.
- **Don't publish claims we can't back up.** Numbers, client logos, certifications and "named engineer" claims in copy need real facts from the client (see `docs/PROJECT-BRIEF.md`).

## Project
- Infra8: B2B marketing site for a senior engineering team that builds MVPs (Build) and runs cloud/DevOps/security (Run). Client website.
- Goal: rank on SEO + GEO + AEO and convert visitors into "Get MVP estimate in 24 hrs" or "Free infra audit" leads.
- Agenda, copy source and execution plan: `docs/PROJECT-BRIEF.md`, `docs/EXECUTION-PLAN.md`.
- Repo: not created yet. Host: Vercel (to be connected).

## Stack
- Next.js (App Router, Turbopack) · React · TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- Motion (`motion/react`) for UI transitions · GSAP + `@gsap/react` for scroll-driven/timeline/SVG illustration work
- ESLint

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint (Next 16+ does not lint during build)
- `npm run audit:layout` — responsive layout audit (needs dev server running)

## Structure
- `src/app/` — App Router routes: `layout.tsx`, `page.tsx`, `globals.css`
- `src/components/` — reusable UI
- `src/components/sections/` — one component per page section
- `src/lib/site.ts` — single source of truth for SEO/AEO/GEO data (name, keywords, org facts)
- `src/lib/gsap.ts` — GSAP plugin registration (import from here, never register elsewhere)

## Detailed rules (modular)
- `.claude/rules/code-style.md` — TypeScript & formatting
- `.claude/rules/frontend/react.md` — React / Next patterns
- `.claude/rules/frontend/styling.md` — Tailwind v4 + design tokens
- `.claude/rules/frontend/tailwind-v4-gotchas.md` — **read before debugging a style that "isn't applying"**
- `.claude/rules/frontend/motion.md` — Motion vs GSAP, reduced-motion, performance
- `.claude/rules/seo-geo-aeo.md` — metadata, JSON-LD, content structure rules
- `.claude/rules/workflow.md` — design→code loop + context checkpoints

@AGENTS.md
