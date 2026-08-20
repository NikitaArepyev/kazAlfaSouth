export const AUTH_COOKIE = "ka_auth";
export const ROLE_COOKIE = "ka_role";

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET || "dev-secret-change-me";
}

export function checkPassword(password: string): "admin" | "editor" | null {
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) return "admin";
  if (process.env.ADMIN_EDITOR_PASSWORD && password === process.env.ADMIN_EDITOR_PASSWORD) return "editor";
  // Dev fallback so the admin is reachable without env during local work
  if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_EDITOR_PASSWORD && password === "admin123") return "admin";
  return null;
}
