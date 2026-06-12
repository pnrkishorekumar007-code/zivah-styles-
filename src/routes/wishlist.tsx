import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/product-grid";
import { PRODUCTS } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist — Zivah Styles" },
      { name: "description", content: "Pieces you've saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <header className="mb-10 text-center">
        <p className="eyebrow">Saved for later</p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">Your wishlist</h1>
        <p className="mt-2 text-sm text-ink-muted">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
      </header>

      {items.length === 0 ? (
        <div className="mx-auto max-w-md rounded-lg border border-border bg-surface-warm/40 p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-ink-muted" strokeWidth={1.2} />
          <p className="mt-4 font-display text-2xl text-ink">Nothing saved yet</p>
          <p className="mt-2 text-sm text-ink-muted">Tap the heart on any piece to save it here.</p>
          <Button asChild className="mt-5"><Link to="/shop">Browse the collection</Link></Button>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
