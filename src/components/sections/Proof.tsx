import { PROOF, CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, SectionHead, Tag } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";
import { DocIso } from "@/components/illustrations/iso/DocIso";

/** "Work": three sample deliverables, each drawn as an isometric document. */
export function Proof() {
  return (
    <BpSection id="proof">
      <SectionHead
        eyebrow="Work"
        title={"See What You'll Get\nBefore You Pay"}
        sub="Request a sample deliverable to see exactly what our work looks like, before you commit to anything."
      />

      <ul className="mt-12 grid border-t border-line md:grid-cols-3 lg:mt-16">
        {PROOF.map((p, i) => (
          <li key={p.key} className="group/card relative flex border-line max-md:not-first:border-t md:not-first:border-l">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
            />
            <Reveal delay={i * 0.1} className="flex w-full">
              <article className="flex w-full flex-col">
                <header className="flex items-center justify-end px-6 pt-6 lg:px-8">
                  <Tag tone="brand">Sample</Tag>
                </header>
                <div className="relative mx-6 mt-4 h-[220px]">
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
                  <BlockButton href={CTA.contact} variant="outline" full>
                    Request the Sample
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
