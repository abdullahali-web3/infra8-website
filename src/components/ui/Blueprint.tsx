import type { ReactNode } from "react";
import { RevealText } from "./RevealText";
import { ScrambleText } from "./ScrambleText";

/** Horizontal padding inside the railed column. Grids ignore it and run rail to rail. */
export const BP_PAD = "px-5 sm:px-8 lg:px-12";

/**
 * The blueprint frame: every section lives in one white column with hairline rails,
 * continuing the edges of the client strip. The gutters outside it carry a faint dot field from lg up.
 */
export function BlueprintColumn({ children }: { children: ReactNode }) {
  return (
    <div className="lg:dots">
      <div className="mx-auto w-full max-w-[1280px] bg-white lg:w-[calc(100%-160px)] lg:border-x lg:border-line">
        {children}
      </div>
    </div>
  );
}

/** Compact section label: a small blue square and a mono caption that decodes on first view. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] leading-none text-muted uppercase">
      <span aria-hidden className="size-1.5 bg-brand" />
      <ScrambleText text={children} />
    </span>
  );
}

/** Breathing room between two sections: an empty dotted band framed by hairlines. */
export function SectionGap() {
  return <div aria-hidden className="dots h-12 border-t border-line lg:h-20" />;
}

/** A section inside the column, separated from the one above by a single hairline. */
export function BpSection({
  id,
  children,
  flush = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  /** No top padding: for sections whose first child is a full-bleed panel or grid. */
  flush?: boolean;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line ${flush ? "" : "pt-16 lg:pt-24"} ${className}`}>
      {children}
    </section>
  );
}

/** Page H1 (hero of every page). */
export const HEADING_H1 =
  "[text-box:trim-both_cap_alphabetic] font-display text-[36px] leading-[1.08] tracking-[-0.04em] text-black sm:text-[52px] sm:leading-[58px]";

/** The one heading style for every H1/H2 on the page: two lines between light slashes. */
export const HEADING =
  "font-display text-[32px] leading-[1.12] tracking-[-0.04em] text-ink sm:text-[44px] sm:leading-[50px]";

export function SlashHeading({ title, className = "" }: { title: string; className?: string }) {
  return <RevealText as="h2" text={title} before="/" after="/" delay={0.05} className={`${HEADING} ${className}`} />;
}

/** Eyebrow + heading on the left, an optional sub or action on the right. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  aside,
  className = "",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 ${BP_PAD} ${className}`}>
      <div className="flex flex-col gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SlashHeading title={title} />
      </div>
      {sub ? (
        <RevealText
          text={sub}
          delay={0.15}
          className="max-w-[400px] text-base leading-7 tracking-[-0.02em] text-ink-soft lg:pb-1"
        />
      ) : null}
      {aside}
    </div>
  );
}

/** Mono tag like `■ IDEA PHASE`. */
export function Tag({ children, tone = "ink" }: { children: string; tone?: "ink" | "warn" | "ok" | "brand" }) {
  const dot = { ink: "bg-ink", warn: "bg-warn", ok: "bg-ok", brand: "bg-brand" }[tone];
  return (
    <span className="inline-flex h-6 items-center gap-1.5 bg-surface-2 px-2 font-mono text-[11px] leading-none tracking-[0.01em] whitespace-nowrap text-ink-soft uppercase">
      <span aria-hidden className={`size-1.5 ${dot}`} />
      {children}
    </span>
  );
}
