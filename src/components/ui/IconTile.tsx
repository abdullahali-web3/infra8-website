import type { Icon } from "@primer/octicons-react";

const SIZES = {
  /** Matches a 28px text line, so the tile's top and bottom line up with the first line. */
  line: { box: "size-7", icon: 16 },
  sm: { box: "size-8", icon: 16 },
  md: { box: "size-11", icon: 24 },
} as const;

/**
 * Octicon in a hairline square. One look across the site: ink at rest, brand blue while its
 * `group/card` parent is hovered.
 */
export function IconTile({ icon: Glyph, size = "sm", className = "" }: { icon: Icon; size?: keyof typeof SIZES; className?: string }) {
  const s = SIZES[size];
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center border border-line bg-white text-ink transition-colors duration-300 group-hover/card:border-brand/40 group-hover/card:text-brand ${s.box} ${className}`}
    >
      <Glyph size={s.icon} />
    </span>
  );
}
