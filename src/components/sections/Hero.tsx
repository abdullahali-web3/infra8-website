import { CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BlueprintColumn, Eyebrow } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { HeroLattice } from "@/components/illustrations/HeroLattice";

/**
 * Hero: Figma copy, set inside the railed column. The tile lattice (Figma node 115:32214) sits on the
 * right and bleeds to the rail, as the Figma frame bleeds to the page edge.
 */
export function Hero() {
  return (
    <BlueprintColumn>
      <section id="top" className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute top-1/2 right-0 hidden w-[55%] max-w-[771px] -translate-y-1/2 xl:block min-[1400px]:w-[60%]">
          <div className="pointer-events-auto">
            <HeroLattice />
          </div>
        </div>

        <div className={`relative pt-12 pb-6 lg:pt-24 xl:pb-24 ${BP_PAD}`}>
          <div className="flex max-w-[680px] flex-col gap-10">
            <div className="flex flex-col gap-7">
              <Eyebrow>Senior engineering team for startups and scaling products</Eyebrow>
              <RevealText
                as="h1"
                text="We Build MVPs for Founders and Run Dedicated DevOps, Cyber & Cloud Infra Management"
                before="/"
                after="/"
                delay={0.1}
                className="[text-box:trim-both_cap_alphabetic] font-display text-[36px] leading-[1.08] tracking-[-0.04em] text-black sm:text-[52px] sm:leading-[58px]"
              />
              <RevealText
                text="Founders, SMEs, & Startups hire Infra8 to provide end-to-end product development solutions and devOps/Cloud infrastructure management to scale and grow."
                delay={0.3}
                className="max-w-[600px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
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

          {/* Below xl the lattice sits under the copy. Its artboard has empty bands above and below the
              tiles (Figma keeps them for the bleed), so negative margins trim them. */}
          <div className="-mt-[6%] -mb-[10%] -ml-[18%] -mr-5 sm:-mr-8 md:ml-auto md:max-w-[720px] lg:-mr-12 xl:hidden">
            <HeroLattice />
          </div>
        </div>
      </section>
    </BlueprintColumn>
  );
}
