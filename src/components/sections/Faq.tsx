"use client";

import { useState } from "react";
import { FAQ, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <RevealText
              as="h2"
              text="Questions {{we}} hear first"
              delay={0.05}
              className="font-display text-balance text-[34px] leading-[1.1] tracking-[-0.04em] text-black sm:text-[44px] sm:leading-[48px]"
            />
            <RevealText
              text="Ownership, security, time zones and what happens if it goes wrong."
              delay={0.15}
              className="max-w-[420px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
            />
            <Reveal delay={0.25}>
              <Button href={CTA.mvp} variant="secondary">
                Ask us directly
              </Button>
            </Reveal>
          </div>

          <ul className="flex flex-col">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-t border-line last:border-b">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-brand"
                    >
                      <RevealText
                        as="span"
                        text={item.q}
                        className="font-display text-xl leading-7 tracking-[-0.03em]"
                      />
                      <span
                        className={`relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? "bg-brand" : "bg-surface group-hover:bg-[#dfe8ff]"}`}
                        aria-hidden
                      >
                        <span className={`absolute h-px w-3.5 transition-colors ${isOpen ? "bg-white" : "bg-ink"}`} />
                        <span
                          className={`absolute h-3.5 w-px transition-all duration-300 ${isOpen ? "scale-y-0 bg-white" : "bg-ink"}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[640px] pb-6 text-base leading-7 tracking-[-0.02em] text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
