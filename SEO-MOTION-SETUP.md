# 🔍✨ SEO + AEO + Motion Setup (Installer)

Drop this into a project (after `SETUP.md`) and tell Claude Code to run it. It installs a
**top-notch SEO + AEO foundation** and a **Framer Motion** animation baseline — all wired to
one editable config file.

## What it installs
```
src/lib/site.ts                 # single source of truth (name, url, description, socials…)
src/components/JsonLd.tsx        # Person + WebSite structured data (AEO)
src/components/MotionProvider.tsx# app-wide motion (respects prefers-reduced-motion)
src/app/robots.ts               # robots.txt — allows search + AI answer-engine crawlers
src/app/sitemap.ts              # sitemap.xml
src/app/manifest.ts             # web app manifest
public/llms.txt                 # site summary for LLMs (emerging AEO convention)
# + root layout wired for metadata (OG/Twitter/robots/canonical) + JSON-LD + MotionProvider
# + `motion` package installed
```

**SEO:** metadata, Open Graph/Twitter cards, canonical, sitemap, robots, manifest.
**AEO:** `Person`/`WebSite` JSON-LD, `sameAs` social links, AI-crawler allow-list, `llms.txt`.
**Motion:** Framer Motion with `reducedMotion="user"` so animations are smooth *and* accessible.

## 🤖 Automated mode
In Claude Code: **"Read SEO-MOTION-SETUP.md and install it, then fill src/lib/site.ts with my details."**

## 🛠️ Manual mode
Install the package, create each file below, wire the layout, then edit `src/lib/site.ts`.

```bash
npm install motion
```

> **Reality check:** technical SEO makes you *eligible* to rank and gets you indexed everywhere —
> actual ranking still needs real content, backlinks, and time. This nails everything in your control.

---

### `src/lib/site.ts`
> The only file you routinely edit. Fill every `TODO`.
````ts
/** Central site config — single source of truth for SEO & AEO. */
export const siteConfig = {
  name: "TODO: Your Name",
  title: "TODO: Your Name — Your Role",
  description:
    "TODO: 150–160 chars on who you are and what you build. Shows in Google + AI answers.",
  url: "https://your-domain.com", // TODO: canonical production URL
  jobTitle: "TODO: e.g. Full-Stack Developer",
  locale: "en_US",
  keywords: ["TODO: your name", "portfolio", "TODO: your niche"],
  /** Profile links → JSON-LD `sameAs` (crucial for AEO). Empty strings are ignored. */
  socials: {
    github: "", // TODO
    linkedin: "", // TODO
    x: "", // TODO
  },
  /** Not rendered publicly by default (spam/privacy). Use a contact form instead. */
  email: "", // TODO (optional)
} as const;

export type SiteConfig = typeof siteConfig;
````

### `src/components/MotionProvider.tsx`
````tsx
"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide motion settings. `reducedMotion="user"` makes every Framer Motion
 * animation respect the visitor's OS "reduce motion" setting. Children stay
 * server-rendered (passed through this thin client wrapper).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
````

### `src/components/JsonLd.tsx`
````tsx
import { siteConfig } from "@/lib/site";

/** schema.org JSON-LD (Person + WebSite) — the biggest AEO lever. */
export function JsonLd() {
  const sameAs = Object.values(siteConfig.socials).filter((v) =>
    v.startsWith("http"),
  );

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: siteConfig.jobTitle,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
````

### `src/app/robots.ts`
````ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** robots.txt — allows search + major AI answer-engine crawlers (AEO). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
````

### `src/app/sitemap.ts`
````ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
````

### `src/app/manifest.ts`
````ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
  };
}
````

### `public/llms.txt`
````text
# TODO: Your Name — Portfolio

> TODO: one-line summary of who you are and what you do.

Built with Next.js.

## Links
- Site: https://your-domain.com
- GitHub: https://github.com/your-username
````

### Wire the root layout (`src/app/layout.tsx`)
Add the imports, replace the `metadata` export, and wrap `children`:
````tsx
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// …inside <body>, before your content:
//   <JsonLd />
//   <MotionProvider>{children}</MotionProvider>
````

### Using motion in a component
````tsx
"use client";
import { motion } from "motion/react";

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
````
Keep animated (`"use client"`) components at the **leaves** to keep JS small. Animate
`transform`/`opacity` (GPU-friendly). Reduced-motion is handled globally by `MotionProvider`.

---

## 🤖 AGENT INSTRUCTIONS (for Claude Code)
1. `npm install motion`, then create every file above at its exact path.
2. Merge the layout wiring into the existing `src/app/layout.tsx` (don't clobber fonts/existing markup).
3. Fill `src/lib/site.ts` from what you know about the user; ask for missing bits (role, socials, domain).
4. Do **not** put the user's email in public output (JSON-LD/llms.txt) unless they ask.
5. Run `npm run build` to verify, then report the generated routes (`/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`).
