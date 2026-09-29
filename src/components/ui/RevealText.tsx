"use client";

import { motion, type Variants } from "motion/react";
const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
  li: motion.li,
  dt: motion.dt,
  dd: motion.dd,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

const EASE = [0.22, 1, 0.36, 1] as const;

const wordVariants: Variants = {
  hidden: { y: "118%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

function parse(text: string) {
  return text
    .split(/(\{\{[^}]*\}\})/g)
    .filter(Boolean)
    .map((seg) =>
      seg.startsWith("{{")
        ? { text: seg.slice(2, -2), accent: true }
        : { text: seg, accent: false },
    );
}

type Props = {
  text: string;
  as?: RevealTag;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Text emerges from below its baseline, word by word, as the element enters
 * the viewport. Use `{{word}}` in `text` to mark serif-italic accent words.
 */
export function RevealText({
  text,
  as = "p",
  className,
  accentClassName = "font-serif-accent italic font-normal text-ink/40 tracking-[-0.01em]",
  delay = 0,
  stagger = 0.035,
}: Props) {
  const Tag = MOTION_TAGS[as];
  const parentVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const nodes = parse(text).flatMap((seg, segIndex) =>
    seg.text.split(/(\s+)/).map((token, tokenIndex) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) return " ";
      return (
        <span
          key={`${segIndex}-${tokenIndex}`}
          className="-mr-[0.08em] -mb-[0.18em] -ml-[0.05em] inline-block overflow-hidden pr-[0.08em] pb-[0.18em] pl-[0.05em] align-top"
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block will-change-transform ${seg.accent ? accentClassName : ""}`}
          >
            {token}
          </motion.span>
        </span>
      );
    }),
  );

  return (
    <Tag
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {nodes}
    </Tag>
  );
}
