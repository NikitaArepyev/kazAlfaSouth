import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { Phone, EnvelopeSimple, MapPin } from "@/components/ui/icons";
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

      <div className="container mx-auto max-w-5xl px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Контакты</h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-10">
              <section>
                <h2 className="mb-6 border-b border-border pb-2 text-xl font-bold text-brand-700">
                  Отдел продаж / Текущий контакт
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Phone className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <a href={`tel:${sales.phone.replace(/\s+/g, "")}`} className="font-bold text-foreground hover:text-brand-700">
                        {sales.phone}
                      </a>
                      <div className="text-sm text-subtle">Звонки и WhatsApp</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <EnvelopeSimple className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <a href={`mailto:${sales.email}`} className="font-bold text-foreground hover:text-brand-700">
                        {sales.email}
                      </a>
                      <div className="text-sm text-subtle">Для коммерческих запросов</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-6 border-b border-border pb-2 text-xl font-bold text-brand-700">
                  Общие контакты компании
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Phone className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <a href={`tel:${general.phone.replace(/\s+/g, "")}`} className="font-bold text-foreground hover:text-brand-700">
                        {general.phone}
                      </a>
                      <div className="text-sm text-subtle">Приёмная</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <EnvelopeSimple className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <a href={`mailto:${general.email}`} className="font-bold text-foreground hover:text-brand-700">
                        {general.email}
                      </a>
                      <div className="text-sm text-subtle">Для официальных писем</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-6 border-b border-border pb-2 text-xl font-bold text-brand-700">
                  Адреса офисов и площадок
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <MapPin className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <div className="font-bold text-foreground">Алматы</div>
                      <p className="text-sm text-muted">{c.addressAlmaty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <MapPin className="h-5 w-5" weight="regular" />
                    </span>
                    <div>
                      <div className="font-bold text-foreground">Шымкент</div>
                      <p className="text-sm text-muted">{c.addressShymkent}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="lg:sticky lg:top-24 lg:h-fit">
              <LeadForm
                formType="contact"
                title="Напишите нам"
                submitLabel="Отправить сообщение"
                messageLabel="Сообщение"
              />
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
