import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import CatalogView from "@/components/CatalogView";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_CATEGORIES } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "catalog",
    "Каталог товаров | КазАльфаЮг",
    "Каталог компрессорного оборудования, запасных частей, расходных материалов и сервисных работ с фильтром по бренду и сортировкой по цене."
  );
}

type CatalogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { category } = await searchParams;
  const content = await getContent();
  const products = content.products.filter((p) => p.active);
  const initialCategory = category && PRODUCT_CATEGORIES.includes(category as (typeof PRODUCT_CATEGORIES)[number]) ? category : "all";

  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Каталог" }]} />

      <div className="container mx-auto px-4 pt-10">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Каталог товаров</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Оборудование, запасные части, расходные материалы и сервисные работы — единый каталог. Отфильтруйте
            список по бренду и категории или отсортируйте по цене — итоговая стоимость и сроки подтверждаются
            менеджером в коммерческом предложении.
          </p>
        </Reveal>

        <CatalogView products={products} brands={content.brands} initialCategory={initialCategory} />
      </div>
    </div>
  );
}
