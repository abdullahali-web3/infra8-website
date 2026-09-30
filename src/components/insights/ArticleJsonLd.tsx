import { siteConfig } from "@/lib/site";
import type { Insight } from "@/lib/insights";
import type { Crumb } from "@/components/service/Breadcrumbs";

/** BlogPosting + BreadcrumbList for an article. Authored and published by the organization. */
export function ArticleJsonLd({ insight, path, crumbs }: { insight: Insight; path: string; crumbs: Crumb[] }) {
  const orgId = `${siteConfig.url}/#organization`;
  const url = `${siteConfig.url}${path}`;
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: insight.title,
      description: insight.description,
      datePublished: insight.published,
      dateModified: insight.published,
      articleSection: insight.category,
      inLanguage: "en",
      mainEntityOfPage: url,
      author: { "@id": orgId },
      publisher: { "@id": orgId },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.href === "/" ? siteConfig.url : `${siteConfig.url}${c.href}`,
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
