import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HeroSlider } from "@/components/site/hero-slider";
import { CategoryStrip } from "@/components/site/category-strip";
import { ProductScroller } from "@/components/site/scroller";
import { TrustBadges } from "@/components/site/trust-badges";
import { InstagramGallery } from "@/components/site/instagram-gallery";
import { Newsletter } from "@/components/site/newsletter";
import { FabricNav } from "@/components/site/fabric-nav";
import { PRODUCTS } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zivah Styles — Premium Fashion for Women, Men & Kids" },
      { name: "description", content: "Discover the new Spring/Summer collection. Considered design, conscious materials, premium fashion for the modern wardrobe." },
      { property: "og:title", content: "Zivah Styles — Premium Fashion" },
      { property: "og:description", content: "Spring/Summer 2025 collection. Effortless luxury for women, men and kids." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { recentlyViewed } = useShop();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const newArrivals = useMemo(() => PRODUCTS.filter((p) => p.tags.includes("new")), []);
  const bestsellers = useMemo(
    () => [...PRODUCTS].sort((a, b) => a.salesRank - b.salesRank).slice(0, 8),
    []
  );
  const recent = useMemo(
    () => recentlyViewed.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS,
    [recentlyViewed]
  );

  return (
    <>
      <HeroSlider />
      <TrustBadges />
      <CategoryStrip />
      <FabricNav />
      <ProductScroller eyebrow="Just landed" title="New arrivals" products={newArrivals} />
      <ProductScroller eyebrow="Most loved" title="Bestsellers" products={bestsellers} />
      {mounted && recent.length > 0 && (
        <ProductScroller eyebrow="Pick up where you left off" title="Recently viewed" products={recent} />
      )}
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
