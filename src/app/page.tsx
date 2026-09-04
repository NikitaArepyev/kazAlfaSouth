import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/LeadForm";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import {
  CalendarDots,
  MapTrifold,
  Gear,
  ShieldCheck,
  Cube,
  Plug,
  Funnel,
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

const OFFER_CARDS = [
  {
    title: "Оборудование",
    href: "/equipment",
    icon: Cube,
    desc: "Передвижные и стационарные компрессоры, осушители и подготовка воздуха.",
  },
  {
    title: "Запчасти и аналоги",
    href: "/#request-form",
    icon: Plug,
    desc: "Оригинальные позиции и проверенные альтернативы с подтверждением применимости.",
  },
  {
    title: "Сервис и ремонт",
    href: "/service",
    icon: ShieldCheck,
    desc: "Диагностика, регламентное обслуживание, ремонт узлов и техническая поддержка.",
  },
  {
    title: "Расходные материалы",
    href: "/consumables",
    icon: Funnel,
    desc: "Фильтры, сепараторы, масла и сервисные комплекты под конкретную установку.",
  },
];

export default async function Home() {
  const content = await getContent();
  const tagline = content.tagline;
  const wa = COMPANY_INFO.contacts.sales.whatsapp;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-950/40"
          aria-hidden
        />
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal direction="left" distance={28}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              <span className="h-3 w-[2px] rounded-full bg-brand-500" aria-hidden />
              Промышленные компрессорные системы
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
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
                <WhatsappLogo className="h-5 w-5 text-brand-600" weight="fill" />
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-subtle">
              Для расчёта направьте модель оборудования, серийный номер, партномер, фотографию детали или
              техническое задание.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {FACTS.map((fact, i) => (
                <Reveal key={fact.title} delay={0.08 + i * 0.05} direction="scale" distance={14}>
                  <div className="rounded-xl border border-border bg-surface/90 p-4">
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <fact.icon className="h-4 w-4" weight="regular" />
                    </span>
                    <div className="text-sm font-semibold text-foreground">{fact.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">{fact.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} direction="right" distance={32}>
            <MediaPlaceholder
              label="Промышленный компрессор"
              caption="TODO: фото оборудования на объекте заказчика"
              icon={<Cube className="h-7 w-7" weight="regular" />}
              ratio="4 / 3"
            />
          </Reveal>
        </div>
      </section>

      <Section
        surface
        eyebrow="Основные направления"
        title="Оборудование, комплектующие и сервис без лишних уровней навигации"
        description="Собрали похожие запросы в четыре понятных направления, чтобы путь к нужному разделу был короче."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {OFFER_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05} direction="up" distance={16}>
              <Link
                href={card.href}
                className="group block h-full rounded-xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-sm md:p-7"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-brand-contrast">
                  <card.icon className="h-5 w-5" weight="regular" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{card.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" weight="bold" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="request-form" className="scroll-mt-24">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 px-6 py-10 md:px-12 md:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal direction="left" distance={24}>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">Быстрый запрос</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Один канал для подбора и сервиса</h2>
              <p className="mt-4 max-w-md text-muted">
                Опишите вашу задачу — модель, серийный номер, партномер или техническое задание. Подготовим
                предложение с проверкой применимости.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-600" weight="fill" /> Проверка применимости инженерами
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-brand-600" weight="bold" /> Оригинал и проверенные аналоги
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1} direction="right" distance={24}>
              <div className="rounded-xl border border-border bg-surface p-6 text-foreground shadow-sm md:p-8">
                <LeadFormHome />
              </div>
            </Reveal>
          </div>
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
