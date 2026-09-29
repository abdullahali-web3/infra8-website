import Image from "next/image";
import { STAGES } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-brand" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
      <path d="M5 8.2l2.1 2.1L11 6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stages() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our services"
          title="Engineering for every stage {{of}} your product"
          sub="Launch your MVP, grow it with a dedicated squad, or hand us your cloud and DevOps once you're live at scale."
        />
        <ul className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-2 lg:p-2">
          {STAGES.map((s, i) => (
            <li key={s.key} className="flex">
              <Reveal delay={i * 0.12} className="flex w-full">
                <article className="group flex w-full flex-col gap-10 rounded-[16px] border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-24px_rgba(6,84,254,0.28)]">
                  <header className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                      <span className="grid size-[38px] place-items-center transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                        <span className={`block ${s.imageClass}`}>
                          <Image
                            src={s.image}
                            alt=""
                            width={s.imageSize}
                            height={s.imageSize}
                            className="size-7 object-cover"
                          />
                        </span>
                      </span>
                      <span className="font-mono text-sm tracking-[-0.03em] text-ink-soft uppercase">
                        {s.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="rounded-lg bg-warn/10 px-2 py-2 text-sm leading-6 tracking-[-0.03em] text-warn">
                        {s.chips[0]}
                      </span>
                      <span className="rounded-lg bg-ok/10 px-2 py-2 text-sm leading-6 tracking-[-0.03em] text-ok">
                        {s.chips[1]}
                      </span>
                    </div>
                  </header>

                  <div className="flex flex-1 flex-col gap-6">
                    <RevealText
                      as="h3"
                      text={s.title}
                      className="font-display text-[28px] leading-7 tracking-[-0.03em] text-ink"
                    />
                    <RevealText
                      text={s.body}
                      className="text-base leading-6 tracking-[-0.02em] text-muted"
                    />
                    <ul className="flex flex-col gap-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm leading-6 tracking-[-0.02em] text-ink-soft">
                          <Check />
                          <RevealText as="span" text={b} />
                        </li>
                      ))}
                    </ul>
                    <RevealText
                      as="span"
                      text={s.price}
                      className="mt-auto font-mono text-xs uppercase leading-5 text-ink"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button href={s.primaryHref} full>
                      {s.primary}
                    </Button>
                    <Button href={s.secondaryHref} variant="secondary" full>
                      {s.secondary}
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
