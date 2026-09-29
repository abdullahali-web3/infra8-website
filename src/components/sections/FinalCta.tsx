import { CircleCheck } from "lucide-react";
import { CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, Eyebrow, SlashHeading } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";
import { CtaIso } from "@/components/illustrations/iso/CtaIso";

const BENEFITS = ["Fixed scope", "You own everything", "NDA on request"] as const;

export function FinalCta() {
  return (
    <BpSection id="get-started" flush>
      <div>
        <div className="dots relative grid items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:px-12 lg:py-24">
          <div className="flex flex-col items-start gap-8 bg-white/0">
            <div className="flex flex-col items-start gap-5">
              <span className="bg-white px-1"><Eyebrow>Get started</Eyebrow></span>
              <SlashHeading title={"Tell Us Where Your Product Is.\nYou'll Hear Back in 24 Hours."} />
            </div>
            <Reveal delay={0.2} className="flex flex-wrap gap-3">
              <BlockButton href={CTA.mvp} variant="brand">
                Get MVP estimate
              </BlockButton>
              <BlockButton href={CTA.audit} variant="outline">
                Get a free infra audit
              </BlockButton>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 bg-white py-1 pr-2">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[15px] leading-5 tracking-[-0.02em] text-ink-soft">
                    <CircleCheck aria-hidden className="size-[18px] shrink-0 text-ok" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
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
