"use client";

import { useRef, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";
import type { Product } from "@/lib/products";

/**
 * Wraps a product link: clicking asks for confirmation in a modal before opening the product's own
 * website in a new tab. Uses the native <dialog> (focus trap, Escape to close, top layer).
 * `children` is the visible trigger content; `className` styles the trigger button.
 */
export function ProductLauncher({
  product,
  className,
  children,
}: {
  product: Product;
  className?: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
        className={className}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={`leave-${product.slug}`}
        onClick={(e) => {
          // A click on the backdrop lands on the <dialog> itself.
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-40px)] max-w-[440px] border border-line bg-white p-0 text-left shadow-[0_32px_64px_-24px_rgba(17,17,17,0.35)] backdrop:bg-ink/40 backdrop:backdrop-blur-[2px] open:animate-[dialog-in_0.25s_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="font-mono text-[12px] leading-none text-muted uppercase">Leaving Infra8</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-8 place-items-center border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <X aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex flex-col gap-3 px-6 py-6">
          <p id={`leave-${product.slug}`} className="font-display text-[22px] leading-[1.25] tracking-[-0.03em] text-ink">
            Open {product.name}?
          </p>
          <p className="text-[15px] leading-6 tracking-[-0.02em] text-ink-soft">
            {product.name} is one of our own products. It lives on its own website, which opens in a new tab.
          </p>
          <p className="font-mono text-[12px] leading-none text-muted">{product.domain}</p>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={close}
            className="h-11 border border-line px-4 font-mono text-[12px] leading-none text-ink uppercase transition-colors hover:border-ink"
          >
            Stay here
          </button>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex h-11 items-center justify-center gap-2 bg-brand px-4 font-mono text-[12px] leading-none text-white uppercase transition-colors hover:bg-brand-deep"
          >
            Continue to {product.name}
            <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </dialog>
    </>
  );
}
