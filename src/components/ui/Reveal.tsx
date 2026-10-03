import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
  /** Stagger step (0-0.3), shifts where in the scroll the element fades in. */
  delay?: number;
  /** Travel distance in px. */
  distance?: number;
  /** Reveal direction. */
  direction?: "up" | "left" | "right" | "scale";
};

/**
 * Fade-in on scroll via a CSS scroll timeline (`.reveal` in globals.css). Server component:
 * the content is in the HTML and visible before any JS, and no animation library ships.
 */
export default function Reveal({ delay = 0, distance = 22, direction = "up", className, id, style, children }: RevealProps) {
  const vars = {
    "--reveal-delay": delay,
    "--reveal-x": direction === "left" ? `${distance}px` : direction === "right" ? `${-distance}px` : "0px",
    "--reveal-y": direction === "up" ? `${distance}px` : "0px",
    "--reveal-scale": direction === "scale" ? 0.975 : direction === "up" ? 0.985 : 1,
  } as CSSProperties;

  return (
    <div id={id} className={cn("reveal", className)} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}
