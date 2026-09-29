"use client";

import { motion } from "motion/react";
import { PRICING, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

const SCALE: Record<string, number> = { Projects: 60, Retainers: 20 };
const GROUPS = ["Projects", "Retainers"] as const;

function formatRange(min: number, max: number, unit: string) {
  if (unit === "free") return "Free";
  return `$${min}–${max}${unit}`;
}

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="See the price range {{before}} you talk to us"
          sub="Indicative ranges in USD. The 24-hour estimate gives you the exact number for your scope."
        />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[20px] border border-line bg-white">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Indicative Infra8 price ranges in USD</caption>
              <thead>
                <tr className="border-b border-line bg-surface-2 font-mono text-xs uppercase text-muted">
                  <th scope="col" className="px-5 py-4 font-normal sm:px-8">Offer</th>
                  <th scope="col" className="px-3 py-4 font-normal">Range</th>
                  <th scope="col" className="hidden px-3 py-4 font-normal md:table-cell">Scale</th>
                  <th scope="col" className="hidden px-8 py-4 font-normal lg:table-cell">Notes</th>
                </tr>
              </thead>
              {GROUPS.map((group) => (
                <tbody key={group}>
                  <tr>
                    <th
                      colSpan={4}
                      scope="colgroup"
                      className="bg-white px-5 pt-7 pb-2 text-left font-mono text-xs font-normal uppercase text-brand sm:px-8"
                    >
                      {group === "Projects" ? "Projects" : "Retainers (per month)"}
                    </th>
                  </tr>
                  {PRICING.filter((p) => p.group === group).map((row) => {
                    const scale = SCALE[group];
                    const left = (row.min / scale) * 100;
                    const width = ((row.max - row.min) / scale) * 100;
                    return (
                      <tr
                        key={row.name}
                        className="group border-t border-line/70 transition-colors duration-300 hover:bg-[#f7faff]"
                      >
                        <th scope="row" className="px-5 py-5 text-left align-middle sm:px-8">
                          <RevealText
                            as="span"
                            text={row.name}
                            className="font-display text-base leading-6 tracking-[-0.02em] text-ink"
                          />
                        </th>
                        <td className="px-3 py-5 align-middle whitespace-nowrap">
                          <RevealText
                            as="span"
                            text={formatRange(row.min, row.max, row.unit)}
                            className="font-mono text-sm text-ink transition-colors duration-300 group-hover:text-brand"
                          />
                        </td>
                        <td className="hidden w-[34%] px-3 py-5 align-middle md:table-cell">
                          {row.unit === "free" ? (
                            <span className="font-mono text-xs uppercase text-ok">Free review</span>
                          ) : (
                            <div className="relative h-2 rounded-full bg-surface">
                              <motion.div
                                className="absolute inset-y-0 rounded-full bg-ink/80 transition-colors duration-300 group-hover:bg-brand"
                                style={{ left: `${left}%`, width: `${width}%`, transformOrigin: "left center" }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                              />
                            </div>
                          )}
                        </td>
                        <td className="hidden px-8 py-5 align-middle text-sm leading-5 tracking-[-0.02em] text-muted lg:table-cell">
                          {row.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <RevealText
            text="Price depends on scope, integrations, compliance needs and uptime requirements. The estimate gives you the exact number."
            className="max-w-[640px] text-base leading-6 tracking-[-0.02em] text-muted"
          />
          <Reveal className="flex flex-col gap-3 sm:flex-row">
            <Button href={CTA.mvp}>Get my exact quote</Button>
            <Button href={CTA.audit} variant="secondary">
              Free infra audit
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
