import { TICKER } from "@/lib/content";
import { Typewriter } from "@/components/ui/Typewriter";

/** Dotted band under the client strip: a mono line that types what we do, one phrase at a time. */
export function FlowTicker() {
  return (
    <div className="dots relative flex h-[120px] items-center justify-between gap-4 px-5 font-mono text-[13px] leading-none uppercase sm:h-[150px] sm:px-8 sm:text-[15px] lg:px-10">
      <p className="sr-only">{TICKER.join(". ")}</p>
      <span aria-hidden className="hidden bg-white px-1 text-ink/50 sm:inline">
        ···
      </span>
      <span aria-hidden className="flex min-w-0 items-center gap-3 bg-white/90 px-3 py-2 text-brand sm:gap-5">
        <span>&gt;</span>
        <span className="flex min-w-0 items-center">
          <Typewriter phrases={TICKER} className="truncate" />
          <span className="bp-caret ml-1 inline-block h-[1.1em] w-[0.6em] bg-brand" />
        </span>
        <span>&lt;</span>
      </span>
      <span aria-hidden className="hidden bg-white px-1 text-ink/50 sm:inline">
        ···
      </span>
    </div>
  );
}
