import { FAQ } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** Page-level structured data: FAQPage (matches visible FAQ text) + the two services. */
export function HomeJsonLd() {
  const orgId = `${siteConfig.url}/#organization`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service-build`,
        name: "MVP development and dedicated product engineering",
        serviceType: "Software development",
        provider: { "@id": orgId },
        areaServed: siteConfig.areaServed,
        description:
          "Fixed-scope MVP development for founders and dedicated engineering squads for live products. Clients own all code and infrastructure.",
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service-run`,
        name: "Managed cloud, DevOps and security",
        serviceType: "Cloud infrastructure management",
        provider: { "@id": orgId },
        areaServed: siteConfig.areaServed,
        description:
          "Cloud architecture and migration, CI/CD, infrastructure as code, security hardening and managed DevOps retainers, starting with a free infrastructure audit.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
