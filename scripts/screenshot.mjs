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
