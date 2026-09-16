import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-gold text-gold" : "fill-transparent text-soft-gray"
          )}
        />
      ))}
    </div>
  );
}
