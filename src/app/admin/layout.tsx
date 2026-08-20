import Link from "next/link";
import { cookies } from "next/headers";
import { ROLE_COOKIE } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = (await cookies()).get(ROLE_COOKIE)?.value || "admin";
  const isAdmin = role === "admin";

  const links = [
    { href: "/admin", label: "Дашборд" },
    { href: "/admin/brands", label: "Бренды" },
    { href: "/admin/cases", label: "Кейсы" },
    { href: "/admin/contacts", label: "Контакты" },
  ];
  if (isAdmin) {
    links.push({ href: "/admin/leads", label: "Заявки" });
    links.push({ href: "/admin/settings", label: "Настройки / SEO" });
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="p-4 font-bold border-b border-gray-700">КазАльфаЮг · CMS</div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-700 space-y-1">
          <div className="text-xs text-gray-400 px-3">Роль: {isAdmin ? "Администратор" : "Редактор"}</div>
          <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-sm">
            ← На сайт
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="post">
      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-sm text-red-300">
        Выйти
      </button>
    </form>
  );
}
