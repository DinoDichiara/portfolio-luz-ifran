"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import type { Language } from "@/lib/translations";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#services", label: t.nav.services },
    { href: "#collaborations", label: t.nav.brands },
    { href: "#contact", label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl tracking-wide text-foreground hover:text-primary transition-colors"
          >
            Maria Luz Ifran
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span>{language === "en" ? "ES" : "EN"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-20 bg-background/98 backdrop-blur-lg transition-all duration-500",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xl tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mt-4"
          >
            <Globe size={20} />
            <span>{language === "en" ? "Espanol" : "English"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
