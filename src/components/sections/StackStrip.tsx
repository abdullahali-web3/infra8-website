import { STACK_STRIP } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/Reveal";

export function StackStrip() {
  return (
    <section aria-label="Technology stack" className="border-t border-line">
      <div className="flex items-center justify-center px-2.5 py-5">
        <RevealText
          as="span"
          text="Built on the stack you already use"
          className="font-mono text-[12px] uppercase leading-6 tracking-[0.04em] text-[#3a3a3a]"
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
                className="group border-r border-b border-line px-5 py-6 transition-colors duration-300 hover:bg-surface-2 lg:border-b-0 lg:px-6"
              >
                <div className="flex items-center gap-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  <Logo name={s.name} size={32} />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-display text-[15px] leading-5 tracking-[-0.02em] text-ink">
                      {s.name}
                    </span>
                    <span className="truncate font-mono text-[10px] uppercase leading-4 text-muted">{s.tag}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
