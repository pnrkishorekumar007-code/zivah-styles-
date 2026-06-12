import { Link } from "@tanstack/react-router";
import type { Fabric } from "@/lib/products";

const FEATURED: Fabric[] = ["Cotton", "Linen", "Rayon", "Satin", "Silk", "Chiffon", "Denim"];

export function FabricNav({ active }: { active?: Fabric }) {
  return (
    <section className="border-y border-border bg-surface-warm/50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="eyebrow shrink-0">Shop by fabric</span>
          {FEATURED.map((f) => {
            const isActive = active === f;
            return (
              <Link
                key={f}
                to="/shop"
                search={{ fabrics: [f] }}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {f}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
