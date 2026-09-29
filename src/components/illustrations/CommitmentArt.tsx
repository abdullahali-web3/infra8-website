"use client";

import { motion } from "motion/react";
import { Art, Badge, Bar, Check, Float, Glass, P, Pill, R, F, Txt, BLUE, INK, MUTE, ORANGE, draw } from "./art";

const VB = "0 0 300 168";

function Own() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="222" cy="112" r="64" fill="url(#gGlowOrange)" />
        <g fill="none" stroke={BLUE} strokeOpacity="0.1">
          <circle cx="110" cy="76" r="88" />
          <circle cx="110" cy="76" r="58" />
        </g>
      </F>
      <R>
        <Glass x={30} y={22} w={166} h={112} r={16} shadow="fLift" />
        <Badge cx={54} cy={44} r={12} logo="github" />
        <Txt x={72} y={47} size={9.5} fill="#4a5568" font="mono" ls={0.3}>your-repo</Txt>
        {[68, 88, 108].map((y, i) => (
          <g key={y}>
            <rect x="46" y={y} width="12" height="12" rx="3.5" fill={i === 0 ? "#e8f0ff" : "#eef1f7"} />
            <Bar x={66} y={y + 3.5} w={[92, 74, 104][i]} h={5} />
          </g>
        ))}
        <Pill x={140} y={30} w={48} h={16} label="YOURS" tone="orange" size={8} />
      </R>
      <P>
        <Float a={-5} t={6}>
          <circle cx="212" cy="112" r="22" fill="url(#gBrand)" filter="url(#fLift)" />
          <circle cx="212" cy="112" r="7" fill="#fff" />
          <rect x="230" y="108" width="46" height="9" rx="4.5" fill="url(#gBrand)" filter="url(#fSoft)" />
          <rect x="256" y="115" width="6" height="12" rx="2.5" fill="url(#gBrand)" />
          <rect x="267" y="115" width="6" height="9" rx="2.5" fill="url(#gBrand)" />
        </Float>
      </P>
      <P>
        <Check cx={186} cy={26} r={11} />
      </P>
    </Art>
  );
}

function Avatar({ cx, cy, r, hue = "gOrange" }: { cx: number; cy: number; r: number; hue?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${hue})`} />
      <circle cx={cx} cy={cy - r * 0.18} r={r * 0.32} fill="#fff" opacity="0.95" />
      <path d={`M${cx - r * 0.55} ${cy + r * 0.62} C ${cx - r * 0.5} ${cy + r * 0.12} ${cx + r * 0.5} ${cy + r * 0.12} ${cx + r * 0.55} ${cy + r * 0.62}`} fill="#fff" opacity="0.95" />
    </g>
  );
}

function Named() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="70" r="90" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <Glass x={74} y={10} w={152} h={62} r={14} opacity={0.45} shadow={null} />
        <Glass x={62} y={22} w={176} h={66} r={14} opacity={0.75} shadow="fTiny" />
      </R>
      <R>
        <Float a={-3}>
          <Glass x={44} y={36} w={212} h={78} r={16} shadow="fLift" />
          <Avatar cx={80} cy={76} r={22} />
          <Bar x={112} y={56} w={78} h={8} c={INK} o={0.85} />
          <Pill x={112} y={72} w={108} h={17} label="SENIOR ENGINEER" tone="blue" size={8} />
          <Bar x={112} y={98} w={92} />
        </Float>
      </R>
      <P>
        <Check cx={248} cy={40} r={10} />
      </P>
      <R>
        <g>
          {[
            { x: 98, h: "gBrand" },
            { x: 124, h: "gOrange" },
            { x: 150, h: "gGreen" },
          ].map((a) => (
            <g key={a.x}>
              <circle cx={a.x} cy={140} r={15} fill="#fff" />
              <Avatar cx={a.x} cy={140} r={13} hue={a.h} />
            </g>
          ))}
          <Txt x={178} y={144} size={9.5} fill={MUTE} font="mono" ls={0.3}>YOUR TEAM</Txt>
        </g>
      </R>
    </Art>
  );
}

function Scope() {
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="80" r="86" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <g transform="rotate(-6 70 100)">
          <Glass x={30} y={54} w={76} h={62} r={11} opacity={0.85} shadow="fTiny" />
          <Txt x={40} y={72} size={8} fill={MUTE} font="mono" ls={0.4}>MILESTONES</Txt>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={44} cy={86 + i * 10} r="2.6" fill={i === 0 ? "#00c91e" : "#cfd8ea"} />
              <Bar x={52} y={84 + i * 10} w={[38, 30, 34][i]} h={4} />
            </g>
          ))}
        </g>
      </R>
      <R>
        <Float a={-3}>
          <Glass x={90} y={12} w={130} h={138} r={14} shadow="fLift" />
          <Bar x={104} y={28} w={64} h={7} c={INK} o={0.85} />
          <Bar x={104} y={42} w={40} h={4} />
          {[62, 80, 98].map((y, i) => (
            <g key={y}>
              <rect x="104" y={y} width="5" height="5" fill={ORANGE} />
              <Bar x={114} y={y} w={[78, 64, 70][i]} h={5} />
              <Bar x={114} y={y + 8} w={[54, 72, 46][i]} h={4} />
            </g>
          ))}
          <motion.path variants={draw} d="M104 132 c 6 -14 10 6 16 -4 s 10 -12 14 2 s 8 -4 14 -6" stroke={BLUE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="206" cy="30" r="12" fill="url(#gOrange)" filter="url(#fSoft)" />
          <path d="M200.5 30.5 l4 4 l7 -8" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Float>
      </R>
      <P>
        <rect x="176" y="128" width="84" height="26" rx="13" fill="url(#gBrand)" filter="url(#fLift)" />
        <Txt x={218} y={145} size={10.5} fill="#fff" font="display" anchor="middle" ls={0.3}>$ Fixed price</Txt>
      </P>
    </Art>
  );
}

function Progress() {
  const xs = [58, 116, 174, 232];
  return (
    <Art viewBox={VB}>
      <F>
        <circle cx="150" cy="60" r="92" fill="url(#gGlowBlue)" />
      </F>
      <R>
        <Float a={-3}>
          <Glass x={42} y={10} w={216} h={90} r={14} shadow="fLift" />
          <circle cx="56" cy="24" r="2.5" fill="#ff8a70" />
          <circle cx="64" cy="24" r="2.5" fill="#ffc45a" />
          <circle cx="72" cy="24" r="2.5" fill="#5be36f" />
          <Bar x={54} y={40} w={84} h={8} c={INK} o={0.85} />
          <Bar x={54} y={56} w={100} />
          <Bar x={54} y={66} w={76} />
          <rect x="54" y="78" width="46" height="14" rx="7" fill="url(#gBrand)" />
          <rect x="168" y="34" width="80" height="58" rx="9" fill="url(#gImg)" />
          <circle cx="208" cy="63" r="14" fill="url(#gBrand)" filter="url(#fSoft)" />
          <path d="M203.5 56.5 L215 63 L203.5 69.5 Z" fill="#fff" />
        </Float>
      </R>
      <motion.line variants={draw} x1={xs[0]} x2={xs[3]} y1="132" y2="132" stroke="#dbe3f3" strokeWidth="3" strokeLinecap="round" />
      <motion.line variants={draw} x1={xs[0]} x2={xs[2]} y1="132" y2="132" stroke="url(#gLine)" strokeWidth="3" strokeLinecap="round" />
      {xs.map((x, i) => (
        <g key={x}>
          <P>
            {i < 3 ? (
              <Check cx={x} cy={132} r={10} fill="url(#gBrand)" />
            ) : (
              <circle cx={x} cy={132} r="9" fill="#fff" stroke="#c9d5ee" strokeWidth="1.6" />
            )}
          </P>
          <R>
            <Txt x={x} y={158} size={9.5} fill={i < 3 ? BLUE : MUTE} font="mono" anchor="middle" ls={0.4}>{`WEEK ${i + 1}`}</Txt>
          </R>
        </g>
      ))}
      <P>
        <Pill x={196} y={2} w={70} h={17} label="LIVE DEMO" tone="white" size={8} />
      </P>
    </Art>
  );
}

const ART = { own: Own, named: Named, scope: Scope, progress: Progress } as const;

export function CommitmentArt({ kind }: { kind: keyof typeof ART }) {
  const C = ART[kind];
  return <C />;
}
