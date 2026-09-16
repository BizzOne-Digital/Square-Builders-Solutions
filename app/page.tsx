import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import SiteSettings, { ISiteSettings } from "@/models/SiteSettings";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutPreview from "@/components/home/AboutPreview";
import ResidentialCommercial from "@/components/home/ResidentialCommercial";
import ProcessSection from "@/components/home/ProcessSection";
import AdditionalCapabilities from "@/components/home/AdditionalCapabilities";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Square Builders Solutions | Roofing, HVAC & Remodeling in Davenport FL",
  description:
    "Square Builders Solutions delivers premium roofing, HVAC, kitchen and bathroom remodeling for residential and commercial clients in Davenport, Florida.",
};

async function getData() {
  try {
    await connectDB();
    const [settingsDoc, testimonialDocs] = await Promise.all([
      SiteSettings.findOne().lean<ISiteSettings>(),
      Testimonial.find({ published: true }).sort({ featured: -1, createdAt: -1 }).limit(6).lean<ITestimonial[]>(),
    ]);
    return {
      settings: settingsDoc,
      testimonials: JSON.parse(JSON.stringify(testimonialDocs || [])) as ITestimonial[],
    };
  } catch {
    return { settings: null, testimonials: [] as ITestimonial[] };
  }
}

export default async function HomePage() {
  const { settings, testimonials } = await getData();

  const heroTitle = settings?.heroTitle || "Building Excellence, Maintaining Trust";
  const heroSubtitle =
    settings?.heroSubtitle ||
    "Full-service roofing, HVAC, and remodeling for homes and businesses across Davenport, Florida.";
  const heroImage = settings?.heroImageUrl || "/hero.png";
  const aboutText =
    settings?.aboutPreviewText ||
    "For more than 15 years, Square Builders Solutions has helped homeowners and business owners across Davenport, Florida protect and improve the properties they rely on every day.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Square Builders Solutions",
    telephone: "+1-321-292-4742",
    email: "karl@squarebuildersusa.com",
    areaServed: "Davenport, FL",
    url: "https://www.squarebuildersusa.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero title={heroTitle} subtitle={heroSubtitle} imageUrl={heroImage} />
      <ServicesSection />
      <WhyChooseUs />
      <AboutPreview text={aboutText} />
      <ResidentialCommercial />
      <ProcessSection />
      <AdditionalCapabilities />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCTA />
    </>
  );
}
