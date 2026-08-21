import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment/mobile",
    "Передвижные компрессоры | КазАльфаЮг",
    "Передвижные дизельные и электрические компрессоры на шасси: области применения, давление, производительность, варианты исполнения. Технический подбор под задачу."
  );
}

const PARAMS = [
  ["Области применения", "Строительство, дорожные работы, бурение, пескоструй."],
  ["Тип привода и рабочая среда", "Дизельный или электрический привод, сжатый воздух."],
  ["Рабочее давление", "Подбирается по инструменту и технологии (бар)."],
  ["Производительность", "Подача сжатого воздуха, м³/мин."],
  ["Условия эксплуатации", "Температура, запылённость, режим работы."],
  ["Варианты исполнения", "На шасси, на раме, с ресивером и осушением."],
];

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

      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Передвижные компрессоры</h1>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-2xl text-muted">
            Передвижные компрессоры на шасси применяются на строительных площадках, в дорожном хозяйстве и на
            буровых работах. Подбираем дизельные и электрические модели под требуемые параметры.
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
          <div className="mt-12 rounded-xl border-l-2 border-brand-600 bg-brand-50 px-6 py-5">
            <p className="font-medium text-brand-900">
              Для подбора укажите требуемые производительность, давление, режим работы и условия эксплуатации.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-2xl">
            <Card>
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
            </Card>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
