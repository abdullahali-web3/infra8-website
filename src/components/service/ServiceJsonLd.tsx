import { siteConfig } from "@/lib/site";
import type { Crumb } from "./Breadcrumbs";

type ServiceSchema = { name: string; serviceType: string; description: string; path: string };

/**
 * Page-level structured data for service pages: BreadcrumbList, one or more Service entries, and a
 * FAQPage when the page shows a FAQ. Everything here must match text visible on the page.
 */
export function ServiceJsonLd({
  crumbs,
  services,
  faq,
}: {
  crumbs: Crumb[];
  services: ServiceSchema[];
  faq?: readonly { q: string; a: string }[];
}) {
  const orgId = `${siteConfig.url}/#organization`;
  const abs = (href: string) => (href === "/" ? siteConfig.url : `${siteConfig.url}${href}`);

  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: abs(c.href),
      })),
    },
    ...services.map((s) => ({
      "@type": "Service",
      "@id": `${abs(s.path)}#service`,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      url: abs(s.path),
      provider: { "@id": orgId },
      areaServed: siteConfig.areaServed,
    })),
    ...(faq?.length
      ? [
          {
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
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
