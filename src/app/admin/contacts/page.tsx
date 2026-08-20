import { getContent } from "@/lib/content";
import ContactsForm from "@/components/admin/ContactsForm";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const content = await getContent();
  return <ContactsForm initial={content.contacts} />;
}
