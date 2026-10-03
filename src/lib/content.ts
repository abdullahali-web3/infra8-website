/** Every estimate, audit and contact button leads to /contact, preselecting the right topic. */
export const CTA = {
  mvp: "/contact?topic=mvp",
  team: "/contact?topic=team",
  audit: "/contact?topic=audit",
  contact: "/contact",
  careers: "/contact?topic=careers",
  services: "#services",
} as const;

/**
 * Site map: every page's URL, in one place.
 * `intro` and each child's `body` feed the full-width mega menu.
 */
export const ROUTES = {
  services: "/services",
  productDevelopment: "/services/product-development",
  mvpDevelopment: "/services/mvp-development",
  cloudDevops: "/services/cloud-devops-management",
  products: "/products",
  company: "/company",
  about: "/company/about",
  ai: "/company/how-we-integrate-ai",
  resources: "/resources",
  insights: "/resources/insights",
  careers: "/resources/careers",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  cookies: "/cookie-policy",
  contact: "/contact",
} as const;

export const NAV = [
  {
    label: "Services",
    href: ROUTES.services,
    allLabel: "All services",
    intro: {
      title: "Build it, then run it",
      body: "One senior team for your product and the cloud it runs on.",
    },
    children: [
      { label: "Product development", href: ROUTES.productDevelopment, body: "Dedicated engineers who ship features every week.", art: "build" },
      { label: "MVP development", href: ROUTES.mvpDevelopment, body: "From idea to a launched MVP, with an estimate in 24 hours.", art: "launch" },
      { label: "Cloud/DevOps management", href: ROUTES.cloudDevops, body: "Cloud, CI/CD and security, run for you. Starts with a free audit.", art: "scale" },
    ],
  },
  {
    label: "Products",
    href: ROUTES.products,
    allLabel: "All products",
    /** Desktop mega menu shows the featured products (src/lib/products.ts) instead of `children`. */
    showFeatured: true,
    intro: {
      title: "Our products",
      body: "SaaS products we have built and run ourselves.",
    },
    children: [{ label: "All products", href: ROUTES.products, body: "Browse every product we have built." }],
  },
  {
    label: "Company",
    href: ROUTES.company,
    allLabel: "About Infra8",
    intro: {
      title: "The team behind Infra8",
      body: "Who we are, what we believe, and how we use AI without giving up control.",
    },
    children: [
      { label: "About", href: ROUTES.about, body: "Who we are, what we believe and the team behind the work." },
      { label: "How we integrate AI", href: ROUTES.ai, body: "AI-augmented development and CloudOps, with your data and workflows kept under control." },
    ],
  },
  {
    label: "Resources",
    href: ROUTES.resources,
    allLabel: "All resources",
    intro: {
      title: "Learn and join",
      body: "Guides from the work, and how to join the team.",
    },
    children: [
      { label: "Insights", href: ROUTES.insights, body: "Articles on building and running software." },
      { label: "Careers", href: ROUTES.careers, body: "How we hire and the roles we hire for." },
    ],
  },
] as const;

export const CLIENTS = [
  { name: "AlphaWave", file: "alphawave", markW: 37.2, textW: 105.3, gap: 6.3 },
  { name: "Codecraft_", file: "codecraft", markW: 31.7, textW: 120.3, gap: 7.9 },
  { name: "Biosynthesis", file: "biosynthesis", markW: 31.7, textW: 129, gap: 7.9 },
  { name: "Calescence", file: "calescence", markW: 27.4, textW: 116.4, gap: 7.9 },
  { name: "Clandestine", file: "clandestine", markW: 30.1, textW: 124.3, gap: 6.3 },
] as const;

/** Blueprint ticker under the client strip (typed one phrase at a time). */
export const TICKER = [
  "Build your MVP, estimated in 24 hrs",
  "Run your cloud, DevOps and security",
  "Own every repo and cloud account",
] as const;

export const STACK_STRIP = [
  { name: "AWS", tag: "Cloud" },
  { name: "Google Cloud", tag: "Cloud" },
  { name: "Microsoft Azure", tag: "Cloud" },
  { name: "Terraform", tag: "IaC" },
  { name: "Kubernetes", tag: "Orchestration" },
  { name: "Docker", tag: "Containers" },
] as const;

/** Service cards. Copy, chip text, icon geometry and button labels are taken from Figma node 171:698. */
export const STAGES = [
  {
    key: "launch",
    label: "Launch",
    chips: ["Idea Phase", "Preseed"],
    title: "Your First MVP Launch",
    body: "You have the idea and the vision, but no product yet. We scope it, design it and build it, so you have something real to put in front of users and investors.",
    primary: "Get MVP Estimate in 24 Hours",
    primaryHref: CTA.mvp,
    detailsHref: ROUTES.mvpDevelopment,
    image: "/content/images/stage-launch.webp",
    imageClass: "-rotate-45 -scale-y-100",
    imageW: 28,
    imageH: 25.822,
    iconBox: 38.058,
    iconGap: 0,
  },
  {
    key: "build",
    label: "Build",
    chips: ["Live MVP", "Pre-seed to Seed"],
    title: "Already Have an MVP",
    body: "Your MVP is out and now you need to ship faster without a rewrite. We embed senior engineers to build features, fix the foundations and get you ready for your next round.",
    primary: "Build With a Dedicated Team",
    primaryHref: CTA.team,
    detailsHref: ROUTES.productDevelopment,
    image: "/content/images/stage-build.webp",
    imageClass: "",
    imageW: 28,
    imageH: 28,
    iconBox: 28,
    iconGap: 4,
  },
  {
    key: "scale",
    label: "Scale",
    chips: ["Growth-stage", "Seed to Series A+"],
    title: "Live Product at Scale",
    body: "Your product has users and revenue, so downtime, breaches and cloud bills now cost real money. We take over your cloud, DevOps & security so your team can focus on the product.",
    primary: "Get a Free Infra Audit",
    primaryHref: CTA.audit,
    detailsHref: ROUTES.cloudDevops,
    image: "/content/images/stage-scale.webp",
    imageClass: "-rotate-[15deg]",
    imageW: 28,
    imageH: 28,
    iconBox: 34.293,
    iconGap: 0,
  },
] as const;

/** How it works. Product Development copy, tab names and step titles are from Figma node 177:762. */
export const TRACKS = {
  product: {
    label: "Product development",
    steps: [
      {
        title: "Get an estimate in 24 hrs",
        body: "A price range and timeline.",
      },
      {
        title: "Discovery sprint",
        body: "(1–2 weeks). Scope, user flows and architecture, written down.",
      },
      {
        title: "Weekly demos",
        body: "You see working software every week.",
      },
      {
        title: "Launch and handover",
        body: "You get the code, the docs and the accounts.",
      },
    ],
    cta: "Start MVP Estimate",
    ctaHref: CTA.mvp,
  },
  infra: {
    label: "Cloud/DevOps",
    steps: [
      {
        title: "Free audit",
        body: "A short review of your cloud, pipelines and security.",
      },
      {
        title: "Findings report",
        body: "Risks and savings ranked by impact and effort.",
      },
      {
        title: "Fix",
        body: "Migrations, CI/CD, infrastructure as code and security hardening.",
      },
      {
        title: "Managed retainer",
        body: "We run it, with a monthly review of uptime, cost and risk.",
      },
    ],
    cta: "Book Infra Audit",
    ctaHref: CTA.audit,
  },
} as const;

export const AI_POINTS = [
  {
    title: "AI-assisted code review",
    body: "Every pull request gets a machine first pass before a senior engineer reads it.",
  },
  {
    title: "Automated test generation",
    body: "More of the code is covered by tests before launch.",
  },
  {
    title: "Infrastructure scans",
    body: "Flags misconfigurations, idle resources and cloud cost waste.",
  },
  {
    title: "Faster scoping",
    body: "This is why you get an estimate in 24 hours.",
  },
] as const;

/**
 * Tool stack, drawn as three orbits (see ToolOrbits). Logo names resolve through `src/lib/logos.ts`.
 * A pill names the group of logos that follows it, so the orbit reads as a labelled list.
 * Every stat below is derived from this data or from the brief, never typed in by hand.
 */
export type OrbitItem =
  | { logo: string }
  | { pill: string; tone: "brand" | "ok" | "warn"; tint?: boolean };

export type StackOrbit = {
  label: string;
  /** Radius as a percentage of the stage width. */
  radius: number;
  /** Seconds for one full turn. */
  seconds: number;
  reverse: boolean;
  /** Where the first item starts, in degrees clockwise from the top. */
  offset: number;
  items: OrbitItem[];
};

const STACK_ORBITS: StackOrbit[] = [
  {
    label: "Cloud and infrastructure",
    radius: 20,
    seconds: 90,
    reverse: false,
    offset: -78,
    items: [
      { pill: "Cloud", tone: "ok", tint: true },
      { logo: "AWS" },
      { logo: "Google Cloud" },
      { logo: "Azure" },
      { pill: "Infra as code", tone: "brand" },
      { logo: "Terraform" },
      { logo: "Pulumi" },
      { pill: "Containers", tone: "brand" },
      { logo: "Docker" },
      { logo: "Kubernetes" },
    ],
  },
  {
    label: "Product engineering",
    radius: 33,
    seconds: 130,
    reverse: true,
    offset: -60,
    items: [
      { pill: "Design", tone: "warn" },
      { logo: "Figma" },
      { pill: "Frontend", tone: "brand" },
      { logo: "React" },
      { logo: "Next.js" },
      { logo: "Flutter" },
      { pill: "Backend", tone: "brand" },
      { logo: "Node.js" },
      { logo: "Python" },
      { logo: "FastAPI" },
      { logo: "Django" },
      { pill: "Data", tone: "brand" },
      { logo: "PostgreSQL" },
      { logo: "MongoDB" },
      { logo: "Redis" },
    ],
  },
  {
    label: "Delivery, operations and AI",
    radius: 46,
    seconds: 180,
    reverse: false,
    offset: -34,
    items: [
      { pill: "CI/CD", tone: "brand" },
      { logo: "GitHub Actions" },
      { logo: "GitLab CI" },
      { logo: "ArgoCD" },
      { logo: "GitHub" },
      { logo: "Vercel" },
      { pill: "Monitoring", tone: "ok" },
      { logo: "Grafana" },
      { logo: "Prometheus" },
      { logo: "Datadog" },
      { logo: "Sentry" },
      { pill: "Security", tone: "warn" },
      { logo: "Vault" },
      { logo: "Snyk" },
      { logo: "Trivy" },
      { pill: "AI", tone: "brand" },
      { logo: "OpenAI" },
      { logo: "Anthropic" },
    ],
  },
];

const ORBIT_LOGOS = STACK_ORBITS.flatMap((o) => o.items).flatMap((i) => ("logo" in i ? [i.logo] : []));
const MAJOR_CLOUDS = ["AWS", "Google Cloud", "Azure"].filter((c) => ORBIT_LOGOS.includes(c));

export const STACK = {
  orbits: STACK_ORBITS,
  stats: [
    { value: ORBIT_LOGOS.length, label: "Tools and technologies" },
    { value: MAJOR_CLOUDS.length, label: "Major cloud platforms" },
    { value: 24, label: "Hours to a first reply" },
  ],
  chips: [
    { label: "Frontend and mobile", logo: "React" },
    { label: "Backend and data", logo: "PostgreSQL" },
    { label: "Cloud and infra as code", logo: "Terraform" },
    { label: "CI/CD and monitoring", logo: "Grafana" },
    { label: "Security", logo: "Vault" },
  ],
  why: [
    {
      label: "For MVPs",
      body: "Popular, hireable technologies, so investors and your future CTO can take the code over without a rewrite.",
    },
    {
      label: "For live products",
      body: "Everything is defined in code inside your own accounts, so you can audit it, reproduce it or leave us at any time.",
    },
  ],
};

/**
 * Blueprint theme: the stack as five layers, top (what users see) to bottom (where it runs).
 * Same 32 tools as the orbits; stats are derived from this list, never typed in.
 */
export const STACK_LAYERS = [
  {
    key: "interface",
    label: "Interface",
    title: "Product and interface",
    body: "Product design and frontends for web and mobile.",
    tools: ["Figma", "React", "Next.js", "Flutter"],
  },
  {
    key: "services",
    label: "Services & APIs",
    title: "Backend and APIs",
    body: "The business logic, integrations and APIs your product runs on.",
    tools: ["Node.js", "Python", "FastAPI", "Django"],
  },
  {
    key: "data",
    label: "Data & AI",
    title: "Data and AI",
    body: "Databases, caching and AI features on the major model providers.",
    tools: ["PostgreSQL", "MongoDB", "Redis", "OpenAI", "Anthropic"],
  },
  {
    key: "delivery",
    label: "Delivery",
    title: "Delivery and monitoring",
    body: "CI/CD pipelines, deploys, dashboards and error tracking.",
    tools: ["GitHub", "GitHub Actions", "GitLab CI", "ArgoCD", "Vercel", "Grafana", "Prometheus", "Datadog", "Sentry"],
  },
  {
    key: "cloud",
    label: "Cloud & security",
    title: "Cloud and security",
    body: "Infrastructure as code on AWS, Google Cloud or Azure, hardened and scanned.",
    tools: ["AWS", "Google Cloud", "Azure", "Terraform", "Pulumi", "Docker", "Kubernetes", "Vault", "Snyk", "Trivy"],
  },
] as const;

const LAYER_TOOLS: readonly string[] = STACK_LAYERS.flatMap((l) => l.tools);


export const PROOF = [
  {
    key: "scope",
    title: "Sample MVP scope document",
    body: "See how we write scope, user flows and milestones before any code.",
  },
  {
    key: "arch",
    title: "Sample architecture diagram",
    body: "The kind of system map you receive at the end of discovery.",
  },
  {
    key: "audit",
    title: "Sample infra audit report",
    body: "An anonymized report with risks and savings ranked by impact and effort.",
  },
] as const;

/** Stats: every number restates a fact already on the page (estimate, discovery, ownership, stack). */
export const STATS = [
  { value: 24, suffix: "hrs", label: "From your first message to a senior engineer’s reply" },
  { value: 2, prefix: "1–", suffix: "wks", label: "Discovery sprint before any build starts" },
  { value: 100, suffix: "%", label: "Of the code and cloud accounts stay in your name" },
  { value: LAYER_TOOLS.length, suffix: "", label: "Mainstream tools across product and cloud" },
] as const;

/**
 * PLACEHOLDER testimonials. These are sample quotes written to show the layout, NOT real clients.
 * Replace every entry with a real, approved quote (name, role, company) before this ships.
 * Do not add Review/AggregateRating schema for them.
 */
export const TESTIMONIALS = [
  {
    quote: "We had an idea and a deadline. Two weeks later we had a scoped plan, and the MVP was in front of investors on time.",
    name: "Client name",
    role: "Founder, pre-seed startup",
  },
  {
    quote: "They took over our AWS account and pipelines without slowing the team down. Our cloud bill went down and the pager went quiet.",
    name: "Client name",
    role: "CTO, Series A SaaS",
  },
  {
    quote: "Weekly demos meant we always knew where the product stood. We own every repo, and nothing felt like a black box.",
    name: "Client name",
    role: "Co-founder, seed-stage marketplace",
  },
] as const;

export const FAQ = [
  {
    q: "Who owns the code and infrastructure?",
    a: "You do. Repos, cloud accounts and documentation stay in your name from day one.",
  },
  {
    q: "I'm not technical. Can I still work with you?",
    a: "Yes. Most MVP clients are non-technical founders. We explain decisions in plain language and show working software weekly.",
  },
  {
    q: "How can you estimate in 24 hours?",
    a: "We give a range based on your answers and our past builds. The exact number comes after the scoping call.",
  },
  {
    q: "How do you handle access to our cloud?",
    a: "Least-privilege access in your own accounts, NDA on request, and every change logged. You can revoke access anytime.",
  },
  {
    q: "Who actually writes the code?",
    a: "Our own senior engineers, named on your project.",
  },
  {
    q: "What if we need to stop?",
    a: "MVP projects are milestone-based, and retainers are month-to-month after an initial 3 months.",
  },
  {
    q: "Which time zones do you cover?",
    a: "We overlap 4–6 hours with US East and EU working hours.",
  },
  {
    q: "Do you handle SOC 2 or ISO 27001?",
    a: "We prepare your infrastructure and documentation for the audit. An accredited auditor certifies it.",
  },
] as const;

export const FOOTER = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "Product development", href: ROUTES.productDevelopment },
        { label: "MVP development", href: ROUTES.mvpDevelopment },
        { label: "Cloud/DevOps management", href: ROUTES.cloudDevops },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: ROUTES.about },
        { label: "How we integrate AI", href: ROUTES.ai },
        { label: "Products", href: ROUTES.products },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Insights", href: ROUTES.insights },
        { label: "Careers", href: ROUTES.careers },
        { label: "FAQ", href: "/#faq" },
      ],
    },
  ],
  legal: [
    { label: "Privacy policy", href: ROUTES.privacy },
    { label: "Terms of service", href: ROUTES.terms },
    { label: "Cookie policy", href: ROUTES.cookies },
  ],
} as const;
