import { COMPANY_INFO } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check, Wrench, Truck, Handshake, ArrowRight } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "about",
    "О компании | КазАльфаЮг",
    "ТОО «КазАльфаЮг» работает с 2014 года: поставка компрессорного оборудования, запасных частей и расходных материалов, техническое обслуживание и ремонт промышленного оборудования в Казахстане и Центральной Азии."
  );
}

const DIRECTIONS = [
  "Передвижные и стационарные компрессоры",
  "Запасные части и расходные материалы",
  "Осушители и подготовка воздуха",
  "Техническое обслуживание и сложный ремонт",
];

const PILLARS = [
  { icon: Wrench, title: "Техническая экспертиза", desc: "Профессиональный подбор оборудования и запчастей под конкретные задачи." },
  { icon: Truck, title: "География поставок", desc: "Работаем по всему Казахстану и странам Центральной Азии." },
  { icon: Handshake, title: "Долгосрочное партнёрство", desc: "Обеспечиваем поддержку и сервис на протяжении всего срока службы техники." },
];

export default function AboutPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "О компании" }]} />

      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">О компании</h1>
        </Reveal>

        <Reveal>
          <blockquote className="mt-8 rounded-xl border-l-2 border-brand-600 bg-brand-50 px-6 py-5">
            <p className="font-medium italic text-brand-900">
              «{COMPANY_INFO.name} работает с {COMPANY_INFO.foundedYear} года. Компания поставляет компрессорное
              оборудование, запасные части и расходные материалы, а также оказывает услуги по техническому
              обслуживанию и ремонту промышленного оборудования.»
            </p>
          </blockquote>
        </Reveal>

        <Reveal>
          <p className="mt-8 leading-relaxed text-muted">
            За годы работы мы зарекомендовали себя как надёжный поставщик технических решений для предприятий
            Казахстана и Центральной Азии. Наши специалисты обладают глубокими знаниями в области систем
            сжатого воздуха.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">Наши направления</h2>
        </Reveal>
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={i} delay={(i % 2) * 0.05}>
              <li className="flex items-center gap-3 rounded-xl bg-surface-2 p-4 font-medium text-foreground">
                <Check className="h-5 w-5 shrink-0 text-brand-600" weight="bold" /> {d}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">Почему выбирают нас?</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Card className="h-full">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <p.icon className="h-5 w-5" weight="regular" />
                </span>
                <h3 className="font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-center justify-between gap-8 rounded-3xl bg-surface-2 px-10 py-12 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Нужна консультация?</h2>
              <p className="mt-2 text-muted">Свяжитесь с нами для получения подробной информации.</p>
            </div>
            <Button href="/contacts" icon={<ArrowRight className="h-4 w-4" weight="bold" />}>
              Перейти к контактам
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
