export const PRODUCT_CATEGORIES = ["Оборудование", "Запасные части", "Расходные материалы", "Сервис"] as const;

/** Link into the catalog pre-filtered to a category, so all category entry points stay a single hub. */
export function catalogCategoryHref(category: string) {
  return `/catalog?category=${encodeURIComponent(category)}`;
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₸`;
}
