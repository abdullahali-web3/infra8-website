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
