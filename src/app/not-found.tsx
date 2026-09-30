import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BlueprintColumn, Eyebrow, HEADING_H1 } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { NotFoundIso } from "@/components/illustrations/iso/NotFoundIso";

const POPULAR = [
  { name: "Services", href: ROUTES.services, body: "MVP development, dedicated teams and managed DevOps." },
  { name: "MVP development", href: ROUTES.mvpDevelopment, body: "From idea to launch, with an estimate in 24 hours." },
  { name: "Insights", href: ROUTES.insights, body: "Guides on MVP cost, DevOps, AWS and SOC 2." },
  { name: "About", href: ROUTES.about, body: "Who we are and how we work." },
];

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/** Custom 404: rendered for every unmatched URL and for notFound() calls (e.g. unknown articles). */
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <BlueprintColumn>
          <section id="top" className="relative overflow-hidden border-t border-line">
            <div
              className={`grid grid-cols-[minmax(0,1fr)] items-center gap-10 pt-12 pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:pt-20 lg:pb-24 ${BP_PAD}`}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-7">
                  <Eyebrow>Error 404</Eyebrow>
                  <RevealText
                    as="h1"
                    text="This Page Doesn't Exist"
                    before="/"
                    after="/"
                    delay={0.1}
                    className={`${HEADING_H1} text-balance`}
                  />
                  <RevealText
                    text="The link may be old, or the page may have moved. Here are the places most people are looking for."
                    delay={0.25}
                    className="max-w-[560px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
                  />
                </div>
                <Reveal delay={0.35} className="flex flex-wrap gap-3">
                  <BlockButton href="/" variant="brand">
                    Back to Home
                  </BlockButton>
                  <BlockButton href="/#get-started" variant="outline">
                    Contact Us
                  </BlockButton>
                </Reveal>
              </div>
              <Reveal y={16} delay={0.15} className="relative">
                <div aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_25%,transparent)]" />
                <div className="relative h-[260px] sm:h-[340px]">
                  <NotFoundIso />
                </div>
              </Reveal>
            </div>
          </section>

          <section className="border-t border-line" aria-label="Popular pages">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {POPULAR.map((p) => (
                <li
                  key={p.href}
                  className="border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l"
                >
                  <Link href={p.href} className="group/card relative flex h-full flex-col gap-2 px-6 py-8 transition-colors hover:bg-surface-2 lg:px-8">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
                    />
                    <span className="flex items-center justify-between gap-3 font-display text-[22px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors group-hover/card:text-brand">
                      {p.name}
                      <ChevronRight aria-hidden className="size-5 transition-[translate] duration-300 group-hover/card:translate-x-1" strokeWidth={1.75} />
                    </span>
                    <span className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{p.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
