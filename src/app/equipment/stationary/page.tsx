import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/stationary",
    "Стационарные компрессоры | КазАльфаЮг",
    "Стационарные винтовые и поршневые компрессоры для промышленных предприятий: производительность, давление, качество воздуха, осушение и фильтрация. Технический подбор и КП."
  );
}

export default function StationaryCompressorsPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Оборудование", href: "/equipment" },
          { name: "Стационарные компрессоры" },
        ]}
      />

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Стационарные компрессоры</h1>

        <p className="text-gray-600 mb-10 max-w-2xl">
          Стационарные винтовые и поршневые компрессоры для цехов и производств. Подбираем решение под
          требуемое качество сжатого воздуха, режим работы и параметры электросети.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            ["Требуемая производительность", "Подача сжатого воздуха, м³/мин."],
            ["Рабочее давление", "Необходимое давление на выходе, бар."],
            ["Режим работы", "Непрерывный или периодический."],
            ["Наличие резерва", "Нужен ли резервный компрессор."],
            ["Качество сжатого воздуха", "Класс чистоты по ISO 8573-1."],
            ["Осушитель и фильтрация", "Точка росы, магистральные фильтры."],
            ["Параметры электросети", "Напряжение и мощность."],
            ["Условия размещения", "Помещение, вентиляция, площадь."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="font-bold mb-1">{t}</div>
              <div className="text-sm text-gray-500">{d}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <LeadForm
            formType="equipment_stationary"
            title="Получить подбор и КП"
            submitLabel="Получить подбор и КП"
            messageLabel="Требования к компрессорной станции"
            messagePlaceholder="Производительность, давление, качество воздуха, режим работы, параметры сети"
            extraFields={[
              { name: "pressure", label: "Рабочее давление, бар" },
              { name: "flow", label: "Производительность, м³/мин" },
              { name: "air_quality", label: "Требуемое качество воздуха / класс" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
