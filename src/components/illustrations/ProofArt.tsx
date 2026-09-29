"use client";

import { motion } from "motion/react";
import { Art, Badge, Bar, Flow, Float, Glass, P, Pill, R, F, Txt, INK, MUTE, ORANGE, draw } from "./art";

const VB = "0 0 300 200";

function Scope() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="100" r="96" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <g transform="rotate(6 150 100)">
          <Glass x={78} y={16} w={146} h={170} r={12} opacity={0.5} shadow={null} />
        </g>
      </R>
      <R>
        <Float a={-3}>
          <Glass x={50} y={10} w={180} h={182} r={14} shadow="fLift" />
          <Bar x={66} y={28} w={72} h={8} c={INK} o={0.85} />
          <Bar x={66} y={42} w={48} h={4} />
          <Pill x={172} y={24} w={44} h={16} label="SAMPLE" tone="orange" size={8} />
          {[
            { y: 62, t: "GOALS" },
            { y: 94, t: "USER FLOWS" },
            { y: 126, t: "MILESTONES" },
          ].map((s) => (
            <g key={s.t}>
              <rect x="66" y={s.y} width="5" height="5" fill={ORANGE} />
              <Txt x={76} y={s.y + 5} size={8.5} fill="#4a5568" font="mono" ls={0.4}>{s.t}</Txt>
              <Bar x={66} y={s.y + 12} w={132} />
              <Bar x={66} y={s.y + 21} w={96} />
            </g>
          ))}
          {["M1", "M2", "M3"].map((m, i) => (
            <Pill key={m} x={66 + i * 42} y={166} w={36} h={16} label={m} tone="blue" size={8.5} />
          ))}
        </Float>
      </R>
    </Art>
  );
}

function Architecture() {
  return (
    <Art viewBox={VB}>
      <R>
        <Glass x={10} y={12} w={280} h={176} r={16} shadow="fLift" />
      </R>
      <Flow d="M55 92 C 76 80 84 62 88 58" />
      <Flow d="M55 108 C 76 120 84 138 88 142" />
      <Flow d="M114 60 C 140 66 148 88 152 94" />
      <Flow d="M114 140 C 140 134 148 112 152 106" />
      <Flow d="M190 94 C 206 84 214 66 226 60" />
      <Flow d="M190 106 C 206 116 214 134 226 140" />
      <P>
        <g filter="url(#fSoft)">
          <circle cx="40" cy="100" r="16" fill="#fff" stroke="rgba(16,40,110,0.07)" />
        </g>
        <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="31.5" y="93" width="17" height="11" rx="2" />
          <path d="M36 108 h8 M40 104 v4" />
        </g>
      </P>
      <P>
        <Badge cx={100} cy={54} r={15} logo="react" />
      </P>
      <P>
        <Badge cx={100} cy={146} r={15} logo="nodejs" />
      </P>
      <P>
        <rect x="150" y="86" width="44" height="28" rx="14" fill="url(#gBrand)" filter="url(#fSoft)" />
        <Txt x={172} y={104} size={11} fill="#fff" font="display" anchor="middle" ls={0.5}>API</Txt>
      </P>
      <P>
        <Badge cx={240} cy={54} r={15} logo="postgresql" />
      </P>
      <P>
        <Badge cx={240} cy={146} r={15} logo="redis" />
      </P>
      <P>
        <Pill x={26} y={164} w={52} h={16} label="SAMPLE" tone="orange" size={8} />
      </P>
    </Art>
  );
}

function AuditReport() {
  const rows = [
    { y: 128, tone: "red" as const, l: "HIGH", w: 92 },
    { y: 148, tone: "orange" as const, l: "MED", w: 74 },
    { y: 168, tone: "blue" as const, l: "LOW", w: 48 },
  ];
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="100" r="96" fill="url(#gGlowOrange)" opacity="0.7" />
      </F>
      <R>
        <Float a={-3}>
          <Glass x={50} y={10} w={180} h={182} r={14} shadow="fLift" />
          <Badge cx={74} cy={34} r={13} logo="aws" scale={1.5} />
          <Bar x={94} y={28} w={60} h={7} c={INK} o={0.85} />
          <Pill x={176} y={26} w={44} h={16} label="SAMPLE" tone="orange" size={8} />
          <circle cx="104" cy="86" r="26" fill="none" stroke="#e4eaf6" strokeWidth="8" />
          <motion.circle
            cx="104"
            cy="86"
            r="26"
            fill="none"
            stroke="url(#gLine)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="112 164"
            transform="rotate(-90 104 86)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <Txt x={104} y={89} size={8.5} fill={MUTE} font="mono" anchor="middle" ls={0.4}>AUDIT</Txt>
          <Pill x={152} y={66} w={62} h={16} label="COST ↓" tone="green" size={8.5} />
          <Pill x={152} y={88} w={62} h={16} label="RISK ↓" tone="orange" size={8.5} />
          {rows.map((r) => (
            <g key={r.y}>
              <Pill x={66} y={r.y} w={34} h={14} label={r.l} tone={r.tone} size={7.5} />
              <rect x="108" y={r.y + 3} width="106" height="8" rx="4" fill="#e4eaf6" />
              <rect x="108" y={r.y + 3} width={r.w} height="8" rx="4" fill={r.tone === "red" ? "#ff6b6b" : r.tone === "orange" ? "url(#gOrange)" : "url(#gBrand)"} />
            </g>
          ))}
        </Float>
      </R>
      <motion.path variants={draw} d="M0 0" stroke="none" />
    </Art>
  );
}

const ART = { scope: Scope, arch: Architecture, audit: AuditReport } as const;

export function ProofArt({ kind }: { kind: keyof typeof ART }) {
  const C = ART[kind];
  return <C />;
}
