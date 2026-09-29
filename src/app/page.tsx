import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { FlowTicker } from "@/components/sections/FlowTicker";
import { Stages } from "@/components/sections/Stages";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { ToolStack } from "@/components/sections/ToolStack";
import { Proof } from "@/components/sections/Proof";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Header />
      <main>
        <Hero />
        <ClientStrip />
        {/* Blueprint theme: everything below the strip sits in one railed column. */}
        <BlueprintColumn>
          <FlowTicker />
          <Stages />
          <SectionGap />
          <HowItWorks />
          <SectionGap />
          <AiWorkflow />
          <ToolStack />
          <SectionGap />
          <Proof />
          <SectionGap />
          <Testimonials />
          <SectionGap />
          <Faq />
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
