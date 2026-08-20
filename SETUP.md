# ⚡ Next.js + GitHub + Vercel — One-Shot Project Setup

A drop-in runbook that takes you from an **empty folder** to a **live, auto-deploying
Next.js site** with Git and Vercel wired up.

Built to be run by **Claude Code** (max automation) or by **copy-paste** (manual).

---

## What you get
- Next.js (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + ESLint
- Local git repo on `main`, pushed to a fresh GitHub repo
- Vercel connected → every push auto-deploys; every PR gets a preview URL
- A `public/content/` folder (`images/`, `icons/`) for your static assets, served from `/content/...`
- A verified production build before anything ships

## Step 0 — Install & authenticate the CLIs (one-time per machine)

You need four tools. Node + Git you probably have; the **GitHub CLI** and **Vercel CLI** are
what wire up the repo and hosting.

### Install
| Tool | Windows (winget) | macOS (brew) | Verify |
|------|------------------|--------------|--------|
| Node.js 20.9+ | `winget install OpenJS.NodeJS.LTS` | `brew install node` | `node -v` |
| Git | `winget install Git.Git` | `brew install git` | `git --version` |
| GitHub CLI | `winget install --id GitHub.cli -e` | `brew install gh` | `gh --version` |
| Vercel CLI | `npm i -g vercel` | `npm i -g vercel` | `vercel --version` |

> ⚠️ **After installing a CLI, open a NEW terminal** so it's picked up on PATH.
> On Windows, if `gh` still isn't found, call it by full path:
> `& "C:\Program Files\GitHub CLI\gh.exe"` (Vercel: `& "$env:APPDATA\npm\vercel.cmd"`).

### Authenticate (interactive — **only you** can do these; Claude can't log in for you)

**GitHub:**
```bash
gh auth login
```
Answer the prompts:
- *What account?* → **GitHub.com**
- *Preferred protocol?* → **HTTPS**
- *Authenticate Git with your GitHub credentials?* → **Yes**
- *How to authenticate?* → **Login with a web browser** → copy the one-time code, paste it in the browser.

Confirm: `gh auth status` → should show *"Logged in to github.com account <you>"*.

**Vercel:**
```bash
vercel login
```
Choose a method (usually **Continue with GitHub**) and approve in the browser.
Confirm: `vercel whoami` → should print your username.

### Set your git identity (so commits attribute to the right account)
Mismatched git identity is a common cause of a repo showing the **"wrong" contributor**. Point
git at the email tied to your GitHub account — ideally GitHub's private **noreply** email so your
real address stays hidden:
```bash
git config --global user.name  "Your Name"
git config --global user.email "<id>+<username>@users.noreply.github.com"
```
Find your noreply email at **GitHub → Settings → Emails → "Keep my email addresses private."**
Juggling **multiple GitHub accounts**? Set this **per-repo** (drop `--global`) inside each project
so every repo attributes correctly. Do it **before your first commit**.

> Do these **once per machine**. After that, every project skips straight to Step 1.

---

## Parameters (edit these once, or Claude will ask)
| Name | Example | Notes |
|------|---------|-------|
| `PROJECT_NAME` | `my-app` | **lowercase, no spaces** — npm rejects capitals |
| `VISIBILITY` | `--private` or `--public` | GitHub repo visibility |

---

## 🤖 Automated mode (Claude Code)
Open Claude Code in an empty folder and say:

> **"Read SETUP.md and run it. PROJECT_NAME=my-app, VISIBILITY=private."**

Claude will run the steps below with its tools, ask only for anything missing, and
**stop** if a prerequisite (or login) is absent — logins are interactive and only you can do them.

## 🛠️ Manual mode (copy-paste)
Run from the folder that will **contain** your project (the script creates the project folder itself):

```bash
# 1) Scaffold — PROJECT_NAME must be lowercase
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd my-app

# 1b) A home for your static assets — served from /content/... (must be under public/)
mkdir -p public/content/images public/content/icons

# 2) Verify it builds (fail fast before pushing)
npm run build

# 3) Ensure main branch + an initial commit
#    (create-next-app usually inits git + commits — these are safe no-ops if so)
git branch -M main
git add -A
git commit -m "Initial commit" || echo "nothing to commit"

# 4) Create the GitHub repo and push it
gh repo create my-app --private --source=. --remote=origin --push
```

### Step 5 — Connect Vercel (this is what enables push-to-deploy)

**Recommended: dashboard import** — reliably sets up auto-deploy on every push:
1. Go to **https://vercel.com/new** and log in.
2. **Import Git Repository** → pick your repo. Not listed? Click the account dropdown →
   **Add GitHub Account / Adjust GitHub App Permissions** and grant access to the repo.
3. Vercel auto-detects Next.js — keep the defaults (Preset: Next.js, Root: `./`, no env vars).
4. Click **Deploy** → ~1–2 min → live URL.

> ⚠️ **Multiple GitHub accounts?** Vercel only shows repos from the GitHub account it's
> **connected to**. If your repo doesn't appear: start the connection **from Vercel** (not from
> GitHub's settings), and **authorize the account that owns the repo**. Simplest fix of all —
> log into Vercel with *that* GitHub account (**Continue with GitHub**).

**Alternative: CLI** (deploys from your machine; for push-to-deploy still do the dashboard import once):
```bash
vercel link      # link this folder to a Vercel project
vercel --prod    # manual production deploy
```

From now on: **`git push` → Vercel auto-deploys.** 🎉

Next, install your Claude config + review subagents → run **CLAUDE-SETUP.md**.

---

## Troubleshooting (the real snags & fixes)
- **npm rejects the name (capitals)** → names must be lowercase. Use a lowercase `PROJECT_NAME`.
  (Forced to scaffold into a folder whose name has capitals? Scaffold into a temp lowercase
  folder and move the files in — skip `node_modules` and reinstall to avoid a slow copy.)
- **"command not found" right after installing a CLI** → stale PATH; open a new terminal or call
  it by full path (see Step 0).
- **Repo shows the wrong contributor / an extra author** → your git identity didn't match your
  GitHub account when you committed. Set it correctly *before* the first commit (Step 0). To fix
  existing commits: reset the identity, re-author history (`git filter-branch` / `git rebase`),
  and `git push --force` (safe on a fresh solo repo).
- **Vercel doesn't show your repo** → Vercel is connected to a *different* GitHub account than the
  one that owns the repo. Start the connection **from Vercel**, authorize the owning account, or
  just log into Vercel with that GitHub account. (See Step 5.)
- **Next 16 doesn't lint during build** → run `npm run lint` separately.

---

## 🤖 AGENT INSTRUCTIONS (for Claude Code)
When a user asks you to run this file:
1. Determine `PROJECT_NAME` (lowercase) and `VISIBILITY`. Ask only if not provided.
2. Check prerequisites: `node -v`, `git --version`, `gh --version`, `gh auth status`,
   `vercel --version`, `vercel whoami`.
   - If a **CLI is missing**, offer to install it with the Step 0 commands (winget/brew/npm),
     then remind the user to open a new terminal (PATH refresh).
3. If `gh` is **not authenticated**, STOP and have the user run `gh auth login` themselves
   (Step 0) — interactive browser login; you cannot do it. Never ask for tokens/codes.
4. **Before the first commit**, ensure git identity matches the user's GitHub account
   (`git config user.name` / `user.email`; prefer the GitHub noreply email). Ask if unknown —
   getting this wrong pollutes the contributor list.
5. Run scaffold → build → commit → `gh repo create` (Manual-mode steps 1–4). On Windows, use
   full paths to `gh` if PATH is stale.
6. If `npm run build` fails, STOP and report — do not create the repo or push.
7. **Vercel:** you can't click the dashboard, so after pushing, direct the user through the
   Step 5 dashboard import (that's what enables push-to-deploy). Only if the user is logged into
   the Vercel CLI and prefers it, run `vercel link` / `vercel --prod`. If their repo doesn't
   appear in Vercel, it's the multi-account issue (Step 5).
8. Report the **GitHub repo URL** (and the **Vercel URL** once the user has it), then offer to
   run `CLAUDE-SETUP.md` to install the Claude config + subagents.
9. Never delete files you didn't create or change deploy settings without asking. Only
   `git push --force` when the user explicitly asks (e.g. to fix commit attribution).
