import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check, ArrowRight } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "projects",
    "Опыт работы | КазАльфаЮг",
    "Опыт ТОО «КазАльфаЮг» в поставках компрессорного оборудования, запасных частей и сервисе для предприятий Казахстана и Центральной Азии. Отрасли заказчиков и подход к работе с запросом."
  );
}

const INDUSTRIES = [
  "Строительство и дорожное хозяйство",
  "Горнодобывающая промышленность",
  "Нефтегазовый сектор",
  "Пищевое производство",
  "Коммунальные службы и ЖКХ",
  "Производственные предприятия",
];

export default async function ProjectsPage() {
  const content = await getContent();
  const cases = content.cases.filter((c) => c.active);

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Опыт работы" }]} />

      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Опыт работы</h1>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-2xl text-muted">
            С 2014 года ТОО «КазАльфаЮг» поставляет компрессорное оборудование, запасные части и расходные
            материалы, а также выполняет техническое обслуживание и ремонт промышленного оборудования.
            Детальные кейсы публикуются после согласования с заказчиками и подтверждения права на раскрытие.
          </p>
        </Reveal>

        {cases.length > 0 && (
          <div className="mt-12 space-y-6">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.06}>
                <Card>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {c.industry && (
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-ink">
                        {c.industry}
                      </span>
                    )}
                    {c.equipment && (
                      <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                        {c.equipment}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {c.client ? c.client : "Проект по запросу заказчика"}
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                    <div>
                      <div className="mb-1 font-semibold text-foreground">Задача</div>
                      <div className="text-muted">{c.task}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-foreground">Решение</div>
                      <div className="text-muted">{c.solution}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-foreground">Результат</div>
                      <div className="text-muted">{c.result}</div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Отрасли заказчиков</h2>
        </Reveal>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={i} delay={(i % 2) * 0.05}>
              <li className="flex items-center gap-3 rounded-xl bg-surface-2 p-4 font-medium text-foreground">
                <Check className="h-5 w-5 shrink-0 text-accent-ink" weight="bold" /> {ind}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-brand-600 px-8 py-12 text-brand-contrast md:px-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Нужен подбор или расчёт?</h2>
                <p className="mt-2 max-w-md text-brand-100">
                  Направьте модель оборудования, серийный номер, партномер или техническое задание —
                  подготовим предложение.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/#request-form" className="!bg-white !text-brand-700 hover:!bg-brand-50" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                  Запросить предложение
                </Button>
                <Button href="/contacts" variant="secondary" className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10">
                  Контакты
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
