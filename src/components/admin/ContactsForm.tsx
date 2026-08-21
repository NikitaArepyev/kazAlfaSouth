"use client";

import { useState } from "react";
import type { Contacts } from "@/lib/content";

const input =
  "w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-subtle focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

const FIELDS: { key: keyof Contacts; label: string; placeholder?: string }[] = [
  { key: "salesName", label: "Отдел продаж — имя" },
  { key: "salesPhone", label: "Отдел продаж — телефон", placeholder: "+7 705 993 88 88" },
  { key: "salesWhatsapp", label: "WhatsApp (цифры, без +)", placeholder: "77059938888" },
  { key: "salesEmail", label: "Отдел продаж — e-mail" },
  { key: "generalPhone", label: "Общий телефон" },
  { key: "generalEmail", label: "Общий e-mail" },
  { key: "addressAlmaty", label: "Адрес — Алматы" },
  { key: "addressShymkent", label: "Адрес — Шымкент" },
];

export default function ContactsForm({ initial }: { initial: Contacts }) {
  const [contacts, setContacts] = useState<Contacts>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function update(key: keyof Contacts, val: string) {
    setContacts((c) => ({ ...c, [key]: val }));
  }

  async function save() {
    setStatus("saving");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "contacts", data: contacts }),
    });
    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Контакты</h1>
      <p className="mb-6 text-sm text-muted">Эти данные используются в шапке, подвале и на странице «Контакты».</p>
      <div className="max-w-2xl space-y-4 rounded-2xl border border-border bg-surface p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-sm font-medium text-foreground">{f.label}</label>
            <input
              value={contacts[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className={input}
            />
          </div>
        ))}
        <button onClick={save} disabled={status === "saving"} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-brand-contrast transition-colors hover:bg-brand-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-3 font-medium text-brand-700">Сохранено</span>}
        {status === "error" && <span className="ml-3 font-medium text-red-600">Ошибка</span>}
      </div>
    </div>
  );
}
