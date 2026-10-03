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

/** Real photo paths are stored alongside plain caption placeholders in the same array. */
export function isRealImage(slide: string): boolean {
  return slide.startsWith("/") || slide.startsWith("http");
}

/** Quote link that pre-fills the home form's message with this product (read by LeadForm via ?request=). */
export function quoteHref(p: { name: string; sku: string }, brandName: string) {
  const text =
    `Здравствуйте! Прошу подготовить коммерческое предложение на ${p.name}, артикул ${p.sku} (${brandName}).\n` +
    `Интересует цена, наличие и срок поставки.\n` +
    `Количество: `;
  return `/?request=${encodeURIComponent(text)}#request-form`;
}
