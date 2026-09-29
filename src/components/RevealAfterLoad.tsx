"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades a block in, but never sooner than `after` seconds after the page mounted.
 *
 * The hero animates in on load, so anything already inside the first viewport (the client
 * strip) has to wait for it instead of sitting fully drawn beside an empty hero. Once the
 * page is older than `after` (the visitor scrolled down to it), it simply fades in as it
 * enters the view, with no artificial delay.
 */
export function RevealAfterLoad({
  children,
  after = 0.9,
  className,
}: {
  children: ReactNode;
  after?: number;
  className?: string;
}) {
  const mountedAt = useRef(0);
  const [reveal, setReveal] = useState({ shown: false, delay: 0 });

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: reveal.shown ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: reveal.delay }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      onViewportEnter={() => {
        const age = (performance.now() - mountedAt.current) / 1000;
        setReveal({ shown: true, delay: Math.max(0, after - age) });
      }}
    >
      {children}
    </motion.div>
  );
}
