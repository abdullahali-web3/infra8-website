import { STATS, TESTIMONIALS } from "@/lib/content";
import { BpSection, SectionHead, Tag } from "@/components/ui/Blueprint";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/Reveal";

/**
 * Stats and testimonials. The stats restate facts already on the page. The quotes are PLACEHOLDERS
 * (see TESTIMONIALS in content.ts) and carry a visible "Sample quote" tag until real ones replace them.
 */
export function Testimonials() {
  return (
    <BpSection id="testimonials">
      <SectionHead
        eyebrow="Testimonials"
        title={"What Founders Say\nAbout Working With Us"}
        sub="Founders and product teams on what it is like to build and run with a senior team."
      />

      <dl className="mt-12 grid grid-cols-2 border-t border-line lg:mt-16 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-3 border-line px-5 py-8 max-lg:even:border-l max-lg:nth-[n+3]:border-t sm:px-8 lg:px-10 lg:py-10 lg:not-first:border-l"
          >
            <dt className="order-2 max-w-[220px] text-sm leading-5 tracking-[-0.01em] text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-[40px] leading-none tracking-[-0.04em] text-ink sm:text-[56px]">
              {"prefix" in s ? s.prefix : null}
              <CountUp to={s.value} duration={1.2 + i * 0.15} />
              <span className="ml-1 text-[0.45em] tracking-[-0.02em] text-muted">{s.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="grid border-t border-line lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <li key={t.role} className="group/card relative flex border-line not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
            />
            <Reveal delay={i * 0.1} className="flex w-full">
              <figure className="flex w-full flex-col gap-8 px-6 py-8 lg:px-8 lg:py-10">
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden className="font-display text-[56px] leading-[0.6] text-brand/25 transition-colors duration-500 group-hover/card:text-brand">
                    &ldquo;
                  </span>
                  <Tag tone="warn">Sample quote</Tag>
                </div>
                <blockquote className="flex-1 font-display text-[20px] leading-[1.45] tracking-[-0.02em] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center bg-surface font-mono text-[12px] text-ink-soft">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[15px] leading-5 tracking-[-0.02em] text-ink">{t.name}</span>
                    <span className="font-mono text-[11px] leading-4 text-muted uppercase">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}
