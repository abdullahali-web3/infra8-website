import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/content";
import { CAREERS } from "@/lib/careers";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, BpSection, Eyebrow, SectionGap, SectionHead, SlashHeading } from "@/components/ui/Blueprint";
import { Logo } from "@/components/ui/Logo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/Reveal";
import type { Crumb } from "@/components/service/Breadcrumbs";
import { CtaIso } from "@/components/illustrations/iso/CtaIso";
import { ICONS } from "@/components/ui/icons";
import { IconTile } from "@/components/ui/IconTile";

export const metadata = pageMetadata({ ...CAREERS.meta, path: ROUTES.careers });

const CAREERS_EMAIL = siteConfig.careersEmail;

const CRUMBS: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Careers", href: ROUTES.careers },
];


const HOVER_LINE =
  "absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100";

export default function CareersPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: CRUMBS.map((c, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: c.name,
      item: c.href === "/" ? siteConfig.url : `${siteConfig.url}${c.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <BlueprintColumn>
          <PageHero
            crumbs={CRUMBS}
            title={CAREERS.hero.title}
            sub={CAREERS.hero.sub}
            actions={
              <BlockButton href="#roles" variant="brand">
                See the Roles We Hire For
              </BlockButton>
            }
            art={<CtaIso />}
          />

          <SectionGap />
          <BpSection id="roles">
            <SectionHead
              eyebrow="Roles"
              title={"The Roles\nWe Hire For"}
              sub="We hire for these roles as client work needs them. Send your profile anytime, and we'll reach out when there's a match."
            />
            <ul className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-2">
              {CAREERS.roles.map((r, i) => (
                <li
                  key={r.title}
                  className="group/card relative border-line max-lg:not-first:border-t lg:nth-[n+3]:border-t lg:even:border-l"
                >
                  <span aria-hidden className={HOVER_LINE} />
                  <Reveal delay={(i % 2) * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                    <h3 className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors group-hover/card:text-brand">
                      {r.title}
                    </h3>
                    <p className="text-base leading-6 tracking-[-0.02em] text-muted">{r.body}</p>
                    <ul className="flex flex-wrap gap-2" aria-label={`${r.title} tools`}>
                      {r.tools.map((t) => (
                        <li key={t} className="inline-flex items-center gap-2 border border-line bg-white px-2.5 py-1.5">
                          <Logo name={t} size={16} />
                          <span className="font-mono text-[11px] leading-none text-ink-soft uppercase">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ul>
          </BpSection>

          <SectionGap />
          <BpSection>
            <SectionHead
              eyebrow="How we work"
              title={"What Working\nat Infra8 Is Like"}
              sub="Four ideas run through every project, from a first MVP to a cloud we run for years."
            />
            <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {CAREERS.principles.map((p, i) => {
                return (
                  <li
                    key={p.title}
                    className="group/card relative border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l"
                  >
                    <span aria-hidden className={HOVER_LINE} />
                    <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                      <IconTile icon={ICONS[p.icon]} size="md" />
                      <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{p.title}</h3>
                      <p className="text-base leading-6 tracking-[-0.02em] text-muted">{p.body}</p>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </BpSection>

          <SectionGap />
          <BpSection>
            <SectionHead eyebrow="Hiring" title={"How We\nHire"} sub="Four steps, with a real conversation at each one." />
            <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {CAREERS.hiring.map((s, i) => (
                <li
                  key={s.title}
                  className="group/card relative border-line max-sm:not-first:border-t sm:max-lg:nth-[n+3]:border-t sm:max-lg:even:border-l lg:not-first:border-l"
                >
                  <span aria-hidden className={HOVER_LINE} />
                  {i < CAREERS.hiring.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-10 -right-3.5 z-10 hidden size-7 place-items-center border border-line bg-white text-muted lg:grid"
                    >
                      <ChevronRight className="size-4" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <Reveal delay={i * 0.08} className="flex h-full flex-col gap-4 px-6 py-8 lg:px-8 lg:py-10">
                    <span className="font-display text-[40px] leading-none tracking-[-0.04em] text-line transition-colors duration-500 group-hover/card:text-brand">
                      {`0${i + 1}`}
                    </span>
                    <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.03em] text-ink">{s.title}</h3>
                    <p className="text-base leading-6 tracking-[-0.02em] text-muted">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </BpSection>

          <BpSection flush>
            <div className="dots flex flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24">
              <div className="flex flex-col gap-5 bg-white/0">
                <span className="bg-white px-1">
                  <Eyebrow>Apply</Eyebrow>
                </span>
                <span className="bg-white">
                  <SlashHeading title={"A Strong Engineer?\nSend Us Your Profile."} />
                </span>
                <p className="max-w-[520px] bg-white text-base leading-7 tracking-[-0.02em] text-ink-soft">
                  Even if no role above fits, email your CV, GitHub or portfolio to{" "}
                  {CAREERS_EMAIL ? (
                    <a href={`mailto:${CAREERS_EMAIL}`} className="text-ink underline decoration-line underline-offset-4 hover:text-brand">
                      {CAREERS_EMAIL}
                    </a>
                  ) : (
                    <mark className="bg-warn/10 px-0.5 text-warn underline decoration-warn/40 decoration-dashed underline-offset-4">
                      [careers email]
                    </mark>
                  )}{" "}
                  with a line on what you&rsquo;d like to work on next. We read every one.
                </p>
              </div>
              {CAREERS_EMAIL ? (
                <BlockButton href={`mailto:${CAREERS_EMAIL}`} variant="brand">
                  Email Your Profile
                </BlockButton>
              ) : null}
            </div>
          </BpSection>
        </BlueprintColumn>
      </main>
      <Footer />
    </>
  );
}
