import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import LeadForm from "@/components/LeadForm";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "home",
    "КазАльфаЮг — Компрессорное оборудование и сервис в Казахстане",
    "Поставка передвижных и стационарных компрессоров, оригинальных и альтернативных запасных частей, фильтров, сепараторов, масел и сервисных комплектов. Техническое обслуживание, диагностика и ремонт."
  );
}

const NEED_CARDS = [
  { title: "Купить оборудование", href: "/equipment", action: "Ведёт в раздел оборудования / опросный лист" },
  { title: "Подобрать запасную часть", href: "/#request-form", action: "Открывает техническую форму по номеру / модели" },
  { title: "Найти альтернативу оригиналу", href: "/#request-form", action: "Открывает форму подбора аналога" },
  { title: "Заказать сервис", href: "/service", action: "Ведёт на страницу сервиса" },
  { title: "Отправить в ремонт", href: "/#request-form", action: "Ведёт на форму ремонта" },
  { title: "Расходные материалы", href: "/consumables", action: "Ведёт на фильтры, масла и комплекты" },
];

export default async function Home() {
  const content = await getContent();
  const tagline = content.tagline;
  return (
    <div>
      {/* 6.1 Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {tagline}
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Поставляем передвижные и стационарные компрессоры, оригинальные и альтернативные запасные части, фильтры, сепараторы, масла и сервисные комплекты. Выполняем техническое обслуживание, диагностику и ремонт.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/#request-form" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">
                Запросить КП
              </Link>
              <Link href="/#request-form" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Подобрать запчасть
              </Link>
              <a href={`https://wa.me/${COMPANY_INFO.contacts.sales.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all">
                Написать в WhatsApp
              </a>
            </div>
            <p className="text-sm text-blue-200">
              Для расчёта направьте модель оборудования, серийный номер, партномер, фотографию детали или техническое задание.
            </p>
          </div>
        </div>
      </section>

      {/* 6.2 Trust Block */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex gap-4">
              <div className="text-blue-600 text-3xl">📅</div>
              <div>
                <div className="font-bold">Работаем с {COMPANY_INFO.foundedYear} года</div>
                <div className="text-sm text-gray-500">Стабильный опыт на рынке</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 text-3xl">📍</div>
              <div>
                <div className="font-bold">Казахстан и Центральная Азия</div>
                <div className="text-sm text-gray-500">Поставки в любой регион</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 text-3xl">⚙️</div>
              <div>
                <div className="font-bold">Технический подбор</div>
                <div className="text-sm text-gray-500">По модели и партномеру</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-blue-600 text-3xl">🛡️</div>
              <div>
                <div className="font-bold">Альтернативные решения</div>
                <div className="text-sm text-gray-500">Проверенные аналоги с гарантией</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 "What you need" Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что вам требуется?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEED_CARDS.map((card, i) => (
              <Link key={i} href={card.href} className="group p-8 border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                  <p className="text-gray-500 text-sm">{card.action}</p>
                </div>
                <div className="mt-8 text-blue-600 font-semibold flex items-center gap-2">
                  Перейти <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 Быстрый запрос */}
      <section id="request-form" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Быстрый запрос</h2>
            <p className="text-blue-200">Опишите вашу задачу, и мы подготовим предложение</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-gray-900">
            <LeadForm
              formType="quick_request"
              submitLabel="Отправить запрос"
              messageLabel="Кратко опишите запрос"
              messagePlaceholder="Модель оборудования, серийный номер, партномер, фотография детали или техническое задание"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
