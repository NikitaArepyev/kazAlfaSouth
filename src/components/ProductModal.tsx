"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/Button";
import { ArrowRight, CaretLeft, CaretRight, ImageIcon, X } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { DURATIONS, EASE_OUT } from "@/lib/motion";
import { formatPrice } from "@/lib/catalog";
import type { Product } from "@/lib/content";

const TRANSITION = { duration: DURATIONS.short, ease: EASE_OUT };

/** Real photo paths are stored alongside plain caption placeholders in the same array. */
function isRealImage(slide: string): boolean {
  return slide.startsWith("/") || slide.startsWith("http");
}

function Carousel({ images, productName }: { images: string[]; productName: string }) {
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : ["Фото уточняется"];

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-surface-2"
        style={{ aspectRatio: "4 / 3" }}
      >
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />
        <AnimatePresence mode="wait" initial={false}>
          {isRealImage(slides[index]) ? (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
              className="absolute inset-0"
            >
              <Image
                src={slides[index]}
                alt={`${productName} — фото ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center"
            >
              <span className="text-subtle">
                <ImageIcon className="h-8 w-8" weight="regular" />
              </span>
              <span className="text-xs font-medium text-subtle">{slides[index]}</span>
              <span className="absolute right-2 top-2 rounded-full border border-border bg-surface/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-subtle">
                TODO
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground transition-colors hover:bg-surface"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground transition-colors hover:bg-surface"
            >
              <CaretRight className="h-4 w-4" weight="bold" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Фото ${i + 1}${isRealImage(slide) ? "" : `: ${slide}`} — ${productName}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === index ? "w-5 bg-brand-600" : "w-1.5 bg-border-strong hover:bg-subtle"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductModal({
  product,
  brandName,
  onClose,
}: {
  product: Product | null;
  brandName: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-modal flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl border border-border bg-surface shadow-xl md:flex-row md:overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={TRANSITION}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/90 text-muted transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" weight="bold" />
            </button>

            <div className="p-5 pt-16 md:w-1/2 md:overflow-y-auto md:p-6 md:pt-6">
              <Carousel images={product.images} productName={product.name} />
            </div>

            <div className="border-t border-border p-5 md:w-1/2 md:overflow-y-auto md:border-l md:border-t-0 md:p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-subtle">{brandName}</span>
              <h2 className="mt-1.5 text-xl font-bold leading-snug text-foreground">{product.name}</h2>
              <p className="mt-1 text-xs text-subtle">
                Арт. {product.sku} · {product.category}
              </p>

              {product.description && <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>}

              {product.specs.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Характеристики</h3>
                  <dl className="mt-3 divide-y divide-border">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-start justify-between gap-4 py-2 text-sm">
                        <dt className="text-muted">{spec.label}</dt>
                        <dd className="text-right font-medium text-foreground">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <div className="text-xl font-bold text-foreground">{formatPrice(product.price)}</div>
                  <div className="text-xs text-subtle">
                    {product.price > 0 ? `за ${product.unit}` : `Фасовка: ${product.unit}`}
                  </div>
                </div>
                <Button href="/#request-form" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                  Запросить КП
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
