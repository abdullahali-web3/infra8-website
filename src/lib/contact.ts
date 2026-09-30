/** Contact page options. `?topic=` on /contact preselects one of these keys. */
export const CONTACT_TOPICS = [
  {
    key: "mvp",
    label: "MVP estimate",
    hint: "A price range and timeline within 24 hours",
    prompt: "What are you building, and for whom? A few sentences is plenty.",
  },
  {
    key: "team",
    label: "Dedicated team",
    hint: "Senior engineers for your live product",
    prompt: "What does your product do, and what should the team take on first?",
  },
  {
    key: "audit",
    label: "Free infra audit",
    hint: "Cloud, CI/CD and security review",
    prompt: "Which cloud are you on, and what worries you most: cost, uptime or security?",
  },
  {
    key: "other",
    label: "Something else",
    hint: "Questions, samples or partnerships",
    prompt: "How can we help?",
  },
  {
    key: "careers",
    label: "Joining the team",
    hint: "Tell us what you've built",
    prompt: "What have you built, and what would you like to work on next? Add a link to your profile or CV.",
  },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["key"];

export const CONTACT_TIMELINES: string[] = ["As soon as possible", "In 1 to 3 months", "In 3+ months", "Just exploring"];

export function isContactTopic(v: string | null): v is ContactTopic {
  return CONTACT_TOPICS.some((t) => t.key === v);
}
