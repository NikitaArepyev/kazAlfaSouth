import type { Transition } from "motion/react";

/** Brand easing tokens, typed as motion tuples. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const fadeUp: Transition = {
  duration: 0.6,
  ease: EASE_OUT,
};
