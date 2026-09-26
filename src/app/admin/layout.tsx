import Link from "next/link";
import { cookies } from "next/headers";
import { ROLE_COOKIE } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = (await cookies()).get(ROLE_COOKIE)?.value || "admin";
  const isAdmin = role === "admin";

  const links = [
    { href: "/admin", label: "Дашборд" },
    { href: "/admin/brands", label: "Бренды" },
    { href: "/admin/products", label: "Товары" },
    { href: "/admin/cases", label: "Кейсы" },
    { href: "/admin/contacts", label: "Контакты" },
  ];
  if (isAdmin) {
    links.push({ href: "/admin/leads", label: "Заявки" });
    links.push({ href: "/admin/settings", label: "Настройки / SEO" });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-60 flex-col border-r border-border bg-surface-2">
        <div className="border-b border-border p-4 font-bold tracking-tight text-foreground">
          КАЗ<span className="text-accent-ink">АЛЬФА</span>ЮГ · CMS
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-accent-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <div className="px-3 text-xs text-subtle">Роль: {isAdmin ? "Администратор" : "Редактор"}</div>
          <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-accent-ink">
            ← На сайт
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-background p-8">{children}</main>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="post">
          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-surface">
            Выйти
          </button>
    </form>
  );
}
