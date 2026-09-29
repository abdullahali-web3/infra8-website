import { logoSrc } from "@/lib/logos";
import { FaceLogo, IsoBox, IsoSvg, LINE } from "./Iso";

const LIFT = "transition-[translate] duration-500 ease-out group-hover/card:-translate-y-3";
// Accents are ink at rest and turn blue while the card is hovered.
const INK_TO_BRAND = "fill-ink/70 transition-[fill] duration-500 group-hover/card:fill-brand";

/** A logo drawn flat on a sheet at a given spot (inside an IsoBox's top-face coordinates). */
function SheetLogo({ name, x, y, w, h }: { name: string; x: number; y: number; w: number; h: number }) {
  const src = logoSrc(name);
  return src ? <image href={src} x={x} y={y} width={w} height={h} /> : null;
}

/** Scope document: a stack of sheets, the top one (user flows, from Figma) lifting on hover. */
function Scope() {
  return (
    <IsoSvg viewBox="-104 -62 230 180" origin={[0, 0]}>
      <IsoBox x={0} y={0} z={0} w={120} d={86} h={3} />
      <IsoBox x={0} y={0} z={10} w={120} d={86} h={3} />
      <IsoBox x={0} y={0} z={20} w={120} d={86} h={3} />
      <g className={LIFT}>
        <IsoBox x={0} y={0} z={30} w={120} d={86} h={3}>
          <SheetLogo name="Figma" x={9} y={7} w={12} h={12} />
          <rect x={26} y={10} width={36} height={6} className="fill-ink" />
          <rect x={10} y={24} width={96} height={2.5} className="fill-ink/25" />
          <rect x={10} y={30} width={80} height={2.5} className="fill-ink/25" />
          {[42, 54, 66].map((y, i) => (
            <g key={y}>
              <rect x={10} y={y} width={6} height={6} fill="none" className="stroke-ink" {...LINE} />
              {i < 2 ? <rect x={11.5} y={y + 1.5} width={3} height={3} className={INK_TO_BRAND} /> : null}
              <rect x={22} y={y + 2} width={50 - i * 8} height={2.5} className="fill-ink/30" />
            </g>
          ))}
          <rect x={82} y={52} width={28} height={16} className={INK_TO_BRAND} />
          <rect x={86} y={58} width={20} height={3} className="fill-white" />
        </IsoBox>
      </g>
    </IsoSvg>
  );
}

const BOARD = 160;
const NODE = 30;

// A typical MVP system map: web client, API hub, cache, database and the cloud it runs on.
const NODES = [
  { x: 10, y: 10, logo: "React" },
  { x: 120, y: 10, logo: "Redis" },
  { x: 65, y: 65, logo: "Node.js", hub: true },
  { x: 10, y: 120, logo: "PostgreSQL" },
  { x: 120, y: 120, logo: "AWS" },
];

/** Architecture diagram: services as blocks on a board, wired to the API hub, each showing its tool. */
function Architecture() {
  const c = (n: { x: number; y: number }) => [n.x + NODE / 2, n.y + NODE / 2] as const;
  const hub = c(NODES[2]);
  return (
    <IsoSvg viewBox="-150 -34 300 212" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={BOARD} d={BOARD} h={6}>
        {NODES.filter((n) => !n.hub).map((n) => {
          const [x, y] = c(n);
          return (
            <line
              key={`${x}${y}`}
              x1={x}
              y1={y}
              x2={hub[0]}
              y2={hub[1]}
              className="iso-march stroke-ink/30 transition-[stroke] duration-500 group-hover/card:stroke-brand"
              {...LINE}
              strokeDasharray="3 3"
            />
          );
        })}
      </IsoBox>
      {NODES.map((n) => (
        <g key={`${n.x}-${n.y}`} className={n.hub ? LIFT : undefined}>
          <IsoBox x={n.x} y={n.y} z={6} w={NODE} d={NODE} h={n.hub ? 24 : 14} tone={n.hub ? "accent" : "paper"}>
            <FaceLogo name={n.logo} w={NODE} d={NODE} size={20} />
          </IsoBox>
        </g>
      ))}
    </IsoSvg>
  );
}

/** Audit report on an AWS account: findings listed on the sheet, ranked by height beside them. */
function Audit() {
  const bars = [40, 28, 18, 10];
  return (
    <IsoSvg viewBox="-112 -72 250 200" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={130} d={100} h={3}>
        <SheetLogo name="AWS" x={8} y={6} w={30} h={18} />
        <rect x={44} y={12} width={28} height={6} className="fill-ink" />
        <rect x={10} y={30} width={40} height={2.5} className="fill-ink/25" />
        <rect x={10} y={36} width={34} height={2.5} className="fill-ink/25" />
        <rect x={10} y={46} width={8} height={8} className="fill-warn" />
        <rect x={22} y={49} width={28} height={2.5} className="fill-ink/30" />
        <rect x={10} y={60} width={8} height={8} className="fill-ok" />
        <rect x={22} y={63} width={22} height={2.5} className="fill-ink/30" />
        <rect x={10} y={76} width={110} height={14} fill="none" className="stroke-ink/40" {...LINE} strokeDasharray="2 3" />
      </IsoBox>
      <g className={LIFT}>
        {bars.map((h, i) => (
          <IsoBox key={i} x={66 + i * 14} y={16} z={3} w={10} d={10} h={h} tone={i === 0 ? "accent" : "paper"} />
        ))}
      </g>
    </IsoSvg>
  );
}

export function DocIso({ kind }: { kind: "scope" | "arch" | "audit" }) {
  if (kind === "scope") return <Scope />;
  if (kind === "arch") return <Architecture />;
  return <Audit />;
}
