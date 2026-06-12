import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { QuickViewDialog } from "./quick-view-dialog";

interface Props {
  title: string;
  eyebrow?: string;
  products: Product[];
}

export function ProductScroller({ title, eyebrow, products }: Props) {
  const [quick, setQuick] = useState<Product | null>(null);

  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-1 font-display text-3xl text-ink md:text-4xl">{title}</h2>
        </div>
      </div>
      <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 no-scrollbar md:gap-6">
        {products.map((p) => (
          <div key={p.id} className="w-[64vw] shrink-0 sm:w-[44vw] md:w-[28vw] lg:w-[22vw]">
            <ProductCard product={p} onQuickView={setQuick} />
          </div>
        ))}
      </div>
      <QuickViewDialog product={quick} open={!!quick} onOpenChange={(o) => !o && setQuick(null)} />
    </section>
  );
}
