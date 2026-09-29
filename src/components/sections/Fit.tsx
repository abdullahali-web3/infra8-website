import { FIT } from "@/lib/content";
import { BP_PAD, BpSection, SlashHeading } from "@/components/ui/Blueprint";
import { RevealText } from "@/components/ui/RevealText";

function Column({ yes }: { yes: boolean }) {
  const items = yes ? FIT.yes : FIT.no;
  return (
    <div className={`flex flex-col border-line ${yes ? "" : "max-lg:border-t lg:border-l"}`}>
      <h3 className="flex h-14 items-center gap-3 border-b border-line px-5 font-mono text-[12px] leading-none uppercase lg:px-6">
        <span
          aria-hidden
          className={`grid size-5 place-items-center border text-[12px] leading-none ${yes ? "border-ok bg-ok text-white" : "border-line text-muted"}`}
        >
          {yes ? "+" : "−"}
        </span>
        <span className={yes ? "text-ink" : "text-muted"}>{yes ? "We're a good fit if" : "We're not a fit if"}</span>
      </h3>
      <ul className="flex flex-1 flex-col">
        {items.map((t, i) => (
          <li
            key={t}
            className={`group/row flex gap-5 border-line px-5 py-5 transition-colors duration-300 not-first:border-t lg:px-6 ${yes ? "hover:bg-surface-2" : ""}`}
          >
            <span className={`pt-0.5 font-mono text-[12px] leading-5 ${yes ? "text-ok" : "text-muted/70"}`}>{`0${i + 1}`}</span>
            <RevealText
              as="span"
              text={t}
              className={`text-base leading-6 tracking-[-0.02em] ${yes ? "text-ink" : "text-muted"}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Who it's for": good fit and not a fit, side by side as two ruled columns. */
export function Fit() {
  return (
    <BpSection id="fit" index={6} label="Who it's for">
      <div className={`mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-end lg:justify-between ${BP_PAD}`}>
        <SlashHeading title={"We're selective\n{{so}} the work is good"} />
        <RevealText
          text="A clear fit makes for a better project. Here is when we are, and aren't, the right team."
          delay={0.15}
          className="max-w-[400px] text-base leading-7 tracking-[-0.02em] text-ink-soft"
        />
      </div>
      <div className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-2">
        <Column yes />
        <Column yes={false} />
      </div>
    </BpSection>
  );
}
