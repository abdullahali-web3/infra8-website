import { iso, onRight } from "@/lib/iso";
import { IsoBox, IsoFloor, IsoPath, IsoSvg, LINE } from "./Iso";

const HOVER = "transition-[translate] duration-500 ease-out";

/** Launch: the MVP drawn as a dashed blueprint cube, with the first slabs built inside it. */
function Launch() {
  const [lx, ly] = iso(105, 25, 84);
  return (
    <IsoSvg viewBox="-160 -80 320 225" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={130} d={130} />
      <IsoBox x={33} y={33} w={64} d={64} h={18} />
      <IsoBox x={33} y={33} z={18} w={64} d={64} h={18} />
      <g className={`${HOVER} group-hover/card:-translate-y-2`}>
        <g className="iso-drop">
          <IsoBox x={33} y={33} z={36} w={64} d={64} h={18} tone="brand">
            <rect x={10} y={10} width={20} height={6} className="fill-brand" />
            <rect x={10} y={22} width={40} height={2} className="fill-brand/40" />
            <rect x={10} y={28} width={30} height={2} className="fill-brand/40" />
          </IsoBox>
        </g>
      </g>
      <IsoBox x={25} y={25} w={80} d={80} h={84} tone="ghost" className="iso-march" />
      {/* Callout: a leader from the blueprint's top corner to a mono tag. */}
      <polyline points={`${lx},${ly} ${lx + 26},${ly - 16} ${lx + 58},${ly - 16}`} fill="none" className="stroke-ink/40" {...LINE} />
      <circle cx={lx} cy={ly} r={2} className="fill-ink" />
      <text x={lx + 30} y={ly - 21} className="fill-ink font-mono text-[9px] tracking-wide uppercase">
        v1.0 scope
      </text>
    </IsoSvg>
  );
}

/** Build: blocks stepping up, the newest one dropping onto the tallest. */
function Build() {
  return (
    <IsoSvg viewBox="-160 -86 320 240" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={150} d={150} />
      <IsoBox x={15} y={55} w={36} d={40} h={28} />
      <IsoBox x={55} y={55} w={36} d={40} h={56} tone="brand" />
      <IsoBox x={95} y={55} w={36} d={40} h={84} tone="brand" />
      <g className={`${HOVER} group-hover/card:-translate-y-2`}>
        <g className="iso-drop">
          <IsoBox x={95} y={55} z={84} w={36} d={40} h={16} tone="solid" />
        </g>
      </g>
      <IsoPath pts={[[0, 150, 0], [0, 150, 18]]} className="stroke-ink/30" />
      <IsoPath pts={[[150, 0, 0], [150, 0, 18]]} className="stroke-ink/30" />
      <IsoPath pts={[[15, 118, 0], [131, 118, 0]]} className="stroke-brand/60" strokeDasharray="2 3" />
      <IsoPath pts={[[15, 114, 0], [15, 122, 0]]} className="stroke-brand/60" />
      <IsoPath pts={[[131, 114, 0], [131, 122, 0]]} className="stroke-brand/60" />
    </IsoSvg>
  );
}

const RACKS = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ i, j }))).sort((a, b) => a.i + a.j - (b.i + b.j));

/** Scale: a 3×3 cluster of two-unit racks on a wired floor, status lights blinking. */
function Scale() {
  return (
    <IsoSvg viewBox="-160 -52 320 225" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={156} d={156} />
      {[54, 102].map((v) => (
        <g key={v}>
          <IsoPath pts={[[v, 0, 0], [v, 156, 0]]} className="stroke-brand/50" strokeDasharray="3 3" />
          <IsoPath pts={[[0, v, 0], [156, v, 0]]} className="stroke-brand/50" strokeDasharray="3 3" />
        </g>
      ))}
      {RACKS.map(({ i, j }) => {
        const x = 12 + 48 * i;
        const y = 12 + 48 * j;
        const hub = i === 1 && j === 1;
        const tone = hub ? "brand" : "paper";
        return (
          <g key={`${i}-${j}`} className={hub ? `${HOVER} group-hover/card:-translate-y-1.5` : undefined}>
            {[0, 19].map((z, u) => (
              <g key={z}>
                <IsoBox x={x} y={y} z={z} w={36} d={36} h={17} tone={tone} />
                <g transform={onRight(x + 36, y + 36, z + 17)}>
                  <rect
                    x={7}
                    y={6}
                    width={5}
                    height={3}
                    className={`iso-blink ${hub ? "fill-brand" : (i + j + u) % 3 === 0 ? "fill-ok" : "fill-ink/60"}`}
                    style={{ animationDelay: `${(i * 3 + j + u) * 0.23}s` }}
                  />
                  <rect x={15} y={7} width={14} height={1} className="fill-ink/30" />
                </g>
              </g>
            ))}
          </g>
        );
      })}
    </IsoSvg>
  );
}

export function StageIso({ stage }: { stage: "launch" | "build" | "scale" }) {
  if (stage === "launch") return <Launch />;
  if (stage === "build") return <Build />;
  return <Scale />;
}
