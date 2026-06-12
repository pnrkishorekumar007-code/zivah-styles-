import { useState } from "react";
import { X, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/lib/compare-store";
import { PRODUCTS, fmt } from "@/lib/products";
import { Stars } from "./stars";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CompareDrawer() {
  const { ids, remove, clear } = useCompare();
  const [open, setOpen] = useState(false);

  if (ids.length === 0) return null;
  const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 shadow-elevated backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <span className="eyebrow shrink-0">Compare ({items.length}/3)</span>
          <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
            {items.map((p) => (
              <div key={p.id} className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-surface px-2 py-1">
                <img src={p.img} alt="" className="h-9 w-9 rounded object-cover" />
                <span className="max-w-[140px] truncate text-xs text-ink">{p.name}</span>
                <button onClick={() => remove(p.id)} aria-label="Remove" className="text-ink-muted hover:text-ink">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <Button size="sm" variant="ghost" onClick={clear} className="hidden sm:inline-flex">Clear</Button>
          <Button size="sm" onClick={() => setOpen(true)} disabled={items.length < 2}>
            <ArrowLeftRight className="h-4 w-4" /> Compare
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Compare pieces</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="w-32 py-3 text-left text-xs uppercase tracking-wider text-ink-muted">Piece</th>
                  {items.map((p) => (
                    <td key={p.id} className="p-3 align-top">
                      <img src={p.img} alt={p.name} className="aspect-[3/4] w-full rounded-md object-cover" />
                      <p className="mt-2 font-display text-lg text-ink">{p.name}</p>
                      <p className="eyebrow">{p.brand}</p>
                    </td>
                  ))}
                </tr>
                {(
                  [
                    ["Price", (p: typeof items[number]) => fmt(p.price)],
                    ["Fabric", (p: typeof items[number]) => p.fabric],
                    ["Style", (p: typeof items[number]) => p.style],
                    ["Material", (p: typeof items[number]) => p.material],
                    ["Sizes", (p: typeof items[number]) => p.sizes.join(", ")],
                    ["Colors", (p: typeof items[number]) => p.colors.length + " options"],
                  ] as const
                ).map(([label, get]) => (
                  <tr key={label} className="border-t border-border">
                    <th className="py-3 text-left text-xs uppercase tracking-wider text-ink-muted">{label}</th>
                    {items.map((p) => (
                      <td key={p.id} className="p-3 text-ink">{get(p)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-border">
                  <th className="py-3 text-left text-xs uppercase tracking-wider text-ink-muted">Rating</th>
                  {items.map((p) => (
                    <td key={p.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <Stars rating={p.rating} />
                        <span className="text-xs text-ink-muted">({p.reviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
