import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { GoldButton } from "@/components/ui/GoldButton";
import { ADDITIONAL_CAPABILITIES } from "@/lib/content";
import { getActiveServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore roofing, HVAC, kitchen remodeling, and bathroom remodeling services from Square Builders Solutions in Central Florida.",
};

export default async function ServicesPage() {
  const services = await getActiveServices();
  return (
    <>
      <section className="bg-primary-black pt-40 pb-20">
        <Container>
          <Eyebrow>OUR SERVICES</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl sm:text-5xl font-bold text-white">
            Roofing, HVAC & Remodeling Done Right
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Every project starts with a conversation. Explore our core services below, then
            reach out for a free estimate tailored to your property.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="space-y-20">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative h-80 overflow-hidden rounded-xl2 shadow-premium">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient">
                    <ServiceIcon name={service.icon} className="h-6 w-6 text-primary-black" />
                  </div>
                  <h2 className="mt-5 font-heading text-3xl font-bold text-soft-black">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-soft-black/70">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-soft-black/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <GoldButton href="/contact">Request a Quote</GoldButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>ADDITIONAL CAPABILITIES</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-soft-black">
              Full-Service Finishing Work
            </h2>
            <p className="mt-4 text-base text-soft-black/70">
              We also handle the specialty trades that complete a project from top to bottom.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {ADDITIONAL_CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col items-start gap-4 rounded-xl2 bg-white p-6 shadow-premium"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient">
                  <ServiceIcon name={cap.icon} className="h-5 w-5 text-primary-black" />
                </div>
                <h3 className="font-heading text-base font-semibold text-soft-black">
                  {cap.title}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-xl font-heading text-3xl sm:text-4xl font-bold text-white">
            Not Sure Where to Start? Let's Talk.
          </h2>
          <p className="mt-4 max-w-lg text-white/65">
            Schedule a free consultation and we'll help you scope out the right solution for
            your property.
          </p>
          <div className="mt-8">
            <GoldButton href="/contact">Schedule a Consultation</GoldButton>
          </div>
        </Container>
      </section>
    </>
  );
}
