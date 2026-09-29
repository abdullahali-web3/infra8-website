import { iso, onRight } from "@/lib/iso";
import { FaceLogo, IsoBox, IsoFloor, IsoPath, IsoSvg, LINE, LogoTile } from "./Iso";

const HOVER = "transition-[translate] duration-500 ease-out";
// Accents are ink at rest and turn blue while the card is hovered.
const INK_TO_BRAND = "fill-ink/70 transition-[fill] duration-500 group-hover/card:fill-brand";
const DIM_LINE = "stroke-ink/20 transition-[stroke] duration-500 group-hover/card:stroke-brand/60";

/**
 * Launch: the MVP as a dashed blueprint cube with the product being built inside it (React on top),
 * and the tools around it: designed in Figma, built with Next.js, shipped on Vercel.
 */
function Launch() {
  const [lx, ly] = iso(115, 35, 84);
  return (
    <IsoSvg viewBox="-160 -82 320 240" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={150} d={150} />
      <LogoTile name="Figma" x={2} y={114} />
      <LogoTile name="Vercel" x={114} y={2} />
      <IsoBox x={43} y={43} w={64} d={64} h={18} />
      <IsoBox x={43} y={43} z={18} w={64} d={64} h={18} />
      <g className={`${HOVER} group-hover/card:-translate-y-2`}>
        <g className="iso-drop">
          <IsoBox x={43} y={43} z={36} w={64} d={64} h={18} tone="accent">
            <FaceLogo name="React" w={64} d={64} size={34} />
          </IsoBox>
        </g>
      </g>
      <LogoTile name="Next.js" x={118} y={118} />
      <IsoBox x={35} y={35} w={80} d={80} h={84} tone="ghost" className="iso-march" />
      {/* Callout: a leader from the blueprint's top corner to a mono tag. */}
      <polyline points={`${lx},${ly} ${lx + 26},${ly - 16} ${lx + 58},${ly - 16}`} fill="none" className="stroke-ink/40" {...LINE} />
      <circle cx={lx} cy={ly} r={2} className="fill-ink" />
      <text x={lx + 30} y={ly - 21} className="fill-ink font-mono text-[9px] tracking-wide uppercase">
        v1.0 scope
      </text>
    </IsoSvg>
  );
}

/**
 * Build: the live product's layers stepping down towards the viewer (PostgreSQL, React, Node.js) so
 * every top face and its logo stays visible; the next release drops in from GitHub on the tallest.
 */
function Build() {
  return (
    <IsoSvg viewBox="-160 -100 320 250" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={150} d={150} />
      <IsoBox x={15} y={55} w={36} d={40} h={84} tone="accent">
        <FaceLogo name="PostgreSQL" w={36} d={40} size={24} />
      </IsoBox>
      <g className={`${HOVER} group-hover/card:-translate-y-2`}>
        <g className="iso-drop">
          <IsoBox x={15} y={55} z={84} w={36} d={40} h={16} tone="accentSolid">
            <FaceLogo name="GitHub" w={36} d={40} size={22} />
          </IsoBox>
        </g>
      </g>
      <IsoBox x={55} y={55} w={36} d={40} h={56} tone="accent">
        <FaceLogo name="React" w={36} d={40} size={24} />
      </IsoBox>
      <IsoBox x={95} y={55} w={36} d={40} h={28}>
        <FaceLogo name="Node.js" w={36} d={40} size={24} />
      </IsoBox>
      <IsoPath pts={[[0, 150, 0], [0, 150, 18]]} className="stroke-ink/30" />
      <IsoPath pts={[[150, 0, 0], [150, 0, 18]]} className="stroke-ink/30" />
      <IsoPath pts={[[15, 118, 0], [131, 118, 0]]} className={DIM_LINE} strokeDasharray="2 3" />
      <IsoPath pts={[[15, 114, 0], [15, 122, 0]]} className={DIM_LINE} />
      <IsoPath pts={[[131, 114, 0], [131, 122, 0]]} className={DIM_LINE} />
    </IsoSvg>
  );
}

const RACKS = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ i, j }))).sort((a, b) => a.i + a.j - (b.i + b.j));

// What each rack runs (top face logo). The hub in the middle is the main cloud account.
const RACK_LOGOS: Record<string, string> = {
  "0-0": "Terraform",
  "1-0": "Google Cloud",
  "2-0": "Kubernetes",
  "0-2": "Docker",
  "1-1": "AWS",
  "1-2": "Azure",
  "2-2": "Grafana",
};

/** Scale: a 3×3 cluster of two-unit racks on a wired floor, each running part of the cloud stack. */
function Scale() {
  return (
    <IsoSvg viewBox="-160 -52 320 225" origin={[0, 0]}>
      <IsoFloor x={0} y={0} w={156} d={156} />
      {[54, 102].map((v) => (
        <g key={v}>
          <IsoPath pts={[[v, 0, 0], [v, 156, 0]]} className={DIM_LINE} strokeDasharray="3 3" />
          <IsoPath pts={[[0, v, 0], [156, v, 0]]} className={DIM_LINE} strokeDasharray="3 3" />
        </g>
      ))}
      {RACKS.map(({ i, j }) => {
        const x = 12 + 48 * i;
        const y = 12 + 48 * j;
        const hub = i === 1 && j === 1;
        const tone = hub ? "accent" : "paper";
        const logo = RACK_LOGOS[`${i}-${j}`];
        return (
          <g key={`${i}-${j}`} className={hub ? `${HOVER} group-hover/card:-translate-y-1.5` : undefined}>
            {[0, 19].map((z, u) => (
              <g key={z}>
                <IsoBox x={x} y={y} z={z} w={36} d={36} h={17} tone={tone}>
                  {u === 1 && logo ? <FaceLogo name={logo} w={36} d={36} size={22} /> : null}
                </IsoBox>
                <g transform={onRight(x + 36, y + 36, z + 17)}>
                  <rect
                    x={7}
                    y={6}
                    width={5}
                    height={3}
                    className={`iso-blink ${hub ? INK_TO_BRAND : (i + j + u) % 3 === 0 ? "fill-ok" : "fill-ink/60"}`}
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
