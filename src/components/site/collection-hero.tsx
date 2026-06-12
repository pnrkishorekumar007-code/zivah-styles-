import type { CollectionDef } from "@/lib/collections";

export function CollectionHero({ collection, count }: { collection: CollectionDef; count: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[16/7] w-full min-h-[280px] md:min-h-[420px]">
        <img
          src={collection.hero}
          alt={collection.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, oklch(0 0 0 / 0.55) 100%)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 md:pb-14">
            <p className="eyebrow text-canvas/80">{collection.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl text-canvas md:text-6xl">{collection.title}</h1>
            <p className="mt-3 max-w-xl text-sm text-canvas/80 md:text-base">{collection.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-canvas/70">{count} pieces</p>
          </div>
        </div>
      </div>
    </section>
  );
}
