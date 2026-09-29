import Image from "next/image";
import { CLIENTS } from "@/lib/content";

function Cell({ c }: { c: (typeof CLIENTS)[number] }) {
  return (
    <li className="group flex shrink-0 items-center border-y border-l border-line px-12 py-6 transition-colors duration-300 hover:bg-surface-2">
      <div
        className="flex h-[38px] items-start opacity-90 grayscale-[0.15] transition-[opacity,filter,transform] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        style={{ gap: c.gap }}
      >
        <Image
          src={`/content/clients/${c.file}-mark.svg`}
          alt=""
          width={Math.round(c.markW)}
          height={38}
          unoptimized
          style={{ width: c.markW, height: 38 }}
        />
        <Image
          src={`/content/clients/${c.file}-text.svg`}
          alt={c.name}
          width={Math.round(c.textW)}
          height={38}
          unoptimized
          style={{ width: c.textW, height: 38 }}
        />
      </div>
    </li>
  );
}

/** Trust strip: an infinite, hover-to-pause carousel of client logos, framed by hatch panels. */
export function ClientStrip() {
  return (
    <section aria-label="Companies our engineers have shipped at" className="border-t border-line">
      <div className="flex items-center justify-center px-2.5 py-5">
        <h2 className="font-mono text-base leading-6 tracking-[0.01em] text-[#3a3a3a] uppercase">
          Our engineers have shipped at
        </h2>
      </div>
      <div className="relative">
        <div className="hatch absolute inset-y-0 left-0 z-10 hidden w-20 border-y border-r border-line bg-white lg:block" aria-hidden />
        <div className="hatch absolute inset-y-0 right-0 z-10 hidden w-20 border-y border-l border-line bg-white lg:block" aria-hidden />
        <div
          className="group/marquee mx-auto max-w-[1280px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 48px, #000 calc(100% - 48px), transparent 100%)",
          }}
        >
          <div
            className="flex w-max motion-safe-anim group-hover/marquee:[animation-play-state:paused]"
            style={{ animation: "marquee-x 38s linear infinite" }}
          >
            <ul className="flex shrink-0">
              {CLIENTS.map((c) => (
                <Cell key={c.file} c={c} />
              ))}
            </ul>
            <ul className="flex shrink-0" aria-hidden>
              {CLIENTS.map((c) => (
                <Cell key={`${c.file}-dup`} c={c} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
