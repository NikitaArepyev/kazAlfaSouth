import { getContent } from "@/lib/content";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const content = await getContent();
  return <SettingsForm tagline={content.tagline} seo={content.seo} />;
}
