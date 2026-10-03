import { CTA, ROUTES } from "@/lib/content";
import { AI_PAGE } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_ORDER, SERVICES } from "@/lib/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { ServiceJsonLd } from "@/components/service/ServiceJsonLd";
import { RelatedServices, ServiceAnswer } from "@/components/service/ServiceSections";
import { ConcernGrid, Guardrails, SplitTable, TwoLists } from "@/components/company/CompanySections";
import { AiGateIso } from "@/components/illustrations/iso/AiGateIso";

export const metadata = pageMetadata({ ...AI_PAGE.meta, path: ROUTES.ai });

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "About", href: ROUTES.about },
  { name: "How we integrate AI", href: ROUTES.ai },
];

export default function HowWeIntegrateAiPage() {
  return (
    <>
      <ServiceJsonLd crumbs={CRUMBS} services={[]} faq={AI_PAGE.faq} />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero
            crumbs={CRUMBS}
            title={AI_PAGE.hero.title}
            sub={AI_PAGE.hero.sub}
            actions={
              <div className="flex flex-wrap gap-3">
                <BlockButton href={CTA.contact} variant="brand">
                  Partner With Us
                </BlockButton>
                <BlockButton href="#guardrails" variant="outline">
                  See Our Guardrails
                </BlockButton>
              </div>
            }
            art={<AiGateIso />}
          />
          <ServiceAnswer question={AI_PAGE.answer.question} text={AI_PAGE.answer.text} />
          <SectionGap />
          <ConcernGrid
            eyebrow="Your concerns"
            title={"The Questions Teams Ask\nAbout AI and Their Data"}
            sub="Straight answers to what founders, CTOs and security teams ask before they let AI near their code."
            items={AI_PAGE.concerns}
          />
          <SectionGap />
          <TwoLists
            eyebrow="Where AI helps"
            title={"Where AI Speeds\nUp the Work"}
            sub="In both services, AI takes the repetitive first pass so senior engineers spend their time on decisions."
            lists={AI_PAGE.where}
          />
          <SplitTable
            eyebrow="Who does what"
            title={"What AI Does and\nWhat Engineers Do"}
            sub="AI drafts and flags. Engineers decide, approve and ship."
            head={AI_PAGE.split.head}
            rows={AI_PAGE.split.rows}
          />
          <SectionGap />
          <Guardrails
            id="guardrails"
            eyebrow="Guardrails"
            title={"The Guardrails We Keep\non Every Project"}
            sub="Speed only matters if you stay in control of your code, your data and your cloud."
            items={AI_PAGE.guardrails}
          />
          <SectionGap />
          <Faq items={AI_PAGE.faq} title={"Questions About\nAI at Infra8"} sub="Tools, security, cost and compliance." />
          <RelatedServices services={SERVICE_ORDER.map((k) => SERVICES[k])} eyebrow="Services" title={"Where This\nShows Up"} />
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
