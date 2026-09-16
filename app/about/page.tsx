import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Users, Award, HeartHandshake } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { GoldButton } from "@/components/ui/GoldButton";
import connectDB from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { resolveImageUrl } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Square Builders Solutions — a Davenport, Florida contractor with 15+ years of experience in roofing, HVAC, and remodeling for residential and commercial clients.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity First",
    description:
      "We tell you what your property actually needs — not what's easiest to sell. Every recommendation is honest.",
  },
  {
    icon: Users,
    title: "Client-Centered Process",
    description:
      "You're kept informed at every stage, from the first consultation to the final walkthrough.",
  },
  {
    icon: Award,
    title: "Skilled Craftsmanship",
    description:
      "Our team brings real, hands-on experience to every roofing, HVAC, and remodeling project we take on.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Relationships",
    description:
      "We aim to be the contractor you call for every project — not just a one-time job.",
  },
];

interface AboutContent {
  heading?: string;
  intro?: string;
  imageUrl?: string;
}

async function getAboutContent(): Promise<AboutContent> {
  try {
    await connectDB();
    const doc = await PageContent.findOne({ pageKey: "about" }).lean<{ content: AboutContent }>();
    return doc?.content || {};
  } catch {
    return {};
  }
}

export default async function AboutPage() {
  const content = await getAboutContent();
  const heroImage = resolveImageUrl(
    content.imageUrl ||
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2000&auto=format&fit=crop"
  );

  return (
    <>
      <section className="relative bg-primary-black pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroImage}
            alt="Construction project managed by Square Builders Solutions"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/80 to-primary-black/50" />
        <Container className="relative">
          <Eyebrow>ABOUT SQUARE BUILDERS SOLUTIONS</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl sm:text-5xl font-bold text-white">
            {content.heading || "Built on Craftsmanship. Guided by Trust."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            {content.intro ||
              "Square Builders Solutions is a Davenport, Florida-based contractor serving homeowners and business owners with roofing, HVAC, and remodeling expertise."}
          </p>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>OUR STORY</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold text-soft-black">
                15+ Years Serving Central Florida
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-soft-black/70">
                <p>
                  Square Builders Solutions was founded on a simple idea: property owners
                  deserve a contractor who treats their home or business like it matters —
                  because it does. Led by owner Karl Payer, our team has spent more than 15
                  years building the skills and reputation that Davenport-area clients rely
                  on today.
                </p>
                <p>
                  What began with roofing and repair work has grown into a full-service
                  operation covering HVAC systems, kitchen and bathroom remodeling, and a wide
                  range of finishing trades — all delivered with the same consultative,
                  no-pressure approach we started with.
                </p>
                <p>
                  We work with homeowners protecting their biggest investment and business
                  owners who can't afford downtime. In both cases, our commitment is the
                  same: clear communication, quality work, and a finished project you're
                  proud of.
                </p>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-xl2 shadow-premium">
              <Image
                src="/aboutpage.png"
                alt="Square Builders Solutions crew reviewing a project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>OUR APPROACH</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold text-soft-black">
              Residential Care. Commercial Reliability.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl2 bg-white p-8 shadow-premium">
              <h3 className="font-heading text-xl font-semibold text-soft-black">Residential</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-black/70">
                For homeowners, we know a roof, HVAC system, or remodel isn't just a project —
                it's your home. We walk you through every option, respect your property during
                the work, and stand behind what we build.
              </p>
            </div>
            <div className="rounded-xl2 bg-white p-8 shadow-premium">
              <h3 className="font-heading text-xl font-semibold text-soft-black">Commercial</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft-black/70">
                For business owners and property managers, timing and reliability matter just
                as much as craftsmanship. We plan around your operations and deliver commercial
                roofing, HVAC, and renovation work with minimal disruption.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary-black py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>WHAT WE STAND FOR</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold text-white">Our Values</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl2 border border-white/10 p-6">
                <value.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-xl font-heading text-3xl sm:text-4xl font-bold text-white">
            Ready to Work With a Contractor You Can Trust?
          </h2>
          <div className="mt-8">
            <GoldButton href="/contact">Schedule a Consultation</GoldButton>
          </div>
        </Container>
      </section>
    </>
  );
}
