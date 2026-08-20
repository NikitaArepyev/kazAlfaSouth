import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://kazalfayug.kz/sitemap.xml",
    host: "https://kazalfayug.kz",
  };
}
