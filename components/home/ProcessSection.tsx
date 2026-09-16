import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { PROCESS_STEPS } from "@/lib/content";

export default function ProcessSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>OUR PROCESS</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-soft-black">
            A Clear Path From First Call to Final Walkthrough
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-heading text-4xl font-bold text-soft-gray">
                {step.number}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-soft-black">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-soft-black/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
