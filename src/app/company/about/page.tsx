import { ROUTES } from "@/lib/content";
import { ABOUT } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_ORDER, SERVICES } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, BpSection, Eyebrow, SectionGap, SlashHeading } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { RelatedServices, ServiceAnswer } from "@/components/service/ServiceSections";
import { IconCells, StoryBlock, TeamGrid } from "@/components/company/CompanySections";

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
                <BlockButton href="#get-started" variant="brand">
                  Get MVP Estimate in 24 Hours
                </BlockButton>
                <BlockButton href={ROUTES.ai} variant="outline">
                  How We Integrate AI
                </BlockButton>
              </div>
            }
          />
          <ServiceAnswer question={ABOUT.answer.question} text={ABOUT.answer.text} />
          <SectionGap />
          <StoryBlock eyebrow="Why Infra8" title={ABOUT.story.title} paragraphs={ABOUT.story.paragraphs} />
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
          <BpSection flush>
            <div className="dots flex flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-20">
              <div className="flex flex-col gap-5">
                <span className="bg-white px-1">
                  <Eyebrow>Careers</Eyebrow>
                </span>
                <span className="bg-white">
                  <SlashHeading title={"Want to Build and Run\nWith Us?"} />
                </span>
              </div>
              <BlockButton href={ROUTES.careers} variant="outline">
                See How We Hire
              </BlockButton>
            </div>
          </BpSection>
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
