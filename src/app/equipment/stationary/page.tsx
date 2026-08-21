import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/stationary",
    "Стационарные компрессоры | КазАльфаЮг",
    "Стационарные винтовые и поршневые компрессоры для промышленных предприятий: производительность, давление, качество воздуха, осушение и фильтрация. Технический подбор и КП."
  );
}

const PARAMS = [
  ["Требуемая производительность", "Подача сжатого воздуха, м³/мин."],
  ["Рабочее давление", "Необходимое давление на выходе, бар."],
  ["Режим работы", "Непрерывный или периодический."],
  ["Наличие резерва", "Нужен ли резервный компрессор."],
  ["Качество сжатого воздуха", "Класс чистоты по ISO 8573-1."],
  ["Осушитель и фильтрация", "Точка росы, магистральные фильтры."],
  ["Параметры электросети", "Напряжение и мощность."],
  ["Условия размещения", "Помещение, вентиляция, площадь."],
];

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

      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Стационарные компрессоры</h1>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-2xl text-muted">
            Стационарные винтовые и поршневые компрессоры для цехов и производств. Подбираем решение под
            требуемое качество сжатого воздуха, режим работы и параметры электросети.
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
            </Card>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
