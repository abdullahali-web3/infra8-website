import Image from "next/image";
import { CircleCheck, ShieldCheck } from "lucide-react";
import type { ServiceIcon } from "@/lib/services";
import { BP_PAD, BpSection, Eyebrow, SectionHead, SlashHeading, Tag } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { ICONS } from "@/components/service/ServiceSections";

const HOVER_LINE =
  "absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100";

/** Heading on the left, a few paragraphs of story on the right. */
export function StoryBlock({ eyebrow, title, paragraphs }: { eyebrow: string; title: string; paragraphs: string[] }) {
  return (
    <BpSection>
      <div className={`grid gap-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:pb-24 ${BP_PAD}`}>
        <div className="flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SlashHeading title={title} />
        </div>
        <div className="flex flex-col gap-6">
          {paragraphs.map((p, i) => (
            <RevealText
              key={i}
              text={p}
              delay={0.08 * i}
              className={i === paragraphs.length - 1 ? "text-[19px] leading-8 tracking-[-0.02em] text-ink" : "text-[17px] leading-8 tracking-[-0.01em] text-ink-soft"}
            />
          ))}
        </div>
      </div>
    </BpSection>
  );
}

/** Four icon cells sharing hairlines (commitments, principles). */
export function IconCells({
  eyebrow,
  title,
  sub,
  items,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  items: { icon: ServiceIcon; title: string; body: string }[];
}) {
  return (
    <BpSection>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = ICONS[it.icon];
          return (
            <li
              key={it.title}
              className="group/card relative border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l"
            >
              <span aria-hidden className={HOVER_LINE} />
              <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                <span className="grid size-11 place-items-center border border-line text-brand transition-colors duration-300 group-hover/card:border-brand group-hover/card:bg-brand group-hover/card:text-white">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{it.title}</h3>
                <p className="text-base leading-6 tracking-[-0.02em] text-muted">{it.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </BpSection>
  );
}

/** Team grid. Every profile is a placeholder until the real team, photos and roles are supplied. */
export function TeamGrid({ members }: { members: { name: string; role: string }[] }) {
  return (
    <BpSection id="team">
      <SectionHead
        eyebrow="Team"
        title={"The People\nBehind the Work"}
        sub="Every project is staffed by senior engineers from this team. Full profiles and photos are on the way."
      />
      <div className="mt-12 overflow-hidden border-t border-line lg:mt-16">
        <ul className="-mr-px -mb-px grid grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <li key={`${m.role}-${i}`} className="group/card relative border-r border-b border-line">
              <span aria-hidden className={HOVER_LINE} />
              <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-col gap-4 p-4 sm:p-6 lg:p-8">
                <div className="relative aspect-[5/6] overflow-hidden border border-line">
                  <Image
                    src="/content/team/placeholder.svg"
                    alt={`Photo placeholder for ${m.role}`}
                    fill
                    unoptimized
                    className="object-cover transition-[scale] duration-700 ease-out group-hover/card:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3">
                    <Tag tone="warn">Placeholder</Tag>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{m.name}</h3>
                  <p className="font-mono text-[11px] leading-4 text-muted uppercase">{m.role}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </BpSection>
  );
}

/** Concerns as question and answer cells, two by two. */
export function ConcernGrid({ eyebrow, title, sub, items }: { eyebrow: string; title: string; sub?: string; items: { q: string; a: string }[] }) {
  return (
    <BpSection>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-2">
        {items.map((c, i) => (
          <li
            key={c.q}
            className="group/card relative border-line max-lg:not-first:border-t lg:nth-[n+3]:border-t lg:even:border-l"
          >
            <span aria-hidden className={HOVER_LINE} />
            <Reveal delay={(i % 2) * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
              <span className="font-mono text-[12px] leading-none text-muted transition-colors group-hover/card:text-brand">{`Q.0${i + 1}`}</span>
              <h3 className="font-display text-[22px] leading-[1.25] tracking-[-0.03em] text-ink">{c.q}</h3>
              <p className="flex gap-3 text-base leading-7 tracking-[-0.02em] text-ink-soft">
                <CircleCheck aria-hidden className="mt-[5px] size-[18px] shrink-0 text-ok" strokeWidth={2} />
                {c.a}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}

/** Two columns of bullet lists (e.g. development vs CloudOps). */
export function TwoLists({ eyebrow, title, sub, lists }: { eyebrow: string; title: string; sub?: string; lists: { title: string; items: string[] }[] }) {
  return (
    <BpSection>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-2">
        {lists.map((l, i) => (
          <div key={l.title} className="border-line px-6 py-8 max-lg:not-first:border-t lg:px-8 lg:py-10 lg:not-first:border-l">
            <Reveal delay={i * 0.08} className="flex flex-col gap-6">
              <h3 className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink">{l.title}</h3>
              <ul className="flex flex-col">
                {l.items.map((it) => {
                  const [head, ...rest] = it.split(": ");
                  return (
                    <li key={it} className="flex gap-4 border-line py-4 text-base leading-7 tracking-[-0.02em] text-ink-soft not-first:border-t first:pt-0">
                      <span aria-hidden className="mt-[10px] size-2 shrink-0 bg-brand" />
                      <span>
                        {rest.length ? <span className="text-ink">{head}: </span> : null}
                        {rest.length ? rest.join(": ") : head}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </BpSection>
  );
}

/** A plain comparison table (real <table> for answer engines). */
export function SplitTable({ eyebrow, title, sub, head, rows }: { eyebrow: string; title: string; sub?: string; head: string[]; rows: string[][] }) {
  return (
    <BpSection>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="mt-12 overflow-x-auto border-t border-line lg:mt-16">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h} scope="col" className={`border-b border-line px-6 py-4 font-mono text-[12px] font-normal text-muted uppercase lg:px-8 ${i ? "border-l" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="transition-colors last:[&>*]:border-b-0 hover:bg-surface-2">
                <th scope="row" className="border-b border-line px-6 py-5 align-top font-display text-[18px] leading-6 font-normal tracking-[-0.02em] text-ink lg:px-8">
                  {r[0]}
                </th>
                {r.slice(1).map((c, i) => (
                  <td key={i} className="border-b border-l border-line px-6 py-5 align-top text-[15px] leading-6 tracking-[-0.02em] text-ink-soft lg:px-8">
                    {c}
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

/** Guardrails: six shield items in a 3×2 grid. */
export function Guardrails({ id, eyebrow, title, sub, items }: { id?: string; eyebrow: string; title: string; sub?: string; items: { title: string; body: string }[] }) {
  return (
    <BpSection id={id}>
      <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
      <div className="mt-12 overflow-hidden border-t border-line lg:mt-16">
        <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <li key={g.title} className="group/card relative border-r border-b border-line">
              <span aria-hidden className={HOVER_LINE} />
              <Reveal delay={(i % 3) * 0.08} className="flex h-full gap-4 px-6 py-8 lg:px-8">
                <ShieldCheck aria-hidden className="mt-0.5 size-6 shrink-0 text-brand" strokeWidth={1.5} />
                <span className="flex flex-col gap-2">
                  <h3 className="font-display text-[19px] leading-[1.3] tracking-[-0.03em] text-ink">{g.title}</h3>
                  <p className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{g.body}</p>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </BpSection>
  );
}
