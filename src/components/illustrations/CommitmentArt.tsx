"use client";

import { motion } from "motion/react";
import { Art, BLUE, INK, LINE, OK, ORANGE, ORIGIN_CENTER, ORIGIN_LEFT, draw, grow, pop, rise } from "./art";

const S = { filter: "url(#card-shadow)" } as const;

function Own() {
  return (
    <Art viewBox="0 0 200 130">
      <motion.rect variants={rise} x="30" y="24" width="112" height="76" rx="9" fill="#fff" stroke={LINE} style={S} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="40" width="50" height="6" rx="3" fill={INK} opacity="0.85" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="54" width="80" height="5" rx="2.5" fill={LINE} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="66" width="64" height="5" rx="2.5" fill={LINE} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="78" width="72" height="5" rx="2.5" fill={LINE} />
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="146" cy="84" r="16" fill={BLUE} />
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="146" cy="84" r="5.5" fill="#fff" />
      <motion.path variants={draw} d="M157 90 L178 111 M170 104 l5 -5 M176 110 l5 -5" stroke={BLUE} strokeWidth="4" strokeLinecap="round" fill="none" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="104" y="30" width="30" height="14" rx="7" fill={ORANGE} />
      <motion.text variants={rise} x="119" y="40" fontSize="7.5" textAnchor="middle" fill="#fff" fontFamily="var(--font-geist-mono)">YOURS</motion.text>
    </Art>
  );
}

function Named() {
  const xs = [48, 100, 152];
  return (
    <Art viewBox="0 0 200 130">
      {xs.map((x, i) => (
        <g key={x}>
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={x} cy="48" r="17" fill="#fff" stroke={LINE} />
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={x} cy="43" r="6.5" fill={i === 0 ? BLUE : INK} opacity={i === 0 ? 1 : 0.8} />
          <motion.path variants={draw} d={`M${x - 10} 60 C${x - 8} 51 ${x + 8} 51 ${x + 10} 60`} stroke={i === 0 ? BLUE : INK} strokeOpacity={i === 0 ? 1 : 0.8} strokeWidth="4" strokeLinecap="round" fill="none" />
          <motion.rect variants={grow} style={ORIGIN_CENTER} x={x - 17} y="78" width="34" height="6" rx="3" fill={INK} opacity="0.85" />
          <motion.rect variants={grow} style={ORIGIN_CENTER} x={x - 12} y="90" width="24" height="5" rx="2.5" fill={LINE} />
        </g>
      ))}
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="60" cy="34" r="7" fill={OK} />
      <motion.path variants={draw} d="M56.5 34 l2.5 2.5 l4.5 -5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Art>
  );
}

function Scope() {
  return (
    <Art viewBox="0 0 200 130">
      <motion.rect variants={rise} x="52" y="14" width="96" height="104" rx="9" fill="#fff" stroke={LINE} style={S} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="66" y="30" width="46" height="6" rx="3" fill={INK} opacity="0.85" />
      {[46, 58, 70, 82].map((y, i) => (
        <motion.rect key={y} variants={grow} style={ORIGIN_LEFT} x="66" y={y} width={i % 2 ? 56 : 68} height="5" rx="2.5" fill={LINE} />
      ))}
      <motion.path variants={draw} d="M66 102 L78 102" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="112" y="84" width="60" height="26" rx="13" fill={BLUE} />
      <motion.text variants={rise} x="142" y="101" fontSize="10" textAnchor="middle" fill="#fff" fontFamily="var(--font-geist-mono)">$ FIXED</motion.text>
      <motion.rect variants={pop} style={ORIGIN_CENTER} x="30" y="24" width="30" height="30" rx="8" fill={ORANGE} />
      <motion.path variants={draw} d="M38 40 l5 5 l9 -11" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Art>
  );
}

function Progress() {
  const xs = [30, 77, 124, 171];
  return (
    <Art viewBox="0 0 200 130">
      <motion.rect variants={rise} x="34" y="14" width="132" height="58" rx="8" fill="#fff" stroke={LINE} style={S} />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="24" width="60" height="6" rx="3" fill={INK} opacity="0.85" />
      <motion.rect variants={grow} style={ORIGIN_LEFT} x="44" y="38" width="112" height="24" rx="5" fill="#f4f6fa" />
      <motion.circle variants={pop} style={ORIGIN_CENTER} cx="100" cy="50" r="9" fill={BLUE} />
      <motion.path variants={rise} d="M97.5 45.5 L104.5 50 L97.5 54.5 Z" fill="#fff" />
      <motion.line variants={draw} x1={xs[0]} y1="98" x2={xs[3]} y2="98" stroke={LINE} strokeWidth="2" />
      <motion.line variants={draw} x1={xs[0]} y1="98" x2={xs[2]} y2="98" stroke={BLUE} strokeWidth="2" />
      {xs.map((x, i) => (
        <g key={x}>
          <motion.circle variants={pop} style={ORIGIN_CENTER} cx={x} cy="98" r="7" fill={i < 3 ? BLUE : "#fff"} stroke={i < 3 ? BLUE : LINE} strokeWidth="1.5" />
          {i < 3 ? (
            <motion.path variants={draw} d={`M${x - 3} 98 l2.2 2.2 l4 -4.6`} stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ) : null}
          <motion.text variants={rise} x={x} y="118" fontSize="7.5" textAnchor="middle" fill="#7a7a7a" fontFamily="var(--font-geist-mono)">{`W${i + 1}`}</motion.text>
        </g>
      ))}
    </Art>
  );
}

const ART = { own: Own, named: Named, scope: Scope, progress: Progress } as const;

export function CommitmentArt({ kind }: { kind: keyof typeof ART }) {
  const C = ART[kind];
  return <C />;
}
