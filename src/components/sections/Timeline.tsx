"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { education, experience, type TimelineItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    <div ref={listRef} className="relative ml-3 space-y-6 md:ml-6">
      {/* Vertical gradient line (GSAP-scrubbed) */}
      <span
        ref={lineRef}
        className="absolute bottom-4 left-[19px] top-4 w-0.5 rounded-full bg-gradient-to-b from-primary via-secondary to-primary/20"
      />
      {items.map((entry, i) => (
        <motion.div
          key={entry.title}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-14"
        >
          {/* Node dot */}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 260, damping: 14 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25"
          >
            <Icon className="h-4 w-4" />
          </motion.span>

          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Card className="transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="flex flex-col gap-3 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="soft">
                    <Calendar />
                    {entry.period}
                  </Badge>
                  {entry.current && (
                    <Badge variant="secondary" className="animate-pulse">
                      Current
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground md:text-xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{entry.place}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {entry.location}
                    </span>
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Timeline() {
  const [tab, setTab] = useState<Tab>("experience");

  return (
    <section id="journey" className="scroll-mt-20 bg-muted/40 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="My Journey"
          title="Career and education timeline"
          description="Where I've worked, what I've learned, and how I got here."
        />

        {/* Tabs */}
        <Reveal variant="scale" className="mb-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-border bg-card p-1.5 shadow-sm">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setTab(id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors",
                  tab === id ? "text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === id && (
                  <motion.span
                    layoutId="timeline-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Timeline panels */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
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
