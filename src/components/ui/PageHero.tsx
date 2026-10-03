import type { ReactNode } from "react";
import { BP_PAD, HEADING_H1 } from "./Blueprint";
import { RevealText } from "./RevealText";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/service/Breadcrumbs";

/** Hero for content pages (insights, careers): breadcrumbs, H1, sub, optional actions and illustration. */
export function PageHero({
  crumbs,
  title,
  sub,
  actions,
  art,
}: {
  crumbs: Crumb[];
  title: string;
  sub: string;
  actions?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <section id="top" className="relative overflow-hidden border-t border-line">
      <div
        className={`grid grid-cols-[minmax(0,1fr)] items-center gap-10 pt-10 pb-12 lg:pt-14 lg:pb-20 ${art ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]" : ""} ${BP_PAD}`}
      >
        <div className="flex flex-col gap-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-7">
            <RevealText as="h1" text={title} before="/" after="/" delay={0.1} className={`${HEADING_H1} max-w-[820px]`} />
            <RevealText
              text={sub}
              delay={0.3}
              className="max-w-[620px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]"
            />
          </div>
          {actions ? <Reveal delay={0.4}>{actions}</Reveal> : null}
        </div>
        {art ? (
          <Reveal y={16} delay={0.2} className="group/card relative">
            <div aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_25%,transparent)]" />
            <div className="relative h-[260px] sm:h-[340px]">{art}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
