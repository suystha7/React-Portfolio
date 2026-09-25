"use client";

import { useEffect, useRef } from "react";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { currentlyLearning, techStack, type TechItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/shared/Reveal";

function getCdnImage(tech: TechItem): string {
  const name = tech.name.toLowerCase().replace(/[\s.]+/g, "");

  const iconMap: Record<string, string> = {
    react:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    typescript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwindcss:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    nodejs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongodb:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    javascript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    github:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    postgresql:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    redis:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    redux:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    prisma:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    graphql:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  };

  return (
    iconMap[name] ||
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"
  );
}

function TechGridCard({ tech }: { tech: TechItem }) {
  const imageUrl = getCdnImage(tech);

  return (
    <div className="group relative flex flex-col items-center justify-center p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:bg-card hover:shadow-xl hover:shadow-amber-500/10">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="relative h-14 w-14 mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Image
          src={imageUrl}
          alt={tech.name}
          fill
          className="object-contain filter drop-shadow-md"
        />
      </div>

      <span className="text-sm font-bold text-foreground tracking-wide text-center">
        {tech.name}
      </span>
      <span className="text-[11px] font-medium text-muted-foreground mt-0.5 text-center">
        {tech.category}
      </span>

      <div className="mt-3 w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500 group-hover:brightness-110"
          style={{ width: `${tech.level}%` }}
        />
      </div>
    </div>
  );
}

export default function TechStackGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech"
      className="scroll-mt-20 py-24 relative"
      ref={containerRef}
    >
      <div className="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technologies I work with"
          description="My everyday toolbox built for modern, high-performance web applications."
        />

        <Reveal variant="fade" className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-card-item">
                <TechGridCard tech={tech} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          variant="scale"
          className="mt-12 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground bg-card/40 border border-border/50 backdrop-blur-sm px-6 py-3.5 rounded-full shadow-sm">
            <span className="inline-flex items-center gap-2 font-medium text-foreground mr-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              Currently exploring:
            </span>
            {currentlyLearning.map((topic) => (
              <Badge key={topic} variant="soft-orange" className="px-3 py-1">
                {topic}
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
