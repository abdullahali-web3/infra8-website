"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const MONO = "var(--font-geist-mono)";

const LANES = [
  { y: 34, label: "AI code review", c: "#0654fe" },
  { y: 150, label: "Test generation", c: "#0654fe" },
  { y: 266, label: "Infra scan", c: "#0654fe" },
];

const PATHS = [
  ...LANES.map((l) => `M124 176 C160 176 140 ${l.y + 26} 176 ${l.y + 26}`),
  ...LANES.map((l) => `M340 ${l.y + 26} C380 ${l.y + 26} 360 176 396 176`),
  "M516 176 H548",
];

export function AiPipeline() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".ai-node", { opacity: 0, y: 18, duration: 0.7, stagger: 0.1, ease: "power3.out" })
          .fromTo(
            ".ai-path",
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 1, stagger: 0.08, ease: "power2.inOut" },
            0.3,
          )
          .from(".ai-ship", { scale: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(2)" }, 1.2)
          .add(() => {
            gsap.utils.toArray<SVGPathElement>(".ai-path").forEach((p, i) => {
              const dot = root.current?.querySelector<SVGCircleElement>(`.ai-dot-${i}`);
              if (!dot) return;
              gsap.set(dot, { opacity: 1 });
              gsap.to(dot, {
                motionPath: { path: p, align: p, alignOrigin: [0.5, 0.5] },
                duration: 2.4,
                ease: "none",
                repeat: -1,
                delay: (i % 3) * 0.35,
              });
            });
          });
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 600 340"
      className="h-auto w-full"
      role="img"
      aria-label="Pipeline: a pull request passes AI code review, generated tests and infrastructure scans, then a senior engineer approves before shipping"
    >
      {PATHS.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#e7e7e7" strokeWidth="2" />
          <path className="ai-path" d={d} fill="none" stroke="#0654fe" strokeOpacity="0.55" strokeWidth="2" />
        </g>
      ))}
      {PATHS.map((_, i) => (
        <circle key={i} className={`ai-dot-${i}`} r="4.5" fill="#ff9c33" opacity="0" />
      ))}

      <g className="ai-node">
        <rect x="8" y="150" width="116" height="52" rx="12" fill="#fff" stroke="#e7e7e7" />
        <text x="66" y="171" textAnchor="middle" fontSize="9" fill="#7a7a7a" fontFamily={MONO}>PULL REQUEST</text>
        <text x="66" y="188" textAnchor="middle" fontSize="12" fill="#111" fontFamily="var(--font-gsf)">feat/checkout</text>
      </g>

      {LANES.map((l) => (
        <g key={l.label} className="ai-node">
          <rect x="176" y={l.y} width="164" height="52" rx="12" fill="#fff" stroke="#e7e7e7" />
          <rect x="188" y={l.y + 19} width="14" height="14" rx="4" fill="#0654fe" fillOpacity="0.12" />
          <circle cx="195" cy={l.y + 26} r="2.6" fill="#0654fe" />
          <text x="212" y={l.y + 30} fontSize="12.5" fill="#111" fontFamily="var(--font-gsf)">{l.label}</text>
        </g>
      ))}

      <g className="ai-node">
        <rect x="396" y="146" width="120" height="60" rx="14" fill="#111" />
        <rect x="396" y="146" width="120" height="60" rx="14" fill="none" stroke="#ff9c33" strokeWidth="1.5" strokeDasharray="3 5" />
        <text x="456" y="171" textAnchor="middle" fontSize="9" fill="#ff9c33" fontFamily={MONO}>HUMAN IN CHARGE</text>
        <text x="456" y="190" textAnchor="middle" fontSize="12.5" fill="#fff" fontFamily="var(--font-gsf)">Senior review</text>
      </g>

      <g className="ai-ship">
        <circle cx="568" cy="176" r="24" fill="#00c91e" />
        <path d="M558 176 l7 7 l12 -14" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
