import type { ServiceIcon } from "./services";

/**
 * Company pages: About and How We Integrate AI.
 *
 * Rules: no founding year, headcount, location, client names or named people (none confirmed).
 * The team section uses clearly marked placeholders. The AI page states working policies
 * (no training on client code, nothing sensitive in prompts, human approval before deploys, opt-out):
 * TODO(client): confirm each policy and the tool list before launch.
 */

export const ABOUT = {
  meta: {
    title: "About Infra8: One Team to Build and Run",
    description:
      "Infra8 is a senior engineering team that builds MVPs for founders and runs cloud, DevOps and security for live products. Meet the team and how we work.",
  },
  hero: {
    title: "Engineers Who Build It and Stay to Run It",
    sub: "Infra8 is a senior engineering team for founders and scaling startups. We build MVPs and product features, then run the cloud, DevOps and security behind them, so there's no handoff gap between the people who wrote the code and the people who keep it running.",
  },
  answer: {
    question: "What Is Infra8?",
    text: "Infra8 is a senior engineering team that builds MVPs for founders and runs cloud infrastructure, DevOps and security for live products. Clients own all code and infrastructure, work starts with a written scope and price, and progress is visible every week, from the first estimate to the monthly cloud review.",
  },
  story: {
    title: "Why One Team\nfor Build and Run",
    paragraphs: [
      "Most startups meet two kinds of engineering partner. A development shop builds the product and moves on. A DevOps consultancy arrives later, once the product is live and something breaks. Between them sits a handoff: code written by people who won't run it, handed to people who didn't write it.",
      "That gap is where weeks disappear, where cloud bills and security risks pile up, and where founders end up managing two vendors who each point at the other.",
      "Infra8 closes it. One senior team builds the product and keeps it running, so the decisions made on day one are made by the people who will live with them.",
    ],
  },
  commitments: [
    {
      icon: "shieldCheck" as ServiceIcon,
      title: "You own everything",
      body: "Code, cloud accounts and documentation are in your name from day one. No lock-in.",
    },
    {
      icon: "fileText" as ServiceIcon,
      title: "Scope and price in writing",
      body: "Before any work starts, you get what we'll build and what it costs, in writing.",
    },
    {
      icon: "users" as ServiceIcon,
      title: "Senior engineers only",
      body: "Small teams of experienced engineers, with a senior review on every change.",
    },
    {
      icon: "activity" as ServiceIcon,
      title: "Progress you can see",
      body: "Weekly demos for product work, and a monthly review of uptime, cost and risk for cloud work.",
    },
  ],
  /** PLACEHOLDER profiles: replace names, photos and roles with the real team before launch. */
  team: [
    { name: "Team member", role: "Engineering Lead" },
    { name: "Team member", role: "Senior Full-Stack Engineer" },
    { name: "Team member", role: "Senior Backend Engineer" },
    { name: "Team member", role: "Senior Mobile Engineer" },
    { name: "Team member", role: "Senior DevOps Engineer" },
    { name: "Team member", role: "Product Designer" },
  ],
};

export const AI_PAGE = {
  meta: {
    title: "How We Integrate AI Into Development and CloudOps",
    description:
      "How Infra8 uses AI in software development and cloud operations: where it helps, what stays human, and how your code, data and workflows stay under your control.",
  },
  hero: {
    title: "How We Integrate AI Without Losing Control",
    sub: "AI makes a senior team faster. It doesn't get the final say. Here is where we use it in development and cloud operations, what it is never allowed to see, and who signs off before anything ships.",
  },
  answer: {
    question: "How Does Infra8 Use AI?",
    text: "Infra8 uses AI for first passes: scoping, code review, test generation, infrastructure scans and cost checks. A senior engineer reviews everything before it ships, AI tools never receive secrets or customer data, and production changes always go through your pipeline with a human approval.",
  },
  concerns: [
    {
      q: "Will our code train someone else's model?",
      a: "We only use AI tools on business terms that exclude training on your code, and we list the tools used on your project so you can review them.",
    },
    {
      q: "Can AI see our customer data?",
      a: "No. Customer data stays in your accounts. Prompts never include production data, secrets or credentials.",
    },
    {
      q: "Can AI-written code be trusted?",
      a: "Not on its own. Every change is reviewed by a senior engineer and has to pass your tests before it merges.",
    },
    {
      q: "Will AI change our production systems?",
      a: "No. Changes go through your pipeline with a human approval. AI can propose a change; it can't deploy one.",
    },
  ],
  where: [
    {
      title: "AI-augmented development",
      items: [
        "Scoping: turning a brief into features and open questions, which is how estimates arrive within 24 hours.",
        "Code review: a first pass on every pull request, looking for bugs and risky patterns.",
        "Tests: drafting unit tests for new code, which an engineer then checks.",
        "Documentation: keeping READMEs and handover docs current as the code changes.",
      ],
    },
    {
      title: "AI-augmented CloudOps",
      items: [
        "Infrastructure scans: misconfigurations, open ports and public storage flagged early.",
        "Cost checks: idle and oversized resources surfaced for the monthly review.",
        "Infrastructure as code: a first pass on Terraform and pipeline changes before review.",
        "Incident notes: timelines drafted from logs, for an engineer to confirm and act on.",
      ],
    },
  ],
  split: {
    head: ["Task", "AI's part", "Engineer's part"],
    rows: [
      ["Scoping", "Drafts features and open questions", "Sets the scope, price and timeline"],
      ["Code review", "Flags bugs and risky patterns", "Reviews and approves every change"],
      ["Testing", "Drafts unit tests", "Checks coverage and edge cases"],
      ["Infrastructure", "Scans for misconfigurations and waste", "Decides on and applies the fix"],
      ["Production", "No access", "Approves every deploy"],
    ],
  },
  guardrails: [
    { title: "Human review on every change", body: "Nothing merges without a senior engineer's approval." },
    { title: "No secrets or customer data in prompts", body: "Keys, credentials and production data never go into AI tools." },
    { title: "Approved tools only", body: "A short list of vetted tools, written down for each project." },
    { title: "Least-privilege access", body: "Access to your cloud is scoped, logged and revocable at any time." },
    { title: "Everything in your accounts", body: "Code, pipelines and infrastructure live in accounts you own." },
    { title: "Opt out anytime", body: "If your policy rules out AI tools, we work without them on your project." },
  ],
  faq: [
    {
      q: "Which AI tools do you use?",
      a: "A short list of vetted tools for coding, review and scanning. The list for your project is written down at the start and shared with you.",
    },
    {
      q: "Is AI-assisted code secure?",
      a: "It is held to the same bar as any other code: senior review, tests and dependency scanning before it merges.",
    },
    {
      q: "Does AI make projects cheaper?",
      a: "It makes some work faster, like scoping, reviews and tests. We don't promise a percentage: the scope and price you get in writing are what you pay.",
    },
    {
      q: "Can we turn AI off for our project?",
      a: "Yes. If your security policy rules out AI tools, we work without them.",
    },
    {
      q: "Does this help with SOC 2 or ISO 27001?",
      a: "Our guardrails, like access control, review and logging, support the controls auditors look for. We prepare the infrastructure and documentation; an accredited auditor certifies it.",
    },
  ],
};
