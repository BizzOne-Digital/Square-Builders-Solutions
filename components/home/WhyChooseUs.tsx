import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { WHY_CHOOSE_US } from "@/lib/content";

export default function WhyChooseUs() {
  return (
    <section className="bg-primary-black py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>WHY SQUARE BUILDERS SOLUTIONS</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-white">
            Craftsmanship You Can Trust
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title} className="rounded-xl2 border border-white/10 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                <ServiceIcon name={item.icon} className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
