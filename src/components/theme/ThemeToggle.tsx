"use client";

import { Moon, Sun } from "@/components/ui/icons";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/cn";

const ICON = "absolute h-5 w-5 transition-[opacity,scale,rotate,filter] duration-240 ease-out";
const HIDDEN = "scale-[0.84] opacity-0 blur-[2px]";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-[color,border-color,scale] duration-160 ease-out hover:border-brand-600 hover:text-accent-ink active:scale-[0.94]",
        className
      )}
    >
      {/* Both icons stay mounted and cross-fade with a quarter turn, so no exit animation JS is needed */}
      <Sun className={cn(ICON, isDark && `${HIDDEN} -rotate-[24deg]`)} weight="regular" />
      <Moon className={cn(ICON, !isDark && `${HIDDEN} rotate-[24deg]`)} weight="regular" />
    </button>
  );
}
