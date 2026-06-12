import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { PRODUCTS, ALL_FABRICS, searchProducts, fmt, type Fabric } from "@/lib/products";
import { COLLECTIONS } from "@/lib/collections";

const TRENDING = ["Linen dress", "Cotton shirt", "Anarkali suit", "Wide-leg trousers", "Cashmere"];

interface Props {
  open: boolean;
  onClose: () => void;
}

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem("zivah_recent_search") ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function SearchCommand({ open, onClose }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setRecent(readRecent());
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQ("");
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  const products = useMemo(() => searchProducts(q).slice(0, 5), [q]);

  const matchedFabrics = useMemo<Fabric[]>(() => {
    const s = q.toLowerCase().trim();
    if (!s) return [];
    return ALL_FABRICS.filter((f) => f.toLowerCase().includes(s)).slice(0, 4);
  }, [q]);

  const matchedCollections = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return [];
    return COLLECTIONS.filter(
      (c) => c.title.toLowerCase().includes(s) || c.slug.includes(s)
    ).slice(0, 4);
  }, [q]);

  // "cot" → "Cotton Dresses", "Cotton Shirts" etc
  const fabricSuggestions = useMemo(() => {
    type Sug = { label: string; to: string; search: Record<string, unknown>; params?: { slug: string } };
    const s = q.toLowerCase().trim();
    if (!s) return [] as Sug[];
    const fab = ALL_FABRICS.find((f) => f.toLowerCase().startsWith(s));
    if (!fab) return [] as Sug[];
    const out: Sug[] = [
      { label: `${fab} Dresses`, to: "/collection/$slug", search: { fabrics: [fab] }, params: { slug: "dresses" } },
      { label: `${fab} Shirts`, to: "/collection/$slug", search: { fabrics: [fab] }, params: { slug: "shirts" } },
      { label: `${fab} Co-ords`, to: "/collection/$slug", search: { fabrics: [fab] }, params: { slug: "co-ords" } },
      { label: `${fab} Collection`, to: "/shop", search: { fabrics: [fab] } },
    ];
    return out;
  }, [q]);

  const recordRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6);
    setRecent(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("zivah_recent_search", JSON.stringify(next));
    }
  };

  const submit = (term: string) => {
    recordRecent(term);
    setQ(term);
  };

  const bestSellers = useMemo(() => [...PRODUCTS].sort((a, b) => a.salesRank - b.salesRank).slice(0, 4), []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-20 max-w-2xl overflow-hidden rounded-xl bg-surface shadow-lux"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 text-ink-muted" strokeWidth={1.6} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                recordRecent(q);
                onClose();
                navigate({ to: "/shop" });
              }
            }}
            placeholder="Search by name, fabric, style…"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-ink-muted"
          />
          <button onClick={onClose} aria-label="Close" className="text-ink-muted hover:text-ink">
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5">
          {!q && (
            <div className="space-y-6">
              {recent.length > 0 && (
                <div>
                  <div className="eyebrow mb-3 flex items-center gap-1.5"><Clock className="h-3 w-3" /> Recent</div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="eyebrow mb-3 flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Trending</div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow mb-3">Best sellers</div>
                <ul className="grid grid-cols-2 gap-3">
                  {bestSellers.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          recordRecent(p.name);
                          onClose();
                          navigate({ to: "/product/$id", params: { id: String(p.id) } });
                        }}
                        className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-surface-warm"
                      >
                        <img src={p.img} alt="" className="h-12 w-12 rounded object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm text-ink">{p.name}</p>
                          <p className="text-xs text-ink-muted">{fmt(p.price)}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {q && (
            <div className="space-y-5">
              {fabricSuggestions.length > 0 && (
                <div>
                  <div className="eyebrow mb-2">Suggestions</div>
                  <ul className="flex flex-col">
                    {fabricSuggestions.map((s) => (
                      <li key={s.label}>
                        <button
                          onClick={() => {
                            recordRecent(s.label);
                            onClose();
                            if (s.params) {
                              navigate({ to: s.to, params: s.params, search: s.search });
                            } else {
                              navigate({ to: s.to, search: s.search });
                            }
                          }}
                          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-ink hover:bg-surface-warm"
                        >
                          <span>{s.label}</span>
                          <Search className="h-3.5 w-3.5 text-ink-muted" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {products.length > 0 && (
                <div>
                  <div className="eyebrow mb-2">Products</div>
                  <ul className="flex flex-col">
                    {products.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            recordRecent(p.name);
                            onClose();
                            navigate({ to: "/product/$id", params: { id: String(p.id) } });
                          }}
                          className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-surface-warm"
                        >
                          <img src={p.img} alt="" className="h-12 w-12 rounded object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-ink">{p.name}</p>
                            <p className="text-xs text-ink-muted">{p.brand} · {p.fabric}</p>
                          </div>
                          <span className="text-sm text-ink">{fmt(p.price)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matchedCollections.length > 0 && (
                <div>
                  <div className="eyebrow mb-2">Collections</div>
                  <div className="flex flex-wrap gap-2">
                    {matchedCollections.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => {
                          recordRecent(c.title);
                          onClose();
                          navigate({ to: "/collection/$slug", params: { slug: c.slug } });
                        }}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedFabrics.length > 0 && (
                <div>
                  <div className="eyebrow mb-2">Fabrics</div>
                  <div className="flex flex-wrap gap-2">
                    {matchedFabrics.map((f) => (
                      <button
                        key={f}
                        onClick={() => {
                          recordRecent(f);
                          onClose();
                          navigate({ to: "/shop", search: { fabrics: [f] } });
                        }}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-soft hover:border-accent hover:text-accent"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {products.length === 0 && fabricSuggestions.length === 0 && matchedCollections.length === 0 && matchedFabrics.length === 0 && (
                <div>
                  <p className="text-sm text-ink-muted">No exact matches for "{q}". You might like:</p>
                  <ul className="mt-3 grid grid-cols-2 gap-3">
                    {bestSellers.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            onClose();
                            navigate({ to: "/product/$id", params: { id: String(p.id) } });
                          }}
                          className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-surface-warm"
                        >
                          <img src={p.img} alt="" className="h-12 w-12 rounded object-cover" />
                          <div className="min-w-0">
                            <p className="truncate text-sm text-ink">{p.name}</p>
                            <p className="text-xs text-ink-muted">{fmt(p.price)}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
