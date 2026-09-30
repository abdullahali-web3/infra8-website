import { ROUTES } from "@/lib/content";
import { INSIGHTS } from "@/lib/insights";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlueprintColumn, SectionGap } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { InsightCard, insightHref } from "@/components/insights/InsightCard";
import { InsightsIndex } from "@/components/insights/InsightsIndex";

export const metadata = pageMetadata({
  title: "Insights on Building and Running Software",
  description:
    "Practical guides for founders and CTOs on MVP cost and timelines, dedicated teams, AWS costs, DevOps and SOC 2 readiness, from the Infra8 team.",
  path: ROUTES.insights,
});

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Insights", href: ROUTES.insights },
];

export default function InsightsPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteConfig.url}${ROUTES.insights}#blog`,
        name: "Infra8 Insights",
        url: `${siteConfig.url}${ROUTES.insights}`,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        blogPost: INSIGHTS.map((i) => ({
          "@type": "BlogPosting",
          headline: i.title,
          url: `${siteConfig.url}${insightHref(i.slug)}`,
          datePublished: i.published,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: CRUMBS.map((c, n) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero
            crumbs={CRUMBS}
            title="Insights on Building and Running Software"
            sub="Practical guides for founders and CTOs: what an MVP really costs, how to staff a product, and how to keep a cloud fast, secure and affordable."
          />
          <section className="border-t border-line pt-10 lg:pt-14">
            <InsightsIndex
              items={INSIGHTS.map((i, n) => ({ key: i.slug, category: i.category, card: <InsightCard insight={i} index={n + 1} /> }))}
            />
          </section>
          <SectionGap />
          <FinalCta />
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
