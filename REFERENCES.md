# 📚 Reference Docs

Pinned canonical docs — **fetch these for current info** instead of relying on memory,
so your project doesn't drift from the latest framework behavior. Copy this file into any
project made with this kit.

## Framework & tooling
- **Next.js (App Router):** https://nextjs.org/docs/app/getting-started/installation
- **Tailwind CSS v4:** https://tailwindcss.com/blog/tailwindcss-v4
  - Theme variables (`@theme`): https://tailwindcss.com/blog/tailwindcss-v4#css-theme-variables
- **React 19:** https://react.dev

## Hosting & deploy
- **Vercel × Next.js:** https://vercel.com/docs/frameworks/full-stack/nextjs
- **Vercel Deployments:** https://vercel.com/docs/deployments
- **Vercel Builds:** https://vercel.com/docs/builds

## AI tooling
- **Claude Code — Subagents:** https://code.claude.com/docs/en/sub-agents

---

## Tailwind v4 quick reference (verified from docs)
- Import once in your CSS entry (e.g. `src/app/globals.css`): `@import "tailwindcss";` — no `@tailwind` directives.
- Configure design tokens in CSS via `@theme { … }` — no `tailwind.config.js` required.
- Tokens become CSS variables **and** utilities:
  | Token | Generates |
  |-------|-----------|
  | `--color-brand-500: …;` | `bg-brand-500`, `text-brand-500`, `border-brand-500` |
  | `--font-display: …;` | `font-display` |
  | `--breakpoint-3xl: 1920px;` | `3xl:` responsive variant |
  | `--spacing-*`, `--radius-*`, `--shadow-*`, `--ease-*` | matching utilities |
