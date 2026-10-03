import { CTA, ROUTES } from "@/lib/content";
import { ABOUT } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_ORDER, SERVICES } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { RelatedServices, ServiceAnswer } from "@/components/service/ServiceSections";
import { IconCells, ReasonRows, TeamGrid } from "@/components/company/CompanySections";

export const metadata = pageMetadata({ ...ABOUT.meta, path: ROUTES.about });

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "About", href: ROUTES.about },
];

export default function AboutPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteConfig.url}${ROUTES.about}#page`,
        url: `${siteConfig.url}${ROUTES.about}`,
        name: ABOUT.meta.title,
        description: ABOUT.meta.description,
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
            title={ABOUT.hero.title}
            sub={ABOUT.hero.sub}
            actions={
              <div className="flex flex-wrap gap-3">
                <BlockButton href={CTA.contact} variant="brand">
                  Partner With Us
                </BlockButton>
                <BlockButton href={ROUTES.ai} variant="outline">
                  How We Integrate AI
                </BlockButton>
              </div>
            }
          />
          <ServiceAnswer question={ABOUT.answer.question} text={ABOUT.answer.text} />
          <SectionGap />
          <ReasonRows eyebrow="Why Infra8" title={ABOUT.reasons.title} items={ABOUT.reasons.items} />
          <SectionGap />
          <IconCells
            eyebrow="Commitments"
            title={"Four Commitments\non Every Project"}
            sub="What you can hold us to, whichever service you start with."
            items={ABOUT.commitments}
          />
          <SectionGap />
          <TeamGrid members={ABOUT.team} />
          <RelatedServices services={SERVICE_ORDER.map((k) => SERVICES[k])} eyebrow="What we do" title={"Three Ways\nto Work With Us"} />
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
