import { Suspense } from "react";
import { Clock, MailOpen, MessagesSquare } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Benefits } from "@/components/ui/Benefits";
import { BP_PAD, BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { IconTile } from "@/components/ui/IconTile";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/sections/Faq";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { ContactForm, ContactFormFromUrl } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Contact Infra8: Talk to Our Senior Engineers",
  description:
    "Tell us about your product. Ask for an MVP estimate, a dedicated team or a free infrastructure audit, and hear back within 24 hours on business days.",
  path: ROUTES.contact,
});

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Contact", href: ROUTES.contact },
];

const NEXT_STEPS = [
  { icon: MailOpen, title: "We read it", body: "A senior engineer reads your message, not a sales script." },
  { icon: Clock, title: "You hear back within 24 hours", body: "On business days, with clear next steps: a price range for a build, a team proposal or an audit plan." },
  { icon: MessagesSquare, title: "A short call, if useful", body: "To fill the gaps. Then you get a written scope and price before any work starts." },
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
            <div className={`grid grid-cols-[minmax(0,1fr)] gap-10 py-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-14 lg:py-14 ${BP_PAD}`}>
              {/* The form reads ?topic= on the client; the fallback is the same form with nothing preselected. */}
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromUrl />
              </Suspense>

              {/* Supporting detail: kept quieter than the form so the form leads. */}
              <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start lg:pt-3">
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] leading-none text-muted uppercase">What happens next</p>
                  <ol className="flex flex-col">
                    {NEXT_STEPS.map((s) => (
                      <li key={s.title} className="flex gap-4 border-t border-line py-4">
                        <IconTile icon={s.icon} className="-mt-1.5" />
                        <span className="flex flex-col gap-1">
                          <span className="text-[15px] leading-5 font-medium tracking-[-0.02em] text-ink">{s.title}</span>
                          <span className="text-sm leading-[22px] tracking-[-0.01em] text-muted">{s.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] leading-none text-muted uppercase">Every project starts the same way</p>
                  <Benefits className="flex-col" />
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
