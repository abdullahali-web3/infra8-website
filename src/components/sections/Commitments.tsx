import { COMMITMENTS, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { CommitmentArt } from "@/components/illustrations/CommitmentArt";

export function Commitments() {
  return (
    <section id="commitments" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Our commitments</Eyebrow>
            <RevealText
              as="h2"
              text="Four commitments on every project"
              delay={0.05}
              className="font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] text-black sm:text-[44px] sm:leading-[48px]"
            />
            <RevealText
              text="Whether you're building a first MVP or handing us your cloud, these don't change."
              delay={0.15}
              className="max-w-[440px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-lg"
            />
            <div className="flex flex-col items-start gap-3">
              <Reveal delay={0.25}>
                <Button href={CTA.mvp}>Get MVP estimate</Button>
              </Reveal>
              <Reveal delay={0.32}>
                <Button href={CTA.audit} variant="secondary">
                  Free infra audit
                </Button>
              </Reveal>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <li key={c.key} className="flex">
                <Reveal delay={(i % 2) * 0.1} className="flex w-full">
                  <article className="group flex w-full flex-col gap-6 rounded-[16px] border border-line bg-white p-2 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-24px_rgba(6,84,254,0.25)]">
                    <div className="h-[168px] overflow-hidden rounded-[10px] bg-surface-2 p-3 transition-colors duration-500 group-hover:bg-[#f1f5ff]">
                      <CommitmentArt kind={c.key} />
                    </div>
                    <div className="flex flex-col gap-3 px-4 pb-5">
                      <span className="font-mono text-sm tracking-[-0.03em] text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <RevealText
                        as="h3"
                        text={c.title}
                        className="font-display text-2xl leading-7 tracking-[-0.03em] text-ink"
                      />
                      <RevealText
                        text={c.body}
                        className="text-base leading-6 tracking-[-0.02em] text-muted"
                      />
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
