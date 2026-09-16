import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { GoldButton } from "@/components/ui/GoldButton";
import { resolveImageUrl } from "@/lib/uploads";

export default function AboutPreview({ text }: { text: string }) {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative h-80 sm:h-[26rem] overflow-hidden rounded-xl2 shadow-premium">
            <Image
              src={resolveImageUrl("/homeabout.png")}
              alt="Square Builders Solutions team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>ABOUT US</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-soft-black">
              15+ Years of Building Trust in Central Florida
            </h2>
            <p className="mt-6 text-base leading-relaxed text-soft-black/70">{text}</p>
            <div className="mt-8">
              <GoldButton href="/about">Our Story</GoldButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
