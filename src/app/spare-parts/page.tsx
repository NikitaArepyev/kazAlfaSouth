import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { Check } from "@/components/ui/icons";
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

      <div className="container mx-auto max-w-5xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Запасные части</h1>
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
              Мы поставляем полный спектр запасных частей для компрессоров Atlas Copco, CompAir, ELGi и других
              брендов. В наличии и под заказ как оригинальные детали, так и проверенные аналоги.
            </p>
            <h3 className="mt-8 text-lg font-bold text-foreground">Что мы поставляем:</h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {parts.map((part, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" weight="bold" /> {part}
                </li>
              ))}
            </ul>

            <Card className="mt-8">
              <h4 className="font-bold text-foreground">Нужен аналог оригинала?</h4>
              <p className="mt-2 text-sm text-muted">
                Пришлите номер оригинала, бренд, модель и требования — мы проверим возможность поставки
                проверенной альтернативы. Совместимость подтверждается после инженерной проверки.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
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
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
