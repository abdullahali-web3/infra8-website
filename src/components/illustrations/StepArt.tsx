"use client";

import { motion } from "motion/react";
import {
  Art,
  BLUE,
  INK,
  LINE,
  OK,
  ORANGE,
  ORIGIN_CENTER,
  ORIGIN_LEFT,
  draw,
  grow,
  pop,
  rise,
} from "./art";

const SH = { filter: "url(#card-shadow)" } as const;
const MONO = "var(--font-geist-mono)";
const VB = "0 0 320 190";

function Estimate() {
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="28" y="22" width="168" height="146" rx="8" fill="#fff" style={SH} />
      {[40, 78, 116].map((y, i) => (
        <g key={y}>
          <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y={y} width={i === 0 ? 46 : 58} height="5" rx="2.5" fill={INK} opacity="0.45" />
          <motion.rect variants={rise} x="44" y={y + 10} width="136" height="18" rx="4" fill="#f4f6fa" stroke={LINE} />
          <motion.rect variants={grow} style={ORIGIN_LEFT} x="50" y={y + 16} width={[86, 110, 60][i]} height="6" rx="3" fill={INK} opacity="0.35" />
        </g>
      ))}
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="44" y="146" width="76" height="16" rx="8" fill={BLUE} />
      <motion.rect variants={pop} x="180" y="56" width="120" height="86" rx="10" fill="#fff" stroke={LINE} style={SH} />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="192" y="68" width="6" height="6" fill={ORANGE} />
      <motion.text variants={rise} x="203" y="74.5" fontSize="7.5" fill="#7a7a7a" fontFamily={MONO}>ESTIMATE</motion.text>
      <motion.text variants={rise} x="192" y="102" fontSize="22" fill={INK} fontFamily="var(--font-gsf)" letterSpacing="-0.8">24 hrs</motion.text>
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="192" y="112" width="70" height="5" rx="2.5" fill={LINE} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="192" y="123" width="48" height="5" rx="2.5" fill={LINE} />
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="282" cy="74" r="8" fill={OK} />
      <motion.path variants={draw} d="M278.5 74 l2.5 2.5 l4.5 -5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Art>
  );
}

function Discovery() {
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="24" y="20" width="120" height="152" rx="8" fill="#fff" style={SH} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="38" y="36" width="56" height="7" rx="3.5" fill={INK} opacity="0.8" />
      {[54, 66, 78, 90, 102, 114].map((y, i) => (
        <motion.rect key={y} variants={grow} style={ORIGIN_LEFT} x="38" y={y} width={[92, 80, 88, 62, 84, 70][i]} height="5" rx="2.5" fill={LINE} />
      ))}
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="38" y="134" width="40" height="16" rx="8" fill={ORANGE} />
      <motion.text variants={rise} x="58" y="145" fontSize="7.5" textAnchor="middle" fill="#fff" fontFamily={MONO}>1–2 WKS</motion.text>

      <motion.rect variants={pop} style={ORIGIN_CENTER} x="176" y="28" width="60" height="28" rx="6" fill="#fff" stroke={BLUE} strokeWidth="1.5" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="176" y="132" width="60" height="28" rx="6" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="252" y="80" width="56" height="28" rx="6" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <motion.path variants={draw} d="M206 56 V80 H252" stroke={BLUE} strokeWidth="1.5" fill="none" strokeDasharray="0" />
      <motion.path variants={draw} d="M206 132 V94 H252" stroke={BLUE} strokeWidth="1.5" fill="none" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="186" y="38" width="38" height="5" rx="2.5" fill={BLUE} opacity="0.8" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="186" y="142" width="30" height="5" rx="2.5" fill={INK} opacity="0.3" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="262" y="90" width="34" height="5" rx="2.5" fill={INK} opacity="0.3" />
    </Art>
  );
}

function Demos() {
  const xs = [58, 120, 182, 244];
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="40" y="14" width="240" height="118" rx="8" fill="#fff" style={SH} />
      {[54, 62, 70].map((x, i) => (
        <circle key={x} cx={x - 6 + i * 0} cy="26" r="2.5" fill={i === 0 ? ORANGE : LINE} transform={`translate(${i * 3} 0)`} />
      ))}
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="54" y="38" width="212" height="8" rx="4" fill="#f4f6fa" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="54" y="54" width="100" height="62" rx="6" fill="#f4f6fa" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="64" y="66" width="52" height="6" rx="3" fill={INK} opacity="0.75" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="64" y="78" width="72" height="5" rx="2.5" fill={INK} opacity="0.25" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="64" y="94" width="34" height="12" rx="6" fill={BLUE} />
      {[164, 194, 224].map((x, i) => (
        <motion.rect key={x} variants={pop} style={ORIGIN_CENTER} x={x} y="54" width="28" height="62" rx="5" fill={i === 1 ? "#fff" : "#f4f6fa"} stroke={i === 1 ? BLUE : "none"} strokeWidth="1.2" />
      ))}
      <motion.line variants={draw} x1={xs[0]} y1="160" x2={xs[3]} y2="160" stroke={LINE} strokeWidth="2" />
      <motion.line variants={draw} x1={xs[0]} y1="160" x2={xs[2]} y2="160" stroke={BLUE} strokeWidth="2" />
      {xs.map((x, i) => (
        <g key={x}>
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={x} cy="160" r="6" fill={i < 3 ? BLUE : "#fff"} stroke={i < 3 ? BLUE : LINE} strokeWidth="1.5" />
          <motion.text variants={rise} x={x} y="180" fontSize="7.5" textAnchor="middle" fill="#7a7a7a" fontFamily={MONO}>{`DEMO ${i + 1}`}</motion.text>
        </g>
      ))}
    </Art>
  );
}

function Handover() {
  return (
    <Art viewBox={VB}>
      {[
        { x: 22, label: "CODE", g: <path d="M-8 -6 -14 0 -8 6 M8 -6 14 0 8 6 M2 -9 -2 9" /> },
        { x: 76, label: "DOCS", g: <path d="M-8 -11 h11 l6 6 v16 h-17 z M3 -11 v6 h6 M-4 0 h8 M-4 5 h8" /> },
        { x: 130, label: "ACCOUNTS", g: <><circle cx="-4" cy="-2" r="5" /><path d="M0 2 l10 10 M6 8 l3 -3" /></> },
      ].map((t, i) => (
        <g key={t.label}>
          <motion.rect variants={rise} x={t.x} y="52" width="46" height="46" rx="9" fill="#fff" stroke={LINE} style={SH} />
          <g transform={`translate(${t.x + 23} 75)`}>
            <motion.g variants={pop} style={ORIGIN_CENTER} stroke={i === 1 ? INK : BLUE} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {t.g}
            </motion.g>
          </g>
          <motion.text variants={rise} x={t.x + 23} y="114" fontSize="7" textAnchor="middle" fill="#7a7a7a" fontFamily={MONO}>{t.label}</motion.text>
        </g>
      ))}
      <motion.path variants={draw} d="M180 75 H214" stroke={BLUE} strokeWidth="2" strokeDasharray="4 5" fill="none" />
      <motion.path variants={draw} d="M208 69 l7 6 -7 6" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="224" y="46" width="72" height="58" rx="12" fill={BLUE} />
      <motion.text variants={rise} x="260" y="80" fontSize="14" textAnchor="middle" fill="#fff" fontFamily="var(--font-gsf)" letterSpacing="-0.4">You</motion.text>
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="292" cy="50" r="9" fill={OK} stroke="#fff" strokeWidth="2" />
      <motion.path variants={draw} d="M288 50 l3 3 l5 -6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Art>
  );
}

function Audit() {
  const cells = [
    { x: 30, y: 30, warn: false },
    { x: 118, y: 30, warn: true },
    { x: 206, y: 30, warn: false },
    { x: 30, y: 104, warn: false },
    { x: 118, y: 104, warn: false },
    { x: 206, y: 104, warn: true },
  ];
  return (
    <Art viewBox={VB}>
      {cells.map((c, i) => (
        <g key={i}>
          <motion.rect variants={pop} style={ORIGIN_CENTER} x={c.x} y={c.y} width="80" height="56" rx="8" fill="#fff" stroke={c.warn ? ORANGE : LINE} strokeWidth={c.warn ? 1.5 : 1} />
          <motion.rect variants={grow} style={ORIGIN_LEFT} x={c.x + 12} y={c.y + 14} width="34" height="6" rx="3" fill={INK} opacity="0.7" />
          <motion.rect variants={grow} style={ORIGIN_LEFT} x={c.x + 12} y={c.y + 28} width="52" height="5" rx="2.5" fill={LINE} />
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={c.x + 66} cy={c.y + 44} r="6.5" fill={c.warn ? ORANGE : OK} />
          <motion.path variants={draw} d={c.warn ? `M${c.x + 66} ${c.y + 41} v3.5 M${c.x + 66} ${c.y + 46.5} v.5` : `M${c.x + 63} ${c.y + 44} l2.2 2.2 l4 -4.6`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ))}
      <motion.rect
        x="18"
        y="22"
        width="284"
        height="10"
        rx="5"
        fill={BLUE}
        opacity="0.18"
        animate={{ y: [22, 150, 22] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </Art>
  );
}

function Findings() {
  const rows = [
    { c: "#e5484d", w: 150 },
    { c: ORANGE, w: 118 },
    { c: ORANGE, w: 92 },
    { c: BLUE, w: 64 },
  ];
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="36" y="16" width="248" height="158" rx="9" fill="#fff" style={SH} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="52" y="32" width="70" height="7" rx="3.5" fill={INK} opacity="0.8" />
      <motion.text variants={rise} x="268" y="38" fontSize="7" textAnchor="end" fill="#7a7a7a" fontFamily={MONO}>IMPACT ↓ EFFORT →</motion.text>
      {rows.map((r, i) => {
        const y = 56 + i * 28;
        return (
          <g key={i}>
            <motion.rect variants={pop} style={ORIGIN_CENTER} x="52" y={y} width="26" height="14" rx="4" fill={r.c} opacity="0.15" />
            <motion.rect variants={pop} style={ORIGIN_CENTER} x="58" y={y + 5} width="14" height="4" rx="2" fill={r.c} />
            <motion.rect variants={grow} style={ORIGIN_LEFT} x="88" y={y + 2} width={r.w} height="10" rx="5" fill={r.c} opacity="0.85" />
            {[0, 1, 2].map((d) => (
              <motion.circle key={d} variants={pop} style={ORIGIN_CENTER} cx={244 + d * 11} cy={y + 7} r="3.2" fill={d <= (i % 3) ? INK : LINE} opacity={d <= (i % 3) ? 0.75 : 1} />
            ))}
          </g>
        );
      })}
    </Art>
  );
}

function Fix() {
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="30" y="16" width="260" height="102" rx="9" fill="#111" style={SH} />
      {[ORANGE, "#e5c04d", OK].map((c, i) => (
        <circle key={c} cx={46 + i * 10} cy="30" r="2.6" fill={c} />
      ))}
      <motion.text variants={rise} x="46" y="54" fontSize="9" fill="#9ab8ff" fontFamily={MONO}>$ terraform plan</motion.text>
      <motion.text variants={rise} x="46" y="70" fontSize="9" fill="#7ee08f" fontFamily={MONO}>+ 12 to add, 3 to change</motion.text>
      <motion.text variants={rise} x="46" y="86" fontSize="9" fill="#9ab8ff" fontFamily={MONO}>$ terraform apply</motion.text>
      <motion.text variants={rise} x="46" y="102" fontSize="9" fill="#7ee08f" fontFamily={MONO}>✓ Apply complete</motion.text>
      <motion.line variants={draw} x1="70" y1="152" x2="250" y2="152" stroke={LINE} strokeWidth="2" />
      <motion.line variants={draw} x1="70" y1="152" x2="250" y2="152" stroke={OK} strokeWidth="2" />
      {[70, 130, 190, 250].map((x, i) => (
        <g key={x}>
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={x} cy="152" r="8" fill={OK} />
          <motion.path variants={draw} d={`M${x - 3.2} 152 l2.4 2.4 l4.2 -4.8`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <motion.text variants={rise} x={x} y="176" fontSize="7" textAnchor="middle" fill="#7a7a7a" fontFamily={MONO}>{["BUILD", "TEST", "SCAN", "DEPLOY"][i]}</motion.text>
        </g>
      ))}
    </Art>
  );
}

function Retainer() {
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="24" y="16" width="272" height="158" rx="9" fill="#fff" style={SH} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="40" y="30" width="62" height="7" rx="3.5" fill={INK} opacity="0.8" />
      <motion.path variants={pop} style={ORIGIN_CENTER} d="M40 122 C70 118 82 90 108 96 C134 102 146 66 176 72 C206 78 214 52 240 50 C252 49 262 46 276 42 V138 H40 Z" fill={BLUE} opacity="0.08" />
      <motion.path variants={draw} d="M40 122 C70 118 82 90 108 96 C134 102 146 66 176 72 C206 78 214 52 240 50 C252 49 262 46 276 42" stroke={BLUE} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[
        { x: 40, t: "UPTIME", c: OK },
        { x: 130, t: "COST", c: BLUE },
        { x: 220, t: "RISK", c: ORANGE },
      ].map((k) => (
        <g key={k.t}>
          <motion.rect variants={pop} style={ORIGIN_CENTER} x={k.x} y="146" width="72" height="20" rx="10" fill="#f4f6fa" />
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={k.x + 11} cy="156" r="3.5" fill={k.c} />
          <motion.text variants={rise} x={k.x + 20} y="159" fontSize="7.5" fill="#4a4a4a" fontFamily={MONO}>{k.t}</motion.text>
        </g>
      ))}
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
