"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TRACKS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { StepArt } from "@/components/illustrations/StepArt";

type TrackKey = keyof typeof TRACKS;
const KEYS = Object.keys(TRACKS) as TrackKey[];

export function HowItWorks() {
  const [active, setActive] = useState<TrackKey>("product");

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-7">
            <Eyebrow>How it works</Eyebrow>
            <RevealText
              as="h2"
              text="What happens after you contact us"
              delay={0.05}
              className="font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] text-black sm:text-[44px] sm:leading-[48px]"
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
                      className="absolute inset-0 rounded-[8px] bg-white shadow-[0_1px_2px_rgba(17,17,17,0.08)]"
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
              <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2 lg:p-2">
                {TRACKS[k].steps.map((s, i) => (
                  <li key={s.title} className="flex">
                    <article className="group flex w-full flex-col gap-6 rounded-[16px] border border-transparent bg-surface-2 p-6 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/20 hover:bg-white hover:shadow-[0_24px_48px_-28px_rgba(6,84,254,0.3)]">
                      <div className="h-[190px] w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                        <StepArt track={k} index={i} />
                      </div>
                      <div className="flex flex-col gap-5">
                        <span className="font-mono text-sm tracking-[-0.03em] text-brand">
                          STEP {i + 1}
                        </span>
                        <RevealText
                          as="h3"
                          text={s.title}
                          className="font-display text-2xl leading-7 tracking-[-0.03em] text-ink"
                        />
                        <RevealText
                          text={s.body}
                          className="text-base leading-6 tracking-[-0.02em] text-muted"
                        />
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex justify-center">
                <Button href={TRACKS[k].ctaHref}>{TRACKS[k].cta}</Button>
              </div>
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
}
