"use client";

import { useState } from "react";
import type { Brand } from "@/lib/content";

const input =
  "rounded-lg border border-border bg-surface p-2 text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

export default function BrandManager({ initial }: { initial: Brand[] }) {
  const [brands, setBrands] = useState<Brand[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function update(id: string, patch: Partial<Brand>) {
    setBrands((b) => b.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function add() {
    setBrands((b) => [...b, { id: `b-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, name: "", status: "", active: true }]);
  }
  function remove(id: string) {
    setBrands((b) => b.filter((x) => x.id !== id));
  }

  async function save() {
    setStatus("saving");
    setError("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "brands", data: brands }),
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
        <h1 className="text-2xl font-bold text-foreground">Бренды</h1>
        <button onClick={add} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-700">
          + Добавить бренд
        </button>
      </div>

      <div className="space-y-3">
        {brands.map((b) => (
          <div key={b.id} className="grid grid-cols-1 items-center gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-12">
            <input value={b.name} onChange={(e) => update(b.id, { name: e.target.value })} placeholder="Название" className={`md:col-span-3 ${input}`} />
            <input value={b.status} onChange={(e) => update(b.id, { status: e.target.value })} placeholder="Статус / описание" className={`md:col-span-5 ${input}`} />
            <label className="flex items-center gap-2 text-sm text-muted md:col-span-2">
              <input type="checkbox" checked={b.active} onChange={(e) => update(b.id, { active: e.target.checked })} className="accent-brand-600" /> Активен
            </label>
            <button onClick={() => remove(b.id)} className="text-sm text-red-500 hover:underline md:col-span-2">
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={save} disabled={status === "saving"} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-brand-contrast transition-colors hover:bg-brand-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="font-medium text-brand-700">Сохранено</span>}
        {status === "error" && <span className="font-medium text-red-600">{error}</span>}
      </div>
    </div>
  );
}
