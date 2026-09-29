import { CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { HeroLattice } from "@/components/illustrations/HeroLattice";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-12 sm:pt-16 lg:pt-[100px] lg:pb-[98px]">
      <div className="pointer-events-none absolute top-1/2 right-[-56px] hidden w-[771px] -translate-y-1/2 lg:block">
        <div className="pointer-events-auto">
          <HeroLattice />
        </div>
      </div>

      <Container className="relative">
        <div className="flex max-w-[743px] flex-col gap-10">
          <div className="flex flex-col gap-7">
            <Eyebrow>Senior engineering team for startups and scaling products</Eyebrow>
            <RevealText
              as="h1"
              text="We build MVPs {{for}} founders. We run the cloud {{for}} live products."
              delay={0.1}
              className="font-display text-[36px] leading-[1.08] tracking-[-0.04em] text-black sm:text-[52px] sm:leading-[56px]"
            />
            <RevealText
              text="Founders hire Infra8 to scope and ship a first version in weeks. Engineering teams hire us to take over cloud infrastructure, DevOps and security. Every project is fixed-scope, and you own all code and access."
              delay={0.3}
              className="max-w-[560px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-4">
              <Reveal delay={0.4} className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase text-muted">I&apos;m building an MVP</span>
                <Button href={CTA.mvp}>Get MVP estimate in 24 hrs</Button>
              </Reveal>
              <Reveal delay={0.5} className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase text-muted">I run a live product</span>
                <Button href={CTA.audit} variant="secondary">
                  Get a free infra audit
                </Button>
              </Reveal>
            </div>
            <RevealText
              as="span"
              text="Fixed scope · You own all code · NDA on request"
              delay={0.6}
              className="font-mono text-[11px] uppercase leading-6 text-muted"
            />
          </div>
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
