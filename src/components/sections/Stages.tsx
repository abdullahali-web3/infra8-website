import { STAGES } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BpSection, SlashHeading, Tag } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { StageIso } from "@/components/illustrations/iso/StageIso";

/** "Our services": three stage cells sharing hairlines, each with an isometric scene. */
export function Stages() {
  return (
    <BpSection id="services" index={1} label="Our services">
      <div className={`mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-end lg:justify-between ${BP_PAD}`}>
        <SlashHeading title={"Engineering For Every Stage\n{{of}} Your Product"} />
        <RevealText
          text="Launch your MVP, grow it with a dedicated squad, or hand us your cloud and DevOps once you're live at scale."
          delay={0.15}
          className="max-w-[400px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
        />
      </div>

      <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
        {STAGES.map((s, i) => (
          <li
            key={s.key}
            className="group/card relative flex border-line not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l"
          >
            {s.featured ? <span aria-hidden className="absolute inset-x-0 -top-px z-10 h-0.5 bg-brand" /> : null}
            <Reveal delay={i * 0.1} className="flex w-full flex-col">
              <article className="flex h-full flex-col">
                <header className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
                  <span className="flex items-center gap-3 font-mono text-[12px] leading-none uppercase">
                    <span className={s.featured ? "text-brand" : "text-muted"}>{`// 00${i + 1}`}</span>
                    <span className="text-ink">{s.label}</span>
                  </span>
                  <span className="flex flex-wrap gap-1">
                    <Tag tone="warn">{s.chips[0]}</Tag>
                    <Tag tone="ok">{s.chips[1]}</Tag>
                  </span>
                </header>

                <div className="relative mx-6 mt-6 h-[230px]">
                  <div
                    aria-hidden
                    className="dots absolute inset-0 opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(closest-side,#000,transparent)] group-hover/card:opacity-100"
                  />
                  <div className="relative h-full">
                    <StageIso stage={s.key} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 px-6 pt-6">
                  <h3
                    className={`font-display text-[26px] leading-[1.15] tracking-[-0.03em] transition-colors duration-300 ${
                      s.featured ? "text-brand" : "text-ink group-hover/card:text-brand"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-base leading-6 tracking-[-0.02em] text-muted">{s.body}</p>
                </div>

                <div className="flex flex-col gap-4 px-6 pt-8 pb-6">
                  <BlockButton href={s.primaryHref} variant={s.featured ? "brand" : "ink"} full>
                    {s.primary}
                  </BlockButton>
                  <a
                    href={s.detailsHref}
                    className="group/link inline-flex items-center gap-2 self-start font-mono text-[12px] leading-none text-ink-soft uppercase transition-colors hover:text-brand"
                  >
                    View service details
                    <span aria-hidden className="transition-[translate] duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}
