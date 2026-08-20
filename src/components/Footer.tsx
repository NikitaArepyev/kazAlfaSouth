import { getContent } from "@/lib/content";

export default async function Footer() {
  const content = await getContent();
  const c = content.contacts;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              КАЗ<span className="text-blue-400">АЛЬФА</span>ЮГ
            </h3>
            <p className="text-gray-400 text-sm">
              {content.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <p className="text-gray-400 text-sm mb-2">{c.salesPhone}</p>
            <p className="text-gray-400 text-sm mb-2">{c.salesEmail}</p>
            <p className="text-gray-400 text-sm">г. Алматы / г. Шымкент</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">График работы</h4>
            <p className="text-gray-400 text-sm">Пн-Пт: 09:00 - 18:00</p>
            <p className="text-gray-400 text-sm">Сб-Вс: Выходной</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} ТОО «КазАльфаЮг». Все права защищены.</p>
          <div className="flex gap-6">
            <a href="/policy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
