import { PROOF, CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BpSection, SlashHeading, Tag } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { DocIso } from "@/components/illustrations/iso/DocIso";

/** "Work": three sample deliverables, each drawn as an isometric document. */
export function Proof() {
  return (
    <BpSection id="proof" index={5} label="Work">
      <div className={`mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-end lg:justify-between ${BP_PAD}`}>
        <SlashHeading title={"See what you'll get\n{{before}} you pay"} />
        <RevealText
          text="Request a sample deliverable to see exactly what our work looks like, before you commit to anything."
          delay={0.15}
          className="max-w-[400px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
        />
      </div>

      <ul className="mt-12 grid border-t border-line md:grid-cols-3 lg:mt-16">
        {PROOF.map((p, i) => (
          <li key={p.key} className="group/card flex border-line max-md:not-first:border-t md:not-first:border-l">
            <Reveal delay={i * 0.1} className="flex w-full">
              <article className="flex w-full flex-col">
                <header className="flex items-center justify-between px-6 pt-6">
                  <span className="font-mono text-[12px] leading-none text-muted">{`// 00${i + 1}`}</span>
                  <Tag tone="brand">Sample</Tag>
                </header>
                <div className="relative mx-6 mt-4 h-[220px]">
                  <div
                    aria-hidden
                    className="dots absolute inset-0 opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(closest-side,#000,transparent)] group-hover/card:opacity-100"
                  />
                  <div className="relative h-full">
                    <DocIso kind={p.key} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pt-6">
                  <h3 className="font-display text-[22px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover/card:text-brand">
                    {p.title}
                  </h3>
                  <p className="text-base leading-6 tracking-[-0.02em] text-muted">{p.body}</p>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <BlockButton href={CTA.mvp} variant="outline" full>
                    Request the sample
                  </BlockButton>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}
