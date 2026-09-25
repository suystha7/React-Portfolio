"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { aboutChecklist, aboutHighlights, siteConfig, stats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";
import TiltCard from "@/components/shared/TiltCard";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title="My foundation in frontend"
          description="I turn ideas into fast, accessible and beautiful interfaces — from first pixel to production deploy."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Story card */}
          <Reveal variant="left">
            <Card className="h-full overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-blue-400 to-secondary" />
              <CardContent className="flex h-full flex-col gap-5 p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Frontend-first, with Next.js & React
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  I&apos;m {siteConfig.name}, a {siteConfig.role.toLowerCase()}{" "}
                  based in {siteConfig.location}. My core stack is{" "}
                  <strong className="text-foreground">
                    React, Next.js, TypeScript and Tailwind CSS
                  </strong>{" "}
                  — I love building component-driven UIs, smooth Framer Motion
                  animations, and pages that score green on every Lighthouse
                  metric.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  From SEO-friendly marketing sites to data-heavy dashboards, I
                  care about the details: semantic HTML, keyboard navigation,
                  loading states, and motion that feels intentional — never
                  distracting.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {aboutChecklist.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <motion.span
                    whileHover={{ scale: 1.04, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block"
                  >
                    <Button asChild variant="outline">
                      <Link href="#journey">
                        See my journey
                        <ArrowRight />
                      </Link>
                    </Button>
                  </motion.span>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Highlight tiles with 3D tilt */}
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1} variant="right" className="h-full">
                <TiltCard className="h-full" max={9}>
                  <Card className="group h-full transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="flex h-full flex-col gap-3 p-6">
                      <motion.span
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25"
                      >
                        <h.icon className="h-6 w-6" />
                      </motion.span>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {h.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {h.description}
                      </p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Animated stat counters */}
        <Reveal delay={0.1} variant="scale" className="mt-6">
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
            <CardContent className="relative grid grid-cols-2 gap-6 p-6 md:grid-cols-4 md:p-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="font-display text-4xl font-extrabold text-foreground md:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
