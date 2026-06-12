import { Link } from "@tanstack/react-router";

const CATEGORIES = [
  {
    label: "Women",
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&q=85",
    to: "/shop",
    search: { category: "women" as const },
  },
  {
    label: "Men",
    img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=900&q=85",
    to: "/shop",
    search: { category: "men" as const },
  },
  {
    label: "Kids",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=900&q=85",
    to: "/shop",
    search: { category: "kids" as const },
  },
];

export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 text-center">
        <p className="eyebrow">Shop by category</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Curated for everyone</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            search={c.search}
            className="group relative block overflow-hidden bg-surface-warm aspect-[3/4] rounded-md"
          >
            <img
              src={c.img}
              alt={c.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-canvas">
              <div className="font-display text-3xl md:text-4xl">{c.label}</div>
              <div className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-canvas/80 transition-colors group-hover:text-accent">
                Shop now →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
