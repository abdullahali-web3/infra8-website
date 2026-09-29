# React / Next.js Patterns

- **Server Components by default.** Add `"use client"` only when you need state, effects, or browser APIs.
- Keep client components small and at the leaves (buttons, menus, sliders) — never whole pages.
- Images: always `next/image` (sizing, lazy-load, optimization). Provide `width`/`height` or `fill`.
- Static assets live in `public/content/` (`images/`, `icons/`); reference by root path `/content/...` (assets must be under `public/` to be served).
- Navigation: `next/link` for internal links. Fonts: `next/font` (no external `<link>` tags).
- Prefer fetching in `async` Server Components over `useEffect`.
- **One section = one component.** Compose the page in `page.tsx` from section components.
- Accessibility: semantic tags (`<header> <nav> <main> <section> <footer>`), `alt` text, visible focus states.
