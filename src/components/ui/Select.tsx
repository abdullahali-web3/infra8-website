"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Themed replacement for a native <select>: a button that opens a listbox (ARIA listbox pattern).
 * The value travels in a hidden input, so it posts with the form like any other field.
 * Keyboard: arrows, Home/End, Enter/Space to pick, Escape or Tab to close, a letter jumps to an option.
 */
export function Select({
  id,
  name,
  options,
  placeholder = "Choose one",
  defaultValue = "",
  invalid = false,
  describedBy,
}: {
  id: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;

  function openList(at?: number) {
    const selected = options.indexOf(value);
    setActive(at ?? (selected >= 0 ? selected : 0));
    setOpen(true);
  }

  function close(refocus = true) {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  }

  function pick(i: number) {
    setValue(options[i]);
    close();
  }

  // Focus the listbox when it opens, and close on a click anywhere outside the control.
  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function onTriggerKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openList();
    }
  }

  function onListKey(e: KeyboardEvent<HTMLUListElement>) {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (e.key.length === 1) {
          const k = e.key.toLowerCase();
          const next = options.findIndex((o, i) => i > active && o.toLowerCase().startsWith(k));
          const first = options.findIndex((o) => o.toLowerCase().startsWith(k));
          const hit = next >= 0 ? next : first;
          if (hit >= 0) setActive(hit);
        }
    }
  }

  const border = invalid
    ? "border-warn"
    : open
      ? "border-brand"
      : "border-line hover:border-ink/40 focus-visible:border-brand";

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        ref={trigger}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onTriggerKey}
        className={`flex h-12 w-full items-center justify-between gap-3 border bg-white px-4 text-left text-[15px] tracking-[-0.01em] transition-colors focus:outline-none ${border}`}
      >
        <span className={value ? "text-ink" : "text-muted/70"}>{value || placeholder}</span>
        <ChevronDown
          aria-hidden
          className={`size-4 shrink-0 text-ink-soft transition-[rotate] duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={list}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={id}
            aria-activedescendant={optionId(active)}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute inset-x-0 top-full z-20 mt-1 flex flex-col border border-line bg-white p-1 shadow-[0_24px_48px_-24px_rgba(17,17,17,0.3)] outline-none!"
          >
            {options.map((o, i) => {
              const selected = o === value;
              return (
                <li
                  key={o}
                  id={optionId(i)}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => pick(i)}
                  className={`flex h-11 cursor-pointer items-center justify-between gap-3 px-3 text-[15px] tracking-[-0.01em] transition-colors ${
                    i === active ? "bg-surface-2" : ""
                  } ${selected ? "text-brand" : "text-ink"}`}
                >
                  {o}
                  {selected ? <Check aria-hidden className="size-4 shrink-0" strokeWidth={2} /> : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
