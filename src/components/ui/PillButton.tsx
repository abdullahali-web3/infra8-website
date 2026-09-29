import Image from "next/image";
import type { ReactNode } from "react";

// "white" is the secondary button for buttons that sit on a grey card: white pill, grey chip.
type Variant = "primary" | "secondary" | "white";

// Figma pill: 8px padding around a 32px chip that holds the chevron.
// Hover: a darker fill wipes in from the left behind the label and leaves to the right.
// Only that fill moves; the chevron stays exactly where it is. The group is named so a
// hovered parent (a card, a list item) never triggers the button, only the button itself.
const VARIANTS: Record<Variant, { pill: string; wipe: string; chip: string }> = {
  primary: { pill: "bg-brand text-paper", wipe: "bg-brand-deep", chip: "bg-white" },
  secondary: { pill: "bg-surface text-ink", wipe: "bg-surface-deep", chip: "bg-white" },
  white: { pill: "bg-white text-ink", wipe: "bg-line", chip: "bg-surface" },
};

export function PillButton({
  href,
  children,
  variant = "primary",
  full = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  full?: boolean;
  className?: string;
}) {
  const v = VARIANTS[variant];
  return (
    <a
      href={href}
      className={`group/pill relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full py-2 pr-2 pl-4 font-sans text-[16px] leading-6 tracking-[-0.03em] ${
        full ? "w-full justify-between text-left" : "justify-center whitespace-nowrap"
      } ${v.pill} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-right scale-x-0 transition-[scale] duration-500 ease-out group-hover/pill:origin-left group-hover/pill:scale-x-100 group-focus-visible/pill:origin-left group-focus-visible/pill:scale-x-100 motion-reduce:transition-none ${v.wipe}`}
      />
      <span className="relative [text-box:trim-both_cap_alphabetic]">{children}</span>
      <span className={`relative grid size-8 shrink-0 place-items-center rounded-full ${v.chip}`}>
        <Image
          src="/content/icons/chevron-right.svg"
          alt=""
          width={16}
          height={16}
          unoptimized
          className="size-4"
        />
      </span>
    </a>
  );
}
