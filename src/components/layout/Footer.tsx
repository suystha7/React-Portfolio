"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { fadeUpChild, staggerParent } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const socials = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
  { label: "Twitter / X", href: siteConfig.twitter, icon: Twitter },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]"
      >
        {/* Brand */}
        <motion.div variants={fadeUpChild} className="flex flex-col gap-4">
          <Link href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white">
              {siteConfig.initials}
            </span>
            <span className="font-display text-lg font-bold text-foreground">
              {siteConfig.firstName}
              {siteConfig.lastName}
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.role} crafting fast, accessible and delightful web
            experiences with React & Next.js.
          </p>
          <div className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.span key={label} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" asChild>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={fadeUpChild}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Quick Links
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground md:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact mini */}
        <motion.div variants={fadeUpChild}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            Get in touch
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.location}</li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="border-t border-border/60">
        <div className="container flex items-center justify-between gap-4 py-5 text-xs text-muted-foreground">
          <p>
            © {year} {siteConfig.name}. Built with Next.js, Tailwind CSS, Framer
            Motion & GSAP.
          </p>
          <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
