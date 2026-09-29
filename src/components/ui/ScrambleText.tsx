"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#";
const KEEP = /[\s[\]./>-]/;

/**
 * Mono label that decodes itself from random glyphs, left to right, the first time it scrolls
 * into view. The server-rendered text is the final text, so crawlers and reduced-motion
 * visitors only ever see the real label.
 */
export function ScrambleText({
  text,
  className,
  duration = 700,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      el.textContent = text
        .split("")
        .map((c, i) => (i < settled || KEEP.test(c) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      if (t < 1) raf = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [inView, reduce, text, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
