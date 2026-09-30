"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = ["Roofing", "HVAC", "Kitchen Remodeling", "Bathroom Remodeling"];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-primary-black text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premium roofing, HVAC, and remodeling services built on craftsmanship and
              trust — serving residential and commercial clients across Central Florida.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61570733018315"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Square Builders Solutions on Facebook"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-white/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href="tel:3212924742" className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-gold shrink-0" /> 321-292-4742
                </a>
              </li>
              <li>
                <a
                  href="mailto:karl@squarebuildersusa.com"
                  className="flex items-center gap-2 hover:text-white break-all"
                >
                  <Mail className="h-4 w-4 text-gold shrink-0" /> karl@squarebuildersusa.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0" /> Central Florida
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-medium text-white/70">
            Proudly Serving Central Florida and Surrounding Areas
          </p>
          <p className="mt-2 text-xs text-white/40">
            © {new Date().getFullYear()} Square Builders Solutions LLC. All rights reserved. —
            Building Excellence. Maintaining Trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
