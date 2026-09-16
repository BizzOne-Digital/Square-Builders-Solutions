import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { ADDITIONAL_CAPABILITIES } from "@/lib/content";

export default function AdditionalCapabilities() {
  return (
    <section className="bg-cream py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>MORE FROM OUR TEAM</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-soft-black">
            Additional Capabilities
          </h2>
          <p className="mt-4 text-base text-soft-black/70">
            Beyond our core services, our team handles a wide range of finishing and specialty
            work to complete your project from start to finish.
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
  );
}
