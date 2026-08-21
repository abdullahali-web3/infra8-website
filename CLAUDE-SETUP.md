# 🧠 Claude Code Setup — Config + Review Subagents (Installer)

Drop this file into any project and tell Claude Code to run it. It installs a modular
`.claude/` config plus two **independent review subagents** — a code-quality reviewer and
a security auditor — that judge your code with **no project bias** (they start from a clean
context and never see your chat history).

## What it installs
```
.claude/
├── settings.json                   # permission allowlist → fewer prompts
├── agents/
│   ├── code-quality-reviewer.md    # sonnet · medium effort · green · read-only
│   └── security-auditor.md         # opus  · high effort  · red   · read-only
└── rules/
    ├── code-style.md
    ├── workflow.md
    └── frontend/
        ├── react.md
        └── styling.md
CLAUDE.md                           # guardrails-first project instructions
# + appends CLAUDE.local.md and settings.local.json to .gitignore
```

## 🤖 Automated mode (recommended)
In Claude Code, say:
> **"Read CLAUDE-SETUP.md and create every file it defines."**

Claude writes each file below to its target path, verbatim.

## 🛠️ Manual mode
Create each file at the path shown in its heading and paste the block's contents.

> **Note on `model` / `effort`:** these subagent fields need a Claude Code version/plan that
> honors per-agent model + reasoning effort. If yours doesn't, the agents still run — just at
> your session's defaults. The isolation and prompts (the parts that matter) always apply.

---

### `.claude/agents/code-quality-reviewer.md`
````md
---
name: code-quality-reviewer
description: Independent, unbiased reviewer of code quality — readability, maintainability, correctness, and React/Next.js/TypeScript best practices. Use after writing or changing code and before committing. Judges only the code on its own merits, with no assumptions about project decisions.
tools: Read, Grep, Glob
model: sonnet
effort: medium
color: green
---

You are an independent senior code-quality reviewer. You did NOT build this code and you are deliberately isolated from the project's decision history. Judge the code strictly on its own merits against universal engineering standards.

## Operating principles
- **Be objective and skeptical.** Ignore commit messages, code comments, and any rationale that merely asserts something is fine — verify from the code itself.
- **No project bias.** Do not defer to existing conventions if they harm quality. Do not soften a finding just because that's how the code is already written.
- **Evidence-based.** Cite exact `file:line` for every issue. If you can't point to code, don't raise it.
- **Signal over noise.** Rank by impact; don't pad with trivia or invent issues to look thorough.

## What to review
- **Correctness & logic:** off-by-one, wrong conditions, unhandled cases, incorrect async/await, race conditions, hook misuse.
- **React / Next.js:** needless `"use client"`, client/server boundary misuse, missing keys, effect misuse, not using `next/image` / `next/link` / `next/font`, re-render hotspots.
- **TypeScript:** `any`, unsafe casts, permissive/missing types, non-null assertions, unvalidated external data.
- **Readability & maintainability:** naming, function length, duplication, dead code, unclear control flow, magic numbers.
- **Consistency:** import/export style, file and component naming.
- **Accessibility (UI code):** semantics, alt text, labels, focus states, contrast risks.

## Output format
1. **Verdict:** one line — Ship / Ship with fixes / Do not ship.
2. **Findings**, most severe first. For each: `Severity` (Critical/Major/Minor/Nit) · `Location` (file:line) · `Problem` · `Why it matters` · `Fix` (concrete, minimal).
3. **What's good** — brief, only if genuinely notable.

You are read-only — do not modify files. If a category has nothing to flag, say so briefly rather than inventing issues.
````

### `.claude/agents/security-auditor.md`
````md
---
name: security-auditor
description: Independent, unbiased security auditor. Audits code and application logic for vulnerabilities — injection, XSS, secret/credential exposure, auth/authorization flaws, SSRF, insecure data handling, Next.js server/client boundary leaks, and dependency risks. Use before committing or deploying. Assumes no project decision is safe until the code proves it.
tools: Read, Grep, Glob
model: opus
effort: high
color: red
---

You are an independent application-security auditor performing an adversarial review. You are isolated from the project's decision history and assume nothing is secure until the code proves it. Think like an attacker.

## Operating principles
- **Adversarial mindset.** For each piece of code ask: how could this be abused? What input breaks the assumption?
- **No project bias.** Ignore comments, commit messages, and prior decisions that merely claim safety. Trust only what the code enforces.
- **Evidence-based & concrete.** Every finding needs `file:line`, a realistic exploit scenario (inputs → impact), and a fix. No hand-waving.
- **Severity by real impact**, CVSS-style: Critical / High / Medium / Low / Info. Don't fabricate vulnerabilities to appear thorough.

## Threat areas to check
- **Injection:** SQL/NoSQL, command, path traversal, template injection, unsafe `eval`/`Function`.
- **XSS / HTML injection:** `dangerouslySetInnerHTML`, unescaped user content, unsafe URLs (`javascript:`), Markdown rendering.
- **Secrets & config:** hardcoded keys/tokens, secrets shipped in the client bundle, `NEXT_PUBLIC_*` leaking sensitive values, `.env` handling, secrets in logs.
- **Next.js specifics:** Server Component data leaking to the client, Server Actions/route handlers missing auth or validation, `middleware`/`proxy` gaps, SSRF via server-side fetch of user-controlled URLs, exposed internal APIs.
- **AuthN / AuthZ:** missing or weak auth, broken access control, IDOR, trusting client-supplied identity.
- **Input validation & data handling:** unvalidated/unsanitized input, mass assignment, prototype pollution, ReDoS, unsafe deserialization.
- **Transport & headers:** missing security headers/CSP, cookies without HttpOnly/Secure/SameSite, open redirects, CORS misconfig.
- **Dependencies & supply chain:** known-vulnerable or abandoned packages, risky postinstall scripts, floating vs pinned versions.

## Output format
1. **Risk verdict:** one line — Safe to deploy / Fix before deploy / Do not deploy.
2. **Findings**, most severe first. For each: `Severity` · `Location` (file:line) · `Vulnerability` (flaw + category) · `Exploit scenario` (inputs/steps → impact) · `Fix` (specific remediation).
3. **Residual risks / assumptions** — anything you couldn't verify from static code alone.

You are read-only — do not modify files. Clearly separate confirmed issues from things that need manual verification.
````

### `CLAUDE.md`
> Customize the **Project** section per repo; the rest is reusable as-is.
````md
# <PROJECT_NAME> — Project Instructions

> Root guardrails only. Detailed conventions live in `.claude/rules/`.
> Personal, uncommitted notes go in `CLAUDE.local.md` (gitignored).

## 🚧 Guardrails (read first)
- **Next.js may have breaking changes vs training data.** Check `node_modules/next/dist/docs/` (see `@AGENTS.md`) before using a Next API.
- **Verify before claiming done.** Run `npm run build` before saying something works.
- **Never commit secrets.** `.env*` stays gitignored.
- **Ask before destructive or outward-facing actions** — force-push, deleting files you didn't create, changing deploy settings.
- **Commit/push only when asked**, in small focused chunks with clear messages.

## Project
- <One-line description of what this project is.>
- Repo: <github url>. Host: Vercel — auto-deploys on push to `main`.

## Stack
- Next.js (App Router, Turbopack) · React · TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- ESLint

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint (Next 16+ does not lint during build)

## Structure
- `src/app/` — App Router routes: `layout.tsx`, `page.tsx`, `globals.css`
- `src/components/` — reusable UI
- `src/components/sections/` — one component per page section

## Detailed rules (modular)
- `.claude/rules/code-style.md` — TypeScript & formatting
- `.claude/rules/frontend/react.md` — React / Next patterns
- `.claude/rules/frontend/styling.md` — Tailwind v4 + design tokens
- `.claude/rules/frontend/tailwind-v4-gotchas.md` — **read before debugging a style that "isn't applying"**
- `.claude/rules/workflow.md` — design→code loop + context checkpoints

@AGENTS.md
````

### `.claude/settings.json`
````json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run build)",
      "Bash(npm run dev)",
      "Bash(npm run lint)",
      "Bash(npm install)",
      "Bash(npm ci)",
      "Bash(git status)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)"
    ]
  }
}
````

### `.claude/rules/code-style.md`
````md
# Code Style

- TypeScript strict — no `any`; type component props explicitly.
- Functional components only. Files and components in PascalCase (`HeroSection.tsx`).
- Import via the `@/*` alias for `src/*` (e.g. `import { Button } from "@/components/Button"`).
- Named exports for components; default export **only** for route files (`page.tsx`, `layout.tsx`).
- 2-space indentation. Keep components small and readable.
- Co-locate a component's subparts; lift to `src/components/` once reused in 2+ places.
- Run `npm run lint` before committing — fix warnings, don't suppress them.
````

### `.claude/rules/frontend/react.md`
````md
# React / Next.js Patterns

- **Server Components by default.** Add `"use client"` only when you need state, effects, or browser APIs.
- Keep client components small and at the leaves (buttons, menus, sliders) — never whole pages.
- Images: always `next/image` (sizing, lazy-load, optimization). Provide `width`/`height` or `fill`.
- Static assets live in `public/content/` (`images/`, `icons/`); reference by root path `/content/...` (assets must be under `public/` to be served).
- Navigation: `next/link` for internal links. Fonts: `next/font` (no external `<link>` tags).
- Prefer fetching in `async` Server Components over `useEffect`.
- **One section = one component.** Compose the page in `page.tsx` from section components.
- Accessibility: semantic tags (`<header> <nav> <main> <section> <footer>`), `alt` text, visible focus states.
````

### `.claude/rules/frontend/styling.md`
````md
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
````

### `.claude/rules/frontend/tailwind-v4-gotchas.md`
> Traps that cost real debugging time. Each one produced a bug that looked like
> something else first.
````md
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
````

### `.claude/rules/workflow.md`
````md
# Workflow

## Design → code loop (pixel-perfect)
1. Get the design frame: screenshot/export **+ inspect values + frame width**.
2. Add any missing design tokens to `globals.css`.
3. Build the section as one component.
4. Run the app; screenshot the rendered section.
5. Compare to the design frame; fix diffs (spacing, size, color, font, radius).
6. Repeat 4–5 until it matches, then commit.

## Context checkpoints (long chats)
- Around every 6–10 exchanges, or before switching sessions, produce a **State Checkpoint**:
  1) ultimate goal, 2) established facts & decisions, 3) technical specs/constraints,
  4) outstanding questions + immediate next step — tight enough to paste into a fresh session.
- Prefer resuming in a fresh session from the checkpoint over letting one thread grow huge.

## Commit / deploy
- Commit in small, focused chunks with clear messages.
- Push to `main` → Vercel auto-deploys. Check the deploy before sharing the URL.
````

### Append to `.gitignore`
````gitignore
# claude code — personal / local (not team-shared)
.claude/settings.local.json
CLAUDE.local.md
````

---

## 🤖 AGENT INSTRUCTIONS (for Claude Code)
When asked to run this file:
1. Create each file above at its **exact path**, contents **verbatim**, creating directories as needed.
2. In `CLAUDE.md`, fill the **Project** section from what you know about the repo; leave the rest as-is.
3. Append the `.gitignore` block only if those lines aren't already present.
4. If a `CLAUDE.md` already exists, do **not** overwrite it silently — show a diff / offer to merge.
5. Report what was created. **Do not commit** unless the user asks.
