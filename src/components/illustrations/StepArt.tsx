"use client";

import { motion } from "motion/react";
import { Art, Badge, Bar, Check, Cursor, Flow, Float, Glass, P, Pill, R, F, Txt, BLUE, INK, MUTE, ORANGE, SKEL, draw } from "./art";

const VB = "0 0 300 190";

/* ------------------------------ Product track ------------------------------ */

function Estimate() {
  return (
    <Art viewBox={VB}>
      <F>
        <g fill="none" stroke={BLUE} strokeOpacity="0.1">
          <circle cx="150" cy="62" r="100" />
          <circle cx="150" cy="62" r="66" />
        </g>
      </F>
      <R>
        <Float a={-4}>
          <Glass x={50} y={12} w={200} h={84} r={16} shadow="fLift" />
          <rect x="66" y="27" width="5" height="5" fill={ORANGE} />
          <Txt x={77} y={32} size={8.5} fill={MUTE} font="mono" ls={0.5}>ESTIMATE READY</Txt>
          <Txt x={66} y={70} size={28} font="display" ls={-1.2}>24 hrs</Txt>
          <rect x="150" y="54" width="84" height="8" rx="4" fill={SKEL} />
          <rect x="150" y="54" width="56" height="8" rx="4" fill="url(#gLine)" />
          <Txt x={150} y={76} size={8.5} fill={MUTE} font="mono">RANGE + TIMELINE</Txt>
          <Check cx={230} cy={30} r={9} />
        </Float>
      </R>
      <R>
        <Glass x={26} y={112} w={248} h={54} r={16} />
        <Txt x={44} y={143} size={10.5} fill="#8a94a8">Describe your product idea…</Txt>
        <circle cx="246" cy="139" r="15" fill="url(#gInk)" />
        <path d="M246 145 V133 M240.5 138.5 L246 133 L251.5 138.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </R>
      <P>
        <Cursor x={196} y={146} />
      </P>
    </Art>
  );
}

function Discovery() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="222" cy="95" r="62" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <g transform="rotate(-3 80 95)">
          <Glass x={20} y={20} w={116} h={150} r={12} />
          <Bar x={34} y={36} w={56} h={7} c={INK} o={0.85} />
          {[
            { y: 60, t: "SCOPE" },
            { y: 90, t: "FLOWS" },
            { y: 120, t: "ARCH" },
          ].map((s) => (
            <g key={s.t}>
              <rect x="34" y={s.y} width="5" height="5" fill={ORANGE} />
              <Txt x={44} y={s.y + 5} size={8.5} fill="#4a5568" font="mono" ls={0.4}>{s.t}</Txt>
              <Bar x={34} y={s.y + 12} w={84} />
              <Bar x={34} y={s.y + 20} w={62} />
            </g>
          ))}
          <Pill x={34} y={146} w={58} h={16} label="1–2 WKS" tone="orange" />
        </g>
      </R>
      <R>
        <Glass x={150} y={24} w={130} h={142} r={16} opacity={0.75} />
        <Flow d="M198 60 C 222 60 232 74 240 84" />
        <Flow d="M240 100 C 232 118 214 130 200 134" />
        <Flow d="M186 74 V122" />
      </R>
      <P>
        <Badge cx={186} cy={56} r={15} logo="react" />
      </P>
      <P>
        <Badge cx={244} cy={92} r={15} logo="nodejs" />
      </P>
      <P>
        <Badge cx={186} cy={138} r={15} logo="postgresql" />
      </P>
    </Art>
  );
}

function Demos() {
  return (
    <Art viewBox={VB}>
      <R>
        <Glass x={46} y={6} w={208} h={100} r={14} opacity={0.5} shadow={null} />
        <Glass x={36} y={16} w={228} h={104} r={14} opacity={0.75} shadow="fTiny" />
      </R>
      <R>
        <Float a={-3}>
          <Glass x={24} y={28} w={252} h={116} r={16} shadow="fLift" />
          <Dots3 />
          <Bar x={70} y={39} w={150} h={6} c={SKEL} />
          <Bar x={38} y={60} w={92} h={9} c={INK} o={0.85} />
          <Bar x={38} y={76} w={112} />
          <Bar x={38} y={86} w={84} />
          <rect x="38" y="104" width="52" height="16" rx="8" fill="url(#gBrand)" />
          <rect x="164" y="54" width="98" height="76" rx="10" fill="url(#gImg)" />
          <path d="M164 118 C 190 100 214 128 262 100 V120 a10 10 0 0 1 -10 10 H174 a10 10 0 0 1 -10 -10 Z" fill="#fff" opacity="0.55" />
          <Pill x={172} y={60} w={50} h={15} label="DEMO 3" tone="white" size={8} />
          <circle cx="222" cy="98" r="16" fill="url(#gBrand)" filter="url(#fSoft)" />
          <path d="M217 90 L230 98 L217 106 Z" fill="#fff" />
        </Float>
      </R>
      {[0, 1, 2, 3].map((i) => (
        <R key={i}>
          <rect x={24 + i * 62} y="158" width="54" height="20" rx="10" fill={i < 3 ? "#e8f0ff" : "#fff"} stroke={i < 3 ? "none" : "#dbe3f3"} />
          <Txt x={24 + i * 62 + 27} y={171.5} size={9} fill={i < 3 ? BLUE : MUTE} font="mono" anchor="middle" ls={0.4}>{`WEEK ${i + 1}`}</Txt>
        </R>
      ))}
    </Art>
  );
}

function Dots3() {
  return (
    <g>
      <circle cx="40" cy="42" r="2.6" fill="#ff8a70" />
      <circle cx="48" cy="42" r="2.6" fill="#ffc45a" />
      <circle cx="56" cy="42" r="2.6" fill="#5be36f" />
    </g>
  );
}

function Handover() {
  const rows = [
    { y: 26, label: "REPO", logo: "github" },
    { y: 76, label: "DOCS", logo: "" },
    { y: 126, label: "ACCOUNTS", logo: "aws" },
  ];
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="232" cy="96" r="70" fill="url(#gGlowBlue)" />
      </F>
      {rows.map((r) => (
        <g key={r.label}>
          <Flow d={`M136 ${r.y + 20} C 158 ${r.y + 20} 160 96 180 96`} />
        </g>
      ))}
      {rows.map((r) => (
        <R key={r.label}>
          <Glass x={18} y={r.y} w={118} h={40} r={12} />
          {r.logo ? (
            <Badge cx={40} cy={r.y + 20} r={13} logo={r.logo} />
          ) : (
            <g filter="url(#fSoft)">
              <circle cx="40" cy={r.y + 20} r="13" fill="#fff" stroke="rgba(16,40,110,0.07)" />
              <path d={`M35.5 ${r.y + 14} h7 l3.5 3.5 v9 a1 1 0 0 1 -1 1 h-9.5 a1 1 0 0 1 -1 -1 v-11.5 a1 1 0 0 1 1 -1 Z M42 ${r.y + 14} v4 h4`} stroke={INK} strokeWidth="1.4" fill="none" strokeLinejoin="round" />
            </g>
          )}
          <Txt x={62} y={r.y + 18} size={8.5} fill="#4a5568" font="mono" ls={0.4}>{r.label}</Txt>
          <Bar x={62} y={r.y + 24} w={48} />
        </R>
      ))}
      <R>
        <Float a={-4} t={6}>
          <rect x="180" y="40" width="104" height="112" rx="20" fill="url(#gBrand)" filter="url(#fLift)" />
          <rect x="180" y="40" width="104" height="112" rx="20" fill="url(#gGlowWhite)" opacity="0.4" />
          <g stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <circle cx="216" cy="70" r="7" />
            <path d="M222 75 L238 91 M232 85 l5 -5 M237 90 l5 -5" />
          </g>
          <Txt x={232} y={122} size={22} fill="#fff" font="display" anchor="middle" ls={-0.6}>You</Txt>
          <Pill x={200} y={130} w={64} h={16} label="OWNED" tone="white" size={8} />
        </Float>
      </R>
      <P>
        <Check cx={280} cy={44} r={10} />
      </P>
    </Art>
  );
}

/* ------------------------------- Infra track ------------------------------- */

function Audit() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="92" r="96" fill="url(#gGlowBlue)" />
        <g fill="none" stroke={BLUE} strokeOpacity="0.16">
          <circle cx="150" cy="92" r="30" />
          <circle cx="150" cy="92" r="56" />
          <circle cx="150" cy="92" r="82" />
        </g>
      </F>
      <F>
        <g className="fx-spin" style={{ transformOrigin: "150px 92px" }}>
          <path d="M150 92 L150 10 A82 82 0 0 1 208 34 Z" fill="url(#gSweep)" />
          <line x1="150" y1="92" x2="150" y2="10" stroke={BLUE} strokeOpacity="0.5" strokeWidth="1.2" />
        </g>
      </F>
      <P>
        <circle cx="150" cy="92" r="20" fill="url(#gBrand)" filter="url(#fSoft)" />
        <g stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <circle cx="148" cy="90" r="6.5" />
          <path d="M153 95 L158 100" />
        </g>
      </P>
      <P>
        <Badge cx={76} cy={52} r={18} logo="aws" scale={1.5} />
        <circle cx="90" cy="38" r="4.5" fill="#00c91e" stroke="#fff" strokeWidth="1.5" />
      </P>
      <P>
        <Badge cx={228} cy={62} r={16} logo="googlecloud" />
        <circle cx="240" cy="50" r="4.5" fill={ORANGE} stroke="#fff" strokeWidth="1.5" />
      </P>
      <P>
        <Badge cx={216} cy={142} r={16} logo="azure" />
        <circle cx="228" cy="130" r="4.5" fill="#00c91e" stroke="#fff" strokeWidth="1.5" />
      </P>
      <R>
        <Glass x={20} y={148} w={92} h={26} r={13} shadow="fTiny" />
        <circle cx="36" cy="161" r="4" fill={ORANGE} className="fx-pulse" />
        <Txt x={46} y={164.5} size={9} fill="#4a5568" font="mono" ls={0.4}>3 FINDINGS</Txt>
      </R>
    </Art>
  );
}

function Findings() {
  const rows = [
    { l: "HIGH", tone: "red" as const, w: 132 },
    { l: "MED", tone: "orange" as const, w: 104 },
    { l: "MED", tone: "orange" as const, w: 78 },
    { l: "LOW", tone: "blue" as const, w: 50 },
  ];
  return (
    <Art viewBox={VB}>
      <R>
        <Glass x={28} y={16} w={244} h={156} r={16} shadow="fLift" />
        <Bar x={44} y={32} w={64} h={7} c={INK} o={0.85} />
        <Txt x={256} y={38} size={8.5} fill={MUTE} font="mono" anchor="end" ls={0.4}>IMPACT · EFFORT</Txt>
        {rows.map((r, i) => {
          const y = 56 + i * 28;
          const fill = r.tone === "red" ? "#ff6b6b" : r.tone === "orange" ? "url(#gOrange)" : "url(#gBrand)";
          return (
            <g key={i}>
              <Pill x={44} y={y} w={38} h={16} label={r.l} tone={r.tone} size={8} />
              <rect x="92" y={y + 3} width="120" height="10" rx="5" fill={SKEL} />
              <motion.rect x="92" y={y + 3} width={r.w * 0.9} height="10" rx="5" fill={fill} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 + i * 0.1 }} style={{ transformBox: "fill-box", transformOrigin: "left center" }} />
              {[0, 1, 2].map((d) => (
                <circle key={d} cx={230 + d * 11} cy={y + 8} r="3.2" fill={d <= (i > 2 ? 0 : i % 3) ? INK : "#dfe6f4"} opacity={d <= (i > 2 ? 0 : i % 3) ? 0.7 : 1} />
              ))}
            </g>
          );
        })}
      </R>
      <P>
        <Pill x={212} y={4} w={66} h={20} label="COST ↓" tone="green" size={9} />
      </P>
      <P>
        <Pill x={14} y={158} w={64} h={20} label="RISK ↓" tone="orange" size={9} />
      </P>
    </Art>
  );
}

function Fix() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="240" cy="70" r="70" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <path d="M-14 74 C 66 34 128 116 208 66" fill="none" stroke="url(#gRibBlue)" strokeWidth="32" strokeLinecap="round" />
        <path d="M-14 74 C 66 34 128 116 208 66" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="0 11" className="fx-dash" />
      </R>
      <R>
        <path d="M-14 148 C 60 114 130 176 200 130" fill="none" stroke="url(#gRibOrange)" strokeWidth="32" strokeLinecap="round" />
        <path d="M-14 148 C 60 114 130 176 200 130" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="0 11" className="fx-dash" />
      </R>
      <P>
        <Badge cx={44} cy={56} r={17} logo="githubactions" />
      </P>
      <P>
        <Badge cx={252} cy={58} r={19} logo="kubernetes" />
      </P>
      <P>
        <Badge cx={46} cy={132} r={17} logo="terraform" />
      </P>
      <P>
        <Badge cx={246} cy={132} r={19} logo="docker" />
      </P>
      <R>
        <Float a={-3}>
          <Pill x={94} y={82} w={112} h={22} label="✓ APPLY COMPLETE" tone="ink" size={8.5} />
        </Float>
      </R>
    </Art>
  );
}

function Retainer() {
  return (
    <Art viewBox={VB}>
      <R>
        <Glass x={18} y={12} w={264} h={118} r={16} shadow="fLift" />
        <rect x="34" y="26" width="140" height="18" rx="9" fill="#e3f9e7" />
        <circle cx="45" cy="35" r="3.5" fill="#00c91e" className="fx-pulse" />
        <Txt x={54} y={38.5} size={8.5} fill="#0a9a20" font="mono" ls={0.4}>ALL SYSTEMS OPERATIONAL</Txt>
        {[62, 82, 102].map((y) => (
          <line key={y} x1="34" x2="266" y1={y} y2={y} stroke="#eaf0fb" />
        ))}
        <path d="M34 112 C 58 108 70 88 96 92 C 122 96 134 70 160 74 C 186 78 198 58 224 56 C 240 55 252 52 266 48 V118 H34 Z" fill="url(#gArea)" />
        <motion.path variants={draw} d="M34 112 C 58 108 70 88 96 92 C 122 96 134 70 160 74 C 186 78 198 58 224 56 C 240 55 252 52 266 48" fill="none" stroke="url(#gLine)" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="266" cy="48" r="4.5" fill="#fff" stroke={BLUE} strokeWidth="2" />
      </R>
      {[
        { x: 56, logo: "grafana" },
        { x: 106, logo: "datadog" },
        { x: 156, logo: "sentry" },
      ].map((b) => (
        <g key={b.logo}>
          <line x1={b.x} x2={b.x} y1="130" y2="146" stroke={BLUE} strokeOpacity="0.35" strokeDasharray="3 4" />
          <P>
            <Badge cx={b.x} cy={162} r={15} logo={b.logo} />
          </P>
        </g>
      ))}
      <R>
        <Glass x={190} y={150} w={92} h={26} r={13} shadow="fTiny" />
        <rect x="203" y="160" width="6" height="6" fill={ORANGE} />
        <Txt x={214} y={167.5} size={8.5} fill="#4a5568" font="mono" ls={0.3}>MONTHLY REVIEW</Txt>
      </R>
    </Art>
  );
}

const ART = {
  product: [Estimate, Discovery, Demos, Handover],
  infra: [Audit, Findings, Fix, Retainer],
} as const;

export function StepArt({ track, index }: { track: keyof typeof ART; index: number }) {
  const C = ART[track][index];
  return <C />;
}
