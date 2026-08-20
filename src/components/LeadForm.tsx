"use client";

import { useState } from "react";
import { track, getUtm } from "@/lib/analytics";

export type ExtraField = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
};

type Props = {
  formType: string;
  title?: string;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  showFile?: boolean;
  extraFields?: ExtraField[];
  compact?: boolean;
};

export default function LeadForm({
  formType,
  title,
  submitLabel = "Отправить запрос",
  messageLabel = "Кратко опишите запрос",
  messagePlaceholder = "Модель оборудования, серийный номер, партномер, фото или техническое задание",
  showFile = true,
  extraFields = [],
  compact = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("formType", formType);
    fd.set("pageUrl", window.location.href);
    fd.set("referrer", document.referrer || "");
    fd.set("utm", JSON.stringify(getUtm()));

    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        track("lead_submit", { form_type: formType, page: window.location.pathname });
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
        track("form_error", { form_type: formType });
      }
    } catch {
      setStatus("error");
      setError("Ошибка сети. Попробуйте ещё раз или напишите нам в WhatsApp.");
      track("form_error", { form_type: formType });
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-2xl border border-green-200 bg-green-50 p-8 text-center ${compact ? "" : ""}`}>
        <div className="text-3xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Заявка отправлена</h3>
        <p className="text-green-800 text-sm">
          Спасибо! Мы получили ваши данные и свяжемся с вами. Применимость и срок уточняются после проверки.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      {title && <h3 className="font-bold text-xl mb-2">{title}</h3>}

      <div className={compact ? "" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label className="block text-sm font-medium mb-1">Имя *</label>
          <input required name="name" type="text" className={inputCls} placeholder="Как к вам обращаться" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Телефон / WhatsApp / E-mail *</label>
          <input
            required
            name="contact"
            type="text"
            className={inputCls}
            placeholder="+7 ___ или e-mail"
          />
        </div>
      </div>

      {extraFields.map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-medium mb-1">
            {f.label}
            {f.required ? " *" : ""}
          </label>
          {f.textarea ? (
            <textarea name={f.name} rows={3} className={inputCls} placeholder={f.placeholder} required={f.required} />
          ) : (
            <input name={f.name} type="text" className={inputCls} placeholder={f.placeholder} required={f.required} />
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-1">Компания</label>
        <input name="company" type="text" className={inputCls} placeholder="Необязательно" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{messageLabel} *</label>
        <textarea required name="message" rows={4} className={inputCls} placeholder={messagePlaceholder} />
      </div>

      {showFile && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Файл / фото / ТЗ / список запчастей (PDF, DOC, XLS, JPG, PNG)
          </label>
          <input
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            className="w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white"
          />
        </div>
      )}

      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-start gap-3 text-xs text-gray-500">
        <input required type="checkbox" className="mt-1" />
        <span>
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/policy" className="text-blue-600 underline">
            политикой обработки персональных данных
          </a>
          . Мы проверим запрос и подготовим предложение.
        </span>
      </div>

      {status === "error" && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all shadow-md"
      >
        {status === "sending" ? "Отправка..." : submitLabel}
      </button>
    </form>
  );
}
