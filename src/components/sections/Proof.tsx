import { PROOF, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { ProofArt } from "@/components/illustrations/ProofArt";

export function Proof() {
  return (
    <section id="proof" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="See what you'll get {{before}} you pay"
          sub="Request a sample deliverable to see exactly what our work looks like, before you commit to anything."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-2 lg:p-2">
          {PROOF.map((p, i) => (
            <li key={p.key} className="flex">
              <Reveal delay={i * 0.12} className="flex w-full">
                <article className="group flex w-full flex-col gap-6 rounded-[16px] border border-line bg-white p-2 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-24px_rgba(6,84,254,0.25)]">
                  <div className="h-[212px] overflow-hidden rounded-[10px] bg-surface-2 p-3 transition-colors duration-500 group-hover:bg-[#f1f5ff]">
                    <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <ProofArt kind={p.key} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4">
                    <RevealText
                      as="h3"
                      text={p.title}
                      className="font-display text-2xl leading-7 tracking-[-0.03em] text-ink"
                    />
                    <RevealText
                      text={p.body}
                      className="text-base leading-6 tracking-[-0.02em] text-muted"
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <Button href={CTA.mvp} variant="secondary" full>
                      Request the sample
                    </Button>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
