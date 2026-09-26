import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных ТОО «КазАльфаЮг».",
  robots: { index: false, follow: false },
};

export default function PolicyPage() {
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Политика конфиденциальности" }]} />

      <div className="container mx-auto max-w-3xl px-4 pt-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Политика обработки персональных данных</h1>

        <div className="mt-6 space-y-4 text-muted">
          <p className="leading-relaxed">
            Настоящая Политика описывает, как ТОО «КазАльфаЮг» (далее — «Компания») собирает, использует и
            защищает персональные данные, которые вы предоставляете через сайт kazalfayug.kz.
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">1. Какие данные мы собираем</h2>
          <p className="leading-relaxed">
            Мы собираем данные, которые вы указываете в формах: имя, телефон / WhatsApp / e-mail, название
            компании, описание запроса, технические данные оборудования, а также прикреплённые файлы.
            Автоматически фиксируются страница обращения, источник перехода и UTM-метки.
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">2. Цели обработки</h2>
          <p className="leading-relaxed">
            Данные используются исключительно для обработки вашего обращения, подбора оборудования, запасных
            частей и расходных материалов, а также для связи по вопросам сервиса и ремонта.
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">3. Передача данных</h2>
          <p className="leading-relaxed">
            Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных
            законодательством Республики Казахстан, либо когда это необходимо для исполнения вашего запроса
            (например, передача данных поставщику для проверки применимости запчасти).
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">4. Хранение и защита</h2>
          <p className="leading-relaxed">
            Данные хранятся на защищённых ресурсах Компании и используются только уполномоченными
            сотрудниками. Мы применяем технические и организационные меры для защиты данных от
            несанкционированного доступа.
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">5. Ваши права</h2>
          <p className="leading-relaxed">
            Вы вправе запросить уточнение, изъятие или удаление ваших персональных данных, обратившись по
            контактам, указанным на странице «Контакты».
          </p>

          <h2 className="pt-4 text-xl font-bold text-foreground">6. Контакты</h2>
          <p className="leading-relaxed">
            По вопросам обработки персональных данных:{" "}
            <a href="mailto:kazalfayug@gmail.com" className="font-medium text-accent-ink underline">
              kazalfayug@gmail.com
            </a>
            , тел. +7 727 297 64 77.
          </p>

          <p className="pt-6 text-sm text-subtle">
            Дата публикации: 11.08.2026. Политика может обновляться; актуальная версия всегда доступна на этой
            странице.
          </p>
        </div>
      </div>
    </div>
  );
}
