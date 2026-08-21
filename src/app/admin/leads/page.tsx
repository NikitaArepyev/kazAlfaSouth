import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  formType: string;
  name: string;
  contact: string;
  company?: string;
  message?: string;
  extra?: Record<string, string>;
  createdAt: string;
};

const FORM_LABELS: Record<string, string> = {
  quick_request: "Быстрый запрос",
  spare_parts: "Запчасти",
  service: "Сервис/ремонт",
  contact: "Контакты",
  consumables_to: "Комплект ТО",
  equipment_mobile: "Передвижной компрессор",
  equipment_stationary: "Стационарный компрессор",
  equipment_air_treatment: "Подготовка воздуха",
};

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "leads.jsonl"), "utf8");
    leads = raw.split("\n").filter(Boolean).map((l) => JSON.parse(l));
    leads.reverse();
  } catch {
    leads = [];
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Заявки ({leads.length})</h1>
        <a href="/api/admin/leads" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-700">
          Выгрузить CSV
        </a>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-subtle">Заявок пока нет.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-left text-subtle">
              <tr>
                <th className="p-3">Дата</th>
                <th className="p-3">Тип</th>
                <th className="p-3">Имя</th>
                <th className="p-3">Контакт</th>
                <th className="p-3">Компания</th>
                <th className="p-3">Запрос</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-border align-top">
                  <td className="whitespace-nowrap p-3 text-subtle">{new Date(l.createdAt).toLocaleString("ru-RU")}</td>
                  <td className="p-3 text-foreground">{FORM_LABELS[l.formType] || l.formType}</td>
                  <td className="p-3 font-medium text-foreground">{l.name}</td>
                  <td className="p-3 text-foreground">{l.contact}</td>
                  <td className="p-3 text-muted">{l.company || "—"}</td>
                  <td className="max-w-xs p-3 text-muted">
                    {l.message}
                    {l.extra && Object.keys(l.extra).length > 0 && (
                      <div className="mt-1 text-xs text-subtle">{Object.entries(l.extra).map(([k, v]) => `${k}: ${v}`).join("; ")}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
