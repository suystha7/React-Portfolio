"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import Parallax from "@/components/shared/Parallax";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    copyable: true,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    copyable: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: undefined,
    copyable: false,
  },
];

const socials = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
  { label: "Twitter / X", href: siteConfig.twitter, icon: Twitter },
];

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

export default function Contact() {
  const { copied, copy } = useCopy();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(form.subject || `Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi ${siteConfig.name},\n\n${form.message}\n\n— ${form.name} (${form.email})`
    );
    setTimeout(() => {
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
    }, 700);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-24">
      <Parallax distance={24} className="pointer-events-none absolute -left-24 bottom-0">
        <div className="h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </Parallax>
      <Parallax distance={-28} className="pointer-events-none absolute -right-24 top-10">
        <div className="h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </Parallax>

      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: contact details */}
          <Reveal variant="left" className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 6 }}
                >
                  <Card className="transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="flex items-center gap-4 p-5">
                      <motion.span
                        whileHover={{ scale: 1.12, rotate: -6 }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/25"
                      >
                        <card.icon className="h-5 w-5" />
                      </motion.span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {card.label}
                        </p>
                        {card.href ? (
                          <a
                            href={card.href}
                            className="truncate font-semibold text-foreground transition-colors hover:underline"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <p className="truncate font-semibold text-foreground">{card.value}</p>
                        )}
                      </div>
                      {card.copyable && (
                        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Copy ${card.label}`}
                            onClick={() => copy(card.value)}
                          >
                            {copied === card.value ? (
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </motion.span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="border-emerald-500/20 bg-emerald-500/5">
                  <CardContent className="flex items-center gap-3 p-5">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                    <p className="text-sm font-medium text-foreground">{siteConfig.availability}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="flex gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <motion.span
                    key={label}
                    whileHover={{ y: -3, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-1"
                  >
                    <Button variant="outline" asChild className="w-full">
                      <a href={href} target="_blank" rel="noreferrer">
                        <Icon />
                        {label}
                      </a>
                    </Button>
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: message form */}
          <Reveal variant="right" delay={0.1} className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
                      >
                        <CheckCircle2 className="h-10 w-10" />
                      </motion.span>
                      <h3 className="font-display text-2xl font-bold text-foreground">Message ready to send!</h3>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        Your email app should have opened with everything filled
                        in. Prefer to write directly? Reach me at{" "}
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="font-semibold text-foreground underline decoration-secondary decoration-2 underline-offset-4"
                        >
                          {siteConfig.email}
                        </a>
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSent(false);
                          setForm({ name: "", email: "", subject: "", message: "" });
                        }}
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex flex-col gap-1.5"
                        >
                          <label htmlFor="name" className="text-sm font-medium text-foreground">
                            Your name *
                          </label>
                          <input
                            id="name"
                            required
                            placeholder="John Doe"
                            className="form-input"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.08 }}
                          className="flex flex-col gap-1.5"
                        >
                          <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Your email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="form-input"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.12 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label htmlFor="subject" className="text-sm font-medium text-foreground">
                          Subject
                        </label>
                        <input
                          id="subject"
                          placeholder="Project inquiry, job opportunity…"
                          className="form-input"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.16 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          placeholder="Tell me about your project, timeline and budget…"
                          className="form-textarea"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </motion.div>
                      <Magnetic strength={0.15} className="w-full">
                        <Button type="submit" size="lg" variant="gradient" disabled={sending} className="w-full">
                          {sending ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Preparing…
                            </>
                          ) : (
                            <>
                              <Send />
                              Send Message
                            </>
                          )}
                        </Button>
                      </Magnetic>
                      <p className="text-center text-xs text-muted-foreground">
                        This opens your email app with the message pre-filled — no
                        account or backend needed.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
