"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProductModal from "@/components/ProductModal";
import { ArrowRight, Funnel, X } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { DURATIONS, EASE_OUT } from "@/lib/motion";
import type { Brand, Product } from "@/lib/content";
import { PRODUCT_CATEGORIES, formatPrice } from "@/lib/catalog";

type SortOrder = "default" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOrder, string> = {
  default: "По умолчанию",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
};

const PILL_TRANSITION = { duration: DURATIONS.short, ease: EASE_OUT };

/** List item with a shared-layout pill that glides to the active row instead of popping. */
function FilterRow({
  active,
  onClick,
  label,
  count,
  layoutId,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  layoutId: string;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200",
          active ? "font-semibold text-accent-ink" : "text-muted hover:text-foreground"
        )}
      >
        {active && (
          <motion.span
            layoutId={layoutId}
            className="absolute inset-0 rounded-lg bg-accent-soft"
            transition={PILL_TRANSITION}
          />
        )}
        <span className="relative z-10">{label}</span>
        <span className="relative z-10 text-xs text-subtle">{count}</span>
      </button>
    </li>
  );
}

export default function CatalogView({
  products,
  brands,
  initialCategory = "all",
}: {
  products: Product[];
  brands: Brand[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOrder>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const brandById = useMemo(() => new Map(brands.map((b) => [b.id, b.name])), [brands]);

  const availableBrands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return brands
      .filter((b) => counts.has(b.id))
      .map((b) => ({ id: b.id, name: b.name, count: counts.get(b.id) ?? 0 }));
  }, [products, brands]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return counts;
  }, [products]);

  function selectBrand(id: string) {
    setSelectedBrand((prev) => (prev === id ? null : id));
  }

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSelectedBrand(null);
    setSort("default");
  }

  const hasActiveFilters = query.trim() !== "" || category !== "all" || selectedBrand !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (q) {
        const name = p.name.toLowerCase();
        const sku = p.sku.toLowerCase();
        if (!name.includes(q) && !sku.includes(q)) return false;
      }
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, category, selectedBrand, sort]);

  function renderSidebar(scope: "desktop" | "mobile") {
    return (
      <div className="space-y-8">
        <div>
          <label htmlFor={`catalog-search-${scope}`} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-subtle">
            Поиск
          </label>
          <input
            id={`catalog-search-${scope}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название или артикул"
            className="w-full rounded-lg border border-border bg-surface p-2.5 text-sm text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          />
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-subtle">Категория</div>
          <ul className="space-y-1">
            <FilterRow
              active={category === "all"}
              onClick={() => setCategory("all")}
              label="Все категории"
              count={products.length}
              layoutId={`category-pill-${scope}`}
            />
            {PRODUCT_CATEGORIES.filter((c) => categoryCounts.has(c)).map((c) => (
              <FilterRow
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
                label={c}
                count={categoryCounts.get(c) ?? 0}
                layoutId={`category-pill-${scope}`}
              />
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-subtle">Бренд</div>
          <ul className="space-y-1">
            {availableBrands.map((b) => (
              <FilterRow
                key={b.id}
                active={selectedBrand === b.id}
                onClick={() => selectBrand(b.id)}
                label={b.name}
                count={b.count}
                layoutId={`brand-pill-${scope}`}
              />
            ))}
          </ul>
        </div>

        {hasActiveFilters && (
          <button type="button" onClick={resetFilters} className="text-sm font-medium text-accent-ink hover:underline">
            Сбросить фильтры
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-foreground"
        >
          <Funnel className="h-4 w-4" weight="bold" />
          Фильтры
          {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />}
        </button>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-header flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-surface p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold text-foreground">Фильтры</span>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Закрыть">
                <X className="h-5 w-5 text-muted" weight="bold" />
              </button>
            </div>
            {renderSidebar("mobile")}
            <Button className="mt-6" onClick={() => setFiltersOpen(false)}>
              Показать {filtered.length}
            </Button>
          </div>
        </div>
      )}

      <aside className="hidden lg:block">
        <div className="sticky top-24">{renderSidebar("desktop")}</div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Найдено позиций: <span className="font-semibold text-foreground">{filtered.length}</span>
          </p>
          <label className="flex items-center gap-2 text-sm text-muted">
            Сортировка:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOrder)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors duration-200 focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <Card className="text-center">
            {category !== "all" && !categoryCounts.has(category) ? (
              <>
                <p className="text-muted">
                  Раздел «{category}» пока в наполнении. Нужную позицию подберёт инженер — пришлите модель
                  оборудования или партномер.
                </p>
                <Button
                  className="mt-4"
                  href="/#request-form"
                  icon={<ArrowRight className="h-4 w-4" weight="bold" />}
                >
                  Запросить КП
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted">По заданным фильтрам ничего не найдено.</p>
                <button type="button" onClick={resetFilters} className="mt-3 text-sm font-semibold text-accent-ink hover:underline">
                  Сбросить фильтры
                </button>
              </>
            )}
          </Card>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <motion.div key={p.id} layout transition={PILL_TRANSITION}>
                  <Card
                    as="article"
                    className="flex h-full cursor-pointer flex-col transition-colors duration-200 hover:border-brand-600"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedProduct(p)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedProduct(p);
                        }
                      }}
                      className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                        {brandById.get(p.brand) ?? p.brand}
                      </span>
                      <h3 className="mt-1.5 font-bold leading-snug text-foreground">{p.name}</h3>
                      <p className="mt-1 text-xs text-subtle">
                        Арт. {p.sku} · {p.category}
                      </p>
                      <div className="mt-4 flex flex-1 items-end justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold text-foreground">{formatPrice(p.price)}</div>
                          {p.price > 0 && <div className="text-xs text-subtle">за {p.unit}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(p)}
                        className="text-xs font-semibold text-accent-ink hover:underline"
                      >
                        Фото и характеристики
                      </button>
                      <span onClick={(e) => e.stopPropagation()}>
                        <Button href="/#request-form" variant="secondary" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                          КП
                        </Button>
                      </span>
                    </div>
                  </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        brandName={selectedProduct ? brandById.get(selectedProduct.brand) ?? selectedProduct.brand : ""}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
