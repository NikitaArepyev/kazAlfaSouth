export const PRODUCT_CATEGORIES = ["Оборудование", "Запасные части", "Расходные материалы", "Сервис"] as const;

/** Link into the catalog pre-filtered to a category, so all category entry points stay a single hub. */
export function catalogCategoryHref(category: string) {
  return `/catalog?category=${encodeURIComponent(category)}`;
}

/** Price 0 means the position is quoted per request rather than sold at a list price. */
export function formatPrice(price: number) {
  if (price <= 0) return "Цена по запросу";
  return `${price.toLocaleString("ru-RU")} ₸`;
}
