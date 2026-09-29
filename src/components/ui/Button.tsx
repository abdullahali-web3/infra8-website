import Image from "next/image";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-[#fafafa] hover:bg-brand-deep hover:shadow-[0_10px_28px_-10px_rgba(6,84,254,0.7)]",
  secondary: "bg-surface text-ink hover:bg-[#e5e5e5]",
  light: "bg-white text-ink hover:bg-[#f1f5ff]",
  "ghost-light":
    "bg-white/15 text-white ring-1 ring-inset ring-white/30 hover:bg-white/25",
};

export function ArrowChip({ tint = false }: { tint?: boolean }) {
  return (
    <span
      className={`grid size-8 shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-300 ease-out group-hover:scale-110 ${tint ? "bg-[#dfe8ff]" : "bg-white"}`}
    >
      <span className="relative block size-4">
        <Image
          src="/content/icons/chevron-right.svg"
          alt=""
          width={16}
          height={16}
          unoptimized
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
        />
      </span>
    </span>
  );
}

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
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 text-left font-mono text-[15px] leading-5 tracking-[-0.03em] uppercase transition-[background-color,box-shadow,transform] duration-300 ease-out active:scale-[0.98] sm:text-base ${VARIANTS[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowChip tint={variant === "light"} />
    </a>
  );
}
