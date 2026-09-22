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
  /** Photo paths under /public, or plain text captions for slots without a photo yet. */
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
        id: "p-1630016100",
        name: "PAROIL S (канистра 20 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "канистра",
        sku: "1630016100",
        active: true,
        description: "Компрессорное синтетическое масло для передвижных компрессоров.",
        images: ["/products/oil-fill.jpg", "/products/xas185-desert-panel.jpg"],
        specs: [
          { label: "Партномер", value: "1630016100" },
          { label: "Тип", value: "Синтетическое компрессорное" },
          { label: "Фасовка", value: "Канистра 20 л" },
          { label: "Применение", value: "Передвижные компрессоры" },
        ],
      },
      {
        id: "p-1630016200",
        name: "PAROIL S (бочка 210 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "бочка",
        sku: "1630016200",
        active: true,
        description: "Компрессорное синтетическое масло для передвижных компрессоров.",
        images: ["/products/oil-fill.jpg"],
        specs: [
          { label: "Партномер", value: "1630016200" },
          { label: "Тип", value: "Синтетическое компрессорное" },
          { label: "Фасовка", value: "Бочка 210 л" },
          { label: "Применение", value: "Передвижные компрессоры" },
        ],
      },
      {
        id: "p-1615595400",
        name: "PAROIL E (канистра 20 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "канистра",
        sku: "1615595400",
        active: true,
        description: "Моторное минеральное масло для передвижных компрессоров.",
        images: ["/products/oil-fill.jpg"],
        specs: [
          { label: "Партномер", value: "1615595400" },
          { label: "Тип", value: "Минеральное моторное" },
          { label: "Фасовка", value: "Канистра 20 л" },
          { label: "Применение", value: "Передвижные компрессоры" },
        ],
      },
      {
        id: "p-1615595500",
        name: "PAROIL E (бочка 210 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "бочка",
        sku: "1615595500",
        active: true,
        description: "Моторное минеральное масло для передвижных компрессоров.",
        images: ["/products/oil-fill.jpg"],
        specs: [
          { label: "Партномер", value: "1615595500" },
          { label: "Тип", value: "Минеральное моторное" },
          { label: "Фасовка", value: "Бочка 210 л" },
          { label: "Применение", value: "Передвижные компрессоры" },
        ],
      },
      {
        id: "p-2912600103",
        name: "PAROIL E ADVANCE (канистра 20 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "канистра",
        sku: "2912600103",
        active: true,
        description: "Моторное синтетическое масло для передвижных компрессоров. Встречается под названием ParOil EXTRA.",
        images: ["/products/oil-fill.jpg", "/products/xas185-wellhead.jpg"],
        specs: [
          { label: "Партномер", value: "2912600103" },
          { label: "Тип", value: "Синтетическое моторное" },
          { label: "Фасовка", value: "Канистра 20 л" },
          { label: "Применение", value: "Передвижные компрессоры" },
        ],
      },
      {
        id: "p-1630091800",
        name: "RIF NDURANCE (канистра 20 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "канистра",
        sku: "1630091800",
        active: true,
        description: "Минеральное масло для маслозаполненных винтовых компрессоров.",
        images: ["/products/oil-fill.jpg"],
        specs: [
          { label: "Партномер", value: "1630091800" },
          { label: "Тип", value: "Минеральное" },
          { label: "Фасовка", value: "Канистра 20 л" },
          { label: "Применение", value: "Маслозаполненные винтовые компрессоры" },
        ],
      },
      {
        id: "p-1630091900",
        name: "RIF NDURANCE (бочка 209 л)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "бочка",
        sku: "1630091900",
        active: true,
        description: "Минеральное масло для маслозаполненных винтовых компрессоров.",
        images: ["/products/oil-fill.jpg"],
        specs: [
          { label: "Партномер", value: "1630091900" },
          { label: "Тип", value: "Минеральное" },
          { label: "Фасовка", value: "Бочка 209 л" },
          { label: "Применение", value: "Маслозаполненные винтовые компрессоры" },
        ],
      },
      {
        id: "p-3002609010",
        name: "Сервисный набор 1000 моточасов — XAXS600E",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "3002609010",
        active: true,
        description: "Сервисный набор на 1000 моточасов для компрессора XAXS600E.",
        images: ["/products/filter-install.jpg", "/products/oil-filters-block.jpg"],
        specs: [
          { label: "Партномер", value: "3002609010" },
          { label: "Интервал ТО", value: "1000 моточасов" },
          { label: "Модель компрессора", value: "XAXS600E" },
        ],
      },
      {
        id: "p-3002608700",
        name: "Сервисный набор маслосепаратора S1.5/2LP — XAXS600E",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "3002608700",
        active: true,
        description: "Сервисный набор маслосепаратора S1.5/2LP для компрессора XAXS600E.",
        images: ["/products/valve-kit-parts.jpg"],
        specs: [
          { label: "Партномер", value: "3002608700" },
          { label: "Узел", value: "Маслосепаратор S1.5/2LP" },
          { label: "Модель компрессора", value: "XAXS600E" },
        ],
      },
      {
        id: "p-3002608800",
        name: "Сервисный набор 400 моточасов — V900 (Cummins)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "3002608800",
        active: true,
        description: "Сервисный набор на 400 моточасов для компрессора V900 с двигателем Cummins.",
        images: ["/products/service-warehouse.jpg", "/products/engine-repair-field.jpg"],
        specs: [
          { label: "Партномер", value: "3002608800" },
          { label: "Интервал ТО", value: "400 моточасов" },
          { label: "Модель компрессора", value: "V900 HP/LP" },
          { label: "Двигатель", value: "Cummins" },
        ],
      },
      {
        id: "p-3002608820",
        name: "Сервисный набор 1000 моточасов — V900",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "3002608820",
        active: true,
        description: "Сервисный набор на 1000 моточасов для компрессора V900.",
        images: ["/products/engine-rebuild-shop.jpg", "/products/filter-install.jpg"],
        specs: [
          { label: "Партномер", value: "3002608820" },
          { label: "Интервал ТО", value: "1000 моточасов" },
          { label: "Модель компрессора", value: "V900 HP" },
        ],
      },
      {
        id: "p-3002608710",
        name: "Сервисный набор маслосепаратора — V900",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "3002608710",
        active: true,
        description: "Сервисный набор маслосепаратора для компрессора V900.",
        images: ["/products/valve-kit-parts.jpg"],
        specs: [
          { label: "Партномер", value: "3002608710" },
          { label: "Узел", value: "Маслосепаратор" },
          { label: "Модель компрессора", value: "V900 HP" },
        ],
      },
      {
        id: "p-2912443005",
        name: "Сервисный набор 500 моточасов — XRVS336 (CAT C9)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "2912443005",
        active: true,
        description: "Сервисный набор на 500 моточасов для компрессора XRVS336 с двигателем CAT C9.",
        images: ["/products/engine-repair-field.jpg"],
        specs: [
          { label: "Партномер", value: "2912443005" },
          { label: "Интервал ТО", value: "500 моточасов" },
          { label: "Модель компрессора", value: "XRVS336" },
          { label: "Двигатель", value: "CAT C9" },
        ],
      },
      {
        id: "p-2912443006",
        name: "Сервисный набор 1000 моточасов — XRVS336 (30 бар)",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "2912443006",
        active: true,
        description: "Сервисный набор на 1000 моточасов для компрессора XRVS336 в исполнении на 30 бар.",
        images: ["/products/oil-filters-block.jpg"],
        specs: [
          { label: "Партномер", value: "2912443006" },
          { label: "Интервал ТО", value: "1000 моточасов" },
          { label: "Модель компрессора", value: "XRVS336" },
          { label: "Рабочее давление", value: "30 бар" },
        ],
      },
      {
        id: "p-2911011700",
        name: "Сервисный набор маслосепаратора — XRVS336",
        brand: "atlas-copco",
        category: "Расходные материалы",
        price: 0,
        unit: "комплект",
        sku: "2911011700",
        active: true,
        description: "Сервисный набор маслосепаратора для компрессора XRVS336.",
        images: ["/products/valve-kit-parts.jpg"],
        specs: [
          { label: "Партномер", value: "2911011700" },
          { label: "Узел", value: "Маслосепаратор" },
          { label: "Модель компрессора", value: "XRVS336" },
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
