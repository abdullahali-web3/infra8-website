import type { ServiceIcon } from "./services";

/**
 * Careers page copy. There are no confirmed open positions, so roles are framed as the roles we
 * hire for when client work needs them (no JobPosting schema, no locations, salaries or dates).
 * TODO(client): confirm the hiring steps; swap `applyHref` for an ATS link if one is adopted.
 */
export const CAREERS = {
  meta: {
    title: "Careers at Infra8",
    description:
      "Join a senior engineering team that builds MVPs for founders and runs cloud infrastructure for live products. See how we work and hire.",
  },
  hero: {
    title: "Build Products and Run Clouds With a Senior Team",
    sub: "Infra8 is a senior engineering team. We build MVPs for founders and run cloud infrastructure for live products, with AI in the workflow and engineers in charge.",
  },
  /** Applications go through the contact form, with "Joining the team" preselected. */
  applyHref: "/contact?topic=careers",
  principles: [
    {
      icon: "users" as ServiceIcon,
      title: "Senior by default",
      body: "Small teams of experienced engineers who own outcomes, not tickets.",
    },
    {
      icon: "workflow" as ServiceIcon,
      title: "Build it, then run it",
      body: "The people who write the code help keep it running, so quality matters from day one.",
    },
    {
      icon: "shieldCheck" as ServiceIcon,
      title: "Clients own everything",
      body: "Code, accounts and documentation live with the client. We earn the next month every month.",
    },
    {
      icon: "sparkles" as ServiceIcon,
      title: "AI in the loop, humans in charge",
      body: "AI takes the first pass on reviews, tests and scans. Engineers make the calls.",
    },
  ],
  roles: [
    {
      title: "Senior Full-Stack Engineer",
      body: "Build web products end to end, from the data model to the interface, for MVPs and live products.",
      tools: ["React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      title: "Senior Mobile Engineer",
      body: "Ship iOS and Android apps from one codebase, with the backend team alongside you.",
      tools: ["Flutter", "React", "Figma"],
    },
    {
      title: "Senior Backend Engineer",
      body: "Design APIs, data models and integrations that hold up as products grow.",
      tools: ["Python", "FastAPI", "Django", "Redis"],
    },
    {
      title: "Senior DevOps and Cloud Engineer",
      body: "Run client infrastructure as code, build pipelines and harden security on the major clouds.",
      tools: ["AWS", "Terraform", "Kubernetes", "GitHub Actions"],
    },
  ],
  hiring: [
    { title: "Send your profile", body: "Tell us what you've built and what you want to work on next." },
    { title: "Intro call", body: "A short conversation about your experience and the kind of work we do." },
    { title: "Technical conversation", body: "A discussion of real problems you've solved, with engineers from the team." },
    { title: "Offer", body: "A clear offer in writing, and a plan for your first project." },
  ],
};
