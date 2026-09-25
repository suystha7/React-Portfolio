"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/** Soft ambient glow that follows the cursor across the whole page. */
export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 55, damping: 18 });
  const sy = useSpring(y, { stiffness: 55, damping: 18 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[2] -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-primary/15 via-blue-400/10 to-secondary/15 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
    />
  );
}
