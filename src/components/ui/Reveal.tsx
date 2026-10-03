"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATIONS, EASE_OUT, REVEAL_VIEWPORT, translateScale } from "@/lib/motion";
import type { CSSProperties } from "react";

type RevealProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties;
  /** Stagger delay in seconds (use with index * step for lists). */
  delay?: number;
  /** Travel distance in px. */
  distance?: number;
  /** Reveal direction. */
  direction?: "up" | "left" | "right" | "scale";
};

/**
 * Fade-up on enter. Only transform + opacity, triggered by viewport
 * (whileInView / IntersectionObserver under the hood — no scroll listeners).
 * Honors prefers-reduced-motion with an opacity-only fade (no movement).
 */
export default function Reveal({
  delay = 0,
  distance = 22,
  direction = "up",
  className,
  id,
  style,
  children,
}: RevealProps) {
  const reduce = useReducedMotion();

  const axis =
    direction === "left"
      ? { x: distance, y: 0, scale: 1 }
      : direction === "right"
        ? { x: -distance, y: 0, scale: 1 }
        : direction === "scale"
          ? { x: 0, y: 0, scale: 0.975 }
          : { x: 0, y: distance, scale: 0.985 };

  if (reduce) {
    return (
      <motion.div
        id={id}
        style={style}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: DURATIONS.short, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      style={style}
      className={className}
      initial={{ opacity: 0, transform: translateScale(axis.x, axis.y, axis.scale) }}
      whileInView={{ opacity: 1, transform: translateScale(0, 0, 1) }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: DURATIONS.reveal, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
