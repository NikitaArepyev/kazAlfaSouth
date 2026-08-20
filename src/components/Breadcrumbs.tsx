import Link from "next/link";

type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: `https://kazalfayug.kz${it.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className="container mx-auto px-4 pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href && i !== items.length - 1 ? (
              <Link href={it.href} className="hover:text-blue-600 transition-colors">
                {it.name}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{it.name}</span>
            )}
            {i !== items.length - 1 && <span className="text-gray-300">/</span>}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
