import { cn } from "@/lib/utils";

export default function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold",
        className
      )}
    >
      {children}
    </span>
  );
}
