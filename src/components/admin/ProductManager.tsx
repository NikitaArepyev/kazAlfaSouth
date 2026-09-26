"use client";

import { useState } from "react";
import type { Brand, Product, ProductSpec } from "@/lib/content";
import { PRODUCT_CATEGORIES } from "@/lib/catalog";

const input =
  "rounded-lg border border-border bg-surface p-2 text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

function specsToText(specs: ProductSpec[]): string {
  return specs.map((s) => `${s.label}: ${s.value}`).join("\n");
}

function textToSpecs(text: string): ProductSpec[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

function imagesToText(images: string[]): string {
  return images.join("\n");
}

function textToImages(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ProductManager({ initial, brands }: { initial: Product[]; brands: Brand[] }) {
  const [products, setProducts] = useState<Product[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function update(id: string, patch: Partial<Product>) {
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function add() {
    const id = `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    setProducts((p) => [
      ...p,
      {
        id,
        name: "",
        brand: brands[0]?.id ?? "",
        category: PRODUCT_CATEGORIES[0],
        price: 0,
        unit: "шт.",
        sku: "",
        active: true,
        description: "",
        images: [],
        specs: [],
      },
    ]);
    setExpanded((prev) => new Set(prev).add(id));
  }
  function remove(id: string) {
    setProducts((p) => p.filter((x) => x.id !== id));
  }
  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function save() {
    setStatus("saving");
    setError("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "products", data: products }),
    });
    if (res.ok) setStatus("saved");
    else {
      setStatus("error");
      setError("Не удалось сохранить");
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Товары каталога</h1>
        <button onClick={add} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-700">
          + Добавить товар
        </button>
      </div>

      <div className="space-y-3">
        {products.map((p) => {
          const isOpen = expanded.has(p.id);
          return (
            <div key={p.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
                <input value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} placeholder="Название" className={`md:col-span-3 ${input}`} />
                <select value={p.brand} onChange={(e) => update(p.id, { brand: e.target.value })} className={`md:col-span-2 ${input}`}>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <select value={p.category} onChange={(e) => update(p.id, { category: e.target.value })} className={`md:col-span-2 ${input}`}>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={p.price}
                  onChange={(e) => update(p.id, { price: Number(e.target.value) })}
                  placeholder="Цена, ₸"
                  className={`md:col-span-2 ${input}`}
                />
                <input value={p.unit} onChange={(e) => update(p.id, { unit: e.target.value })} placeholder="Ед." className={`md:col-span-1 ${input}`} />
                <input value={p.sku} onChange={(e) => update(p.id, { sku: e.target.value })} placeholder="Артикул" className={`md:col-span-1 ${input}`} />
                <label className="flex items-center gap-2 text-sm text-muted md:col-span-1">
                  <input type="checkbox" checked={p.active} onChange={(e) => update(p.id, { active: e.target.checked })} className="accent-brand-600" /> Вкл.
                </label>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button type="button" onClick={() => toggleExpanded(p.id)} className="text-sm font-medium text-accent-ink hover:underline">
                  {isOpen ? "Свернуть описание и фото" : "Описание, характеристики и фото"}
                </button>
                <button onClick={() => remove(p.id)} className="text-sm text-red-500 hover:underline">
                  Удалить
                </button>
              </div>

              {isOpen && (
                <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-subtle">Описание</label>
                    <textarea
                      value={p.description}
                      onChange={(e) => update(p.id, { description: e.target.value })}
                      placeholder="Краткое описание товара для карточки"
                      rows={3}
                      className={`w-full resize-y ${input}`}
                    />

                    <label className="mb-1 mt-3 block text-xs font-semibold uppercase tracking-wider text-subtle">
                      Подписи к фото (карусель), по одной на строку
                    </label>
                    <textarea
                      value={imagesToText(p.images)}
                      onChange={(e) => update(p.id, { images: textToImages(e.target.value) })}
                      placeholder={"Общий вид\nПанель управления\nТабличка с серийным номером"}
                      rows={4}
                      className={`w-full resize-y ${input}`}
                    />
                    <p className="mt-1 text-xs text-subtle">
                      Реальная загрузка фото пока не подключена — здесь задаются подписи для слотов в карусели.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-subtle">
                      Характеристики — «Ключ: Значение», по одной на строку
                    </label>
                    <textarea
                      value={specsToText(p.specs)}
                      onChange={(e) => update(p.id, { specs: textToSpecs(e.target.value) })}
                      placeholder={"Производительность: 5.2 м³/мин\nРабочее давление: 7.5 бар"}
                      rows={8}
                      className={`w-full resize-y ${input}`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={save} disabled={status === "saving"} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-brand-contrast transition-colors hover:bg-brand-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="font-medium text-accent-ink">Сохранено</span>}
        {status === "error" && <span className="font-medium text-red-600">{error}</span>}
      </div>
    </div>
  );
}
