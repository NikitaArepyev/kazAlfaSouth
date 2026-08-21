import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Double-bezel: outer frame + concentric inner core. */
  bezel?: boolean;
  /** Inner padding. */
  padded?: boolean;
  as?: "div" | "article" | "li";
};

/**
 * Card with a single Shape Consistency Lock radius scale.
 * The double-bezel variant renders an outer frame (border) and a concentric
 * inner core (surface-2), giving a premium, layered edge without glass.
 */
export default function Card({
  children,
  className,
  bezel = false,
  padded = true,
  as: Tag = "div",
}: CardProps) {
  if (bezel) {
    return (
      <Tag
        className={cn(
          "rounded-2xl border border-border bg-surface p-[3px] shadow-sm",
          className
        )}
      >
        <div
          className={cn(
            "rounded-xl bg-surface-2",
            padded && "p-6 md:p-8",
            "h-full"
          )}
        >
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "rounded-xl border border-border bg-surface shadow-sm",
        padded && "p-6 md:p-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}
