import { iso, points } from "@/lib/iso";
import { IsoBox, IsoPath, IsoSvg, LINE } from "./Iso";

const TRACK_Y = 50;
const CUBE = 18;
const START_X = 8;
const GATE_AI = 84;
const GATE_HUMAN = 164;
const RACK_X = 250;

/** One gate: two pillars and a lintel across the track. The back pillar is drawn before the moving cubes. */
function Pillar({ x, y, tone }: { x: number; y: number; tone: "brand" | "paper" }) {
  return <IsoBox x={x} y={y} w={8} d={8} h={40} tone={tone} />;
}

function Lintel({ x, tone }: { x: number; tone: "brand" | "paper" }) {
  return <IsoBox x={x} y={22} z={40} w={8} d={56} h={6} tone={tone} />;
}

/** A mono label with a short leader line down to its point. */
function Label({ at, text }: { at: [number, number]; text: string }) {
  const [x, y] = at;
  return (
    <g>
      <line x1={x} y1={y - 4} x2={x} y2={y - 24} className="stroke-ink/40" {...LINE} />
      <circle cx={x} cy={y - 4} r={2} className="fill-ink" />
      <text x={x} y={y - 30} textAnchor="middle" className="fill-ink font-mono text-[9px] tracking-wide uppercase">
        {text}
      </text>
    </g>
  );
}

/**
 * The AI page scene: commits travel along a track through an "AI first pass" gate (a blue scanning
 * field), then a "senior review" gate (green check), and only then reach a locked rack in the
 * client's own accounts. Cubes loop with CSS (`iso-conveyor`), transform and opacity only.
 */
export function AiGateIso() {
  const aiLabel = iso(GATE_AI + 4, TRACK_Y, 46);
  const humanLabel = iso(GATE_HUMAN + 4, TRACK_Y, 60);
  const rackLabel = iso(RACK_X + 18, TRACK_Y, 40);
  // The scanning field: the vertical plane x = GATE_AI + 4 between the pillars.
  const field = points([
    [GATE_AI + 4, 30, 40],
    [GATE_AI + 4, 70, 40],
    [GATE_AI + 4, 70, 0],
    [GATE_AI + 4, 30, 0],
  ]);

  return (
    <IsoSvg viewBox="-100 -52 380 262" origin={[0, 6]}>
      <IsoBox x={0} y={0} w={300} d={100} h={6} />
      <IsoPath pts={[[6, TRACK_Y, 6], [246, TRACK_Y, 6]]} className="stroke-ink/30" strokeDasharray="3 4" />

      {/* Back pillars, behind the track. */}
      <g transform="translate(0 -6)">
        <Pillar x={GATE_AI} y={22} tone="brand" />
        <Pillar x={GATE_HUMAN} y={22} tone="paper" />
      </g>

      {/* Commits on the track, staggered so one is always passing through a gate. */}
      <g transform="translate(0 -6)">
        {[0, 1, 2].map((n) => (
          <g key={n} className="iso-conveyor" style={{ animationDelay: `${n * -2.4}s` }}>
            <IsoBox x={START_X} y={TRACK_Y - CUBE / 2} w={CUBE} d={CUBE} h={CUBE}>
              <rect x={4} y={4} width={10} height={2} className="fill-ink/40" />
              <rect x={4} y={8} width={7} height={2} className="fill-ink/25" />
            </IsoBox>
          </g>
        ))}
      </g>

      <g transform="translate(0 -6)">
        <polygon points={field} className="iso-blink fill-brand/10 stroke-brand/50" {...LINE} strokeDasharray="2 3" />
        <Pillar x={GATE_AI} y={70} tone="brand" />
        <Lintel x={GATE_AI} tone="brand" />

        <Pillar x={GATE_HUMAN} y={70} tone="paper" />
        <Lintel x={GATE_HUMAN} tone="paper" />
        {/* The reviewer's approval: a green tile with a check, on top of the review gate. */}
        <IsoBox x={GATE_HUMAN - 3} y={TRACK_Y - 7} z={46} w={14} d={14} h={3}>
          <rect x={0} y={0} width={14} height={14} className="fill-ok" />
          <polyline points="3.5,7.5 6,10 10.5,4" fill="none" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </IsoBox>

        {/* The client's accounts: a two-unit rack with a padlock on top. */}
        <IsoBox x={RACK_X} y={30} w={36} d={40} h={18} />
        <IsoBox x={RACK_X} y={30} z={20} w={36} d={40} h={18} tone="brand">
          <rect x={12} y={18} width={12} height={10} className="fill-brand" />
          <path d="M14.5 18 V14.5 A3.5 3.5 0 0 1 21.5 14.5 V18" fill="none" className="stroke-brand" strokeWidth={1.6} />
        </IsoBox>
      </g>

      <Label at={[aiLabel[0], aiLabel[1] - 6]} text="AI first pass" />
      <Label at={[humanLabel[0], humanLabel[1] - 6]} text="Senior review" />
      <Label at={[rackLabel[0], rackLabel[1] - 6]} text="Your accounts" />
    </IsoSvg>
  );
}
