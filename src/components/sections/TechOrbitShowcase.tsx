"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { siteConfig } from "@/lib/data";

export default function TechOrbitShowcase() {
  const visualRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let innerTween: gsap.core.Tween | null = null;
    let outerTween: gsap.core.Tween | null = null;

    if (innerRingRef.current) {
      innerTween = gsap.to(innerRingRef.current, {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "linear",
      });
    }

    if (outerRingRef.current) {
      outerTween = gsap.to(outerRingRef.current, {
        rotation: -360,
        duration: 45,
        repeat: -1,
        ease: "linear",
      });
    }



    return () => {
      innerTween?.kill();
      outerTween?.kill();
    };
  }, []);

  const innerTech = [
    {
      name: "React",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    {
      name: "Next.js",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    },
    {
      name: "TypeScript",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    },
    {
      name: "Tailwind",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    },
  ];

  const outerTech = [
    {
      name: "Node.js",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      pos: "-top-3 left-1/4 -translate-x-1/2",
    },
    {
      name: "MongoDB",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      pos: "-top-3 right-1/4 translate-x-1/2",
    },
    {
      name: "Redux",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      pos: "-bottom-3 right-1/4 translate-x-1/2",
    },
  ];

  return (
    <div ref={visualRef} className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 90,
          damping: 20,
        }}
        className="relative mx-auto h-[440px] w-[440px] md:h-[520px] md:w-[520px] flex items-center justify-center"
      >
        <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none animate-pulse" />

        <div className="relative h-[180px] w-[180px] md:h-[220px] md:w-[220px] rounded-full p-[3px] bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent shadow-[0_0_50px_rgba(245,158,11,0.2)] z-30">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.03 }}
            className="relative h-full w-full overflow-hidden rounded-full bg-card shadow-2xl"
          >
            {siteConfig.profileImage ? (
              <Image
                src={siteConfig.profileImage}
                alt={`${siteConfig.name} — ${siteConfig.role}`}
                fill
                priority
                className="object-cover transition-all duration-700 scale-105 hover:scale-100"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-foreground">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  {siteConfig.initials}
                </span>
                <span className="rounded-full border border-amber-500/30 bg-card px-3 py-1 text-[10px] font-medium tracking-widest text-muted-foreground">
                  {siteConfig.role.toUpperCase()}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        <div
          ref={innerRingRef}
          className="absolute h-[320px] w-[320px] md:h-[380px] md:w-[380px] rounded-full border border-amber-500/20 pointer-events-none z-20"
        >
          {innerTech.map((tech, index) => (
            <div
              key={tech.name}
              className={`absolute ${tech.pos} pointer-events-auto`}
            >
              <div
                ref={(el) => {
                  badgesRef.current[index] = el;
                }}
                className="group flex items-center gap-2 rounded-full border border-amber-500/30 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-amber-500"
              >
                <div className="relative h-4 w-4 flex items-center justify-center">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="tracking-wide">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={outerRingRef}
          className="absolute h-[420px] w-[420px] md:h-[500px] md:w-[500px] rounded-full border border-dashed border-amber-500/15 pointer-events-none z-10"
        >
          {outerTech.map((tech, index) => {
            const badgeIndex = index + 4;
            return (
              <div
                key={tech.name}
                className={`absolute ${tech.pos} pointer-events-auto`}
              >
                <div
                  ref={(el) => {
                    badgesRef.current[badgeIndex] = el;
                  }}
                  className="group flex items-center gap-2 rounded-full border border-amber-500/30 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-amber-500"
                >
                  <div className="relative h-4 w-4 flex items-center justify-center">
                    <Image
                      src={tech.image}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="tracking-wide">{tech.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
