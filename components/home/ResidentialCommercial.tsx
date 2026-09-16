import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import { GoldButton } from "@/components/ui/GoldButton";

const PANELS = [
  {
    title: "Residential",
    description:
      "From roof replacements to full kitchen and bathroom remodels, we help homeowners protect and elevate the place they live.",
    points: ["Roofing & repairs", "HVAC installation & service", "Kitchen & bathroom remodels"],
    image: "/resid.png",
  },
  {
    title: "Commercial",
    description:
      "We partner with business owners and property managers for roofing, HVAC, and renovation projects that keep operations running.",
    points: ["Commercial roofing", "Commercial HVAC systems", "Tenant & space renovations"],
    image: "/commer.png",
  },
];

export default function ResidentialCommercial() {
  return (
    <section className="bg-soft-gray/40 py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PANELS.map((panel) => (
            <div key={panel.title} className="overflow-hidden rounded-xl2 bg-white shadow-premium">
              <div className="relative h-56 w-full">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-soft-black">{panel.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-black/70">
                  {panel.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {panel.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-soft-black/80">
                      <Check className="h-4 w-4 text-gold shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <GoldButton href="/contact">Request a Quote</GoldButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
