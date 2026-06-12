import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, Eye, Heart } from "lucide-react";
import { discount, fmt, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { useCompare } from "@/lib/compare-store";
import { Stars } from "./stars";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (p: Product) => void;
}

const tagStyles: Record<string, string> = {
  new: "bg-ink text-canvas",
  sale: "bg-destructive text-destructive-foreground",
  hot: "bg-accent text-accent-foreground",
};

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { isWished, toggleWishlist } = useShop();
  const { has: isCompared, toggle: toggleCompare } = useCompare();
  const off = product.originalPrice ? discount(product.originalPrice, product.price) : 0;
  const wished = isWished(product.id);
  const compared = isCompared(product.id);

  return (
    <article className="group relative flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        className="relative block overflow-hidden bg-surface-warm aspect-[3/4] rounded-md"
      >
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.img2}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className={cn(
                "px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
                tagStyles[t]
              )}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="grid h-9 w-9 place-items-center rounded-full bg-surface/95 shadow-soft transition-colors hover:bg-surface"
          >
            <Heart className={cn("h-4 w-4", wished ? "fill-destructive stroke-destructive" : "stroke-ink")} strokeWidth={1.6} />
          </button>
          {onQuickView && (
            <button
              type="button"
              aria-label="Quick view"
              onClick={(e) => { e.preventDefault(); onQuickView(product); }}
              className="grid h-9 w-9 place-items-center rounded-full bg-surface/95 shadow-soft transition-colors hover:bg-surface"
            >
              <Eye className="h-4 w-4 stroke-ink" strokeWidth={1.6} />
            </button>
          )}
          <button
            type="button"
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full shadow-soft transition-colors",
              compared ? "bg-accent text-accent-foreground" : "bg-surface/95 text-ink hover:bg-surface"
            )}
          >
            <ArrowLeftRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>

        {onQuickView && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onQuickView(product); }}
            className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 py-3 text-xs uppercase tracking-[0.2em] text-canvas transition-transform duration-300 group-hover:translate-y-0"
          >
            Quick View
          </button>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1.5 px-0.5">
        <div className="eyebrow">{product.brand}</div>
        <Link
          to="/product/$id"
          params={{ id: String(product.id) }}
          className="font-display text-lg leading-snug text-ink hover:text-accent transition-colors"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-ink">{fmt(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-ink-muted line-through">{fmt(product.originalPrice)}</span>
              <span className="text-xs font-medium text-destructive">{off}% off</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink-muted">({product.reviews})</span>
        </div>
      </div>
    </article>
  );
}
