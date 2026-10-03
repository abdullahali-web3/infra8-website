import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// "card" is ink at rest and turns brand blue while its `group/card` parent is hovered.
type Variant = "ink" | "brand" | "outline" | "card";

// Blueprint button: square corners, a small square marker and a mono caps label.
// Hover: a second colour wipes in from the left and leaves to the right, and the marker turns
// into a diamond. The group is named so a hovered card never triggers the button.
const VARIANTS: Record<Variant, { body: string; wipe: string; mark: string; hover: string }> = {
  ink: { body: "bg-ink text-white", wipe: "bg-brand", mark: "bg-white", hover: "" },
  brand: { body: "bg-brand text-white", wipe: "bg-ink", mark: "bg-white", hover: "" },
  card: {
    body: "bg-ink text-white transition-colors duration-500 group-hover/card:bg-brand",
    wipe: "bg-brand-deep",
    mark: "bg-white",
    hover: "",
  },
  outline: {
    body: "bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-line)]",
    wipe: "bg-ink",
    mark: "bg-ink group-hover/blk:bg-white group-focus-visible/blk:bg-white",
    hover: "group-hover/blk:text-white group-focus-visible/blk:text-white",
  },
};

export function BlockButton({
  href,
  children,
  variant = "ink",
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
  // Internal pages go through next/link (client-side navigation); #anchors and external URLs stay <a>.
  const Tag = href.startsWith("/") ? Link : "a";
  return (
    <Tag
      href={href}
      className={`group/blk relative isolate inline-flex h-11 items-center gap-3 overflow-hidden px-4 font-mono text-[12px] leading-none tracking-[0.01em] uppercase ${
        full ? "w-full justify-between" : "justify-center whitespace-nowrap"
      } ${v.body} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-right scale-x-0 transition-[scale] duration-500 ease-out group-hover/blk:origin-left group-hover/blk:scale-x-100 group-focus-visible/blk:origin-left group-focus-visible/blk:scale-x-100 motion-reduce:transition-none ${v.wipe}`}
      />
      <span className="flex items-center gap-3">
        <span
          aria-hidden
          className={`size-2 shrink-0 transition-[rotate,background-color] duration-300 group-hover/blk:rotate-45 group-focus-visible/blk:rotate-45 ${v.mark}`}
        />
        <span className={`[text-box:trim-both_cap_alphabetic] transition-colors duration-300 ${v.hover}`}>{children}</span>
      </span>
      {full ? (
        <span aria-hidden className={`transition-[translate,color] duration-300 group-hover/blk:translate-x-0.5 ${v.hover}`}>
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </span>
      ) : null}
    </Tag>
  );
}
