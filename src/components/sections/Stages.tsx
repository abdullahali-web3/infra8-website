import Link from "next/link";
import { STAGES } from "@/lib/content";
import { ChevronRight } from "lucide-react";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, SectionHead, Tag } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";
import { StageIso } from "@/components/illustrations/iso/StageIso";

/**
 * "Our services": three stage cells sharing hairlines. All three are neutral at rest; hovering one
 * gives it the blue treatment (top line, title, illustration and button).
 */
export function Stages() {
  return (
    <BpSection id="services">
      <SectionHead
        eyebrow="Our services"
        title={"Engineering for Every Stage\nof Your Product"}
        sub="Launch your MVP, grow it with a dedicated squad, or hand us your cloud and DevOps once you're live at scale."
      />

      <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
        {STAGES.map((s, i) => (
          <li
            key={s.key}
            className="group/card relative flex border-line not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
            />
            <Reveal delay={i * 0.1} className="flex w-full flex-col">
              <article className="flex h-full flex-col">
                <header className="flex flex-wrap items-center justify-between gap-3 px-6 pt-7 lg:px-8">
                  <span className="font-mono text-[12px] leading-none text-ink uppercase">{s.label}</span>
                  <span className="flex flex-wrap gap-1">
                    <Tag tone="warn">{s.chips[0]}</Tag>
                    <Tag tone="ok">{s.chips[1]}</Tag>
                  </span>
                </header>

                <div className="mx-6 mt-4 h-[230px] lg:mx-8">
                  <StageIso stage={s.key} />
                </div>

                <div className="flex flex-1 flex-col gap-4 px-6 pt-6 lg:px-8">
                  <h3 className="font-display text-[26px] leading-[1.15] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover/card:text-brand">
                    {s.title}
                  </h3>
                  <p className="text-base leading-6 tracking-[-0.02em] text-muted">{s.body}</p>
                </div>

                <div className="flex flex-col gap-4 px-6 pt-8 pb-7 lg:px-8">
                  <BlockButton href={s.primaryHref} variant="card" full>
                    {s.primary}
                  </BlockButton>
                  <Link
                    href={s.detailsHref}
                    className="group/link inline-flex items-center gap-2 self-start font-mono text-[12px] leading-none text-ink-soft uppercase transition-colors hover:text-brand"
                  >
                    View service details
                    <span aria-hidden className="transition-[translate] duration-300 group-hover/link:translate-x-1">
                      <ChevronRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}
