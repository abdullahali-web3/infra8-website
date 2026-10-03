import { CTA, FAQ, ROUTES } from "@/lib/content";
import { SERVICE_ORDER, SERVICES, SERVICES_HUB } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { CtaIso } from "@/components/illustrations/iso/CtaIso";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { ServiceJsonLd } from "@/components/service/ServiceJsonLd";
import { ServiceAnswer, ServiceHero } from "@/components/service/ServiceSections";
import { CompareTable, ServiceCards } from "@/components/service/ServicesHub";

export const metadata = pageMetadata({ ...SERVICES_HUB.meta, path: ROUTES.services });

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: ROUTES.services },
];

export default function ServicesPage() {
  return (
    <>
      <ServiceJsonLd
        crumbs={CRUMBS}
        services={SERVICE_ORDER.map((k) => ({ ...SERVICES[k].schema, path: SERVICES[k].path }))}
        faq={FAQ}
      />
      <Header />
      <main>
        <BlueprintColumn>
          <ServiceHero
            crumbs={CRUMBS}
            title={SERVICES_HUB.hero.title}
            sub={SERVICES_HUB.hero.sub}
            cta={{ label: "Partner With Us", href: CTA.contact }}
            secondary={{ label: "Compare Services", href: "#compare" }}
            art={<CtaIso />}
          />
          <ServiceAnswer question={SERVICES_HUB.answer.question} text={SERVICES_HUB.answer.text} />
          <SectionGap />
          <ServiceCards />
          <SectionGap />
          <CompareTable />
          <SectionGap />
          <Faq />
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
