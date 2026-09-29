import type { ReactNode, SVGProps } from "react";
import { boxFaces, onTop, points, type P3 } from "@/lib/iso";

/**
 * Blueprint isometric kit. Everything is 1px hairline (non-scaling) over white or pattern
 * fills defined once in `SvgDefs` (isoHatchL/R, isoDither, isoDitherDense, isoFloor).
 */
export type IsoTone = "paper" | "muted" | "brand" | "solid" | "ghost";

const TONES: Record<IsoTone, { top: string; left: string; right: string; line: string }> = {
  paper: { top: "fill-white", left: "fill-[url(#isoHatchL)]", right: "fill-[url(#isoHatchR)]", line: "stroke-ink" },
  muted: { top: "fill-white", left: "fill-[url(#isoHatchMuted)]", right: "fill-white", line: "stroke-iso-muted" },
  brand: { top: "fill-brand-tint", left: "fill-[url(#isoDitherDense)]", right: "fill-[url(#isoDither)]", line: "stroke-brand" },
  solid: { top: "fill-brand", left: "fill-brand-deep", right: "fill-brand-mid", line: "stroke-brand-deep" },
  ghost: { top: "fill-transparent", left: "fill-transparent", right: "fill-transparent", line: "stroke-ink/40" },
};

export const LINE = { vectorEffect: "non-scaling-stroke", strokeWidth: 1, strokeLinejoin: "round" } as const;

const FACE = "transition-[fill,stroke] duration-500";

export function IsoBox({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = "paper",
  className,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: IsoTone;
  className?: string;
  /** Drawn on the top face, in flat coordinates (0..w, 0..d). */
  children?: ReactNode;
}) {
  const f = boxFaces(x, y, z, w, d, h);
  const t = TONES[tone];
  const dash = tone === "ghost" ? { strokeDasharray: "3 3" } : {};
  return (
    <g className={className}>
      <polygon points={f.left} className={`${t.left} ${t.line} ${FACE}`} {...LINE} {...dash} />
      <polygon points={f.right} className={`${t.right} ${t.line} ${FACE}`} {...LINE} {...dash} />
      <polygon points={f.top} className={`${t.top} ${t.line} ${FACE}`} {...LINE} {...dash} />
      {children ? <g transform={onTop(x, y, z + h)}>{children}</g> : null}
    </g>
  );
}

/** A dotted floor tile with a dashed outline: the drawing's ground plane. */
export function IsoFloor({ x, y, w, d, z = 0 }: { x: number; y: number; w: number; d: number; z?: number }) {
  const outline = points([
    [x, y, z],
    [x + w, y, z],
    [x + w, y + d, z],
    [x, y + d, z],
  ]);
  return (
    <g>
      <polygon points={outline} fill="url(#isoFloor)" />
      <polygon points={outline} fill="none" className="stroke-ink/25" {...LINE} strokeDasharray="2 4" />
    </g>
  );
}

/** A polyline in world space. */
export function IsoPath({
  pts,
  className = "stroke-ink",
  ...rest
}: { pts: readonly P3[]; className?: string } & Omit<SVGProps<SVGPolylineElement>, "points">) {
  return <polyline points={points(pts)} fill="none" className={className} {...LINE} {...rest} />;
}

/** Wraps a scene: `origin` shifts world (0,0,0) inside the viewBox. */
export function IsoSvg({
  viewBox,
  origin,
  children,
  className = "h-full w-full",
  label,
}: {
  viewBox: string;
  origin: [number, number];
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={`overflow-visible ${className}`}
      preserveAspectRatio="xMidYMid meet"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <g transform={`translate(${origin[0]} ${origin[1]})`}>{children}</g>
    </svg>
  );
}
