"use client";

import { useState } from "react";
import { FAQ, CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, Eyebrow, SlashHeading } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

type FaqItem = { readonly q: string; readonly a: string };

/**
 * FAQ: sticky heading on the left, ruled accordion on the right. Defaults to the homepage FAQ;
 * service pages pass their own. The text must match the page's FAQPage JSON-LD.
 */
export function Faq({
  items = FAQ,
  title = "Questions\nWe Hear First",
  sub = "Ownership, security, time zones and what happens if it goes wrong.",
}: {
  items?: readonly FaqItem[];
  title?: string;
  sub?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <BpSection id="faq" flush>
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <div className="border-line px-5 py-16 sm:px-8 lg:border-r lg:px-12 lg:py-24">
          <div className="flex flex-col gap-7 lg:sticky lg:top-28">
            <Eyebrow>FAQ</Eyebrow>
            <SlashHeading title={title} />
            <RevealText
              text={sub}
              delay={0.15}
              className="max-w-[360px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
            />
            <Reveal delay={0.2}>
              <BlockButton href={CTA.mvp} variant="outline">
                Ask us directly
              </BlockButton>
            </Reveal>
          </div>
        </div>

        <ul className="flex flex-col">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="relative border-line not-first:border-t">
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-brand transition-[scale] duration-500 ${isOpen ? "scale-y-100" : "scale-y-0"}`}
                />
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group/q flex w-full items-center gap-5 px-5 py-6 text-left sm:px-8 lg:px-10"
                  >
                    <span className={`w-10 shrink-0 font-mono text-[12px] leading-none transition-colors ${isOpen ? "text-brand" : "text-muted"}`}>
                      {`Q.${String(i + 1).padStart(2, "0")}`}
                    </span>
                    <span
                      className={`flex-1 font-display text-[19px] leading-7 tracking-[-0.03em] transition-colors duration-300 sm:text-[20px] ${isOpen ? "text-brand" : "text-ink group-hover/q:text-brand"}`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative grid size-8 shrink-0 place-items-center border transition-colors duration-300 ${isOpen ? "border-brand bg-brand" : "border-line bg-white group-hover/q:border-ink"}`}
                    >
                      <span className={`absolute h-px w-3 ${isOpen ? "bg-white" : "bg-ink"}`} />
                      <span
                        className={`absolute h-3 w-px transition-[scale] duration-300 ${isOpen ? "scale-y-0 bg-white" : "bg-ink"}`}
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
                    <p className="max-w-[640px] pr-5 pb-6 pl-[80px] text-base leading-7 tracking-[-0.02em] text-muted sm:pl-[92px] lg:pl-[100px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </BpSection>
  );
}
