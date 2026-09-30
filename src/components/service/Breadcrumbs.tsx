import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail. The same list feeds the page's BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[12px] leading-none text-muted uppercase">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-brand">
                    {c.name}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5" strokeWidth={1.75} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
