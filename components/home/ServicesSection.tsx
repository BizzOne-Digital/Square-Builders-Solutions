import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { MAIN_SERVICES } from "@/lib/content";

export default function ServicesSection() {
  return (
    <section className="bg-cream py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-soft-black">
            Comprehensive Services, Built to Last
          </h2>
          <p className="mt-4 text-base text-soft-black/70">
            From roof to foundation, kitchen to bath, we handle the projects that protect and
            elevate your property.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MAIN_SERVICES.map((service) => (
            <Link
              key={service.slug}
              href="/services"
              className="group relative overflow-hidden rounded-xl2 bg-white shadow-premium transition-transform hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient">
                  <ServiceIcon name={service.icon} className="h-5 w-5 text-primary-black" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-soft-black">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-soft-black/65 leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
