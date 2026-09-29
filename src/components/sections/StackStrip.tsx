import { STACK_STRIP } from "@/lib/content";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

export function StackStrip() {
  return (
    <section aria-label="Technology stack" className="border-t border-line">
      <div className="flex items-center justify-center px-2.5 py-5">
        <RevealText
          as="h2"
          text="Built on the stack you already use"
          className="font-mono text-sm uppercase leading-6 text-[#3a3a3a] sm:text-base"
        />
      </div>
      <Reveal>
        <div className="relative border-y border-line">
          <div className="hatch absolute inset-y-0 left-0 hidden w-20 border-r border-line lg:block" aria-hidden />
          <div className="hatch absolute inset-y-0 right-0 hidden w-20 border-l border-line lg:block" aria-hidden />
          <ul className="mx-auto grid max-w-[1280px] grid-cols-2 border-l border-line sm:grid-cols-3 lg:grid-cols-6">
            {STACK_STRIP.map((s) => (
              <li
                key={s.name}
                className="group border-r border-b border-line px-6 py-6 transition-colors duration-300 hover:bg-surface-2 lg:border-b-0 lg:px-8"
              >
                <div className="flex flex-col gap-1.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  <span className="font-display text-xl tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand">
                    {s.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase leading-4 text-muted">{s.tag}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
