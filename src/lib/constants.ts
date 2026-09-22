export const COMPANY_INFO = {
  name: "ТОО «КазАльфаЮг»",
  tagline: "Компрессоры, запасные части и сервис для предприятий Казахстана и Центральной Азии",
  foundedYear: 2014,
  contacts: {
    sales: {
      name: "Кирилл Жирнов",
      phone: "+7 705 993 88 88",
      whatsapp: "77059938888",
      email: "kz.alfayug@gmail.com",
    },
    general: {
      phone: "+7 727 297 64 77",
      email: "kazalfayug@gmail.com",
    },
  },
};

export type MenuItem = {
  label: string;
  href: string;
  /** Dropdown sub-links shown under this item; the item itself stays a plain link too. */
  children?: { label: string; href: string }[];
};

/**
 * All product/service browsing funnels through the catalog — no separate
 * per-category nav destinations.
 */
export const MENU_ITEMS: MenuItem[] = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
];
