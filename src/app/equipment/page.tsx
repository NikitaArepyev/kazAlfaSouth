import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment",
    "Оборудование | КазАльфаЮг",
    "Передвижные и стационарные компрессоры, осушители и оборудование подготовки сжатого воздуха. Технический подбор оборудования под задачу заказчика."
  );
}

const CATEGORIES = [
  {
    title: "Передвижные компрессоры",
    description: "Дизельные и электрические компрессоры на шасси для строительных и дорожных работ.",
    features: ["Области применения", "Тип привода", "Рабочее давление", "Производительность"],
    href: "/equipment/mobile",
  },
  {
    title: "Стационарные компрессоры",
    description: "Винтовые и поршневые компрессоры для промышленных предприятий и цехов.",
    features: ["Режим работы", "Наличие резерва", "Качество воздуха", "Электросеть"],
    href: "/equipment/stationary",
  },
  {
    title: "Осушители и подготовка воздуха",
    description: "Оборудование для удаления влаги и очистки сжатого воздуха.",
    features: ["Рефрижераторные", "Адсорбционные", "Фильтры", "Сепараторы"],
    href: "/equipment/air-treatment",
  },
];

export default function EquipmentPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Оборудование" }]} />

      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-4xl font-bold mb-4">Оборудование</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Поставляем компрессорное оборудование от ведущих мировых производителей и выполняем технический
          подбор под ваши задачи. Точный перечень брендов и моделей подтверждается менеджером. Технические
          характеристики уточняются после согласования требований.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <span className="text-gray-400 font-bold text-lg">Фото ожидается</span>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{cat.description}</p>
                <ul className="space-y-2 mb-8">
                  {cat.features.map((feat, j) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <span className="text-blue-500">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Link href={cat.href} className="block text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 rounded-xl transition-all">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Нужен подбор оборудования?</h2>
          <p className="text-blue-200 mb-6">
            Направьте требуемые параметры — подготовим техническое решение и коммерческое предложение.
          </p>
          <Link href="/#request-form" className="inline-block bg-white text-blue-900 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">
            Запросить КП
          </Link>
        </div>
      </div>
    </div>
  );
}
