"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const S = 62;
const CX = 320;
const CY = 112;
const W = S * 0.94;
const H = W / 2;
const K = 0.85;

function pos(i: number, j: number) {
  return { x: CX + (i - j) * S, y: CY + (i + j) * (S / 2) };
}

const diamond = (x: number, y: number) =>
  `M${x} ${y - H} L${x + W} ${y} L${x} ${y + H} L${x - W} ${y} Z`;

type GlyphKey = "mark" | "cloud" | "code" | "shield" | "pipeline" | "server" | "chart" | "deploy";

type Active = { i: number; j: number; z: number; glyph: GlyphKey; tone?: "brand" | "accent" };

const ACTIVE: Active[] = [
  { i: 2, j: 2, z: 36, glyph: "mark", tone: "brand" },
  { i: 0, j: 2, z: 20, glyph: "cloud" },
  { i: 2, j: 0, z: 14, glyph: "code" },
  { i: 4, j: 2, z: 24, glyph: "shield" },
  { i: 2, j: 4, z: 16, glyph: "pipeline" },
  { i: 1, j: 3, z: 12, glyph: "server" },
  { i: 3, j: 1, z: 12, glyph: "chart" },
  { i: 3, j: 3, z: 28, glyph: "deploy", tone: "accent" },
];

const LINKS: [number, number][] = [
  [0, 2],
  [2, 0],
  [4, 2],
  [2, 4],
];

function Glyph({ kind, stroke }: { kind: GlyphKey; stroke: string }) {
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "mark":
      return (
        <g transform="translate(-11.5 -14.4) scale(1.2)">
          <path
            d="M14.6518 19.3172C14.6518 21.9034 12.5596 24 9.97877 24H9.18122C6.60036 24 4.50816 21.9034 4.50816 19.3172H14.6518ZM19.16 14.7996C19.16 17.2946 17.1416 19.3172 14.6518 19.3172V9.76523C14.6518 6.95829 12.3811 4.68281 9.57999 4.68281C6.7789 4.68281 4.50816 6.95829 4.50816 9.76523V19.3172C2.01837 19.3172 0 17.2946 0 14.7996V9.6C0 4.29807 4.28911 0 9.57999 0C14.8709 0 19.16 4.29807 19.16 9.6V14.7996Z"
            fill="#fff"
          />
        </g>
      );
    case "cloud":
      return <path {...common} d="M-13 8h24a8 8 0 0 0 1-16 11 11 0 0 0-21-2 9 9 0 0 0-4 18z" />;
    case "code":
      return (
        <g {...common}>
          <polyline points="-6,-10 -16,0 -6,10" />
          <polyline points="6,-10 16,0 6,10" />
          <line x1="2" y1="-12" x2="-2" y2="12" />
        </g>
      );
    case "shield":
      return (
        <g {...common}>
          <path d="M0 -16 L14 -10 V2 C14 10 7 15 0 18 C-7 15 -14 10 -14 2 V-10 Z" />
          <polyline points="-6,1 -1,6 7,-4" />
        </g>
      );
    case "pipeline":
      return (
        <g {...common}>
          <circle cx="-12" cy="-9" r="3.5" />
          <circle cx="-12" cy="10" r="3.5" />
          <circle cx="12" cy="-9" r="3.5" />
          <path d="M-12 -5.5 V6.5 M-12 1 C-12 -9 12 0 12 -5.5" />
        </g>
      );
    case "server":
      return (
        <g {...common}>
          <rect x="-14" y="-14" width="28" height="11" rx="3" />
          <rect x="-14" y="3" width="28" height="11" rx="3" />
          <circle cx="-8" cy="-8.5" r="1" fill={stroke} />
          <circle cx="-8" cy="8.5" r="1" fill={stroke} />
        </g>
      );
    case "chart":
      return (
        <g fill={stroke}>
          <rect x="-14" y="2" width="7" height="12" rx="1.5" />
          <rect x="-3.5" y="-6" width="7" height="20" rx="1.5" />
          <rect x="7" y="-14" width="7" height="28" rx="1.5" />
        </g>
      );
    case "deploy":
      return (
        <g {...common}>
          <circle cx="0" cy="0" r="15" />
          <path d="M0 8 V-8 M-6 -2 L0 -8 L6 -2" />
        </g>
      );
  }
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroIso() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".float-a", { y: -10, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".float-b", { y: 9, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".iso-scene", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 20%",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    },
    { scope: root },
  );

  const base: { i: number; j: number }[] = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) base.push({ i, j });
  const activeKey = new Set(ACTIVE.map((a) => `${a.i}-${a.j}`));

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[640px] select-none" aria-hidden>
      <div className="iso-scene">
        <svg viewBox="0 0 640 440" className="h-auto w-full overflow-visible" role="img" aria-label="Isometric platform showing product build and cloud operations working as one system">
          <defs>
            <filter id="tile-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1b2a4a" floodOpacity="0.12" />
            </filter>
          </defs>

          {base.map(({ i, j }) => {
            const { x, y } = pos(i, j);
            const raised = activeKey.has(`${i}-${j}`);
            return (
              <motion.path
                key={`b-${i}-${j}`}
                d={diamond(x, y)}
                fill={raised ? "#f4f6fa" : "#ffffff"}
                stroke="#e7e7e7"
                strokeWidth={1}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 + (i + j) * 0.06 }}
              />
            );
          })}

          {LINKS.map(([i, j], idx) => {
            const a = pos(2, 2);
            const b = pos(i, j);
            return (
              <motion.line
                key={`l-${idx}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#0654fe"
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeDasharray="4 6"
                className="motion-safe-anim"
                style={{ animation: "dash-flow 1.4s linear infinite" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
            );
          })}

          {[...ACTIVE]
            .sort((a, b) => a.i + a.j - (b.i + b.j))
            .map((t, idx) => {
              const { x, y } = pos(t.i, t.j);
              const top = y - t.z;
              const brand = t.tone === "brand";
              const accent = t.tone === "accent";
              const topFill = brand ? "#0654fe" : accent ? "#ff9c33" : "#ffffff";
              const left = brand ? "#0443c4" : accent ? "#e58a2a" : "#eceff5";
              const right = brand ? "#0339a8" : accent ? "#cf7a22" : "#dde2ec";
              const glyphStroke = brand ? "#ffffff" : accent ? "#ffffff" : "#0654fe";
              return (
                <motion.g
                  key={`a-${t.i}-${t.j}`}
                  filter="url(#tile-shadow)"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.7 + idx * 0.09 }}
                >
                  <path d={`M${x - W} ${top} L${x} ${top + H} L${x} ${y + H} L${x - W} ${y} Z`} fill={left} />
                  <path d={`M${x + W} ${top} L${x} ${top + H} L${x} ${y + H} L${x + W} ${y} Z`} fill={right} />
                  <path d={diamond(x, top)} fill={topFill} stroke={brand || accent ? "none" : "#e7e7e7"} strokeWidth={1} />
                  <g transform={`translate(${x} ${top}) matrix(${K} ${K * 0.5} ${-K} ${K * 0.5} 0 0)`}>
                    <Glyph kind={t.glyph} stroke={glyphStroke} />
                  </g>
                </motion.g>
              );
            })}
        </svg>
      </div>

      <div className="float-a absolute top-[2%] left-[-2%] w-[214px] rounded-2xl border border-line bg-white/95 p-3.5 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.25)] backdrop-blur sm:left-[-8%] sm:w-[232px]">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-muted">
          <span className="size-[6px] bg-accent" />
          Estimate · 24 hrs
        </div>
        <dl className="mt-3 space-y-2 text-[13px] tracking-[-0.02em]">
          <div className="flex justify-between">
            <dt className="text-muted">MVP build</dt>
            <dd className="font-medium text-ink">$10–25k</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Timeline</dt>
            <dd className="font-medium text-ink">6–10 weeks</dd>
          </div>
        </dl>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ delay: 1.6, duration: 1.4, ease: EASE }}
          />
        </div>
      </div>

      <div className="float-b absolute right-[-2%] bottom-[6%] w-[200px] rounded-2xl border border-line bg-white/95 p-3.5 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.25)] backdrop-blur sm:right-[-4%] sm:w-[214px]">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-muted">
          <span className="relative grid size-2 place-items-center">
            <span className="motion-safe-anim absolute size-2 rounded-full bg-ok" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
            <span className="size-[6px] rounded-full bg-ok" />
          </span>
          main → production
        </div>
        <ul className="mt-3 space-y-1.5 text-[13px] tracking-[-0.02em]">
          {["Tests passed", "Security scan clean", "Deployed"].map((t) => (
            <li key={t} className="flex items-center justify-between">
              <span className="text-ink">{t}</span>
              <span className="text-ok">✓</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
