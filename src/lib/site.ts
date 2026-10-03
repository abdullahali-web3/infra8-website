/** Central site config — single source of truth for SEO, AEO and GEO. */
export const siteConfig = {
  name: "Infra8",
  legalName: "Infra8", // TODO: registered legal entity name
  title: "Infra8 — MVP Development & Managed Cloud DevOps for Startups",
  description:
    "Senior engineers who build your MVP and run your cloud. Fixed-scope product development, DevOps and security. Get an estimate in 24 hours.",
  // TODO: set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is confirmed.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() || "http://localhost:3000",
  locale: "en_US",
  foundingDate: "", // TODO: e.g. "2025"
  areaServed: ["United States", "United Kingdom", "European Union"], // TODO: confirm target markets
  primaryKeywords: [
    "MVP development company",
    "managed DevOps services",
    "cloud infrastructure management",
    "startup software development",
    "DevOps as a service",
  ],
  keywords: [
    "MVP development for startups",
    "fixed price MVP development",
    "dedicated development squad",
    "managed DevOps retainer",
    "cloud migration services",
    "infrastructure as code",
    "AWS DevOps consulting",
    "cloud security and compliance",
    "SOC 2 readiness",
    "cloud cost optimization",
    "free infrastructure audit",
    "AI-native software development",
  ],
  /** Profile links → JSON-LD `sameAs` (crucial for GEO). Empty strings are ignored. */
  socials: {
    facebook: "", // TODO: client to send the profile URL
    x: "", // TODO
    linkedin: "", // TODO
    trustpilot: "", // TODO
    github: "", // TODO
    clutch: "", // TODO
  },
  /** Not rendered publicly by default. Use the estimate form. */
  email: "", // TODO
} as const;

export type SiteConfig = typeof siteConfig;
