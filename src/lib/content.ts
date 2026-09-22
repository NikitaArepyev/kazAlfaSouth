import { promises as fs } from "fs";
import path from "path";
import { COMPANY_INFO } from "./constants";

export type Brand = {
  id: string;
  name: string;
  status: string;
  active: boolean;
};

export type CaseStudy = {
  id: string;
  industry: string;
  equipment: string;
  task: string;
  solution: string;
  result: string;
  client: string;
  active: boolean;
};

export type Contacts = {
  salesName: string;
  salesPhone: string;
  salesWhatsapp: string;
  salesEmail: string;
  generalPhone: string;
  generalEmail: string;
  addressAlmaty: string;
  addressShymkent: string;
};

export type SeoEntry = { title?: string; description?: string };

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  unit: string;
  sku: string;
  active: boolean;
  description: string;
  /** Captions for placeholder photo slots shown in the carousel — no real photo files yet. */
  images: string[];
  specs: ProductSpec[];
};

export type SiteContent = {
  tagline: string;
  contacts: Contacts;
  brands: Brand[];
  cases: CaseStudy[];
  products: Product[];
  seo: Record<string, SeoEntry>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

let writeChain: Promise<unknown> = Promise.resolve();

function defaultContent(): SiteContent {
  return {
    tagline: COMPANY_INFO.tagline,
    contacts: {
      salesName: COMPANY_INFO.contacts.sales.name,
      salesPhone: COMPANY_INFO.contacts.sales.phone,
      salesWhatsapp: COMPANY_INFO.contacts.sales.whatsapp,
      salesEmail: COMPANY_INFO.contacts.sales.email,
      generalPhone: COMPANY_INFO.contacts.general.phone,
      generalEmail: COMPANY_INFO.contacts.general.email,
      addressAlmaty: "Алматы — офис и сервисная площадка (адрес уточняется и подлежит подтверждению КАЮ)",
      addressShymkent: "Шымкент — региональное представительство (адрес уточняется и подлежит подтверждению КАЮ)",
    },
    brands: [
      { id: "atlas-copco", name: "Atlas Copco", status: "Компрессорное оборудование и сервис", active: true },
      { id: "compair", name: "CompAir", status: "Поставка и сервис", active: true },
      { id: "elgi", name: "ELGi", status: "Поставка и сервис", active: true },
      { id: "ozen", name: "Özen", status: "Поставка и сервис", active: true },
      { id: "lupamat", name: "Lupamat", status: "Поставка и сервис", active: true },
      { id: "fleetguard", name: "Fleetguard", status: "Фильтры и расходные материалы", active: true },
      { id: "hifi-filter", name: "Hifi Filter", status: "Аналоги фильтров", active: true },
    ],
    cases: [],
    products: [
      {
        id: "p-1",
        name: "Винтовой компрессор GA 30",
        brand: "atlas-copco",
        category: "Оборудование",
        price: 4850000,
        unit: "шт.",
        sku: "AC-GA30",
        active: true,
        description: "Стационарный винтовой компрессор для цехового применения с непрерывным режимом работы и низким уровнем шума.",
        images: ["Общий вид", "Панель управления", "Табличка с серийным номером", "Компрессорный блок"],
        specs: [
          { label: "Производительность", value: "5.2 м³/мин" },
          { label: "Рабочее давление", value: "7.5 бар" },
          { label: "Мощность электродвигателя", value: "30 кВт" },
          { label: "Уровень шума", value: "68 дБ(A)" },
          { label: "Масса", value: "650 кг" },
          { label: "Габариты (Д×Ш×В)", value: "1560×1060×1580 мм" },
        ],
      },
      {
        id: "p-2",
        name: "Передвижной компрессор XAS 185",
        brand: "atlas-copco",
        category: "Оборудование",
        price: 6120000,
        unit: "шт.",
        sku: "AC-XAS185",
        active: true,
        description: "Дизельный передвижной компрессор на шасси для строительных и дорожных работ, устойчив к пыли и перепадам температур.",
        images: ["Общий вид на шасси", "Панель приборов", "Дизельный двигатель", "Буксировочное устройство"],
        specs: [
          { label: "Производительность", value: "10.4 м³/мин" },
          { label: "Рабочее давление", value: "7 бар" },
          { label: "Тип привода", value: "Дизельный двигатель" },
          { label: "Объём топливного бака", value: "165 л" },
          { label: "Масса", value: "1450 кг" },
          { label: "Габариты (Д×Ш×В)", value: "3350×1500×1750 мм" },
        ],
      },
      {
        id: "p-3",
        name: "Винтовой компрессор DH 55",
        brand: "compair",
        category: "Оборудование",
        price: 5300000,
        unit: "шт.",
        sku: "CA-DH55",
        active: true,
        description: "Промышленный винтовой компрессор повышенной производительности для непрерывной эксплуатации на производстве.",
        images: ["Общий вид", "Электрощит управления", "Радиатор охлаждения"],
        specs: [
          { label: "Производительность", value: "9.8 м³/мин" },
          { label: "Рабочее давление", value: "8 бар" },
          { label: "Мощность электродвигателя", value: "55 кВт" },
          { label: "Уровень шума", value: "71 дБ(A)" },
          { label: "Масса", value: "980 кг" },
          { label: "Габариты (Д×Ш×В)", value: "1750×1150×1700 мм" },
        ],
      },
      {
        id: "p-4",
        name: "Винтовой компрессор EN 37",
        brand: "elgi",
        category: "Оборудование",
        price: 3980000,
        unit: "шт.",
        sku: "EG-EN37",
        active: true,
        description: "Компактный винтовой компрессор для средних производственных нагрузок с энергоэффективным приводом.",
        images: ["Общий вид", "Панель управления", "Компрессорный блок"],
        specs: [
          { label: "Производительность", value: "6.5 м³/мин" },
          { label: "Рабочее давление", value: "7.5 бар" },
          { label: "Мощность электродвигателя", value: "37 кВт" },
          { label: "Уровень шума", value: "69 дБ(A)" },
          { label: "Масса", value: "720 кг" },
          { label: "Габариты (Д×Ш×В)", value: "1600×1100×1600 мм" },
        ],
      },
      {
        id: "p-5",
        name: "Осушитель рефрижераторный OZD 30",
        brand: "ozen",
        category: "Оборудование",
        price: 890000,
        unit: "шт.",
        sku: "OZ-OZD30",
        active: true,
        description: "Рефрижераторный осушитель для удаления влаги из сжатого воздуха, устанавливается после компрессора.",
        images: ["Общий вид", "Панель индикации", "Подключение магистрали"],
        specs: [
          { label: "Производительность по воздуху", value: "3.0 м³/мин" },
          { label: "Точка росы", value: "+3 °C" },
          { label: "Макс. рабочее давление", value: "16 бар" },
          { label: "Потребляемая мощность", value: "1.1 кВт" },
          { label: "Масса", value: "95 кг" },
          { label: "Габариты (Д×Ш×В)", value: "650×550×900 мм" },
        ],
      },
      {
        id: "p-6",
        name: "Воздушный сепаратор для компрессорной части",
        brand: "atlas-copco",
        category: "Запасные части",
        price: 145000,
        unit: "шт.",
        sku: "AC-SEP-014",
        active: true,
        description: "Сепараторный элемент для отделения масла от сжатого воздуха в компрессорной части.",
        images: ["Общий вид детали", "Маркировка партномера"],
        specs: [
          { label: "Совместимость", value: "GA 30, GA 37" },
          { label: "Ресурс", value: "8000 моточасов" },
          { label: "Материал корпуса", value: "Нержавеющая сталь" },
          { label: "Степень отделения масла", value: "до 3 ppm" },
          { label: "Масса", value: "4.2 кг" },
        ],
      },
      {
        id: "p-7",
        name: "Ремонтный комплект клапанов",
        brand: "compair",
        category: "Запасные части",
        price: 210000,
        unit: "компл.",
        sku: "CA-VLV-KIT",
        active: true,
        description: "Комплект для планового ремонта впускного клапана: клапан, прокладки и уплотнения.",
        images: ["Состав комплекта", "Впускной клапан крупным планом"],
        specs: [
          { label: "Совместимость", value: "DH 55, DH 75" },
          { label: "Состав комплекта", value: "впускной клапан, прокладки, уплотнения" },
          { label: "Материал", value: "Алюминиевый сплав / EPDM" },
          { label: "Ресурс", value: "12000 моточасов" },
          { label: "Масса", value: "3.5 кг" },
        ],
      },
      {
        id: "p-8",
        name: "Приводной ремень компрессора",
        brand: "elgi",
        category: "Запасные части",
        price: 38000,
        unit: "шт.",
        sku: "EG-BLT-22",
        active: true,
        description: "Армированный клиновой ремень привода компрессорного блока.",
        images: ["Общий вид ремня", "Маркировка"],
        specs: [
          { label: "Совместимость", value: "EN 37, EN 45" },
          { label: "Тип", value: "Клиновой, армированный" },
          { label: "Длина", value: "1800 мм" },
          { label: "Ресурс", value: "6000 моточасов" },
          { label: "Масса", value: "0.4 кг" },
        ],
      },
      {
        id: "p-9",
        name: "Масляный фильтр компрессорный",
        brand: "fleetguard",
        category: "Расходные материалы",
        price: 18500,
        unit: "шт.",
        sku: "FG-OF-501",
        active: true,
        description: "Полнопоточный масляный фильтр для планового технического обслуживания компрессора.",
        images: ["Общий вид фильтра", "Резьба присоединения"],
        specs: [
          { label: "Тип фильтрации", value: "Полнопоточный" },
          { label: "Тонкость фильтрации", value: "15 мкм" },
          { label: "Ресурс замены", value: "2000 моточасов" },
          { label: "Резьба присоединения", value: "3/4-16 UNF" },
          { label: "Масса", value: "0.5 кг" },
        ],
      },
      {
        id: "p-10",
        name: "Воздушный фильтр компрессорный",
        brand: "hifi-filter",
        category: "Расходные материалы",
        price: 15200,
        unit: "шт.",
        sku: "HF-AF-118",
        active: true,
        description: "Панельный складчатый воздушный фильтр для защиты компрессора от пыли и загрязнений.",
        images: ["Общий вид фильтра", "Складчатый элемент крупным планом"],
        specs: [
          { label: "Тип", value: "Панельный, складчатый" },
          { label: "Эффективность очистки", value: "99.9%" },
          { label: "Ресурс замены", value: "1000 моточасов" },
          { label: "Материал фильтрующего элемента", value: "Целлюлоза" },
          { label: "Масса", value: "0.6 кг" },
        ],
      },
      {
        id: "p-11",
        name: "Компрессорное масло синтетическое, 20 л",
        brand: "lupamat",
        category: "Расходные материалы",
        price: 62000,
        unit: "канистра",
        sku: "LM-OIL-20",
        active: true,
        description: "Синтетическое компрессорное масло для винтовых компрессоров, расширенный интервал замены.",
        images: ["Канистра 20 л", "Этикетка с характеристиками"],
        specs: [
          { label: "Тип", value: "Синтетическое" },
          { label: "Вязкость", value: "ISO VG 46" },
          { label: "Ресурс замены", value: "4000 моточасов" },
          { label: "Температурный диапазон", value: "-20…+120 °C" },
          { label: "Объём тары", value: "20 л" },
        ],
      },
      {
        id: "p-12",
        name: "Сепараторный элемент",
        brand: "hifi-filter",
        category: "Расходные материалы",
        price: 27500,
        unit: "шт.",
        sku: "HF-SEP-77",
        active: true,
        description: "Проверенный аналог сепараторного элемента, применимость подтверждается инженером перед поставкой.",
        images: ["Общий вид элемента", "Маркировка партномера"],
        specs: [
          { label: "Совместимость", value: "уточняется по модели" },
          { label: "Степень отделения масла", value: "до 3 ppm" },
          { label: "Ресурс замены", value: "8000 моточасов" },
          { label: "Материал", value: "Боросиликатное стекловолокно" },
          { label: "Масса", value: "1.8 кг" },
        ],
      },
      {
        id: "p-13",
        name: "Регламентное ТО-1000",
        brand: "atlas-copco",
        category: "Сервис",
        price: 185000,
        unit: "выезд",
        sku: "SRV-TO-1000",
        active: true,
        description: "Плановое техническое обслуживание компрессора каждые 1000 моточасов с выездом специалиста.",
        images: ["Выезд специалиста", "Диагностика узла", "Акт выполненных работ"],
        specs: [
          { label: "Периодичность", value: "каждые 1000 моточасов" },
          { label: "Состав работ", value: "замена масляного и воздушного фильтров, осмотр ремней" },
          { label: "Длительность", value: "2–3 часа" },
          { label: "Гарантия на работы", value: "6 месяцев" },
          { label: "Выезд специалиста", value: "Алматы, Шымкент" },
        ],
      },
      {
        id: "p-14",
        name: "Регламентное ТО-4000",
        brand: "atlas-copco",
        category: "Сервис",
        price: 340000,
        unit: "выезд",
        sku: "SRV-TO-4000",
        active: true,
        description: "Расширенное техническое обслуживание каждые 4000 моточасов с полной заменой расходников.",
        images: ["Выезд специалиста", "Замена расходных материалов", "Акт выполненных работ"],
        specs: [
          { label: "Периодичность", value: "каждые 4000 моточасов" },
          { label: "Состав работ", value: "полная замена расходников, диагностика узлов" },
          { label: "Длительность", value: "4–6 часов" },
          { label: "Гарантия на работы", value: "6 месяцев" },
          { label: "Выезд специалиста", value: "Алматы, Шымкент" },
        ],
      },
      {
        id: "p-15",
        name: "Диагностика и пусконаладка",
        brand: "compair",
        category: "Сервис",
        price: 95000,
        unit: "выезд",
        sku: "SRV-DIAG",
        active: true,
        description: "Техническая диагностика компрессора с вибродиагностикой и проверкой электрики, отчёт с рекомендациями.",
        images: ["Диагностика оборудования", "Технический отчёт"],
        specs: [
          { label: "Состав работ", value: "проверка электрики, давления, вибродиагностика" },
          { label: "Длительность", value: "1–2 часа" },
          { label: "Формат отчёта", value: "технический акт с рекомендациями" },
          { label: "Выезд специалиста", value: "Алматы, Шымкент" },
        ],
      },
      {
        id: "p-16",
        name: "Ремонт компрессорной части",
        brand: "elgi",
        category: "Сервис",
        price: 420000,
        unit: "работа",
        sku: "SRV-REP-CB",
        active: true,
        description: "Капитальный ремонт компрессорной части: разборка, дефектовка, замена изношенных узлов.",
        images: ["Разборка узла", "Замена компонентов", "Сборка и тест"],
        specs: [
          { label: "Состав работ", value: "разборка, дефектовка, замена узлов" },
          { label: "Длительность", value: "1–3 рабочих дня" },
          { label: "Гарантия на работы", value: "12 месяцев" },
          { label: "Формат работ", value: "выезд специалиста или стационарный сервис" },
        ],
      },
    ],
    seo: {},
  };
}

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    const def = defaultContent();
    return {
      ...def,
      ...parsed,
      contacts: { ...def.contacts, ...(parsed.contacts || {}) },
      brands: parsed.brands?.length ? parsed.brands : def.brands,
      cases: parsed.cases || [],
      products: parsed.products?.length ? parsed.products : def.products,
      seo: parsed.seo || {},
    };
  } catch {
    const def = defaultContent();
    await saveContent(def);
    return def;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const json = JSON.stringify(content, null, 2);
  // Serialize writes to avoid corruption under concurrent saves
  writeChain = writeChain.then(() => fs.writeFile(CONTENT_FILE, json, "utf8"));
  await writeChain;
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
