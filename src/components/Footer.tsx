import Image from "next/image";
import { CTA, FOOTER } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BlueprintColumn, Cross } from "@/components/ui/Blueprint";

/** Blueprint footer: the railed column continues to the bottom, ending in an outlined wordmark. */
export function Footer() {
  return (
    <footer className="mt-auto">
      <BlueprintColumn>
        <div className="relative grid border-t border-line lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <Cross className="-top-[6px] -left-[6px]" />
          <Cross className="-top-[6px] -right-[6px]" />
          <div className="flex flex-col gap-5 border-line p-5 sm:p-8 lg:p-10">
            <Image
              src="/content/icons/infra8-logo.svg"
              alt="Infra8"
              width={85}
              height={24}
              unoptimized
              className="h-6 w-[85px]"
            />
            <p className="max-w-[320px] text-base leading-7 tracking-[-0.02em] text-ink-soft">
              One senior engineering team that builds your product and runs it in the cloud.
            </p>
            <span className="font-mono text-[12px] leading-5 text-muted uppercase">
              Response within 24 hours on business days
            </span>
          </div>
          {FOOTER.columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="border-line p-5 max-lg:border-t sm:p-8 lg:border-l lg:p-10"
            >
              <h3 className="mb-5 font-mono text-[12px] leading-none text-muted uppercase">{`> ${col.title}`}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group/f inline-flex items-center gap-2 text-base tracking-[-0.02em] text-ink transition-colors hover:text-brand"
                    >
                      <span aria-hidden className="size-1.5 bg-line transition-colors group-hover/f:bg-brand" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="dots flex flex-col items-start justify-between gap-6 border-line p-5 max-lg:border-t sm:p-8 lg:border-l lg:p-10">
            <p className="bg-white font-display text-[22px] leading-7 tracking-[-0.03em] text-ink">
              Have a product to build or run?
            </p>
            <BlockButton href={CTA.mvp} variant="brand">
              Get MVP estimate
            </BlockButton>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-line px-5 py-5 font-mono text-[12px] text-muted uppercase sm:flex-row sm:px-8 lg:px-10">
          <span>© {new Date().getFullYear()} Infra8. All rights reserved.</span>
          <span>Fixed scope · You own everything · NDA on request</span>
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
