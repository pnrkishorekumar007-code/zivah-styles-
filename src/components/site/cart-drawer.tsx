import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fmt, getProduct } from "@/lib/products";
import { cartItemProduct, FREE_SHIPPING_THRESHOLD, useShop } from "@/lib/shop-store";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    subtotal,
    coupon,
    applyCoupon,
    setCoupon,
  } = useShop();
  const [code, setCode] = useState("");

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const discountValue = coupon ? Math.round((subtotal * coupon.pct) / 100) : 0;
  const total = Math.max(0, subtotal - discountValue);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-2xl">Your Bag ({cart.length})</SheetTitle>
        </SheetHeader>

        {/* Free shipping progress */}
        <div className="border-b border-border bg-surface-warm/60 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <Truck className="h-4 w-4 text-accent" strokeWidth={1.6} />
            {remaining > 0 ? (
              <span>
                You're <strong className="text-ink">{fmt(remaining)}</strong> away from free shipping
              </span>
            ) : (
              <span className="text-success font-medium">You've unlocked free shipping</span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-ink-muted" strokeWidth={1.2} />
              <p className="font-display text-xl">Your bag is empty</p>
              <p className="text-sm text-ink-muted">Discover pieces you'll love.</p>
              <Button asChild variant="default" className="mt-3" onClick={() => setCartOpen(false)}>
                <Link to="/shop">Shop the collection</Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {cart.map((item) => {
                const p = cartItemProduct(item) ?? getProduct(item.productId);
                if (!p) return null;
                return (
                  <li key={item.key} className="flex gap-3 py-4">
                    <Link
                      to="/product/$id"
                      params={{ id: String(p.id) }}
                      onClick={() => setCartOpen(false)}
                      className="shrink-0"
                    >
                      <img src={p.img} alt="" className="h-28 w-20 rounded object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="eyebrow">{p.brand}</div>
                      <Link
                        to="/product/$id"
                        params={{ id: String(p.id) }}
                        onClick={() => setCartOpen(false)}
                        className="truncate font-medium text-ink hover:text-accent"
                      >
                        {p.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
                        <span>Size {item.size}</span>
                        <span>·</span>
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-border"
                          style={{ backgroundColor: item.color }}
                          aria-label="Color"
                        />
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(item.key, -1)}
                            className="grid h-7 w-7 place-items-center text-ink-soft hover:text-ink"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-6 text-center text-xs font-medium">{item.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(item.key, +1)}
                            className="grid h-7 w-7 place-items-center text-ink-soft hover:text-ink"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{fmt(p.price * item.qty)}</span>
                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.key)}
                            className="text-ink-muted hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-surface-warm/40 p-5">
            <div className="flex gap-2">
              <Input
                placeholder="Promo code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-10"
              />
              {coupon ? (
                <Button variant="outline" onClick={() => { setCoupon(null); setCode(""); }} className="h-10">
                  <X className="h-4 w-4" /> {coupon.code}
                </Button>
              ) : (
                <Button variant="outline" onClick={() => applyCoupon(code)} className="h-10">Apply</Button>
              )}
            </div>
            <Separator className="my-4" />
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium">{fmt(subtotal)}</dd>
              </div>
              {coupon && (
                <div className="flex justify-between text-success">
                  <dt>Discount ({coupon.pct}%)</dt>
                  <dd>−{fmt(discountValue)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="font-medium">{remaining > 0 ? "Calculated at checkout" : "Free"}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-semibold">{fmt(total)}</dd>
              </div>
            </dl>
            <Button className="mt-4 w-full" size="lg">
              Secure Checkout
            </Button>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Taxes calculated at checkout · 30-day free returns
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
