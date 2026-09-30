import { CircleCheck } from "lucide-react";

export const BENEFITS = ["Fixed scope", "You own everything", "NDA on request"] as const;

/** The three standing promises, each with a green tick. */
export function Benefits({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {BENEFITS.map((b) => (
        <li key={b} className="flex items-center gap-2 text-[15px] leading-5 tracking-[-0.02em] text-ink-soft">
          <CircleCheck aria-hidden className="size-[18px] shrink-0 text-ok" strokeWidth={2} />
          {b}
        </li>
      ))}
    </ul>
  );
}
