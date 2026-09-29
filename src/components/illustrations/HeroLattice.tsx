"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const HW = 88;
const HH = 51;
const R = 11;

type Tile = { x: number; y: number; logo?: string; size?: number };

// Geometry taken from the Figma hero illustration (771 x 580 frame).
const TILES: Tile[] = [
  { x: 293, y: 169 },
  { x: 498, y: 172, logo: "linux", size: 40 },
  { x: 703, y: 174, logo: "nodejs", size: 40 },
  { x: 398, y: 230, logo: "github", size: 42 },
  { x: 603, y: 232 },
  { x: 297, y: 288, logo: "python", size: 42 },
  { x: 502, y: 290, logo: "react", size: 46 },
  { x: 707, y: 292, logo: "docker", size: 46 },
  { x: 402, y: 348 },
  { x: 607, y: 350 },
  { x: 302, y: 408, logo: "googlecloud", size: 46 },
  { x: 506, y: 409, logo: "aws", size: 62 },
  { x: 711, y: 411, logo: "azure", size: 44 },
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
    const u = (a: [number, number], b: [number, number]) => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy);
      return [dx / l, dy / l];
    };
    const [px, py] = u(p, prev);
    const [nx, ny] = u(p, next);
    const a = [p[0] + px * R, p[1] + py * R];
    const b = [p[0] + nx * R, p[1] + ny * R];
    d += `${i === 0 ? "M" : "L"}${a[0]} ${a[1]} Q${p[0]} ${p[1]} ${b[0]} ${b[1]} `;
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
            y: i % 2 ? -5 : 5,
            duration: 2.6 + (i % 4) * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.18,
          });
        });
        gsap.to(".lt-scene", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 30%", end: "bottom top", scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="w-full select-none">
      <div className="lt-scene">
        <svg
          viewBox="0 0 771 580"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Isometric tiles showing the cloud and engineering tools Infra8 works with: Linux, Node.js, GitHub, Python, React, Docker, Google Cloud, AWS and Azure"
        >
          {TILES.map((t, i) => (
            <motion.g
              key={`${t.x}-${t.y}`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
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
                    <motion.g
                      transform={`translate(${t.x} ${t.y}) matrix(0.866 0.5 -0.866 0.5 0 0)`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.06, duration: 0.6 }}
                    >
                      <image
                        href={`/content/logos/${t.logo}.svg`}
                        x={-(t.size ?? 40) / 2}
                        y={-(t.size ?? 40) / 2}
                        width={t.size ?? 40}
                        height={t.size ?? 40}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </motion.g>
                  ) : null}
                </g>
              </g>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}
