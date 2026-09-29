import { CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { FinalArt } from "@/components/illustrations/FinalArt";

export function FinalCta() {
  return (
    <section id="get-started" className="pb-20 sm:pb-28">
      <Container>
        <Reveal y={32}>
          <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 7px)",
                maskImage: "linear-gradient(90deg, transparent 30%, #000 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 30%, #000 100%)",
              }}
              aria-hidden
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="flex flex-col gap-7">
                <Eyebrow light>Get started</Eyebrow>
                <RevealText
                  as="h2"
                  text="Tell us where your product is. You'll hear back in 24 hours."
                  delay={0.05}
                  accentClassName="font-serif-accent italic font-extralight text-white/60 tracking-[-0.01em]"
                  className="font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] text-white sm:text-[48px] sm:leading-[52px]"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Reveal delay={0.2}>
                    <Button href={CTA.mvp} variant="light">
                      Get MVP estimate
                    </Button>
                  </Reveal>
                  <Reveal delay={0.28}>
                    <Button href={CTA.audit} variant="ghost-light">
                      Get a free infra audit
                    </Button>
                  </Reveal>
                </div>
                <RevealText
                  as="span"
                  text="Fixed scope · You own everything · NDA on request"
                  delay={0.35}
                  className="font-mono text-xs uppercase leading-6 text-white/75"
                />
              </div>
              <div className="mx-auto w-full max-w-[480px]">
                <FinalArt />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
