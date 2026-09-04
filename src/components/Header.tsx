"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useScroll } from "motion/react";
import { MENU_ITEMS } from "@/lib/constants";
import { track } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Phone, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type SalesProps = { name: string; phone: string; whatsapp: string };

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
        "sticky top-0 z-header isolate border-b bg-background/95 transition-[border-color,box-shadow] duration-300 ease-out supports-[backdrop-filter]:backdrop-blur-xl",
        scrolled ? "border-border shadow-sm" : "border-border/80"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-foreground"
          >
            КАЗ<span className="text-brand-600">АЛЬФА</span>ЮГ
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
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

            <div className="hidden sm:block">
              <Button href="/#request-form" variant="primary" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                Запросить КП
              </Button>
            </div>
          </div>
        </div>

        <nav className="-mx-4 flex gap-5 overflow-x-auto border-t border-border/70 px-4 py-3 text-sm lg:hidden">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-muted transition-colors duration-200 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
