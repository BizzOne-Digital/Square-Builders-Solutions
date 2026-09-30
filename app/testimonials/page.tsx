import type { Metadata } from "next";
import { Quote, MessageSquareText } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import StarRating from "@/components/ui/StarRating";
import { GoldButton } from "@/components/ui/GoldButton";
import connectDB from "@/lib/mongodb";
import Testimonial, { ITestimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what clients say about working with Square Builders Solutions on roofing, HVAC, and remodeling projects in Central Florida.",
};

async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    await connectDB();
    const docs = await Testimonial.find({ published: true })
      .sort({ featured: -1, createdAt: -1 })
      .lean<ITestimonial[]>();
    return JSON.parse(JSON.stringify(docs || []));
  } catch {
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <section className="bg-primary-black pt-40 pb-20">
        <Container>
          <Eyebrow>CLIENT TESTIMONIALS</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl sm:text-5xl font-bold text-white">
            What Our Clients Say
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Real feedback from homeowners and business owners we've had the privilege to work
            with.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-24">
        <Container>
          {testimonials.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-xl2 bg-white p-12 text-center shadow-premium">
              <MessageSquareText className="mx-auto h-10 w-10 text-gold" />
              <h2 className="mt-4 font-heading text-xl font-semibold text-soft-black">
                Client Stories Coming Soon
              </h2>
              <p className="mt-3 text-sm text-soft-black/65">
                We're gathering testimonials from recent projects. Check back soon, or reach
                out to start your own project with us.
              </p>
              <div className="mt-6">
                <GoldButton href="/contact">Get a Free Estimate</GoldButton>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t._id} className="rounded-xl2 bg-white p-7 shadow-premium">
                  <Quote className="h-6 w-6 text-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-soft-black/75">"{t.review}"</p>
                  <StarRating rating={t.rating} className="mt-4" />
                  <p className="mt-4 text-sm font-semibold text-soft-black">{t.customerName}</p>
                  <p className="text-xs text-soft-black/50">
                    {t.location} · {t.projectType}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
