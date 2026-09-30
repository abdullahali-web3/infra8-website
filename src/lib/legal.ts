import type { Block } from "./insights";

/**
 * Legal pages: Privacy Policy, Terms of Service, Cookie Policy.
 *
 * Infra8 will register as an LLC in Wyoming, USA. Until then every entity detail below is a
 * placeholder in [square brackets]; the pages highlight bracketed text so nothing unfinished looks
 * final. The full list of what to replace lives in `LEGAL_PLACEHOLDERS` (and docs/LEGAL-PLACEHOLDERS.md).
 *
 * These are templates written for this site's actual behaviour (hosted on Vercel, no analytics or
 * advertising cookies yet, lead forms planned). They are not legal advice: have a lawyer review them
 * once the LLC exists, and update them whenever forms, analytics or new vendors are added.
 */

/** Shows the draft notice on every legal page. Set to false once all placeholders are filled. */
export const LEGAL_DRAFT = true;

export const LEGAL = {
  company: "[Infra8 LLC]",
  entity: "[Infra8 LLC], a Wyoming limited liability company",
  registeredAddress: "[Registered office address, Wyoming, USA]",
  mailingAddress: "[Business mailing address]",
  legalEmail: "[legal@your-domain.com]",
  privacyEmail: "[privacy@your-domain.com]",
  website: "[https://www.your-domain.com]",
  effectiveDate: "[Effective date]",
  lastUpdated: "September 30, 2026",
  venue: "[County], Wyoming",
  euUkRepresentative: "[EU/UK representative, if required]",
  emailProvider: "[email provider]",
  crmProvider: "[CRM provider]",
  analyticsProvider: "[analytics provider, if added]",
  leadRetention: "[24 months]",
  applicantRetention: "[12 months]",
  liabilityCap: "[USD 100]",
  minimumAge: "[16]",
};

/** Every placeholder, what it should become, and where it appears. Mirrors docs/LEGAL-PLACEHOLDERS.md. */
export const LEGAL_PLACEHOLDERS: { key: keyof typeof LEGAL; replaceWith: string; usedIn: string }[] = [
  { key: "company", replaceWith: "Exact registered name of the Wyoming LLC", usedIn: "All three policies, footer" },
  { key: "entity", replaceWith: "Name + \"a Wyoming limited liability company\" once formed", usedIn: "Privacy, Terms" },
  { key: "registeredAddress", replaceWith: "Registered agent / office address in Wyoming", usedIn: "All three policies (contact)" },
  { key: "mailingAddress", replaceWith: "Business mailing address (can differ from registered agent)", usedIn: "All three policies (contact)" },
  { key: "legalEmail", replaceWith: "Legal contact email on the production domain", usedIn: "Terms, Cookies" },
  { key: "privacyEmail", replaceWith: "Privacy contact email for data requests", usedIn: "Privacy, Cookies" },
  { key: "website", replaceWith: "Production domain", usedIn: "All three policies" },
  { key: "effectiveDate", replaceWith: "Date the policies take effect", usedIn: "All three policies (header)" },
  { key: "venue", replaceWith: "Wyoming county for courts, per counsel", usedIn: "Terms (governing law)" },
  { key: "euUkRepresentative", replaceWith: "EU/UK Article 27 representative, only if required", usedIn: "Privacy" },
  { key: "emailProvider", replaceWith: "Email service used for lead and client email", usedIn: "Privacy (service providers)" },
  { key: "crmProvider", replaceWith: "CRM or form tool that stores leads", usedIn: "Privacy (service providers)" },
  { key: "analyticsProvider", replaceWith: "Analytics tool, if one is added (then update the Cookie Policy)", usedIn: "Privacy, Cookies" },
  { key: "leadRetention", replaceWith: "How long lead and estimate data is kept", usedIn: "Privacy (retention)" },
  { key: "applicantRetention", replaceWith: "How long job applications are kept", usedIn: "Privacy (retention)" },
  { key: "liabilityCap", replaceWith: "Liability cap for website use, per counsel", usedIn: "Terms (limitation of liability)" },
  { key: "minimumAge", replaceWith: "Minimum age for using the site, per counsel", usedIn: "Privacy (children)" },
];

const L = LEGAL;

export type LegalDoc = {
  slug: "privacy-policy" | "terms-of-service" | "cookie-policy";
  title: string;
  description: string;
  summary: string;
  body: Block[];
};

const contact = (email: string): Block[] => [
  {
    type: "p",
    text: `${L.company}, ${L.registeredAddress}. Mailing address: ${L.mailingAddress}. Email: ${email}.`,
  },
];

export const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: "How Infra8 collects, uses and protects personal information when you visit the website or contact us.",
  summary: "What we collect when you visit the site or contact us, why, who we share it with, and your rights.",
  body: [
    { type: "h2", text: "Who We Are" },
    {
      type: "p",
      text: `This Privacy Policy explains how ${L.entity} ("Infra8", "we", "us") collects and uses personal information when you visit ${L.website} (the "site") or contact us. When we work inside a client's systems, how we handle that data is set out in the written agreement for that project, not in this policy.`,
    },
    { type: "h2", text: "What Information We Collect" },
    { type: "p", text: "Information you give us:" },
    {
      type: "ul",
      items: [
        "Contact details, such as your name, email address, company and role, when you ask for an estimate or an audit, or email us.",
        "Project details you choose to share, such as your idea, your current stack or your timeline.",
        "Application details, such as your CV and work history, if you apply to join the team.",
      ],
    },
    { type: "p", text: "Information collected automatically:" },
    {
      type: "ul",
      items: [
        "Technical data in server logs kept by our hosting provider, such as your IP address, browser type, device, the pages you visit and the site that referred you.",
        "We do not currently use advertising cookies or cross-site tracking. See our Cookie Policy for details.",
      ],
    },
    { type: "h2", text: "How We Use Your Information" },
    {
      type: "ul",
      items: [
        "To reply to your enquiry and prepare estimates, audits and proposals.",
        "To deliver services under a signed agreement.",
        "To review job applications.",
        "To run, secure and improve the site, including preventing abuse.",
        "To meet legal, tax and accounting obligations.",
        "To send occasional updates, only where you have agreed. You can unsubscribe at any time.",
      ],
    },
    { type: "h2", text: "Legal Bases for Processing (EEA and UK)" },
    {
      type: "p",
      text: "If you are in the European Economic Area or the United Kingdom, we rely on these legal bases: taking steps at your request before entering a contract, and performing a contract; our legitimate interests in running the business and responding to enquiries; your consent, where we ask for it; and compliance with legal obligations.",
    },
    { type: "h2", text: "Who We Share It With" },
    { type: "p", text: "We share personal information only with:" },
    {
      type: "ul",
      items: [
        "Service providers that help us run the business, under contracts that limit how they use the data: website hosting (Vercel Inc.), email (" +
          L.emailProvider +
          "), lead management (" +
          L.crmProvider +
          ") and analytics (" +
          L.analyticsProvider +
          ").",
        "Professional advisers, such as lawyers and accountants.",
        "Authorities, where the law requires it.",
        "A buyer or successor, if the business is sold or merged, under this policy's protections.",
      ],
    },
    { type: "p", text: "We do not sell personal information, and we do not share it for cross-context behavioural advertising." },
    { type: "h2", text: "International Transfers" },
    {
      type: "p",
      text: "We are based in the United States, and our service providers may process data in the United States and other countries. Where data about people in the EEA or UK is transferred, we use appropriate safeguards, such as the European Commission's Standard Contractual Clauses.",
    },
    { type: "h2", text: "How Long We Keep It" },
    {
      type: "p",
      text: `We keep personal information only as long as we need it for the purposes above. Enquiry and estimate data is kept for ${L.leadRetention} after our last contact, job applications for ${L.applicantRetention}, and client records for as long as the law requires.`,
    },
    { type: "h2", text: "How We Protect It" },
    {
      type: "p",
      text: "We use reasonable technical and organisational measures, including encryption in transit, least-privilege access and logged changes. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    },
    { type: "h2", text: "Your Rights" },
    {
      type: "p",
      text: "Depending on where you live, you may have the right to access, correct or delete your personal information, to restrict or object to how we use it, to receive a copy in a portable format, and to withdraw consent at any time. If you are in the EEA or UK, you can also complain to your local data protection authority.",
    },
    {
      type: "p",
      text: "If you are a California resident, you have the right to know what personal information we collect, to request deletion or correction, and not to be discriminated against for using these rights. We do not sell or share personal information as those terms are defined under California law.",
    },
    { type: "p", text: `To make a request, email ${L.privacyEmail}. We may need to verify your identity before we act on it.` },
    { type: "h2", text: "Children" },
    {
      type: "p",
      text: `The site is for businesses and is not directed at anyone under ${L.minimumAge}. We do not knowingly collect personal information from children.`,
    },
    { type: "h2", text: "Changes to This Policy" },
    {
      type: "p",
      text: "We will update this policy when our practices change, for example when we add forms or analytics. The date at the top shows when it last changed.",
    },
    { type: "h2", text: "Contact Us" },
    ...contact(L.privacyEmail),
    { type: "p", text: `EU/UK representative: ${L.euUkRepresentative}.` },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms-of-service",
  title: "Terms of Service",
  description: "The terms for using the Infra8 website, including how estimates, prices and third-party links on the site should be read.",
  summary: "The rules for using this website. Client work is covered by a separate signed agreement.",
  body: [
    { type: "h2", text: "Agreement to These Terms" },
    {
      type: "p",
      text: `These Terms of Service govern your use of ${L.website} (the "site"), operated by ${L.entity} ("Infra8", "we", "us"). By using the site you agree to these terms. If you do not agree, please do not use the site.`,
    },
    { type: "h2", text: "Client Work Is Covered Separately" },
    {
      type: "p",
      text: "These terms cover the website only. Any project we take on is governed by a separate written agreement, such as a master services agreement and statement of work. If that agreement conflicts with these terms, the agreement wins.",
    },
    { type: "h2", text: "Using the Site" },
    { type: "p", text: "You agree not to:" },
    {
      type: "ul",
      items: [
        "Use the site for anything unlawful, or to infringe anyone's rights.",
        "Try to gain unauthorised access to the site, its servers or connected systems.",
        "Interfere with the site's operation, for example with malware or automated requests that place an unreasonable load on it.",
        "Copy or reuse the site's content for commercial purposes without our written permission.",
      ],
    },
    { type: "h2", text: "Information, Estimates and Prices" },
    {
      type: "p",
      text: "Content on the site is general information, not professional advice. Estimates, price ranges and \"starting at\" prices are indicative and are not an offer. A price becomes binding only when it is set out in a signed agreement.",
    },
    { type: "h2", text: "Intellectual Property" },
    {
      type: "p",
      text: `The site's content, design and code belong to ${L.company} or its licensors. Third-party names and logos, such as those of cloud providers and developer tools, are trademarks of their owners. They are used only to identify technologies we work with and do not imply endorsement or partnership.`,
    },
    { type: "h2", text: "Links to Other Websites and Our Products" },
    {
      type: "p",
      text: "The site links to other websites, including our own products, which are hosted separately and have their own terms and privacy policies. We are not responsible for the content or practices of third-party websites. Before you leave the site for one of our products, we ask you to confirm.",
    },
    { type: "h2", text: "What You Send Us" },
    {
      type: "p",
      text: "Please do not send confidential or sensitive information before we have agreed how it will be protected. We sign an NDA on request. Information you send is handled under our Privacy Policy.",
    },
    { type: "h2", text: "Disclaimers" },
    {
      type: "p",
      text: "The site is provided \"as is\" and \"as available\". To the fullest extent the law allows, we make no warranties about the site, including that it will be accurate, uninterrupted or free of errors.",
    },
    { type: "h2", text: "Limitation of Liability" },
    {
      type: "p",
      text: `To the fullest extent the law allows, ${L.company} is not liable for any indirect, incidental, special or consequential damages arising from your use of the site, and our total liability for any claim relating to the site is limited to ${L.liabilityCap}. Nothing in these terms limits liability that cannot be limited by law.`,
    },
    { type: "h2", text: "Indemnity" },
    {
      type: "p",
      text: "You agree to indemnify us against claims arising from your misuse of the site or your breach of these terms.",
    },
    { type: "h2", text: "Governing Law" },
    {
      type: "p",
      text: `These terms are governed by the laws of the State of Wyoming, USA, without regard to its conflict of laws rules. Any dispute relating to the site will be heard in the state or federal courts located in ${L.venue}, unless the law of your country requires otherwise.`,
    },
    { type: "h2", text: "Changes to These Terms" },
    { type: "p", text: "We may update these terms. The date at the top shows when they last changed, and continued use of the site means you accept the update." },
    { type: "h2", text: "Contact Us" },
    ...contact(L.legalEmail),
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  description: "Which cookies and similar technologies the Infra8 website uses, why, and how you can control them.",
  summary: "Which cookies the site uses today (only what it strictly needs), and how that would change.",
  body: [
    { type: "h2", text: "What Cookies Are" },
    {
      type: "p",
      text: "Cookies are small text files a website stores in your browser. Similar technologies, such as local storage and server logs, can do related jobs. This policy covers all of them.",
    },
    { type: "h2", text: "What This Site Uses Today" },
    {
      type: "p",
      text: `The site currently uses only what is strictly necessary to deliver pages securely. We do not use advertising cookies, we do not track you across other websites, and we do not currently run analytics that set cookies. Our hosting provider (Vercel Inc.) keeps server logs, such as IP addresses and pages requested, to operate and protect the site.`,
    },
    { type: "h2", text: "Cookie Categories" },
    {
      type: "table",
      head: ["Category", "What it does", "Used on this site", "Consent"],
      rows: [
        ["Strictly necessary", "Delivers pages securely and protects against abuse", "Yes", "Not required"],
        ["Analytics", `Counts visits and shows which pages are useful (${L.analyticsProvider})`, "Not yet", "Asked first, where required"],
        ["Functional", "Remembers choices such as form progress", "Not yet", "Asked first, where required"],
        ["Advertising", "Tracks you across sites to show ads", "No", "We do not use these"],
      ],
    },
    {
      type: "p",
      text: "If we add analytics, forms or other tools that use cookies, we will update this policy first and ask for your consent where the law requires it.",
    },
    { type: "h2", text: "How to Control Cookies" },
    {
      type: "p",
      text: "You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from working. Each major browser explains how in its help pages.",
    },
    { type: "h2", text: "Changes to This Policy" },
    { type: "p", text: "The date at the top shows when this policy last changed." },
    { type: "h2", text: "Contact Us" },
    ...contact(L.privacyEmail),
  ],
};

export const LEGAL_DOCS = [PRIVACY, TERMS, COOKIES];
