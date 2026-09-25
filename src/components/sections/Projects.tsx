"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";
import TiltCard from "@/components/shared/TiltCard";
import { LaptopMockup, PhoneMockup } from "@/components/mockups/DeviceMockups";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="group h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
        {/* Preview: laptop + phone side by side, with 3D tilt */}
        <TiltCard max={5}>
          <div
            className="relative flex items-end justify-center gap-3 overflow-hidden px-6 pb-0 pt-8"
            style={{
              background: `linear-gradient(135deg, ${project.accent.from}14, ${project.accent.to}1f)`,
            }}
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <LaptopMockup
              title={project.title}
              url={project.live.replace("https://", "")}
              accent={project.accent}
              image={project.desktopImage}
              className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
            />
            <PhoneMockup
              title={project.title}
              accent={project.accent}
              image={project.mobileImage}
              className="relative z-10 hidden transition-transform duration-500 group-hover:-translate-y-1 min-[420px]:block"
            />
          </div>
        </TiltCard>

        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="soft">{project.category}</Badge>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground decoration-secondary decoration-2 underline-offset-4 group-hover:underline">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <ul className="space-y-1.5">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={3} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex gap-2 pt-2">
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button asChild size="sm" variant="secondary" className="w-full">
                <a href={project.live} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Live Demo
                </a>
              </Button>
            </motion.span>
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
              <Button asChild size="sm" variant="outline" className="w-full">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github />
                  Source Code
                </a>
              </Button>
            </motion.span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="scroll-mt-20 bg-muted/40 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured projects"
          description="A selection of things I've designed and built — each shown in desktop and mobile view."
        />

        {/* Category filter */}
        <Reveal variant="scale" className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActive(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                active === category
                  ? "text-white"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {active === category && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{category}</span>
            </motion.button>
          ))}
        </Reveal>

        {/* Cards */}
        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
