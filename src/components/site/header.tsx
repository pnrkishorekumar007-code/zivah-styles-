import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/shop-store";
import { COLLECTIONS } from "@/lib/collections";
import { SearchCommand } from "./search-command";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { itemCount, setCartOpen, wishlist } = useShop();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Women", to: "/shop", search: { category: "women" } as const },
    { label: "Men", to: "/shop", search: { category: "men" } as const },
    { label: "Kids", to: "/shop", search: { category: "kids" } as const },
    { label: "All", to: "/shop", search: {} as const },
  ];

  return (
    <>
      <div className="bg-ink text-canvas text-[11px] uppercase tracking-[0.22em] py-2 px-4 text-center overflow-hidden">
        Complimentary shipping on orders over ₹1,499 · Free returns within 30 days
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md transition-shadow",
          scrolled ? "shadow-soft border-b border-border" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:h-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  search={l.search}
                  className="text-[13px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent transition-colors"
                  activeProps={{ className: "text-accent" }}
                >
                  {l.label}
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-[13px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent transition-colors"
                  onClick={() => setCollectionsOpen((v) => !v)}
                >
                  Collections <ChevronDown className="h-3 w-3" />
                </button>
                {collectionsOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-md border border-border bg-surface p-3 shadow-elevated">
                    <ul className="flex flex-col">
                      {COLLECTIONS.map((c) => (
                        <li key={c.slug}>
                          <Link
                            to="/collection/$slug"
                            params={{ slug: c.slug }}
                            className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-surface-warm hover:text-ink"
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center font-display text-2xl tracking-[0.22em] text-ink sm:text-[26px]"
          >
            ZIVAH
            <span className="ml-2 hidden text-xs tracking-[0.4em] text-ink-muted sm:inline">
              STYLES
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 justify-self-end">
            <button
              type="button"
              aria-label="Search"
              className="grid h-10 w-10 place-items-center hover:text-accent transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center hover:text-accent transition-colors"
            >
              <Heart className="h-5 w-5" strokeWidth={1.6} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={`Bag (${itemCount} items)`}
              className="relative grid h-10 w-10 place-items-center hover:text-accent transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center hover:text-accent transition-colors sm:grid"
            >
              <User className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-surface shadow-lux flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <span className="font-display text-xl tracking-[0.2em]">ZIVAH</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center">
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  search={l.search}
                  className="px-3 py-3 text-base font-display tracking-wide text-ink hover:bg-surface-warm rounded-md"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <p className="eyebrow px-3 py-2">Collections</p>
                {COLLECTIONS.map((c) => (
                  <Link
                    key={c.slug}
                    to="/collection/$slug"
                    params={{ slug: c.slug }}
                    className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-surface-warm"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
              <div className="mt-2 border-t border-border pt-2">
                <Link to="/wishlist" className="px-3 py-3 text-base font-display tracking-wide text-ink hover:bg-surface-warm rounded-md block">
                  Wishlist
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); setCartOpen(true); }}
                  className="w-full text-left px-3 py-3 text-base font-display tracking-wide text-ink hover:bg-surface-warm rounded-md"
                >
                  Bag ({itemCount})
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
