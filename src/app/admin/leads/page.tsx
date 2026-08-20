import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Заявки ({leads.length})</h1>
        <a href="/api/admin/leads" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Выгрузить CSV
        </a>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-400 text-sm">Заявок пока нет.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
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
                <tr key={l.id} className="border-t border-gray-100 align-top">
                  <td className="p-3 whitespace-nowrap text-gray-500">{new Date(l.createdAt).toLocaleString("ru-RU")}</td>
                  <td className="p-3">{FORM_LABELS[l.formType] || l.formType}</td>
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3">{l.contact}</td>
                  <td className="p-3">{l.company || "—"}</td>
                  <td className="p-3 max-w-xs">
                    {l.message}
                    {l.extra && Object.keys(l.extra).length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">{Object.entries(l.extra).map(([k, v]) => `${k}: ${v}`).join("; ")}</div>
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
