import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ink-muted">
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {c.to && !isLast ? (
              <Link to={c.to} className="hover:text-accent transition-colors">{c.label}</Link>
            ) : (
              <span className={isLast ? "text-ink" : ""}>{c.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3" strokeWidth={1.6} />}
          </span>
        );
      })}
    </nav>
  );
}
