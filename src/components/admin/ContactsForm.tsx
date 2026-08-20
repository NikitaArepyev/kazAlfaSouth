"use client";

import { useState } from "react";
import type { Contacts } from "@/lib/content";

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
      <h1 className="text-2xl font-bold mb-4">Контакты</h1>
      <p className="text-sm text-gray-500 mb-6">Эти данные используются в шапке, подвале и на странице «Контакты».</p>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 max-w-2xl">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium mb-1">{f.label}</label>
            <input
              value={contacts[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
        ))}
        <button onClick={save} disabled={status === "saving"} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-60">
          {status === "saving" ? "Сохранение..." : "Сохранить"}
        </button>
        {status === "saved" && <span className="ml-3 text-green-600 font-medium">Сохранено</span>}
        {status === "error" && <span className="ml-3 text-red-600 font-medium">Ошибка</span>}
      </div>
    </div>
  );
}
