import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { BRAND_LOGOS } from "@/lib/brands";
import { catalogCategoryHref } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LeadForm from "@/components/LeadForm";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Gear,
  Phone,
  ShieldCheck,
  Truck,
  WhatsappLogo,
} from "@/components/ui/icons";

export async function generateMetadata() {
  return buildMetadata(
    "about",
    "О компании | КазАльфаЮг",
    "ТОО «КазАльфаЮг» с 2014 года поставляет компрессоры, оригинальные и аналоговые запчасти, расходные материалы и выполняет сервис. Подбор по модели и партномеру с проверкой применимости инженером."
  );
}

/** Asymmetric grid: one tall cell, two stacked, one wide strip. Order matters for the layout. */
const DIRECTIONS = [
  {
    title: "Оборудование",
    desc: "Передвижные и стационарные компрессоры, осушители, подготовка воздуха.",
    category: "Оборудование",
    image: "/products/stationary-compressor-room.jpg",
    alt: "Винтовые компрессоры и ресивер в компрессорной станции",
    cell: "md:col-span-7 md:row-span-2",
    ratio: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    title: "Запчасти и аналоги",
    desc: "Винтовые блоки, клапаны, прокладки, подшипники.",
    category: "Запасные части",
    image: "/products/spare-parts-bench.jpg",
    alt: "Запасные части винтового компрессора на верстаке",
    cell: "md:col-span-5",
    ratio: "aspect-[16/10]",
  },
  {
    title: "Расходные материалы",
    desc: "Фильтры, сепараторы, масла, сервисные комплекты.",
    category: "Расходные материалы",
    image: "/products/consumables-shelf.jpg",
    alt: "Фильтры и масла для обслуживания компрессоров на складе",
    cell: "md:col-span-5",
    ratio: "aspect-[16/10]",
  },
  {
    title: "Сервис и ремонт",
    desc: "Диагностика, регламентное обслуживание, ремонт двигателей и винтовых блоков.",
    category: "Сервис",
    image: "/products/engine-rebuild-shop.jpg",
    alt: "Инженер ремонтирует двигатель компрессорной установки в цеху",
    cell: "md:col-span-12",
    ratio: "aspect-[16/10] md:aspect-[24/7]",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Присылаете, что есть",
    desc: "Модель, серийный номер, партномер или фото шильдика. Подойдёт даже фото старой детали.",
  },
  {
    icon: Gear,
    title: "Инженер проверяет применимость",
    desc: "Сверяем позицию с вашей установкой, чтобы на объект не приехала неподходящая деталь.",
  },
  {
    icon: ShieldCheck,
    title: "Получаете КП с вариантами",
    desc: "Оригинал и проверенный аналог в одном предложении: цена и срок поставки по каждому.",
  },
  {
    icon: Truck,
    title: "Поставка и обслуживание",
    desc: "Доставляем по Казахстану и Центральной Азии. ТО и ремонт выполняет наш сервис.",
  },
];

const ORIGINAL_BRANDS = ["atlas-copco", "compair", "elgi", "ozen", "lupamat"];
const ANALOG_BRANDS = ["fleetguard", "hifi-filter"];

const INDUSTRIES = [
  "Строительство и дороги",
  "Горнодобывающая промышленность",
  "Нефтегазовый сектор",
  "Пищевое производство",
  "Коммунальные службы",
  "Производственные предприятия",
];

function pluralBrands(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "бренд";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "бренда";
  return "брендов";
}

function LogoPlate({ id, name }: { id: string; name: string }) {
  const src = BRAND_LOGOS[id];
  return (
    <li className="relative flex h-16 items-center justify-center rounded-lg border border-border bg-white px-3">
      {src ? (
        <Image src={src} alt={`Логотип ${name}`} fill sizes="160px" className="object-contain p-2" />
      ) : (
        <span className="text-sm font-bold text-zinc-900">{name}</span>
      )}
    </li>
  );
}

export default async function AboutPage() {
  const content = await getContent();
  const brands = content.brands.filter((b) => b.active);
  const brandName = new Map(brands.map((b) => [b.id, b.name]));
  const originals = ORIGINAL_BRANDS.filter((id) => brandName.has(id));
  const analogs = ANALOG_BRANDS.filter((id) => brandName.has(id));
  const c = content.contacts;
  const telHref = `tel:${c.salesPhone.replace(/\s+/g, "")}`;

  const facts = [
    { value: String(COMPANY_INFO.foundedYear), label: "год основания компании" },
    { value: "2", label: "офиса: Алматы и Шымкент" },
    { value: String(brands.length), label: `${pluralBrands(brands.length)} оборудования и расходников` },
    { value: "КЗ и ЦА", label: "поставки по Казахстану и Центральной Азии" },
  ];

  return (
    <div className="pb-16 md:pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "О компании" }]} />

      {/* Hero: split, photo sits in a tray with an offset fact plate breaking its edge */}
      <section className="container mx-auto grid items-center gap-10 px-4 pb-12 pt-8 md:pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-16">
        <Reveal direction="left" distance={24}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
            <span className="h-3 w-[2px] rounded-full bg-brand-500" aria-hidden />О компании
          </span>
          <h1 className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            Держим компрессоры в работе с {COMPANY_INFO.foundedYear} года
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Поставляем оборудование, запчасти и расходники, обслуживаем и ремонтируем. Позицию подбирает
            инженер по вашей установке, а не по прайс-листу.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Button href="#about-request" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
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

        <Reveal delay={0.1} direction="right" distance={28} className="relative">
          <div className="rounded-[20px] border border-border bg-surface p-1.5 shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-2">
              <Image
                src="/products/equipment-fleet.jpg"
                alt="Передвижные компрессоры и стационарная установка на площадке на фоне гор"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative -mt-10 ml-4 mr-auto w-fit max-w-[calc(100%-2rem)] rounded-xl border border-border bg-surface px-4 py-3 shadow-md sm:ml-6 lg:absolute lg:-bottom-6 lg:-left-8 lg:mt-0">
            <div className="text-sm font-semibold text-foreground">Алматы и Шымкент</div>
            <div className="text-xs text-muted">офисы и сервисные площадки</div>
          </div>
        </Reveal>
      </section>

      {/* Facts: real figures only, read as one strip rather than four cards */}
      <section className="border-y border-border bg-surface">
        <div className="container mx-auto px-0 sm:px-4">
          {/* 1px gaps over a border-coloured ground draw the hairlines between cells only */}
          <dl className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 0.05}
                distance={10}
                className="flex flex-col-reverse justify-end gap-1 bg-surface px-4 py-6 md:px-6 md:py-8"
              >
                <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                <dd className="text-3xl font-bold tabular-nums tracking-[-0.03em] text-foreground md:text-4xl">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Directions: asymmetric bento, every cell is a way into the catalog */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Один поставщик на весь срок службы компрессора
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
            Не нужно искать оборудование, запчасти и сервис у разных подрядчиков.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-12 md:gap-5">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06} distance={16} className={d.cell}>
              <Link
                href={catalogCategoryHref(d.category)}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
              >
                <div className={`relative ${d.ratio}`}>
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                    className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                    <div className="max-w-md">
                      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{d.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">{d.desc}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-[background-color,color] duration-300 group-hover:bg-white group-hover:text-zinc-900">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        weight="bold"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process: a single rail the steps hang from, horizontal on desktop, vertical on phones */}
      <section className="border-y border-border bg-surface-2 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Как проходит запрос
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
              Точных данных может не быть. Начнём с того, что у вас есть под рукой.
            </p>
          </Reveal>

          <div className="relative mt-10 lg:mt-12">
            <span
              aria-hidden
              className="absolute bottom-6 left-[21px] top-6 w-px bg-border-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[21px] lg:h-px lg:w-auto"
            />
            <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={i * 0.08} distance={14} className="grid grid-cols-[44px_1fr] gap-4 lg:grid-cols-1 lg:gap-5">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-accent-ink shadow-sm">
                      <step.icon className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{step.desc}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Original vs analog: the commercial choice the buyer actually makes */}
      <section className="container mx-auto grid gap-8 px-4 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:py-20">
        <Reveal direction="left" distance={20}>
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Оригинал или аналог: выбираете вы
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            В предложении показываем оба варианта, если аналог подходит вашей установке. Оригинал, когда важна
            гарантия производителя. Аналог, когда нужно снизить стоимость обслуживания без потери ресурса.
          </p>
          <Link
            href={catalogCategoryHref("Расходные материалы")}
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink"
          >
            Смотреть расходные материалы
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" weight="bold" />
          </Link>
        </Reveal>

        <Reveal delay={0.08} direction="right" distance={20}>
          <div className="rounded-[20px] border border-border bg-surface-2 p-1.5 shadow-md">
            <div className="grid gap-1.5">
              <div className="rounded-[14px] bg-surface p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-foreground">Оригинальные позиции</h3>
                  <span className="text-xs text-subtle">гарантия производителя</span>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {originals.map((id) => (
                    <LogoPlate key={id} id={id} name={brandName.get(id) ?? id} />
                  ))}
                </ul>
              </div>
              <div className="rounded-[14px] bg-surface p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-foreground">Проверенные аналоги</h3>
                  <span className="text-xs text-subtle">ниже стоимость ТО</span>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {analogs.map((id) => (
                    <LogoPlate key={id} id={id} name={brandName.get(id) ?? id} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Industries: plain wrap, the names carry the weight */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <Reveal>
          <h2 className="text-lg font-semibold text-foreground">Наша техника работает в отраслях</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind}
                className="rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                {ind}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Request: the form lives here, so the page ends in an action. Kept light so it does not
          stack against the footer's blue consultation band directly below. */}
      <section id="about-request" className="container mx-auto scroll-mt-24 px-4">
        <div className="overflow-hidden rounded-[20px] border border-border bg-surface-2 p-1.5 shadow-lg">
          <div className="grid gap-8 rounded-[14px] bg-surface p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-10">
            <Reveal direction="left" distance={20} className="lg:pt-2">
              <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Подберём позицию под вашу установку
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Пришлите модель, серийный номер или партномер. Инженер проверит применимость, и мы подготовим
                коммерческое предложение.
              </p>
              <div className="mt-8 space-y-3 text-sm text-foreground">
                <a href={telHref} className="flex w-fit items-center gap-3 font-semibold transition-colors hover:text-accent-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                    <Phone className="h-4 w-4" weight="regular" />
                  </span>
                  {c.salesPhone}
                </a>
                <a
                  href={`https://wa.me/${c.salesWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-3 font-semibold transition-colors hover:text-accent-ink"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                    <WhatsappLogo className="h-4 w-4" weight="fill" />
                  </span>
                  Написать в WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08} direction="right" distance={20}>
              <div className="rounded-xl border border-border bg-background p-5 text-foreground md:p-7">
                <LeadForm
                  formType="quote"
                  submitLabel="Запросить КП"
                  messageLabel="Что нужно подобрать"
                  messagePlaceholder="Модель оборудования, серийный номер, партномер или описание задачи"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
