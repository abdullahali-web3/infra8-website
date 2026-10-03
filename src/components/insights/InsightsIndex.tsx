"use client";

import { useState, type ReactNode } from "react";
import { INSIGHT_CATEGORIES, type InsightCategory } from "@/lib/insights";
import { Segmented } from "@/components/ui/Segmented";

type Filter = "All" | InsightCategory;

/**
 * Category filter over the article grid. Every card stays in the HTML (crawlers see all of them);
 * the filter only hides cards with the `hidden` attribute.
 */
export function InsightsIndex({ items }: { items: { category: InsightCategory; card: ReactNode; key: string }[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...INSIGHT_CATEGORIES];

  return (
    <>
      <div className="px-5 sm:px-8 lg:px-12">
        <Segmented
          label="Filter articles by topic"
          value={filter}
          onChange={setFilter}
          options={filters.map((f) => ({
            value: f,
            label: f,
            count: f === "All" ? items.length : items.filter((i) => i.category === f).length,
          }))}
        />
      </div>
      {/* Every card draws its right and bottom edge; the wrapper clips the outermost ones. This stays
          correct whatever the filter hides, unlike nth-child borders. */}
      <div className="mt-10 overflow-hidden border-t border-line">
        <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.key} hidden={filter !== "All" && i.category !== filter} className="border-r border-b border-line">
              {i.card}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
