import { FIT } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok/10 text-ok">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
        <path d="M3.5 8.4l3 3 6-6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : (
    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-black/5 text-muted">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Fit() {
  return (
    <section id="fit" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="We're selective {{so}} the work is good"
          sub="A clear fit makes for a better project. Here is when we are, and aren't, the right team."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="group h-full rounded-[20px] border border-line bg-white p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ok/40 hover:shadow-[0_24px_48px_-28px_rgba(0,201,30,0.3)]">
              <RevealText as="h3" text="We're a good fit if..." className="font-display text-[28px] leading-8 tracking-[-0.03em] text-ink" />
              <ul className="mt-8 flex flex-col gap-5">
                {FIT.yes.map((t) => (
                  <li key={t} className="flex gap-3 text-base leading-6 tracking-[-0.02em] text-ink-soft">
                    <Mark yes />
                    <RevealText as="span" text={t} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group h-full rounded-[20px] border border-line bg-surface-2 p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_24px_48px_-28px_rgba(17,17,17,0.25)]">
              <RevealText as="h3" text="We're not a fit if..." className="font-display text-[28px] leading-8 tracking-[-0.03em] text-ink" />
              <ul className="mt-8 flex flex-col gap-5">
                {FIT.no.map((t) => (
                  <li key={t} className="flex gap-3 text-base leading-6 tracking-[-0.02em] text-muted">
                    <Mark yes={false} />
                    <RevealText as="span" text={t} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
