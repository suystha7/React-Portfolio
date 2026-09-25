"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right" | "flip";

const variants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -50 },
    show: { opacity: 1, rotateX: 0 },
  },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  className?: string;
  once?: boolean;
}

/** Scroll-triggered reveal wrapper with multiple animation styles. */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  variant = "up",
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
