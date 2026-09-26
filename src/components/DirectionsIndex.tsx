"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type Direction = {
  title: string;
  href: string;
  desc: string;
  image: string;
  imageAlt: string;
  /** Active catalog positions in this direction; 0 hides the counter. */
  count: number;
};

function pluralPositions(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "позиция";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "позиции";
  return "позиций";
}

/** Empty directions are quoted per request, so they get no counter rather than a misleading "0". */
function countLabel(n: number) {
  return n > 0 ? `${n} ${pluralPositions(n)}` : null;
}

/**
 * Editorial index of the main directions: a large-type list on the left drives a
 * sticky photo panel on the right. On touch / narrow screens every row carries
 * its own photo and description instead, so nothing depends on hover.
 */
export default function DirectionsIndex({ directions }: { directions: Direction[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
      <ul className="self-start border-b border-border">
        {directions.map((d, i) => {
          const isActive = i === active;
          return (
            <li key={d.href}>
              <Reveal delay={i * 0.06} distance={14}>
                <Link
                  href={d.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-active={isActive || undefined}
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 border-t border-border py-7 focus-visible:outline-none md:py-8"
                >
                  {/* Active marker: draws along the row's top rule instead of recoloring a box. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -top-px hidden h-0.5 origin-left scale-x-0 bg-brand-600 transition-transform duration-500 ease-out group-data-active:scale-x-100 lg:block"
                  />

                  <div className="relative col-span-2 mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-surface-2 lg:hidden">
                    <Image src={d.image} alt={d.imageAlt} fill sizes="100vw" className="object-cover" />
                  </div>

                  <span className="text-2xl font-semibold tracking-[-0.025em] text-foreground transition-colors duration-300 ease-out md:text-4xl lg:text-subtle lg:group-hover:text-foreground lg:group-focus-visible:text-foreground lg:group-data-active:text-foreground">
                    {d.title}
                  </span>

                  <span className="flex items-center gap-4">
                    {d.count > 0 && (
                      <span className="hidden text-sm tabular-nums text-muted sm:inline">{countLabel(d.count)}</span>
                    )}
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground transition-[background-color,border-color,color] duration-300 ease-out group-focus-visible:ring-2 group-focus-visible:ring-brand-500/50 group-data-active:border-brand-600 group-data-active:bg-brand-600 group-data-active:text-brand-contrast">
                      <ArrowRight
                        className="h-4 w-4 -rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0 group-data-active:rotate-0"
                        weight="bold"
                      />
                    </span>
                  </span>

                  <p className="col-span-2 mt-3 max-w-md text-sm leading-relaxed text-muted lg:hidden">
                    {d.desc}
                    {d.count > 0 && (
                      <span className="mt-1 block text-xs tabular-nums text-subtle sm:hidden">{countLabel(d.count)}</span>
                    )}
                  </p>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <Reveal direction="scale" delay={0.1} className="sticky top-28">
          {/* Double bezel: tray + inset plate, concentric radii (20px outer, 20 - 6 = 14px inner). */}
          <div className="rounded-[20px] border border-border bg-surface p-1.5 shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-2">
              {directions.map((d, i) => (
                <Image
                  key={d.image}
                  src={d.image}
                  alt={d.imageAlt}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1280px) 520px, 40vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-700 ease-out",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  )}
                />
              ))}
            </div>
            <div className="grid px-4 pb-3 pt-4">
              {directions.map((d, i) => (
                <div
                  key={d.href}
                  aria-hidden={i !== active}
                  className={cn(
                    "[grid-area:1/1] transition-[opacity,translate] duration-300 ease-out",
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-foreground">{d.title}</span>
                    <span className="text-xs tabular-nums text-subtle">{countLabel(d.count)}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
