import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/mobile",
    "Передвижные компрессоры | КазАльфаЮг",
    "Передвижные дизельные и электрические компрессоры на шасси: области применения, давление, производительность, варианты исполнения. Технический подбор под задачу."
  );
}

export default function MobileCompressorsPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Оборудование", href: "/equipment" },
          { name: "Передвижные компрессоры" },
        ]}
      />

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Передвижные компрессоры</h1>

        <p className="text-gray-600 mb-10 max-w-2xl">
          Передвижные компрессоры на шасси применяются на строительных площадках, в дорожном хозяйстве и на
          буровых работах. Подбираем дизельные и электрические модели под требуемые параметры.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            ["Области применения", "Строительство, дорожные работы, бурение, пескоструй."],
            ["Тип привода и рабочая среда", "Дизельный или электрический привод, сжатый воздух."],
            ["Рабочее давление", "Подбирается по инструменту и технологии (бар)."],
            ["Производительность", "Подача сжатого воздуха, м³/мин."],
            ["Условия эксплуатации", "Температура, запылённость, режим работы."],
            ["Варианты исполнения", "На шасси, на раме, с ресивером и осушением."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="font-bold mb-1">{t}</div>
              <div className="text-sm text-gray-500">{d}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12">
          <p className="text-blue-900 font-semibold">
            Для подбора укажите требуемые производительность, давление, режим работы и условия эксплуатации.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <LeadForm
            formType="equipment_mobile"
            title="Подобрать компрессор"
            submitLabel="Получить подбор и КП"
            messageLabel="Требования к компрессору"
            messagePlaceholder="Производительность (м³/мин), давление (бар), привод, условия эксплуатации"
            extraFields={[
              { name: "pressure", label: "Рабочее давление, бар" },
              { name: "flow", label: "Производительность, м³/мин" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
