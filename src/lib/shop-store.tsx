import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { PRODUCTS, type Product } from "./products";

export interface CartItem {
  key: string;
  productId: number;
  size: string;
  color: string;
  qty: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: number[];
  recentlyViewed: number[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (productId: number, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isWished: (productId: number) => boolean;
  trackView: (productId: number) => void;
  applyCoupon: (code: string) => number;
  coupon: { code: string; pct: number } | null;
  setCoupon: (c: { code: string; pct: number } | null) => void;
  subtotal: number;
  itemCount: number;
}

const ShopCtx = createContext<ShopState | null>(null);

const COUPONS: Record<string, number> = {
  ZIVAH10: 10,
  WELCOME15: 15,
  STYLE20: 20,
};

const FREE_SHIP_THRESHOLD = 1499;

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => safeRead("zivah_cart", []));
  const [wishlist, setWishlist] = useState<number[]>(() => safeRead("zivah_wishlist", []));
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>(() => safeRead("zivah_recent", []));
  const [coupon, setCoupon] = useState<{ code: string; pct: number } | null>(() =>
    safeRead("zivah_coupon", null)
  );
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("zivah_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("zivah_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("zivah_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  useEffect(() => {
    localStorage.setItem("zivah_coupon", JSON.stringify(coupon));
  }, [coupon]);

  const addToCart = useCallback(
    (productId: number, size: string, color: string, qty = 1) => {
      if (!size) {
        toast.error("Please select a size");
        return;
      }
      const key = `${productId}-${size}-${color}`;
      setCart((prev) => {
        const existing = prev.find((c) => c.key === key);
        if (existing) {
          toast.success("Updated bag quantity");
          return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c));
        }
        toast.success("Added to bag");
        return [...prev, { key, productId, size, color, qty }];
      });
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((c) => c.key !== key));
    toast("Item removed");
  }, []);

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev.map((c) => (c.key === key ? { ...c, qty: Math.max(1, c.qty + delta) } : c))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        toast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  }, []);

  const isWished = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  const trackView = useCallback((productId: number) => {
    setRecentlyViewed((prev) => {
      const without = prev.filter((id) => id !== productId);
      return [productId, ...without].slice(0, 8);
    });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const c = code.trim().toUpperCase();
    const pct = COUPONS[c];
    if (!pct) {
      toast.error("Invalid coupon code");
      setCoupon(null);
      return 0;
    }
    setCoupon({ code: c, pct });
    toast.success(`${pct}% off applied`);
    return pct;
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.qty;
      }, 0),
    [cart]
  );

  const itemCount = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);

  const value: ShopState = {
    cart,
    wishlist,
    recentlyViewed,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isWished,
    trackView,
    applyCoupon,
    coupon,
    setCoupon,
    subtotal,
    itemCount,
  };

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function cartItemProduct(item: CartItem): Product | undefined {
  return PRODUCTS.find((p) => p.id === item.productId);
}

export const FREE_SHIPPING_THRESHOLD = FREE_SHIP_THRESHOLD;
