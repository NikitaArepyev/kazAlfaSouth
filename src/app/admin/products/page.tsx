import { getContent } from "@/lib/content";
import ProductManager from "@/components/admin/ProductManager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const content = await getContent();
  return <ProductManager initial={content.products} brands={content.brands} />;
}
