import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Heart, Minus, Plus, RotateCcw, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/stars";
import { ReviewsSection } from "@/components/site/reviews";
import { ProductScroller } from "@/components/site/scroller";
import { SizeGuideDialog } from "@/components/site/size-guide-dialog";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { discount, fmt, getProduct, relatedProducts, PRODUCTS } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { useCompare } from "@/lib/compare-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — Zivah Styles" }] };
    return {
      meta: [
        { title: `${p.name} — ${p.brand} | Zivah Styles` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Zivah Styles` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.img },
        { name: "twitter:image", content: p.img },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <p className="mt-2 text-sm text-ink-muted">This piece may have sold out or moved.</p>
      <Button asChild className="mt-6"><Link to="/shop">Browse the collection</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <Button className="mt-6" onClick={reset}>Try again</Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWished, trackView, recentlyViewed } = useShop();
  const { has: isCompared, toggle: toggleCompare } = useCompare();

  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.img);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setSize("");
    setColor(product.colors[0] ?? "");
    setQty(1);
    setMainImg(product.img);
    trackView(product.id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [product, trackView]);

  const off = product.originalPrice ? discount(product.originalPrice, product.price) : 0;
  const related = useMemo(() => relatedProducts(product), [product]);
  const recent = useMemo(
    () =>
      recentlyViewed
        .filter((id) => id !== product.id)
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean) as typeof PRODUCTS,
    [recentlyViewed, product.id]
  );

  const wished = isWished(product.id);
  const compared = isCompared(product.id);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.category, to: "/shop" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-3 lg:flex-row">
          <div className="flex gap-3 overflow-x-auto lg:flex-col no-scrollbar">
            {[product.img, product.img2].map((src) => (
              <button
                key={src}
                onClick={() => setMainImg(src)}
                className={cn(
                  "shrink-0 overflow-hidden rounded-md border-2 bg-surface-warm transition-colors",
                  mainImg === src ? "border-accent" : "border-transparent hover:border-border-strong"
                )}
              >
                <img src={src} alt="" className="h-20 w-16 object-cover lg:h-24 lg:w-20" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden bg-surface-warm aspect-[4/5] rounded-md">
            <img src={mainImg} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="eyebrow">{product.brand}</div>
            <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <Stars rating={product.rating} showValue />
              <span className="text-xs text-ink-muted">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl text-ink">{fmt(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-ink-muted line-through">{fmt(product.originalPrice)}</span>
                <span className="rounded-sm bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">{off}% off</span>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div>
            <div className="eyebrow mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c: string) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-all",
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
              <button
                onClick={() => setSizeGuide(true)}
                className="inline-flex items-center gap-1 text-xs text-accent underline-offset-4 hover:underline"
              >
                <Ruler className="h-3.5 w-3.5" /> Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 rounded border px-3 py-2.5 text-sm transition-colors",
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

          <div className="grid grid-cols-[auto_1fr] gap-3">
            <div className="inline-flex items-center rounded border border-border-strong">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-11 place-items-center text-ink-soft hover:text-ink"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-11 place-items-center text-ink-soft hover:text-ink"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="h-12"
              onClick={() => addToCart(product.id, size, color, qty)}
            >
              Add to Bag · {fmt(product.price * qty)}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-destructive stroke-destructive")} />
              {wished ? "Saved" : "Wishlist"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn("h-12", compared && "border-accent text-accent")}
              onClick={() => toggleCompare(product.id)}
            >
              <ArrowLeftRight className="h-4 w-4" />
              {compared ? "Comparing" : "Compare"}
            </Button>
          </div>

          {/* Perks */}
          <ul className="grid gap-3 rounded-md border border-border bg-surface-warm/50 p-4 text-sm text-ink-soft">
            <li className="flex items-center gap-3"><Truck className="h-4 w-4 text-accent" /> Free shipping on orders over ₹1,499</li>
            <li className="flex items-center gap-3"><RotateCcw className="h-4 w-4 text-accent" /> Free 30-day returns</li>
            <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-accent" /> Secure checkout · SSL encrypted</li>
          </ul>

          {product.details && (
            <details className="border-t border-border pt-4">
              <summary className="cursor-pointer text-sm font-medium text-ink">Product details</summary>
              <ul className="mt-3 space-y-1.5 pl-4 text-sm text-ink-soft list-disc">
                {product.details.map((d: string) => <li key={d}>{d}</li>)}
              </ul>
            </details>
          )}
        </div>
      </section>

      <ReviewsSection product={product} />

      {related.length > 0 && (
        <ProductScroller eyebrow="You may also like" title="Complete the look" products={related} />
      )}

      {mounted && recent.length > 0 && (
        <ProductScroller eyebrow="Recently viewed" title="Pick up where you left off" products={recent} />
      )}

      <SizeGuideDialog open={sizeGuide} onOpenChange={setSizeGuide} />
    </>
  );
}
