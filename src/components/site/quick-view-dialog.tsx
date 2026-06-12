import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stars } from "./stars";
import { discount, fmt, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

interface Props {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSizeGuide?: () => void;
}

export function QuickViewDialog({ product, open, onOpenChange, onOpenSizeGuide }: Props) {
  const { addToCart } = useShop();
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (product) {
      setSize("");
      setColor(product.colors[0] ?? "");
    }
  }, [product]);

  if (!product) return null;
  const off = product.originalPrice ? discount(product.originalPrice, product.price) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] bg-surface-warm">
            <img src={product.img} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex max-h-[85vh] flex-col gap-4 overflow-y-auto p-6 md:p-8">
            <div>
              <div className="eyebrow">{product.brand}</div>
              <h2 className="font-display text-2xl text-ink md:text-3xl">{product.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={product.rating} showValue />
                <span className="text-xs text-ink-muted">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">{fmt(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-ink-muted line-through">{fmt(product.originalPrice)}</span>
                  <span className="text-xs font-medium text-destructive">{off}% off</span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

            <div>
              <div className="eyebrow mb-2">Color</div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={`Color ${c}`}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      color === c ? "border-accent ring-2 ring-accent/30" : "border-border"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="eyebrow">Size</span>
                {onOpenSizeGuide && (
                  <button onClick={onOpenSizeGuide} className="text-xs text-accent underline-offset-4 hover:underline">
                    Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-11 rounded border px-3 py-2 text-sm transition-colors",
                      size === s
                        ? "border-ink bg-ink text-canvas"
                        : "border-border-strong text-ink-soft hover:border-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(product.id, size, color);
                  onOpenChange(false);
                }}
              >
                Add to Bag
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/product/$id" params={{ id: String(product.id) }} onClick={() => onOpenChange(false)}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
