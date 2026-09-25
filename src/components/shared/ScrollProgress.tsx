"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin blue→orange progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary to-secondary"
      style={{ scaleX }}
    />
  );
}
