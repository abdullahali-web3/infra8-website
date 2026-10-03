import { iso, onLeft } from "@/lib/iso";
import { IsoBox, IsoPath, IsoSvg, LINE, LogoTile, type IsoTone } from "./Iso";

const BOARD = 8;
const DESK = 74;

type Desk = { x: number; y: number; logo: string; open?: boolean };

// Four desks on one team board, back to front. The front one is empty: the open seat.
const DESKS: Desk[] = [
  { x: 18, y: 18, logo: "Terraform" },
  { x: 108, y: 18, logo: "Python" },
  { x: 18, y: 108, logo: "React" },
  { x: 108, y: 108, logo: "Flutter", open: true },
];

/** A laptop on a desk: a thin base and an upright screen with a few lines of code on it. */
function Laptop({ x, y, z, tone, ghost }: { x: number; y: number; z: number; tone: IsoTone; ghost?: boolean }) {
  const w = 38;
  return (
    <g>
      {/* Screen: a thin upright slab; its front face carries the code. */}
      <IsoBox x={x} y={y} z={z} w={w} d={2} h={26} tone={ghost ? "ghost" : tone} />
      {ghost ? null : (
        <g transform={onLeft(x, y + 2, z + 26)}>
          <rect x={4} y={4} width={w - 8} height={18} className="fill-ink" />
          {[7, 11, 15].map((v, i) => (
            <rect key={v} x={7 + (i === 1 ? 4 : 0)} y={v} width={i === 0 ? 14 : i === 1 ? 18 : 10} height={1.6} className={i === 1 ? "fill-brand-mid" : "fill-white/70"} />
          ))}
          <rect x={7} y={18} width={3} height={1.6} className="iso-blink fill-ok" />
        </g>
      )}
      {/* Base, in front of the screen. */}
      <IsoBox x={x} y={y + 2} z={z} w={w} d={22} h={2} tone={ghost ? "ghost" : "paper"} />
    </g>
  );
}

/** Careers hero: a team board of four desks, three taken and one open seat waiting for the next engineer. */
export function CareersIso() {
  const top = BOARD;
  const open = DESKS[3];
  // Callout anchor: the middle of the open desk; the leader runs out past the board's front edge.
  const [cx, cy] = iso(open.x + DESK / 2, open.y + DESK / 2, top + 4);
  return (
    <IsoSvg viewBox="-190 -48 380 270" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={200} d={200} h={BOARD} />

      {/* The team's shared wiring: every desk joins the same line. */}
      <IsoPath pts={[[55, 100, top], [145, 100, top]]} className="stroke-ink/30" strokeDasharray="2 3" />
      <IsoPath pts={[[100, 55, top], [100, 145, top]]} className="iso-march stroke-brand" strokeDasharray="3 3" />

      {DESKS.map((d) => (
        <g key={d.logo}>
          <IsoBox x={d.x} y={d.y} z={top} w={DESK} d={DESK} h={4} tone={d.open ? "brand" : "paper"} />
          <Laptop x={d.x + 10} y={d.y + 14} z={top + 4} tone="paper" ghost={d.open} />
          {d.open ? (
            <IsoBox x={d.x + 50} y={d.y + 44} z={top + 4} w={18} d={18} h={3} tone="ghost" />
          ) : (
            <LogoTile name={d.logo} x={d.x + 50} y={d.y + 44} z={top + 4} size={18} />
          )}
        </g>
      ))}

      {/* Callout on the open seat. */}
      <polyline points={`${cx},${cy} ${cx + 66},${cy + 44} ${cx + 116},${cy + 44}`} fill="none" className="stroke-ink/40" {...LINE} />
      <circle cx={cx} cy={cy} r={2} className="fill-brand" />
      <text x={cx + 70} y={cy + 39} className="fill-ink font-mono text-[9px] tracking-wide uppercase">
        Open seat
      </text>
    </IsoSvg>
  );
}
