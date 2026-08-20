# 🚀 Next.js + Claude Code Starter Kit

Two drop-in Markdown files that turn an **empty folder** into a **live, auto-deploying
Next.js site** — with an opinionated Claude Code setup and two independent AI code
reviewers baked in. Designed for **maximum automation**: hand a file to Claude Code and it
does the work; or copy-paste the scripts yourself.

## Why this exists
Every new project starts with the same tax: scaffold Next.js, fight the tooling, create a
GitHub repo, connect Vercel, then re-teach your AI assistant the same conventions and
reviewers you set up last time. That's 30–40 minutes of undifferentiated setup before you
write a single line that matters. This kit collapses all of it into two Markdown files you
drop into an empty folder — so project #2, #3, #10 each start in about a minute, with the
**same** stack, guardrails, and AI reviewers every time.

<!-- DEMO: add a terminal screenshot or GIF here, e.g. ![demo](docs/demo.gif) -->
> _Demo GIF coming soon._

## The files
| File | What it does |
|------|--------------|
| **[SETUP.md](SETUP.md)** | Installs/auths the CLIs, scaffolds Next.js + Tailwind + TS, creates a GitHub repo, connects Vercel for auto-deploy. |
| **[CLAUDE-SETUP.md](CLAUDE-SETUP.md)** | Installs a modular `.claude/` config + two review subagents (code-quality + security) that review your code with no project bias. |
| **[SEO-MOTION-SETUP.md](SEO-MOTION-SETUP.md)** | Top-notch **SEO + AEO** foundation (metadata, JSON-LD, sitemap, robots, `llms.txt`) + a **Framer Motion** baseline that respects reduced-motion. |
| **[GLOBAL-CONFIG.md](GLOBAL-CONFIG.md)** | _Bonus_ — install the agents/rules **once** at the user level so **every** project inherits them automatically. |
| **[REFERENCES.md](REFERENCES.md)** | Pinned canonical doc links (Next.js, Tailwind v4, Vercel) to keep info current. |

## Quick start
1. Create an empty folder and open it in **Claude Code**.
2. Copy `SETUP.md` and `CLAUDE-SETUP.md` into it.
3. Say: **"Read SETUP.md and run it. PROJECT_NAME=my-app, VISIBILITY=private."**
4. Then: **"Read CLAUDE-SETUP.md and create every file it defines."**
5. Then: **"Read SEO-MOTION-SETUP.md and install it."**

That's it — live repo, live Vercel deploy, AI reviewers, and an SEO/AEO + motion baseline ready to go.

> Prefer no AI? Every step has a copy-paste script. See each file's **Manual mode**.

## Requirements
Node 20.9+, Git, [GitHub CLI](https://cli.github.com), [Vercel CLI](https://vercel.com/docs/cli).
Install + login commands are in **SETUP.md → Step 0** (one-time per machine).

## What you end up with
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 · ESLint
- Private/public GitHub repo on `main`, pushed
- Vercel: push-to-deploy + PR preview URLs
- `.claude/` with guardrails-first `CLAUDE.md`, modular rules, permission allowlist
- `code-quality-reviewer` (Sonnet) + `security-auditor` (Opus) subagents — read-only, unbiased
- SEO + AEO foundation (metadata, JSON-LD, sitemap, robots, `llms.txt`) + Framer Motion baseline

## Maintenance note
`SETUP.md` scaffolds with `create-next-app@latest`, so you always get the **current** Next.js.
The trade-off: if a future Next major renames a CLI flag, the one scaffold command in
`SETUP.md` may need a small tweak. It's a single line to update.

## License
[MIT](LICENSE) — free to use, share, and adapt. Attribution appreciated but not required.
