import Breadcrumbs from "@/components/Breadcrumbs";
import { getContent } from "@/lib/content";
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

      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Бренды</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Работаем с проверенными производителями компрессорного оборудования, запасных частей и расходных
          материалов. Официальные статусы публикуются только при наличии действующего подтверждающего
          документа и в его точной формулировке.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="p-8 border border-gray-200 rounded-2xl flex flex-col items-center text-center">
              <div className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-6 text-gray-300 font-bold">
                {brand.name}
              </div>
              <h3 className="font-bold text-lg mb-2">{brand.name}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{brand.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
