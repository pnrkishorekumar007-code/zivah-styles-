import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { QuickViewDialog } from "./quick-view-dialog";
import { SizeGuideDialog } from "./size-guide-dialog";

export function ProductGrid({ products }: { products: Product[] }) {
  const [quick, setQuick] = useState<Product | null>(null);
  const [sizeGuide, setSizeGuide] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
        ))}
      </div>
      <QuickViewDialog
        product={quick}
        open={!!quick}
        onOpenChange={(o) => !o && setQuick(null)}
        onOpenSizeGuide={() => setSizeGuide(true)}
      />
      <SizeGuideDialog open={sizeGuide} onOpenChange={setSizeGuide} />
    </>
  );
}
