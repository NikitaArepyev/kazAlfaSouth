"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowRight, Minus, Plus } from "@/components/ui/icons";
import { quoteHref } from "@/lib/catalog";
import type { Product } from "@/lib/content";

const stepCls =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-surface text-foreground transition-colors duration-200 hover:border-brand-600 hover:text-accent-ink disabled:opacity-40";

/** Native <dialog>: top layer above the product modal, focus trap and Escape for free. */
export default function QuantityDialog({
  product,
  brandName,
  onClose,
}: {
  product: Product;
  brandName: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [qty, setQty] = useState("1");
  const n = Math.max(1, Math.floor(Number(qty)) || 1);

  return (
    <dialog
      ref={(el) => {
        if (el && !el.open) el.showModal();
      }}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      aria-labelledby="qty-title"
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-surface p-0 text-foreground shadow-xl backdrop:bg-black/50"
    >
      <form
        className="p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(quoteHref(product, brandName, n));
        }}
      >
        <h2 id="qty-title" className="text-lg font-bold">
          Укажите количество
        </h2>
        <p className="mt-1 text-sm text-muted">
          {product.name} · фасовка: {product.unit}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button type="button" aria-label="Меньше" className={stepCls} disabled={n <= 1} onClick={() => setQty(String(n - 1))}>
            <Minus className="h-5 w-5" weight="bold" />
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={9999}
            required
            autoFocus
            aria-label="Количество, шт."
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            className="h-12 w-full min-w-0 rounded-lg border border-border-strong bg-surface text-center text-lg font-bold text-foreground focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          />
          <button type="button" aria-label="Больше" className={stepCls} onClick={() => setQty(String(n + 1))}>
            <Plus className="h-5 w-5" weight="bold" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-subtle">штук · можно уточнить в заявке</p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" fullWidth icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
            Далее
          </Button>
        </div>
      </form>
    </dialog>
  );
}
