"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "@/components/ui/icons";
import { EASE_OUT } from "@/lib/motion";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 ease-out hover:border-brand-600 hover:text-brand-700",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={reduce ? false : { opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="absolute inline-flex"
        >
          {isDark ? (
            <Moon className="h-5 w-5" weight="regular" />
          ) : (
            <Sun className="h-5 w-5" weight="regular" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
