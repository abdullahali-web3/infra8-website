import { FlaskConical, Server, ShieldCheck, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, BpSection, SectionGap, SectionHead, SlashHeading } from "@/components/ui/Blueprint";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata = pageMetadata({
  title: "Products We Build and Run Ourselves",
  description:
    "Infra8's own SaaS products: built, hosted and run by the same senior team that builds and runs products for founders. Browse the catalogue.",
  path: ROUTES.products,
});

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: ROUTES.products },
];

const WHY: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FlaskConical,
    title: "A proving ground",
    body: "New tools and AI workflows are tried on our own products before they reach a client's.",
  },
  {
    icon: Server,
    title: "We run what we build",
    body: "Each product is hosted, monitored and paid for by us, so we feel every outage and every cloud bill.",
  },
  {
    icon: ShieldCheck,
    title: "The same standards",
    body: "The code review, testing and infrastructure as code we use here are the ones you get on your project.",
  },
];

export default function ProductsPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}${ROUTES.products}#page`,
        url: `${siteConfig.url}${ROUTES.products}`,
        name: "Infra8 products",
        publisher: { "@id": `${siteConfig.url}/#organization` },
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
      {/* No SoftwareApplication schema yet: the products listed are samples until real ones replace them. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero
            crumbs={CRUMBS}
            title="Products We Build and Run Ourselves"
            sub="Alongside client work, we build and run our own SaaS products. Each one is a proving ground for the stack, the process and the AI tooling we bring to every project."
            actions={
              <BlockButton href="#get-started" variant="brand">
                Build Your Product With Us
              </BlockButton>
            }
          />

          <section className="border-t border-line" aria-label="Product catalogue">
            <div className="overflow-hidden">
              <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTS.map((p, i) => (
                  <li key={p.slug} className="border-r border-b border-line">
                    <Reveal delay={(i % 3) * 0.08} className="h-full">
                      <ProductCard product={p} />
                    </Reveal>
                  </li>
                ))}
                <li className="dots border-r border-b border-line">
                  <div className="flex h-full min-h-[360px] flex-col items-start justify-end gap-6 p-6 lg:p-8">
                    <span className="bg-white">
                      <SlashHeading title={"Your Product\nCould Be Next"} />
                    </span>
                    <p className="max-w-[320px] bg-white text-[15px] leading-6 tracking-[-0.02em] text-ink-soft">
                      The team behind these products builds MVPs for founders, with an estimate in 24 hours.
                    </p>
                    <BlockButton href={ROUTES.mvpDevelopment} variant="outline">
                      Explore MVP Development
                    </BlockButton>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <SectionGap />
          <BpSection>
            <SectionHead
              eyebrow="Why we build our own"
              title={"Products That Keep\nOur Skills Honest"}
              sub="Building and running our own software keeps us close to the problems our clients live with."
            />
            <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-3">
              {WHY.map((w, i) => (
                <li key={w.title} className="group/card relative border-line max-lg:not-first:border-t lg:not-first:border-l">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
                  />
                  <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                    <span className="grid size-11 place-items-center border border-line text-brand transition-colors duration-300 group-hover/card:border-brand group-hover/card:bg-brand group-hover/card:text-white">
                      <w.icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{w.title}</h3>
                    <p className="text-base leading-6 tracking-[-0.02em] text-muted">{w.body}</p>
                  </Reveal>
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
