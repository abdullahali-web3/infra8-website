"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { CTA, LAYER_STATS, STACK, STACK_LAYERS } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BpSection, SlashHeading } from "@/components/ui/Blueprint";
import { CountUp } from "@/components/ui/CountUp";
import { Logo } from "@/components/ui/Logo";
import { RevealText } from "@/components/ui/RevealText";
import { LayerStack } from "@/components/illustrations/iso/LayerStack";

const CYCLE_MS = 2800;

/**
 * "Our stack": the five layers we build and run, as an exploded isometric stack. It cycles through
 * the layers on its own; hovering a plate, a label or a layer cell selects that layer and holds it.
 * Every tool is also real text in the cells below (logo + name), so nothing depends on the animation.
 */
export function ToolStack() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || held || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STACK_LAYERS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, held, reduce]);

  const select = (i: number) => {
    setActive(i);
    setHeld(true);
  };

  return (
    <BpSection id="stack" index={4} label="Our stack">
      <div className={`mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between ${BP_PAD}`}>
        <SlashHeading title={"The Stack Behind\nWhat We Build {{and}} Run"} />
        <div className="flex max-w-[440px] flex-col gap-6">
          <RevealText
            text="Mainstream, well-documented tools your next engineer already knows. No proprietary frameworks, no lock-in to us."
            delay={0.15}
            className="text-base leading-7 tracking-[-0.02em] text-ink-soft"
          />
          <dl className="grid grid-cols-3 border-y border-line">
            {LAYER_STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5 border-line py-3 not-first:border-l not-first:pl-4">
                <dt className="order-2 font-mono text-[10px] leading-3 tracking-[0.02em] text-muted uppercase">{s.label}</dt>
                <dd className="order-1 font-display text-[28px] leading-none tracking-[-0.04em] text-ink">
                  <CountUp to={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div ref={ref} className="mt-12 lg:mt-16" onMouseLeave={() => setHeld(false)}>
        <div className="relative border-t border-line px-5 py-12 lg:py-16">
          <div aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_30%,transparent)]" />
          <div className="relative">
            <LayerStack active={active} onSelect={select} />
          </div>
        </div>

        <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {STACK_LAYERS.map((layer, i) => {
            const on = i === active;
            return (
              <li
                key={layer.key}
                onMouseEnter={() => select(i)}
                className={`relative flex flex-col gap-3 border-line p-5 transition-colors duration-500 max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l ${on ? "bg-brand-tint/50" : "bg-white"}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -top-px h-0.5 bg-brand transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                />
                <span className={`font-mono text-[12px] leading-none transition-colors duration-500 ${on ? "text-brand" : "text-muted"}`}>
                  {`L.0${i + 1}`}
                </span>
                <h3 className="font-display text-[20px] leading-6 tracking-[-0.03em] text-ink">{layer.title}</h3>
                <p className="text-sm leading-5 tracking-[-0.01em] text-muted">{layer.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label={`${layer.title} tools`}>
                  {layer.tools.map((t) => (
                    <li
                      key={t}
                      title={t}
                      className="grid size-7 place-items-center border border-line bg-white"
                    >
                      <Logo name={t} size={15} />
                      <span className="sr-only">{t}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid border-t border-line lg:grid-cols-3">
        {STACK.why.map((w) => (
          <div key={w.label} className="flex flex-col gap-3 border-line p-5 not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l lg:p-6">
            <span className="font-mono text-[12px] leading-none text-brand uppercase">{w.label}</span>
            <p className="text-base leading-6 tracking-[-0.02em] text-ink-soft">{w.body}</p>
          </div>
        ))}
        <div className="dots flex flex-col items-start justify-center gap-4 border-t border-line p-5 lg:border-t-0 lg:border-l lg:p-6">
          <p className="bg-white font-display text-[20px] leading-6 tracking-[-0.03em] text-ink">
            Use a different stack? We&rsquo;ll work in yours.
          </p>
          <BlockButton href={CTA.mvp} variant="outline">
            Tell us your stack
          </BlockButton>
        </div>
      </div>
    </BpSection>
  );
}
