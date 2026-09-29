import type { ReactNode } from "react";
import { RevealText, type RevealTag } from "./RevealText";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
  trim = false,
}: {
  children: string;
  light?: boolean;
  trim?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-[7px] bg-accent" aria-hidden />
      <RevealText
        as="span"
        text={children}
        className={`font-mono text-xs leading-7 uppercase ${trim ? "[text-box:trim-both_cap_alphabetic]" : ""} ${light ? "text-white/80" : "text-ink-soft"}`}
      />
    </div>
  );
}

const TRIM = "[text-box:trim-both_cap_alphabetic]";

/**
 * `figma` opts a heading into the exact Figma treatment: text-box trim on every line
 * (so the 28px gaps are measured cap-to-baseline) and the 18px, non-balanced sub.
 * Sections that have not been matched to Figma yet keep the original look.
 *
 * On desktop the title is a single line holding the serif accent word. Figma's line box
 * grows for that font (35px tall against 31.5px in Chrome), which pushes the title's
 * baseline 3.5px lower inside the same 28px gaps, hence the top padding.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  as = "h2",
  align = "center",
  light = false,
  figma = false,
  subClassName,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  as?: RevealTag;
  align?: "center" | "left";
  light?: boolean;
  figma?: boolean;
  /** Replaces the default sub max-width, e.g. to pick where a two-line sub breaks. */
  subClassName?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-7 ${center ? "items-center text-center" : "items-start text-left"}`}
    >
      <Eyebrow light={light} trim={figma}>
        {eyebrow}
      </Eyebrow>
      <RevealText
        as={as}
        text={title}
        delay={0.05}
        accentClassName={
          light
            ? "font-serif-accent italic font-normal text-white/60 tracking-[-0.01em]"
            : undefined
        }
        className={`font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] sm:text-[44px] sm:leading-[48px] ${figma ? `${TRIM} lg:pt-[3.5px]` : ""} ${light ? "text-white" : "text-black"} ${center ? "max-w-[972px]" : "max-w-[820px]"}`}
      />
      {sub ? (
        <RevealText
          text={sub}
          delay={0.15}
          className={`leading-7 tracking-[-0.02em] ${
            figma ? `text-base sm:text-[18px] ${TRIM}` : "text-balance text-base"
          } ${light ? "text-white/80" : "text-ink-soft"} ${subClassName ?? (center ? "max-w-[722px]" : "max-w-[640px]")}`}
        />
      ) : null}
    </div>
  );
}

export function HatchBand() {
  return <div className="hatch h-5 w-full border-y border-line" aria-hidden />;
}
