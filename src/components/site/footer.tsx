import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-warm">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:py-20">
        <div className="lg:col-span-2">
          <div className="font-display text-2xl tracking-[0.2em] text-ink">ZIVAH STYLES</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Premium fashion for the modern wardrobe. Considered design, conscious materials,
            crafted to last.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink-soft transition-colors hover:border-accent hover:text-accent"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { label: "Women", to: "/shop", search: { category: "women" as const } },
            { label: "Men", to: "/shop", search: { category: "men" as const } },
            { label: "Kids", to: "/shop", search: { category: "kids" as const } },
            { label: "Sale", to: "/shop", search: { tag: "sale" as const } },
          ]}
        />
        <FooterCol
          title="Help"
          links={[
            { label: "Shipping & Returns", to: "/" },
            { label: "Size Guide", to: "/" },
            { label: "Contact us", to: "/" },
            { label: "FAQ", to: "/" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Our story", to: "/" },
            { label: "Sustainability", to: "/" },
            { label: "Stores", to: "/" },
            { label: "Careers", to: "/" },
          ]}
        />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Zivah Styles. All rights reserved.</p>
          <p className="eyebrow">Crafted with care · Made for you</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColProps {
  title: string;
  links: { label: string; to: string; search?: Record<string, string> }[];
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              search={l.search as never}
              className="text-sm text-ink-soft transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
