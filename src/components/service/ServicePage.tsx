import { ROUTES } from "@/lib/content";
import { SERVICE_ORDER, SERVICES, type Service } from "@/lib/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { StageIso } from "@/components/illustrations/iso/StageIso";
import type { Crumb } from "./Breadcrumbs";
import { ServiceJsonLd } from "./ServiceJsonLd";
import {
  RelatedServices,
  ServiceAnswer,
  ServiceDeliverables,
  ServiceFit,
  ServiceHero,
  ServicePricing,
  ServiceProcess,
  ServiceStack,
} from "./ServiceSections";

/**
 * One service page (MVP development, product development, cloud/DevOps management), built from its
 * record in `src/lib/services.ts`. Order: answer first (AEO), then fit, deliverables, process,
 * tools, pricing model, FAQ, related services and the shared final CTA.
 */
export function ServicePage({ service }: { service: Service }) {
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: ROUTES.services },
    { name: service.name, href: service.path },
  ];
  const related = SERVICE_ORDER.filter((k) => k !== service.key).map((k) => SERVICES[k]);

  return (
    <>
      <ServiceJsonLd crumbs={crumbs} services={[{ ...service.schema, path: service.path }]} faq={service.faq} />
      <Header />
      <main>
        <BlueprintColumn>
          <ServiceHero
            crumbs={crumbs}
            title={service.hero.title}
            sub={service.hero.sub}
            cta={service.hero.cta}
            art={<StageIso stage={service.stage} />}
          />
          <ServiceAnswer question={service.answer.question} text={service.answer.text} />
          <SectionGap />
          <ServiceFit fit={service.fit} />
          <SectionGap />
          <ServiceDeliverables deliverables={service.deliverables} />
          <SectionGap />
          <ServiceProcess process={service.process} />
          <ServiceStack stack={service.stack} />
          <SectionGap />
          <ServicePricing pricing={service.pricing} cta={service.hero.cta} />
          <SectionGap />
          <Faq items={service.faq} title={service.faqTitle} sub="Straight answers on scope, ownership and what happens next." />
          <RelatedServices services={related} />
          <FinalCta explore={false} />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
