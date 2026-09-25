"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { education, experience, type TimelineItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";

type Tab = "experience" | "education";

const tabs: { id: Tab; label: string; icon: typeof Briefcase }[] = [
  { id: "experience", label: "Career", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
];

function TimelineList({ items, icon: Icon }: { items: TimelineItem[]; icon: typeof Briefcase }) {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  /* GSAP: the vertical line draws itself as you scroll through the timeline. */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="relative space-y-8 md:space-y-10">
      {/* Vertical gradient line (GSAP-scrubbed) */}
      <span
        ref={lineRef}
        className="absolute bottom-8 left-[23px] top-8 w-[2px] rounded-full bg-gradient-to-b from-amber-500 via-amber-500/60 to-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
      />
      
      {items.map((entry, i) => (
        <motion.div
          key={entry.title}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: i * 0.15, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative pl-16 md:pl-20"
        >
          {/* Enhanced Node with Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2 + i * 0.15, 
              type: "spring", 
              stiffness: 200, 
              damping: 15 
            }}
            className="absolute left-0 top-6 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-1 rounded-full bg-amber-500/20 blur-md animate-pulse" />
              
              {/* Main node */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-background bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl shadow-amber-500/30">
                <Icon className="h-5 w-5 text-white" />
              </div>
              
              {/* Inner sparkle effect for current items */}
              {entry.current && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -right-1 -top-1"
                >
                  <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            whileHover={{ x: 8, scale: 1.01 }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group"
          >
            {/* Glassmorphic Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-lg transition-all duration-500 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Shine effect */}
              <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-full" />
              
              <div className="relative flex flex-col gap-4 p-6 md:p-8">
                {/* Header with badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="soft" 
                    className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 shadow-sm"
                  >
                    <Calendar className="h-3 w-3" />
                    {entry.period}
                  </Badge>
                  {entry.current && (
                    <Badge 
                      variant="secondary" 
                      className="animate-pulse bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20"
                    >
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Current
                    </Badge>
                  )}
                </div>

                {/* Title and Place */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {entry.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-4">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {entry.place}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" />
                      {entry.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {entry.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {entry.tags.map((tag, idx) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 + idx * 0.05 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="border-border/60 bg-background/50 backdrop-blur-sm hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Timeline() {
  const [tab, setTab] = useState<Tab>("experience");

  return (
    <section id="journey" className="scroll-mt-20 relative overflow-hidden py-24 md:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative">
        <SectionHeading
          eyebrow="My Journey"
          title="Career and education timeline"
          description="Where I've worked, what I've learned, and how I got here."
        />

        {/* Modern Tabs */}
        <Reveal variant="scale" className="mb-12 flex justify-center md:mb-16">
          <div className="inline-flex rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-1.5 shadow-xl shadow-black/5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setTab(id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 md:px-8 md:py-3.5",
                  tab === id 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {tab === id && (
                  <motion.span
                    layoutId="timeline-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Timeline panels */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {tab === "experience" ? (
                <TimelineList items={experience} icon={Briefcase} />
              ) : (
                <TimelineList items={education} icon={GraduationCap} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
