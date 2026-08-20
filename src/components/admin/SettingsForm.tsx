"use client";

import { useState } from "react";

type Seo = Record<string, { title?: string; description?: string }>;

const PAGES: { key: string; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "equipment", label: "Оборудование" },
  { key: "spare-parts", label: "Запасные части" },
  { key: "consumables", label: "Расходные материалы" },
  { key: "service", label: "Сервис и ремонт" },
  { key: "brands", label: "Бренды" },
  { key: "projects", label: "Опыт работы" },
  { key: "about", label: "О компании" },
  { key: "contacts", label: "Контакты" },
];

export default function SettingsForm({ tagline, seo }: { tagline: string; seo: Seo }) {
  const [tg, setTg] = useState(tagline);
  const [data, setData] = useState<Seo>(seo);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update(key: string, field: "title" | "description", val: string) {
    setData((d) => ({ ...d, [key]: { ...d[key], [field]: val } }));
  }

  async function save() {
    setStatus("saving");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "settings", data: { tagline: tg, seo: data } }),
    });
    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Настройки и SEO</h1>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 max-w-3xl mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Теглайн (слоган) сайта</label>
          <input value={tg} onChange={(e) => setTg(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3" />
        </div>
      </div>

      <h2 className="text-lg font-bold mb-3">SEO по страницам</h2>
      <div className="space-y-4">
        {PAGES.map((p) => (
          <div key={p.key} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="font-semibold mb-2">{p.label}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input value={data[p.key]?.title || ""} onChange={(e) => update(p.key, "title", e.target.value)} placeholder="Title" className="border border-gray-300 rounded-lg p-2" />
              <input value={data[p.key]?.description || ""} onChange={(e) => update(p.key, "description", e.target.value)} placeholder="Description" className="border border-gray-300 rounded-lg p-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={status === "saving"} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-3 text-green-600 font-medium">Сохранено</span>}
        {status === "error" && <span className="ml-3 text-red-600 font-medium">Ошибка</span>}
      </div>
    </div>
  );
}
