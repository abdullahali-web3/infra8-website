import Image from "next/image";
import type { CSSProperties } from "react";
import { STACK, type OrbitItem } from "@/lib/content";
import { logoSrc } from "@/lib/logos";
import { CountUp } from "@/components/ui/CountUp";

const DOT = { brand: "bg-brand", ok: "bg-ok", warn: "bg-warn" } as const;

function Item({ item }: { item: OrbitItem }) {
  if ("logo" in item) {
    const src = logoSrc(item.logo);
    if (!src) return null;
    return (
      <span className="grid size-[34px] place-items-center rounded-[10px] border border-line bg-white sm:size-11 sm:rounded-[12px]">
        <Image
          src={src}
          alt={item.logo}
          width={24}
          height={24}
          unoptimized
          className="size-[18px] object-contain sm:size-6"
        />
      </span>
    );
  }
  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs leading-4 tracking-[-0.02em] whitespace-nowrap sm:inline-flex ${
        item.tint ? "border-ok/25 bg-ok/10 text-ok" : "border-line bg-white text-ink-soft"
      }`}
    >
      <span className={`size-1.5 rounded-full ${DOT[item.tone]}`} aria-hidden />
      {item.pill}
    </span>
  );
}

/**
 * The tool-stack dome: three hairline orbits with real tool logos travelling around them, and the
 * stats bar sitting on the base line. Pure markup and CSS (see the `.orbit-*` rules in globals.css),
 * so the logo list is plain server-rendered HTML and the motion costs no JavaScript.
 */
export function ToolOrbits() {
  return (
    <div className="orbit-wrap mx-auto w-full max-w-[960px]">
      <div className="orbit-stage">
        <div className="orbit-fade">
          <div className="orbit-clear">
            {STACK.orbits.map((o) => {
              const step = 360 / o.items.length;
              return (
                <ul
                  key={o.label}
                  aria-label={o.label}
                  className={`orbit-ring ${o.reverse ? "orbit-rev" : ""}`}
                  style={{ "--r": `${o.radius}cqw`, "--t": `${o.seconds}s` } as CSSProperties}
                >
                  {o.items.map((item, i) => {
                    const angle = o.offset + i * step;
                    return (
                      <li key={i} className="orbit-slot" style={{ transform: `rotate(${angle}deg)` }}>
                        <div className="orbit-arm">
                          <div className="orbit-counter">
                            <div style={{ transform: `rotate(${-angle}deg)` }}>
                              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                                <Item item={item} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>

      </div>

      {/* The stats bar: inside the dome from lg (as in the reference), just under it on smaller screens. */}
      <div className="z-10 flex items-start justify-center gap-6 pt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:gap-5 lg:pt-0 lg:pb-7">
        {STACK.stats.map((s) => (
          <div key={s.label} className="flex w-[104px] flex-col items-center gap-2 text-center lg:w-[100px]">
            <span className="font-display text-[34px] leading-none tracking-[-0.04em] text-ink lg:text-[40px]">
              <CountUp to={s.value} />
            </span>
            <span className="text-xs leading-4 tracking-[-0.01em] text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
