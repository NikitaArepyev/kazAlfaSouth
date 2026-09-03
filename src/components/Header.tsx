"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { MENU_ITEMS } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { DURATIONS, EASE_DRAWER, EASE_OUT, translate3d } from "@/lib/motion";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Phone, WhatsappLogo, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type SalesProps = { name: string; phone: string; whatsapp: string };

const listVariants = {
  hidden: { opacity: 0, transform: translate3d(0, -14) },
  show: {
    opacity: 1,
    transform: translate3d(0, 0),
    transition: { duration: 0.34, ease: EASE_OUT, staggerChildren: 0.045, delayChildren: 0.03 },
  },
  exit: { opacity: 0, transform: translate3d(0, -10), transition: { duration: 0.2, ease: EASE_OUT } },
};
const itemVariants = {
  hidden: { opacity: 0, transform: translate3d(0, 16) },
  show: { opacity: 1, transform: translate3d(0, 0), transition: { duration: DURATIONS.medium, ease: EASE_OUT } },
};

export default function Header({ sales }: { sales: SalesProps }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 8));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.classList.toggle("mobile-menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [open]);

  const telHref = `tel:${sales.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${sales.whatsapp}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-header border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        scrolled || open
          ? "border-border bg-surface/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-surface/70 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="shrink-0 text-lg font-bold tracking-tight text-foreground"
          >
            КАЗ<span className="text-brand-600">АЛЬФА</span>ЮГ
          </Link>

          <nav className="hidden xl:flex items-center gap-7">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors duration-200 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden items-center gap-2 md:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-brand-600 transition-colors hover:border-brand-600">
                <Phone className="h-4 w-4" weight="regular" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold text-foreground">{sales.phone}</span>
                <span className="text-[11px] text-subtle">Отдел продаж</span>
              </span>
            </a>

            <ThemeToggle />

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "header" })}
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-brand-contrast transition-colors duration-200 hover:bg-brand-700"
            >
              <WhatsappLogo className="h-5 w-5" weight="fill" />
            </a>

            <div className="hidden sm:block">
              <Button href="/#request-form" variant="primary" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                Запросить КП
              </Button>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground xl:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-[14px] w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out",
                    open && "translate-y-[6px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[6px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-200",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[12px] h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out",
                    open && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, transform: translate3d(0, -18) }}
            animate={{ opacity: 1, transform: translate3d(0, 0) }}
            exit={{ opacity: 0, transform: translate3d(0, -12) }}
            transition={{ duration: DURATIONS.short, ease: EASE_DRAWER }}
            className="fixed inset-x-0 top-20 z-overlay h-[calc(100dvh-5rem)] overflow-hidden border-t border-border bg-background/92 supports-[backdrop-filter]:backdrop-blur-2xl xl:hidden"
          >
            <motion.nav
              variants={reduce ? undefined : listVariants}
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              exit={reduce ? undefined : "exit"}
              className="container mx-auto flex h-full flex-col overflow-y-auto px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              <div className="flex-1 space-y-1">
                {MENU_ITEMS.map((item) => (
                  <motion.div key={item.href} variants={reduce ? undefined : itemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl border border-transparent bg-transparent px-3 py-4 text-lg font-medium text-foreground transition-[transform,background-color,border-color,color] duration-200 ease-out hover:translate-x-1 hover:border-border hover:bg-surface-2 hover:text-brand-700"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-subtle transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand-600" weight="regular" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-2">
                <a
                  href={telHref}
                  onClick={() => track("phone_click", { location: "mobile_menu" })}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-bold text-brand-contrast shadow-sm transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
                >
                  <Phone className="h-4 w-4" weight="bold" /> {sales.phone}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "mobile_menu" })}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-3 font-bold text-foreground transition-[transform,border-color,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-600 hover:text-brand-700"
                >
                  <WhatsappLogo className="h-4 w-4" weight="fill" /> WhatsApp
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
