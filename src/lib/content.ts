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

export type SiteContent = {
  tagline: string;
  contacts: Contacts;
  brands: Brand[];
  cases: CaseStudy[];
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
