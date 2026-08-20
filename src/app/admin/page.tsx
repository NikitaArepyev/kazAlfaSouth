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
    { label: "Кейсы", value: content.cases.filter((c) => c.active).length, href: "/admin/cases" },
    { label: "Заявки", value: leadsCount, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-blue-900">{c.value}</div>
            <div className="text-sm text-gray-500 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h2 className="font-bold mb-2">Быстрый старт</h2>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Заполните контакты и теглайн в разделе «Контакты» и «Настройки / SEO».</li>
          <li>Добавьте подтверждённые бренды и опубликуйте кейсы после согласования с заказчиком.</li>
          <li>Заявки с форм сайта попадают в раздел «Заявки» и выгружаются в CSV.</li>
          <li>Не публикуйте официальные статусы без действующего документа.</li>
        </ul>
      </div>
    </div>
  );
}
