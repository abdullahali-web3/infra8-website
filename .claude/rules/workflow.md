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
