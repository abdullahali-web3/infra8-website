"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, CTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";

const LINK =
  "group relative inline-flex items-center gap-1.5 py-2 font-mono text-[12px] tracking-[0.04em] text-[#252525] uppercase transition-colors duration-200 hover:text-brand";

function Chevron() {
  return (
    <Image
      src="/content/icons/chevron-down.svg"
      alt=""
      width={6}
      height={3}
      unoptimized
      className="h-[3px] w-[6px] transition-transform duration-300 group-hover/item:rotate-180"
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-white/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-[78px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-20">
        <a href="#top" aria-label="Infra8 home" className="shrink-0">
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

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.label} className="group/item relative">
                <a href={item.href} className={LINK}>
                  {item.label}
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
          <Button href={CTA.mvp}>Get an estimate</Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full bg-surface transition-colors hover:bg-[#e5e5e5] lg:hidden"
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
            className="overflow-hidden border-t border-line bg-white lg:hidden"
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
                    className="block rounded-lg px-2 py-3 font-mono text-[13px] tracking-[0.04em] uppercase transition-colors hover:bg-surface-2 hover:text-brand"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <Button href={CTA.mvp} full>
                  Get an estimate
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
