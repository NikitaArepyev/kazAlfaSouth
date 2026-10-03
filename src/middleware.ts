import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, ROLE_COOKIE, getAuthSecret } from "@/lib/auth";

const SECRET = getAuthSecret();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Login page is always reachable
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  const role = req.cookies.get(ROLE_COOKIE)?.value;

  if (cookie !== SECRET) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // Editor role: restrict to content editing only (no leads / settings)
  if (role === "editor") {
    if (pathname.startsWith("/admin/leads") || pathname.startsWith("/admin/settings")) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
