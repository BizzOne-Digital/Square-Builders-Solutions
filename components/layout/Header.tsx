"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "bg-primary-black/95 backdrop-blur-md shadow-premium py-3"
          : "bg-gradient-to-b from-black/50 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo priority />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white",
                  active && "text-white"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-gradient"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:3212924742"
            className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-gold transition-colors"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
            (321) 292-4742
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-black shadow-gold transition-transform hover:scale-[1.03]"
          >
            Get a Free Estimate
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden text-white p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-primary-black/98 backdrop-blur-md"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5",
                    pathname === link.href && "text-gold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:3212924742"
                className="flex items-center gap-2 px-3 py-3 text-base font-medium text-white/90"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                (321) 292-4742
              </a>
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-gold-gradient px-5 py-3 text-center text-base font-semibold text-primary-black shadow-gold"
              >
                Get a Free Estimate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
