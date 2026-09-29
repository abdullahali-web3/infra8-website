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
const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

const wordVariants: Variants = {
  hidden: { y: "118%" },
  show: { y: "0%", transition: { duration: 0.65, ease: EASE } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
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
 * Headings (h1/h2): words emerge from below their baseline as the heading
 * enters the viewport. Every other text element just fades in.
 * Use `{{word}}` in `text` to mark serif-italic accent words.
 */
export function RevealText({
  text,
  as = "p",
  className,
  accentClassName = "font-serif-accent italic font-extralight text-ink/40 tracking-[-0.01em]",
  delay = 0,
  stagger = 0.03,
}: Props) {
  const Tag = MOTION_TAGS[as];
  const isHeading = as === "h1" || as === "h2";

  if (!isHeading) {
    return (
      <Tag
        className={className}
        variants={fadeVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        custom={delay}
      >
        {text.replace(/\{\{|\}\}/g, "")}
      </Tag>
    );
  }

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
      viewport={VIEWPORT}
    >
      {nodes}
    </Tag>
  );
}
