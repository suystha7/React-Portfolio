"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
}

/** Splits text into characters that cascade in with a 3D flip on scroll into view. */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  as = "span",
}: SplitTextProps) {
  const words = text.split(" ");
  let charIndex = 0;

  const Tag =
    as === "h1"
      ? motion.h1
      : as === "h2"
        ? motion.h2
        : as === "p"
          ? motion.p
          : motion.span;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const d = delay + charIndex * stagger;
            charIndex += 1;
            return (
              <motion.span
                key={`${wi}-${charIndex}`}
                aria-hidden
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: 26, rotateX: -70 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
