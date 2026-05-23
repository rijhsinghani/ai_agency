"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#services", label: "Services" },
  { href: "#proof", label: "Proof" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0E0E0E]/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center">
            <img
              src="/logo-full-dark.svg"
              alt="Sameer Automations"
              className="h-10 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm text-zinc-300 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#7B2FBE] after:to-[#4DD9E8] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#audit">
              <Button className="font-display bg-[#7B2FBE] hover:bg-[#9B4FDE] shadow-[0_0_24px_rgba(123,47,190,0.25)] hover:shadow-[0_0_32px_rgba(123,47,190,0.45)] transition-shadow">
                Book a free audit
              </Button>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-white p-2"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0E0E0E] md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <img
              src="/logo-full-dark.svg"
              alt="Sameer Automations"
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-white p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 px-6 pt-16">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-zinc-200 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileOpen(false)}
              className="mt-6"
            >
              <Button className="bg-[#7B2FBE] hover:bg-[#9B4FDE]" size="lg">
                Book a free audit
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
