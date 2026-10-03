# Tailwind v4 + React 19 — Gotchas

## Class names are extracted by scanning source text
Tailwind reads your files as **text**. A class name assembled at runtime is never
seen, so the CSS is never generated — and you get silence, not an error.

```ts
// BROKEN — `focus-visible:shadow-[...]` never lands in the stylesheet
const RING = "shadow-[inset_0_0_0_3px_var(--color-ink)]";
const FOCUS = `focus-visible:${RING}`;

// CORRECT — the full class name appears literally in the source
const FOCUS =
  "focus-visible:shadow-[inset_0_0_0_3px_var(--color-ink)]";
```
Sharing class strings in a constants file is fine — **composing new class names
from fragments is not.** The same applies to `` `text-${color}-500` ``.

## Two utilities for one property: order in the stylesheet wins, not order in the class list
`class="border-line border-accent"` does **not** mean "accent wins because it is
last". Both are plain single-class utilities of equal specificity, so the one
Tailwind happens to emit later in the stylesheet wins — which you do not control
and which can change.

**Rule: never put two utilities for the same property on one element.** Make the
states mutually exclusive instead:

```tsx
// BROKEN — shell already carries `border-line`
className={`${SHELL} ${open ? "border-accent" : ""}`}

// CORRECT — the shell carries no border colour; each state supplies exactly one
className={`${SHELL} ${open ? "border-accent" : "border-line"}`}
```

## Variants outrank plain utilities
`hover:border-ink` carries a pseudo-class, so it beats a plain `border-accent`
regardless of source order. A hover style will silently repaint an "active" or
"open" state while the pointer is over it. Drop the hover class when the element
is in the state that should win:

```tsx
className={`${SHELL} ${open ? ACTIVE : `${REST} ${HOVER} ${FOCUS}`}`}
```

## `rotate`, `translate` and `scale` are standalone properties in v4
They are no longer compiled into `transform`. Two consequences:

- `transition-[transform]` animates **nothing** — use `transition-[rotate]`.
- `getComputedStyle(el).transform` reads `"none"` even while the element is
  rotated. Read `getComputedStyle(el).rotate` instead when you verify.

## Custom utilities use `@utility`, not `@layer utilities`
```css
@utility scroll-slim {
  scrollbar-width: thin;
  &::-webkit-scrollbar { width: 6px; }
}
```

## Arbitrary values: underscores for spaces, commas are fine
`shadow-[inset_0_0_0_2px_var(--color-paper),inset_0_0_0_3px_var(--color-ink)]`

## React 19: `react-hooks/set-state-in-effect` is an error, not a warning
Calling `setState` in an effect body fails the build's lint step. The two fixes:

```tsx
// 1. Derive during render instead of correcting after the fact
const activeIndex = Math.min(active, Math.max(items.length - 1, 0));

// 2. Set the state in the event handler that causes it, not in an effect
function openMenu() {
  setActive(items.findIndex((i) => i.value === value));
  setOpen(true);
}
```
Effects are for syncing with things outside React — focus, listeners, scroll
position. Those are still fine.

## Verify state work by reading computed styles
When two utilities fight, a screenshot cannot tell you which won.
`getComputedStyle(el).borderTopColor` can.

## A colour token can hijack a utility name
Every `--color-NAME` token creates `border-NAME`, `text-NAME`, `bg-NAME`... A token named
`--color-x` turned the rails' `border-x` (left + right width) into "border colour x" (black) across
the whole site. Never name a colour after a side, axis or size (`x`, `y`, `t`, `b`, `l`, `r`, `s`,
`e`, `sm`, `lg`...). Prefix third-party colours instead: `--color-social-x`.
