# SEO + GEO + AEO Rules

- **SEO** (rank in Google/Bing): one `<h1>` per page, unique title (<=60 chars) and description (<=160), canonical URL, semantic headings, internal links with descriptive anchors, `next/image` with real `alt`, fast LCP/CLS/INP.
- **AEO** (get picked as the direct answer): question-shaped H2/H3 followed by a 40–60 word direct answer, FAQ sections marked up as `FAQPage` JSON-LD **that matches visible text exactly**, comparison tables as real `<table>`, pricing as real text.
- **GEO** (get cited by ChatGPT/Perplexity/Claude/Gemini): state facts plainly and consistently (who, what, price range, location, timezone overlap), keep `public/llms.txt` current, allow AI crawlers in `robots.ts`, use `Organization`/`ProfessionalService`/`Service`/`Offer` schema, cite real sources, keep entity info (name, description, sameAs) identical everywhere.
- All entity data comes from `src/lib/site.ts`. Never hardcode name/description/URL in components.
- Keywords come from `docs/PROJECT-BRIEF.md` (keyword map). One primary keyword per page; write for people first, no stuffing.
- Structured data must describe only what is visible on the page. No fake reviews, ratings or logos.
- Every new route must be added to `src/app/sitemap.ts` and have its own `metadata` + JSON-LD.
