# 🌍 Bonus — Global Claude Config (install once, every project inherits it)

`CLAUDE-SETUP.md` installs the config **per project**. If you spin up projects often, install
the reusable parts **once** at the **user level** instead — then every repo on your machine
gets your subagents, rules, and permissions with zero setup.

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
> into my user-level `~/.claude/agents/` folder, and put the settings.json permission
> allowlist at `~/.claude/settings.json`. Create a short universal `~/.claude/CLAUDE.md`
> with just the guardrails."**

### Manual
1. Create `~/.claude/agents/` if it doesn't exist.
2. Copy the two agent blocks from `CLAUDE-SETUP.md` into
   `~/.claude/agents/code-quality-reviewer.md` and `~/.claude/agents/security-auditor.md`.
3. Copy the `settings.json` block into `~/.claude/settings.json`.
4. (Optional) Create `~/.claude/CLAUDE.md` with the **Guardrails** section only.

## Result
Open Claude Code in **any** future project and your two reviewers + permissions are already
active — no per-project install. Use `CLAUDE-SETUP.md` per project only for the parts you
*didn't* globalize (e.g. the project `CLAUDE.md` and framework-specific rules).
