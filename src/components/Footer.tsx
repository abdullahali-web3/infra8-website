import Image from "next/image";
import { FOOTER } from "@/lib/content";
import { Container, HatchBand } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

export function Footer() {
  return (
    <footer className="mt-auto">
      <HatchBand />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-6">
            <Reveal>
              <Image
                src="/content/icons/infra8-logo.svg"
                alt="Infra8"
                width={85}
                height={24}
                unoptimized
                className="h-6 w-[85px]"
              />
            </Reveal>
            <RevealText
              text="One senior engineering team that builds your product and runs it in the cloud."
              className="text-base leading-7 tracking-[-0.02em] text-ink-soft"
            />
            <RevealText
              as="span"
              text="Response within 24 hours on business days"
              className="font-mono text-xs uppercase leading-6 text-muted"
            />
          </div>
          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <RevealText
                as="h3"
                text={col.title}
                className="mb-5 font-mono text-xs uppercase leading-6 text-muted"
              />
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-base tracking-[-0.02em] text-ink transition-colors hover:text-brand"
                    >
                      <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-xs uppercase text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Infra8. All rights reserved.</span>
          <span>Fixed scope · You own everything · NDA on request</span>
        </div>
      </Container>
    </footer>
  );
}
