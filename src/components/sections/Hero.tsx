import { CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BlueprintColumn, BpSection } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { HeroIso } from "@/components/illustrations/iso/HeroIso";

/** Hero, blueprint theme: same Figma copy, set inside the railed column like every other section. */
export function Hero() {
  return (
    <BlueprintColumn>
      <BpSection id="top" index={0} label="Senior engineering team for startups and scaling products" className="pt-8 lg:pt-10">
        <div
          className={`grid grid-cols-[minmax(0,1fr)] items-center gap-6 pt-10 pb-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-4 lg:pt-12 lg:pb-16 ${BP_PAD}`}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-7">
              <RevealText
                as="h1"
                text="We Build MVPs for Founders {{and}} Run Dedicated DevOps, Cyber & Cloud Infra Management"
                before="/"
                after="/"
                delay={0.1}
                className="[text-box:trim-both_cap_alphabetic] font-display text-[36px] leading-[1.08] tracking-[-0.04em] text-black sm:text-[52px] sm:leading-[58px]"
              />
              <RevealText
                text="Founders, SMEs, & Startups hire Infra8 to provide end-to-end product development solutions and devOps/Cloud infrastructure management to scale and grow."
                delay={0.3}
                className="max-w-[640px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
              />
            </div>
            <Reveal delay={0.4} className="flex flex-wrap items-center gap-3">
              <BlockButton href={CTA.mvp} variant="brand">
                Let&rsquo;s Discuss Your Project
              </BlockButton>
              <BlockButton href={CTA.services} variant="outline">
                See Services
              </BlockButton>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_20%,transparent)]"
            />
            <div className="relative h-[300px] sm:h-[400px] lg:h-[440px]">
              <HeroIso />
            </div>
          </div>
        </div>
      </BpSection>
    </BlueprintColumn>
  );
}
