import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ALL_FABRICS,
  ALL_STYLES,
  ALL_COLORS,
  PRICE_TIERS,
  type Category,
  type Fabric,
  type Style,
  type PriceTierId,
} from "@/lib/products";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export interface FilterValue {
  category?: Category;
  fabrics: Fabric[];
  styles: Style[];
  sizes: string[];
  colors: string[];
  tier?: PriceTierId;
  max: number;
}

export interface ProductFiltersProps {
  value: FilterValue;
  onChange: (next: Partial<FilterValue>) => void;
  onClear: () => void;
  showCategory?: boolean;
}

export function ProductFilters({ value, onChange, onClear, showCategory = true }: ProductFiltersProps) {
  const toggle = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  return (
    <div className="flex flex-col gap-7">
      {showCategory && (
        <div>
          <p className="eyebrow mb-3">Category</p>
          <div className="flex flex-col gap-1.5">
            {(["women", "men", "kids"] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => onChange({ category: value.category === c ? undefined : c })}
                className={`text-left text-sm capitalize transition-colors ${
                  value.category === c ? "font-medium text-accent" : "text-ink-soft hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">Price range</p>
        <div className="flex flex-col gap-1.5">
          {PRICE_TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ tier: value.tier === t.id ? undefined : t.id })}
              className={`text-left text-sm transition-colors ${
                value.tier === t.id ? "font-medium text-accent" : "text-ink-soft hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Max price · up to ₹{value.max.toLocaleString("en-IN")}</p>
        <Slider
          value={[value.max]}
          onValueChange={(v) => onChange({ max: v[0] })}
          min={400}
          max={6000}
          step={100}
        />
      </div>

      <div>
        <p className="eyebrow mb-3">Fabric</p>
        <div className="space-y-2">
          {ALL_FABRICS.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-ink-soft">
              <Checkbox
                checked={value.fabrics.includes(f)}
                onCheckedChange={() => onChange({ fabrics: toggle(value.fabrics, f) })}
                id={`fab-${f}`}
              />
              <Label htmlFor={`fab-${f}`} className="cursor-pointer font-normal">{f}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Style</p>
        <div className="space-y-2">
          {ALL_STYLES.map((s) => (
            <div key={s} className="flex items-center gap-2 text-sm text-ink-soft">
              <Checkbox
                checked={value.styles.includes(s)}
                onCheckedChange={() => onChange({ styles: toggle(value.styles, s) })}
                id={`sty-${s}`}
              />
              <Label htmlFor={`sty-${s}`} className="cursor-pointer font-normal">{s}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Sizes</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ sizes: toggle(value.sizes, s) })}
              className={`min-w-10 rounded-md border px-3 py-1.5 text-xs transition-colors ${
                value.sizes.includes(s)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-ink-soft hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Color</p>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => {
            const active = value.colors.includes(c.hex);
            return (
              <button
                key={c.hex}
                aria-label={c.hex}
                onClick={() => onChange({ colors: toggle(value.colors, c.hex) })}
                className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  active ? "border-accent ring-2 ring-accent/30 ring-offset-2 ring-offset-background" : "border-border"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      <Button variant="outline" onClick={onClear} className="w-full">
        <X className="h-4 w-4" /> Clear filters
      </Button>
    </div>
  );
}
