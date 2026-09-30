import { iso } from "@/lib/iso";
import { IsoBox, IsoPath, IsoSvg, LINE } from "./Iso";

const TILE = 40;
const PITCH = 48;
const H = 6;
const FLOAT_Z = 44;

const CELLS = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ i, j }))).sort((a, b) => a.i + a.j - (b.i + b.j));

/**
 * 404 scene: a 3×3 board with the middle tile missing (a dashed outline where it belongs) and the
 * lost tile hovering above it. Used only on the not-found page.
 */
export function NotFoundIso() {
  const slot = PITCH;
  const [lx, ly] = iso(slot + TILE, slot, FLOAT_Z + H);
  return (
    <IsoSvg viewBox="-135 -40 270 200" origin={[0, 0]}>
      {CELLS.map(({ i, j }) =>
        i === 1 && j === 1 ? (
          <IsoBox key="slot" x={slot} y={slot} w={TILE} d={TILE} h={0} tone="ghost" className="iso-march" />
        ) : (
          <IsoBox key={`${i}${j}`} x={i * PITCH} y={j * PITCH} w={TILE} d={TILE} h={H} />
        ),
      )}
      {/* Guides from the hovering tile's corners down to its empty slot. */}
      {[
        [slot, slot + TILE],
        [slot + TILE, slot],
        [slot + TILE, slot + TILE],
      ].map(([x, y]) => (
        <IsoPath key={`${x}${y}`} pts={[[x, y, 0], [x, y, FLOAT_Z]]} className="stroke-brand/40" strokeDasharray="2 3" />
      ))}
      <g className="iso-bob">
        <IsoBox x={slot} y={slot} z={FLOAT_Z} w={TILE} d={TILE} h={H} tone="brand">
          <text x={TILE / 2} y={TILE / 2 + 5} textAnchor="middle" fontSize={14} className="fill-brand font-display">
            ?
          </text>
        </IsoBox>
      </g>
      <polyline points={`${lx + 4},${ly - 2} ${lx + 30},${ly - 18} ${lx + 70},${ly - 18}`} fill="none" className="stroke-ink/40" {...LINE} />
      <circle cx={lx + 4} cy={ly - 2} r={2} className="fill-ink" />
      <text x={lx + 34} y={ly - 23} className="fill-ink font-mono text-[9px] tracking-wide uppercase">
        404
      </text>
    </IsoSvg>
  );
}
