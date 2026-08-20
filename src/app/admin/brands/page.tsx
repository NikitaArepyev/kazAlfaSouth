import { getContent } from "@/lib/content";
import BrandManager from "@/components/admin/BrandManager";

export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const content = await getContent();
  return <BrandManager initial={content.brands} />;
}
