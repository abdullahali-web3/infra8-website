import { ChevronRight } from "lucide-react";
import { BlockButtonBody, blockButtonClass } from "@/components/ui/BlockButton";
import Link from "next/link";
import { SERVICE_ORDER, SERVICES, SERVICES_HUB } from "@/lib/services";
import { STAGES } from "@/lib/content";
import { BpSection, SectionHead, Tag } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";
import { StageIso } from "@/components/illustrations/iso/StageIso";

/** /services: one cell per service, each linking to its page. Chips come from the homepage stages. */
export function ServiceCards() {
  return (
    <BpSection id="all-services">
      <SectionHead
        eyebrow="Our services"
        title={"Engineering for Every Stage\nof Your Product"}
        sub="Pick the stage you're at. Each service can hand over to the next, with the same team."
      />
      <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
        {SERVICE_ORDER.map((k, i) => {
          const s = SERVICES[k];
          const stage = STAGES.find((st) => st.key === s.stage);
          return (
            <li
              key={k}
              className="group/card relative flex border-line not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
              />
              <Reveal delay={i * 0.1} className="flex w-full">
                <Link href={s.path} className="flex w-full flex-col">
                  <span className="flex flex-wrap items-center justify-between gap-3 px-6 pt-7 lg:px-8">
                    <span className="font-mono text-[12px] leading-none text-ink uppercase">{stage?.label}</span>
                    {stage ? (
                      <span className="flex flex-wrap gap-1">
                        <Tag tone="warn">{stage.chips[0]}</Tag>
                        <Tag tone="ok">{stage.chips[1]}</Tag>
                      </span>
                    ) : null}
                  </span>
                  <span className="mx-6 mt-4 block h-[220px] lg:mx-8">
                    <StageIso stage={s.stage} />
                  </span>
                  <span className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-8 lg:px-8">
                    <span className="font-display text-[26px] leading-[1.15] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover/card:text-brand">
                      {s.name}
                    </span>
                    <span className="text-base leading-6 tracking-[-0.02em] text-muted">{s.summary}</span>
                    {/* Styled as the outline button; the whole card is the link, so it can't be a nested <a>. */}
                    <span className="mt-auto pt-4">
                      <span className={blockButtonClass({ variant: "outline", full: true })}>
                        <BlockButtonBody variant="outline">Explore {s.name}</BlockButtonBody>
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </BpSection>
  );
}

/** Side-by-side comparison as a real <table> (answer engines read tables well). */
export function CompareTable() {
  const cols = SERVICE_ORDER.map((k) => SERVICES[k]);
  return (
    <BpSection id="compare">
      <SectionHead
        eyebrow="Compare"
        title={"Which Service\nFits Your Stage?"}
        sub="The same senior team behind all three. What changes is where your product is today."
      />
      <div className="mt-12 overflow-x-auto border-t border-line lg:mt-16">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Infra8 services compared by fit, stage, starting point, billing and outcome</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[18%] border-b border-line px-6 py-5 font-mono text-[12px] font-normal text-muted uppercase lg:px-8">
                Service
              </th>
              {cols.map((s) => (
                <th key={s.key} scope="col" className="border-b border-l border-line px-6 py-5 font-normal lg:px-8">
                  <Link
                    href={s.path}
                    className="group/th inline-flex items-center gap-2 font-display text-[20px] leading-6 tracking-[-0.03em] text-ink transition-colors hover:text-brand"
                  >
                    {s.name}
                    <ChevronRight aria-hidden className="size-4 transition-[translate] group-hover/th:translate-x-0.5" strokeWidth={1.75} />
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES_HUB.compare.map((row) => (
              <tr key={row.label} className="transition-colors last:[&>*]:border-b-0 hover:bg-surface-2">
                <th scope="row" className="border-b border-line px-6 py-5 align-top font-mono text-[12px] font-normal text-muted uppercase lg:px-8">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="border-b border-l border-line px-6 py-5 align-top text-[15px] leading-6 tracking-[-0.02em] text-ink-soft lg:px-8">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BpSection>
  );
}
