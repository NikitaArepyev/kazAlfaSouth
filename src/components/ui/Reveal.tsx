"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import type { CSSProperties } from "react";

type RevealProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties;
  /** Stagger delay in seconds (use with index * step for lists). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
};

/**
 * Fade-up on enter. Only transform + opacity, triggered by viewport
 * (whileInView / IntersectionObserver under the hood — no scroll listeners).
 * Honors prefers-reduced-motion by rendering statically.
 */
export default function Reveal({
  delay = 0,
  y = 22,
  className,
  id,
  style,
  children,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      style={style}
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.2 }}
      transition={{ duration: 0.68, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
