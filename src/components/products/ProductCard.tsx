import { ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";
import { Tag } from "@/components/ui/Blueprint";
import { Logo } from "@/components/ui/Logo";
import { ProductLauncher } from "./ProductLauncher";
import { ProductThumb } from "./ProductThumb";

/**
 * Catalogue card. The whole card is one button (an overlay) that opens the leave-site dialog;
 * the visible content stays plain text so the heading isn't nested in a button.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group/card relative flex h-full flex-col gap-6 p-6 lg:p-8">
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px z-10 h-0.5 origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-out group-hover/card:scale-x-100"
      />
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-white">
        <div className="h-full w-full origin-top transition-[scale,translate] duration-700 ease-out group-hover/card:-translate-y-1 group-hover/card:scale-[1.03]">
          <ProductThumb product={product} />
        </div>
        {product.sample ? (
          <span className="absolute right-3 bottom-3">
            <Tag tone="warn">Sample</Tag>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[26px] leading-none tracking-[-0.03em] text-ink transition-colors duration-500 group-hover/card:text-brand">
            {product.name}
          </h2>
          <Tag tone={product.status === "Live" ? "ok" : "brand"}>{product.status}</Tag>
        </div>
        <p className="text-[16px] leading-6 tracking-[-0.02em] text-ink">{product.tagline}</p>
        <p className="text-[15px] leading-6 tracking-[-0.02em] text-muted">{product.description}</p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] leading-none text-muted uppercase">{product.category}</span>
          <span className="flex items-center gap-1.5" aria-label={`Built with ${product.stack.join(", ")}`}>
            {product.stack.map((t) => (
              <span key={t} className="grid size-7 place-items-center border border-line bg-white">
                <Logo name={t} size={15} />
              </span>
            ))}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] leading-none text-ink-soft uppercase transition-colors group-hover/card:text-brand">
          Visit
          <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
        </span>
      </div>

      <ProductLauncher product={product} className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-offset-[-4px]">
        <span className="sr-only">Open {product.name}, {product.tagline}</span>
      </ProductLauncher>
    </article>
  );
}
