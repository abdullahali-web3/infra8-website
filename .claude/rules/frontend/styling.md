# Styling — Tailwind v4 + Pixel-Perfect

## Design tokens = source of truth
- Define every design value as a token in `src/app/globals.css` under `@theme` — colors, font sizes, spacing, radii, shadows.
- Use token-based utilities (`text-brand`, `bg-surface`, `rounded-card`). Don't hardcode hex or random px.
- If a value has no token yet: add the token first, then use it.

## Matching a design exactly
- Copy exact values from the design (inspect panel): hex, font family/size/weight/line-height, letter-spacing, padding, gap, radius.
- Use arbitrary values `p-[13px]` only when the Tailwind scale can't hit the exact px.
- Build mobile-first; add `md:` / `lg:` to match each frame width (note the frame width you're targeting).
- Verify with the screenshot-diff loop (`workflow.md`) before calling a section done.

## Don't
- Don't eyeball spacing or colors.
- Don't scatter inline styles for anything reusable — make a token or utility instead.
