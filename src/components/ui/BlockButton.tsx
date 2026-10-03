import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// "card" is ink at rest and turns brand blue while its `group/card` parent is hovered.
type Variant = "ink" | "brand" | "outline" | "card";

// Blueprint button: square corners, a medium-weight sans label and an arrow cell split off by a
// hairline. Hover: a second colour wipes in from the left and leaves to the right, and the arrow
// slides out while a new one slides in. The group is named so a hovered card never triggers it.
const VARIANTS: Record<Variant, { body: string; wipe: string; divider: string }> = {
  ink: { body: "bg-ink text-white", wipe: "bg-brand", divider: "border-white/15" },
  brand: { body: "bg-brand text-white", wipe: "bg-ink", divider: "border-white/20" },
  card: {
    body: "bg-ink text-white transition-colors duration-500 group-hover/card:bg-brand",
    wipe: "bg-brand-deep",
    divider: "border-white/15",
  },
  outline: {
    body: "bg-white text-ink shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-ink)_20%,transparent)] transition-colors duration-300 hover:text-white focus-visible:text-white",
    wipe: "bg-ink",
    divider: "border-ink/15 group-hover/blk:border-white/20 group-focus-visible/blk:border-white/20",
  },
};

/** Class list for the button shell, shared by links and real `<button>`s. */
export function blockButtonClass({
  variant = "ink",
  full = false,
  className = "",
}: {
  variant?: Variant;
  full?: boolean;
  className?: string;
} = {}) {
  return `group/blk relative isolate inline-flex h-12 items-stretch overflow-hidden text-[15px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap select-none disabled:cursor-wait disabled:opacity-70 ${
    full ? "w-full" : ""
  } ${VARIANTS[variant].body} ${className}`;
}

/**
 * The inside of a button: colour wipe, label, and an arrow cell. `icon` replaces the sliding arrow
 * (a spinner, an external-link mark); `arrow={false}` drops the cell for quiet secondary actions.
 */
export function BlockButtonBody({
  children,
  variant = "ink",
  full = false,
  icon,
  arrow = true,
}: {
  children: ReactNode;
  variant?: Variant;
  full?: boolean;
  icon?: ReactNode;
  arrow?: boolean;
}) {
  const v = VARIANTS[variant];
  return (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-right scale-x-0 transition-[scale] duration-500 ease-out group-hover/blk:origin-left group-hover/blk:scale-x-100 group-focus-visible/blk:origin-left group-focus-visible/blk:scale-x-100 group-disabled/blk:scale-x-0 motion-reduce:transition-none ${v.wipe}`}
      />
      <span className={`flex items-center px-5 ${full || !arrow ? "flex-1" : ""} ${arrow ? "" : "justify-center"}`}>
        <span className="[text-box:trim-both_cap_alphabetic]">{children}</span>
      </span>
      {arrow ? (
        <span aria-hidden className={`relative grid w-12 shrink-0 place-items-center overflow-hidden border-l transition-colors duration-300 ${v.divider}`}>
          {icon ?? (
            <>
              <ChevronRight
                className="size-4 transition-[translate] duration-300 ease-out group-hover/blk:translate-x-8 group-focus-visible/blk:translate-x-8 motion-reduce:transition-none"
                strokeWidth={2}
              />
              <ChevronRight
                className="absolute size-4 -translate-x-8 transition-[translate] duration-300 ease-out group-hover/blk:translate-x-0 group-focus-visible/blk:translate-x-0 motion-reduce:transition-none"
                strokeWidth={2}
              />
            </>
          )}
        </span>
      ) : null}
    </>
  );
}

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
  // Internal pages go through next/link (client-side navigation); #anchors and external URLs stay <a>.
  const Tag = href.startsWith("/") ? Link : "a";
  return (
    <Tag href={href} className={blockButtonClass({ variant, full, className })}>
      <BlockButtonBody variant={variant} full={full}>
        {children}
      </BlockButtonBody>
    </Tag>
  );
}
