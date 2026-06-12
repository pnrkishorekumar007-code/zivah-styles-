import { Link } from "@tanstack/react-router";
import type { Style } from "@/lib/products";

const FEATURED: Style[] = ["Casual", "Party", "Formal", "Minimalist", "Streetwear", "Resort", "Ethnic", "Workwear"];

export function StyleNav() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="eyebrow mb-3">Shop by style</p>
      <div className="flex flex-wrap gap-2">
        {FEATURED.map((s) => (
          <Link
            key={s}
            to="/shop"
            search={{ styles: [s] }}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {s}
          </Link>
        ))}
      </div>
    </section>
  );
}
