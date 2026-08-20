import { COMPANY_INFO } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "about",
    "О компании | КазАльфаЮг",
    "ТОО «КазАльфаЮг» работает с 2014 года: поставка компрессорного оборудования, запасных частей и расходных материалов, техническое обслуживание и ремонт промышленного оборудования в Казахстане и Центральной Азии."
  );
}

export default function AboutPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "О компании" }]} />

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        <h1 className="text-4xl font-bold mb-8">О компании</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="font-semibold text-xl text-blue-900 italic border-l-4 border-blue-600 pl-6 py-2">
            «{COMPANY_INFO.name} работает с {COMPANY_INFO.foundedYear} года. Компания поставляет компрессорное оборудование, запасные части и расходные материалы, а также оказывает услуги по техническому обслуживанию и ремонту промышленного оборудования.»
          </p>

          <p>
            За годы работы мы зарекомендовали себя как надежный поставщик технических решений для предприятий Казахстана и Центральной Азии. Наши специалисты обладают глубокими знаниями в области систем сжатого воздуха.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Наши направления</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            <li className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl font-medium">
              <span className="text-blue-500">✔</span> Передвижные и стационарные компрессоры
            </li>
            <li className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl font-medium">
              <span className="text-blue-500">✔</span> Запасные части и расходные материалы
            </li>
            <li className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl font-medium">
              <span className="text-blue-500">✔</span> Осушители и подготовка воздуха
            </li>
            <li className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl font-medium">
              <span className="text-blue-500">✔</span> Техническое обслуживание и сложный ремонт
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Почему выбирают нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="font-bold mb-2">Техническая экспертиза</h3>
              <p className="text-sm text-gray-500">Профессиональный подбор оборудования и запчастей под конкретные задачи.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-bold mb-2">География поставок</h3>
              <p className="text-sm text-gray-500">Работаем по всему Казахстану и странам Центральной Азии.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold mb-2">Долгосрочное партнерство</h3>
              <p className="text-sm text-gray-500">Обеспечиваем поддержку и сервис на протяжении всего срока службы техники.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 p-10 bg-gray-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Нужна консультация?</h2>
            <p className="text-gray-600">Свяжитесь с нами для получения подробной информации.</p>
          </div>
          <a href="/contacts" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Перейти к контактам
          </a>
        </div>
      </div>
    </div>
  );
}
