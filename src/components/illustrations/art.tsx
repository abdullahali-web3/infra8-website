"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const BLUE = "#0654fe";
export const ORANGE = "#ff9c33";
export const LINE = "#e7e7e7";
export const INK = "#111111";
export const OK = "#00c91e";

const EASE = [0.22, 1, 0.36, 1] as const;

export const stagger = (s = 0.1, d = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

export const pop: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 18 } },
};

export const rise: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const grow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const growY: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: { scaleY: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const FILL_BOX = { transformBox: "fill-box" } as const;
export const ORIGIN_CENTER = { transformBox: "fill-box", transformOrigin: "center" } as const;
export const ORIGIN_LEFT = { transformBox: "fill-box", transformOrigin: "left center" } as const;
export const ORIGIN_BOTTOM = { transformBox: "fill-box", transformOrigin: "center bottom" } as const;

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
      viewport={{ once: true, amount: 0.35 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="-2" dy="4" stdDeviation="6" floodColor="#3a4445" floodOpacity="0.12" />
        </filter>
      </defs>
      {children}
    </motion.svg>
  );
}
