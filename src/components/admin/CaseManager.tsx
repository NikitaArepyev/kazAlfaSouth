"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/content";

const input =
  "rounded-lg border border-border bg-surface p-2 text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Кейсы (опыт работы)</h1>
        <button onClick={add} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-700">
          + Добавить кейс
        </button>
      </div>
      <p className="mb-4 text-sm text-muted">
        Публикуйте кейс только после согласования с заказчиком. Поле «Активен» выводит кейс на сайт. «Название заказчика» заполняйте только при разрешении.
      </p>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="space-y-2 rounded-xl border border-border bg-surface p-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <input value={c.industry} onChange={(e) => update(c.id, { industry: e.target.value })} placeholder="Отрасль" className={input} />
              <input value={c.equipment} onChange={(e) => update(c.id, { equipment: e.target.value })} placeholder="Оборудование" className={input} />
            </div>
            <textarea value={c.task} onChange={(e) => update(c.id, { task: e.target.value })} placeholder="Задача клиента" rows={2} className={`w-full ${input}`} />
            <textarea value={c.solution} onChange={(e) => update(c.id, { solution: e.target.value })} placeholder="Что сделала КАЮ" rows={2} className={`w-full ${input}`} />
            <input value={c.result} onChange={(e) => update(c.id, { result: e.target.value })} placeholder="Результат" className={`w-full ${input}`} />
            <input value={c.client} onChange={(e) => update(c.id, { client: e.target.value })} placeholder="Название заказчика (по разрешению)" className={`w-full ${input}`} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" checked={c.active} onChange={(e) => update(c.id, { active: e.target.checked })} className="accent-brand-600" /> Активен (показывать на сайте)
              </label>
              <button onClick={() => remove(c.id)} className="text-sm text-red-500 hover:underline">Удалить</button>
            </div>
          </div>
        ))}
        {cases.length === 0 && <p className="text-sm text-subtle">Кейсов пока нет.</p>}
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={status === "saving"} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-brand-contrast transition-colors hover:bg-brand-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-4 font-medium text-brand-700">Сохранено</span>}
        {status === "error" && <span className="ml-4 font-medium text-red-600">{error}</span>}
      </div>
    </div>
  );
}
