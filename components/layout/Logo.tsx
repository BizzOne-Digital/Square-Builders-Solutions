import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label="Square Builders Solutions — Home"
    >
      <Image
        src="/logo1.png"
        alt="Square Builders Solutions"
        width={220}
        height={56}
        priority
        className="h-10 w-auto sm:h-12 object-contain"
      />
    </Link>
  );
}
