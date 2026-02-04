"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Instagram, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/luz.ifran/",
    handle: "@luz.ifran",
  },
  {
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    href: "https://tiktok.com",
    handle: "@luzifran",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:ifranmarialuz@gmail.com",
    handle: "ifranmarialuz@gmail.com",
  },
];

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
              {t.contact.subtitle}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
              {t.contact.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              {t.contact.description}
            </p>

            {/* Social Links */}
            <div className="space-y-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    <social.icon />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                      {social.name}
                    </p>
                    <p className="text-foreground group-hover:text-primary transition-colors">
                      {social.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-card border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-card border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  {t.contact.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-card border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder={t.contact.form.subjectPlaceholder}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-card border border-border text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 tracking-widest uppercase text-sm"
              >
                {isSubmitting ? (
                  t.contact.form.sending
                ) : (
                  <>
                    {t.contact.form.send}
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
