import { iso, onRight, type P3 } from "@/lib/iso";
import { FaceLogo, IsoBox, IsoPath, IsoSvg, LINE, LogoTile } from "./Iso";

const SLAB = 6;
const SIZE = 84;

// Three platforms at the same depth, stepping up to the right: launch, build, run.
const STAGES = [
  { key: "launch", label: "01 Launch", x: 0, y: 150, z: 0 },
  { key: "build", label: "02 Build", x: 90, y: 60, z: 26 },
  { key: "run", label: "03 Run", x: 180, y: -30, z: 52 },
] as const;

/** A raised platform: dashed posts down to a dotted footprint, so the steps read as elevation. */
function Platform({ x, y, z }: { x: number; y: number; z: number }) {
  const corners: P3[] = [
    [x, y + SIZE, 0],
    [x + SIZE, y + SIZE, 0],
    [x + SIZE, y, 0],
  ];
  return (
    <g>
      {z > 0 ? (
        <>
          <polygon
            points={[
              [x, y, 0],
              [x + SIZE, y, 0],
              [x + SIZE, y + SIZE, 0],
              [x, y + SIZE, 0],
            ]
              .map(([a, b, c]) => iso(a, b, c).join(","))
              .join(" ")}
            fill="none"
            className="stroke-ink/20"
            {...LINE}
            strokeDasharray="2 4"
          />
          {corners.map(([cx, cy], i) => (
            <IsoPath key={i} pts={[[cx, cy, 0], [cx, cy, z]]} className="stroke-ink/25" strokeDasharray="2 3" />
          ))}
        </>
      ) : null}
      <IsoBox x={x} y={y} z={z} w={SIZE} d={SIZE} h={SLAB} />
    </g>
  );
}

/** Services hub hero: one team taking a product from launch, through build, to running it at scale. */
export function ServicesIso() {
  const [l, b, r] = STAGES;
  const lz = l.z + SLAB;
  const bz = b.z + SLAB;
  const rz = r.z + SLAB;
  return (
    <IsoSvg viewBox="-215 -50 480 262" origin={[0, 0]}>
      {STAGES.map((s) => (
        <Platform key={s.key} x={s.x} y={s.y} z={s.z} />
      ))}

      {/* The path the product takes, climbing from stage to stage. */}
      <IsoPath
        pts={[
          [l.x + 62, l.y + 30, lz],
          [b.x + 30, b.y + 66, bz],
          [b.x + 62, b.y + 30, bz],
          [r.x + 26, r.y + 64, rz],
        ]}
        className="iso-march stroke-brand"
        strokeDasharray="3 3"
      />

      {/* 01 Launch: the scope on a blueprint sheet, and the first block dropping into place. */}
      <IsoBox x={l.x + 10} y={l.y + 12} z={lz} w={34} d={60} h={2}>
        <rect x={5} y={6} width={18} height={3} className="fill-ink/70" />
        {[14, 20, 26, 32, 38].map((v) => (
          <rect key={v} x={5} y={v} width={v % 12 === 2 ? 16 : 24} height={1.4} className="fill-ink/30" />
        ))}
        <rect x={5} y={46} width={10} height={8} fill="none" className="stroke-brand" {...LINE} />
      </IsoBox>
      <LogoTile name="Figma" x={l.x + 52} y={l.y + 50} z={lz} size={26} />
      <g className="iso-drop">
        <IsoBox x={l.x + 50} y={l.y + 10} z={lz} w={28} d={28} h={20} tone="brand">
          <FaceLogo name="Next.js" w={28} d={28} size={18} />
        </IsoBox>
      </g>

      {/* 02 Build: the product's layers stacked into one tower, the next release landing on top. */}
      <LogoTile name="GitHub" x={b.x + 52} y={b.y + 52} z={bz} size={26} />
      <IsoBox x={b.x + 12} y={b.y + 12} z={bz} w={38} d={38} h={18}>
        <FaceLogo name="PostgreSQL" w={38} d={38} size={22} />
      </IsoBox>
      <IsoBox x={b.x + 12} y={b.y + 12} z={bz + 20} w={38} d={38} h={18}>
        <FaceLogo name="Node.js" w={38} d={38} size={22} />
      </IsoBox>
      <g className="iso-drop">
        <IsoBox x={b.x + 12} y={b.y + 12} z={bz + 40} w={38} d={38} h={18} tone="brand">
          <FaceLogo name="React" w={38} d={38} size={22} />
        </IsoBox>
      </g>

      {/* 03 Run: a rack in the cloud, watched and orchestrated. */}
      {[0, 14, 28].map((dz, u) => (
        <g key={dz}>
          <IsoBox x={r.x + 10} y={r.y + 10} z={rz + dz} w={46} d={40} h={12} tone={u === 2 ? "solid" : "paper"}>
            {u === 2 ? <FaceLogo name="AWS" w={46} d={40} size={24} /> : null}
          </IsoBox>
          <g transform={onRight(r.x + 56, r.y + 50, rz + dz + 12)}>
            <rect
              x={6}
              y={4}
              width={4}
              height={3}
              className={`iso-blink ${u === 1 ? "fill-ok" : u === 2 ? "fill-white" : "fill-ink/50"}`}
              style={{ animationDelay: `${u * 0.4}s` }}
            />
            <rect x={14} y={5} width={16} height={1} className={u === 2 ? "fill-white/60" : "fill-ink/30"} />
          </g>
        </g>
      ))}
      <LogoTile name="Kubernetes" x={r.x + 62} y={r.y + 14} z={rz} size={24} />
      <LogoTile name="Grafana" x={r.x + 58} y={r.y + 54} z={rz} size={24} />

      {/* Stage labels: one upright row under the platforms' front corners, all at floor depth. */}
      {STAGES.map((s) => {
        const [tx, ty] = iso(s.x + SIZE, s.y + SIZE, 0);
        return (
          <g key={s.key}>
            <line x1={tx} y1={ty + 4} x2={tx} y2={ty + 12} className="stroke-ink/30" {...LINE} />
            <text x={tx} y={ty + 24} textAnchor="middle" className="fill-ink/70 font-mono text-[9px] tracking-wide uppercase">
              {s.label}
            </text>
          </g>
        );
      })}
    </IsoSvg>
  );
}
