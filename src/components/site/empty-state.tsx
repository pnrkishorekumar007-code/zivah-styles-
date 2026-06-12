import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-surface-warm/40 p-12 text-center">
      {icon && <div className="mx-auto mb-4 text-ink-muted">{icon}</div>}
      <p className="font-display text-2xl text-ink">{title}</p>
      {description && <p className="mt-2 text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
