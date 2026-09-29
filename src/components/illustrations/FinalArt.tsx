"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CX = 220;
const CY = 150;
const ORBIT = 118;
const LOGOS = ["aws", "github", "vercel", "docker", "kubernetes", "terraform"];

export function FinalArt() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fa-ring",
          { scale: 0.85, opacity: 0.4, transformOrigin: "50% 50%" },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 40%", scrub: 0.6 },
          },
        );
        gsap.to(".fa-core", { y: -8, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".fa-orbit", { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 60, ease: "none", repeat: -1 });
        gsap.to(".fa-badge", { rotation: -360, transformOrigin: "50% 50%", duration: 60, ease: "none", repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 440 300" className="h-auto w-full" aria-hidden>
      <circle cx={CX} cy={CY} r="150" fill="url(#gGlowWhite)" />
      {[54, 86, 118].map((r, i) => (
        <circle key={r} className="fa-ring" cx={CX} cy={CY} r={r} fill="none" stroke="#fff" strokeOpacity={0.55 - i * 0.12} strokeWidth="1.3" strokeDasharray={i === 2 ? "3 7" : undefined} />
      ))}

      <g className="fa-orbit">
        {LOGOS.map((logo, i) => {
          const a = (i / LOGOS.length) * Math.PI * 2 - Math.PI / 2;
          const x = CX + Math.cos(a) * ORBIT;
          const y = CY + Math.sin(a) * ORBIT;
          const s = logo === "aws" ? 32 : 24;
          return (
            <g key={logo} className="fa-badge">
              <circle cx={x} cy={y} r="24" fill="#fff" filter="url(#fLift)" />
              <image href={`/content/logos/${logo}.svg`} x={x - s / 2} y={y - s / 2} width={s} height={s} />
            </g>
          );
        })}
      </g>

      <g className="fa-core" filter="url(#fLift)">
        <path d={`M${CX - 58} ${CY + 2} L${CX} ${CY + 32} L${CX} ${CY + 52} L${CX - 58} ${CY + 22} Z`} fill="#c9dafc" />
        <path d={`M${CX + 58} ${CY + 2} L${CX} ${CY + 32} L${CX} ${CY + 52} L${CX + 58} ${CY + 22} Z`} fill="#a9c4fb" />
        <path d={`M${CX} ${CY - 30} L${CX + 58} ${CY + 2} L${CX} ${CY + 32} L${CX - 58} ${CY + 2} Z`} fill="#fff" />
        <g transform={`translate(${CX} ${CY + 2}) matrix(0.866 0.5 -0.866 0.5 0 0)`}>
          <g transform="translate(-12 -14.4) scale(1.25)">
            <path
              d="M14.6518 19.3172C14.6518 21.9034 12.5596 24 9.97877 24H9.18122C6.60036 24 4.50816 21.9034 4.50816 19.3172H14.6518ZM19.16 14.7996C19.16 17.2946 17.1416 19.3172 14.6518 19.3172V9.76523C14.6518 6.95829 12.3811 4.68281 9.57999 4.68281C6.7789 4.68281 4.50816 6.95829 4.50816 9.76523V19.3172C2.01837 19.3172 0 17.2946 0 14.7996V9.6C0 4.29807 4.28911 0 9.57999 0C14.8709 0 19.16 4.29807 19.16 9.6V14.7996Z"
              fill="#0654fe"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
