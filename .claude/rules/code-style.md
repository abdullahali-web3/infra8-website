# Code Style

- TypeScript strict — no `any`; type component props explicitly.
- Functional components only. Files and components in PascalCase (`HeroSection.tsx`).
- Import via the `@/*` alias for `src/*` (e.g. `import { Button } from "@/components/Button"`).
- Named exports for components; default export **only** for route files (`page.tsx`, `layout.tsx`).
- 2-space indentation. Keep components small and readable.
- Co-locate a component's subparts; lift to `src/components/` once reused in 2+ places.
- Run `npm run lint` before committing — fix warnings, don't suppress them.
