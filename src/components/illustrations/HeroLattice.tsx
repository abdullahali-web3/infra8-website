"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const HW = 88;
const HH = 51;
const R = 11;

type Logo = { file: string; x: number; y: number; w: number; h: number };
type Tile = { x: number; y: number; logo?: Logo };

// Tile centres and logo boxes measured from the Figma hero illustration (771 x 580).
// The logo PNGs are cut at native resolution from Figma's own 4x render (~4 image pixels per
// design pixel), so they stay sharp on retina screens. Regenerate with design/crop-logos-4x.mjs.
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

export function HeroLattice() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<SVGGElement>(".lt-float").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -4 : 4,
            duration: 2.8 + (i % 4) * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.18,
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="w-full select-none">
      <svg
        viewBox="0 0 771 580"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Isometric tiles showing the engineering and cloud tools Infra8 works with: Linux, Node.js, GitHub, Python, React, Docker, Google Cloud, AWS and Azure"
      >
        {TILES.map((t, i) => (
          <motion.g
            key={`${t.x}-${t.y}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <g className="lt-float">
              <g className="group">
                <path
                  d={rounded(t.x, t.y)}
                  className="fill-white stroke-[#e1e1e1] transition-[stroke,fill] duration-300 group-hover:fill-[#f6f9ff] group-hover:stroke-brand/40"
                  strokeWidth={1}
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
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
