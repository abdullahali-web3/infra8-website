import Image from "next/image";
import { CTA, FOOTER } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn } from "@/components/ui/Blueprint";

const LINK =
  "group/f inline-flex items-center gap-2 text-[15px] tracking-[-0.02em] text-ink-soft transition-colors hover:text-brand";

/** Footer: the railed column continues to the bottom: brand + CTA, the site map, legal, then the wordmark. */
export function Footer() {
  return (
    <footer className="mt-auto">
      <BlueprintColumn>
        <div className="grid border-t border-line lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col items-start gap-6 border-line px-5 py-12 sm:px-8 lg:border-r lg:px-12 lg:py-16">
            <Image
              src="/content/icons/infra8-logo.svg"
              alt="Infra8"
              width={85}
              height={24}
              unoptimized
              className="h-6 w-[85px]"
            />
            <p className="max-w-[340px] text-base leading-7 tracking-[-0.02em] text-ink-soft">
              One senior engineering team that builds your product and runs it in the cloud.
            </p>
            <BlockButton href={CTA.mvp} variant="brand">
              Get MVP estimate
            </BlockButton>
            <span className="font-mono text-[12px] leading-5 text-muted uppercase">
              Response within 24 hours on business days
            </span>
          </div>

          <div className="grid grid-cols-2 gap-10 px-5 py-12 max-lg:border-t max-lg:border-line sm:grid-cols-3 sm:px-8 lg:px-12 lg:py-16">
            {FOOTER.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-5 font-mono text-[12px] leading-none text-muted uppercase">{col.title}</h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={LINK}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-line px-5 py-5 font-mono text-[12px] text-muted uppercase sm:px-8 lg:flex-row lg:items-center lg:px-12">
          <span>© {new Date().getFullYear()} Infra8. All rights reserved.</span>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER.legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div aria-hidden className="overflow-hidden border-t border-line">
          <p className="-mb-[0.22em] text-center font-display text-[27vw] leading-[0.9] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--color-line)] lg:text-[300px]">
            Infra8
          </p>
        </div>
      </BlueprintColumn>
    </footer>
  );
}
