import Link from "next/link";
import { cn } from "@/lib/utils";

export function GoldButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary-black shadow-gold transition-transform hover:scale-[1.03]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold",
        className
      )}
    >
      {children}
    </Link>
  );
}
