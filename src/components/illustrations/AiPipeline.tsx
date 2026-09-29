"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const MONO = "var(--font-geist-mono)";
const DISPLAY = "var(--font-gsf)";

const CHIPS = [
  { y: 52, label: "AI code review", tone: "#0654fe" },
  { y: 153, label: "Test generation", tone: "#ff9c33" },
  { y: 254, label: "Infra scan", tone: "#00c91e" },
];

const PATHS = [
  "M152 175 H226",
  "M284 158 C 316 130 322 74 352 74",
  "M288 175 H352",
  "M284 192 C 316 220 322 276 352 276",
  "M528 74 C 552 74 552 175 574 175",
  "M528 175 H574",
  "M528 276 C 552 276 552 175 574 175",
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
        tl.from(".ai-node", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08, ease: "power3.out" })
          .fromTo(".ai-path", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, stagger: 0.07, ease: "power2.inOut" }, 0.25)
          .from(".ai-orb", { scale: 0.6, opacity: 0, transformOrigin: "50% 50%", duration: 0.9, ease: "back.out(1.6)" }, 0.1)
          .add(() => {
            gsap.utils.toArray<SVGPathElement>(".ai-path").forEach((p, i) => {
              const dot = root.current?.querySelector<SVGCircleElement>(`.ai-dot-${i}`);
              if (!dot) return;
              gsap.set(dot, { opacity: 1 });
              gsap.to(dot, {
                motionPath: { path: p, align: p, alignOrigin: [0.5, 0.5] },
                duration: 2.2,
                ease: "none",
                repeat: -1,
                delay: (i % 4) * 0.3,
              });
            });
            gsap.to(".ai-ring", { rotation: 360, transformOrigin: "50% 50%", duration: 18, ease: "none", repeat: -1 });
          });
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 720 340"
      className="h-auto w-full"
      role="img"
      aria-label="Pipeline: a pull request goes through AI code review, generated tests and infrastructure scans, then a senior engineer approves before shipping"
    >
      <circle cx="256" cy="175" r="110" fill="url(#gGlowBlue)" />
      {PATHS.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#dbe5fb" strokeWidth="2.5" />
          <path className="ai-path" d={d} fill="none" stroke="url(#gLine)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      {PATHS.map((_, i) => (
        <circle key={i} className={`ai-dot-${i}`} r="5" fill="#ff9c33" stroke="#fff" strokeWidth="1.5" opacity="0" />
      ))}

      <g className="ai-node">
        <rect x="12" y="136" width="140" height="78" rx="16" fill="url(#gCard)" stroke="rgba(16,40,110,0.08)" filter="url(#fSoft)" />
        <circle cx="42" cy="175" r="15" fill="#fff" stroke="rgba(16,40,110,0.07)" />
        <image href="/content/logos/github.svg" x="30" y="163" width="24" height="24" />
        <text x="66" y="169" fontSize="9" fill="#8a94a8" fontFamily={MONO} letterSpacing="0.5">PULL REQUEST</text>
        <text x="66" y="187" fontSize="14" fill="#111" fontFamily={DISPLAY}>feat/checkout</text>
      </g>

      <g className="ai-orb">
        <circle cx="256" cy="175" r="66" fill="none" stroke="#0654fe" strokeOpacity="0.12" />
        <circle cx="256" cy="175" r="50" fill="none" stroke="#0654fe" strokeOpacity="0.2" />
        <circle className="ai-ring" cx="256" cy="175" r="58" fill="none" stroke="#0654fe" strokeOpacity="0.5" strokeDasharray="3 9" strokeLinecap="round" />
        <circle cx="256" cy="175" r="32" fill="url(#gBrand)" filter="url(#fLift)" />
        <circle cx="256" cy="175" r="32" fill="url(#gGlowWhite)" opacity="0.35" />
        <text x="256" y="183" textAnchor="middle" fontSize="24" fill="#fff" fontFamily={DISPLAY} letterSpacing="-0.5">AI</text>
      </g>

      {CHIPS.map((c) => (
        <g key={c.label} className="ai-node">
          <rect x="352" y={c.y - 22} width="176" height="44" rx="22" fill="url(#gCard)" stroke="rgba(16,40,110,0.08)" filter="url(#fSoft)" />
          <circle cx="376" cy={c.y} r="11" fill={c.tone} fillOpacity="0.14" />
          <circle cx="376" cy={c.y} r="4.5" fill={c.tone} />
          <text x="398" y={c.y + 5} fontSize="15" fill="#111" fontFamily={DISPLAY}>{c.label}</text>
        </g>
      ))}

      <g className="ai-node">
        <rect x="574" y="124" width="132" height="102" rx="18" fill="url(#gInk)" filter="url(#fLift)" />
        <text x="640" y="152" textAnchor="middle" fontSize="8.5" fill="#ff9c33" fontFamily={MONO} letterSpacing="0.6">HUMAN IN CHARGE</text>
        <text x="640" y="176" textAnchor="middle" fontSize="16" fill="#fff" fontFamily={DISPLAY}>Senior review</text>
        {[618, 640, 662].map((x) => (
          <g key={x}>
            <circle cx={x} cy="203" r="10" fill="#fff" fillOpacity="0.14" />
            <circle cx={x} cy="200.5" r="3.4" fill="#fff" fillOpacity="0.85" />
            <path d={`M${x - 5.5} 208 c 1 -4 9 -4 11 0`} fill="#fff" fillOpacity="0.85" />
          </g>
        ))}
        <circle cx="704" cy="124" r="14" fill="url(#gGreen)" stroke="#fff" strokeWidth="2.5" />
        <path d="M697.5 124.5 l4.5 4.5 l8 -9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
