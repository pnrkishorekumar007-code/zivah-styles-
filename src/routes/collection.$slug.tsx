import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductGrid } from "@/components/site/product-grid";
import { ProductScroller } from "@/components/site/scroller";
import { ProductFilters, type FilterValue } from "@/components/site/product-filters";
import { FabricNav } from "@/components/site/fabric-nav";
import { StyleNav } from "@/components/site/style-nav";
import { CollectionHero } from "@/components/site/collection-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { EmptyState } from "@/components/site/empty-state";
import { COLLECTIONS, getCollection, collectionProducts } from "@/lib/collections";
import {
  PRICE_TIERS,
  type Fabric,
  type Style,
  type PriceTierId,
} from "@/lib/products";

const searchSchema = z.object({
  sort: z.enum(["featured", "newest", "bestsellers", "price-asc", "price-desc", "popular", "rating"]).optional(),
  max: z.number().optional(),
  sizes: z.array(z.string()).optional(),
  fabrics: z.array(z.string()).optional(),
  styles: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  tier: z.string().optional(),
});

type SearchT = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/collection/$slug")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const c = getCollection(params.slug);
    if (!c) throw notFound();
    return { collection: c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.collection;
    if (!c) return { meta: [{ title: "Collection — Zivah Styles" }] };
    const title = `${c.title} — Zivah Styles`;
    return {
      meta: [
        { title },
        { name: "description", content: c.description },
        { property: "og:title", content: title },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="font-display text-4xl">Collection not found</h1>
      <p className="mt-2 text-sm text-ink-muted">Try another collection from the menu.</p>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <Button className="mt-6" onClick={reset}>Try again</Button>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const value: FilterValue = {
    fabrics: (search.fabrics ?? []) as Fabric[],
    styles: (search.styles ?? []) as Style[],
    sizes: search.sizes ?? [],
    colors: search.colors ?? [],
    tier: search.tier as PriceTierId | undefined,
    max: search.max ?? 6000,
  };
  const sort = search.sort ?? "featured";

  const base = useMemo(() => collectionProducts(collection.slug), [collection.slug]);

  const filtered = useMemo(() => {
    let items = base.slice();
    items = items.filter((p) => p.price <= value.max);
    if (value.sizes.length) items = items.filter((p) => p.sizes.some((s) => value.sizes.includes(s)));
    if (value.fabrics.length) items = items.filter((p) => value.fabrics.includes(p.fabric));
    if (value.styles.length) items = items.filter((p) => value.styles.includes(p.style));
    if (value.colors.length) items = items.filter((p) => p.colors.some((c) => value.colors.includes(c)));
    if (value.tier) {
      const t = PRICE_TIERS.find((x) => x.id === value.tier);
      if (t) items = items.filter((p) => p.price >= t.min && p.price <= t.max);
    }
    switch (sort) {
      case "newest": items.sort((a, b) => a.addedRank - b.addedRank); break;
      case "bestsellers":
      case "popular": items.sort((a, b) => a.salesRank - b.salesRank); break;
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
    }
    return items;
  }, [base, value, sort]);

  const featured = useMemo(() => [...base].sort((a, b) => b.rating - a.rating).slice(0, 6), [base]);
  const trending = useMemo(() => [...base].sort((a, b) => a.salesRank - b.salesRank).slice(0, 6), [base]);

  const setSearch = (next: Partial<SearchT>) =>
    navigate({ search: (prev: SearchT) => ({ ...prev, ...next }) });

  const onFilterChange = (patch: Partial<FilterValue>) => {
    setSearch({
      ...(patch.fabrics !== undefined && { fabrics: patch.fabrics.length ? patch.fabrics : undefined }),
      ...(patch.styles !== undefined && { styles: patch.styles.length ? patch.styles : undefined }),
      ...(patch.sizes !== undefined && { sizes: patch.sizes.length ? patch.sizes : undefined }),
      ...(patch.colors !== undefined && { colors: patch.colors.length ? patch.colors : undefined }),
      ...(patch.tier !== undefined && { tier: patch.tier }),
      ...(patch.max !== undefined && { max: patch.max }),
    });
  };
  const clearAll = () => navigate({ search: {} });

  const activeChips: { label: string; clear: () => void }[] = [];
  value.fabrics.forEach((f) => activeChips.push({ label: f, clear: () => onFilterChange({ fabrics: value.fabrics.filter((x) => x !== f) }) }));
  value.styles.forEach((s) => activeChips.push({ label: s, clear: () => onFilterChange({ styles: value.styles.filter((x) => x !== s) }) }));
  value.sizes.forEach((s) => activeChips.push({ label: `Size ${s}`, clear: () => onFilterChange({ sizes: value.sizes.filter((x) => x !== s) }) }));
  value.colors.forEach((c) => activeChips.push({ label: c, clear: () => onFilterChange({ colors: value.colors.filter((x) => x !== c) }) }));
  if (value.tier) {
    const t = PRICE_TIERS.find((x) => x.id === value.tier);
    if (t) activeChips.push({ label: t.label, clear: () => onFilterChange({ tier: undefined }) });
  }

  return (
    <>
      <CollectionHero collection={collection} count={base.length} />

      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: collection.title },
          ]}
        />
      </div>

      <FabricNav />

      {/* Style chips strip */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <p className="eyebrow mb-3">Shop {collection.title} by style</p>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(base.map((p) => p.style))).map((s) => {
            const active = value.styles.includes(s);
            return (
              <button
                key={s}
                onClick={() => onFilterChange({ styles: active ? value.styles.filter((x) => x !== s) : [...value.styles, s] })}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      {featured.length > 0 && (
        <ProductScroller eyebrow="Featured" title={`Featured ${collection.title.toLowerCase()}`} products={featured} />
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">Shop all {collection.title.toLowerCase()}</h2>
            <p className="mt-1 text-sm text-ink-muted">{filtered.length} pieces</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl">Filter</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters value={value} onChange={onFilterChange} onClear={clearAll} showCategory={false} />
                </div>
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={(v) => setSearch({ sort: v as SearchT["sort"] })}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">New arrivals</SelectItem>
                <SelectItem value="bestsellers">Best sellers</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {activeChips.map((c, i) => (
              <button
                key={i}
                onClick={c.clear}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-warm px-3 py-1 text-xs capitalize text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                {c.label}<X className="h-3 w-3" />
              </button>
            ))}
            <button onClick={clearAll} className="text-xs uppercase tracking-[0.18em] text-ink-muted underline-offset-4 hover:text-ink hover:underline">Clear all</button>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
            <ProductFilters value={value} onChange={onFilterChange} onClear={clearAll} showCategory={false} />
          </aside>
          <div>
            {filtered.length === 0 ? (
              <EmptyState
                title="Nothing matches yet"
                description="Adjust the filters or browse our full collection."
                action={<Button onClick={clearAll} variant="outline">Clear filters</Button>}
              />
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>

      {trending.length > 0 && (
        <ProductScroller eyebrow="Right now" title="Trending styles" products={trending} />
      )}

      {/* Other collections */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="eyebrow mb-3">More collections</p>
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.filter((c) => c.slug !== collection.slug).map((c) => (
            <a
              key={c.slug}
              href={`/collection/${c.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink"
            >
              {c.title}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
