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

      <div className="container mx-auto px-4 max-w-3xl pt-6 prose">
        <h1 className="text-3xl font-bold mb-6">Политика обработки персональных данных</h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Настоящая Политика описывает, как ТОО «КазАльфаЮг» (далее — «Компания») собирает, использует и
          защищает персональные данные, которые вы предоставляете через сайт kazalfayug.kz.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">1. Какие данные мы собираем</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Мы собираем данные, которые вы указываете в формах: имя, телефон / WhatsApp / e-mail, название
          компании, описание запроса, технические данные оборудования, а также прикреплённые файлы.
          Автоматически фиксируются страница обращения, источник перехода и UTM-метки.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. Цели обработки</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Данные используются исключительно для обработки вашего обращения, подбора оборудования, запасных
          частей и расходных материалов, а также для связи по вопросам сервиса и ремонта.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. Передача данных</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Мы не передаём персональные данные третьим лицам, за исключением случаев, предусмотренных
          законодательством Республики Казахстан, либо когда это необходимо для исполнения вашего запроса
          (например, передача данных поставщику для проверки применимости запчасти).
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. Хранение и защита</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Данные хранятся на защищённых ресурсах Компании и используются только уполномоченными
          сотрудниками. Мы применяем технические и организационные меры для защиты данных от
          несанкционированного доступа.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">5. Ваши права</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Вы вправе запросить уточнение, изъятие или удаление ваших персональных данных, обратившись по
          контактам, указанным на странице «Контакты».
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">6. Контакты</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          По вопросам обработки персональных данных: {""}
          <a href="mailto:kazalfayug@gmail.com" className="text-blue-600 underline">
            kazalfayug@gmail.com
          </a>
          , тел. +7 727 297 64 77.
        </p>

        <p className="text-gray-400 text-sm mt-10">
          Дата публикации: 11.08.2026. Политика может обновляться; актуальная версия всегда доступна на этой странице.
        </p>
      </div>
    </div>
  );
}
