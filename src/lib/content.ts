export const CTA = {
  mvp: "#get-started",
  audit: "#get-started",
  services: "#services",
} as const;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Work", href: "#proof" },
  { label: "Company", href: "#commitments" },
] as const;

export const STACK_STRIP = [
  { name: "AWS", tag: "Cloud" },
  { name: "Google Cloud", tag: "Cloud" },
  { name: "Microsoft Azure", tag: "Cloud" },
  { name: "Terraform", tag: "Infrastructure as code" },
  { name: "Kubernetes", tag: "Orchestration" },
  { name: "Docker", tag: "Containers" },
] as const;

export const STAGES = [
  {
    key: "launch",
    label: "Launch",
    chips: ["Idea phase", "Pre-seed"],
    title: "Your first MVP",
    body: "You have the idea, no product yet. We scope it, design it and build it, so you have a working product to show users and investors.",
    bullets: [
      "Scope and roadmap before any code is written",
      "Design, full-stack build and launch",
      "Clean, documented code that investors and future CTOs won't reject",
    ],
    price: "From $10k · 6–10 weeks",
    primary: "Get MVP estimate in 24 hrs",
    primaryHref: CTA.mvp,
    secondary: "See how MVP builds work",
    secondaryHref: "#how-it-works",
    image: "/content/images/stage-launch.webp",
    imageClass: "-rotate-45 -scale-y-100",
    imageSize: 28,
  },
  {
    key: "build",
    label: "Build",
    chips: ["Live MVP", "Pre-seed to seed"],
    title: "Already have an MVP",
    body: "Users are trying it, and now you need to ship faster without a rewrite. Our engineers join your team, build features and fix the foundations before your next round.",
    bullets: [
      "Feature roadmap and weekly releases",
      "2–4 dedicated engineers who work in your tools",
      "Codebase cleanup so the product can scale",
    ],
    price: "From $8k/mo · Scale up or down monthly",
    primary: "Build with a dedicated squad",
    primaryHref: CTA.mvp,
    secondary: "See squad plans",
    secondaryHref: "#pricing",
    image: "/content/images/stage-build.webp",
    imageClass: "",
    imageSize: 28,
  },
  {
    key: "scale",
    label: "Scale",
    chips: ["Growth-stage", "Seed to Series A+"],
    title: "Live product at scale",
    body: "Downtime, breaches and cloud bills now cost real money. We take over your cloud, DevOps and security so your engineers can work on the product.",
    bullets: [
      "Cloud architecture, migrations, CI/CD and infrastructure as code",
      "Security hardening and compliance prep (SOC 2, ISO 27001)",
      "Managed DevOps with proactive monitoring and cloud cost cuts",
    ],
    price: "Retainers from $4k/mo · Start with the audit",
    primary: "Get a free infra audit",
    primaryHref: CTA.audit,
    secondary: "What the audit covers",
    secondaryHref: "#how-it-works",
    image: "/content/images/stage-scale.webp",
    imageClass: "-rotate-[15deg]",
    imageSize: 28,
  },
] as const;

export const COMMITMENTS = [
  {
    key: "own",
    title: "You own everything",
    body: "Code, repos, cloud accounts and documentation are in your name from day one. Revoke our access anytime.",
  },
  {
    key: "named",
    title: "Named senior engineers",
    body: "You know who is on your project, and they're the ones doing the work.",
  },
  {
    key: "scope",
    title: "Written scope and price before we start",
    body: "No hourly surprises. MVPs are fixed-scope and infra work is scoped after the audit.",
  },
  {
    key: "progress",
    title: "Visible progress",
    body: "A working demo every week for MVPs. A monthly report on uptime, cost and risk for infra clients.",
  },
] as const;

export const TRACKS = {
  product: {
    label: "Product Development",
    steps: [
      {
        title: "Send your idea, get an estimate",
        body: "A short form, about 5 minutes. You get a price range and timeline within 24 hours.",
      },
      {
        title: "Discovery sprint",
        body: "One to two weeks. Scope, user flows and architecture, written down.",
      },
      {
        title: "Build with weekly demos",
        body: "You see working software every week.",
      },
      {
        title: "Launch and handover",
        body: "You get the code, the docs and the accounts.",
      },
    ],
    cta: "Start MVP estimate",
    ctaHref: CTA.mvp,
  },
  infra: {
    label: "Cloud / DevOps",
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
    cta: "Book infra audit",
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

export const STACK_TABS = {
  product: {
    label: "MVPs and product teams",
    groups: [
      { name: "Frontend and mobile", items: ["React", "Next.js", "React Native", "Flutter"] },
      { name: "Backend", items: ["Node.js", "Python", "FastAPI", "Django"] },
      { name: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
      { name: "AI features", items: ["OpenAI API", "Anthropic API", "Open-source models", "Vector databases"] },
      { name: "Design and delivery", items: ["Figma", "GitHub", "Vercel", "AWS"] },
    ],
    why: "Popular, hireable technologies, so investors and your future CTO can take the code over without a rewrite.",
  },
  infra: {
    label: "Live products at scale",
    groups: [
      { name: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
      { name: "Infrastructure as code", items: ["Terraform", "Pulumi"] },
      { name: "Containers", items: ["Docker", "Kubernetes"] },
      { name: "CI/CD", items: ["GitHub Actions", "GitLab CI", "ArgoCD"] },
      { name: "Monitoring", items: ["Grafana", "Prometheus", "Datadog", "Sentry"] },
      { name: "Security", items: ["Vault", "Snyk", "Trivy", "GuardDuty", "Security Hub"] },
    ],
    why: "Everything is defined in code inside your own accounts, so you can audit it, reproduce it or leave us at any time.",
  },
} as const;

export const PRICING = [
  { group: "Projects", name: "Discovery sprint", min: 2, max: 5, unit: "k", note: "1–2 weeks. Feeds the build quote." },
  { group: "Projects", name: "Lean MVP (one core flow)", min: 10, max: 25, unit: "k", note: "Fixed scope." },
  { group: "Projects", name: "Full MVP (multi-role, integrations)", min: 25, max: 60, unit: "k", note: "Fixed scope, milestone-based." },
  { group: "Projects", name: "Infra audit: initial review", min: 0, max: 0, unit: "free", note: "A short review of your cloud, pipelines and security." },
  { group: "Projects", name: "Infra audit: deep audit", min: 3, max: 8, unit: "k", note: "Optional, after the free review." },
  { group: "Retainers", name: "Dedicated squad", min: 8, max: 20, unit: "k/mo", note: "2–4 engineers in your tools." },
  { group: "Retainers", name: "Managed DevOps", min: 4, max: 20, unit: "k/mo", note: "By environment size and support hours." },
] as const;

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

export const FIT = {
  yes: [
    "You're a pre-seed or seed founder with a defined idea and budget to build it",
    "You have a live MVP and need engineers who ship weekly",
    "You run a product with real users and need someone accountable for cloud, uptime and security",
  ],
  no: [
    "You want the cheapest possible build",
    "You need a 24/7 operations center with 15-minute response guarantees",
    "There's no defined user or problem yet (talk to us after you've validated it)",
  ],
} as const;

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
        { label: "Product development", href: "#services" },
        { label: "Cloud and DevOps", href: "#services" },
        { label: "Free infra audit", href: "#get-started" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "How we work", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Work", href: "#proof" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
} as const;
