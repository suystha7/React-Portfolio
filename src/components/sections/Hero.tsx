"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
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
import TechOrbitShowcase from "./TechOrbitShowcase";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    const particleCount = Math.floor((width * height) / 18000);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.5 + 1.2,
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      const dotColor = isDark
        ? "rgba(245, 158, 11, 0.4)"
        : "rgba(217, 119, 6, 0.35)";
      const lineColor = isDark
        ? "rgba(245, 158, 11, 0.12)"
        : "rgba(217, 119, 6, 0.1)";
      const mouseLineColor = isDark
        ? "rgba(245, 158, 11, 0.25)"
        : "rgba(217, 119, 6, 0.2)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseLineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax movement for section background glows
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
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full z-0 opacity-80"
      />

      <Parallax
        distance={30}
        className="pointer-events-none absolute -left-24 top-24 z-0"
      >
        <div ref={glowARef}>
          <div className="h-72 w-72 animate-blob rounded-full bg-amber-500/10 blur-3xl" />
        </div>
      </Parallax>
      <Parallax
        distance={-36}
        className="pointer-events-none absolute -right-24 top-64 z-0"
      >
        <div ref={glowBRef}>
          <div className="h-72 w-72 animate-blob rounded-full bg-amber-500/10 blur-3xl [animation-delay:2s]" />
        </div>
      </Parallax>

      <div className="container relative grid items-center gap-14 lg:grid-cols-2 z-10">
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={fadeUpChild}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
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
              className="inline-block h-[2px] w-10 origin-left rounded-full bg-amber-500"
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
            <MapPin className="h-4 w-4 text-amber-500" />
            {siteConfig.location}
          </motion.div>

          <motion.div
            variants={fadeUpChild}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="default"
                className="rounded-xl font-medium bg-amber-500 text-white hover:bg-amber-600"
              >
                <a href={siteConfig.resume} download="My-Resume.pdf">
                  <Download />
                  Download CV
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl font-medium border-amber-500/40 hover:bg-amber-500/10"
              >
                <Link href="#projects">
                  View My Work
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <div className="flex gap-2">
              <motion.span
                whileHover={{ scale: 1.12, rotate: -6 }}
                whileTap={{ scale: 0.92 }}
              >
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="h-12 w-12 rounded-xl border border-border"
                >
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.12, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
              >
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="h-12 w-12 rounded-xl border border-border"
                >
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        <div ref={visualRef}>
          <TechOrbitShowcase />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-16 flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground relative z-10"
      >
        Scroll to explore
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
