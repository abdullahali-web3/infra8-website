"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { NAV, CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { StageIso } from "@/components/illustrations/iso/StageIso";
import { FEATURED_PRODUCTS } from "@/lib/products";
import { ProductLauncher } from "@/components/products/ProductLauncher";
import { ProductThumb } from "@/components/products/ProductThumb";

// Link cards per row in a mega panel, by how many links it has (literal classes for Tailwind).
const COLS: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

const EASE = [0.22, 1, 0.36, 1] as const;
const CLOSE_DELAY_MS = 140;

const LINK =
  "group relative inline-flex items-center gap-1.5 py-2 font-sans text-[14px] leading-6 tracking-[-0.03em] transition-colors duration-200";

// Figma lays this vector out in a 6x3 box but draws it at its native 7.2x4.2 (stroke included),
// so the image overflows the layout box by 0.6px on every side.
function Chevron({ open }: { open: boolean }) {
  return (
    <Image
      src="/content/icons/chevron-down.svg"
      alt=""
      width={7}
      height={4}
      unoptimized
      className={`m-[-0.6px] h-[4.2px] w-[7.2px] max-w-none shrink-0 transition-[rotate] duration-300 ${open ? "rotate-180" : ""}`}
    />
  );
}

type NavItem = (typeof NAV)[number];

/** Products panel: the featured products, each opening the leave-site dialog. */
function FeaturedProducts() {
  return (
    <ul className="grid grid-cols-3 gap-2 p-4">
      {FEATURED_PRODUCTS.map((p) => (
        <li key={p.slug}>
          <ProductLauncher
            product={p}
            className="group/mi flex h-full w-full cursor-pointer flex-col gap-2 p-3 text-left transition-colors duration-200 hover:bg-surface-2"
          >
            <span className="relative mb-2 block h-[128px] overflow-hidden border border-line bg-white">
              <span className="block h-full w-full origin-top transition-[scale] duration-700 ease-out group-hover/mi:scale-[1.04]">
                <ProductThumb product={p} />
              </span>
              {p.sample ? (
                <span className="absolute right-2 bottom-2 bg-white px-1.5 py-1 font-mono text-[10px] leading-none text-muted uppercase">
                  Sample
                </span>
              ) : null}
            </span>
            <span className="flex items-center justify-between gap-3 px-1 font-display text-[17px] leading-6 tracking-[-0.02em] text-ink transition-colors group-hover/mi:text-brand">
              {p.name}
              <span aria-hidden className="font-mono text-[10px] leading-none text-muted uppercase">{p.category}</span>
            </span>
            <span className="px-1 text-sm leading-5 tracking-[-0.01em] text-muted">{p.tagline}</span>
          </ProductLauncher>
        </li>
      ))}
    </ul>
  );
}

/** Full-width mega menu panel for one nav item: an intro on the left, link cards on the right. */
function MegaPanel({ item }: { item: NavItem }) {
  return (
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[300px_minmax(0,1fr)] border-x border-line bg-white lg:w-[calc(100%-160px)]">
      <div className="flex flex-col gap-3 border-r border-line p-8">
        <span className="inline-flex items-center gap-2 font-mono text-[12px] leading-none text-muted uppercase">
          <span aria-hidden className="size-2 shrink-0 bg-brand" />
          <span className="[text-box:trim-both_cap_alphabetic]">{item.label}</span>
        </span>
        <p className="font-display text-[24px] leading-[1.2] tracking-[-0.03em] text-ink">{item.intro.title}</p>
        <p className="text-sm leading-5 tracking-[-0.01em] text-muted">{item.intro.body}</p>
        <Link
          href={item.href}
          className="group/all mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[12px] leading-none text-ink uppercase transition-colors hover:text-brand"
        >
          {item.allLabel}
          <span aria-hidden className="transition-[translate] duration-300 group-hover/all:translate-x-1">
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </span>
        </Link>
      </div>
      {"showFeatured" in item ? (
        <FeaturedProducts />
      ) : (
        <ul className={`grid gap-2 p-4 ${COLS[item.children.length] ?? "grid-cols-3"}`}>
          {item.children.map((c) => {
            return (
              <li key={c.label}>
                <Link
                  href={c.href}
                  className="group/mi group/card flex h-full flex-col gap-2 p-3 transition-colors duration-200 hover:bg-surface-2"
                >
                  {/* Only the service links carry a visual: that service's stage scene. */}
                  {"art" in c ? (
                    <span className="relative mb-2 flex h-[128px] items-center justify-center overflow-hidden border border-line bg-white">
                      <span aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(closest-side,#000_30%,transparent)]" />
                      <span className="relative block h-full w-full p-2">
                        <StageIso stage={c.art} />
                      </span>
                    </span>
                  ) : null}
                  <span className="flex items-center justify-between gap-3 px-1 font-display text-[17px] leading-6 tracking-[-0.02em] text-ink transition-colors group-hover/mi:text-brand">
                    {c.label}
                    <span aria-hidden className="text-muted transition-[translate,color] duration-300 group-hover/mi:translate-x-1 group-hover/mi:text-brand">
                      <ChevronRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </span>
                  <span className="px-1 text-sm leading-5 tracking-[-0.01em] text-muted">{c.body}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const closeTimer = useRef(0);
  // An open mobile menu always hangs off the full-height bar, so it never floats detached.
  const compact = scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  function openMenu(i: number) {
    window.clearTimeout(closeTimer.current);
    setMenu(i);
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), CLOSE_DELAY_MS);
  }

  // The header keeps one fixed height so the page never shifts. "Compact" only moves
  // and scales two layers (transform-only, per the motion rules): the backdrop squashes
  // from the top (80 -> 64px desktop, 64 -> 56px mobile) and the content rides up to
  // stay centred in what is left of it.
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="pointer-events-none sticky top-0 z-50 h-16 lg:h-20"
    >
      <div
        aria-hidden
        className={`absolute inset-0 origin-top transition-[scale,background-color,backdrop-filter] duration-300 ease-out ${
          compact ? "scale-y-[0.875] bg-white/85 backdrop-blur-xl lg:scale-y-[0.8]" : "bg-white"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px bg-line transition-[translate,opacity] duration-300 ease-out ${
          compact
            ? "translate-y-[55px] opacity-100 lg:translate-y-[63px]"
            : "translate-y-[63px] opacity-0 lg:translate-y-[79px]"
        }`}
      />

      <div
        className={`relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 transition-[translate] duration-300 ease-out sm:px-8 lg:px-20 ${
          compact ? "-translate-y-1 lg:-translate-y-2" : ""
        }`}
      >
        <Link href="/" aria-label="Infra8 home" className="pointer-events-auto shrink-0">
          <Image
            src="/content/icons/infra8-logo.svg"
            alt="Infra8"
            width={85}
            height={24}
            unoptimized
            priority
            className="h-6 w-[85px]"
          />
        </Link>

        <nav aria-label="Primary" className="pointer-events-auto hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8" onMouseLeave={scheduleClose}>
            {NAV.map((item, i) => {
              const isOpen = menu === i;
              return (
                <li key={item.label} onMouseEnter={() => openMenu(i)}>
                  <Link
                    href={item.href}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onFocus={() => openMenu(i)}
                    className={`${LINK} ${isOpen ? "text-brand" : "text-nav hover:text-brand"}`}
                  >
                    <span className="[text-box:trim-both_cap_alphabetic]">{item.label}</span>
                    <Chevron open={isOpen} />
                    <span
                      className={`absolute bottom-0.5 left-0 h-px w-full origin-left bg-brand transition-[scale] duration-300 ease-out ${isOpen ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={`origin-right transition-[scale] duration-300 ease-out ${compact ? "scale-90" : ""}`}>
            <BlockButton href={CTA.contact} variant="brand">
              Contact Us
            </BlockButton>
          </div>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto grid size-11 place-items-center border border-line bg-white transition-colors hover:border-ink lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute top-1.5 left-0 h-[1.5px] w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {/* Desktop mega menu: full width, hung off whichever height the bar currently has. */}
      <AnimatePresence>
        {menu !== null ? (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            onMouseEnter={() => openMenu(menu)}
            onMouseLeave={scheduleClose}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
            }}
            className={`pointer-events-auto absolute inset-x-0 hidden border-y border-line bg-white shadow-[0_32px_64px_-40px_rgba(17,17,17,0.35)] lg:block ${
              compact ? "top-16" : "top-20"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MegaPanel item={NAV[menu]} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pointer-events-auto absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(17,17,17,0.25)] lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4 sm:px-8">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  className="border-b border-line py-4"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-[12px] leading-none text-muted uppercase"
                  >
                    {item.label}
                  </Link>
                  <ul className="mt-3 flex flex-col">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 font-sans text-[15px] tracking-[-0.02em] text-nav transition-colors hover:text-brand"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
              <li className="pt-5">
                <BlockButton href={CTA.contact} variant="brand" full>
                  Contact Us
                </BlockButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
