import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { formatDate, getInsight, headingId, INSIGHTS, readingTime } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BP_PAD, BlueprintColumn, BpSection, HEADING, SectionGap, SectionHead, Tag } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs, type Crumb } from "@/components/service/Breadcrumbs";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleJsonLd } from "@/components/insights/ArticleJsonLd";
import { InsightCard, insightHref } from "@/components/insights/InsightCard";

type Props = { params: Promise<{ slug: string }> };

// Only the articles in src/lib/insights.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return {};
  const base = pageMetadata({
    title: insight.metaTitle ?? insight.title,
    description: insight.description,
    path: insightHref(insight.slug),
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: insight.published, section: insight.category },
  };
}

export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();

  const path = insightHref(insight.slug);
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Insights", href: ROUTES.insights },
    { name: insight.title, href: path },
  ];
  const toc = insight.body.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  const service = SERVICES[insight.service];
  // Same topic first, then the rest, three in all.
  const related = [
    ...INSIGHTS.filter((i) => i.slug !== insight.slug && i.category === insight.category),
    ...INSIGHTS.filter((i) => i.slug !== insight.slug && i.category !== insight.category),
  ].slice(0, 3);

  return (
    <>
      <ArticleJsonLd insight={insight} path={path} crumbs={crumbs} />
      <Header />
      <main>
        <BlueprintColumn>
          <section id="top" className="border-t border-line">
            <div className={`flex flex-col gap-7 pt-10 pb-12 lg:pt-14 lg:pb-16 ${BP_PAD}`}>
              <Breadcrumbs items={crumbs} />
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="brand">{insight.category}</Tag>
                <span className="font-mono text-[12px] leading-none text-muted uppercase">
                  <time dateTime={insight.published}>{formatDate(insight.published)}</time> · {readingTime(insight)} min read · Infra8 Team
                </span>
              </div>
              <RevealText
                as="h1"
                text={insight.title}
                before="/"
                after="/"
                delay={0.1}
                className={`${HEADING} max-w-[920px] text-balance`}
              />
              <p className="max-w-[720px] text-base leading-7 tracking-[-0.02em] text-ink-soft sm:text-[18px]">
                {insight.description}
              </p>
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

              <article className="flex max-w-[720px] flex-col gap-10">
                <div className="flex flex-col gap-3 border border-line bg-surface-2 p-6">
                  <p className="font-mono text-[12px] leading-none text-brand uppercase">Short answer</p>
                  <p className="font-display text-[19px] leading-[1.55] tracking-[-0.02em] text-ink sm:text-[21px]">{insight.answer}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] leading-none text-muted uppercase">Key takeaways</p>
                  <ul className="flex flex-col gap-3">
                    {insight.takeaways.map((t) => (
                      <li key={t} className="flex gap-3 text-[16px] leading-7 tracking-[-0.01em] text-ink">
                        <CircleCheck aria-hidden className="mt-[5px] size-[18px] shrink-0 text-ok" strokeWidth={2} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <ArticleBody blocks={insight.body} />

                <div className="flex flex-col gap-5 border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-[12px] leading-none text-muted uppercase">Related service</p>
                    <p className="font-display text-[22px] leading-[1.2] tracking-[-0.03em] text-ink">{service.name}</p>
                    <p className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{service.summary}</p>
                  </div>
                  <BlockButton href={service.path} variant="brand">
                    Explore Service
                  </BlockButton>
                </div>
              </article>
            </div>
          </section>

          <SectionGap />
          <BpSection>
            <SectionHead eyebrow="Keep reading" title={"More Insights\nfor Founders"} />
            <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="border-line not-first:border-t lg:not-first:border-t-0 lg:not-first:border-l">
                  <InsightCard insight={r} index={INSIGHTS.indexOf(r) + 1} as="h3" />
                </li>
              ))}
            </ul>
          </BpSection>
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
