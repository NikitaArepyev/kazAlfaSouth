import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, ROLE_COOKIE, checkPassword, getAuthSecret } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const role = checkPassword(String(password || ""));
  if (!role) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(AUTH_COOKIE, getAuthSecret(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  res.cookies.set(ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
