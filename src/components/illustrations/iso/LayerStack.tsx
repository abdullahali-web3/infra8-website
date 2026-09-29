"use client";

import { useRef, type ReactNode } from "react";
import { STACK_LAYERS } from "@/lib/content";
import { logoSrc } from "@/lib/logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { COS30 } from "@/lib/iso";
import { IsoBox, LINE, type IsoTone } from "./Iso";

const SIZE = 200;
const THICK = 8;
/** Vertical distance between plates when fully spread, and when collapsed at the start of the scroll. */
const SPREAD = 72;
const COLLAPSED = 16;
const EDGE = SIZE * COS30;
const MID_Y = SIZE / 2 - THICK;

type PlateState = "above" | "active" | "below";

const PLATE_TONE: Record<PlateState, IsoTone> = { above: "ghost", active: "brand", below: "paper" };
const INK: Record<PlateState, string> = { above: "stroke-transparent", active: "stroke-brand", below: "stroke-ink/45" };
const FILL: Record<PlateState, string> = { above: "fill-transparent", active: "fill-brand", below: "fill-ink/30" };

/** What each plate carries on its top face, drawn flat in a 200×200 square. */
function PlateArt({ index, s }: { index: number; s: PlateState }) {
  const line = `${INK[s]} transition-[stroke] duration-500`;
  const fill = `${FILL[s]} transition-[fill] duration-500`;
  const box = (x: number, y: number, w: number, h: number, dashed = false) => (
    <rect key={`r${x}-${y}`} x={x} y={y} width={w} height={h} fill="none" className={line} {...LINE} strokeDasharray={dashed ? "3 3" : undefined} />
  );
  const bar = (x: number, y: number, w: number, h = 4) => <rect key={`b${x}-${y}`} x={x} y={y} width={w} height={h} className={fill} />;
  const art: ReactNode[] = [
    // Interface: an app window.
    <g key="ui">
      {box(24, 24, 152, 152)}
      <line x1={24} y1={40} x2={176} y2={40} className={line} {...LINE} />
      {[32, 40, 48].map((x) => (
        <circle key={x} cx={x} cy={32} r={2.2} className={fill} />
      ))}
      {box(24, 40, 38, 136)}
      {[52, 62, 72, 82].map((y) => bar(31, y, 24, 3))}
      {bar(72, 50, 64, 8)}
      {box(72, 66, 94, 50)}
      {box(72, 124, 44, 42)}
      {box(122, 124, 44, 42)}
      {bar(78, 154, 30, 6)}
    </g>,
    // Services and APIs: nodes around a gateway.
    <g key="api">
      {[
        [34, 34],
        [88, 34],
        [142, 34],
        [34, 142],
        [88, 142],
        [142, 142],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <line x1={x + 12} y1={y + 12} x2={100} y2={100} className={line} {...LINE} strokeDasharray="2 3" />
          {box(x, y, 24, 24)}
        </g>
      ))}
      <rect x={72} y={86} width={56} height={28} className={`fill-white ${line}`} {...LINE} />
      {bar(80, 97, 40, 5)}
    </g>,
    // Data and AI: a table and three stores.
    <g key="data">
      {box(24, 24, 152, 104)}
      {[44, 64, 84, 104].map((y) => (
        <line key={y} x1={24} y1={y} x2={176} y2={y} className={line} {...LINE} />
      ))}
      {[74, 124].map((x) => (
        <line key={x} x1={x} y1={24} x2={x} y2={128} className={line} {...LINE} />
      ))}
      {bar(30, 30, 30, 6)}
      {[52, 100, 148].map((x) => (
        <g key={x}>
          <circle cx={x} cy={158} r={14} fill="none" className={line} {...LINE} />
          <circle cx={x} cy={158} r={6} className={fill} />
        </g>
      ))}
    </g>,
    // Delivery: a pipeline and a monitoring line.
    <g key="ci">
      {[20, 66, 112, 158].map((x, i) => (
        <g key={x}>
          {box(x, 34, 24, 24)}
          {i < 3 ? <line x1={x + 24} y1={46} x2={x + 46} y2={46} className={line} {...LINE} /> : null}
        </g>
      ))}
      {bar(164, 44, 12, 4)}
      <line x1={24} y1={176} x2={176} y2={176} className={line} {...LINE} />
      <line x1={24} y1={96} x2={24} y2={176} className={line} {...LINE} />
      <polyline points="24,160 50,150 72,158 96,124 120,134 146,108 176,116" fill="none" className={line} {...LINE} />
    </g>,
    // Cloud and security: four regions and a shield.
    <g key="cloud">
      {box(24, 24, 70, 70, true)}
      {box(106, 24, 70, 70, true)}
      {box(24, 106, 70, 70, true)}
      {box(106, 106, 70, 70, true)}
      <path
        d="M100 76 L122 85 V102 C122 115 111 123 100 127 C89 123 78 115 78 102 V85 Z"
        className={`fill-white ${line}`}
        {...LINE}
      />
      {bar(94, 96, 12, 10)}
    </g>,
  ];
  return <g className={`transition-opacity duration-500 ${s === "above" ? "opacity-0" : "opacity-100"}`}>{art[index]}</g>;
}

/**
 * The stack as five exploded isometric plates (after the Medusa reference). Scrolling spreads the
 * collapsed stack apart (GSAP scrub). The active plate turns blue and every plate above it turns into
 * a dashed ghost, so you look straight down onto it. Labels sit on the left, real logos on the right.
 */
export function LayerStack({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: scope.current, start: "top 88%", end: "center 55%", scrub: 0.6 };
        gsap.from(".ls-plate", {
          // Plates render bottom-first, so read each plate's own index rather than its DOM position.
          y: (_: number, el: SVGGElement) => (2 - Number(el.dataset.k)) * (SPREAD - COLLAPSED),
          ease: "none",
          scrollTrigger: trigger,
        });
        gsap.from(".ls-label", { opacity: 0, ease: "none", scrollTrigger: trigger });
      });
      return () => mm.revert();
    },
    { scope },
  );

  const height = SIZE + 4 * SPREAD + 20;

  return (
    <div ref={scope} className="mx-auto w-full max-w-[400px] lg:max-w-[420px]">
      <svg viewBox={`${-EDGE - 16} -16 ${EDGE * 2 + 32} ${height}`} className="h-auto w-full overflow-visible" aria-hidden>
        {STACK_LAYERS.map((layer, k) => k)
          .reverse()
          .map((k) => {
            const layer = STACK_LAYERS[k];
            const s: PlateState = k < active ? "above" : k === active ? "active" : "below";
            return (
              <g key={layer.key} className="ls-plate" data-k={k}>
                <g transform={`translate(0 ${k * SPREAD})`}>
                  <g onMouseEnter={() => onSelect(k)} className="cursor-pointer">
                    <IsoBox x={0} y={0} w={SIZE} d={SIZE} h={THICK} tone={PLATE_TONE[s]}>
                      <PlateArt index={k} s={s} />
                    </IsoBox>
                  </g>
                  <g className="ls-label max-lg:hidden">
                    <line
                      x1={-EDGE - 8}
                      y1={MID_Y + 4}
                      x2={-EDGE - 56}
                      y2={MID_Y + 4}
                      className={`${s === "active" ? "stroke-brand" : "stroke-ink/25"} transition-[stroke] duration-500`}
                      {...LINE}
                      strokeDasharray="2 3"
                    />
                    <text
                      x={-EDGE - 64}
                      y={MID_Y + 8}
                      textAnchor="end"
                      className={`cursor-pointer font-mono text-[11px] tracking-[0.02em] uppercase transition-[fill] duration-500 ${s === "active" ? "fill-brand" : "fill-muted"}`}
                      onMouseEnter={() => onSelect(k)}
                    >
                      {`L.0${k + 1}  ${layer.label}`}
                    </text>
                    <line
                      x1={EDGE + 8}
                      y1={MID_Y + 4}
                      x2={EDGE + 56}
                      y2={MID_Y + 4}
                      className={`${s === "active" ? "stroke-brand" : "stroke-ink/25"} transition-[stroke] duration-500`}
                      {...LINE}
                      strokeDasharray="2 3"
                    />
                    <g className={`transition-[opacity,filter] duration-500 ${s === "active" ? "opacity-100" : "opacity-35 grayscale"}`}>
                      {layer.tools.map((tool, j) => {
                        const src = logoSrc(tool);
                        return src ? (
                          <image key={tool} href={src} x={EDGE + 64 + j * 22} y={MID_Y - 4} width={16} height={16} />
                        ) : null;
                      })}
                    </g>
                  </g>
                </g>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
