import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { Gauge, CalendarDots, Wrench, Gear, ShieldCheck, Headset } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "service",
    "Сервис и ремонт компрессоров | КазАльфаЮг",
    "Диагностика, плановое техническое обслуживание, ремонт компрессоров и отдельных узлов, дефектовка и технические консультации. Стоимость и срок определяются после диагностики."
  );
}

const services = [
  { title: "Диагностика", desc: "Проверка состояния компрессора и выявление неисправностей.", icon: Gauge },
  { title: "Плановое ТО", desc: "Регулярное обслуживание согласно регламенту и моточасам.", icon: CalendarDots },
  { title: "Ремонт компрессоров", desc: "Устранение неисправностей с согласованием объёма работ.", icon: Wrench },
  { title: "Ремонт узлов", desc: "Восстановление отдельных узлов по согласованию с заказчиком.", icon: Gear },
  { title: "Дефектовка", desc: "Оценка состояния и рекомендации по восстановлению.", icon: ShieldCheck },
  { title: "Технические консультации", desc: "Помощь в эксплуатации и подборе решений.", icon: Headset },
];

export default function ServicePage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Сервис и ремонт" }]} />

      <div className="container mx-auto px-4 pt-10">
        <Reveal>
          <h1 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Сервис и ремонт
          </h1>
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted">
            Сервисный отдел ТОО «КазАльфаЮг» помогает обеспечивать бесперебойную работу вашего оборудования.
            Выезд специалиста на объект обсуждается при поступлении заявки и подтверждается по согласованию.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <Card className="h-full">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                  <s.icon className="h-5 w-5" weight="regular" />
                </span>
                <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 max-w-4xl rounded-xl border-l-2 border-brand-600 bg-accent-soft px-8 py-6">
            <h4 className="text-lg font-bold text-brand-900">Важная информация</h4>
            <p className="mt-2 font-medium text-brand-900">
              «Стоимость и срок ремонта определяются после диагностики оборудования и согласования объёма
              работ.»
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-16 max-w-2xl">
            <Card>
              <LeadForm
                formType="service"
                title="Заявка на сервис или ремонт"
                submitLabel="Отправить заявку"
                messageLabel="Опишите неисправность и оборудование"
                messagePlaceholder="Модель, серийный номер, моточасы, что произошло. Можно прикрепить фото или видео ошибки."
                extraFields={[
                  { name: "equipment", label: "Модель и серийный номер", placeholder: "Модель оборудования, серийный №" },
                  { name: "service_type", label: "Вид обслуживания / ремонта", placeholder: "Диагностика, ТО, ремонт, дефектовка" },
                ]}
              />
            </Card>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
