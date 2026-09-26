"use client";

import { useState } from "react";

type Seo = Record<string, { title?: string; description?: string }>;

const input =
  "rounded-lg border border-border bg-surface p-2 text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

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
      <h1 className="mb-4 text-2xl font-bold text-foreground">Настройки и SEO</h1>
      <div className="mb-6 max-w-3xl space-y-4 rounded-2xl border border-border bg-surface p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Теглайн (слоган) сайта</label>
          <input value={tg} onChange={(e) => setTg(e.target.value)} className={`w-full ${input}`} />
        </div>
      </div>

      <h2 className="mb-3 text-lg font-bold text-foreground">SEO по страницам</h2>
      <div className="space-y-4">
        {PAGES.map((p) => (
          <div key={p.key} className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-2 font-semibold text-foreground">{p.label}</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <input value={data[p.key]?.title || ""} onChange={(e) => update(p.key, "title", e.target.value)} placeholder="Title" className={input} />
              <input value={data[p.key]?.description || ""} onChange={(e) => update(p.key, "description", e.target.value)} placeholder="Description" className={input} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={save} disabled={status === "saving"} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-brand-contrast transition-colors hover:bg-brand-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-3 font-medium text-accent-ink">Сохранено</span>}
        {status === "error" && <span className="ml-3 font-medium text-red-600">Ошибка</span>}
      </div>
    </div>
  );
}
