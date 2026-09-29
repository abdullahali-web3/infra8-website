import { AI_POINTS } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/Layout";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";
import { AiPipeline } from "@/components/illustrations/AiPipeline";

export function AiWorkflow() {
  return (
    <section id="ai-workflow" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="AI-native workflow"
          title="Faster delivery. Senior engineers stay {{in}} charge."
          sub="We use AI where it saves time and keep humans where it matters. A senior engineer reviews everything before it ships."
        />
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal>
            <div className="rounded-[20px] border border-line bg-surface-2 p-2 sm:p-3">
              <div className="overflow-x-auto rounded-[14px] bg-[radial-gradient(90%_70%_at_50%_0%,#e4edff_0%,#ffffff_70%)] p-3 shadow-[0_18px_40px_-24px_rgba(17,17,17,0.2)] sm:p-4">
                <div className="min-w-[520px]">
                  <AiPipeline />
                </div>
              </div>
            </div>
          </Reveal>
          <ul className="flex flex-col">
            {AI_POINTS.map((p, i) => (
              <li
                key={p.title}
                className="group flex gap-5 border-t border-line py-6 transition-colors duration-300 first:border-t-0 first:pt-0 hover:border-brand/40"
              >
                <span className="font-mono text-sm tracking-[-0.03em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <RevealText
                    as="h3"
                    text={p.title}
                    className="font-display text-2xl leading-7 tracking-[-0.03em] text-ink"
                  />
                  <RevealText
                    text={p.body}
                    className="text-base leading-6 tracking-[-0.02em] text-muted"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
