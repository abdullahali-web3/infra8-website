"use client";

import { motion } from "motion/react";
import { Art, BLUE, INK, LINE, draw, rise } from "./art";

const MONO = "var(--font-geist-mono)";

export function StackLayers({ labels }: { labels: readonly string[] }) {
  const n = labels.length;
  const cx = 130;
  const w = 104;
  const h = 52;
  const t = 16;
  const gap = 64;
  const top = 66;
  const order = labels.map((label, i) => ({ label, i })).reverse();
  return (
    <Art viewBox={`0 0 380 ${top + (n - 1) * gap + h + t + 20}`} label={`Layered stack: ${labels.join(", ")}`}>
      {order.map(({ label, i }) => {
        const cy = top + i * gap;
        const isTop = i === 0;
        const c = {
          top: isTop ? BLUE : "#ffffff",
          left: isTop ? "#0443c4" : "#eceff5",
          right: isTop ? "#0339a8" : "#dde2ec",
        };
        return (
          <motion.g key={label} variants={rise}>
            <path d={`M${cx - w} ${cy} L${cx} ${cy + h} L${cx} ${cy + h + t} L${cx - w} ${cy + t} Z`} fill={c.left} />
            <path d={`M${cx + w} ${cy} L${cx} ${cy + h} L${cx} ${cy + h + t} L${cx + w} ${cy + t} Z`} fill={c.right} />
            <path d={`M${cx} ${cy - h} L${cx + w} ${cy} L${cx} ${cy + h} L${cx - w} ${cy} Z`} fill={c.top} stroke={isTop ? "none" : LINE} />
            <path d={`M${cx - 26} ${cy} L${cx} ${cy - 13} L${cx + 26} ${cy} L${cx} ${cy + 13} Z`} fill="none" stroke={isTop ? "#fff" : BLUE} strokeOpacity={isTop ? 0.7 : 0.35} strokeWidth="1.5" />
            <motion.path variants={draw} d={`M${cx + w + 6} ${cy} H${cx + w + 34}`} stroke={LINE} strokeWidth="1.5" />
            <circle cx={cx + w + 6} cy={cy} r="2.6" fill={BLUE} />
            <text x={cx + w + 42} y={cy + 4} fontSize="11" fill={INK} fontFamily={MONO}>{label.toUpperCase()}</text>
          </motion.g>
        );
      })}
    </Art>
  );
}
