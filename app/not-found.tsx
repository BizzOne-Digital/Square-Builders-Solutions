import Link from "next/link";
import { HardHat } from "lucide-react";
import Container from "@/components/ui/Container";
import { GoldButton } from "@/components/ui/GoldButton";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-primary-black pt-20">
      <Container className="flex flex-col items-center text-center">
        <HardHat className="h-12 w-12 text-gold" />
        <h1 className="mt-6 font-heading text-4xl font-bold text-white">Page Not Found</h1>
        <p className="mt-4 max-w-md text-white/60">
          The page you're looking for doesn't exist or may have moved. Let's get you back on
          track.
        </p>
        <div className="mt-8 flex gap-4">
          <GoldButton href="/">Back to Home</GoldButton>
        </div>
        <Link href="/contact" className="mt-6 text-sm text-white/50 hover:text-gold">
          Or contact us for help
        </Link>
      </Container>
    </section>
  );
}
