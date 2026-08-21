import Link from "next/link";
import { CaretRight } from "@/components/ui/icons";

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
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {it.href && !last ? (
                <Link href={it.href} className="text-muted transition-colors hover:text-brand-700">
                  {it.name}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current={last ? "page" : undefined}>
                  {it.name}
                </span>
              )}
              {!last && <CaretRight className="h-3.5 w-3.5 text-subtle" weight="regular" />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
