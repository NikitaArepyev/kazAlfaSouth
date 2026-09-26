import Link from "next/link";
import { getContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import { Phone, EnvelopeSimple, MapPin, ArrowRight, WhatsappLogo } from "@/components/ui/icons";
import { catalogCategoryHref } from "@/lib/catalog";

export default async function Footer() {
  const content = await getContent();
  const c = content.contacts;
  const currentYear = new Date().getFullYear();

  const navColumns = [
    {
      title: "Каталог",
      links: [
        { label: "Все товары", href: "/catalog" },
        { label: "Оборудование", href: catalogCategoryHref("Оборудование") },
        { label: "Запасные части", href: catalogCategoryHref("Запасные части") },
        { label: "Расходные материалы", href: catalogCategoryHref("Расходные материалы") },
        { label: "Сервис и ремонт", href: catalogCategoryHref("Сервис") },
      ],
    },
    {
      title: "Компания",
      links: [
        { label: "Бренды", href: "/brands" },
        { label: "Опыт работы", href: "/projects" },
        { label: "О компании", href: "/about" },
        { label: "Контакты", href: "/contacts" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              КАЗ<span className="text-accent-ink">АЛЬФА</span>ЮГ
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {content.tagline}
            </p>
          </div>

          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-ink"
                    >
                      <span className="h-px w-3 origin-left scale-x-0 bg-brand-500 transition-[scale] duration-200 ease-out group-hover:scale-x-100" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Phone className="h-4 w-4" weight="regular" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-subtle">Отдел продаж</div>
              <a href={`tel:${c.salesPhone.replace(/\s+/g, "")}`} className="font-semibold text-foreground hover:text-accent-ink">
                {c.salesPhone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <EnvelopeSimple className="h-4 w-4" weight="regular" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-subtle">Почта</div>
              <a href={`mailto:${c.salesEmail}`} className="font-semibold text-foreground hover:text-accent-ink">
                {c.salesEmail}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <MapPin className="h-4 w-4" weight="regular" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-subtle">Офисы</div>
              <div className="font-semibold text-foreground">Алматы · Шымкент</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-[3px] shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-brand-600 p-8 text-brand-contrast md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold">Нужна консультация по оборудованию?</h3>
              <p className="mt-1 max-w-xl text-sm text-brand-100">
                Направьте модель, серийный номер или техническое задание — подберём решение и подготовим предложение.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button
                href="/#request-form"
                variant="primary"
                className="!bg-white !text-brand-700 hover:!bg-brand-50"
                icon={<ArrowRight className="h-4 w-4" weight="bold" />}
              >
                Запросить КП
              </Button>
              <a
                href={`https://wa.me/${c.salesWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <WhatsappLogo className="h-5 w-5" weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-sm text-subtle md:flex-row">
          <p>© {currentYear} ТОО «КазАльфаЮг». Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/policy" className="transition-colors hover:text-accent-ink">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
