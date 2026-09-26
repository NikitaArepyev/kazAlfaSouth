"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScroll } from "motion/react";
import { MENU_ITEMS, type MenuItem } from "@/lib/constants";
import { track } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Phone, ArrowRight, CaretDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type SalesProps = { name: string; phone: string; whatsapp: string };

function NavLink({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const linkClass = "text-[13px] sm:text-sm font-medium text-muted transition-colors duration-200 hover:text-accent-ink whitespace-nowrap";

  if (!item.children) {
    return (
      <Link href={item.href} className={linkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(linkClass, "inline-flex items-center gap-0.5")}
      >
        {item.label}
        <CaretDown className={cn("h-3 w-3 transition-[rotate] duration-200 ease-out", open && "rotate-180")} weight="bold" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-header mt-2 min-w-[220px] origin-top-left rounded-xl border border-border bg-surface p-1.5 shadow-md transition-[opacity,translate,scale] duration-180 ease-out starting:-translate-y-1 starting:scale-[0.97] starting:opacity-0">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ sales }: { sales: SalesProps }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 8));
    return unsub;
  }, [scrollY]);

  const telHref = `tel:${sales.phone.replace(/\s+/g, "")}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-header isolate border-b bg-background/95 transition-[border-color,box-shadow] duration-200 ease-out supports-[backdrop-filter]:backdrop-blur-xl",
        scrolled ? "border-border shadow-sm" : "border-border/80"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-1.5 sm:gap-4 md:h-20">
          <Link
            href="/"
            className="shrink-0 text-base font-bold tracking-tight text-foreground sm:text-lg"
          >
            КАЗ<span className="text-accent-ink">АЛЬФА</span>ЮГ
          </Link>

          <nav className="flex items-center gap-2 sm:gap-7">
            {MENU_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden items-center gap-2 md:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-accent-ink transition-colors hover:border-brand-600">
                <Phone className="h-4 w-4" weight="regular" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold text-foreground">{sales.phone}</span>
                <span className="text-[11px] text-subtle">Отдел продаж</span>
              </span>
            </a>

            <ThemeToggle />

            <div className="hidden sm:block">
              <Button href="/#request-form" variant="primary" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                Запросить КП
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Soft trailing blur: content fades out gradually instead of cutting off hard at the border. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-8 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
    </header>
  );
}
