import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "service",
    "Сервис и ремонт компрессоров | КазАльфаЮг",
    "Диагностика, плановое техническое обслуживание, ремонт компрессоров и отдельных узлов, дефектовка и технические консультации. Стоимость и срок определяются после диагностики."
  );
}

export default function ServicePage() {
  const services = [
    { title: "Диагностика", desc: "Проверка состояния компрессора и выявление неисправностей." },
    { title: "Плановое ТО", desc: "Регулярное обслуживание согласно регламенту и моточасам." },
    { title: "Ремонт компрессоров", desc: "Устранение неисправностей с согласованием объёма работ." },
    { title: "Ремонт узлов", desc: "Восстановление отдельных узлов по согласованию с заказчиком." },
    { title: "Дефектовка", desc: "Оценка состояния и рекомендации по восстановлению." },
    { title: "Технические консультации", desc: "Помощь в эксплуатации и подборе решений." },
  ];

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Сервис и ремонт" }]} />

      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Сервис и ремонт</h1>

        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-gray-600">
            Сервисный отдел ТОО «КазАльфаЮг» помогает обеспечивать бесперебойную работу вашего оборудования.
            Выезд специалиста на объект обсуждается при поступлении заявки и подтверждается по согласованию.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((s, i) => (
            <div key={i} className="p-8 border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-8 max-w-4xl mx-auto rounded-r-2xl mb-16">
          <h4 className="font-bold text-orange-900 mb-2 text-lg">Важная информация</h4>
          <p className="text-orange-800 font-medium">
            «Стоимость и срок ремонта определяются после диагностики оборудования и согласования объёма работ.»
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <LeadForm
            formType="service"
            title="Заявка на сервис или ремонт"
            submitLabel="Отправить заявку"
            messageLabel="Опишите неисправность и оборудование"
            messagePlaceholder="Модель, серийный номер, моточасы, что произошло. Можно прикрепить фото или видео ошибки."
            extraFields={[
              {
                name: "equipment",
                label: "Модель и серийный номер",
                placeholder: "Модель оборудования, серийный №",
              },
              {
                name: "service_type",
                label: "Вид обслуживания / ремонта",
                placeholder: "Диагностика, ТО, ремонт, дефектовка",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
