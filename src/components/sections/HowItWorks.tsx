"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { TRACKS } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BpSection, SectionHead } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";
import { Segmented } from "@/components/ui/Segmented";
import { StepIso, type StepState } from "@/components/illustrations/iso/StepIso";

type TrackKey = keyof typeof TRACKS;

const KEYS = Object.keys(TRACKS) as TrackKey[];
const STEP_MS = 4500;
const HOLD_FILL_MS = 450;

const INDEX_TONE: Record<StepState, string> = { done: "text-ink/60", active: "text-brand", next: "text-muted/60" };
const TITLE_TONE: Record<StepState, string> = { done: "text-ink", active: "text-brand", next: "text-muted" };

/**
 * "How it works": four step cells per track. The active step's bar fills, then hands over to the
 * next one (CSS animation + animationend), so the section plays through the process on its own.
 * Hovering a step jumps to it and holds. Both tracks stay in the DOM for crawlers.
 */
export function HowItWorks() {
  const [track, setTrack] = useState<TrackKey>("product");
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { amount: 0.35 });
  const running = inView && !held;

  function chooseTrack(k: TrackKey) {
    setTrack(k);
    setStep(0);
  }

  return (
    <BpSection id="how-it-works">
      <SectionHead
        eyebrow="How it works"
        title={"What Happens After\nYou Contact Us"}
        aside={
          <Reveal delay={0.15}>
            <BlockButton href={TRACKS[track].ctaHref}>{TRACKS[track].cta}</BlockButton>
          </Reveal>
        }
      />

      <div className={`mt-10 ${BP_PAD}`}>
        <Segmented
          kind="tabs"
          label="Choose a track"
          value={track}
          onChange={chooseTrack}
          options={KEYS.map((k) => ({ value: k, label: TRACKS[k].label }))}
        />
      </div>


      <div ref={gridRef} onMouseLeave={() => setHeld(false)} className="mt-10 lg:mt-12">
        {KEYS.map((k) => {
          const isActive = track === k;
          return (
            <ol
              key={k}
              hidden={!isActive}
              role="tabpanel"
              aria-label={TRACKS[k].label}
              className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4"
            >
              {TRACKS[k].steps.map((s, i) => {
                const state: StepState = !isActive || i > step ? "next" : i === step ? "active" : "done";
                return (
                  <li
                    key={s.title}
                    onMouseEnter={() => {
                      setStep(i);
                      setHeld(true);
                    }}
                    className="relative flex min-h-[320px] flex-col border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l"
                  >
                    <div className="flex min-h-[110px] flex-col gap-3 px-5 pt-5">
                      <span className={`font-mono text-[12px] leading-none transition-colors duration-500 ${INDEX_TONE[state]}`}>
                        {`// 00${i + 1}`}
                      </span>
                      <p className="max-w-[240px] text-sm leading-5 tracking-[-0.01em] text-muted">{s.body}</p>
                    </div>

                    <div className="relative h-[3px] w-full bg-transparent">
                      {state === "done" ? <span className="absolute inset-0 bg-brand" /> : null}
                      {state === "active" ? (
                        <span
                          // A hovered step fills its bar quickly and holds; otherwise the bar runs on the timer.
                          // The key includes `held`, so leaving the step restarts a fresh timed fill.
                          key={`${k}-${step}-${held}`}
                          className="bp-progress absolute inset-0 bg-brand"
                          style={{
                            ["--bp-dur" as string]: held ? `${HOLD_FILL_MS}ms` : `${STEP_MS}ms`,
                            animationTimingFunction: held ? "cubic-bezier(0.22, 1, 0.36, 1)" : "linear",
                            animationPlayState: held || running ? "running" : "paused",
                          }}
                          onAnimationEnd={() => {
                            if (!held) setStep((n) => (n + 1) % TRACKS[k].steps.length);
                          }}
                        />
                      ) : null}
                    </div>

                    <h3
                      className={`px-5 pt-5 font-display text-[22px] leading-[1.15] tracking-[-0.03em] transition-colors duration-500 ${TITLE_TONE[state]}`}
                    >
                      {s.title}
                    </h3>
                    <div className="mt-auto flex justify-end px-4 pt-4 pb-4">
                      <div className="h-[112px] w-[136px]">
                        <StepIso track={k} index={i} state={state} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        })}
      </div>

    </BpSection>
  );
}
