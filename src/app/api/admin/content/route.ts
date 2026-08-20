import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { AUTH_COOKIE, ROLE_COOKIE, getAuthSecret } from "@/lib/auth";

export const runtime = "nodejs";

function authorized(req: NextRequest, requireAdmin = false): boolean {
  if (req.cookies.get(AUTH_COOKIE)?.value !== getAuthSecret()) return false;
  if (requireAdmin && req.cookies.get(ROLE_COOKIE)?.value !== "admin") return false;
  return true;
}

export async function PUT(req: NextRequest) {
  const { section, data } = await req.json().catch(() => ({ section: "", data: null }));
  if (!section || data == null) {
    return NextResponse.json({ ok: false, error: "Неверные данные" }, { status: 400 });
  }

  if (section === "settings" && !authorized(req, true)) {
    return NextResponse.json({ ok: false, error: "Доступ запрещён" }, { status: 403 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "Не авторизован" }, { status: 401 });
  }

  const content = await getContent();
  if (section === "brands") content.brands = data;
  else if (section === "cases") content.cases = data;
  else if (section === "contacts") content.contacts = { ...content.contacts, ...data };
  else if (section === "settings") {
    content.tagline = data.tagline ?? content.tagline;
    content.seo = data.seo ?? content.seo;
  } else {
    return NextResponse.json({ ok: false, error: "Неизвестная секция" }, { status: 400 });
  }

  await saveContent(content);
  return NextResponse.json({ ok: true });
}
