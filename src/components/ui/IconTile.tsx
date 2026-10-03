import type { LucideIcon } from "lucide-react";

const SIZES = {
  sm: { box: "size-8", icon: "size-4" },
  md: { box: "size-10", icon: "size-5" },
} as const;

/**
 * Line icon in a hairline square: muted at rest, brand blue while its `group/card` parent is hovered.
 * Used for list items and cells where a relevant icon reads better than a plain bullet.
 */
export function IconTile({ icon: Icon, size = "sm", className = "" }: { icon: LucideIcon; size?: keyof typeof SIZES; className?: string }) {
  const s = SIZES[size];
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center border border-line bg-white text-ink-soft transition-colors duration-300 group-hover/card:border-brand/40 group-hover/card:text-brand ${s.box} ${className}`}
    >
      <Icon className={s.icon} strokeWidth={1.75} />
    </span>
  );
}
