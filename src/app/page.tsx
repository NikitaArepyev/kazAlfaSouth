import Image from "next/image";
import { COMPANY_INFO } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Section, { Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/LeadForm";
import Button from "@/components/ui/Button";
import DirectionsIndex from "@/components/DirectionsIndex";
import { catalogCategoryHref } from "@/lib/catalog";
import {
  CalendarDots,
  MapTrifold,
  Gear,
  ShieldCheck,
  Plug,
  ArrowRight,
  WhatsappLogo,
} from "@/components/ui/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "home",
    "КазАльфаЮг — Компрессорное оборудование и сервис в Казахстане",
    "Поставка передвижных и стационарных компрессоров, оригинальных и альтернативных запасных частей, фильтров, сепараторов, масел и сервисных комплектов. Техническое обслуживание, диагностика и ремонт."
  );
}

const FACTS = [
  { icon: CalendarDots, title: `С ${COMPANY_INFO.foundedYear} года`, desc: "Работаем с промышленными объектами" },
  { icon: MapTrifold, title: "Казахстан и ЦА", desc: "Поставка и сопровождение по регионам" },
  { icon: Gear, title: "Подбор инженером", desc: "По модели, партномеру и режиму работы" },
];

const DIRECTIONS = [
  {
    title: "Оборудование",
    category: "Оборудование",
    desc: "Передвижные и стационарные компрессоры, осушители и подготовка воздуха.",
    image: "/products/xas185-wellhead.jpg",
    imageAlt: "Передвижной компрессор у скважины на объекте",
  },
  {
    title: "Запчасти и аналоги",
    category: "Запасные части",
    desc: "Оригинальные позиции и проверенные альтернативы с подтверждением применимости.",
    image: "/products/valve-kit-parts.jpg",
    imageAlt: "Комплект клапанов и запасных частей компрессора",
  },
  {
    title: "Сервис и ремонт",
    category: "Сервис",
    desc: "Диагностика, регламентное обслуживание, ремонт узлов и техническая поддержка.",
    image: "/products/engine-repair-field.jpg",
    imageAlt: "Ремонт двигателя компрессорной установки на объекте",
  },
  {
    title: "Расходные материалы",
    category: "Расходные материалы",
    desc: "Фильтры, сепараторы, масла и сервисные комплекты под конкретную установку.",
    image: "/products/oil-filters-block.jpg",
    imageAlt: "Масляные фильтры для компрессорного оборудования",
  },
];

export default async function Home() {
  const content = await getContent();
  const tagline = content.tagline;
  const wa = COMPANY_INFO.contacts.sales.whatsapp;
  const activeProducts = content.products.filter((p) => p.active);
  const directions = DIRECTIONS.map(({ category, ...d }) => ({
    ...d,
    href: catalogCategoryHref(category),
    count: activeProducts.filter((p) => p.category === category).length,
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-950/40"
          aria-hidden
        />
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal direction="left" distance={28}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
              <span className="h-3 w-[2px] rounded-full bg-brand-500" aria-hidden />
              Промышленные компрессорные системы
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
              {tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Поставляем передвижные и стационарные компрессоры, оригинальные и альтернативные запасные
              части, фильтры, сепараторы, масла и сервисные комплекты. Выполняем техническое обслуживание,
              диагностику и ремонт.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/#request-form" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
                Запросить КП
              </Button>
              <Button href="/#request-form" variant="secondary" icon={<Plug className="h-4 w-4" weight="bold" />}>
                Подобрать запчасть
              </Button>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <WhatsappLogo className="h-5 w-5 text-accent-ink" weight="fill" />
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-subtle">
              Для расчёта направьте модель оборудования, серийный номер, партномер, фотографию детали или
              техническое задание.
            </p>
            <dl className="mt-10 grid gap-5 border-t border-border pt-6 sm:grid-cols-3 sm:gap-0">
              {FACTS.map((fact, i) => (
                <Reveal
                  key={fact.title}
                  delay={0.08 + i * 0.05}
                  direction="up"
                  distance={10}
                  className="sm:border-l sm:border-border sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <fact.icon className="h-4 w-4 shrink-0 text-accent-ink" weight="regular" />
                    {fact.title}
                  </dt>
                  <dd className="mt-1.5 text-xs leading-relaxed text-muted">{fact.desc}</dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12} direction="right" distance={32}>
            <figure className="w-full">
              <div
                className="relative overflow-hidden rounded-xl border border-border bg-surface-2"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src="/products/xas185-desert-rig.jpg"
                  alt="Передвижной компрессор Atlas Copco на буровой площадке"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-xs text-subtle">
                Передвижной компрессор на объекте заказчика
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Section
        surface
        title="Всё для компрессорной станции у одного поставщика"
        description="Выберите направление, чтобы перейти к позициям каталога."
      >
        <DirectionsIndex directions={directions} />
      </Section>

      <Section id="request-form" className="scroll-mt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal direction="left" distance={24} className="lg:sticky lg:top-32">
            <Eyebrow>Быстрый запрос</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Один канал для подбора и сервиса</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Опишите вашу задачу — модель, серийный номер, партномер или техническое задание. Подготовим
              предложение с проверкой применимости.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent-ink" weight="fill" /> Проверка применимости инженерами
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-accent-ink" weight="bold" /> Оригинал и проверенные аналоги
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} direction="right" distance={24}>
            <div className="rounded-2xl border border-border bg-surface p-6 text-foreground shadow-md md:p-8">
              <LeadFormHome />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function LeadFormHome() {
  return (
    <LeadForm
      formType="quick_request"
      submitLabel="Отправить запрос"
      messageLabel="Кратко опишите запрос"
      messagePlaceholder="Модель оборудования, серийный номер, партномер, фотография детали или техническое задание"
    />
  );
}
