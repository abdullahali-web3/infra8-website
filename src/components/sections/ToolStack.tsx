"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { CTA, STACK, STACK_LAYERS } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, SectionHead } from "@/components/ui/Blueprint";
import { Logo } from "@/components/ui/Logo";
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
    <BpSection id="stack">
      <SectionHead
        eyebrow="Our stack"
        title={"The Stack Behind\nWhat We Build and Run"}
        sub="Mainstream, well-documented tools your next engineer already knows. No proprietary frameworks, no lock-in to us."
      />

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
                <ul className="mt-auto flex flex-wrap gap-2 pt-3" aria-label={`${layer.title} tools`}>
                  {layer.tools.map((t) => (
                    <li
                      key={t}
                      title={t}
                      className="grid size-9 place-items-center border border-line bg-white"
                    >
                      <Logo name={t} size={20} />
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
          <BlockButton href={CTA.contact} variant="outline">
            Tell Us Your Stack
          </BlockButton>
        </div>
      </div>
    </BpSection>
  );
}
