import { headingId, type Block } from "@/lib/insights";

/** Renders an article's blocks with the site's typography. H2s get ids for the table of contents. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
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
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[17px] leading-8 tracking-[-0.01em] text-ink-soft">
                    <span aria-hidden className="mt-[13px] size-1.5 shrink-0 bg-brand" />
                    {it}
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
                    {it}
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
                              {c}
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
                <p className="text-[16px] leading-7 tracking-[-0.01em] text-ink">{b.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
