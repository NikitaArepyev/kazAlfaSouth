import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "consumables",
    "Расходные материалы для компрессоров | КазАльфаЮг",
    "Воздушные, масляные и топливные фильтры, сепараторы, компрессорные масла и сервисные комплекты для планового ТО компрессоров. Запрос комплекта по модели и моточасам."
  );
}

const CATEGORIES = [
  "Воздушные фильтры",
  "Масляные фильтры",
  "Топливные фильтры",
  "Сепараторы",
  "Компрессорные масла",
  "Сервисные комплекты",
  "Расходные материалы для планового ТО",
];

export default function ConsumablesPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Расходные материалы" }]} />

      <div className="container mx-auto px-4 max-w-5xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Расходные материалы</h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12">
          <p className="text-blue-900 font-semibold italic">
            «Для точного подбора предоставьте бренд, модель, серийный номер оборудования и партномер детали, если он известен. Применимость подтверждается после инженерной проверки.»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-600 mb-8">
              Поставляем расходные материалы для планового технического обслуживания компрессоров:
              фильтры, сепараторы, компрессорные масла и готовые сервисные комплекты.
            </p>
            <h3 className="font-bold text-lg mb-4">Что мы поставляем:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {CATEGORIES.map((c, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <LeadForm
              formType="consumables_to"
              title="Запросить комплект ТО"
              submitLabel="Запросить комплект"
              messageLabel="Комментарий к заявке"
              messagePlaceholder="Дополнительные требования или вопросы"
              extraFields={[
                { name: "brand", label: "Бренд", placeholder: "Например, Atlas Copco, CompAir, ELGi" },
                { name: "model", label: "Модель оборудования", placeholder: "Модель компрессора" },
                { name: "serial", label: "Серийный номер", placeholder: "Серийный №" },
                { name: "motohours", label: "Моточасы", placeholder: "Наработка, ч" },
                { name: "to_type", label: "Вид ТО", placeholder: "Например, ТО-1000, ТО-4000" },
                { name: "qty", label: "Количество комплектов", placeholder: "1" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
