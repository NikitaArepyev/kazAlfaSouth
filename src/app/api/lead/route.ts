import { NextRequest, NextResponse } from "next/server";
import { appendLead, saveUpload, type Lead } from "@/lib/leads";
import { notifyLead } from "@/lib/notify";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/quicktime",
];
// Kept under both the Telegram bot upload cap and typical mailbox attachment limits.
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректные данные формы" }, { status: 400 });
  }

  // Spam honeypot
  const hp = (data.get("hp") as string) || "";
  if (hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const formType = (data.get("formType") as string) || "unknown";
  const name = ((data.get("name") as string) || "").trim();
  const contact = ((data.get("contact") as string) || "").trim();
  const company = ((data.get("company") as string) || "").trim() || undefined;
  const message = ((data.get("message") as string) || "").trim() || undefined;

  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "Укажите имя и контакт" }, { status: 400 });
  }

  const extra: Record<string, string> = {};
  for (const key of data.keys()) {
    if (["hp", "formType", "name", "contact", "company", "message", "file", "pageUrl", "referrer", "createdAt"].includes(key)) continue;
    const v = data.get(key);
    if (typeof v === "string" && v.trim()) extra[key] = v.trim();
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const lead: Lead = {
    id,
    formType,
    name,
    contact,
    company,
    message,
    extra,
    pageUrl: (data.get("pageUrl") as string) || req.headers.get("referer") || "",
    referrer: (data.get("referrer") as string) || "",
    utm: data.get("utm") ? safeParseUtm(data.get("utm") as string) : undefined,
    createdAt: new Date().toISOString(),
  };

  const file = data.get("file");
  let attachment: { name: string; type: string; buffer: Buffer } | undefined;
  if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
    const f = file as File;
    if (!ALLOWED_TYPES.includes(f.type)) {
      return NextResponse.json({ ok: false, error: "Недопустимый тип файла" }, { status: 400 });
    }
    if (f.size > MAX_FILE_SIZE) {
      return NextResponse.json({ ok: false, error: "Файл слишком большой (макс. 25 МБ)" }, { status: 400 });
    }
    const buffer = Buffer.from(await f.arrayBuffer());
    attachment = { name: f.name, type: f.type, buffer };
    try {
      const savedAs = await saveUpload(buffer, f.name, id);
      lead.file = { name: f.name, size: f.size, type: f.type, savedAs };
    } catch {
      return NextResponse.json({ ok: false, error: "Не удалось сохранить файл" }, { status: 500 });
    }
  }

  try {
    await appendLead(lead);
  } catch {
    return NextResponse.json({ ok: false, error: "Ошибка сохранения заявки" }, { status: 500 });
  }

  // The disk is ephemeral on the host, so a configured channel failing everywhere means the lead is lost.
  const delivery = await notifyLead(lead, attachment);
  if (delivery.configured && !delivery.telegram && !delivery.email) {
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Напишите нам в WhatsApp — мы ответим сразу." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id });
}

function safeParseUtm(raw: string): Record<string, string> {
  try {
    const o = JSON.parse(raw);
    return typeof o === "object" && o !== null ? o : {};
  } catch {
    return {};
  }
}
