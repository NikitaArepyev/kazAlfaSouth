import nodemailer from "nodemailer";
import type { Lead } from "./leads";

export type Attachment = { name: string; type: string; buffer: Buffer };

export type NotifyResult = { telegram: boolean; email: boolean; configured: boolean };

const FORM_LABELS: Record<string, string> = {
  lead: "Заявка с сайта",
  quote: "Запрос коммерческого предложения",
  service: "Заявка на сервис",
  parts: "Запрос запчастей",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function leadLines(lead: Lead): [string, string][] {
  const lines: [string, string][] = [
    ["Имя", lead.name],
    ["Контакт", lead.contact],
  ];
  if (lead.company) lines.push(["Компания", lead.company]);
  if (lead.message) lines.push(["Сообщение", lead.message]);
  for (const [k, v] of Object.entries(lead.extra ?? {})) lines.push([k, v]);
  if (lead.file) lines.push(["Файл", `${lead.file.name} (${formatSize(lead.file.size)})`]);
  if (lead.pageUrl) lines.push(["Страница", lead.pageUrl]);
  for (const [k, v] of Object.entries(lead.utm ?? {})) lines.push([`utm_${k}`, v]);
  lines.push(["Время", new Date(lead.createdAt).toLocaleString("ru-RU")]);
  return lines;
}

async function sendTelegram(lead: Lead, attachment?: Attachment): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const api = `https://api.telegram.org/bot${token}`;
  const title = FORM_LABELS[lead.formType] ?? "Заявка с сайта";
  const text = [
    `<b>${escapeHtml(title)}</b>`,
    "",
    ...leadLines(lead).map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`),
  ].join("\n");

  try {
    const res = await fetch(`${api}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      }),
    });
    if (!res.ok) {
      console.error("[notify] telegram sendMessage failed:", res.status, await res.text());
      return false;
    }

    if (attachment) {
      const form = new FormData();
      form.append("chat_id", chatId);
      form.append(
        "document",
        new Blob([new Uint8Array(attachment.buffer)], { type: attachment.type }),
        attachment.name
      );
      const fileRes = await fetch(`${api}/sendDocument`, { method: "POST", body: form });
      // The text already reached the owner, so a failed attachment must not void the lead.
      if (!fileRes.ok) {
        await fetch(`${api}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `⚠️ Не удалось доставить вложение «${attachment.name}». Запросите файл у клиента.`,
          }),
        });
      }
    }
    return true;
  } catch (e) {
    console.error("[notify] telegram error:", e);
    return false;
  }
}

async function sendEmail(lead: Lead, attachment?: Attachment): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || user;
  if (!host || !user || !pass || !to) return false;

  const port = Number(process.env.SMTP_PORT) || 465;
  const title = FORM_LABELS[lead.formType] ?? "Заявка с сайта";
  const rows = leadLines(lead)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `"Сайт КазАльфаЮг" <${user}>`,
      to,
      replyTo: lead.contact.includes("@") ? lead.contact : undefined,
      subject: `${title} — ${lead.name}`,
      text: leadLines(lead)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
      html: `<h2>${escapeHtml(title)}</h2><table>${rows}</table>`,
      attachments: attachment
        ? [{ filename: attachment.name, content: attachment.buffer, contentType: attachment.type }]
        : undefined,
    });
    return true;
  } catch {
    return false;
  }
}

export async function notifyLead(lead: Lead, attachment?: Attachment): Promise<NotifyResult> {
  const configured = Boolean(
    (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
  const [telegram, email] = await Promise.all([sendTelegram(lead, attachment), sendEmail(lead, attachment)]);
  return { telegram, email, configured };
}
