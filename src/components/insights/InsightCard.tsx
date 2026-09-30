import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { formatDate, readingTime, type Insight } from "@/lib/insights";
import { Tag } from "@/components/ui/Blueprint";
import { StageIso } from "@/components/illustrations/iso/StageIso";
import { DocIso } from "@/components/illustrations/iso/DocIso";
import { CtaIso } from "@/components/illustrations/iso/CtaIso";

function CardArt({ art }: { art: Insight["art"] }) {
  if (art === "scope" || art === "arch" || art === "audit") return <DocIso kind={art} />;
  if (art === "cta") return <CtaIso />;
  return <StageIso stage={art} />;
}

export function insightHref(slug: string) {
  return `${ROUTES.insights}/${slug}`;
}

/** Article card: its scene, category, date, title and summary. Hover turns it blue. */
export function InsightCard({ insight, as: Heading = "h2" }: { insight: Insight; as?: "h2" | "h3" }) {
  return (
    <Link href={insightHref(insight.slug)} className="group/card relative flex h-full flex-col">
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
      />
      <span className="relative mx-6 mt-6 block h-[180px] overflow-hidden border border-line bg-white lg:mx-8">
        <span aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_25%,transparent)]" />
        <span className="relative block h-full w-full p-3">
          <CardArt art={insight.art} />
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-8 lg:px-8">
        <span className="flex flex-wrap items-center gap-3">
          <Tag tone="brand">{insight.category}</Tag>
          <span className="font-mono text-[11px] leading-none text-muted uppercase">
            {formatDate(insight.published)} · {readingTime(insight)} min read
          </span>
        </span>
        <Heading className="font-display text-[22px] leading-[1.25] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover/card:text-brand">
          {insight.title}
        </Heading>
        <span className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{insight.description}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[12px] leading-none text-ink-soft uppercase transition-colors group-hover/card:text-brand">
          Read article
          <ChevronRight aria-hidden className="size-4 transition-[translate] duration-300 group-hover/card:translate-x-1" strokeWidth={1.75} />
        </span>
      </span>
    </Link>
  );
}
