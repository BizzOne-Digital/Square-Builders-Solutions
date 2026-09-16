import Image from "next/image";
import { GoldButton, OutlineButton } from "@/components/ui/GoldButton";
import Eyebrow from "@/components/ui/Eyebrow";
import { resolveImageUrl } from "@/lib/uploads";

export default function Hero({
  title,
  subtitle,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
}) {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary-black">
      <Image
        src={resolveImageUrl(imageUrl)}
        alt="Square Builders Solutions project in Davenport, Florida"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-primary-black/20" />

      <div className="relative z-10 w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 mr-auto">
        <div className="max-w-2xl text-left lg:ml-8">
          <Eyebrow>RESIDENTIAL • COMMERCIAL • DAVENPORT, FL</Eyebrow>
          <h1 className="mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">{subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <GoldButton href="/contact">Get a Free Estimate</GoldButton>
            <OutlineButton href="/services">Explore Our Services</OutlineButton>
          </div>
        </div>
      </div>
    </section>
  );
}
