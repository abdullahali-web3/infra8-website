import { Suspense } from "react";
import { ROUTES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Benefits } from "@/components/ui/Benefits";
import { BP_PAD, BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/sections/Faq";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { ContactForm, ContactFormFromUrl } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Contact Infra8: MVP Estimates and Infra Audits",
  description:
    "Tell us about your product. Get an MVP estimate within 24 hours, a dedicated team proposal or a free infrastructure audit. We reply on business days.",
  path: ROUTES.contact,
});

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Contact", href: ROUTES.contact },
];

const NEXT_STEPS = [
  { title: "We read it", body: "A senior engineer reads your message, not a sales script." },
  { title: "You hear back within 24 hours", body: "On business days. For an MVP, that reply includes a price range and a timeline." },
  { title: "A short call, if useful", body: "To fill the gaps. Then you get a written scope and price before any work starts." },
];

export default function ContactPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteConfig.url}${ROUTES.contact}#page`,
        url: `${siteConfig.url}${ROUTES.contact}`,
        name: "Contact Infra8",
        about: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: CRUMBS.map((c, n) => ({
          "@type": "ListItem",
          position: n + 1,
          name: c.name,
          item: c.href === "/" ? siteConfig.url : `${siteConfig.url}${c.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero
            crumbs={CRUMBS}
            title="Tell Us Where Your Product Is"
            sub="An idea, a live MVP or a cloud that needs looking after: tell us where you are, and you'll hear back within 24 hours on business days."
          />

          <section className="border-t border-line" aria-label="Contact form">
            <div className={`grid grid-cols-[minmax(0,1fr)] gap-10 py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12 lg:py-14 ${BP_PAD}`}>
              {/* The form reads ?topic= on the client; the fallback is the same form with the default topic. */}
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromUrl />
              </Suspense>

              <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
                <div className="flex flex-col gap-5">
                  <p className="font-mono text-[12px] leading-none text-muted uppercase">What happens next</p>
                  <ol className="flex flex-col border-l border-line">
                    {NEXT_STEPS.map((s, i) => (
                      <li key={s.title} className="relative flex flex-col gap-1.5 pb-6 pl-6 last:pb-0">
                        <span aria-hidden className="absolute top-0.5 -left-[5px] size-[9px] bg-brand" />
                        <span className="font-mono text-[11px] leading-none text-brand">{`0${i + 1}`}</span>
                        <span className="font-display text-[19px] leading-[1.3] tracking-[-0.03em] text-ink">{s.title}</span>
                        <span className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{s.body}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="dots border border-line p-6">
                  <div className="flex flex-col gap-4 bg-white p-5">
                    <p className="font-display text-[19px] leading-[1.3] tracking-[-0.03em] text-ink">Every project starts the same way</p>
                    <Benefits className="flex-col" />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <SectionGap />
          <Faq />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
