import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { Check, ArrowRight, Cube, Factory, Wind } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "equipment",
    "Оборудование | КазАльфаЮг",
    "Передвижные и стационарные компрессоры, осушители и оборудование подготовки сжатого воздуха. Технический подбор оборудования под задачу заказчика."
  );
}

const CATEGORIES = [
  {
    title: "Передвижные компрессоры",
    description: "Дизельные и электрические компрессоры на шасси для строительных и дорожных работ.",
    features: ["Области применения", "Тип привода", "Рабочее давление", "Производительность"],
    href: "/equipment/mobile",
    icon: Cube,
    label: "Передвижной компрессор на шасси",
  },
  {
    title: "Стационарные компрессоры",
    description: "Винтовые и поршневые компрессоры для промышленных предприятий и цехов.",
    features: ["Режим работы", "Наличие резерва", "Качество воздуха", "Электросеть"],
    href: "/equipment/stationary",
    icon: Factory,
    label: "Стационарная компрессорная станция",
  },
  {
    title: "Осушители и подготовка воздуха",
    description: "Оборудование для удаления влаги и очистки сжатого воздуха.",
    features: ["Рефрижераторные", "Адсорбционные", "Фильтры", "Сепараторы"],
    href: "/equipment/air-treatment",
    icon: Wind,
    label: "Осушитель и система подготовки воздуха",
  },
];

export default function EquipmentPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Оборудование" }]} />

      <div className="container mx-auto px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Оборудование</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Поставляем компрессорное оборудование от ведущих мировых производителей и выполняем технический
            подбор под ваши задачи. Точный перечень брендов и моделей подтверждается менеджером. Технические
            характеристики уточняются после согласования требований.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Card bezel className="flex flex-col">
                <MediaPlaceholder
                  label={cat.label}
                  icon={<cat.icon className="h-7 w-7" weight="regular" />}
                  ratio="16 / 10"
                  className="mb-6"
                />
                <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                <p className="mt-2 text-sm text-muted">{cat.description}</p>
                <ul className="mt-5 grid gap-2">
                  {cat.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="h-4 w-4 shrink-0 text-accent-ink" weight="bold" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cat.href}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink"
                >
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" weight="bold" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-brand-600 px-8 py-12 text-brand-contrast md:px-12 md:py-16">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Нужен подбор оборудования?</h2>
                <p className="mt-2 max-w-xl text-brand-100">
                  Направьте требуемые параметры — подготовим техническое решение и коммерческое предложение.
                </p>
              </div>
              <Button
                href="/#request-form"
                className="!bg-white !text-brand-700 hover:!bg-brand-50"
                icon={<ArrowRight className="h-4 w-4" weight="bold" />}
              >
                Запросить КП
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
