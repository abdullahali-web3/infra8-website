import type { ServiceKey } from "./services";

/**
 * Insights (articles). Written for founders and CTOs, aimed at the long-tail keywords in
 * docs/PROJECT-BRIEF.md. Rules: general, checkable practice only; no statistics, client stories or
 * quotes we can't back up; our own terms must match the service pages. Each article opens with a
 * 40–60 word direct answer (AEO) and uses question-shaped H2s. Authored by the Infra8 team.
 */

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type InsightCategory = "MVP" | "Product" | "Cloud & DevOps";

export type Insight = {
  slug: string;
  title: string;
  /** Shorter title for <title> when `title` would pass 60 characters with the site suffix. */
  metaTitle?: string;
  description: string;
  category: InsightCategory;
  /** ISO date. */
  published: string;
  service: ServiceKey;
  answer: string;
  takeaways: string[];
  body: Block[];
};

export const INSIGHT_CATEGORIES: InsightCategory[] = ["MVP", "Product", "Cloud & DevOps"];

const PUBLISHED = "2026-09-30";

export const INSIGHTS: Insight[] = [
  {
    slug: "how-much-does-it-cost-to-build-an-mvp",
    title: "How Much Does It Cost to Build an MVP?",
    description:
      "What actually drives MVP development cost, how to scope a first version down, and how fixed-scope pricing protects your budget.",
    category: "MVP",
    published: PUBLISHED,
    service: "mvp",
    answer:
      "The cost of an MVP depends on how many screens and user roles it has, which integrations it needs, the platforms it runs on and any compliance work. The fastest way to lower it is to cut scope, not quality: build the one flow that proves your idea, then add the rest once users ask for it.",
    takeaways: [
      "Scope, not hourly rate, is the biggest cost lever.",
      "Integrations and compliance add more cost than most founders expect.",
      "Fixed scope with milestone payments caps your risk.",
      "At Infra8, MVP builds start at $10,000.",
    ],
    body: [
      { type: "h2", text: "What Drives the Cost of an MVP?" },
      {
        type: "p",
        text: "Quotes for the same idea often differ because each team assumes a different scope. Four things move the number more than anything else.",
      },
      {
        type: "ol",
        items: [
          "Screens and user roles. Every role, like admin, customer or vendor, multiplies the screens, permissions and tests.",
          "Integrations. Payments, email, maps and third-party APIs each bring setup, edge cases and failure handling.",
          "Platforms. A web app, an iOS app and an Android app are three surfaces to build, test and release.",
          "Compliance and data. Health, finance and personal data raise the bar for security, logging and hosting.",
        ],
      },
      { type: "h2", text: "How Do You Reduce MVP Cost Without Cutting Corners?" },
      {
        type: "p",
        text: "Cut scope, not quality. An MVP exists to answer one question: will people use this? Anything that doesn't help answer it can wait.",
      },
      {
        type: "ul",
        items: [
          "Pick the single flow that proves the idea, and build it end to end.",
          "Use off-the-shelf services where users won't notice the difference, like authentication and payments.",
          "Launch on one platform first. A responsive web app often reaches early users faster than two native apps.",
          "Keep admin tools basic. Your first ten customers can be supported by hand.",
        ],
      },
      {
        type: "p",
        text: "What you should not cut: tests on the core flow, a deploy pipeline, and code a future hire can read. Those are what make the next version cheaper.",
      },
      { type: "h2", text: "Fixed Scope or Time and Materials?" },
      {
        type: "p",
        text: "With time and materials you pay for hours, and the final price moves with every change. With fixed scope you agree on what gets built and pay by milestone, so the price only moves when you agree to a change. For a first product on a fixed budget, fixed scope is usually the safer choice.",
      },
      {
        type: "callout",
        title: "How Infra8 prices an MVP",
        text: "You get a price range and timeline within 24 hours of sending your idea. A one to two week discovery sprint turns that into a fixed scope, and the build is paid by milestone. MVP builds start at $10,000.",
      },
      { type: "h2", text: "What Should Be in an MVP Estimate?" },
      { type: "p", text: "A useful estimate is more than a number. Ask for:" },
      {
        type: "ul",
        items: [
          "The features included, and the ones deliberately left out.",
          "The user roles and platforms covered.",
          "Milestones, and what you'll see at each one.",
          "Who owns the code, the cloud accounts and the designs.",
          "What happens after launch: handover, support or an ongoing team.",
        ],
      },
      { type: "p", text: "If a quote can't answer these, expect the price to change later." },
    ],
  },
  {
    slug: "how-long-does-it-take-to-build-an-mvp",
    title: "How Long Does It Take to Build an MVP?",
    description:
      "The phases of an MVP build, what makes projects slip, and what founders can do to reach launch sooner.",
    category: "MVP",
    published: PUBLISHED,
    service: "mvp",
    answer:
      "An MVP's timeline is set by its scope and by how fast decisions get made. Plan for three phases: a short discovery to agree what gets built, a build with working software every week, and a launch with handover. Clear scope and quick feedback shorten all three.",
    takeaways: [
      "Start with discovery: one to two weeks at Infra8.",
      "Weekly demos keep the timeline honest.",
      "Slow decisions delay projects more than slow code.",
      "Launch is a milestone, not the finish line.",
    ],
    body: [
      { type: "h2", text: "What Are the Phases of an MVP Build?" },
      {
        type: "ol",
        items: [
          "Estimate. A price range and timeline, based on what you know today.",
          "Discovery. Scope, user flows and architecture written down. At Infra8 this takes one to two weeks.",
          "Build. Short cycles, with a demo of working software every week.",
          "Launch and handover. Production release, documentation and access to everything.",
        ],
      },
      { type: "h2", text: "What Makes an MVP Take Longer?" },
      {
        type: "ul",
        items: [
          "Scope that keeps growing. Every new feature pushes launch back, so park ideas in a list for version two.",
          "Slow feedback. If a demo waits a week for review, the build waits too.",
          "Unclear ownership. One person should have the final say on product decisions.",
          "Late integrations. Third-party APIs and app store reviews run on their own timelines, so start them early.",
        ],
      },
      { type: "h2", text: "How Can Founders Speed Up an MVP?" },
      { type: "p", text: "Most of the time savings sit on the founder's side of the table." },
      {
        type: "ul",
        items: [
          "Write down the one problem the MVP solves, and for whom.",
          "Have content, branding and test accounts ready before the build starts.",
          "Block time for the weekly demo, and answer questions within a day.",
          "Agree on what launch means: a private beta, a public launch or an investor demo.",
        ],
      },
      { type: "h2", text: "Why Do Weekly Demos Matter?" },
      {
        type: "p",
        text: "A timeline on paper is a guess. Working software every week shows whether the project is on track while there's still time to adjust scope, instead of discovering a delay a month before launch.",
      },
      {
        type: "callout",
        title: "Your timeline, in writing",
        text: "Send us your idea and you'll get a price range and a timeline within 24 hours, before you commit to anything.",
      },
    ],
  },
  {
    slug: "mvp-checklist-before-hiring-a-development-team",
    title: "The MVP Checklist: What to Decide Before You Hire a Dev Team",
    metaTitle: "MVP Checklist: What to Decide Before Hiring a Team",
    description:
      "The questions to answer about users, scope, success and ownership before you ask a development team for an MVP estimate.",
    category: "MVP",
    published: PUBLISHED,
    service: "mvp",
    answer:
      "Before hiring a team to build your MVP, write down the problem and the user, the one flow that proves the idea, what success looks like after launch, your budget range and deadline, and who makes product decisions. With those answers, any competent team can give you an accurate estimate.",
    takeaways: [
      "Define the user and the problem before the features.",
      "One complete flow beats a long feature list.",
      "Decide who owns product decisions on your side.",
      "Insist on owning the code and the accounts.",
    ],
    body: [
      { type: "h2", text: "What Should You Know About Your Users?" },
      {
        type: "ul",
        items: [
          "Who has the problem, in one sentence.",
          "How they solve it today, and what that costs them.",
          "Where you'll find your first twenty users.",
        ],
      },
      { type: "h2", text: "What Goes Into the First Version?" },
      {
        type: "p",
        text: "List every feature you want, then mark the ones a user needs to get value on day one. Everything else goes on a version-two list. The goal is one complete flow, not many half-built ones.",
      },
      { type: "h2", text: "What Does Success Look Like?" },
      {
        type: "p",
        text: "Pick one or two numbers you'll check after launch, like sign-ups that complete onboarding or users who come back in their second week. They decide what gets built next.",
      },
      { type: "h2", text: "What Should You Agree With the Team?" },
      {
        type: "table",
        head: ["Question", "Why it matters"],
        rows: [
          ["Who owns the code and cloud accounts?", "You should, from day one, so you can change teams without a rewrite."],
          ["How is the price set?", "Fixed scope with milestones protects a fixed budget."],
          ["How will you see progress?", "Weekly demos show real software, not status reports."],
          ["Who reviews the code?", "A senior engineer should review every change."],
          ["What happens after launch?", "Handover, ongoing development or managed hosting, decided up front."],
        ],
      },
      { type: "h2", text: "What Should You Prepare?" },
      {
        type: "ul",
        items: [
          "A budget range and a deadline you can live with.",
          "Examples of products you like, and why.",
          "Brand assets, if you have them.",
          "A named decision-maker with time for weekly reviews.",
        ],
      },
      {
        type: "callout",
        title: "Skip the guesswork",
        text: "Send us your answers to this checklist and we'll reply with a price range and timeline within 24 hours.",
      },
    ],
  },
  {
    slug: "dedicated-development-team-vs-freelancers-vs-in-house",
    title: "Dedicated Team vs Freelancers vs In-House: A Founder's Guide",
    metaTitle: "Dedicated Team vs Freelancers vs In-House",
    description:
      "How freelancers, a dedicated development team and an in-house team compare on speed, management, quality and cost of change.",
    category: "Product",
    published: PUBLISHED,
    service: "product",
    answer:
      "Freelancers suit small, well-defined tasks. An in-house team suits long-term, core product work once you can recruit and manage it. A dedicated team sits in between: senior engineers who work only on your product, start quickly, and give you one point of accountability while you hire.",
    takeaways: [
      "Freelancers are flexible, but you become the manager.",
      "In-house builds long-term knowledge, but hiring takes time.",
      "A dedicated team gets you shipping now, without the hiring risk.",
      "Whatever you choose, the code should live in your repos.",
    ],
    body: [
      { type: "h2", text: "How Do the Three Options Compare?" },
      {
        type: "table",
        head: ["", "Freelancers", "Dedicated team", "In-house team"],
        rows: [
          ["Time to start", "Fast, for one person", "Fast, as a ready team", "Slow: recruiting and onboarding"],
          ["Who manages the work", "You", "The team, with you setting priorities", "You or your CTO"],
          ["Code review and quality", "Varies by person", "Built into how the team works", "Depends on your process"],
          ["Scaling up or down", "Hire or release individuals", "Adjust the team monthly", "Hiring or layoffs"],
          ["Best for", "Small, defined tasks", "Shipping a live product while you grow", "Core, long-term product work"],
        ],
      },
      { type: "h2", text: "When Do Freelancers Make Sense?" },
      {
        type: "p",
        text: "For a landing page, a one-off integration or a design refresh, a good freelancer is often the right call. The cost shows up later, when several freelancers work on one codebase with no shared standards and you end up as the project manager.",
      },
      { type: "h2", text: "When Should You Build In-House?" },
      {
        type: "p",
        text: "Once the product has found its market and you can recruit and keep senior engineers, bring the core work in-house. That's where long-term product knowledge should live.",
      },
      { type: "h2", text: "Where Does a Dedicated Team Fit?" },
      {
        type: "p",
        text: "Between the MVP and a full in-house team. You need to ship now, hiring takes months, and a mistake in the codebase is expensive. A dedicated team works in your repos and tools, ships every week and documents as it goes, so your future hires inherit a codebase they can work with.",
      },
      {
        type: "callout",
        title: "Dedicated teams at Infra8",
        text: "Senior engineers embedded in your product, billed monthly by team size. Engagements start at $8,000 per month.",
      },
    ],
  },
  {
    slug: "ai-in-software-development-where-it-helps",
    title: "AI in Software Development: Where It Helps and Where Humans Stay in Charge",
    metaTitle: "AI in Software Development: Where It Helps",
    description:
      "Where AI speeds up software delivery, where senior engineers must stay in charge, and how to use AI safely in a codebase.",
    category: "Product",
    published: PUBLISHED,
    service: "product",
    answer:
      "AI speeds up the repetitive parts of software work: first-pass code review, test generation, infrastructure scans and scoping. It doesn't replace judgment on architecture, security or product trade-offs. The safest setup uses AI for a first pass and has a senior engineer review everything before it ships.",
    takeaways: [
      "Use AI for first passes, not final calls.",
      "Every AI-written change still needs a human review.",
      "Tests and scans are where AI saves the most time.",
      "Don't send secrets or customer data to tools you haven't vetted.",
    ],
    body: [
      { type: "h2", text: "Where Does AI Save the Most Time?" },
      {
        type: "ul",
        items: [
          "Code review first pass: flagging bugs, style issues and risky patterns before a human reads the pull request.",
          "Test generation: drafting unit tests for new code, which an engineer then checks.",
          "Infrastructure scans: spotting misconfigurations and idle resources.",
          "Scoping: turning a founder's description into a first list of features and open questions.",
        ],
      },
      { type: "h2", text: "Where Should Humans Stay in Charge?" },
      {
        type: "ul",
        items: [
          "Architecture decisions that are expensive to reverse.",
          "Security-sensitive code, like authentication and payments.",
          "Product trade-offs: what to build and what to cut.",
          "Anything that touches customer data.",
        ],
      },
      { type: "h2", text: "How Do You Use AI Safely in a Codebase?" },
      {
        type: "ol",
        items: [
          "Treat AI output like a pull request from a new team member: review it line by line.",
          "Keep tests as the gate. Code that isn't covered doesn't merge.",
          "Never paste secrets, keys or customer data into tools you haven't approved.",
          "Record which tools are used, so clients and auditors can see the process.",
        ],
      },
      { type: "h2", text: "What Should You Ask a Development Partner?" },
      {
        type: "p",
        text: "Ask which AI tools they use, what each one is allowed to see, and who reviews the output. A good answer names the tools and the review step. A vague answer is a warning sign.",
      },
      {
        type: "callout",
        title: "How Infra8 works",
        text: "Every pull request gets an AI first pass and a senior engineer's review before it ships.",
      },
    ],
  },
  {
    slug: "managed-devops-vs-hiring-a-devops-engineer",
    title: "Managed DevOps vs Hiring a DevOps Engineer",
    description:
      "When to hire a DevOps engineer, when managed DevOps services fit better, and how to stay free of lock-in either way.",
    category: "Cloud & DevOps",
    published: PUBLISHED,
    service: "cloud",
    answer:
      "Hire a DevOps engineer when infrastructure work is full-time and you can recruit for it. Choose managed DevOps when you need cloud, CI/CD and security covered now, by a team rather than one person, with everything defined as code in your accounts so you can bring it in-house later.",
    takeaways: [
      "One engineer is one point of failure.",
      "Managed DevOps gives you a team's range of skills.",
      "Infrastructure as code keeps you free to switch.",
      "Start with an audit to see what you actually need.",
    ],
    body: [
      { type: "h2", text: "What Does DevOps Work Actually Include?" },
      {
        type: "ul",
        items: [
          "Cloud architecture and cost control.",
          "CI/CD pipelines that test and deploy every change.",
          "Infrastructure as code, so environments can be reproduced.",
          "Monitoring, alerting and incident response.",
          "Security: access control, secrets, patching and scanning.",
        ],
      },
      { type: "p", text: "Few people are senior at all five. That's the main argument for a team." },
      { type: "h2", text: "When Is Hiring the Right Call?" },
      {
        type: "ul",
        items: [
          "Infrastructure is a core part of your product, not a support function.",
          "The work is steady enough to fill a full-time role.",
          "You can recruit, and keep, a senior engineer in a competitive market.",
        ],
      },
      { type: "h2", text: "When Is Managed DevOps the Better Fit?" },
      {
        type: "ul",
        items: [
          "Your developers run the cloud on the side, and product work is slipping.",
          "You need several skills, like cloud, security and CI/CD, more than one full-time person.",
          "A customer or investor is asking for SOC 2 or ISO 27001 readiness.",
          "You want coverage that doesn't disappear when one person goes on holiday.",
        ],
      },
      { type: "h2", text: "How Do You Avoid Lock-In?" },
      {
        type: "p",
        text: "Insist on three things: everything defined as code in your repositories, everything running in accounts you own, and documentation as part of the deliverable. With those, you can move to an in-house team whenever it makes sense.",
      },
      {
        type: "callout",
        title: "Start with a free audit",
        text: "We review your cloud, pipelines and security, and rank the risks and savings by impact and effort. Managed retainers start at $4,000 per month.",
      },
    ],
  },
  {
    slug: "how-to-reduce-aws-costs",
    title: "How to Reduce Your AWS Bill Without Slowing Down",
    description:
      "Where AWS waste usually hides, the quickest cost wins, when to commit with Savings Plans, and how to stop costs creeping back.",
    category: "Cloud & DevOps",
    published: PUBLISHED,
    service: "cloud",
    answer:
      "Most AWS savings come from four places: deleting idle resources, rightsizing oversized instances and databases, committing to steady usage with Savings Plans or Reserved Instances, and moving old data to cheaper storage tiers. Tag everything first, so you can see which team and service each dollar belongs to.",
    takeaways: [
      "You can't cut what you can't see, so tag first.",
      "Idle and oversized resources are the quickest wins.",
      "Commit only to usage that's steady.",
      "Review costs monthly, not once a year.",
    ],
    body: [
      { type: "h2", text: "Where Does AWS Waste Usually Hide?" },
      {
        type: "ul",
        items: [
          "Idle resources: unattached EBS volumes, old snapshots, unused Elastic IPs and stopped instances that still carry storage.",
          "Oversized compute: instances and databases sized for a peak that never came.",
          "Always-on non-production: staging and test environments running through nights and weekends.",
          "Storage that never moves: logs and backups kept in the most expensive tier forever.",
          "Data transfer: traffic between regions and out to the internet, often invisible until the bill arrives.",
        ],
      },
      { type: "h2", text: "What Are the Quickest Wins?" },
      {
        type: "ol",
        items: [
          "Turn on cost allocation tags, and group spend by team, service and environment.",
          "Delete unattached volumes, old snapshots and unused IP addresses.",
          "Schedule non-production environments to shut down outside working hours.",
          "Use AWS Compute Optimizer recommendations to rightsize instances.",
          "Add S3 lifecycle rules, or S3 Intelligent-Tiering, for data that's rarely read.",
        ],
      },
      { type: "h2", text: "When Should You Use Savings Plans or Reserved Instances?" },
      {
        type: "p",
        text: "Once your usage is steady. Savings Plans and Reserved Instances trade a one or three year commitment for a lower rate, so they work best for the baseline you're confident you'll keep running. Cover the baseline, and leave spiky or experimental workloads on demand.",
      },
      { type: "h2", text: "How Do You Stop Costs Creeping Back?" },
      {
        type: "ul",
        items: [
          "Set AWS Budgets alerts per account and per team.",
          "Review spend monthly with the people who own each service.",
          "Define infrastructure as code, so new resources get reviewed like any other change.",
          "Make cost part of architecture decisions, not an afterthought.",
        ],
      },
      {
        type: "callout",
        title: "Find your savings",
        text: "Our free infrastructure audit includes a cost review, with savings ranked by impact and effort.",
      },
    ],
  },
  {
    slug: "soc-2-readiness-for-startups",
    title: "SOC 2 Readiness for Startups: What Your Infrastructure Needs",
    metaTitle: "SOC 2 Readiness for Startups: Infrastructure Guide",
    description:
      "What SOC 2 is, Type I versus Type II, the infrastructure controls auditors look for, and how startups can prepare.",
    category: "Cloud & DevOps",
    published: PUBLISHED,
    service: "cloud",
    answer:
      "SOC 2 is an audit of how well a company protects customer data, based on the AICPA's Trust Services Criteria. For startups, readiness means putting controls in place, like access management, logging, encryption and change management, and keeping evidence that they work. A licensed CPA firm performs the audit itself.",
    takeaways: [
      "SOC 2 is a report from a CPA firm, not a certificate you buy.",
      "Type I checks design at a point in time. Type II checks operation over a period.",
      "Most technical controls live in your cloud and CI/CD.",
      "Evidence matters as much as the controls themselves.",
    ],
    body: [
      { type: "h2", text: "What Is SOC 2?" },
      {
        type: "p",
        text: "SOC 2 is a report on your controls against the Trust Services Criteria defined by the AICPA: security, availability, processing integrity, confidentiality and privacy. Security is always in scope. The others are included when they matter to what you promise customers.",
      },
      { type: "h2", text: "What Is the Difference Between Type I and Type II?" },
      {
        type: "table",
        head: ["", "Type I", "Type II"],
        rows: [
          ["What it checks", "Whether controls are designed properly", "Whether controls worked over a period of time"],
          ["When", "At a single point in time", "Over an observation period, often several months"],
          ["Typical use", "A first report to unblock early deals", "The report most enterprise customers ask for"],
        ],
      },
      { type: "h2", text: "Which Infrastructure Controls Matter Most?" },
      {
        type: "ul",
        items: [
          "Access control: single sign-on, multi-factor authentication and least-privilege roles, reviewed regularly.",
          "Logging and monitoring: audit logs of who did what, and alerts on suspicious activity.",
          "Encryption: data encrypted in transit and at rest.",
          "Change management: every change reviewed and deployed through a pipeline, not by hand.",
          "Backups and recovery: tested restores, not just backups.",
          "Vulnerability management: dependency and container scanning, and a process for patching.",
        ],
      },
      { type: "h2", text: "How Do You Prepare for a SOC 2 Audit?" },
      {
        type: "ol",
        items: [
          "Decide which Trust Services Criteria apply to you.",
          "Run a gap assessment against those criteria.",
          "Fix the gaps, starting with access control and logging.",
          "Write down the policies you actually follow.",
          "Collect evidence continuously, then engage an auditor.",
        ],
      },
      {
        type: "callout",
        title: "Where Infra8 helps",
        text: "We prepare your infrastructure, controls and evidence for the audit. The audit itself is performed by a licensed CPA firm.",
      },
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

/** Minutes to read, from the words in the answer, takeaways and body. */
export function readingTime(i: Insight) {
  const text = [
    i.answer,
    ...i.takeaways,
    ...i.body.flatMap((b) =>
      b.type === "ul" || b.type === "ol"
        ? b.items
        : b.type === "table"
          ? [...b.head, ...b.rows.flat()]
          : b.type === "callout"
            ? [b.title, b.text]
            : [b.text],
    ),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 220));
}

/** Kebab-case id for an H2, used by the table of contents. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
