"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { track, getUtm } from "@/lib/analytics";
import { DURATIONS, EASE_OUT, translateScale } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { CheckCircle, Warning, CircleNotch, PaperPlaneTilt } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

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

const inputCls =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors duration-200 focus:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

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
  const reduce = useReducedMotion();

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
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: translateScale(0, 18, 0.96) }}
        animate={{ opacity: 1, transform: translateScale(0, 0, 1) }}
        transition={{ duration: DURATIONS.medium, ease: EASE_OUT }}
        className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm"
      >
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle className="h-7 w-7" weight="fill" />
        </span>
        <h3 className="text-xl font-bold text-foreground">Заявка отправлена</h3>
        <p className="mt-2 text-sm text-muted">
          Спасибо! Мы получили ваши данные и свяжемся с вами. Применимость и срок уточняются после проверки.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      {title && <h3 className="text-xl font-bold text-foreground">{title}</h3>}

      <div className={cn("grid grid-cols-1 gap-4", compact && "md:grid-cols-2")}>
        <div>
          <label className={labelCls} htmlFor={`${formType}-name`}>
            Имя <span className="text-brand-600">*</span>
          </label>
          <input
            id={`${formType}-name`}
            required
            name="name"
            type="text"
            className={inputCls}
            placeholder="Как к вам обращаться"
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${formType}-contact`}>
            Телефон / WhatsApp / E-mail <span className="text-brand-600">*</span>
          </label>
          <input
            id={`${formType}-contact`}
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
          <label className={labelCls} htmlFor={`${formType}-${f.name}`}>
            {f.label}
            {f.required ? <span className="text-brand-600"> *</span> : ""}
          </label>
          {f.textarea ? (
            <textarea
              id={`${formType}-${f.name}`}
              name={f.name}
              rows={3}
              className={inputCls}
              placeholder={f.placeholder}
              required={f.required}
            />
          ) : (
            <input
              id={`${formType}-${f.name}`}
              name={f.name}
              type="text"
              className={inputCls}
              placeholder={f.placeholder}
              required={f.required}
            />
          )}
        </div>
      ))}

      <div>
        <label className={labelCls} htmlFor={`${formType}-company`}>
          Компания
        </label>
        <input
          id={`${formType}-company`}
          name="company"
          type="text"
          className={inputCls}
          placeholder="Необязательно"
        />
      </div>

      <div>
        <label className={labelCls} htmlFor={`${formType}-message`}>
          {messageLabel} <span className="text-brand-600">*</span>
        </label>
        <textarea
          id={`${formType}-message`}
          required
          name="message"
          rows={4}
          className={inputCls}
          placeholder={messagePlaceholder}
        />
      </div>

      {showFile && (
        <div>
          <label className={labelCls} htmlFor={`${formType}-file`}>
            Файл / фото / ТЗ / список запчастей (PDF, DOC, XLS, JPG, PNG)
          </label>
          <input
            id={`${formType}-file`}
            name="file"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-contrast hover:file:bg-brand-700"
          />
        </div>
      )}

      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-start gap-3 text-xs text-muted">
        <input required type="checkbox" className="mt-1 accent-brand-600" />
        <span>
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/policy" className="font-medium text-brand-700 underline">
            политикой обработки персональных данных
          </a>
          . Мы проверим запрос и подготовим предложение.
        </span>
      </div>

      {status === "error" && (
        <motion.p
          initial={reduce ? false : { opacity: 0, transform: translateScale(0, 8, 0.98) }}
          animate={{ opacity: 1, transform: translateScale(0, 0, 1) }}
          transition={{ duration: DURATIONS.short, ease: EASE_OUT }}
          className="flex items-center gap-2 text-sm font-medium text-red-600"
        >
          <Warning className="h-4 w-4 shrink-0" weight="fill" /> {error}
        </motion.p>
      )}

      <Button
        type="submit"
        disabled={status === "sending"}
        fullWidth
        icon={
          status === "sending" ? (
            <CircleNotch className="h-4 w-4 animate-spin" weight="bold" />
          ) : (
            <PaperPlaneTilt className="h-4 w-4" weight="bold" />
          )
        }
      >
        {status === "sending" ? "Отправка..." : submitLabel}
      </Button>
    </form>
  );
}
