import { IsoBox, IsoSvg, LINE } from "./Iso";

const LIFT = "transition-[translate] duration-500 ease-out group-hover/card:-translate-y-3";

/** Scope document: a stack of sheets, the top one lifting on hover. */
function Scope() {
  return (
    <IsoSvg viewBox="-104 -62 230 180" origin={[0, 0]}>
      <IsoBox x={0} y={0} z={0} w={120} d={86} h={3} />
      <IsoBox x={0} y={0} z={10} w={120} d={86} h={3} />
      <IsoBox x={0} y={0} z={20} w={120} d={86} h={3} />
      <g className={LIFT}>
        <IsoBox x={0} y={0} z={30} w={120} d={86} h={3}>
          <rect x={10} y={10} width={40} height={7} className="fill-ink" />
          <rect x={10} y={24} width={96} height={2.5} className="fill-ink/25" />
          <rect x={10} y={30} width={80} height={2.5} className="fill-ink/25" />
          {[42, 54, 66].map((y, i) => (
            <g key={y}>
              <rect x={10} y={y} width={6} height={6} fill="none" className="stroke-ink" {...LINE} />
              {i < 2 ? <rect x={11.5} y={y + 1.5} width={3} height={3} className="fill-brand" /> : null}
              <rect x={22} y={y + 2} width={50 - i * 8} height={2.5} className="fill-ink/30" />
            </g>
          ))}
          <rect x={82} y={52} width={28} height={16} className="fill-brand" />
          <rect x={86} y={58} width={20} height={3} className="fill-white" />
        </IsoBox>
      </g>
    </IsoSvg>
  );
}

const NODES = [
  { x: 20, y: 20 },
  { x: 110, y: 20 },
  { x: 65, y: 65, hub: true },
  { x: 20, y: 110 },
  { x: 110, y: 110 },
];

/** Architecture diagram: services as blocks on a board, wired to a blue hub. */
function Architecture() {
  const c = (n: { x: number; y: number }) => [n.x + 10, n.y + 10] as const;
  const hub = c(NODES[2]);
  return (
    <IsoSvg viewBox="-150 -48 300 215" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={150} d={150} h={6}>
        {NODES.filter((n) => !n.hub).map((n) => {
          const [x, y] = c(n);
          return (
            <line key={`${x}${y}`} x1={x} y1={y} x2={hub[0]} y2={hub[1]} className="iso-march stroke-brand" {...LINE} strokeDasharray="3 3" />
          );
        })}
        <line x1={30} y1={30} x2={120} y2={30} className="stroke-ink/40" {...LINE} />
      </IsoBox>
      {NODES.map((n) => (
        <g key={`${n.x}-${n.y}`} className={n.hub ? LIFT : undefined}>
          <IsoBox x={n.x} y={n.y} z={6} w={20} d={20} h={n.hub ? 24 : 14} tone={n.hub ? "brand" : "paper"} />
        </g>
      ))}
    </IsoSvg>
  );
}

/** Audit report: a report sheet with findings standing on it, ranked by height. */
function Audit() {
  const bars = [40, 28, 18, 10];
  return (
    <IsoSvg viewBox="-112 -72 250 200" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={130} d={100} h={3}>
        <rect x={10} y={10} width={44} height={7} className="fill-ink" />
        <rect x={10} y={24} width={40} height={2.5} className="fill-ink/25" />
        <rect x={10} y={30} width={34} height={2.5} className="fill-ink/25" />
        <rect x={10} y={44} width={8} height={8} className="fill-warn" />
        <rect x={22} y={47} width={28} height={2.5} className="fill-ink/30" />
        <rect x={10} y={58} width={8} height={8} className="fill-ok" />
        <rect x={22} y={61} width={22} height={2.5} className="fill-ink/30" />
        <rect x={10} y={76} width={110} height={14} fill="none" className="stroke-ink/40" {...LINE} strokeDasharray="2 3" />
      </IsoBox>
      <g className={LIFT}>
        {bars.map((h, i) => (
          <IsoBox key={i} x={66 + i * 14} y={16} z={3} w={10} d={10} h={h} tone={i === 0 ? "brand" : "paper"} />
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
