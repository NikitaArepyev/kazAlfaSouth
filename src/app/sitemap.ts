import type { MetadataRoute } from "next";

const BASE = "https://kazalfayug.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catalog",
    "/equipment",
    "/equipment/mobile",
    "/equipment/stationary",
    "/equipment/air-treatment",
    "/spare-parts",
    "/consumables",
    "/service",
    "/brands",
    "/projects",
    "/about",
    "/contacts",
  ];

  return routes.map((r) => ({
    url: BASE + r,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
