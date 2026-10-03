import { CTA, ROUTES } from "./content";

/**
 * Service pages: one record per service, rendered by `ServicePage`.
 *
 * Copy rules (docs/PROJECT-BRIEF.md): "build it, then run it"; write for both buyers (founder and
 * CTO); sell risk reduction, not scale. No prices, durations, response times or named people that
 * the client has not confirmed. Every fact here restates something already on the homepage.
 * Headings are Title Case. FAQ text feeds FAQPage JSON-LD, so it must match the visible text.
 */

export type ServiceIcon =
  | "fileText"
  | "penTool"
  | "code"
  | "cloud"
  | "presentation"
  | "rocket"
  | "users"
  | "gitPullRequest"
  | "wrench"
  | "bookOpen"
  | "workflow"
  | "server"
  | "shieldCheck"
  | "activity"
  | "piggyBank"
  | "fileCode"
  | "sparkles"
  | "listChecks"
  | "flaskConical"
  | "scanSearch"
  | "notebookPen"
  | "brainCircuit"
  | "database"
  | "userCheck"
  | "keyRound"
  | "fingerprint"
  | "folderLock"
  | "power"
  | "smartphone"
  | "mailOpen"
  | "clock"
  | "messagesSquare";

export type ServiceKey = "mvp" | "product" | "cloud";

export type Service = {
  key: ServiceKey;
  path: string;
  /** Short name used in breadcrumbs, cards and related links. */
  name: string;
  /** Which homepage stage illustration represents it. */
  stage: "launch" | "build" | "scale";
  meta: { title: string; description: string };
  hero: {
    title: string;
    sub: string;
    cta: { label: string; href: string };
  };
  /** AEO block: a question-shaped H2 with a 40–60 word direct answer. */
  answer: { question: string; text: string };
  fit: { title: string; items: { title: string; body: string }[]; notFit: string[] };
  deliverables: { title: string; sub: string; items: { icon: ServiceIcon; title: string; body: string }[] };
  process: { title: string; sub: string; steps: { title: string; body: string }[] };
  stack: { title: string; sub: string; tools: string[] };
  pricing: {
    question: string;
    text: string;
    factors: string[];
    terms: string;
    /**
     * The minimum engagement, shown quietly under the pricing answer. Figures are the "from" values
     * in docs/PROJECT-BRIEF.md (still to be validated by the client). Change them here only.
     */
    minimum: { amount: string; unit: string; note: string };
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  schema: { name: string; serviceType: string; description: string };
  /** One line for cards on /services and the related-services row. */
  summary: string;
};


export const SERVICES: Record<ServiceKey, Service> = {
  mvp: {
    key: "mvp",
    path: ROUTES.mvpDevelopment,
    name: "MVP development",
    stage: "launch",
    meta: {
      title: "MVP Development for Startups",
      description:
        "Senior engineers scope, design and build your MVP with fixed scope and weekly demos. You own the code. Get an estimate in 24 hours.",
    },
    hero: {
      title: "MVP Development for Startups, Built by Senior Engineers",
      sub: "You have the idea and the vision. We turn it into a launched product: scoped in a one to two week discovery sprint, built with weekly demos, and handed over with the code, the docs and the accounts in your name.",
      cta: { label: "Get MVP Estimate in 24 Hours", href: CTA.mvp },
    },
    answer: {
      question: "What Is MVP Development at Infra8?",
      text: "MVP development at Infra8 is a fixed-scope build of the smallest product that proves your idea with real users. A senior team scopes it in a one to two week discovery sprint, builds it with weekly demos, and hands over the code, documentation and cloud accounts in your name.",
    },
    fit: {
      title: "Built for Founders\nWith an Idea to Launch",
      items: [
        {
          title: "Non-technical founders",
          body: "You know the problem and the users, not the code. We explain every decision in plain language and show you working software every week.",
        },
        {
          title: "Founders raising pre-seed",
          body: "You need something real to put in front of users and investors, on a timeline you can plan a raise around.",
        },
        {
          title: "Technical founders short on time",
          body: "You could build it yourself, but your hours belong with customers. We build to your standards and hand it back clean.",
        },
      ],
      notFit: [
        "There's no defined user or problem yet. Talk to us after you've validated it.",
        "You want the cheapest possible build.",
      ],
    },
    deliverables: {
      title: "What You Get\nFrom Idea to Launch",
      sub: "Everything a first version needs to go live, and everything your next engineer needs to take it over.",
      items: [
        {
          icon: "fileText",
          title: "Written scope and estimate",
          body: "User flows, features and milestones in writing, with a price range and timeline before anything is built.",
        },
        {
          icon: "penTool",
          title: "Product design",
          body: "Designs in Figma for the flows that matter, reviewed with you before development starts.",
        },
        {
          icon: "code",
          title: "Web or mobile app",
          body: "Built with mainstream tools like React, Next.js, Flutter, Node.js and Python that your next hire already knows.",
        },
        {
          icon: "cloud",
          title: "Cloud setup in your accounts",
          body: "Hosting, databases and deploy pipelines configured in accounts you own, and defined in code.",
        },
        {
          icon: "presentation",
          title: "Weekly demos",
          body: "Working software every week, so you always know what is done and what comes next.",
        },
        {
          icon: "rocket",
          title: "Launch and handover",
          body: "Production launch, documentation and a handover. The repos and accounts are yours from day one.",
        },
      ],
    },
    process: {
      title: "How an MVP Build\nWorks, Step by Step",
      sub: "Four steps from your first message to a launched product.",
      steps: [
        {
          title: "Get an estimate in 24 hrs",
          body: "Tell us about the idea. Within 24 hours you get a price range and a timeline.",
        },
        {
          title: "Discovery sprint",
          body: "One to two weeks to write down the scope, user flows and architecture, so the build starts from an agreed plan.",
        },
        {
          title: "Build with weekly demos",
          body: "Short cycles and working software every week, with a senior engineer reviewing every change.",
        },
        {
          title: "Launch and handover",
          body: "We ship to production and hand over the code, the docs and the accounts.",
        },
      ],
    },
    stack: {
      title: "The Tools\nWe Build MVPs With",
      sub: "Popular, hireable technologies, so investors and your future CTO can take the code over without a rewrite.",
      tools: ["Figma", "React", "Next.js", "Flutter", "Node.js", "Python", "PostgreSQL", "Vercel", "AWS"],
    },
    pricing: {
      question: "How Much Does MVP\nDevelopment Cost?",
      text: "It depends on the number of screens and user roles, the integrations and any compliance needs. You get a price range and timeline within 24 hours of sending your idea, and a fixed scope for the build after the discovery sprint, so the price never moves without you agreeing to it.",
      factors: ["Screens and user roles", "Integrations like payments and email", "Web, iOS or Android", "Compliance and data needs"],
      terms: "MVP projects are fixed scope and paid by milestone.",
      minimum: {
        amount: "$10,000",
        unit: "per MVP build",
        note: "We don't take on builds below this. Under it the maths don't work for a senior team, and you'd be paying for shortcuts.",
      },
    },
    faqTitle: "Questions About\nMVP Development",
    faq: [
      {
        q: "How long does it take to build an MVP?",
        a: "It depends on scope. The discovery sprint takes one to two weeks, and you get a timeline for the build with your estimate, before you commit to anything.",
      },
      {
        q: "Do I own the code?",
        a: "Yes. Repos, cloud accounts and documentation are in your name from day one.",
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
        q: "Can you build on an existing design or prototype?",
        a: "Yes. We review what you have in the discovery sprint and build on the parts worth keeping.",
      },
      {
        q: "What happens after launch?",
        a: "You can take the product in-house with the handover docs, keep us on as a dedicated team to keep shipping, or hand us the cloud and DevOps under a managed retainer.",
      },
    ],
    schema: {
      name: "MVP development for startups",
      serviceType: "MVP development",
      description:
        "Fixed-scope MVP development for founders: a one to two week discovery sprint, a build with weekly demos, and a launch with the code, documentation and cloud accounts in the client's name.",
    },
    summary: "From idea to a launched first product, with an estimate in 24 hours.",
  },

  product: {
    key: "product",
    path: ROUTES.productDevelopment,
    name: "Product development",
    stage: "build",
    meta: {
      title: "Dedicated Development Team for Startups",
      description:
        "Embed a dedicated team of senior engineers in your product. Ship features every week, fix the foundations and get ready for your next round.",
    },
    hero: {
      title: "A Dedicated Development Team That Ships Every Week",
      sub: "Your MVP is live and the roadmap is growing faster than your team. We embed senior engineers who work in your repos and your tools, ship features every week and fix the foundations without a rewrite.",
      cta: { label: "Build With a Dedicated Team", href: CTA.team },
    },
    answer: {
      question: "What Is a Dedicated Development Team?",
      text: "A dedicated development team is a group of senior engineers who work only on your product, inside your repositories, tools and rituals, on a monthly engagement. Infra8's teams ship features every week, keep the codebase healthy and report on progress, so founders can plan releases and fundraising around real delivery.",
    },
    fit: {
      title: "Built for Startups\nWith a Live MVP",
      items: [
        {
          title: "Founders with a live MVP",
          body: "Users are asking for features and the backlog keeps growing. You need more shipping capacity without slowing down.",
        },
        {
          title: "CTOs building a team",
          body: "You need senior hands now while you hire, without lowering the bar on code quality.",
        },
        {
          title: "Teams with a fragile codebase",
          body: "The product works, but every change breaks something. We add tests, fix the foundations and keep shipping.",
        },
      ],
      notFit: [
        "You need a one-off project with a fixed end date. MVP development fits better.",
        "You want the cheapest possible hours rather than a team that owns outcomes.",
      ],
    },
    deliverables: {
      title: "What a Dedicated Team\nTakes Off Your Plate",
      sub: "A team that plans, builds, reviews and ships together, with one point of accountability.",
      items: [
        {
          icon: "users",
          title: "Engineers inside your team",
          body: "They work in your repos, issue tracker and chat, join your standups and learn your domain.",
        },
        {
          icon: "rocket",
          title: "Weekly releases",
          body: "Features shipped every week, with demos and release notes you can share with your team and investors.",
        },
        {
          icon: "gitPullRequest",
          title: "Review on every change",
          body: "Every pull request gets an AI first pass and a senior engineer's review, with tests added as the code changes.",
        },
        {
          icon: "wrench",
          title: "Foundations fixed",
          body: "Data models, performance and flaky deploys improved step by step, without stopping for a rewrite.",
        },
        {
          icon: "sparkles",
          title: "AI features, done properly",
          body: "Features built on providers like OpenAI and Anthropic, reviewed and tested like the rest of the code.",
        },
        {
          icon: "bookOpen",
          title: "Documented as we go",
          body: "Decisions and systems written down, so you can bring the work in-house when you hire.",
        },
      ],
    },
    process: {
      title: "How a Dedicated Team\nGets Up to Speed",
      sub: "From intro call to a steady weekly release rhythm.",
      steps: [
        {
          title: "Intro call and code review",
          body: "We look at your product, your codebase and your roadmap, and agree what the team should own.",
        },
        {
          title: "Onboarding",
          body: "Access, environments and a first small release, so the team learns the codebase by shipping.",
        },
        {
          title: "Weekly shipping",
          body: "Planning, weekly demos and release notes. You set the priorities, we deliver them.",
        },
        {
          title: "Monthly review",
          body: "A monthly look at delivery, quality and what's next, and the team adjusts to your roadmap.",
        },
      ],
    },
    stack: {
      title: "The Stack Our\nProduct Teams Work In",
      sub: "We work in your stack. These are the tools we reach for most, across web, mobile, backend and AI.",
      tools: ["React", "Next.js", "Flutter", "Node.js", "Python", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Redis", "OpenAI", "Anthropic"],
    },
    pricing: {
      question: "How Is a Dedicated\nTeam Priced?",
      text: "A dedicated team is billed monthly, based on the number of engineers and the skills your roadmap needs. After an intro call you get a proposed team and a monthly price in writing, before anyone starts. Terms are agreed up front, so there are no surprises at the end of the month.",
      factors: ["Number of engineers", "Skills: web, mobile, backend, AI", "Time-zone overlap", "Length of the engagement"],
      terms: "Retainers are month-to-month after an initial 3 months.",
      minimum: {
        amount: "$8,000",
        unit: "per month",
        note: "We don't staff teams below this. Under it the maths don't work for senior engineers who own the outcome.",
      },
    },
    faqTitle: "Questions About\nDedicated Teams",
    faq: [
      {
        q: "How is this different from hiring freelancers?",
        a: "You get a team that plans, reviews and ships together, with senior review on every change and one point of accountability, instead of managing individual contractors yourself.",
      },
      {
        q: "Will the engineers work in our tools?",
        a: "Yes. The team works in your repos, issue tracker and chat, and joins your standups and planning.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Everything is committed to your repositories from the first day.",
      },
      {
        q: "Which time zones do you cover?",
        a: "We overlap 4–6 hours with US East and EU working hours.",
      },
      {
        q: "What if we need to stop?",
        a: "Retainers are month-to-month after an initial 3 months, and the documentation means your team can pick up where we left off.",
      },
      {
        q: "Can you build AI features into our product?",
        a: "Yes. We build features on the major model providers, such as OpenAI and Anthropic, with the same review and testing as the rest of the code.",
      },
    ],
    schema: {
      name: "Dedicated product development team",
      serviceType: "Software development",
      description:
        "Dedicated teams of senior engineers embedded in a startup's product on a monthly engagement, shipping features weekly and improving code quality without a rewrite.",
    },
    summary: "Senior engineers embedded in your product, shipping every week.",
  },

  cloud: {
    key: "cloud",
    path: ROUTES.cloudDevops,
    name: "Cloud/DevOps management",
    stage: "scale",
    meta: {
      title: "Managed DevOps Services & Cloud Management",
      description:
        "We run your cloud, CI/CD and security on AWS, Google Cloud or Azure, all in code in your own accounts. Start with a free infrastructure audit.",
    },
    hero: {
      title: "Managed DevOps Services for Products Live at Scale",
      sub: "Your product has users and revenue, so downtime, breaches and cloud bills now cost real money. We take over your cloud, CI/CD and security, define it all in code in your own accounts, and review uptime, cost and risk with you every month.",
      cta: { label: "Get a Free Infra Audit", href: CTA.audit },
    },
    answer: {
      question: "What Are Managed DevOps Services?",
      text: "Managed DevOps services mean an outside team runs your cloud infrastructure, deployment pipelines and security day to day. At Infra8 that starts with a free audit, then a fix phase, then a monthly retainer, with everything defined as code in your own accounts so you can audit it or take it back at any time.",
    },
    fit: {
      title: "Built for Products\nWith Real Users",
      items: [
        {
          title: "Growth-stage startups",
          body: "Seed to Series A and beyond. Uptime and security now matter to your customers and your investors.",
        },
        {
          title: "Teams without a DevOps hire",
          body: "Your developers run the cloud on the side, and it's slowing product work down.",
        },
        {
          title: "Companies facing an audit",
          body: "A customer or investor wants SOC 2 or ISO 27001. We prepare the infrastructure and the documentation.",
        },
      ],
      notFit: [
        "You need a 24/7 operations center with 15-minute response guarantees.",
        "You want a one-off setup with no one accountable after it ships.",
      ],
    },
    deliverables: {
      title: "What We Run\nSo Your Team Doesn't Have To",
      sub: "Cloud, pipelines and security, defined in code, inside accounts you own.",
      items: [
        {
          icon: "cloud",
          title: "Cloud architecture and migration",
          body: "Designs and migrations on AWS, Google Cloud or Azure, planned around your release schedule.",
        },
        {
          icon: "fileCode",
          title: "Infrastructure as code",
          body: "Terraform or Pulumi for everything, reviewed like application code and kept in your repos.",
        },
        {
          icon: "workflow",
          title: "CI/CD pipelines",
          body: "Automated tests, builds and deploys with GitHub Actions, GitLab CI or ArgoCD.",
        },
        {
          icon: "activity",
          title: "Monitoring and alerting",
          body: "Dashboards and alerts with Grafana, Prometheus, Datadog or Sentry, tuned so an alert means something.",
        },
        {
          icon: "shieldCheck",
          title: "Security hardening",
          body: "Least-privilege access, secrets management, and dependency and container scanning with Vault, Snyk and Trivy.",
        },
        {
          icon: "piggyBank",
          title: "Cost optimization",
          body: "Idle and oversized resources found and fixed, and cloud spend reviewed with you every month.",
        },
      ],
    },
    process: {
      title: "From Free Audit\nto Managed Retainer",
      sub: "You see the risks and savings in writing before you commit to anything.",
      steps: [
        {
          title: "Free audit",
          body: "A short review of your cloud, pipelines and security.",
        },
        {
          title: "Findings report",
          body: "Risks and savings ranked by impact and effort, with a written scope for the fixes.",
        },
        {
          title: "Fix",
          body: "Migrations, CI/CD, infrastructure as code and security hardening, done in your accounts.",
        },
        {
          title: "Managed retainer",
          body: "We run it, with a monthly review of uptime, cost and risk.",
        },
      ],
    },
    stack: {
      title: "The Cloud and DevOps\nTools We Run",
      sub: "Everything is defined in code inside your own accounts, so you can audit it, reproduce it or leave us at any time.",
      tools: [
        "AWS",
        "Google Cloud",
        "Azure",
        "Terraform",
        "Pulumi",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "GitLab CI",
        "ArgoCD",
        "Grafana",
        "Prometheus",
        "Datadog",
        "Sentry",
        "Vault",
        "Snyk",
        "Trivy",
      ],
    },
    pricing: {
      question: "How Much Do Managed\nDevOps Services Cost?",
      text: "It depends on the size of your cloud, the number of environments and services, your uptime needs and any compliance work. The first step is a free audit. After it you get a written scope and price for the fixes, and a monthly price for the managed retainer, before any work starts.",
      factors: ["Size of your cloud", "Environments and services", "Uptime needs", "Compliance work like SOC 2"],
      terms: "Fixes are scoped in writing. Retainers are month-to-month after an initial 3 months.",
      minimum: {
        amount: "$4,000",
        unit: "per month, managed retainer",
        note: "The audit is free. We don't run retainers below this, because under it the maths don't work for proper monitoring, security and monthly reviews.",
      },
    },
    faqTitle: "Questions About\nManaged DevOps",
    faq: [
      {
        q: "What does the free infra audit cover?",
        a: "A short review of your cloud, pipelines and security, with the risks and savings written down and ranked by impact and effort.",
      },
      {
        q: "How do you handle access to our cloud?",
        a: "Least-privilege access in your own accounts, NDA on request, and every change logged. You can revoke access anytime.",
      },
      {
        q: "Do you work with AWS, Google Cloud and Azure?",
        a: "Yes. We work in all three, inside your existing accounts, and define what we set up in code with Terraform or Pulumi.",
      },
      {
        q: "Do you handle SOC 2 or ISO 27001?",
        a: "We prepare your infrastructure and documentation for the audit. An accredited auditor certifies it.",
      },
      {
        q: "Do you offer 24/7 on-call?",
        a: "We are not a 24/7 operations center. We set up monitoring and alerting, and agree in writing how incidents are handled as part of the retainer.",
      },
      {
        q: "What if we want to take it back in-house?",
        a: "Everything lives as code in your accounts, with documentation, so your team can take over at any time.",
      },
    ],
    schema: {
      name: "Managed cloud, DevOps and security",
      serviceType: "Cloud infrastructure management",
      description:
        "Managed DevOps services for products live at scale: a free infrastructure audit, fixes to cloud, CI/CD and security, and a monthly retainer with everything defined as code in the client's own accounts.",
    },
    summary: "Your cloud, CI/CD and security run for you. Starts with a free audit.",
  },
};

export const SERVICE_ORDER: ServiceKey[] = ["mvp", "product", "cloud"];

/** /services hub copy. */
export const SERVICES_HUB = {
  meta: {
    title: "Software Development & DevOps Services",
    description:
      "MVP development, dedicated product teams and managed cloud DevOps from one senior team that builds your product and runs it. Estimate in 24 hours.",
  },
  hero: {
    title: "One Senior Team to Build and Run Your Product",
    sub: "Most startups hire one team to build the product and another to run it, and lose weeks in the handoff. We do both, so the people who wrote the code also keep it running.",
  },
  answer: {
    question: "What Services Does Infra8 Offer?",
    text: "Infra8 offers three services: MVP development for founders launching a first product, dedicated product development teams for startups with a live MVP, and managed cloud and DevOps for products live at scale. One senior team covers all three, so a product can move from build to run without a handoff.",
  },
  /** Comparison table rows (a real <table> for AEO). Column order follows SERVICE_ORDER. */
  compare: [
    {
      label: "Best for",
      values: [
        "Founders with an idea and no product yet",
        "Startups with a live MVP and a growing roadmap",
        "Products with users and revenue",
      ],
    },
    { label: "Stage", values: ["Idea phase, pre-seed", "Pre-seed to seed", "Seed to Series A+"] },
    {
      label: "Starts with",
      values: ["A 24-hour estimate and a discovery sprint", "An intro call and a codebase review", "A free infrastructure audit"],
    },
    {
      label: "How it's billed",
      values: ["Fixed scope, paid by milestone", "Monthly, by team size", "Fixes scoped in writing, then a monthly retainer"],
    },
    {
      label: "What you get",
      values: [
        "A launched MVP, with docs and accounts in your name",
        "Features shipped weekly and a healthier codebase",
        "Cloud, CI/CD and security run in code, reviewed monthly",
      ],
    },
  ],
};
