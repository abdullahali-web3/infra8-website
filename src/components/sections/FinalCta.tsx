import { CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, CornerTicks, SlashHeading } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { CtaIso } from "@/components/illustrations/iso/CtaIso";

export function FinalCta() {
  return (
    <BpSection id="get-started" index={8} label="Get started">
      <div className="mt-10 border-t border-line lg:mt-12">
        <div className="dots relative grid items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:px-12 lg:py-20">
          <CornerTicks />
          <div className="flex flex-col items-start gap-8 bg-white/0">
            <div className="bg-white">
              <SlashHeading title={"Tell us where your product is.\nYou'll hear back in 24 hours."} />
            </div>
            <Reveal delay={0.2} className="flex flex-wrap gap-3">
              <BlockButton href={CTA.mvp} variant="brand">
                Get MVP estimate
              </BlockButton>
              <BlockButton href={CTA.audit} variant="outline">
                Get a free infra audit
              </BlockButton>
            </Reveal>
            <RevealText
              as="span"
              text="Fixed scope · You own everything · NDA on request"
              delay={0.3}
              className="bg-white font-mono text-[12px] leading-6 text-muted uppercase"
            />
          </div>
          <Reveal y={16} className="mx-auto w-full max-w-[520px]">
            <div className="h-[300px] sm:h-[340px]">
              <CtaIso />
            </div>
          </Reveal>
        </div>
      </div>
    </BpSection>
  );
}
