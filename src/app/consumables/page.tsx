import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { Check } from "@/components/ui/icons";
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

      <div className="container mx-auto max-w-5xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Расходные материалы</h1>
        </Reveal>

        <Reveal>
          <div className="mt-6 rounded-xl border-l-2 border-brand-600 bg-accent-soft px-6 py-5">
            <p className="font-medium italic text-brand-900">
              «Для точного подбора предоставьте бренд, модель, серийный номер оборудования и партномер детали,
              если он известен. Применимость подтверждается после инженерной проверки.»
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-muted">
              Поставляем расходные материалы для планового технического обслуживания компрессоров: фильтры,
              сепараторы, компрессорные масла и готовые сервисные комплекты.
            </p>
            <h3 className="mt-8 text-lg font-bold text-foreground">Что мы поставляем:</h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {CATEGORIES.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" weight="bold" /> {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
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
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
