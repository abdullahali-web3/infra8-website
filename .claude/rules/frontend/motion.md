# Motion + GSAP + Illustration

## Which library for what
- **Motion (`motion/react`)**: component enter/exit, hover/tap, layout transitions, `whileInView` reveals, tabs/accordions.
- **GSAP (`@/lib/gsap`)**: scroll-linked scenes (ScrollTrigger), timelines, SVG path drawing (DrawSVG), text splitting (SplitText), pinned storytelling sections.
- Never animate the same element with both libraries.

## Rules
- Animate `transform` / `opacity` only. No animating width/height/top/left.
- Respect reduced motion: Motion is covered globally by `MotionProvider`. For GSAP, wrap scenes in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.
- GSAP in React: use `useGSAP()` from `@gsap/react` with a `scope` ref so cleanup is automatic. No raw `useEffect` + `gsap.to`.
- Register plugins once, in `src/lib/gsap.ts`. Import `gsap`, `ScrollTrigger`, `useGSAP` from there.
- Animated components are `"use client"` leaves. Section copy stays server-rendered so crawlers and AI answer engines read it as plain HTML.
- Never hide meaningful content behind an animation that needs JS (SEO/AEO). Initial state must be readable without JS.
- Illustrations are inline SVG components in `src/components/illustrations/` (themeable via CSS variables, `aria-hidden` when decorative, `role="img"` + `<title>` when meaningful).
