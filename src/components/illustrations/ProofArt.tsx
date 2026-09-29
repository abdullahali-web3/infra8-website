"use client";

import { motion } from "motion/react";
import { Art, BLUE, INK, LINE, OK, ORANGE, ORIGIN_CENTER, ORIGIN_LEFT, draw, grow, pop, rise } from "./art";

const SH = { filter: "url(#card-shadow)" } as const;
const MONO = "var(--font-geist-mono)";
const VB = "0 0 320 200";

function SampleStamp({ x = 236, y = 22 }: { x?: number; y?: number }) {
  return (
    <motion.g variants={pop} style={ORIGIN_CENTER}>
      <rect x={x} y={y} width="56" height="18" rx="9" fill="none" stroke={ORANGE} strokeWidth="1.4" />
      <text x={x + 28} y={y + 12.2} textAnchor="middle" fontSize="8" fill={ORANGE} fontFamily={MONO}>SAMPLE</text>
    </motion.g>
  );
}

function Scope() {
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="60" y="14" width="200" height="176" rx="10" fill="#fff" style={SH} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y="32" width="84" height="8" rx="4" fill={INK} opacity="0.85" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y="48" width="56" height="5" rx="2.5" fill={LINE} />
      {["Goals", "User flows", "Milestones"].map((t, i) => (
        <g key={t}>
          <motion.rect variants={pop} style={ORIGIN_CENTER} x="78" y={70 + i * 34} width="6" height="6" fill={ORANGE} />
          <motion.text variants={rise} x="90" y={76 + i * 34} fontSize="8.5" fill={INK} fontFamily={MONO}>{t.toUpperCase()}</motion.text>
          <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y={84 + i * 34} width={[150, 132, 112][i]} height="5" rx="2.5" fill={LINE} />
          <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y={94 + i * 34} width={[108, 96, 140][i]} height="5" rx="2.5" fill={LINE} />
        </g>
      ))}
      <SampleStamp />
    </Art>
  );
}

function Architecture() {
  const nodes = [
    { x: 22, y: 78, t: "CLIENT" },
    { x: 104, y: 36, t: "CDN" },
    { x: 104, y: 122, t: "AUTH" },
    { x: 190, y: 78, t: "API" },
    { x: 262, y: 36, t: "DB" },
    { x: 262, y: 122, t: "QUEUE" },
  ];
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="8" y="10" width="304" height="180" rx="10" fill="#fff" style={SH} />
      <motion.path variants={draw} d="M62 96 H83 V54 H104 M83 96 V140 H104 M144 54 H167 V96 H190 M144 140 H167 V96 M230 96 H246 V54 H262 M246 96 V140 H262" stroke={BLUE} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      {nodes.map((n, i) => (
        <g key={n.t}>
          <motion.rect variants={pop} style={ORIGIN_CENTER} x={n.x} y={n.y} width={n.t === "CLIENT" ? 40 : 40} height="36" rx="8" fill={n.t === "API" ? BLUE : "#fff"} stroke={n.t === "API" ? BLUE : LINE} strokeWidth="1.4" />
          <motion.text variants={rise} x={n.x + 20} y={n.y + 22} textAnchor="middle" fontSize="7.5" fill={n.t === "API" ? "#fff" : INK} fontFamily={MONO}>{n.t}</motion.text>
          {i === 3 ? <circle cx={n.x + 34} cy={n.y + 6} r="3" fill={OK} /> : null}
        </g>
      ))}
      <SampleStamp x={244} y={158} />
    </Art>
  );
}

function AuditReport() {
  const rows = [
    { c: "#e5484d", w: 130, t: "HIGH" },
    { c: ORANGE, w: 100, t: "MED" },
    { c: ORANGE, w: 74, t: "MED" },
    { c: BLUE, w: 50, t: "LOW" },
  ];
  return (
    <Art viewBox={VB}>
      <motion.rect variants={rise} x="60" y="14" width="200" height="176" rx="10" fill="#fff" style={SH} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y="32" width="92" height="8" rx="4" fill={INK} opacity="0.85" />
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="236" cy="38" r="12" fill="none" stroke={LINE} strokeWidth="5" />
      <g transform="rotate(-90 236 38)">
        <motion.circle variants={pop} style={ORIGIN_CENTER} cx="236" cy="38" r="12" fill="none" stroke={BLUE} strokeWidth="5" strokeDasharray="52 24" strokeLinecap="round" />
      </g>
      {rows.map((r, i) => (
        <g key={i}>
          <motion.rect variants={pop} style={ORIGIN_CENTER} x="78" y={70 + i * 28} width="30" height="14" rx="4" fill={r.c} opacity="0.15" />
          <motion.text variants={rise} x="93" y={80.5 + i * 28} textAnchor="middle" fontSize="7" fill={r.c} fontFamily={MONO}>{r.t}</motion.text>
          <motion.rect variants={grow} style={ORIGIN_LEFT} x="116" y={73 + i * 28} width={r.w} height="8" rx="4" fill={r.c} opacity="0.85" />
        </g>
      ))}
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="78" y="176" width="70" height="4" rx="2" fill={LINE} />
      <SampleStamp x={196} y={164} />
    </Art>
  );
}

const ART = { scope: Scope, arch: Architecture, audit: AuditReport } as const;

export function ProofArt({ kind }: { kind: keyof typeof ART }) {
  const C = ART[kind];
  return <C />;
}
