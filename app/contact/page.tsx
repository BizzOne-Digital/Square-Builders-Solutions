import type { Metadata } from "next";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/home/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Square Builders Solutions in Central Florida for a free estimate on roofing, HVAC, kitchen, or bathroom remodeling.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary-black pt-40 pb-20">
        <Container>
          <Eyebrow>GET IN TOUCH</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl sm:text-5xl font-bold text-white">
            Let's Talk About Your Project
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Fill out the form below or reach us directly — we typically respond within one
            business day.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-soft-black">Contact Information</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                    <Phone className="h-4 w-4 text-primary-black" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-soft-black">Phone</p>
                    <a href="tel:3212924742" className="text-sm text-soft-black/70 hover:text-gold">
                      321-292-4742
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                    <Mail className="h-4 w-4 text-primary-black" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-soft-black">Email</p>
                    <a
                      href="mailto:karl@squarebuildersusa.com"
                      className="text-sm text-soft-black/70 hover:text-gold break-all"
                    >
                      karl@squarebuildersusa.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                    <MapPin className="h-4 w-4 text-primary-black" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-soft-black">Location</p>
                    <p className="text-sm text-soft-black/70">Central Florida</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                    <Facebook className="h-4 w-4 text-primary-black" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-soft-black">Facebook</p>
                    <a
                      href="https://www.facebook.com/profile.php?id=61570733018315"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-soft-black/70 hover:text-gold"
                    >
                      Visit our page
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
