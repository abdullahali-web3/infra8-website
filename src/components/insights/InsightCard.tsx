import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { formatDate, readingTime, type Insight } from "@/lib/insights";
import { Tag } from "@/components/ui/Blueprint";

export function insightHref(slug: string) {
  return `${ROUTES.insights}/${slug}`;
}

/**
 * Article card, text only: topic, index number, title, summary and reading time. Editorial cards
 * read better than repeating the site's illustrations on every article. Hover turns it blue.
 */
export function InsightCard({
  insight,
  index,
  as: Heading = "h2",
}: {
  insight: Insight;
  /** 1-based position, shown as a large muted number. */
  index: number;
  as?: "h2" | "h3";
}) {
  return (
    <Link
      href={insightHref(insight.slug)}
      className="group/card relative flex h-full min-h-[340px] flex-col gap-5 px-6 py-8 transition-colors duration-300 hover:bg-surface-2 lg:px-8 lg:py-10"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
      />
      <span className="flex items-start justify-between gap-4">
        <Tag tone="brand">{insight.category}</Tag>
        <span
          aria-hidden
          className="font-display text-[40px] leading-none tracking-[-0.04em] text-line transition-colors duration-500 group-hover/card:text-brand"
        >
          {String(index).padStart(2, "0")}
        </span>
      </span>
      <Heading className="font-display text-[24px] leading-[1.22] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover/card:text-brand">
        {insight.title}
      </Heading>
      <span className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{insight.description}</span>
      <span className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="font-mono text-[11px] leading-none text-muted uppercase">
          {formatDate(insight.published)} · {readingTime(insight)} min read
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] leading-none text-ink-soft uppercase transition-colors group-hover/card:text-brand">
          Read
          <ChevronRight aria-hidden className="size-4 transition-[translate] duration-300 group-hover/card:translate-x-1" strokeWidth={1.75} />
        </span>
      </span>
    </Link>
  );
}
