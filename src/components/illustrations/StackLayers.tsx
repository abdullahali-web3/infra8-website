"use client";

import { motion } from "motion/react";
import { Art, Float, R, draw, BLUE, INK, ORANGE } from "./art";

export type Layer = { label: string; logos: readonly string[] };

const CX = 140;
const W = 112;
const H = 56;
const T = 14;
const GAP = 100;
const TOP = 66;
const RAD = 12;

function roundedRhombus(cx: number, cy: number, w: number, h: number, r: number) {
  const pts: [number, number][] = [
    [cx, cy - h],
    [cx + w, cy],
    [cx, cy + h],
    [cx - w, cy],
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
    d += `${i === 0 ? "M" : "L"}${p[0] + px * r} ${p[1] + py * r} Q${p[0]} ${p[1]} ${p[0] + nx * r} ${p[1] + ny * r} `;
  });
  return d + "Z";
}

export function StackLayers({ layers }: { layers: readonly Layer[] }) {
  const n = layers.length;
  const height = TOP + (n - 1) * GAP + H + T + 24;
  const order = layers.map((l, i) => ({ ...l, i })).reverse();

  return (
    <Art viewBox={`0 0 400 ${height}`} label={`Layered stack: ${layers.map((l) => l.label).join(", ")}`}>
      {order.map(({ label, logos, i }) => {
        const cy = TOP + i * GAP;
        const top = i === 0;
        const step = 46;
        return (
          <R key={label}>
            <Float a={i % 2 ? -3 : -5} d={i * 0.4} t={5.5}>
              <path d={`M${CX - W} ${cy} L${CX} ${cy + H} L${CX} ${cy + H + T} L${CX - W} ${cy + T} Z`} fill="url(#gSideL)" />
              <path d={`M${CX + W} ${cy} L${CX} ${cy + H} L${CX} ${cy + H + T} L${CX + W} ${cy + T} Z`} fill="url(#gSideR)" />
              <path
                d={roundedRhombus(CX, cy, W, H, RAD)}
                fill={top ? "url(#gGlassBrand)" : "url(#gGlass)"}
                stroke={top ? "rgba(255,255,255,0.85)" : "rgba(6,84,254,0.3)"}
                strokeWidth="1.4"
              />
              <path d={roundedRhombus(CX, cy, W * 0.8, H * 0.8, 10)} fill="none" stroke={top ? "#fff" : BLUE} strokeOpacity={top ? 0.4 : 0.14} />
              {[
                [CX, cy - H + 13],
                [CX + W - 24, cy],
                [CX, cy + H - 13],
                [CX - W + 24, cy],
              ].map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r="3" fill={ORANGE} stroke="#fff" strokeWidth="1.2" />
              ))}
              <g transform={`translate(${CX} ${cy}) matrix(0.866 0.5 -0.866 0.5 0 0)`}>
                {logos.map((logo, k) => {
                  const x = (k - (logos.length - 1) / 2) * step;
                  const s = logo === "aws" ? 40 : 30;
                  return (
                    <image
                      key={logo}
                      href={`/content/logos/${logo}.svg`}
                      x={x - s / 2}
                      y={-s / 2}
                      width={s}
                      height={s}
                      preserveAspectRatio="xMidYMid meet"
                    />
                  );
                })}
              </g>
              <motion.path variants={draw} d={`M${CX + W + 8} ${cy} H${CX + W + 34}`} stroke={BLUE} strokeOpacity="0.4" strokeWidth="1.4" />
              <circle cx={CX + W + 8} cy={cy} r="3" fill={BLUE} />
              <text x={CX + W + 42} y={cy + 4} fontSize="11" fill={INK} fontFamily="var(--font-geist-mono)" letterSpacing="0.6">
                {label.toUpperCase()}
              </text>
            </Float>
          </R>
        );
      })}
    </Art>
  );
}
