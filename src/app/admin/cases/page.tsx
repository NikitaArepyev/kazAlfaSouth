import { getContent } from "@/lib/content";
import CaseManager from "@/components/admin/CaseManager";

export const dynamic = "force-dynamic";

export default async function AdminCasesPage() {
  const content = await getContent();
  return <CaseManager initial={content.cases} />;
}
