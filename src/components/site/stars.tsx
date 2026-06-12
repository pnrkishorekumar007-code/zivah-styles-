import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function Stars({ rating, size = 14, showValue = false }: StarsProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(rating);
          const half = !filled && i - rating < 1;
          return (
            <Star
              key={i}
              width={size}
              height={size}
              strokeWidth={1.5}
              className={
                filled
                  ? "fill-accent stroke-accent"
                  : half
                  ? "fill-accent/50 stroke-accent"
                  : "fill-transparent stroke-ink-muted/50"
              }
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-ink-soft">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
