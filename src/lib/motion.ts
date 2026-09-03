import type { Transition } from "motion/react";

/** Brand easing tokens, typed as motion tuples. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const DURATIONS = {
  micro: 0.18,
  short: 0.24,
  medium: 0.42,
  reveal: 0.62,
} as const;

export const REVEAL_VIEWPORT = {
  once: true,
  margin: "0px 0px -12% 0px",
  amount: 0.2,
} as const;

export function translate3d(x: number | string, y: number | string) {
  const tx = typeof x === "number" ? `${x}px` : x;
  const ty = typeof y === "number" ? `${y}px` : y;
  return `translate3d(${tx}, ${ty}, 0)`;
}

export function translateScale(x: number | string, y: number | string, scale = 1) {
  return `${translate3d(x, y)} scale(${scale})`;
}

export const fadeUp: Transition = {
  duration: DURATIONS.reveal,
  ease: EASE_OUT,
};
