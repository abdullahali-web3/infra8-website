import type { ServiceKey } from "./services";

/**
 * Insights (articles): short, prose-led articles (under six minutes) for founders and CTOs, aimed at
 * the long-tail keywords in docs/PROJECT-BRIEF.md. Plain, confident language with real technical
 * detail, and no em dashes. Rules: general, checkable practice only; no statistics, client stories or
 * quotes we can't back up; our own terms must match the service pages. Each article opens with a
 * 40 to 60 word direct answer (AEO) and uses question-shaped H2s. Authored by the Infra8 team.
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
      "At Infra8, MVP builds start at $8,000.",
    ],
    body: [
      { type: "h2", text: "Why Do MVP Quotes Vary So Much?" },
      {
        type: "p",
        text: "Send the same idea to five development teams and you will often get five very different numbers. Usually none of them is wrong. Each team has quietly assumed a different product: one pictured a single web app with email login, another pictured web and mobile, an admin panel and payments. The price follows the scope each team imagined, so the first job in any estimate is to make that scope explicit.",
      },
      {
        type: "p",
        text: "Hourly rates matter less than most founders think. A cheaper team that builds the wrong thing, or builds it in a way the next team has to rewrite, ends up costing more. The real levers are what you build and how carefully it is built.",
      },
      { type: "h2", text: "What Drives the Cost of an MVP?" },
      {
        type: "p",
        text: "Four things move the number more than anything else. The first is user roles. Every role, such as customer, vendor or admin, adds screens, permissions and test cases, and role-based access control has to be enforced on the server, not just hidden in the interface.",
      },
      {
        type: "p",
        text: "The second is integrations. Payments, email, maps and third-party APIs each look like a single feature on a wish list, but each brings setup, webhooks, retries and failure handling. A payment flow that charges a card is easy. One that handles refunds, failed renewals and duplicate webhook calls without double-charging anyone takes real engineering.",
      },
      {
        type: "p",
        text: "The third is platforms. A web app, an iOS app and an Android app are three surfaces to build, test and release, even with a cross-platform framework, and app store review adds its own timeline. The fourth is data and compliance. Health, finance and personal data raise the bar for encryption, audit logging and where the product can be hosted.",
      },
      { type: "h2", text: "How Do You Reduce MVP Cost Without Cutting Corners?" },
      {
        type: "p",
        text: "Cut scope, not quality. An MVP exists to answer one question: will people use this? Pick the single flow that proves the idea and build it end to end, from sign-up to the moment the user gets value. Everything that does not help answer the question goes on a list for version two.",
      },
      {
        type: "p",
        text: "Use managed services where users will never notice the difference. Authentication, payments, email delivery and file storage are solved problems, and building them yourself buys risk, not advantage. Launch on one platform first; a responsive web app often reaches early users faster than two native apps. Keep admin tools basic, because your first customers can be supported by hand.",
      },
      {
        type: "p",
        text: "There are three things you should not cut: automated tests on the core flow, a deploy pipeline, and code a future hire can read. They feel invisible at launch, but they are what make version two cheaper than version one instead of more expensive.",
      },
      { type: "h2", text: "Fixed Scope or Time and Materials?" },
      {
        type: "p",
        text: "With time and materials you pay for hours, and the final price moves with every change and every surprise. That suits open-ended work on a live product. With fixed scope you agree in writing on what gets built and pay by milestone, so the price only changes when you agree to a change. For a first product on a fixed budget, fixed scope is usually the safer choice, because the risk of underestimating sits with the team rather than with you.",
      },
      {
        type: "callout",
        title: "How Infra8 prices an MVP",
        text: "You get a price range and timeline within 24 hours of sending your idea. A one to two week discovery sprint turns that into a fixed scope, and the build is paid by milestone. MVP builds start at $8,000.",
      },
      { type: "h2", text: "What Should a Good MVP Estimate Include?" },
      {
        type: "p",
        text: "A useful estimate is more than a number. It should list the features included and, just as important, the ones deliberately left out. It should name the user roles and platforms covered, the milestones and what you will see at each one, and who owns the code, the cloud accounts and the designs. Finally, it should say what happens after launch, whether that is a handover, ongoing development or managed hosting.",
      },
      {
        type: "p",
        text: "If a quote cannot answer these questions, the scope has not really been agreed yet, and you should expect the price to change once building starts.",
      },
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
        type: "p",
        text: "Most MVPs move through the same four stages. It starts with an estimate: a price range and timeline based on what you know today. Then comes discovery, where the scope, user flows and architecture are written down and agreed. At Infra8 this takes one to two weeks, and it is the cheapest place in the whole project to change your mind.",
      },
      {
        type: "p",
        text: "The build follows in short cycles, with working software to review every week. Finally there is launch and handover: a production release, documentation, and access to every repository and account. Each phase has a clear output, which is what lets you see whether the project is on schedule rather than hoping it is.",
      },
      { type: "h2", text: "Why Does Discovery Save Time Instead of Costing It?" },
      {
        type: "p",
        text: "Skipping discovery feels faster, but the questions it answers do not go away. They come back mid-build, when changing direction means rewriting code instead of editing a document. Discovery settles the data model, the user roles, the integrations and the edge cases that matter, such as what happens when a payment fails or a user is invited twice.",
      },
      {
        type: "p",
        text: "It is also when the technical foundations get decided: hosting, environments, the deploy pipeline and how the product will be monitored. Getting those right early means the first release goes out through the same pipeline as every release after it, instead of through a rushed manual process the week before launch.",
      },
      { type: "h2", text: "What Makes an MVP Take Longer?" },
      {
        type: "p",
        text: "Slow code is rarely the reason. The usual cause is scope that keeps growing. Every new idea pushes launch back a little, and together they push it back a lot. Park new ideas on a version-two list instead of slipping them into the current build.",
      },
      {
        type: "p",
        text: "Slow feedback is the second cause. If a demo waits a week for review, the build waits too. Unclear ownership is the third: when several people can approve or veto product decisions, every decision takes longer. The last is late integrations. Third-party APIs, payment provider approvals and app store reviews run on other companies' timelines, so they should start early, not in the final sprint.",
      },
      { type: "h2", text: "How Can Founders Speed Up an MVP?" },
      {
        type: "p",
        text: "Much of the time saving sits on the founder's side of the table. Write down the one problem the MVP solves, and for whom, before the build starts. Have content, branding, legal pages and test accounts ready so nobody waits on them. Block time for the weekly demo and answer open questions within a day.",
      },
      {
        type: "p",
        text: "Above all, agree on what launch means. A private beta for twenty users, a public launch and an investor demo are different targets with different finish lines. A private beta can ship with manual onboarding and basic admin tools; a public launch needs more polish, monitoring and support in place.",
      },
      { type: "h2", text: "Why Do Weekly Demos Matter?" },
      {
        type: "p",
        text: "A timeline on paper is a forecast. Working software every week turns it into evidence. You see real progress on real screens, you catch misunderstandings while they are cheap to fix, and you can adjust scope while there is still time to protect the launch date, instead of discovering a delay a month before it.",
      },
      {
        type: "p",
        text: "Weekly demos also make launch less dramatic. When the product has been running on a staging environment for weeks, release day is a routine deploy rather than a leap of faith. And because launch is a milestone rather than the finish line, the first weeks after it, with real users and real data, are when the product starts learning.",
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
      { type: "h2", text: "Why Prepare Before Asking for an Estimate?" },
      {
        type: "p",
        text: "An estimate is only as good as the brief behind it. Give a team a vague idea and you will get a vague number, padded to cover everything they had to guess. Give them clear answers to a handful of questions and the estimate becomes something you can plan a budget around. This checklist covers those questions. None of them need technical knowledge, and all of them are easier to answer before the first call than during it.",
      },
      { type: "h2", text: "What Should You Know About Your Users?" },
      {
        type: "p",
        text: "Start with the person, not the product. Describe who has the problem in a single sentence, specific enough that you could find ten of them this week. Then describe how they solve it today, whether that is a spreadsheet, a competitor or simply putting up with it, and what that costs them in time or money.",
      },
      {
        type: "p",
        text: "Finally, know where your first twenty users will come from. It shapes the product more than you might expect: users invited from a waiting list need a different onboarding flow from users who arrive through search, and a product sold to companies usually needs team accounts from day one.",
      },
      { type: "h2", text: "What Goes Into the First Version?" },
      {
        type: "p",
        text: "List every feature you want, then mark only the ones a user needs to get value on day one. Everything else goes on a version-two list. The aim is one complete flow, from sign-up to the moment the product does its job, rather than many half-built features.",
      },
      {
        type: "p",
        text: "It also helps to note the non-functional requirements early, because they change the architecture. Does the product handle payments or personal data? Does it need to work offline, support several languages, or meet a customer's security questionnaire? A sentence on each saves a redesign later.",
      },
      { type: "h2", text: "What Does Success Look Like?" },
      {
        type: "p",
        text: "Pick one or two numbers you will check after launch, such as the share of sign-ups that complete onboarding, or the users who come back in their second week. These numbers decide what gets built next, and they tell the team which events the product needs to track from the start, so the data exists when you need it.",
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
      {
        type: "p",
        text: "Ownership deserves the most attention. The repositories, the cloud accounts, the domain and the app store listings should all be registered to your company. If a team insists on hosting everything under its own accounts, leaving later becomes a negotiation instead of a handover.",
      },
      { type: "h2", text: "What Should You Prepare on Your Side?" },
      {
        type: "p",
        text: "Bring a budget range and a deadline you can live with, so the team can shape the scope to fit rather than guess. Collect a few products you like and say why, whether it is the onboarding, the tone or the layout. Gather brand assets if you have them. And name one decision-maker with time for weekly reviews, because a project with three part-time decision-makers moves at the speed of the slowest one.",
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
      { type: "h2", text: "What Problem Are You Actually Solving?" },
      {
        type: "p",
        text: "Once an MVP is live, the question changes from whether to build to who builds next. The right answer depends less on cost per hour than on three things: how much management time you have, how fast you need to ship, and how expensive mistakes in the codebase would be. Each staffing model trades these differently.",
      },
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
        text: "For a landing page, a one-off integration or a design refresh, a good freelancer is often exactly right. The work is well defined, the context is small, and you can judge the result yourself.",
      },
      {
        type: "p",
        text: "The cost appears when freelancers become the engineering team. Several people working on one codebase, each with their own conventions, and nobody owning the whole, tends to produce code that works but resists change. Someone has to set standards, review pull requests, manage deployments and hold the architecture together. With freelancers, that someone is usually you.",
      },
      { type: "h2", text: "When Should You Build In-House?" },
      {
        type: "p",
        text: "Once the product has found its market and you can recruit and keep senior engineers, the core work belongs in-house. That is where long-term product knowledge should live: why the data model looks the way it does, which customers depend on which edge case, what was tried and abandoned.",
      },
      {
        type: "p",
        text: "The catch is time. Hiring senior engineers takes months, and a first engineering hire without a technical leader to work alongside carries real risk. Many companies end up needing to ship well before their in-house team can.",
      },
      { type: "h2", text: "Where Does a Dedicated Team Fit?" },
      {
        type: "p",
        text: "A dedicated team covers the gap between the MVP and a full in-house team. It is a small group of senior engineers working only on your product, in your repositories and your tools, with code review, testing and deployment practices already in place. You set the priorities; the team owns the execution.",
      },
      {
        type: "p",
        text: "The structure also lowers your bus factor, the number of people who could leave before the project stalls. Knowledge is shared across the team and written down as it goes, instead of living in one freelancer's head.",
      },
      { type: "h2", text: "How Do You Keep Every Option Open?" },
      {
        type: "p",
        text: "Whichever model you choose, keep the code in repositories your company owns, run the product in cloud accounts registered to you, and treat documentation as part of the work rather than an extra. Then the choice is reversible. A dedicated team can hand over to your first in-house hires gradually, pairing with them and reviewing their pull requests, so knowledge moves across instead of walking out the door.",
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
      { type: "h2", text: "What Has AI Actually Changed in Software Work?" },
      {
        type: "p",
        text: "AI coding tools are very good at producing plausible code quickly. That is genuinely useful, and also the source of most of the risk. Plausible is not the same as correct, secure or maintainable. The teams getting real value from AI treat it as a fast, tireless first pass, and keep the decisions, and the accountability, with experienced engineers.",
      },
      { type: "h2", text: "Where Does AI Save the Most Time?" },
      {
        type: "p",
        text: "Code review is a good example. An AI pass on every pull request can flag likely bugs, missing error handling and risky patterns before a human reads it, so the senior reviewer spends their attention on design and intent rather than typos. Test generation is another. AI can draft unit tests for new code quickly, and an engineer then checks that the tests assert the right behaviour rather than simply mirroring whatever the code happens to do.",
      },
      {
        type: "p",
        text: "On the infrastructure side, AI-assisted scans surface misconfigurations, overly broad permissions and idle resources across large cloud accounts. And in scoping, it can turn a founder's description into a first list of features, user roles and open questions, which a senior engineer then corrects and prices.",
      },
      { type: "h2", text: "Where Should Humans Stay in Charge?" },
      {
        type: "p",
        text: "Anything expensive to reverse. Architecture decisions, such as how data is modelled or how services talk to each other, shape the product for years and depend on context no tool has. Security-sensitive code, like authentication, authorisation and payments, needs someone who understands the threat model, not just the syntax.",
      },
      {
        type: "p",
        text: "Product trade-offs stay human too: what to build, what to cut and what to delay are business decisions. And anything that touches customer data deserves a person who knows the obligations attached to it.",
      },
      { type: "h2", text: "What Are the Real Risks of AI-Written Code?" },
      {
        type: "p",
        text: "The obvious risk is subtle bugs that look right. Less obvious ones are worth knowing. Models sometimes suggest packages that do not exist, and attackers have published malicious packages under such names, so every new dependency should be checked. Generated code can also reproduce insecure patterns, such as building SQL queries from strings, because those patterns are common in public code.",
      },
      {
        type: "p",
        text: "Then there is data exposure. Pasting a production stack trace, an API key or a customer record into an unapproved tool can send it somewhere you cannot retrieve it from. And any tool that reads untrusted text, such as issues, emails or web pages, can be manipulated by instructions hidden in that text, a technique known as prompt injection.",
      },
      { type: "h2", text: "How Do You Use AI Safely in a Codebase?" },
      {
        type: "p",
        text: "Treat AI output like a pull request from a capable new team member: review it line by line before it merges. Keep your test suite and CI pipeline as the gate, so nothing reaches the main branch without passing them. Keep secrets, keys and customer data out of prompts entirely, and use only tools whose business terms exclude training on your code. Write down which tools are used on each project, so clients and auditors can see the process.",
      },
      {
        type: "p",
        text: "When choosing a development partner, ask which AI tools they use, what each tool is allowed to see, and who reviews the output. A good answer names the tools and the review step. A vague answer is a warning sign.",
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
        type: "p",
        text: "DevOps is often described as a single job, but in practice it is several disciplines. There is cloud architecture and cost control: choosing services, sizing them and keeping the bill predictable. There are CI/CD pipelines that build, test and deploy every change the same way. There is infrastructure as code, typically Terraform or Pulumi, so every environment can be reviewed, reproduced and rebuilt.",
      },
      {
        type: "p",
        text: "Then come monitoring, alerting and incident response, ideally measured against service level objectives rather than gut feel. And there is security: identity and access management, secrets handling, patching and vulnerability scanning. Few people are genuinely senior across all five. That gap is the main argument for a team.",
      },
      { type: "h2", text: "When Is Hiring the Right Call?" },
      {
        type: "p",
        text: "Hiring makes sense when infrastructure is part of what you sell rather than a support function, for example a data platform or a product with demanding uptime commitments. It also makes sense when the work is steady enough to fill a full-time role, and when you can recruit, and keep, a senior engineer in a competitive market.",
      },
      {
        type: "p",
        text: "Even then, plan for coverage. One engineer is one point of failure: holidays, illness and resignations all happen, and incidents do not wait for them. Most companies with a single DevOps hire still need a second line of support.",
      },
      { type: "h2", text: "When Is Managed DevOps the Better Fit?" },
      {
        type: "p",
        text: "The most common signal is developers running the cloud on the side. Deploys are manual or fragile, alerts go to whoever happens to be awake, and product work slips because engineers keep getting pulled into infrastructure. A managed team takes that load off and gives you the range of skills, across cloud, security and CI/CD, that one hire rarely covers.",
      },
      {
        type: "p",
        text: "Another signal is an outside deadline. When a customer or investor asks for SOC 2 or ISO 27001 readiness, the work involves access reviews, logging, change management and evidence collection, which is easier with people who have done it before. Managed DevOps also gives you coverage that does not disappear when one person goes on holiday.",
      },
      { type: "h2", text: "How Do You Avoid Lock-In?" },
      {
        type: "p",
        text: "Whoever runs your infrastructure, insist on three things. Everything is defined as code in repositories you own, so the infrastructure is readable and reviewable rather than a set of console clicks only one person remembers. Everything runs in cloud accounts registered to your company, with access granted to the provider, never the other way round. And documentation, including runbooks for common incidents, is part of the deliverable.",
      },
      {
        type: "p",
        text: "With those three in place, the decision stays reversible. You can start with a managed team today and move the work to an in-house engineer later, who inherits a codebase and a set of runbooks rather than a mystery.",
      },
      { type: "h2", text: "Where Should You Start?" },
      {
        type: "p",
        text: "With an honest picture of where you are. An infrastructure audit reviews your cloud setup, pipelines and security posture and ranks the risks and savings by impact and effort. It tells you whether you need a full-time engineer, a managed team, or a short project to fix the foundations.",
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
      { type: "h2", text: "Why Do AWS Bills Creep Up?" },
      {
        type: "p",
        text: "Cloud bills rarely jump. They creep. A test environment outlives its project, an instance is sized for a launch-day peak that never came, logs pile up in the most expensive storage tier. None of it is visible day to day, because each resource is small. Together they add up to a bill nobody can fully explain. Reducing it is less about clever tricks than about visibility and routine.",
      },
      { type: "h2", text: "How Do You See Where the Money Goes?" },
      {
        type: "p",
        text: "Start with tagging. Activate cost allocation tags such as team, service and environment, apply them through your infrastructure as code so new resources are tagged automatically, and group spend by those tags in Cost Explorer. Untagged spend is itself a finding: it is usually where the forgotten resources live.",
      },
      { type: "h2", text: "Where Does AWS Waste Usually Hide?" },
      {
        type: "p",
        text: "Idle resources are the most common source: unattached EBS volumes, old snapshots, unused Elastic IP addresses and stopped instances that still carry storage. Oversized compute comes next, meaning instances and databases sized for a peak that never arrived. Non-production environments are another, with staging and test running through every night and weekend.",
      },
      {
        type: "p",
        text: "Two less obvious ones deserve attention. Storage that never moves, such as logs and backups kept in the most expensive tier indefinitely. And data transfer: traffic between Availability Zones and regions, traffic out to the internet, and data processed through NAT gateways are all charged, and they rarely show up until the bill arrives.",
      },
      { type: "h2", text: "What Are the Quickest Wins?" },
      {
        type: "p",
        text: "Delete what is unused: unattached volumes, old snapshots and idle IP addresses. Schedule non-production environments to shut down outside working hours. Use AWS Compute Optimizer recommendations to rightsize instances, and check whether memory and CPU are actually used before choosing a smaller size.",
      },
      {
        type: "p",
        text: "Then look at the defaults. gp3 volumes have a lower price per gigabyte than gp2 and let you set performance separately from size. Many workloads also run well on Graviton instances, which AWS positions as better value for many applications. Add S3 lifecycle rules, or S3 Intelligent-Tiering, for data that is rarely read. And where traffic to S3 or DynamoDB flows through a NAT gateway, a VPC gateway endpoint can remove those processing charges entirely.",
      },
      { type: "h2", text: "When Should You Use Savings Plans or Reserved Instances?" },
      {
        type: "p",
        text: "Once your usage is steady, and not before. Savings Plans and Reserved Instances trade a one or three year commitment for a lower rate. They are excellent for the baseline you are confident you will keep running, and expensive if your architecture is about to change. Clean up and rightsize first, then commit to the smaller, steadier baseline that remains. Leave spiky or experimental workloads on demand.",
      },
      { type: "h2", text: "How Do You Stop Costs Creeping Back?" },
      {
        type: "p",
        text: "Make cost a routine rather than a project. Set AWS Budgets alerts per account and per team, so surprises surface in days rather than at month end. Review spend monthly with the people who own each service, because they know what can be switched off. And keep infrastructure as code, so every new resource goes through review like any other change, with its cost in plain sight.",
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
        text: "SOC 2 is a report, written by an independent CPA firm, on how well your company's controls protect customer data. It is measured against the Trust Services Criteria defined by the AICPA: security, availability, processing integrity, confidentiality and privacy. Security is always in scope. The others are included when they matter to what you promise customers, for example availability if you offer uptime commitments.",
      },
      {
        type: "p",
        text: "For a startup, SOC 2 usually arrives as a sales requirement. An enterprise customer's security team sends a questionnaire, and a SOC 2 report answers most of it at once. Understanding what the audit actually checks makes the preparation far less daunting.",
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
      {
        type: "p",
        text: "Many startups start with Type I to unblock early deals, then move to Type II. The important consequence of Type II is that controls have to run consistently for months, which is why they need to be automated rather than remembered.",
      },
      { type: "h2", text: "Which Infrastructure Controls Matter Most?" },
      {
        type: "p",
        text: "Access control comes first: single sign-on, multi-factor authentication and least-privilege roles, with access reviewed on a schedule and removed promptly when people leave. On AWS that usually means IAM Identity Center rather than long-lived IAM users and access keys. Logging and monitoring come next: an audit trail of who did what, such as CloudTrail enabled across all accounts and regions, with alerts on suspicious activity.",
      },
      {
        type: "p",
        text: "Encryption in transit and at rest is expected everywhere data lives. Change management means every change is reviewed and deployed through a pipeline: branch protection, required pull request approvals and no manual changes in production. Backups need tested restores, not just scheduled snapshots. And vulnerability management means dependency and container scanning, plus a written process for patching what the scans find.",
      },
      { type: "h2", text: "Why Does Evidence Matter So Much?" },
      {
        type: "p",
        text: "An auditor does not take your word for it. For each control they ask for evidence: access review records, pull request histories, alert configurations, restore tests. Teams that collect this by hand at audit time lose weeks. Teams whose controls are built into the infrastructure, such as access defined in code, changes recorded in Git and alerts kept in configuration, can produce most of the evidence on demand.",
      },
      { type: "h2", text: "How Do You Prepare for a SOC 2 Audit?" },
      {
        type: "p",
        text: "Decide which Trust Services Criteria apply to you, then run a gap assessment against them. Fix the gaps in order of risk, usually starting with access control and logging. Write down the policies you actually follow, rather than templates you do not. Then collect evidence continuously and engage an auditor once the controls have been running long enough to show they work.",
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
