import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import { COMPANY_INFO } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight, Phone } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "projects",
    "Опыт работы | КазАльфаЮг",
    "Компрессоры, запчасти и сервис для строительства, горной добычи, нефтегаза, пищевых производств, коммунальных служб и заводов Казахстана и Центральной Азии. Работаем с 2014 года."
  );
}

/**
 * Bento rows read 8/4, 4/8, 6/6 on desktop so no two rows share a rhythm. In the uneven rows the wide
 * card sets the height, so a narrow card lets its photo grow to fill the space instead of leaving a gap.
 */
const INDUSTRIES = [
  {
    title: "Строительство и дороги",
    desc: "Передвижные компрессоры для отбойных молотков, пескоструя и бурения. Важны мобильность и уверенный пуск в мороз.",
    image: "/products/mobile-compressor-road.jpg",
    alt: "Передвижной дизельный компрессор на дорожных работах",
    cell: "md:col-span-8",
  },
  {
    title: "Горнодобывающая промышленность",
    desc: "Воздух высокого давления для буровых станков. Пыль, удалённые участки и простой, который стоит дороже всего.",
    image: "/products/industry-mining.jpg",
    alt: "Передвижной компрессор питает буровой станок в карьере",
    cell: "md:col-span-4",
    narrow: true,
  },
  {
    title: "Нефтегазовый сектор",
    desc: "Передвижные установки на скважинах и объектах обустройства. Жара, мороз и обслуживание прямо на площадке.",
    image: "/products/xas185-wellhead.jpg",
    alt: "Передвижной компрессор у скважины на нефтегазовом месторождении",
    cell: "md:col-span-4",
    narrow: true,
  },
  {
    title: "Пищевое производство",
    desc: "Безмасляный воздух, осушка и многоступенчатая фильтрация. Чистота сжатого воздуха напрямую влияет на продукт.",
    image: "/products/industry-food.jpg",
    alt: "Безмасляные винтовые компрессоры и ресивер в компрессорной пищевого цеха",
    cell: "md:col-span-8",
  },
  {
    title: "Коммунальные службы",
    desc: "Аварийные работы на сетях водо- и теплоснабжения. Техника должна завестись по первому вызову в любую погоду.",
    image: "/products/industry-utilities.jpg",
    alt: "Коммунальная бригада вскрывает трубопровод с помощью передвижного компрессора",
    cell: "md:col-span-6",
  },
  {
    title: "Производственные предприятия",
    desc: "Стационарные винтовые станции работают сменами без остановок. Главное здесь: регламентное ТО точно в срок.",
    image: "/products/stationary-compressor-room.jpg",
    alt: "Стационарные винтовые компрессоры в заводской компрессорной",
    cell: "md:col-span-6",
  },
];

export default async function ProjectsPage() {
  const content = await getContent();
  const cases = content.cases.filter((c) => c.active);
  const c = content.contacts;
  const telHref = `tel:${c.salesPhone.replace(/\s+/g, "")}`;

  return (
    <div className="pb-16 md:pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Опыт работы" }]} />

      {/* Hero: copy left, a three-photo collage right (one portrait spanning two landscapes) */}
      <section className="container mx-auto grid items-center gap-10 px-4 pb-12 pt-8 md:pt-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pb-16">
        <Reveal direction="left" distance={24}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
            <span className="h-3 w-[2px] rounded-full bg-brand-500" aria-hidden />
            Опыт работы
          </span>
          <h1 className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            От карьера до пищевого цеха
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            С {COMPANY_INFO.foundedYear} года поставляем и обслуживаем компрессоры для шести отраслей. У каждой свои
            требования к воздуху, технике и срокам.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Button href="/#request-form" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
              Запросить КП
            </Button>
            <a
              href={telHref}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-brand-600 hover:text-accent-ink sm:border-transparent sm:bg-transparent"
            >
              <Phone className="h-4 w-4 text-accent-ink" weight="regular" />
              {c.salesPhone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="right" distance={28}>
          <div className="grid grid-cols-[0.8fr_1fr] gap-2 rounded-[20px] border border-border bg-surface p-1.5 shadow-lg sm:gap-3">
            <div className="relative row-span-2 min-h-[260px] overflow-hidden rounded-[14px] bg-surface-2 sm:min-h-[380px]">
              <Image
                src="/products/engine-repair-field.jpg"
                alt="Ремонт двигателя компрессорной установки"
                fill
                priority
                sizes="(min-width: 1024px) 240px, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-2">
              <Image
                src="/products/xas185-desert-rig.jpg"
                alt="Передвижной компрессор на буровой площадке"
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-2">
              <Image
                src="/products/service-engineer-field.jpg"
                alt="Сервисный инженер обслуживает компрессорную установку"
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Industries: photo-led bento, each cell names what that industry needs from compressed air */}
      <section className="border-t border-border bg-surface-2 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Отрасли и их задачи
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
              Подбираем оборудование и регламент обслуживания под условия, в которых техника работает.
            </p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-12 md:gap-5">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.title} className={ind.cell}>
                <Reveal delay={(i % 2) * 0.06} distance={16} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div
                      className={
                        "relative aspect-[16/9] overflow-hidden bg-surface-2" +
                        ("narrow" in ind ? " md:aspect-auto md:min-h-[220px] md:flex-1" : "")
                      }
                    >
                      <Image
                        src={ind.image}
                        alt={ind.alt}
                        fill
                        sizes={"narrow" in ind ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 66vw, 100vw"}
                        className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className={"flex flex-col p-5 md:p-6" + ("narrow" in ind ? "" : " flex-1")}>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{ind.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{ind.desc}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cases from the admin panel; until any are approved, explain why instead of showing an empty grid */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Проекты
          </h2>
        </Reveal>

        {cases.length > 0 ? (
          <div className="mt-8 space-y-4 md:mt-10">
            {cases.map((cs, i) => (
              <Reveal key={cs.id} delay={(i % 3) * 0.06}>
                <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {cs.client || "Проект по запросу заказчика"}
                    </h3>
                    <p className="text-sm text-muted">
                      {[cs.industry, cs.equipment].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  <dl className="mt-5 grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-3">
                    {[
                      ["Задача", cs.task],
                      ["Решение", cs.solution],
                      ["Результат", cs.result],
                    ].map(([label, text]) => (
                      <div key={label} className="bg-surface-2 p-4">
                        <dt className="text-sm font-semibold text-foreground">{label}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-muted">{text}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface p-5 md:p-7">
              <p className="leading-relaxed text-foreground">
                Подробные кейсы с названиями заказчиков публикуем только после их согласия.
              </p>
              <p className="mt-2 leading-relaxed text-muted">
                Если у вас похожая задача, позвоните: расскажем, как решали её для предприятий вашей отрасли.
              </p>
              <a
                href={telHref}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink"
              >
                <Phone className="h-4 w-4" weight="regular" />
                {c.salesPhone}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" weight="bold" />
              </a>
            </div>
          </Reveal>
        )}
      </section>

      {/* Closing prompt stays light: the footer's blue band follows right after */}
      <section className="container mx-auto px-4">
        <Reveal>
          <div className="rounded-[20px] border border-border bg-surface-2 p-1.5 shadow-md">
            <div className="flex w-full flex-col items-start justify-between gap-6 rounded-[14px] bg-surface p-6 md:flex-row md:items-center md:p-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Не нашли свою отрасль?</h2>
                <p className="mt-2 max-w-lg leading-relaxed text-muted">
                  Опишите, где и как работает компрессор. Подберём оборудование, запчасти или регламент ТО под ваши
                  условия.
                </p>
              </div>
              <Button href="/#request-form" className="w-full shrink-0 md:w-auto" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                Запросить КП
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
