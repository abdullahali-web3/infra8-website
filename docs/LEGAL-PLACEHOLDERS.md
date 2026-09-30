# Legal placeholders: fill in after the Wyoming LLC is registered

The Privacy Policy, Terms of Service and Cookie Policy (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`) are templates written around how the site works today. Every entity detail is a **[bracketed placeholder]**. The pages highlight them in orange and show a "Draft" notice.

**How to update:** change the values in `src/lib/legal.ts` (`LEGAL`). Each value is used everywhere it appears. When nothing is left in brackets, set `LEGAL_DRAFT = false` to remove the notice. The same list lives in code as `LEGAL_PLACEHOLDERS`.

| Key in `LEGAL` | Current placeholder | Replace with | Used in |
|---|---|---|---|
| `company` | [Infra8 LLC] | Exact registered name of the Wyoming LLC | All three policies |
| `entity` | [Infra8 LLC], a Wyoming limited liability company | Name + "a Wyoming limited liability company" once formed | Privacy, Terms |
| `registeredAddress` | [Registered office address, Wyoming, USA] | Registered agent / office address in Wyoming | All three (contact) |
| `mailingAddress` | [Business mailing address] | Business mailing address | All three (contact) |
| `legalEmail` | [legal@your-domain.com] | Legal contact email on the production domain | Terms, Cookies |
| `privacyEmail` | [privacy@your-domain.com] | Privacy contact for data requests | Privacy, Cookies |
| `website` | [https://www.your-domain.com] | Production domain | All three |
| `effectiveDate` | [Effective date] | Date the policies take effect | All three (header) |
| `venue` | [County], Wyoming | Wyoming county for courts, per counsel | Terms (governing law) |
| `euUkRepresentative` | [EU/UK representative, if required] | Article 27 representative, only if required | Privacy |
| `emailProvider` | [email provider] | Email service for lead and client email | Privacy (service providers) |
| `crmProvider` | [CRM provider] | CRM or form tool that stores leads | Privacy (service providers) |
| `analyticsProvider` | [analytics provider, if added] | Analytics tool if one is added (then also update the Cookie Policy table) | Privacy, Cookies |
| `leadRetention` | [24 months] | How long enquiry and estimate data is kept | Privacy (retention) |
| `applicantRetention` | [12 months] | How long job applications are kept | Privacy (retention) |
| `liabilityCap` | [USD 100] | Liability cap for website use, per counsel | Terms (limitation of liability) |
| `minimumAge` | [16] | Minimum age for using the site, per counsel | Privacy (children) |

Also update once the LLC exists:
- Footer copyright line ("© Infra8"): consider the registered name.
- `src/lib/site.ts`: `legalName`, `foundingDate`, `url`, `email`, `socials` (feed the Organization JSON-LD).

When the site changes, the policies must change with it:
- **Adding forms:** update "What Information We Collect" and the service providers.
- **Adding analytics:** update the Privacy service providers, fill in the Cookie Policy table, and add a consent banner where the law requires one.
- **Adding a vendor that processes personal data:** list it under "Who We Share It With".

These pages are templates, not legal advice. Have a lawyer review them before relying on them.
