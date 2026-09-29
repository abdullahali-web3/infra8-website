"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const TYPE_MS = 42;
const DELETE_MS = 16;
const HOLD_MS = 2400;

/**
 * Types each phrase, holds it, deletes it and moves to the next, while it is on screen.
 * The first phrase is server-rendered in full, so without JS (or with reduced motion)
 * it simply reads as a static line.
 */
export function Typewriter({ phrases, className }: { phrases: readonly string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el || phrases.length < 2) return;
    let timer = 0;
    let phrase = 0;
    let chars = phrases[0].length;
    let typing = false;

    const step = () => {
      if (typing) {
        chars += 1;
        if (chars >= phrases[phrase].length) typing = false;
      } else {
        chars -= 1;
        if (chars <= 0) {
          phrase = (phrase + 1) % phrases.length;
          typing = true;
        }
      }
      el.textContent = phrases[phrase].slice(0, chars) || " ";
      const holding = !typing && chars >= phrases[phrase].length;
      timer = window.setTimeout(step, holding ? HOLD_MS : typing ? TYPE_MS : DELETE_MS);
    };

    timer = window.setTimeout(step, HOLD_MS);
    return () => {
      window.clearTimeout(timer);
      el.textContent = phrases[0];
    };
  }, [inView, reduce, phrases]);

  return (
    <span ref={ref} className={className}>
      {phrases[0]}
    </span>
  );
}
