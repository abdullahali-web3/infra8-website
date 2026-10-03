"use client";

import { useId } from "react";
import { motion } from "motion/react";

export type SegmentOption<T extends string> = { value: T; label: string; count?: number };

/**
 * Segmented control for tabs and filters: a light track with a white "thumb" that slides to the
 * active option. One row at every width; on small screens it scrolls sideways instead of wrapping.
 * `kind="tabs"` uses the tablist pattern; `kind="filter"` uses toggle buttons (aria-pressed).
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  kind = "filter",
  className = "",
}: {
  label: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  kind?: "tabs" | "filter";
  className?: string;
}) {
  const thumbId = useId();
  return (
    <div className={`scroll-none max-w-full overflow-x-auto ${className}`}>
      <div
        role={kind === "tabs" ? "tablist" : "group"}
        aria-label={label}
        className="inline-flex items-center gap-1 border border-line bg-surface-2 p-1"
      >
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              {...(kind === "tabs" ? { role: "tab", "aria-selected": on } : { "aria-pressed": on })}
              onClick={(e) => {
                onChange(o.value);
                // On narrow screens the row scrolls: keep the chosen option fully in view.
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
              }}
              className={`relative isolate inline-flex h-9 shrink-0 items-center gap-2 px-4 text-[14px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ${
                on ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {on ? (
                <motion.span
                  layoutId={thumbId}
                  aria-hidden
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute inset-0 -z-10 border border-line bg-white shadow-[0_1px_2px_rgba(17,17,17,0.06),0_4px_12px_-6px_rgba(17,17,17,0.18)]"
                />
              ) : null}
              {o.label}
              {o.count !== undefined ? (
                <span
                  className={`grid h-5 min-w-5 place-items-center px-1 font-mono text-[11px] leading-none transition-colors duration-200 ${
                    on ? "bg-brand text-white" : "bg-white text-muted"
                  }`}
                >
                  {o.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
