import type { ReactNode } from "react";
import { RevealText } from "./RevealText";
import { ScrambleText } from "./ScrambleText";

/** Horizontal padding inside the railed column. Grids ignore it and run rail to rail. */
export const BP_PAD = "px-5 sm:px-8 lg:px-10";

/**
 * The blueprint frame: every section below the client strip lives in one white column with
 * hairline rails, continuing the edges of the strip's hatch panels. The gutters outside it
 * carry a dot field from lg up.
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

/** A small "+" registration mark centred on a rail/border crossing. */
export function Cross({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 hidden size-[11px] lg:block ${className}`}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/35" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-ink/35" />
    </span>
  );
}

/** Corner brackets drawn just inside a panel (the reference's framed code/illustration panels). */
export function CornerTicks({ className = "border-ink/30" }: { className?: string }) {
  const base = `pointer-events-none absolute size-2.5 ${className}`;
  return (
    <>
      <span aria-hidden className={`${base} top-2 left-2 border-t border-l`} />
      <span aria-hidden className={`${base} top-2 right-2 border-t border-r`} />
      <span aria-hidden className={`${base} bottom-2 left-2 border-b border-l`} />
      <span aria-hidden className={`${base} right-2 bottom-2 border-r border-b`} />
    </>
  );
}

export const SECTION_COUNT = 8;

/** `[ N.01/08 ] —— > OUR SERVICES ————————` */
export function IndexRow({ index, label }: { index: number; label: string }) {
  const n = String(index).padStart(2, "0");
  const total = String(SECTION_COUNT).padStart(2, "0");
  return (
    <div className={`flex items-center gap-3 font-mono text-[12px] leading-none uppercase ${BP_PAD}`}>
      <ScrambleText text={`[ N.${n}/${total} ]`} className="shrink-0 text-muted" />
      <span aria-hidden className="w-8 shrink-0 border-t border-dashed border-ink/30" />
      <ScrambleText text={`> ${label}`} className="shrink-0 text-ink" />
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

/** A section inside the column: top hairline with registration marks, then the index row. */
export function BpSection({
  id,
  index,
  label,
  children,
  className = "",
}: {
  id?: string;
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative border-t border-line pt-10 lg:pt-14 ${className}`}>
      <Cross className="-top-[6px] -left-[6px]" />
      <Cross className="-top-[6px] -right-[6px]" />
      <IndexRow index={index} label={label} />
      {children}
    </section>
  );
}

/** Two-line heading set between light slashes: `/ Line one.↵Line two. /` */
export function SlashHeading({
  title,
  className = "",
  as = "h2",
}: {
  title: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <RevealText
      as={as}
      text={title}
      before="/"
      after="/"
      delay={0.05}
      className={`font-display text-[32px] leading-[1.12] tracking-[-0.04em] text-ink sm:text-[44px] sm:leading-[50px] ${className}`}
    />
  );
}

/** Mono tag like `■ IDEA PHASE`. */
export function Tag({ children, tone = "ink" }: { children: string; tone?: "ink" | "warn" | "ok" | "brand" }) {
  const dot = { ink: "bg-ink", warn: "bg-warn", ok: "bg-ok", brand: "bg-brand" }[tone];
  return (
    <span className="inline-flex h-6 items-center gap-1.5 border border-line bg-white px-2 font-mono text-[11px] leading-none tracking-[0.01em] whitespace-nowrap text-ink-soft uppercase">
      <span aria-hidden className={`size-1.5 ${dot}`} />
      {children}
    </span>
  );
}
