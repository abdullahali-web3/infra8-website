import { CTA } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { HeroLattice } from "@/components/illustrations/HeroLattice";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-12 sm:pt-16 lg:pt-[70px] lg:pb-[98px]">
      <div className="pointer-events-none absolute top-[-43px] right-0 hidden w-[771px] lg:block">
        <div className="pointer-events-auto">
          <HeroLattice />
        </div>
      </div>

      <Container className="relative">
        <div className="flex max-w-[757px] flex-col gap-10">
          <div className="flex flex-col gap-7">
            <Eyebrow trim>Senior engineering team for startups and scaling products</Eyebrow>
            <RevealText
              as="h1"
              text="We Build MVPs for Founders {{and}} Run Dedicated DevOps, Cyber & Cloud Infra Management"
              delay={0.1}
              className="max-w-[743px] [text-box:trim-both_cap_alphabetic] font-display text-[36px] leading-[1.08] tracking-[-0.04em] text-black sm:text-[52px] sm:leading-[56px]"
            />
            <RevealText
              text="Founders, SMEs, & Startups hire Infra8 to provide end-to-end product development solutions and devOps/Cloud infrastructure management to scale and grow."
              delay={0.3}
              className="max-w-[683px] [text-box:trim-both_cap_alphabetic] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
            />
          </div>

          <Reveal delay={0.4} className="flex flex-wrap items-center gap-3">
            <PillButton href={CTA.mvp}>Let&rsquo;s Discuss Your Project</PillButton>
            <PillButton href={CTA.services} variant="secondary">
              See Services
            </PillButton>
          </Reveal>
        </div>

        <div className="mt-12 -mr-10 lg:hidden">
          <Reveal y={0}>
            <HeroLattice />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
