import Image from "next/image";
import { STACK, CTA } from "@/lib/content";
import { logoSrc } from "@/lib/logos";
import { PillButton } from "@/components/ui/PillButton";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { ToolOrbits } from "@/components/illustrations/ToolOrbits";

/**
 * "Our stack": a dome of orbits with real tool logos travelling around it, a stats bar on the base
 * line, then the heading and the stack categories. The dome is decorative motion; the same tools are
 * also real text (logo alt text, the chips and the two "why" notes), so nothing depends on the animation.
 */
export function ToolStack() {
  return (
    <section id="stack" className="py-20 sm:py-28">
      <Container>
        <Reveal y={0}>
          <ToolOrbits />
        </Reveal>

        <div className="mt-12 lg:mt-4">
          <SectionHeading
            figma
            subClassName="sm:max-w-[600px]"
            eyebrow="Our stack"
            title="The Stack Behind What We Build {{and}} Run"
            sub="Mainstream, well-documented tools your next engineer already knows. No proprietary frameworks, no lock-in to us."
          />
        </div>

        <ul className="mx-auto mt-8 flex max-w-[760px] flex-wrap justify-center gap-2">
          {STACK.chips.map((c) => {
            const src = logoSrc(c.logo);
            return (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs leading-4 tracking-[-0.02em] text-ink-soft"
              >
                {src ? <Image src={src} alt="" width={14} height={14} unoptimized className="size-3.5 object-contain" /> : null}
                {c.label}
              </li>
            );
          })}
        </ul>

        <ul className="mx-auto mt-14 grid max-w-[960px] gap-[10px] sm:grid-cols-2">
          {STACK.why.map((w, i) => (
            <li key={w.label} className="flex">
              <Reveal delay={i * 0.08} className="flex w-full">
                <div className="flex w-full flex-col gap-3 rounded-[16px] bg-surface-2 p-6">
                  <span className="font-mono text-[14px] leading-6 tracking-[-0.03em] text-brand uppercase [text-box:trim-both_cap_alphabetic]">
                    {w.label}
                  </span>
                  <p className="text-base leading-6 tracking-[-0.02em] text-muted [text-box:trim-both_cap_alphabetic]">{w.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <RevealText
            text="Use a different stack? We'll work in yours."
            className="font-display text-2xl tracking-[-0.03em] text-ink"
          />
          <Reveal>
            <PillButton href={CTA.mvp} variant="secondary">
              Tell us your stack
            </PillButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
