import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, CircleCheck, CircleX } from "lucide-react";
import type { Service } from "@/lib/services";
import { Benefits } from "@/components/ui/Benefits";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BpSection, Eyebrow, HEADING_H1, SectionHead, SlashHeading } from "@/components/ui/Blueprint";
import { Logo } from "@/components/ui/Logo";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { ICONS } from "@/components/ui/icons";
import { IconTile } from "@/components/ui/IconTile";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";


/** Blue line that draws along the top of a hovered cell (cells carry `group/card`). */
function HoverLine() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
    />
  );
}

const CELL = "group/card relative border-line";

/** Page hero: breadcrumbs, H1, sub, two CTAs, the standing promises and an illustration. */
export function ServiceHero({
  crumbs,
  title,
  sub,
  cta,
  secondary = { label: "See How It Works", href: "#process" },
  art,
}: {
  crumbs: Crumb[];
  title: string;
  sub: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  art: ReactNode;
}) {
  return (
    <section id="top" className="relative overflow-hidden border-t border-line">
      <div
        className={`grid grid-cols-[minmax(0,1fr)] items-center gap-10 pt-10 pb-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:pt-14 lg:pb-20 ${BP_PAD}`}
      >
        <div className="flex flex-col gap-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-7">
            <RevealText as="h1" text={title} before="/" after="/" delay={0.1} className={HEADING_H1} />
            <RevealText
              text={sub}
              delay={0.3}
              className="max-w-[620px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
            />
          </div>
          <Reveal delay={0.4} className="flex flex-wrap items-center gap-3">
            <BlockButton href={cta.href} variant="brand">
              {cta.label}
            </BlockButton>
            <BlockButton href={secondary.href} variant="outline">
              {secondary.label}
            </BlockButton>
          </Reveal>
          <Reveal delay={0.5}>
            <Benefits />
          </Reveal>
        </div>
        <Reveal y={16} delay={0.2} className="group/card relative">
          <div
            aria-hidden
            className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_25%,transparent)]"
          />
          <div className="relative h-[280px] sm:h-[360px] lg:h-[400px]">{art}</div>
        </Reveal>
      </div>
    </section>
  );
}

/** AEO block: a question-shaped H2 and a direct 40–60 word answer, written to be quoted. */
export function ServiceAnswer({ question, text }: { question: string; text: string }) {
  return (
    <BpSection>
      <div className={`grid gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:pb-24 ${BP_PAD}`}>
        <div className="flex flex-col gap-5">
          <Eyebrow>In short</Eyebrow>
          <SlashHeading title={question} />
        </div>
        <RevealText
          text={text}
          delay={0.1}
          className="self-end font-display text-[20px] leading-[1.5] tracking-[-0.02em] text-ink sm:text-[24px]"
        />
      </div>
    </BpSection>
  );
}

/** Who it's for: three buyer profiles, then who it is not for. */
export function ServiceFit({ fit }: { fit: Service["fit"] }) {
  return (
    <BpSection>
      <SectionHead eyebrow="Who it's for" title={fit.title} />
      <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
        {fit.items.map((f, i) => (
          <li key={f.title} className={`${CELL} not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l`}>
            <HoverLine />
            <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
              <span className="font-mono text-[12px] leading-none text-muted transition-colors group-hover/card:text-brand">
                {`0${i + 1}`}
              </span>
              <h3 className="font-display text-[22px] leading-[1.2] tracking-[-0.03em] text-ink">{f.title}</h3>
              <p className="text-base leading-6 tracking-[-0.02em] text-muted">{f.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-line bg-surface-2 px-6 py-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        <span className="shrink-0 font-mono text-[12px] leading-none text-muted uppercase">Not a fit if</span>
        <ul className="flex flex-col gap-3 lg:flex-row lg:gap-10">
          {fit.notFit.map((n) => (
            <li key={n} className="flex items-start gap-2 text-[15px] leading-6 tracking-[-0.02em] text-ink-soft">
              <CircleX aria-hidden className="mt-[3px] size-[18px] shrink-0 text-muted" strokeWidth={1.75} />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </BpSection>
  );
}

/** What you get: six deliverables, each with its icon. */
export function ServiceDeliverables({ deliverables }: { deliverables: Service["deliverables"] }) {
  return (
    <BpSection>
      <SectionHead eyebrow="What you get" title={deliverables.title} sub={deliverables.sub} />
      <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {deliverables.items.map((d, i) => {
          return (
            <li
              key={d.title}
              className={`${CELL} max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:nth-[n+4]:border-t lg:not-nth-[3n+1]:border-l`}
            >
              <HoverLine />
              <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                <IconTile icon={ICONS[d.icon]} size="md" />
                <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{d.title}</h3>
                <p className="text-base leading-6 tracking-[-0.02em] text-muted">{d.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </BpSection>
  );
}

/** How it works: numbered steps joined by chevrons. */
export function ServiceProcess({ process }: { process: Service["process"] }) {
  return (
    <BpSection id="process">
      <SectionHead eyebrow="How it works" title={process.title} sub={process.sub} />
      <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {process.steps.map((s, i) => (
          <li
            key={s.title}
            className={`${CELL} max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l`}
          >
            <HoverLine />
            {i < process.steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute top-10 -right-3.5 z-10 hidden size-7 place-items-center border border-line bg-white text-muted lg:grid"
              >
                <ChevronRight className="size-4" strokeWidth={1.75} />
              </span>
            ) : null}
            <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
              <span className="font-display text-[40px] leading-none tracking-[-0.04em] text-line transition-colors duration-500 group-hover/card:text-brand">
                {`0${i + 1}`}
              </span>
              <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{s.title}</h3>
              <p className="text-base leading-6 tracking-[-0.02em] text-muted">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </BpSection>
  );
}

/** Tools for this service: logo tiles with names (real text, so the stack is readable without images). */
export function ServiceStack({ stack }: { stack: Service["stack"] }) {
  return (
    <BpSection>
      <SectionHead eyebrow="Tools" title={stack.title} sub={stack.sub} />
      {/* Each tile draws its right and bottom edge; the wrapper clips the outermost ones so they
          don't double up with the column rail and the next section's hairline. */}
      <div className="mt-12 overflow-hidden border-t border-line lg:mt-16">
        <ul className="-mr-px -mb-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {stack.tools.map((t) => (
            <li
              key={t}
              className="group/tool flex flex-col items-center justify-center gap-3 border-r border-b border-line px-3 py-7 transition-colors duration-300 hover:bg-surface-2"
            >
              <span className="transition-[translate] duration-300 group-hover/tool:-translate-y-0.5">
                <Logo name={t} size={30} />
              </span>
              <span className="font-mono text-[11px] leading-none text-ink-soft uppercase">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </BpSection>
  );
}

/** Pricing without numbers: how the price is set, what moves it, and how you pay. */
export function ServicePricing({ pricing, cta }: { pricing: Service["pricing"]; cta: { label: string; href: string } }) {
  return (
    <BpSection flush>
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-7 border-line px-5 py-16 sm:px-8 lg:border-r lg:px-12 lg:py-24">
          <Eyebrow>Pricing</Eyebrow>
          <SlashHeading title={pricing.question} />
          <RevealText text={pricing.text} delay={0.1} className="max-w-[560px] text-base leading-7 tracking-[-0.02em] text-ink-soft" />
          <p className="flex items-start gap-2 text-[15px] leading-6 tracking-[-0.02em] text-ink">
            <CircleCheck aria-hidden className="mt-[3px] size-[18px] shrink-0 text-ok" strokeWidth={2} />
            {pricing.terms}
          </p>
          {/* The minimum engagement: present, but quiet. */}
          <div className="flex max-w-[560px] flex-col gap-2 border-t border-line pt-6">
            <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-mono text-[12px] leading-none text-muted uppercase">Engagements start at</span>
              <span className="font-display text-[22px] leading-none tracking-[-0.03em] text-ink">{pricing.minimum.amount}</span>
              <span className="text-[15px] leading-none tracking-[-0.02em] text-muted">{pricing.minimum.unit}</span>
            </p>
            <p className="text-sm leading-5 tracking-[-0.01em] text-muted">{pricing.minimum.note}</p>
          </div>
        </div>
        <div className="dots flex items-center px-5 py-12 sm:px-8 lg:px-12">
          <Reveal y={16} className="w-full">
            <div className="border border-line bg-white">
              <p className="border-b border-line px-6 py-4 font-mono text-[12px] leading-none text-muted uppercase">
                What moves the price
              </p>
              <ul>
                {pricing.factors.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-line px-6 py-4 text-base leading-6 tracking-[-0.02em] text-ink not-first:border-t"
                  >
                    <span className="font-mono text-[12px] text-brand">{`0${i + 1}`}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-line sm:p-4">
                <BlockButton href={cta.href} variant="brand" full>
                  {cta.label}
                </BlockButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </BpSection>
  );
}

/** Links to the other services, so every page leads to the next stage ("build it, then run it"). */
export function RelatedServices({
  services,
  eyebrow = "Related services",
  title = "Build It,\nThen Run It",
}: {
  services: Pick<Service, "path" | "name" | "summary">[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <BpSection>
      <SectionHead eyebrow={eyebrow} title={title} />
      <ul className={`mt-12 grid border-t border-line lg:mt-16 ${services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        {services.map((s) => (
          <li key={s.path} className={`${CELL} not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l`}>
            <HoverLine />
            <Link href={s.path} className="flex h-full items-center justify-between gap-6 px-6 py-8 lg:px-8 lg:py-10">
              <span className="flex flex-col gap-2">
                <span className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors group-hover/card:text-brand">
                  {s.name}
                </span>
                <span className="text-base leading-6 tracking-[-0.02em] text-muted">{s.summary}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center border border-line transition-colors duration-300 group-hover/card:border-brand group-hover/card:bg-brand group-hover/card:text-white">
                <ChevronRight aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </BpSection>
  );
}
