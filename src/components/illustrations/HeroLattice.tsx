"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const HW = 88;
const HH = 51;
const R = 11;
const LIFT = 12;
const CYCLE_MS = 2200;

type Logo = { file: string; x: number; y: number; w: number; h: number };
type Tile = { x: number; y: number; logo?: Logo };

// Tile centres and logo boxes measured from the Figma hero illustration (node 115:32214, 771 x 580).
// The logo PNGs are cut at native resolution from Figma's own 4x render, so they lie on the
// isometric plane exactly as in Figma and stay sharp on retina screens (design/crop-logos-4x.mjs).
const TILES: Tile[] = [
  { x: 293, y: 169 },
  { x: 498, y: 172, logo: { file: "linux", x: 473, y: 160.96, w: 42.75, h: 25.53 } },
  { x: 703, y: 174, logo: { file: "nodejs", x: 681, y: 160.21, w: 46.5, h: 28.54 } },
  { x: 398, y: 230, logo: { file: "github", x: 373.75, y: 216.03, w: 47, h: 28.79 } },
  { x: 603, y: 232 },
  { x: 297, y: 288, logo: { file: "python", x: 275.25, y: 274.85, w: 43.75, h: 27.03 } },
  { x: 502, y: 290, logo: { file: "react", x: 479.25, y: 276.61, w: 46, h: 28.04 } },
  { x: 707, y: 292, logo: { file: "docker", x: 684.5, y: 281.36, w: 42.75, h: 21.53 } },
  { x: 402, y: 348 },
  { x: 607, y: 350 },
  { x: 302, y: 408, logo: { file: "googlecloud", x: 271.25, y: 392.51, w: 53, h: 32.54 } },
  { x: 506, y: 409, logo: { file: "aws", x: 472.5, y: 386, w: 72.5, h: 45.81 } },
  { x: 711, y: 411, logo: { file: "azure", x: 680.75, y: 398.01, w: 52.5, h: 32.04 } },
];

// Tiles that take a turn lifting: the logo tiles, in a path that wanders across the board.
const ORDER = [6, 11, 3, 7, 10, 1, 5, 12, 2];

function rounded(cx: number, cy: number) {
  const pts: [number, number][] = [
    [cx, cy - HH],
    [cx + HW, cy],
    [cx, cy + HH],
    [cx - HW, cy],
  ];
  let d = "";
  pts.forEach((p, i) => {
    const prev = pts[(i + 3) % 4];
    const next = pts[(i + 1) % 4];
    const unit = (a: [number, number], b: [number, number]) => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy);
      return [dx / l, dy / l];
    };
    const [px, py] = unit(p, prev);
    const [nx, ny] = unit(p, next);
    d += `${i === 0 ? "M" : "L"}${p[0] + px * R} ${p[1] + py * R} Q${p[0]} ${p[1]} ${p[0] + nx * R} ${p[1] + ny * R} `;
  });
  return d + "Z";
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero illustration, after the Figma design: flat rounded tiles on an isometric grid with the tool
 * logos lying on them. The board settles in on load; then one logo tile at a time lifts off its
 * dashed footprint and outlines in blue. Hovering a tile lifts that one and holds the cycle.
 */
export function HeroLattice() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? (reduce ? null : ORDER[step % ORDER.length]);

  useEffect(() => {
    if (!inView || reduce || hovered !== null) return;
    const id = window.setInterval(() => setStep((s) => s + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce, hovered]);

  return (
    <div ref={root} className="w-full select-none">
      <svg
        viewBox="0 0 771 580"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Isometric tiles showing the engineering and cloud tools Infra8 works with: Linux, Node.js, GitHub, Python, React, Docker, Google Cloud, AWS and Azure"
      >
        {TILES.map((t, i) => {
          const on = active === i;
          return (
            <motion.g
              key={`${t.x}-${t.y}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 + ((t.x + t.y) / 1100) * 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* The footprint the tile lifts off. */}
              <path
                d={rounded(t.x, t.y)}
                fill="none"
                strokeWidth={1}
                strokeDasharray="3 4"
                className={`stroke-brand/50 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
              />
              <g className={`transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "-translate-y-3" : ""}`}>
                <path
                  d={rounded(t.x, t.y)}
                  strokeWidth={1}
                  className={`transition-[stroke,fill] duration-500 ${on ? "fill-white stroke-brand" : "fill-white stroke-[#e1e1e1]"}`}
                />
                {t.logo ? (
                  <image
                    href={`/content/hero/${t.logo.file}.png`}
                    x={t.logo.x}
                    y={t.logo.y}
                    width={t.logo.w}
                    height={t.logo.h}
                    preserveAspectRatio="none"
                  />
                ) : null}
              </g>
              {/* Short drop lines from the lifted tile's side corners to its footprint. */}
              <g className={`stroke-brand/40 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`} strokeWidth={1}>
                <line x1={t.x - HW + 3} y1={t.y - LIFT} x2={t.x - HW + 3} y2={t.y} />
                <line x1={t.x + HW - 3} y1={t.y - LIFT} x2={t.x + HW - 3} y2={t.y} />
                <line x1={t.x} y1={t.y + HH - LIFT - 1} x2={t.x} y2={t.y + HH - 1} />
              </g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
