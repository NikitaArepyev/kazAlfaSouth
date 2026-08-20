import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/air-treatment",
    "Осушители и подготовка воздуха | КазАльфаЮг",
    "Рефрижераторные и адсорбционные осушители, магистральные фильтры, сепарация и отвод конденсата. Подбор системы подготовки сжатого воздуха."
  );
}

export default function AirTreatmentPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Оборудование", href: "/equipment" },
          { name: "Осушители и подготовка воздуха" },
        ]}
      />

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        <h1 className="text-4xl font-bold mb-6">Осушители и подготовка воздуха</h1>

        <p className="text-gray-600 mb-10 max-w-2xl">
          Оборудование для удаления влаги и очистки сжатого воздуха: осушители, магистральные фильтры и
          системы отвода конденсата. Подбираем под требуемую точку росы и класс чистоты.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            ["Рефрижераторные осушители", "Охлаждение и удаление влаги из сжатого воздуха."],
            ["Адсорбционные осушители", "Глубокая осушка до низкой точки росы."],
            ["Магистральные фильтры", "Очистка от масла, пыли и аэрозолей."],
            ["Сепарация конденсата", "Отделение конденсата от сжатого воздуха."],
            ["Дренажи / отвод конденсата", "Автоматический и поплавковый сброс конденсата."],
            ["Точка росы", "Подбор по классу чистоты воздуха."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="font-bold mb-1">{t}</div>
              <div className="text-sm text-gray-500">{d}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <LeadForm
            formType="equipment_air_treatment"
            title="Подобрать систему подготовки воздуха"
            submitLabel="Подобрать систему"
            messageLabel="Требования к подготовке воздуха"
            messagePlaceholder="Производительность, требуемая точка росы, класс чистоты, условия"
            extraFields={[
              { name: "flow", label: "Производительность, м³/мин" },
              { name: "dewpoint", label: "Требуемая точка росы, °C" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
