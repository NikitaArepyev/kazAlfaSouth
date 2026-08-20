"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/content";

export default function CaseManager({ initial }: { initial: CaseStudy[] }) {
  const [cases, setCases] = useState<CaseStudy[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function update(id: string, patch: Partial<CaseStudy>) {
    setCases((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function add() {
    setCases((c) => [
      ...c,
      { id: `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, industry: "", equipment: "", task: "", solution: "", result: "", client: "", active: false },
    ]);
  }
  function remove(id: string) {
    setCases((c) => c.filter((x) => x.id !== id));
  }

  async function save() {
    setStatus("saving");
    setError("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "cases", data: cases }),
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
        <h1 className="text-2xl font-bold">Кейсы (опыт работы)</h1>
        <button onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Добавить кейс
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Публикуйте кейс только после согласования с заказчиком. Поле «Активен» выводит кейс на сайт. «Название заказчика» заполняйте только при разрешении.
      </p>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input value={c.industry} onChange={(e) => update(c.id, { industry: e.target.value })} placeholder="Отрасль" className="border border-gray-300 rounded-lg p-2" />
              <input value={c.equipment} onChange={(e) => update(c.id, { equipment: e.target.value })} placeholder="Оборудование" className="border border-gray-300 rounded-lg p-2" />
            </div>
            <textarea value={c.task} onChange={(e) => update(c.id, { task: e.target.value })} placeholder="Задача клиента" rows={2} className="w-full border border-gray-300 rounded-lg p-2" />
            <textarea value={c.solution} onChange={(e) => update(c.id, { solution: e.target.value })} placeholder="Что сделала КАЮ" rows={2} className="w-full border border-gray-300 rounded-lg p-2" />
            <input value={c.result} onChange={(e) => update(c.id, { result: e.target.value })} placeholder="Результат" className="w-full border border-gray-300 rounded-lg p-2" />
            <input value={c.client} onChange={(e) => update(c.id, { client: e.target.value })} placeholder="Название заказчика (по разрешению)" className="w-full border border-gray-300 rounded-lg p-2" />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={c.active} onChange={(e) => update(c.id, { active: e.target.checked })} /> Активен (показывать на сайте)
              </label>
              <button onClick={() => remove(c.id)} className="text-red-600 text-sm hover:underline">Удалить</button>
            </div>
          </div>
        ))}
        {cases.length === 0 && <p className="text-gray-400 text-sm">Кейсов пока нет.</p>}
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={status === "saving"} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-4 text-green-600 font-medium">Сохранено</span>}
        {status === "error" && <span className="ml-4 text-red-600 font-medium">{error}</span>}
      </div>
    </div>
  );
}
