"use client";

import { useState } from "react";
import type { Brand } from "@/lib/content";

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Бренды</h1>
        <button onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Добавить бренд
        </button>
      </div>

      <div className="space-y-3">
        {brands.map((b) => (
          <div key={b.id} className="bg-white p-4 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <input value={b.name} onChange={(e) => update(b.id, { name: e.target.value })} placeholder="Название" className="md:col-span-3 border border-gray-300 rounded-lg p-2" />
            <input value={b.status} onChange={(e) => update(b.id, { status: e.target.value })} placeholder="Статус / описание" className="md:col-span-5 border border-gray-300 rounded-lg p-2" />
            <label className="md:col-span-2 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={b.active} onChange={(e) => update(b.id, { active: e.target.checked })} /> Активен
            </label>
            <button onClick={() => remove(b.id)} className="md:col-span-2 text-red-600 text-sm hover:underline">
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={save} disabled={status === "saving"} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="text-green-600 font-medium">Сохранено</span>}
        {status === "error" && <span className="text-red-600 font-medium">{error}</span>}
      </div>
    </div>
  );
}
