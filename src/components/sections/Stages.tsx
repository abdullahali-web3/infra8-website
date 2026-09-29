import Image from "next/image";
import { STAGES } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/Reveal";

const TRIM = "[text-box:trim-both_cap_alphabetic]";

/** "Our services": three stage cards, built from Figma node 171:698. */
export function Stages() {
  return (
    <section id="services" className="py-20 sm:py-28 lg:pt-[100px] lg:pb-[60px]">
      <Container>
        <SectionHeading
          figma
          subClassName="sm:max-w-[520px]"
          eyebrow="Our services"
          title="Engineering For Every Stage {{of}} Your Product"
          sub="Launch your MVP, grow it with a dedicated squad, or hand us your cloud and DevOps once you're live at scale."
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-[10px] lg:p-2">
          {STAGES.map((s, i) => (
            // The featured (middle) card is 24px taller than its neighbours on desktop: negative
            // margins grow the frame 12px up and down, and the extra padding keeps its content
            // aligned with the other two cards.
            <li key={s.key} className={`flex ${s.featured ? "lg:-my-3" : ""}`}>
              <Reveal delay={i * 0.12} className="flex w-full">
                <article
                  className={`flex w-full flex-col gap-10 rounded-[16px] border border-transparent bg-surface-2 ${
                    s.featured ? "px-6 py-6 lg:py-9" : "p-6"
                  }`}
                >
                  <header className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
                    <div className="flex items-center" style={{ gap: s.iconGap }}>
                      <span
                        className="grid shrink-0 place-items-center"
                        style={{ width: s.iconBox, height: s.iconBox }}
                      >
                        <span className={`block ${s.imageClass}`}>
                          <Image
                            src={s.image}
                            alt=""
                            width={256}
                            height={256}
                            className="block max-w-none object-cover"
                            style={{ width: s.imageW, height: s.imageH }}
                          />
                        </span>
                      </span>
                      <span className="flex font-mono text-[14px] leading-6 tracking-[-0.03em] text-ink-soft uppercase">
                        <span className={TRIM}>{s.label}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-[14px] leading-6 tracking-[-0.03em] whitespace-nowrap">
                      <span className="flex rounded-lg bg-warn/10 p-2 text-warn">
                        <span className={TRIM}>{s.chips[0]}</span>
                      </span>
                      <span className="flex rounded-lg bg-ok/10 p-2 text-ok">
                        <span className={TRIM}>{s.chips[1]}</span>
                      </span>
                    </div>
                  </header>

                  <div className="flex flex-1 flex-col justify-between gap-8">
                    <div className="flex flex-col gap-6">
                      <h3
                        className={`font-display text-[28px] leading-[1.15] tracking-[-0.03em] text-ink ${TRIM}`}
                      >
                        {s.title}
                      </h3>
                      <p className={`text-base leading-6 tracking-[-0.02em] text-muted ${TRIM}`}>
                        {s.body}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <PillButton href={s.primaryHref} full>
                        {s.primary}
                      </PillButton>
                      <PillButton href={s.detailsHref} variant="white" full>
                        View Service Details
                      </PillButton>
                    </div>
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
