import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata(
    "brands",
    "Бренды | КазАльфаЮг",
    "Бренды компрессорного оборудования, запасных частей и расходных материалов, с которыми работает ТОО «КазАльфаЮг»: Atlas Copco, CompAir, ELGi, Özen, Lupamat, Fleetguard, Hifi Filter."
  );
}

export default async function BrandsPage() {
  const content = await getContent();
  const brands = content.brands.filter((b) => b.active);
  return (
    <div className="pb-20">
      <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Бренды" }]} />

      <div className="container mx-auto px-4 pt-10">
        <Reveal>
          <h1 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">Бренды</h1>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Работаем с проверенными производителями компрессорного оборудования, запасных частей и расходных
            материалов. Официальные статусы публикуются только при наличии действующего подтверждающего
            документа и в его точной формулировке.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <Reveal key={brand.id} delay={(i % 4) * 0.05}>
              <Card className="flex h-full flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-full items-center justify-center rounded-lg border border-border bg-surface-2 px-4">
                  <span className="text-lg font-bold tracking-tight text-foreground">{brand.name}</span>
                </div>
                <h3 className="font-bold text-foreground">{brand.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-subtle">
                  {brand.status}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
