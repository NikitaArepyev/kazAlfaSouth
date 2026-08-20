import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "projects",
    "Опыт работы | КазАльфаЮг",
    "Опыт ТОО «КазАльфаЮг» в поставках компрессорного оборудования, запасных частей и сервисе для предприятий Казахстана и Центральной Азии. Отрасли заказчиков и подход к работе с запросом."
  );
}

const INDUSTRIES = [
  "Строительство и дорожное хозяйство",
  "Горнодобывающая промышленность",
  "Нефтегазовый сектор",
  "Пищевое производство",
  "Коммунальные службы и ЖКХ",
  "Производственные предприятия",
];

export default async function ProjectsPage() {
  const content = await getContent();
  const cases = content.cases.filter((c) => c.active);

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Опыт работы" }]} />

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Опыт работы</h1>

        <p className="text-gray-600 mb-12 max-w-2xl">
          С 2014 года ТОО «КазАльфаЮг» поставляет компрессорное оборудование, запасные части и расходные
          материалы, а также выполняет техническое обслуживание и ремонт промышленного оборудования.
          Детальные кейсы публикуются после согласования с заказчиками и подтверждения права на раскрытие.
        </p>

        {cases.length > 0 && (
          <div className="space-y-6 mb-16">
            {cases.map((c) => (
              <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {c.industry && <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{c.industry}</span>}
                  {c.equipment && <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{c.equipment}</span>}
                </div>
                <h3 className="text-xl font-bold mb-4">{c.client ? c.client : "Проект по запросу заказчика"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><div className="font-semibold text-gray-700 mb-1">Задача</div><div className="text-gray-600">{c.task}</div></div>
                  <div><div className="font-semibold text-gray-700 mb-1">Решение</div><div className="text-gray-600">{c.solution}</div></div>
                  <div><div className="font-semibold text-gray-700 mb-1">Результат</div><div className="text-gray-600">{c.result}</div></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Отрасли заказчиков</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {INDUSTRIES.map((ind, i) => (
            <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl font-medium">
              <span className="text-blue-500">✔</span> {ind}
            </li>
          ))}
        </ul>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Нужен подбор или расчёт?</h2>
          <p className="text-gray-600 mb-6">
            Направьте модель оборудования, серийный номер, партномер или техническое задание — подготовим предложение.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#request-form" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Запросить предложение
            </Link>
            <Link href="/contacts" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
              Контакты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
