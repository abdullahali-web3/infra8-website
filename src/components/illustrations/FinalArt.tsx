"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function FinalArt() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fa-ring",
          { scale: 0.82, opacity: 0.45, transformOrigin: "50% 50%" },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 35%", scrub: 0.6 },
          },
        );
        gsap.to(".fa-core", { y: -10, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".fa-orbit", { rotation: 360, duration: 26, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      });
    },
    { scope: root },
  );

  const rings = [150, 122, 94, 66];

  return (
    <svg ref={root} viewBox="0 0 360 260" className="h-auto w-full" aria-hidden>
      {rings.map((w, i) => (
        <path
          key={w}
          className="fa-ring"
          d={`M180 ${130 - w / 2} L${180 + w} 130 L180 ${130 + w / 2} L${180 - w} 130 Z`}
          fill={i === rings.length - 1 ? "rgba(255,255,255,0.14)" : "none"}
          stroke="#fff"
          strokeOpacity={0.85 - i * 0.12}
          strokeWidth="1.5"
        />
      ))}
      <g className="fa-orbit">
        <circle cx="180" cy="130" r="112" fill="none" stroke="#fff" strokeOpacity="0.18" strokeDasharray="2 8" />
        <circle cx="292" cy="130" r="5" fill="#ff9c33" />
        <circle cx="68" cy="130" r="3" fill="#fff" fillOpacity="0.8" />
      </g>
      <g className="fa-core">
        <path d="M180 100 L226 123 L180 146 L134 123 Z" fill="#fff" />
        <path d="M134 123 L180 146 L180 164 L134 141 Z" fill="#dfe8ff" />
        <path d="M226 123 L180 146 L180 164 L226 141 Z" fill="#c4d4ff" />
        <g transform="translate(180 123) matrix(0.85 0.425 -0.85 0.425 0 0)">
          <g transform="translate(-11.5 -14.4) scale(1.2)">
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
