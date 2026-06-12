import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductGrid } from "@/components/site/product-grid";
import { ProductFilters, type FilterValue } from "@/components/site/product-filters";
import { FabricNav } from "@/components/site/fabric-nav";
import { StyleNav } from "@/components/site/style-nav";
import { EmptyState } from "@/components/site/empty-state";
import {
  PRODUCTS,
  PRICE_TIERS,
  type Category,
  type ProductTag,
  type Fabric,
  type Style,
  type PriceTierId,
} from "@/lib/products";

const searchSchema = z.object({
  category: z.enum(["women", "men", "kids"]).optional(),
  tag: z.enum(["new", "sale", "hot"]).optional(),
  sort: z.enum(["featured", "newest", "bestsellers", "price-asc", "price-desc", "popular", "rating"]).optional(),
  max: z.number().optional(),
  sizes: z.array(z.string()).optional(),
  fabrics: z.array(z.string()).optional(),
  styles: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  tier: z.string().optional(),
});

type SearchT = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: ({ match }) => {
    const cat = match.search.category;
    const title = cat
      ? `${cat[0].toUpperCase() + cat.slice(1)} — Zivah Styles`
      : "Shop the collection — Zivah Styles";
    const description = cat
      ? `Shop the latest ${cat}'s collection at Zivah Styles. Premium fabrics, considered design.`
      : "Shop the full Zivah Styles collection in linen, cotton, silk, satin, rayon and more.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const value: FilterValue = {
    category: search.category,
    fabrics: (search.fabrics ?? []) as Fabric[],
    styles: (search.styles ?? []) as Style[],
    sizes: search.sizes ?? [],
    colors: search.colors ?? [],
    tier: search.tier as PriceTierId | undefined,
    max: search.max ?? 6000,
  };
  const sort = search.sort ?? "featured";
  const tag = search.tag;

  const filtered = useMemo(() => {
    let items = PRODUCTS.slice();
    if (value.category) items = items.filter((p) => p.category === value.category);
    if (tag) items = items.filter((p) => p.tags.includes(tag as ProductTag));
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
  }, [value.category, value.max, value.sizes, value.fabrics, value.styles, value.colors, value.tier, tag, sort]);

  const setSearch = (next: Partial<SearchT>) =>
    navigate({ search: (prev: SearchT) => ({ ...prev, ...next }) });

  const onFilterChange = (patch: Partial<FilterValue>) => {
    setSearch({
      ...(patch.category !== undefined && { category: patch.category }),
      ...(patch.fabrics !== undefined && { fabrics: patch.fabrics.length ? patch.fabrics : undefined }),
      ...(patch.styles !== undefined && { styles: patch.styles.length ? patch.styles : undefined }),
      ...(patch.sizes !== undefined && { sizes: patch.sizes.length ? patch.sizes : undefined }),
      ...(patch.colors !== undefined && { colors: patch.colors.length ? patch.colors : undefined }),
      ...(patch.tier !== undefined && { tier: patch.tier }),
      ...(patch.max !== undefined && { max: patch.max }),
    });
  };

  const clearAll = () => navigate({ search: {} });

  const heading = value.category
    ? `${value.category[0].toUpperCase() + value.category.slice(1)}'s collection`
    : tag === "sale" ? "On sale" : "All collections";

  const activeChips: { label: string; clear: () => void }[] = [];
  if (value.category) activeChips.push({ label: value.category, clear: () => onFilterChange({ category: undefined }) });
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
      <FabricNav />
      <StyleNav />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">The collection</p>
            <h1 className="mt-1 font-display text-4xl text-ink md:text-5xl">{heading}</h1>
            <p className="mt-2 text-sm text-ink-muted">{filtered.length} pieces</p>
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
                  <ProductFilters value={value} onChange={onFilterChange} onClear={clearAll} />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(v) => setSearch({ sort: v as SearchT["sort"] })}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
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
                {c.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="text-xs uppercase tracking-[0.18em] text-ink-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
            <ProductFilters value={value} onChange={onFilterChange} onClear={clearAll} />
          </aside>
          <div>
            {filtered.length === 0 ? (
              <EmptyState
                title="No pieces match your filters"
                description="Try clearing some filters to see more."
                action={<Button onClick={clearAll} variant="outline">Clear filters</Button>}
              />
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// re-export for callers that need it (e.g. typed search)
export type { Category };
