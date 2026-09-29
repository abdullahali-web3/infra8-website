import { siteConfig } from "@/lib/site";

/** schema.org JSON-LD (Organization + ProfessionalService + WebSite) — the biggest GEO/AEO lever. */
export function JsonLd() {
  const sameAs = Object.values(siteConfig.socials).filter((v) =>
    v.startsWith("http"),
  );
  const orgId = `${siteConfig.url}/#organization`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: siteConfig.areaServed,
        knowsAbout: [...siteConfig.primaryKeywords, ...siteConfig.keywords],
        ...(siteConfig.foundingDate
          ? { foundingDate: siteConfig.foundingDate }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": orgId },
        inLanguage: "en",
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
