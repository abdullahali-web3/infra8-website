# 🌍 Bonus — Global Claude Config (install once, every project inherits it)

`CLAUDE-SETUP.md` installs the config **per project**. If you spin up projects often, install
the reusable parts **once** at the **user level** instead — then every repo on your machine
gets your subagents, rules, and permissions with zero setup.

> **This is 100% optional.** The **default is per-project** (`CLAUDE-SETUP.md` → the repo's
> `.claude/`). Only use this file if you want the config shared across *all* projects. Don't want
> that? Just skip this file — nothing here runs unless you choose it. (Uninstall steps at the bottom.)

## How Claude Code config layers work
Claude reads config at two levels:
- **User level** — `~/.claude/` (Windows: `C:\Users\<you>\.claude\`) → applies to **every** project.
- **Project level** — `<repo>/.claude/` → adds to, or overrides, the user level for that repo.

**Precedence:** if a project defines an agent/rule with the **same name**, the project version
wins. So user-level config is a safe set of defaults you can override anywhere.

## What to put at the user level (do once)
```
~/.claude/
├── CLAUDE.md            # short universal guardrails (verify before done, no secrets, etc.)
├── settings.json        # your permission allowlist (from CLAUDE-SETUP.md)
└── agents/
    ├── code-quality-reviewer.md   # from CLAUDE-SETUP.md
    └── security-auditor.md        # from CLAUDE-SETUP.md
```

Keep **project-specific** things (a repo's `CLAUDE.md` project section, design-token rules)
at the project level.

## Install it

### Automated (Claude Code)
Tell Claude:
> **"Install the code-quality-reviewer and security-auditor subagents from CLAUDE-SETUP.md
> into my user-level `~/.claude/agents/` folder, and MERGE the settings.json permission
> allowlist into my existing `~/.claude/settings.json` (don't overwrite it). Create a short
> universal `~/.claude/CLAUDE.md` with just the guardrails."**

### Manual
1. Create `~/.claude/agents/` if it doesn't exist.
2. Copy the two agent blocks from `CLAUDE-SETUP.md` into
   `~/.claude/agents/code-quality-reviewer.md` and `~/.claude/agents/security-auditor.md`.
3. **Merge** the `permissions.allow` entries from the `settings.json` block into your existing
   `~/.claude/settings.json` — **don't overwrite it**; that file may already hold your model,
   theme, and other settings.
4. (Optional) Create `~/.claude/CLAUDE.md` with the **Guardrails** section only.

## Result
Open Claude Code in **any** future project and your two reviewers + permissions are already
active — no per-project install. Use `CLAUDE-SETUP.md` per project only for the parts you
*didn't* globalize (e.g. the project `CLAUDE.md` and framework-specific rules).

## Opt out / uninstall
- **Never wanted it global?** Do nothing — running `CLAUDE-SETUP.md` per project keeps everything
  scoped to that repo. This file is inert unless you follow it.
- **Installed it and want it gone?** Remove the global copies:
  ```bash
  rm ~/.claude/agents/code-quality-reviewer.md ~/.claude/agents/security-auditor.md
  # then edit ~/.claude/settings.json and delete the permission entries you added
  # (leave model/theme/etc. intact); delete ~/.claude/CLAUDE.md if you created one
  ```
- **Want it in only some projects?** Keep it project-level via `CLAUDE-SETUP.md` and never globalize.
- **Override globally-installed config for one repo?** Add a same-named file in that repo's
  `.claude/` — project level always wins (see Precedence above).
