import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface CompareState {
  ids: number[];
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

const MAX = 3;
const Ctx = createContext<CompareState | null>(null);

function read(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("zivah_compare");
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>(() => read());
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("zivah_compare", JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        toast("Removed from compare");
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= MAX) {
        toast.error(`You can compare up to ${MAX} pieces`);
        return prev;
      }
      toast.success("Added to compare");
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: number) => setIds((p) => p.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);
  const has = useCallback((id: number) => ids.includes(id), [ids]);

  return (
    <Ctx.Provider value={{ ids, toggle, remove, clear, has, isOpen, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
