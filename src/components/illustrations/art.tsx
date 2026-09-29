"use client";

import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export const BLUE = "#0654fe";
export const ORANGE = "#ff9c33";
export const LINE = "#e7e7e7";
export const INK = "#111111";
export const OK = "#00c91e";
export const MUTE = "#8a94a8";
export const SKEL = "#e4eaf6";

const EASE = [0.22, 1, 0.36, 1] as const;

export const stagger = (s = 0.09, d = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});
export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};
export const pop: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 20 } },
};
export const rise: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: EASE } },
};
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};
export const grow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const ORIGIN_CENTER = { transformBox: "fill-box", transformOrigin: "center" } as const;
export const ORIGIN_LEFT = { transformBox: "fill-box", transformOrigin: "left center" } as const;

export function Art({
  viewBox,
  children,
  className = "h-full w-full",
  label,
  delay = 0,
}: {
  viewBox: string;
  children: ReactNode;
  className?: string;
  label?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox={viewBox}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      variants={stagger(0.09, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </motion.svg>
  );
}

/* ---------- entrance wrappers ---------- */
export function R({ children }: { children: ReactNode }) {
  return <motion.g variants={rise}>{children}</motion.g>;
}
export function P({ children }: { children: ReactNode }) {
  return (
    <motion.g variants={pop} style={ORIGIN_CENTER}>
      {children}
    </motion.g>
  );
}
export function F({ children }: { children: ReactNode }) {
  return <motion.g variants={fade}>{children}</motion.g>;
}

/** Gentle idle float (CSS, so it never fights the entrance transform). */
export function Float({
  children,
  d = 0,
  a = -5,
  t = 5,
}: {
  children: ReactNode;
  d?: number;
  a?: number;
  t?: number;
}) {
  const style = { animationDelay: `${d}s`, animationDuration: `${t}s`, ["--fa" as string]: `${a}px` } as CSSProperties;
  return (
    <g className="fx-float" style={style}>
      {children}
    </g>
  );
}

/* ---------- primitives ---------- */
export function Glass({
  x,
  y,
  w,
  h,
  r = 12,
  fill = "url(#gCard)",
  shadow = "fSoft",
  stroke = "rgba(16,40,110,0.08)",
  opacity = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
  shadow?: string | null;
  stroke?: string;
  opacity?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke}
      opacity={opacity}
      filter={shadow ? `url(#${shadow})` : undefined}
    />
  );
}

export function Bar({
  x,
  y,
  w,
  h = 5,
  c = SKEL,
  o = 1,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  c?: string;
  o?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} opacity={o} />;
}

export function Txt({
  x,
  y,
  children,
  size = 9,
  fill = INK,
  font = "sans",
  anchor = "start",
  ls,
  weight,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  font?: "mono" | "display" | "sans";
  anchor?: "start" | "middle" | "end";
  ls?: number;
  weight?: number;
}) {
  const family =
    font === "mono" ? "var(--font-geist-mono)" : font === "display" ? "var(--font-gsf)" : "var(--font-inter)";
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      fontFamily={family}
      textAnchor={anchor}
      letterSpacing={ls}
      fontWeight={weight}
    >
      {children}
    </text>
  );
}

export function Badge({
  cx,
  cy,
  r = 15,
  logo,
  scale = 1.15,
  ring = false,
}: {
  cx: number;
  cy: number;
  r?: number;
  logo: string;
  scale?: number;
  ring?: boolean;
}) {
  const s = r * scale;
  return (
    <g filter="url(#fSoft)">
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={ring ? "rgba(6,84,254,0.25)" : "rgba(16,40,110,0.07)"} strokeWidth={ring ? 1.5 : 1} />
      <image href={`/content/logos/${logo}.svg`} x={cx - s / 2} y={cy - s / 2} width={s} height={s} preserveAspectRatio="xMidYMid meet" />
    </g>
  );
}

export function Check({ cx, cy, r = 8, fill = "url(#gGreen)" }: { cx: number; cy: number; r?: number; fill?: string }) {
  const k = r / 8;
  return (
    <g filter="url(#fTiny)">
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - 3.6 * k} ${cy + 0.1 * k} l${2.6 * k} ${2.6 * k} l${4.6 * k} ${-5.2 * k}`}
        stroke="#fff"
        strokeWidth={2 * k}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

export function Pill({
  x,
  y,
  w,
  h = 18,
  label,
  tone = "blue",
  size = 8.5,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  tone?: "blue" | "orange" | "green" | "ink" | "white" | "red";
  size?: number;
}) {
  const T = {
    blue: { bg: "#e8f0ff", fg: "#0654fe", st: "none" },
    orange: { bg: "#fff1e0", fg: "#e56a00", st: "none" },
    green: { bg: "#e3f9e7", fg: "#0a9a20", st: "none" },
    red: { bg: "#ffe6e6", fg: "#d63838", st: "none" },
    ink: { bg: "url(#gInk)", fg: "#9cf0ab", st: "none" },
    white: { bg: "#ffffff", fg: "#111", st: "rgba(16,40,110,0.1)" },
  }[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={T.bg} stroke={T.st} />
      <Txt x={x + w / 2} y={y + h / 2 + size * 0.35} size={size} fill={T.fg} font="mono" anchor="middle" ls={0.4}>
        {label}
      </Txt>
    </g>
  );
}

export function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} filter="url(#fSoft)">
      <path d="M0 0 L0 15 L4.2 11.6 L7.2 18.4 L10 17.2 L7 10.6 L12.4 10.2 Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

export function Dots({ cx, cy, n = 3, gap = 8, r = 2.5, c = "#cfd8ea" }: { cx: number; cy: number; n?: number; gap?: number; r?: number; c?: string }) {
  return (
    <g fill={c}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={cx + i * gap} cy={cy} r={r} />
      ))}
    </g>
  );
}

/** Flowing dashed connector. */
export function Flow({ d, c = BLUE, w = 1.6, o = 0.6 }: { d: string; c?: string; w?: number; o?: number }) {
  return (
    <motion.path
      variants={fade}
      d={d}
      fill="none"
      stroke={c}
      strokeOpacity={o}
      strokeWidth={w}
      strokeLinecap="round"
      strokeDasharray="4 6"
      className="fx-dash"
    />
  );
}
