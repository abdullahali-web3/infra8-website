/**
 * Products: SaaS products Infra8 builds and runs itself (not client work). The catalogue links out to
 * each product's own website, after a confirm dialog.
 *
 * PLACEHOLDER: every product below is a sample invented to show the layout. They link to
 * example.com (a domain reserved for examples) and carry a visible "Sample" tag. Replace them with
 * real products (name, copy, URL, stack) before launch, and only then add product structured data.
 */

export type ThumbKind = "metrics" | "alerts" | "changelog" | "proposal" | "form";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: "Live" | "Beta";
  url: string;
  /** Shown in the confirm dialog and the thumbnail's address bar. */
  domain: string;
  /** The product's own brand colour, used only inside its thumbnail. */
  accent: string;
  thumb: ThumbKind;
  stack: string[];
  /** Shown in the Products mega menu (three of them). */
  featured: boolean;
  sample: boolean;
};

const SAMPLE_URL = "https://example.com";

export const PRODUCTS: Product[] = [
  {
    slug: "tallyloop",
    name: "Tallyloop",
    tagline: "Subscription metrics for SaaS founders",
    description: "MRR, churn and cohorts from your billing data, in one dashboard you can share with investors.",
    category: "Analytics",
    status: "Live",
    url: SAMPLE_URL,
    domain: "example.com",
    accent: "#0f9d6b",
    thumb: "metrics",
    stack: ["Next.js", "PostgreSQL", "AWS"],
    featured: true,
    sample: true,
  },
  {
    slug: "driftguard",
    name: "Driftguard",
    tagline: "Cloud misconfiguration alerts",
    description: "Watches AWS and Google Cloud accounts for risky changes, like public storage or open ports, and alerts the right person.",
    category: "Cloud security",
    status: "Live",
    url: SAMPLE_URL,
    domain: "example.com",
    accent: "#ea580c",
    thumb: "alerts",
    stack: ["Python", "Terraform", "Google Cloud"],
    featured: true,
    sample: true,
  },
  {
    slug: "shipnote",
    name: "Shipnote",
    tagline: "Release notes written from your commits",
    description: "Turns merged pull requests into a public changelog and customer email, reviewed by you before it goes out.",
    category: "Developer tools",
    status: "Beta",
    url: SAMPLE_URL,
    domain: "example.com",
    accent: "#7c3aed",
    thumb: "changelog",
    stack: ["Node.js", "GitHub", "OpenAI"],
    featured: true,
    sample: true,
  },
  {
    slug: "quotewell",
    name: "Quotewell",
    tagline: "Proposals clients can accept online",
    description: "Build a quote from reusable line items, send a clean link, and get it signed and accepted in one place.",
    category: "Sales",
    status: "Live",
    url: SAMPLE_URL,
    domain: "example.com",
    accent: "#0d9488",
    thumb: "proposal",
    stack: ["React", "Django", "Redis"],
    featured: false,
    sample: true,
  },
  {
    slug: "formpilot",
    name: "Formpilot",
    tagline: "Onboarding forms that fill themselves in",
    description: "Multi-step onboarding forms with AI suggestions, so new customers finish setup instead of dropping off.",
    category: "AI",
    status: "Beta",
    url: SAMPLE_URL,
    domain: "example.com",
    accent: "#db2777",
    thumb: "form",
    stack: ["Next.js", "FastAPI", "Anthropic"],
    featured: false,
    sample: true,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured).slice(0, 3);
