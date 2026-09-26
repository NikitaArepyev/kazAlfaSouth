import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/cn";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
      <span className="h-3 w-[2px] rounded-full bg-brand-500" aria-hidden />
      {children}
    </span>
  );
}

type SectionProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  surface?: boolean;
  containerClassName?: string;
};

export default function Section({
  id,
  className,
  children,
  eyebrow,
  title,
  description,
  align = "left",
  surface = false,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        surface && "bg-surface-2",
        className
      )}
    >
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(eyebrow || title || description) && (
          <Reveal
            className={cn(
              "mb-12 max-w-3xl",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <div className={cn("mb-4", align === "center" && "flex justify-center")}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export { Eyebrow };
