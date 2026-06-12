import { Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const badges = [
  { Icon: Truck, title: "Free shipping", text: "On orders over ₹1,499" },
  { Icon: RotateCcw, title: "30-day returns", text: "Hassle-free, on us" },
  { Icon: ShieldCheck, title: "Secure payments", text: "256-bit SSL encrypted" },
  { Icon: Leaf, title: "Responsibly made", text: "Conscious materials" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-surface-warm/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 md:py-12">
        {badges.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-accent">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink">{title}</div>
              <div className="text-xs text-ink-muted">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
