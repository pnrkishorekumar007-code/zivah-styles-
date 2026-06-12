import { Stars } from "./stars";
import type { Product } from "@/lib/products";

interface Review {
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  size?: string;
  verified?: boolean;
}

const SAMPLE: Review[] = [
  {
    name: "Aanya R.", rating: 5, date: "2 weeks ago", title: "Beautifully made",
    text: "The fabric is gorgeous and the fit is flattering. I wore it to a dinner and got compliments all evening.",
    size: "M", verified: true,
  },
  {
    name: "Mihir K.", rating: 4, date: "1 month ago", title: "Excellent quality, runs slightly large",
    text: "Premium feel, beautiful detailing. I'd recommend sizing down if you're between sizes.",
    size: "L", verified: true,
  },
  {
    name: "Priya S.", rating: 5, date: "1 month ago", title: "My new favourite",
    text: "Comfortable enough to wear all day, elegant enough for evenings. Worth every rupee.",
    size: "S", verified: true,
  },
];

function aggregate(p: Product) {
  // Roughly distribute reviews around the average
  const counts = [0, 0, 0, 0, 0];
  let remaining = p.reviews;
  for (let star = 5; star >= 1; star--) {
    const weight =
      star === 5 ? 0.62 : star === 4 ? 0.22 : star === 3 ? 0.10 : star === 2 ? 0.04 : 0.02;
    const c = star === 1 ? remaining : Math.round(p.reviews * weight);
    counts[star - 1] = c;
    remaining -= c;
  }
  return counts;
}

export function ReviewsSection({ product }: { product: Product }) {
  const breakdown = aggregate(product);
  const total = product.reviews;

  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">Customer reviews</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl text-ink">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-ink-muted">out of 5</span>
          </div>
          <Stars rating={product.rating} size={18} />
          <p className="mt-1 text-sm text-ink-muted">Based on {total} reviews</p>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const c = breakdown[star - 1];
              const pct = total ? (c / total) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs text-ink-soft">
                  <span className="w-6">{star}★</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right tabular-nums">{c}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {SAMPLE.map((r, i) => (
            <article key={i} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-surface-warm font-display text-lg text-ink">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{r.name}</div>
                    <div className="text-xs text-ink-muted">
                      {r.date} {r.size && `· Size ${r.size}`} {r.verified && "· Verified buyer"}
                    </div>
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <h4 className="mt-4 text-sm font-semibold text-ink">{r.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
