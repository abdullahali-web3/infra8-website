"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TRACKS } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { StepArt } from "@/components/illustrations/StepArt";

type TrackKey = keyof typeof TRACKS;

const KEYS = Object.keys(TRACKS) as TrackKey[];
const TRIM = "[text-box:trim-both_cap_alphabetic]";

/** "How it works": Figma node 177:762 (layout, copy and tab names), with flat product-UI illustrations. */
export function HowItWorks() {
  const [active, setActive] = useState<TrackKey>("product");

  return (
    <section id="how-it-works" className="py-20 sm:py-28 lg:pt-[60px] lg:pb-[100px]">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-7">
            <Eyebrow trim>How it works</Eyebrow>
            <RevealText
              as="h2"
              text="What Happens After You Contact Us"
              delay={0.05}
              className={`font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] text-black sm:text-[44px] sm:leading-[48px] ${TRIM}`}
            />
          </div>
          <Reveal delay={0.15}>
            <div
              role="tablist"
              aria-label="Choose a track"
              className="relative flex w-full gap-0.5 rounded-[9px] bg-surface p-0.5 lg:w-[371px]"
            >
              {KEYS.map((k) => (
                <button
                  key={k}
                  role="tab"
                  type="button"
                  aria-selected={active === k}
                  onClick={() => setActive(k)}
                  className="relative h-9 flex-1 rounded-[8px] px-2 text-sm tracking-[-0.03em] transition-colors duration-200"
                >
                  {active === k ? (
                    <motion.span
                      layoutId="track-pill"
                      className="absolute inset-0 rounded-[8px] bg-white"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className={`relative ${active === k ? "text-ink" : "text-[#4a4a4a] hover:text-ink"}`}>
                    {TRACKS[k].label}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {KEYS.map((k) => {
          const isActive = active === k;
          return (
            <motion.div
              key={k}
              hidden={!isActive}
              role="tabpanel"
              aria-label={TRACKS[k].label}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[10px] lg:p-2">
                {TRACKS[k].steps.map((s, i) => (
                  <li key={s.title} className="flex">
                    <Reveal delay={i * 0.08} className="flex w-full">
                      {/* Hover is a flat state change: the card turns white and gains a 1px #e7e7e7 stroke. */}
                      <article className="flex w-full flex-col gap-6 rounded-[16px] border border-transparent bg-surface-2 p-[23px] transition-[background-color,border-color] duration-300 ease-out hover:border-line hover:bg-white">
                        <div className="h-[190px] w-full overflow-hidden rounded-[10px] bg-surface">
                          <StepArt track={k} index={i} />
                        </div>
                        <div className="flex flex-col gap-5">
                          <span className={`font-mono text-[14px] leading-6 tracking-[-0.03em] text-brand ${TRIM}`}>
                            STEP {i + 1}
                          </span>
                          <div className="flex flex-col gap-3">
                            <h3 className={`font-display text-[22px] leading-[1.15] tracking-[-0.03em] text-ink ${TRIM}`}>
                              {s.title}
                            </h3>
                            <p className={`text-base leading-6 tracking-[-0.02em] text-muted ${TRIM}`}>{s.body}</p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex justify-center">
                <PillButton href={TRACKS[k].ctaHref}>{TRACKS[k].cta}</PillButton>
              </div>
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
}
