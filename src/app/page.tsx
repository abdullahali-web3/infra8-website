import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { HatchBand } from "@/components/ui/Layout";
import { Hero } from "@/components/sections/Hero";
import { StackStrip } from "@/components/sections/StackStrip";
import { Stages } from "@/components/sections/Stages";
import { Commitments } from "@/components/sections/Commitments";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { ToolStack } from "@/components/sections/ToolStack";
import { Pricing } from "@/components/sections/Pricing";
import { Proof } from "@/components/sections/Proof";
import { Fit } from "@/components/sections/Fit";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Header />
      <main>
        <Hero />
        <StackStrip />
        <Stages />
        <HatchBand />
        <Commitments />
        <HowItWorks />
        <AiWorkflow />
        <ToolStack />
        <Pricing />
        <Proof />
        <Fit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
