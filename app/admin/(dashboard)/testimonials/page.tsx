import connectDB from "@/lib/mongodb";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

async function getTestimonials(): Promise<ITestimonial[]> {
  await connectDB();
  const docs = await Testimonial.find().sort({ createdAt: -1 }).lean<ITestimonial[]>();
  return JSON.parse(JSON.stringify(docs));
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsManager testimonials={testimonials} />;
}
