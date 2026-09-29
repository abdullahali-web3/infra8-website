import { onRight } from "@/lib/iso";
import { IsoBox, IsoSvg, LINE, type IsoTone } from "./Iso";

export type StepState = "done" | "active" | "next";

type Tones = { base: IsoTone; accent: IsoTone; stroke: string; active: boolean };

function tones(state: StepState): Tones {
  const base: IsoTone = state === "next" ? "muted" : "paper";
  return {
    base,
    accent: state === "active" ? "brand" : base,
    stroke: state === "active" ? "stroke-brand" : state === "done" ? "stroke-ink" : "stroke-iso-muted",
    active: state === "active",
  };
}

const RING = "transition-[stroke] duration-500";

/* Product development */

function Estimate({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-62 -52 124 112" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={56} d={56} h={34} tone={t.base}>
        <circle cx={28} cy={28} r={20} fill="none" className={`${t.stroke} ${RING}`} {...LINE} />
        <g className={t.active ? "fx-spin" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={28} cy={28} r={20} fill="none" stroke="none" />
          <line x1={28} y1={28} x2={28} y2={12} className={`${t.stroke} ${RING}`} {...LINE} />
        </g>
        <line x1={28} y1={28} x2={39} y2={28} className={`${t.stroke} ${RING}`} {...LINE} />
      </IsoBox>
    </IsoSvg>
  );
}

function Sheets({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-56 -44 124 104" origin={[0, 0]}>
      <IsoBox x={0} y={0} z={0} w={64} d={46} h={3} tone={t.base} />
      <IsoBox x={0} y={0} z={12} w={64} d={46} h={3} tone={t.base} />
      <g className={t.active ? "iso-bob" : undefined}>
        <IsoBox x={0} y={0} z={24} w={64} d={46} h={3} tone={t.accent}>
          <rect x={8} y={8} width={22} height={5} className={t.active ? "fill-brand" : "fill-ink/50"} />
          <rect x={8} y={18} width={46} height={2} className="fill-ink/25" />
          <rect x={8} y={24} width={38} height={2} className="fill-ink/25" />
          <rect x={8} y={30} width={42} height={2} className="fill-ink/25" />
        </IsoBox>
      </g>
    </IsoSvg>
  );
}

function Weeks({ t }: { t: Tones }) {
  const hs = [12, 22, 32, 44];
  return (
    <IsoSvg viewBox="-40 -50 124 108" origin={[0, 0]}>
      {hs.map((h, i) =>
        i === 3 ? (
          <g key={i} className={t.active ? "iso-drop" : undefined}>
            <IsoBox x={i * 24} y={10} w={18} d={18} h={h} tone={t.accent} />
          </g>
        ) : (
          <IsoBox key={i} x={i * 24} y={10} w={18} d={18} h={h} tone={t.base} />
        ),
      )}
    </IsoSvg>
  );
}

function Handover({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-56 -60 112 114" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={52} d={52} h={30} tone={t.base}>
        <rect x={6} y={6} width={40} height={40} fill="none" className={`${t.stroke} ${RING}`} {...LINE} strokeDasharray="2 3" />
      </IsoBox>
      <g className={t.active ? "iso-bob" : undefined}>
        <IsoBox x={0} y={0} z={44} w={52} d={52} h={5} tone={t.accent} />
      </g>
    </IsoSvg>
  );
}

/* Cloud and DevOps */

const TILES = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ i, j }))).sort((a, b) => a.i + a.j - (b.i + b.j));

function Audit({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-64 -40 128 108" origin={[0, 0]}>
      {TILES.map(({ i, j }) => {
        const hot = i === 1 && j === 1;
        return (
          <IsoBox
            key={`${i}${j}`}
            x={i * 24}
            y={j * 24}
            w={20}
            d={20}
            h={hot ? 18 : 4}
            tone={hot ? t.accent : t.base}
          />
        );
      })}
      <g transform="translate(0 -26)">
        <IsoBox x={-4} y={-4} w={76} d={76} h={0} tone="ghost" className={t.active ? "iso-march" : undefined} />
      </g>
    </IsoSvg>
  );
}

function Bars({ t }: { t: Tones }) {
  const hs = [52, 38, 26, 14];
  return (
    <IsoSvg viewBox="-40 -58 118 112" origin={[0, 0]}>
      {hs.map((h, i) => (
        <IsoBox key={i} x={i * 20} y={16} w={14} d={14} h={h} tone={i === 0 ? t.accent : t.base} />
      ))}
    </IsoSvg>
  );
}

function Fix({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-54 -46 108 104" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={26} d={26} h={26} tone={t.base} />
      <IsoBox x={28} y={0} w={26} d={26} h={26} tone={t.base} />
      <IsoBox x={0} y={28} w={26} d={26} h={26} tone={t.base} />
      <g className={t.active ? "iso-drop" : undefined}>
        <IsoBox x={28} y={28} w={26} d={26} h={26} tone={t.accent} />
      </g>
    </IsoSvg>
  );
}

function Retainer({ t }: { t: Tones }) {
  return (
    <IsoSvg viewBox="-58 -62 116 118" origin={[0, 0]}>
      {[0, 15, 30].map((z, u) => (
        <g key={z}>
          <IsoBox x={0} y={0} z={z} w={46} d={46} h={12} tone={u === 2 ? t.accent : t.base} />
          <g transform={onRight(46, 46, z + 12)}>
            <rect
              x={6}
              y={4}
              width={4}
              height={3}
              className={`${t.active ? "iso-blink fill-brand" : "fill-ink/40"}`}
              style={{ animationDelay: `${u * 0.3}s` }}
            />
          </g>
        </g>
      ))}
      <g transform="translate(0 -6)">
        <IsoBox x={-12} y={-12} z={20} w={70} d={70} h={0} tone="ghost" className={t.active ? "iso-march" : undefined} />
      </g>
    </IsoSvg>
  );
}

const PRODUCT = [Estimate, Sheets, Weeks, Handover];
const INFRA = [Audit, Bars, Fix, Retainer];

export function StepIso({ track, index, state }: { track: "product" | "infra"; index: number; state: StepState }) {
  const Art = (track === "product" ? PRODUCT : INFRA)[index];
  return Art ? <Art t={tones(state)} /> : null;
}
