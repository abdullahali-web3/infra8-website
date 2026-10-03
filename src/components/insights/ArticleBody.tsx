import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { headingId, type Block } from "@/lib/insights";

/** Highlights [bracketed placeholders] so unfinished legal details can't pass as final. */
function withPlaceholders(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <mark key={i} className="bg-warn/10 px-0.5 text-warn decoration-warn/40 underline decoration-dashed underline-offset-4">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/**
 * Renders an article's blocks with the site's typography. H2s get ids for the table of contents.
 * `placeholders` turns on the highlight for bracketed text (used by the legal pages).
 */
export function ArticleBody({ blocks, placeholders = false }: { blocks: Block[]; placeholders?: boolean }) {
  const t = (text: string) => (placeholders ? withPlaceholders(text) : text);
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={headingId(b.text)}
                className="mt-8 scroll-mt-28 font-display text-[26px] leading-[1.2] tracking-[-0.03em] text-ink first:mt-0 sm:text-[30px]"
              >
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-8 tracking-[-0.01em] text-ink-soft">
                {t(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[17px] leading-8 tracking-[-0.01em] text-ink-soft">
                    <ChevronRight aria-hidden className="mt-2 size-4 shrink-0 text-brand" strokeWidth={2} />
                    <span>{t(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-3">
                {b.items.map((it, n) => (
                  <li key={it} className="flex gap-4 text-[17px] leading-8 tracking-[-0.01em] text-ink-soft">
                    <span className="mt-[7px] shrink-0 font-mono text-[12px] leading-5 text-brand">{`0${n + 1}`}</span>
                    <span>{t(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto border border-line">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr>
                      {b.head.map((h, n) => (
                        <th
                          key={n}
                          scope="col"
                          className="border-b border-line bg-surface-2 px-4 py-3 font-mono text-[11px] font-normal text-muted uppercase not-first:border-l"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, n) => (
                      <tr key={n} className="last:[&>*]:border-b-0">
                        {r.map((c, m) =>
                          m === 0 ? (
                            <th key={m} scope="row" className="border-b border-line px-4 py-3 align-top text-[15px] leading-6 font-medium text-ink">
                              {c}
                            </th>
                          ) : (
                            <td key={m} className="border-b border-l border-line px-4 py-3 align-top text-[15px] leading-6 text-ink-soft">
                              {t(c)}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="flex flex-col gap-2 border-l-2 border-brand bg-brand-tint/50 px-6 py-5">
                <p className="font-mono text-[12px] leading-none text-brand uppercase">{b.title}</p>
                <p className="text-[16px] leading-7 tracking-[-0.01em] text-ink">{t(b.text)}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
