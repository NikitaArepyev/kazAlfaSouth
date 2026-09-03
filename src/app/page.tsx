import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
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
  Wrench,
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

const TRUST = [
  { icon: CalendarDots, title: `Работаем с ${COMPANY_INFO.foundedYear} года`, desc: "Стабильный опыт на рынке" },
  { icon: MapTrifold, title: "Казахстан и Центральная Азия", desc: "Поставки в любой регион" },
  { icon: Gear, title: "Технический подбор", desc: "По модели и партномеру" },
  { icon: ShieldCheck, title: "Альтернативные решения", desc: "Проверенные аналоги с гарантией" },
];

const NEED_CARDS = [
  { title: "Купить оборудование", href: "/equipment", icon: Cube, span: "lg:col-span-2", action: "Ведёт в раздел оборудования / опросный лист" },
  { title: "Подобрать запасную часть", href: "/#request-form", icon: Plug, span: "", action: "Открывает техническую форму по номеру / модели" },
  { title: "Найти альтернативу оригиналу", href: "/#request-form", icon: ShieldCheck, span: "", action: "Открывает форму подбора аналога" },
  { title: "Заказать сервис", href: "/service", icon: Gear, span: "", action: "Ведёт на страницу сервиса" },
  { title: "Отправить в ремонт", href: "/#request-form", icon: Wrench, span: "", action: "Ведёт на форму ремонта" },
  { title: "Расходные материалы", href: "/consumables", icon: Funnel, span: "", action: "Ведёт на фильтры, масла и комплекты" },
];

export default async function Home() {
  const content = await getContent();
  const tagline = content.tagline;
  const wa = COMPANY_INFO.contacts.sales.whatsapp;

  return (
    <>
      {/* Hero — asymmetric split */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-950/40"
          aria-hidden
        />
        <div className="container mx-auto grid items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
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

      {/* Trust block */}
      <Section
        eyebrow="Почему КазАльфаЮг"
        title="Надёжный поставщик технических решений"
        description="Работаем с промышленными предприятиями Казахстана и Центральной Азии: от подбора до сервисного сопровождения."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={i} delay={i * 0.06} direction="scale" distance={18}>
              <Card>
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <t.icon className="h-5 w-5" weight="regular" />
                </span>
                <div className="font-bold text-foreground">{t.title}</div>
                <div className="mt-1 text-sm text-muted">{t.desc}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What you need — restrained bento */}
      <Section
        surface
        eyebrow="Навигация по запросу"
        title="Что вам требуется?"
        description="Выберите направление — мы подберём оборудование, запчасть или сервис под вашу задачу."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEED_CARDS.map((card, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} direction="up" distance={18} className={card.span}>
              <Link
                href={card.href}
                className="group block h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-md md:p-8"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-brand-contrast">
                  <card.icon className="h-5 w-5" weight="regular" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.action}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" weight="bold" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Quick request */}
      <Section id="request-form" className="scroll-mt-24">
        <div className="overflow-hidden rounded-2xl border border-border bg-brand-600 px-6 py-12 text-brand-contrast md:px-12 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal direction="left" distance={24}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Быстрый запрос</h2>
              <p className="mt-4 max-w-md text-brand-100">
                Опишите вашу задачу — модель, серийный номер, партномер или техническое задание. Подготовим
                предложение с проверкой применимости.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-brand-100">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-200" weight="fill" /> Проверка применимости инженерами
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-brand-200" weight="bold" /> Оригинал и проверенные аналоги
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1} direction="right" distance={24}>
              <div className="rounded-xl border border-white/15 bg-surface p-6 text-foreground shadow-lg md:p-8">
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
