import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { headingId } from "@/lib/insights";
import { LEGAL, LEGAL_DOCS, LEGAL_DRAFT, type LegalDoc } from "@/lib/legal";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BP_PAD, BlueprintColumn } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleBody } from "@/components/insights/ArticleBody";
import type { Crumb } from "@/components/service/Breadcrumbs";

/** Privacy, Terms and Cookie pages: hero, draft notice, table of contents, body, links to the others. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const path = `/${doc.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: doc.title, href: path },
  ];
  const toc = doc.body.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${path}#page`,
        url: `${siteConfig.url}${path}`,
        name: doc.title,
        description: doc.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, n) => ({
          "@type": "ListItem",
          position: n + 1,
          name: c.name,
          item: c.href === "/" ? siteConfig.url : `${siteConfig.url}${c.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero crumbs={crumbs} title={doc.title} sub={doc.summary} />

          <section className="border-t border-line">
            <div className={`flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between ${BP_PAD}`}>
              <p className="font-mono text-[12px] leading-5 text-muted uppercase">
                Last updated {LEGAL.lastUpdated} · Effective <span className="text-warn">{LEGAL.effectiveDate}</span>
              </p>
              {LEGAL_DRAFT ? (
                <p className="flex max-w-[680px] items-start gap-3 border border-warn/30 bg-warn/5 px-4 py-3 text-sm leading-5 tracking-[-0.01em] text-ink-soft">
                  <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-warn" strokeWidth={1.75} />
                  <span>
                    Draft. Details in <mark className="bg-warn/10 px-0.5 text-warn">[brackets]</mark> are placeholders until
                    Infra8 LLC is registered in Wyoming.
                  </span>
                </p>
              ) : null}
            </div>
          </section>

          <section className="border-t border-line">
            <div className={`grid grid-cols-[minmax(0,1fr)] gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-16 ${BP_PAD}`}>
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-28 flex flex-col gap-4">
                  <p className="font-mono text-[12px] leading-none text-muted uppercase">On this page</p>
                  <ol className="flex flex-col gap-3 border-l border-line">
                    {toc.map((t) => (
                      <li key={t}>
                        <a
                          href={`#${headingId(t)}`}
                          className="-ml-px block border-l border-transparent pl-4 text-sm leading-5 tracking-[-0.01em] text-muted transition-colors hover:border-brand hover:text-brand"
                        >
                          {t}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
              <article className="max-w-[760px]">
                <ArticleBody blocks={doc.body} placeholders />
              </article>
            </div>
          </section>

          <section className="border-t border-line" aria-label="Other policies">
            <ul className="grid sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug} className="border-line max-sm:not-first:border-t sm:not-first:border-l">
                  <Link href={`/${o.slug}`} className="group/card flex flex-col gap-2 px-5 py-8 transition-colors hover:bg-surface-2 sm:px-8 lg:px-12">
                    <span className="font-mono text-[12px] leading-none text-muted uppercase">Also read</span>
                    <span className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors group-hover/card:text-brand">
                      {o.title}
                    </span>
                    <span className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{o.summary}</span>
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
