import { onRight } from "@/lib/iso";
import { IsoBox, IsoPath, IsoSvg, type IsoTone } from "./Iso";

type Item = { x: number; y: number; z: number; w: number; h: number; tone: IsoTone; led?: boolean; drop?: boolean };

const Z = 8;

// Build on the left (blocks stepping up), run on the right (a 2×2 rack cluster). Sorted back to front.
const ITEMS: Item[] = [
  { x: 120, y: 16, z: Z, w: 30, h: 16, tone: "paper", led: true },
  { x: 120, y: 16, z: Z + 18, w: 30, h: 16, tone: "paper", led: true },
  { x: 16, y: 130, z: Z, w: 34, h: 30, tone: "paper" },
  { x: 154, y: 16, z: Z, w: 30, h: 16, tone: "paper", led: true },
  { x: 154, y: 16, z: Z + 18, w: 30, h: 16, tone: "paper", led: true },
  { x: 120, y: 50, z: Z, w: 30, h: 16, tone: "paper", led: true },
  { x: 120, y: 50, z: Z + 18, w: 30, h: 16, tone: "brand", led: true },
  { x: 54, y: 130, z: Z, w: 34, h: 54, tone: "brand" },
  { x: 154, y: 50, z: Z, w: 30, h: 16, tone: "paper", led: true },
  { x: 154, y: 50, z: Z + 18, w: 30, h: 16, tone: "paper", led: true },
  { x: 92, y: 130, z: Z, w: 34, h: 80, tone: "brand" },
  { x: 92, y: 130, z: Z + 80, w: 34, h: 16, tone: "solid", drop: true },
];

/** Final CTA scene: one board where the product is built (left) and run (right), wired together. */
export function CtaIso() {
  return (
    <IsoSvg viewBox="-185 -48 370 258" origin={[0, 0]}>
      <IsoBox x={0} y={0} w={200} d={200} h={Z} />
      <IsoPath pts={[[109, 130, Z], [109, 104, Z], [137, 104, Z], [137, 84, Z]]} className="iso-march stroke-brand" strokeDasharray="3 3" />
      <IsoPath pts={[[16, 180, Z], [126, 180, Z]]} className="stroke-ink/30" strokeDasharray="2 3" />
      <IsoPath pts={[[120, 94, Z], [184, 94, Z]]} className="stroke-ink/30" strokeDasharray="2 3" />
      {ITEMS.map((it, i) => {
        const box = (
          <>
            <IsoBox x={it.x} y={it.y} z={it.z} w={it.w} d={it.w} h={it.h} tone={it.tone} />
            {it.led ? (
              <g transform={onRight(it.x + it.w, it.y + it.w, it.z + it.h)}>
                <rect
                  x={5}
                  y={5}
                  width={4}
                  height={3}
                  className={`iso-blink ${it.tone === "brand" ? "fill-brand" : i % 3 === 0 ? "fill-ok" : "fill-ink/50"}`}
                  style={{ animationDelay: `${i * 0.21}s` }}
                />
              </g>
            ) : null}
          </>
        );
        return it.drop ? (
          <g key={i} className="iso-drop">
            {box}
          </g>
        ) : (
          <g key={i}>{box}</g>
        );
      })}
    </IsoSvg>
  );
}
