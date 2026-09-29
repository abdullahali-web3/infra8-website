import { iso } from "@/lib/iso";
import { IsoBox, IsoSvg, LINE } from "./Iso";

const TILE = 60;
const PITCH = 76;
const H = 8;

type Cell = { i: number; j: number; logo?: string; hub?: boolean };

// A 4×4 board of hatched tiles. Nine carry the tools from the original hero lattice, one is the blue hub.
const CELLS: Cell[] = [
  { i: 0, j: 0 },
  { i: 1, j: 0 },
  { i: 2, j: 0, logo: "linux" },
  { i: 3, j: 0, logo: "nodejs" },
  { i: 0, j: 1, logo: "python" },
  { i: 1, j: 1, hub: true },
  { i: 2, j: 1, logo: "github" },
  { i: 3, j: 1, logo: "react" },
  { i: 0, j: 2 },
  { i: 1, j: 2, logo: "docker" },
  { i: 2, j: 2, logo: "googlecloud" },
  { i: 3, j: 2 },
  { i: 0, j: 3, logo: "aws" },
  { i: 1, j: 3 },
  { i: 2, j: 3, logo: "azure" },
  { i: 3, j: 3 },
].sort((a, b) => a.i + a.j - (b.i + b.j));

const HUB_H = 30;

/**
 * Hero illustration: the tools we build and run with, as tiles on an isometric board. The tiles drop
 * in on load, then a slow wave rolls across the board; a hovered tile lifts. CSS only.
 */
export function HeroIso() {
  const hub = iso(PITCH + TILE / 2, PITCH + TILE / 2, HUB_H + 28);
  return (
    <IsoSvg viewBox="-262 -78 524 380" origin={[0, 0]}>
      {CELLS.map((c) => {
        const x = c.i * PITCH;
        const y = c.j * PITCH;
        const h = c.hub ? HUB_H : H;
        const [lx, ly] = iso(x + TILE / 2, y + TILE / 2, h);
        const wave = (c.i + c.j) * 0.32;
        return (
          <g key={`${c.i}${c.j}`} className="iso-in" style={{ animationDelay: `${0.35 + (c.i + c.j) * 0.07}s` }}>
            <g className="iso-bob" style={{ animationDelay: `${wave}s`, animationDuration: "5s" }}>
              <g className="transition-[translate] duration-500 ease-out hover:-translate-y-2.5">
                <IsoBox x={x} y={y} w={TILE} d={TILE} h={h} tone={c.hub ? "brand" : "paper"}>
                  {c.hub ? (
                    <>
                      <rect x={14} y={14} width={32} height={32} fill="none" className="stroke-brand" {...LINE} />
                      <rect x={24} y={24} width={12} height={12} className="fill-brand" />
                    </>
                  ) : null}
                </IsoBox>
                {c.logo ? (
                  <image href={`/content/logos/${c.logo}.svg`} x={lx - 15} y={ly - 17} width={30} height={30} />
                ) : null}
              </g>
            </g>
          </g>
        );
      })}

      {/* A small block hovering over the hub, with a callout to the mono label. */}
      <g className="iso-in" style={{ animationDelay: "1.1s" }}>
        <g className="iso-bob" style={{ animationDuration: "3.2s" }}>
          <IsoBox x={PITCH + 18} y={PITCH + 18} z={HUB_H + 22} w={24} d={24} h={24} tone="solid" />
        </g>
        <polyline
          points={`${hub[0] + 22},${hub[1] - 10} ${hub[0] + 70},${hub[1] - 46} ${hub[0] + 150},${hub[1] - 46}`}
          fill="none"
          className="stroke-ink/40"
          {...LINE}
        />
        <circle cx={hub[0] + 22} cy={hub[1] - 10} r={2.2} className="fill-ink" />
        <text x={hub[0] + 76} y={hub[1] - 52} className="fill-ink font-mono text-[10px] tracking-wide uppercase">
          build + run
        </text>
      </g>
    </IsoSvg>
  );
}
