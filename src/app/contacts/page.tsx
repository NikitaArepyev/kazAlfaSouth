import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "contacts",
    "Контакты | КазАльфаЮг",
    "Контакты отдела продаж и компании ТОО «КазАльфаЮг»: телефон, WhatsApp, e-mail. Адреса офисов и сервисных площадок в Алматы и Шымкенте."
  );
}

export default async function ContactsPage() {
  const content = await getContent();
  const c = content.contacts;
  const sales = { name: c.salesName, phone: c.salesPhone, email: c.salesEmail, whatsapp: c.salesWhatsapp };
  const general = { phone: c.generalPhone, email: c.generalEmail };

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Контакты" }]} />

      <div className="container mx-auto px-4 max-w-5xl pt-6">
        <h1 className="text-4xl font-bold mb-12">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-900 border-b pb-2">Отдел продаж / Текущий контакт</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600">👤</div>
                  <div>
                    <div className="font-bold">{sales.name}</div>
                    <div className="text-sm text-gray-500">Ведущий специалист</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600">📞</div>
                  <div>
                    <a href={`tel:${sales.phone.replace(/\s+/g, "")}`} className="font-bold hover:text-blue-600 transition-colors">
                      {sales.phone}
                    </a>
                    <div className="text-sm text-gray-500">Звонки и WhatsApp</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-600">✉️</div>
                  <div>
                    <a href={`mailto:${sales.email}`} className="font-bold hover:text-blue-600 transition-colors">
                      {sales.email}
                    </a>
                    <div className="text-sm text-gray-500">Для коммерческих запросов</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-900 border-b pb-2">Общие контакты компании</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600">📞</div>
                  <div>
                    <a href={`tel:${general.phone.replace(/\s+/g, "")}`} className="font-bold hover:text-blue-600 transition-colors">
                      {general.phone}
                    </a>
                    <div className="text-sm text-gray-500">Приемная</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-600">✉️</div>
                  <div>
                    <a href={`mailto:${general.email}`} className="font-bold hover:text-blue-600 transition-colors">
                      {general.email}
                    </a>
                    <div className="text-sm text-gray-500">Для официальных писем</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-blue-900 border-b pb-2">Адреса офисов и площадок</h2>
              <div className="space-y-6">
                <div>
                  <div className="font-bold">Алматы</div>
                  <p className="text-gray-600 text-sm">{c.addressAlmaty}</p>
                </div>
                <div>
                  <div className="font-bold">Шымкент</div>
                  <p className="text-gray-600 text-sm">{c.addressShymkent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 lg:sticky lg:top-24 h-fit">
            <LeadForm
              formType="contact"
              title="Напишите нам"
              submitLabel="Отправить сообщение"
              messageLabel="Сообщение"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
