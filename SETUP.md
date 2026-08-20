# ⚡ Next.js + GitHub + Vercel — One-Shot Project Setup

A drop-in runbook that takes you from an **empty folder** to a **live, auto-deploying
Next.js site** with Git and Vercel wired up.

Built to be run by **Claude Code** (max automation) or by **copy-paste** (manual).

---

## What you get
- Next.js (App Router, Turbopack) + TypeScript + Tailwind CSS v4 + ESLint
- Local git repo on `main`, pushed to a fresh GitHub repo
- Vercel connected → every push auto-deploys; every PR gets a preview URL
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

# 2) Verify it builds (fail fast before pushing)
npm run build

# 3) Ensure main branch + an initial commit
#    (create-next-app usually inits git + commits — these are safe no-ops if so)
git branch -M main
git add -A
git commit -m "Initial commit" || echo "nothing to commit"

# 4) Create the GitHub repo and push it
gh repo create my-app --private --source=. --remote=origin --push

# 5) Connect Vercel (link this repo, then first production deploy)
vercel link
vercel --prod
```

From now on: **`git push` → Vercel auto-deploys.** 🎉

Next, install your Claude config + review subagents → run **CLAUDE-SETUP.md**.

---

## Gotchas already handled
- **Capitals in the name** → npm refuses them. Always use a lowercase `PROJECT_NAME`.
  (Forced to scaffold into an existing folder whose name has capitals? Scaffold into a
  temp lowercase folder and move the files in — a plain `cp`/`mv`, skip `node_modules` and
  reinstall to avoid a slow copy.)
- **"command not found" right after install** → stale PATH; open a new terminal or use the full path.
- **Next 16 doesn't lint during build** → run `npm run lint` separately.

---

## 🤖 AGENT INSTRUCTIONS (for Claude Code)
When a user asks you to run this file:
1. Determine `PROJECT_NAME` (lowercase) and `VISIBILITY`. Ask only if not provided.
2. Check prerequisites: `node -v`, `git --version`, `gh --version`, `gh auth status`,
   `vercel --version`, `vercel whoami`.
   - If a **CLI is missing**, offer to install it with the Step 0 commands (winget/brew/npm),
     then remind the user to open a new terminal (PATH refresh).
3. If `gh` or `vercel` is **not authenticated**, STOP and have the user run
   `gh auth login` / `vercel login` themselves (Step 0) — these are interactive browser logins;
   you cannot do them. Never ask for tokens/codes to do it on their behalf.
4. Run the Manual-mode steps in order. On Windows, use full paths to `gh`/`vercel` if PATH is stale.
5. If `npm run build` (step 2) fails, STOP and report — do not create the repo or push.
6. After success, report the **GitHub repo URL** and the **Vercel URL**, then offer to run
   `CLAUDE-SETUP.md` to install the Claude config + subagents.
7. Never `git push --force`, delete files you didn't create, or change deploy settings without asking.
