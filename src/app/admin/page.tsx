import Link from "next/link";
import { getContent } from "@/lib/content";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const content = await getContent();
  let leadsCount = 0;
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "leads.jsonl"), "utf8");
    leadsCount = raw.split("\n").filter(Boolean).length;
  } catch {
    leadsCount = 0;
  }

  const cards = [
    { label: "Активные бренды", value: content.brands.filter((b) => b.active).length, href: "/admin/brands" },
    { label: "Товары в каталоге", value: content.products.filter((p) => p.active).length, href: "/admin/products" },
    { label: "Кейсы", value: content.cases.filter((c) => c.active).length, href: "/admin/cases" },
    { label: "Заявки", value: leadsCount, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Дашборд</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-3xl font-bold text-accent-ink">{c.value}</div>
            <div className="mt-1 text-sm text-subtle">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-2 font-bold text-foreground">Быстрый старт</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Заполните контакты и теглайн в разделе «Контакты» и «Настройки / SEO».</li>
          <li>Добавьте подтверждённые бренды и опубликуйте кейсы после согласования с заказчиком.</li>
          <li>Заявки с форм сайта попадают в раздел «Заявки» и выгружаются в CSV.</li>
          <li>Не публикуйте официальные статусы без действующего документа.</li>
        </ul>
      </div>
    </div>
  );
}
