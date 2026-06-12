export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-surface-warm" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-surface-warm" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-surface-warm" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-surface-warm" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
