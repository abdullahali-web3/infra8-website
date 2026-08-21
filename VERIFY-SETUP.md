# 📸 Visual Verification Setup (Installer)

Two scripts that let Claude Code (or you) **see** the rendered page instead of guessing.
`npm run build` proves the code compiles; it proves nothing about whether the design is
right. These close that gap.

## What it installs

```txt
scripts/screenshot.mjs      # full-page PNG at any viewport + horizontal-overflow report
scripts/audit-layout.mjs    # pass/fail responsive audit across a range of widths
# + puppeteer-core as a devDependency (drives the Chrome you already have)
```

Why `puppeteer-core` and not `puppeteer`: it skips the ~150 MB bundled Chromium download
and drives your installed Chrome. Why not `chrome --headless --screenshot`: **it misrenders
narrow viewports.** It ignores the device pixel ratio and lays out at desktop width, so
mobile screenshots come back looking broken when the page is fine — and looking fine when
it is broken. Every mobile bug it reports is a coin flip. Use a real automation driver.

## 🤖 Automated mode

> "Read VERIFY-SETUP.md and install it."

## 🛠️ Manual mode

```bash
npm i -D puppeteer-core
mkdir -p scripts
# then create the two files below
```

### `scripts/screenshot.mjs`

````js
/**
 * Screenshot + horizontal-overflow check.
 *
 * Usage:  node scripts/screenshot.mjs <url> <width> <height> <outFile>
 * Example: node scripts/screenshot.mjs http://localhost:3000/about 390 850 out.png
 *
 * Drives your installed Chrome via puppeteer-core. Emulates reduced-motion and
 * scrolls the page first, so scroll-triggered animations have run by the time
 * the shot is taken — otherwise half the page photographs as blank.
 *
 * Set CHROME_PATH to override the browser location.
 */
import puppeteer from "puppeteer-core";

const [, , url = "http://localhost:3000", w = "390", h = "850", out = "screenshot.png"] =
  process.argv;

const CHROME = {
  win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
};

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || CHROME[process.platform],
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

// Walk the page so every scroll-triggered reveal has fired, then return to the top.
await page.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 400));

// Anything sticking out past the viewport is a horizontal-scroll bug.
const diag = await page.evaluate(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const offenders = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
      offenders.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 70),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  }
  offenders.sort((a, b) => b.right - a.right);
  return { vw, scrollWidth: de.scrollWidth, offenders: offenders.slice(0, 10) };
});
console.log(JSON.stringify(diag, null, 2));

await page.screenshot({ path: out, fullPage: true });
await browser.close();
````

### `scripts/audit-layout.mjs`

> Edit the `CONFIG` block to match your project, then this is a one-command
> regression test for your layout rules at every width.

````js
/**
 * Responsive layout audit — turns your layout rules into a pass/fail check.
 *
 * Usage:  node scripts/audit-layout.mjs [url] [widths]
 * Example: node scripts/audit-layout.mjs http://localhost:3000/about 1440,768,390
 *
 * At each width it checks:
 *   - the content gutter matches the expected scale
 *   - the display heading fills the content column
 *   - footer content lines up with the page content column
 *   - nothing overflows horizontally
 * Exits non-zero if any check fails, so CI can run it.
 */
import puppeteer from "puppeteer-core";

/* ---- CONFIG: the only project-specific part ---------------------------- */
const CONFIG = {
  /** The element that defines your content column (a Container, usually). */
  columnSelector: "main [class*='max-w-']",
  /** The matching wrapper inside the footer, or null to skip that check. */
  footerColumnSelector: "footer [class*='max-w-']",
  /** Expected left/right gutter in px at a given viewport width. */
  expectedGutter: (vw) => (vw >= 768 ? 48 : vw >= 640 ? 32 : 24),
  /** A fill-to-column heading should span at least this % of the column. */
  minHeadingFill: 99,
  /** Below this width the footer/content alignment check is skipped. */
  alignFromWidth: 768,
};
/* ------------------------------------------------------------------------ */

const CHROME = {
  win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
};

const url = process.argv[2] || "http://localhost:3000";
const widths = (
  process.argv[3] || "1440,1280,1100,900,768,700,640,560,430,390,320"
)
  .split(",")
  .map(Number);

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || CHROME[process.platform],
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);

let failures = 0;
for (const w of widths) {
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 400));

  const m = await page.evaluate((cfg) => {
    const de = document.documentElement;
    const col = document.querySelector(cfg.columnSelector);
    const colBox = col?.getBoundingClientRect();
    const inner = col
      ? {
          left: colBox.left + parseFloat(getComputedStyle(col).paddingLeft),
          right: colBox.right - parseFloat(getComputedStyle(col).paddingRight),
        }
      : null;

    // Measure the text itself, not the block — a block is always 100% wide.
    const h1 = [...document.querySelectorAll("h1")].filter(
      (h) => h.getClientRects().length,
    )[0];
    let fill = null;
    if (h1 && inner) {
      const spans = [...h1.querySelectorAll("span")];
      const nodes = spans.length ? spans : [h1];
      const width = Math.max(
        ...nodes.map((n) => {
          const r = document.createRange();
          r.selectNodeContents(n);
          return r.getBoundingClientRect().width;
        }),
      );
      fill = (width / (inner.right - inner.left)) * 100;
    }

    const fInner = cfg.footerColumnSelector
      ? document.querySelector(cfg.footerColumnSelector)
      : null;

    const overflow = [...document.querySelectorAll("*")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1);
      })
      .map((el) => `${el.tagName}.${String(el.className).slice(0, 40)}`);

    return {
      gutter: inner ? Math.round(inner.left - colBox.left) : null,
      contentLeft: inner ? Math.round(inner.left) : null,
      fill: fill === null ? null : +fill.toFixed(1),
      footerLeft: fInner ? Math.round(fInner.getBoundingClientRect().left) : null,
      overflow: overflow.slice(0, 3),
    };
  }, CONFIG);

  const want = CONFIG.expectedGutter(w);
  const problems = [];
  if (m.gutter !== want) problems.push(`gutter ${m.gutter} (want ${want})`);
  if (m.fill !== null && m.fill < CONFIG.minHeadingFill)
    problems.push(`heading fills only ${m.fill}% of the column`);
  if (
    w >= CONFIG.alignFromWidth &&
    m.footerLeft !== null &&
    m.footerLeft !== m.contentLeft
  )
    problems.push(`footer x=${m.footerLeft} vs content x=${m.contentLeft}`);
  if (m.overflow.length) problems.push(`overflow: ${m.overflow.join(", ")}`);

  if (problems.length) failures++;
  console.log(
    `${String(w).padStart(4)}  ${problems.length ? "FAIL" : "ok  "}  ` +
      `gutter=${m.gutter} heading=${m.fill}% footerX=${m.footerLeft} contentX=${m.contentLeft}` +
      (problems.length ? `\n       ${problems.join("\n       ")}` : ""),
  );
}

await browser.close();
console.log(failures ? `\n${failures} width(s) failed.` : "\nAll widths pass.");
process.exit(failures ? 1 : 0);
````

### Add to `package.json` scripts

````json
{
  "scripts": {
    "audit:layout": "node scripts/audit-layout.mjs"
  }
}
````

## How to actually use these

- **After building any section**, screenshot it and compare against the design frame.
  Don't claim a match you haven't looked at.
- **Before committing a layout change**, run `audit:layout` on every route. It catches the
  regressions you'd otherwise find on your phone a week later: a gutter that stopped
  scaling, a heading that no longer fills its column, a footer that drifted out of
  alignment with the page content, an element pushing the page sideways.
- **Screenshots beat reasoning about CSS.** If a measurement and the picture disagree,
  the picture is right.
- Reading computed styles is often better evidence than a screenshot for state work —
  `getComputedStyle(el).borderTopColor` will tell you which of two conflicting Tailwind
  utilities actually won, which no screenshot can.

## Add this to `CLAUDE.md`

Under **Guardrails**, so the tooling is actually reached for:

````md
- **Verify before claiming done.** Run `npm run build`, then
  `node scripts/audit-layout.mjs <url>`, then screenshot the rendered section and
  compare it to the design — before saying it matches.
````

---

## 🤖 AGENT INSTRUCTIONS (for Claude Code)

When asked to run this file:
1. `npm i -D puppeteer-core`.
2. Create `scripts/screenshot.mjs` and `scripts/audit-layout.mjs` **verbatim** from above.
3. Add the `audit:layout` entry to `package.json` scripts, preserving existing entries.
4. Tune `CONFIG` in `audit-layout.mjs` to this project's container and gutter scale — read
   the actual `Container`/layout component rather than guessing, and say what you set.
5. Append the Guardrails line to `CLAUDE.md` if it isn't already there.
6. Verify by running the audit against one route of the dev server; report the output.
7. Report what was created. **Do not commit** unless the user asks.
