"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { STACK_TABS, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { StackLayers, type Layer } from "@/components/illustrations/StackLayers";

type TabKey = keyof typeof STACK_TABS;
const KEYS = Object.keys(STACK_TABS) as TabKey[];

const LAYERS: Record<TabKey, readonly Layer[]> = {
  product: [
    { label: "Frontend", logos: ["react", "nextjs", "flutter"] },
    { label: "Backend", logos: ["nodejs", "python", "django"] },
    { label: "Data", logos: ["postgresql", "mongodb", "redis"] },
    { label: "Delivery", logos: ["figma", "github", "vercel"] },
  ],
  infra: [
    { label: "Cloud", logos: ["aws", "googlecloud", "azure"] },
    { label: "IaC", logos: ["terraform", "pulumi"] },
    { label: "CI/CD", logos: ["githubactions", "gitlab", "argocd"] },
    { label: "Monitoring", logos: ["grafana", "prometheus", "datadog"] },
  ],
};

export function ToolStack() {
  const [active, setActive] = useState<TabKey>("product");

  return (
    <section id="stack" className="bg-surface-2/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our stack"
          title="The stack behind what we build {{and}} run"
          sub="Mainstream, well-documented tools your next engineer already knows. No proprietary frameworks, no lock-in to us."
        />

        <Reveal className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Choose a stack" className="relative flex w-full max-w-[520px] gap-0.5 rounded-[9px] bg-surface p-0.5">
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
                    layoutId="stack-pill"
                    className="absolute inset-0 rounded-[8px] bg-white shadow-[0_1px_2px_rgba(17,17,17,0.08)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className={`relative ${active === k ? "text-ink" : "text-[#4a4a4a] hover:text-ink"}`}>
                  {STACK_TABS[k].label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {KEYS.map((k) => {
          const isActive = active === k;
          const tab = STACK_TABS[k];
          return (
            <motion.div
              key={k}
              hidden={!isActive}
              role="tabpanel"
              aria-label={tab.label}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14"
            >
              <div className="mx-auto w-full max-w-[460px] rounded-[20px] border border-line bg-[radial-gradient(100%_80%_at_50%_0%,#e4edff_0%,#ffffff_70%)] p-4 shadow-[0_18px_40px_-28px_rgba(17,17,17,0.25)]">
                <StackLayers layers={LAYERS[k]} />
              </div>

              <div className="flex flex-col gap-8">
                <dl className="flex flex-col">
                  {tab.groups.map((g) => (
                    <div key={g.name} className="grid gap-3 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[150px_1fr]">
                      <dt className="font-mono text-[11px] uppercase leading-9 tracking-[0.04em] text-muted">
                        {g.name}
                      </dt>
                      <dd className="flex flex-wrap content-start gap-2">
                        {g.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white py-1.5 pr-3 pl-2 text-sm leading-6 tracking-[-0.02em] text-ink transition-[transform,border-color,color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-[#f1f5ff] hover:text-brand hover:shadow-[0_8px_20px_-12px_rgba(6,84,254,0.5)]"
                          >
                            <Logo name={item} size={20} />
                            {item}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="rounded-[14px] border border-brand/20 bg-[#f1f5ff] p-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-brand">Why this stack</span>
                  <RevealText text={tab.why} className="mt-2 text-base leading-6 tracking-[-0.02em] text-ink-soft" />
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <RevealText
            text="Use a different stack? We'll work in yours."
            className="font-display text-2xl tracking-[-0.03em] text-ink"
          />
          <Reveal>
            <Button href={CTA.mvp} variant="secondary">
              Tell us your stack
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
