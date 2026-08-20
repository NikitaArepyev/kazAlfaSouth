import type { Metadata } from "next";
import { getContent } from "./content";

const BASE = "https://kazalfayug.kz";

export async function buildMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  const c = await getContent();
  const s = c.seo[slug];
  return {
    title: { absolute: s?.title || fallbackTitle },
    description: s?.description || fallbackDescription,
    alternates: { canonical: slug === "home" ? BASE : `${BASE}/${slug}` },
  };
}
