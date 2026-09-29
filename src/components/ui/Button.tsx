import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

// Corner-bracket buttons. Primary is filled; secondary is outlined grey.
const VARIANTS: Record<Variant, { body: string; tick: string }> = {
  primary: {
    body: "bg-brand text-white border-brand hover:bg-brand-deep hover:border-brand-deep",
    tick: "border-brand",
  },
  secondary: {
    body: "bg-white/60 text-ink border-[#cfcfcf] hover:border-[#9a9a9a] hover:bg-[#f6f6f6]",
    tick: "border-[#8c8c8c] group-hover:border-ink",
  },
  light: {
    body: "bg-white text-ink border-white hover:bg-[#eef3ff] hover:border-[#eef3ff]",
    tick: "border-white",
  },
  "ghost-light": {
    body: "bg-white/10 text-white border-white/35 hover:border-white/70 hover:bg-white/20",
    tick: "border-white",
  },
};

const TICK = "pointer-events-none absolute size-[9px] transition-all duration-300 ease-out";

export function Button({
  href,
  children,
  variant = "primary",
  full = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  full?: boolean;
  className?: string;
}) {
  const v = VARIANTS[variant];
  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center rounded-[3px] border px-6 py-2 text-center font-display text-[15px] leading-5 font-medium tracking-[-0.01em] transition-[background-color,border-color,box-shadow] duration-300 ease-out active:scale-[0.99] ${v.body} ${full ? "w-full" : ""} ${className}`}
    >
      <span className={`${TICK} ${v.tick} -top-[4px] -left-[4px] border-t-[1.5px] border-l-[1.5px] group-hover:-top-[6px] group-hover:-left-[6px]`} aria-hidden />
      <span className={`${TICK} ${v.tick} -top-[4px] -right-[4px] border-t-[1.5px] border-r-[1.5px] group-hover:-top-[6px] group-hover:-right-[6px]`} aria-hidden />
      <span className={`${TICK} ${v.tick} -bottom-[4px] -left-[4px] border-b-[1.5px] border-l-[1.5px] group-hover:-bottom-[6px] group-hover:-left-[6px]`} aria-hidden />
      <span className={`${TICK} ${v.tick} -right-[4px] -bottom-[4px] border-r-[1.5px] border-b-[1.5px] group-hover:-right-[6px] group-hover:-bottom-[6px]`} aria-hidden />
      <span className="relative">{children}</span>
    </a>
  );
}
