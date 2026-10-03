/** Motion tokens for the catalog's JS animations; everything else animates in CSS (globals.css). */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const DURATIONS = {
  micro: 0.18,
  short: 0.24,
} as const;

export function translateScale(x: number, y: number, scale = 1) {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}
