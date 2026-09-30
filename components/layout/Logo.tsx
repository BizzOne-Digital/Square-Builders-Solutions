import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  priority = false,
}: {
  dark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label="Square Builders Solutions — Home"
    >
      <Image
        src="/logo1.png"
        alt="Square Builders Solutions"
        width={1536}
        height={1024}
        priority={priority}
        className="h-16 w-auto sm:h-20 object-contain"
      />
    </Link>
  );
}
