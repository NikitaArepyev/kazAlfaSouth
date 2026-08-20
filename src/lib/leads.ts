import { promises as fs } from "fs";
import path from "path";

export type Lead = {
  id: string;
  formType: string;
  name: string;
  contact: string;
  company?: string;
  message?: string;
  extra?: Record<string, string>;
  file?: { name: string; size: number; type: string; savedAs?: string };
  pageUrl: string;
  referrer?: string;
  utm?: Record<string, string>;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

export async function appendLead(lead: Lead): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, "uploads"), { recursive: true });
  await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
}

export async function saveUpload(file: File, id: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, "_").slice(-80);
  const savedAs = `${id}__${safeName}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(DATA_DIR, "uploads", savedAs), buf);
  return savedAs;
}
