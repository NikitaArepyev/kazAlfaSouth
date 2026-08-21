import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/air-treatment",
    "Осушители и подготовка воздуха | КазАльфаЮг",
    "Рефрижераторные и адсорбционные осушители, магистральные фильтры, сепарация и отвод конденсата. Подбор системы подготовки сжатого воздуха."
  );
}

const PARAMS = [
  ["Рефрижераторные осушители", "Охлаждение и удаление влаги из сжатого воздуха."],
  ["Адсорбционные осушители", "Глубокая осушка до низкой точки росы."],
  ["Магистральные фильтры", "Очистка от масла, пыли и аэрозолей."],
  ["Сепарация конденсата", "Отделение конденсата от сжатого воздуха."],
  ["Дренажи / отвод конденсата", "Автоматический и поплавковый сброс конденсата."],
  ["Точка росы", "Подбор по классу чистоты воздуха."],
];

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

      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Осушители и подготовка воздуха
          </h1>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-2xl text-muted">
            Оборудование для удаления влаги и очистки сжатого воздуха: осушители, магистральные фильтры и
            системы отвода конденсата. Подбираем под требуемую точку росы и класс чистоты.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PARAMS.map(([t, d], i) => (
            <Reveal key={i} delay={(i % 2) * 0.05}>
              <Card className="h-full">
                <div className="font-bold text-foreground">{t}</div>
                <div className="mt-1 text-sm text-muted">{d}</div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-12 max-w-2xl">
            <Card>
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
            </Card>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
