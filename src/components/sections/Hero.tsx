"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Atom,
  Briefcase,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { siteConfig, typewriterWords } from "@/lib/data";
import { fadeUpChild, staggerParent } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/shared/Typewriter";
import SplitText from "@/components/shared/SplitText";
import Magnetic from "@/components/shared/Magnetic";
import Parallax from "@/components/shared/Parallax";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  /* GSAP mouse parallax — visual + orbs drift with the cursor at different depths. */
  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const glowA = glowARef.current;
    const glowB = glowBRef.current;
    if (!section || !visual || !glowA || !glowB) return;

    const vx = gsap.quickTo(visual, "x", { duration: 0.7, ease: "power3" });
    const vy = gsap.quickTo(visual, "y", { duration: 0.7, ease: "power3" });
    const ax = gsap.quickTo(glowA, "x", { duration: 1, ease: "power3" });
    const ay = gsap.quickTo(glowA, "y", { duration: 1, ease: "power3" });
    const bx = gsap.quickTo(glowB, "x", { duration: 1.2, ease: "power3" });
    const by = gsap.quickTo(glowB, "y", { duration: 1.2, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      vx(nx * 26);
      vy(ny * 26);
      ax(nx * -46);
      ay(ny * -46);
      bx(nx * 60);
      by(ny * 60);
    };
    const onLeave = () => {
      vx(0);
      vy(0);
      ax(0);
      ay(0);
      bx(0);
      by(0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden pb-16 pt-32 md:pt-40"
    >
      {/* Backdrop: grid + parallax glowing orbs */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <Parallax distance={30} className="pointer-events-none absolute -left-24 top-24">
        <div ref={glowARef}>
          <div className="h-72 w-72 animate-blob rounded-full bg-primary/20 blur-3xl" />
        </div>
      </Parallax>
      <Parallax distance={-36} className="pointer-events-none absolute -right-24 top-64">
        <div ref={glowBRef}>
          <div className="h-72 w-72 animate-blob rounded-full bg-secondary/20 blur-3xl [animation-delay:2s]" />
        </div>
      </Parallax>

      <div className="container relative grid items-center gap-14 lg:grid-cols-2">
        {/* ------------ Left: copy ------------ */}
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={fadeUpChild}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {siteConfig.availability}
            </span>
          </motion.div>

          <motion.p
            variants={fadeUpChild}
            className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-foreground"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-block h-[2px] w-10 origin-left rounded-full bg-gradient-to-r from-primary to-secondary"
            />
            Hello, I&apos;m
          </motion.p>

          <SplitText
            as="h1"
            text={`${siteConfig.firstName} ${siteConfig.lastName}`}
            delay={0.25}
            stagger={0.04}
            className="mt-2 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl xl:text-7xl"
          />

          <motion.div
            variants={fadeUpChild}
            className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl"
          >
            <Typewriter words={typewriterWords} />
          </motion.div>

          <motion.p
            variants={fadeUpChild}
            className="mt-5 max-w-xl leading-relaxed text-muted-foreground"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={fadeUpChild}
            className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-secondary" />
            {siteConfig.location}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUpChild} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild size="lg" variant="gradient">
                <a href={siteConfig.resume} download="My-Resume.pdf">
                  <Download />
                  Download CV
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline">
                <Link href="#projects">
                  View My Work
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <div className="flex gap-2">
              <motion.span whileHover={{ scale: 1.12, rotate: -6 }} whileTap={{ scale: 0.92 }}>
                <Button asChild size="icon" variant="ghost" className="h-12 w-12 rounded-xl border">
                  <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </motion.span>
              <motion.span whileHover={{ scale: 1.12, rotate: 6 }} whileTap={{ scale: 0.92 }}>
                <Button asChild size="icon" variant="ghost" className="h-12 w-12 rounded-xl border">
                  <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* ------------ Right: animated profile ------------ */}
        <div ref={visualRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 80, damping: 16 }}
            className="relative mx-auto h-[320px] w-[320px] md:h-[420px] md:w-[420px]"
          >
            {/* Counter-rotating dashed orbit */}
            <div className="absolute -inset-6 animate-spin-slow rounded-full border-2 border-dashed border-foreground/10 [animation-direction:reverse]" />

            {/* Spinning conic ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full p-[3px]"
              style={{
                background:
                  "conic-gradient(from 0deg, #2563EB, #F97316, #7C3AED, #2563EB)",
              }}
            >
              <div className="h-full w-full rounded-full bg-background" />
            </motion.div>

            {/* Floating photo / avatar */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
              className="absolute inset-4 overflow-hidden rounded-full border-4 border-background bg-gradient-to-br from-primary via-blue-500 to-secondary shadow-2xl shadow-primary/30"
            >
              {siteConfig.profileImage ? (
                <Image
                  src={siteConfig.profileImage}
                  alt={`${siteConfig.name} — ${siteConfig.role}`}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                /* Default animated initials avatar — set profileImage in data.ts to use a photo */
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white">
                  <span className="font-display text-7xl font-extrabold tracking-tight drop-shadow-lg md:text-8xl">
                    {siteConfig.initials}
                  </span>
                  <span className="rounded-full bg-black/25 px-4 py-1 text-xs font-medium tracking-widest backdrop-blur">
                    {siteConfig.role.toUpperCase()}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Floating tech chips */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute -right-2 top-8 md:-right-6"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-foreground shadow-lg"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Atom className="h-4 w-4" />
                </span>
                React
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute -left-2 top-1/2 md:-left-8"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-foreground shadow-lg"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Briefcase className="h-4 w-4" />
                </span>
                3+ Years
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute -bottom-2 right-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                className="glass rounded-2xl px-4 py-2 text-xs font-semibold text-foreground shadow-lg"
              >
                ⚡ Next.js Expert
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-16 flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Scroll to explore
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
