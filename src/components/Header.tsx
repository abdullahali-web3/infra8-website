"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, CTA } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";

const LINK =
  "group relative inline-flex items-center gap-1.5 py-2 font-sans text-[14px] leading-6 tracking-[-0.03em] text-nav transition-colors duration-200 hover:text-brand";

// Figma lays this vector out in a 6x3 box but draws it at its native 7.2x4.2 (stroke included),
// so the image overflows the layout box by 0.6px on every side.
function Chevron() {
  return (
    <Image
      src="/content/icons/chevron-down.svg"
      alt=""
      width={7}
      height={4}
      unoptimized
      className="m-[-0.6px] h-[4.2px] w-[7.2px] max-w-none shrink-0 transition-[rotate] duration-300 group-hover/item:rotate-180"
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // An open mobile menu always hangs off the full-height bar, so it never floats detached.
  const compact = scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The header keeps one fixed height so the page never shifts. "Compact" only moves
  // and scales two layers (transform-only, per the motion rules): the backdrop squashes
  // from the top (108 -> 64px desktop, 78 -> 56px mobile) and the content rides up to
  // stay centred in what is left of it.
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none sticky top-0 z-50 h-[78px] lg:h-[108px]"
    >
      <div
        aria-hidden
        className={`absolute inset-0 origin-top transition-[scale,background-color,backdrop-filter] duration-300 ease-out ${
          compact ? "scale-y-[0.718] bg-white/85 backdrop-blur-xl lg:scale-y-[0.593]" : "bg-white"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-line transition-[translate,opacity] duration-300 ease-out ${
          compact
            ? "translate-y-[55px] opacity-100 lg:translate-y-[63px]"
            : "translate-y-[77px] opacity-0 lg:translate-y-[107px]"
        }`}
      />

      <div
        className={`relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 transition-[translate] duration-300 ease-out sm:px-8 lg:px-20 ${
          compact ? "-translate-y-[11px] lg:-translate-y-[22px]" : ""
        }`}
      >
        <a href="#top" aria-label="Infra8 home" className="pointer-events-auto shrink-0">
          <Image
            src="/content/icons/infra8-logo.svg"
            alt="Infra8"
            width={85}
            height={24}
            unoptimized
            priority
            className="h-6 w-[85px]"
          />
        </a>

        <nav aria-label="Primary" className="pointer-events-auto hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.label} className="group/item relative">
                <a href={item.href} className={LINK}>
                  <span className="[text-box:trim-both_cap_alphabetic]">{item.label}</span>
                  {"children" in item ? <Chevron /> : null}
                  <span className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
                {"children" in item ? (
                  <div className="invisible absolute top-full left-1/2 z-10 w-56 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100 group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100">
                    <ul className="rounded-2xl border border-line bg-white p-2 shadow-[0_24px_48px_-20px_rgba(17,17,17,0.25)]">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            className="block rounded-lg px-3 py-2.5 font-display text-[14px] tracking-[-0.01em] text-ink transition-colors hover:bg-surface-2 hover:text-brand"
                          >
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div
            className={`origin-right transition-[scale] duration-300 ease-out ${compact ? "scale-90" : ""}`}
          >
            <PillButton href={CTA.mvp}>Contact Us</PillButton>
          </div>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto grid size-11 place-items-center rounded-full bg-surface transition-colors hover:bg-[#e5e5e5] lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute top-1.5 left-0 h-px w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute inset-x-0 top-full overflow-hidden border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(17,17,17,0.25)] lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4 sm:px-8">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 font-sans text-[14px] tracking-[-0.03em] text-nav transition-colors hover:bg-surface-2 hover:text-brand"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <PillButton href={CTA.mvp} full>
                  Contact Us
                </PillButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
