# Infra8 website

Marketing site for Infra8, a senior engineering team that builds MVPs for founders and runs cloud, DevOps and security for live products.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · GSAP

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Where things live
- `src/lib/content.ts` — homepage copy, tool stack, FAQ (also feeds the FAQ JSON-LD)
- `src/lib/site.ts` — SEO / GEO / AEO entity data (set `NEXT_PUBLIC_SITE_URL` in production)
- `src/components/sections/` — one component per homepage section
- `src/components/illustrations/` — animated SVG illustrations
- `docs/PROJECT-BRIEF.md`, `docs/EXECUTION-PLAN.md` — agenda and roadmap
- Starter-kit runbooks (`SETUP.md`, `CLAUDE-SETUP.md`, etc.) are kept at the repo root for reference.
