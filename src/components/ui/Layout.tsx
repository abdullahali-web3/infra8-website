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
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-[7px] bg-accent" aria-hidden />
      <RevealText
        as="span"
        text={children}
        className={`font-mono text-xs leading-7 uppercase ${light ? "text-white/80" : "text-ink-soft"}`}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  as = "h2",
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  as?: RevealTag;
  align?: "center" | "left";
  light?: boolean;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-7 ${center ? "items-center text-center" : "items-start text-left"}`}
    >
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <RevealText
        as={as}
        text={title}
        delay={0.05}
        accentClassName={
          light
            ? "font-serif-accent italic font-normal text-white/60 tracking-[-0.01em]"
            : undefined
        }
        className={`font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] sm:text-[44px] sm:leading-[48px] ${light ? "text-white" : "text-black"} ${center ? "max-w-[972px]" : "max-w-[820px]"}`}
      />
      {sub ? (
        <RevealText
          text={sub}
          delay={0.15}
          className={`text-balance text-base leading-7 tracking-[-0.02em] ${light ? "text-white/80" : "text-ink-soft"} ${center ? "max-w-[722px]" : "max-w-[640px]"}`}
        />
      ) : null}
    </div>
  );
}

export function HatchBand() {
  return <div className="hatch h-5 w-full border-y border-line" aria-hidden />;
}
