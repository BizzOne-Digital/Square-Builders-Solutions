import Container from "@/components/ui/Container";
import { GoldButton, OutlineButton } from "@/components/ui/GoldButton";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24">
      <div className="absolute inset-0 bg-gold-gradient opacity-[0.06]" />
      <Container>
        <div className="relative flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Let's Build Something Great Together
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/65">
            Whether it's a new roof, a full HVAC system, or a complete kitchen transformation,
            our team is ready to bring your vision to life.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <GoldButton href="/contact">Get a Free Estimate</GoldButton>
            <OutlineButton href="/services">View Our Services</OutlineButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
