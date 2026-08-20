import { COMPANY_INFO } from "@/lib/constants";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "spare-parts",
    "Запасные части для компрессоров | КазАльфаЮг",
    "Оригинальные и проверенные альтернативные запасные части, фильтры, сепараторы, сервисные комплекты для компрессоров Atlas Copco, CompAir, ELGi и других брендов. Подбор по модели и партномеру."
  );
}

export default function SparePartsPage() {
  const parts = [
    "Оригинальные запасные части",
    "Проверенные альтернативные решения",
    "Сервисные комплекты",
    "Фильтры и сепараторы",
    "Клапаны и датчики",
    "Ремни, прокладки и уплотнения",
    "Узлы компрессорной части",
    "Электрические компоненты и контроллеры",
  ];

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Запасные части" }]} />

      <div className="container mx-auto px-4 max-w-5xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Запасные части</h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12">
          <p className="text-blue-900 font-semibold italic">
            «Для точного подбора предоставьте бренд, модель, серийный номер оборудования и партномер детали, если он известен. Применимость подтверждается после инженерной проверки.»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-600 mb-8">
              Мы поставляем полный спектр запасных частей для компрессоров Atlas Copco, CompAir, ELGi и других брендов.
              В наличии и под заказ как оригинальные детали, так и проверенные аналоги.
            </p>
            <h3 className="font-bold text-lg mb-4">Что мы поставляем:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {parts.map((part, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span> {part}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <h4 className="font-bold mb-2">Нужен аналог оригинала?</h4>
              <p className="text-sm text-gray-600">
                Пришлите номер оригинала, бренд, модель и требования — мы проверим возможность поставки проверенной альтернативы.
                Совместимость подтверждается после инженерной проверки.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <LeadForm
              formType="spare_parts"
              title="Запрос на подбор"
              submitLabel="Отправить на подбор"
              messageLabel="Список необходимых запчастей / партномеров"
              messagePlaceholder="Укажите бренд, модель, партномер детали и количество. Можно прикрепить файл со списком."
              extraFields={[
                {
                  name: "equipment",
                  label: "Модель оборудования / Серийный номер",
                  placeholder: "Например, Atlas Copco XAS 185, сер. № ...",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
