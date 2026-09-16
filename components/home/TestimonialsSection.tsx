import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import StarRating from "@/components/ui/StarRating";
import { GoldButton } from "@/components/ui/GoldButton";
import { Quote } from "lucide-react";
import type { ITestimonial } from "@/models/Testimonial";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  return (
    <section className="bg-primary-black py-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Eyebrow>TESTIMONIALS</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-white">
            What Our Clients Say
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-xl2 border border-white/10 p-10 text-center">
            <p className="text-white/60">
              We're gathering client stories from recent projects — check back soon.
            </p>
            <div className="mt-6">
              <GoldButton href="/contact">Start Your Project</GoldButton>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t._id} className="rounded-xl2 border border-white/10 p-6">
                <Quote className="h-6 w-6 text-gold" />
                <p className="mt-4 text-sm leading-relaxed text-white/75">"{t.review}"</p>
                <StarRating rating={t.rating} className="mt-4" />
                <p className="mt-4 text-sm font-semibold text-white">{t.customerName}</p>
                <p className="text-xs text-white/50">
                  {t.location} · {t.projectType}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
