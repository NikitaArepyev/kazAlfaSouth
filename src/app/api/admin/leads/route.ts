import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { AUTH_COOKIE, getAuthSecret } from "@/lib/auth";

export const runtime = "nodejs";

function authorized(req: NextRequest): boolean {
  return req.cookies.get(AUTH_COOKIE)?.value === getAuthSecret();
}

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "Не авторизован" }, { status: 401 });
  }

  const file = path.join(process.cwd(), "data", "leads.jsonl");
  let raw = "";
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return new NextResponse("id,formType,name,contact,company,message,extra,pageUrl,referrer,createdAt\n", {
      headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="leads.csv"' },
    });
  }

  const rows = raw.split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const header = ["id", "formType", "name", "contact", "company", "message", "extra", "pageUrl", "referrer", "createdAt"];
  const lines = [header.map(csvEscape).join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.formType,
        r.name,
        r.contact,
        r.company || "",
        r.message || "",
        r.extra ? JSON.stringify(r.extra) : "",
        r.pageUrl || "",
        r.referrer || "",
        r.createdAt,
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads.csv"',
    },
  });
}
