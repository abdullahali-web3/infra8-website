import { Logo } from "./Logo";

/**
 * A tool logo in a hairline tile with a themed tooltip (ink, mono caps) instead of the browser's
 * native `title` bubble. Renders an `<li>`; the name is also in the DOM for screen readers.
 */
export function LogoTip({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <li className="group/tip relative grid size-9 place-items-center border border-line bg-white transition-colors duration-200 hover:border-ink/30">
      <Logo name={name} size={size} />
      <span className="sr-only">{name}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 translate-y-1 bg-ink px-2 py-1.5 font-mono text-[11px] leading-none whitespace-nowrap text-white uppercase opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover/tip:translate-y-0 group-hover/tip:opacity-100"
      >
        {name}
        <span className="absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink" />
      </span>
    </li>
  );
}
