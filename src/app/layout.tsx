import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Analytics from "@/components/Analytics";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://kazalfayug.kz"),
  title: {
    default: "КазАльфаЮг — Компрессорное оборудование и сервис в Казахстане",
    template: "%s | КазАльфаЮг",
  },
  description:
    "Поставка передвижных и стационарных компрессоров, оригинальных и альтернативных запасных частей, фильтров, сепараторов, масел и сервисных комплектов. Техническое обслуживание, диагностика и ремонт.",
  keywords: [
    "компрессоры Казахстан",
    "запасные части компрессоров",
    "сервис компрессоров",
    "Atlas Copco",
    "CompAir",
    "ELGi",
  ],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: "КазАльфаЮг",
    title: "КазАльфаЮг — Компрессорное оборудование и сервис",
    description: "Поставка компрессоров, запасных частей и сервисное обслуживание в Казахстане и Центральной Азии.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const c = content.contacts;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ТОО «КазАльфаЮг»",
    url: "https://kazalfayug.kz",
    description: content.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: c.salesPhone,
        contactType: "sales",
        email: c.salesEmail,
        areaServed: "KZ",
      },
    ],
  };

  return (
    <html lang="ru">
      <body className="antialiased relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="flex flex-col min-h-screen">
          <Header
            sales={{ name: c.salesName, phone: c.salesPhone, whatsapp: c.salesWhatsapp }}
          />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <FloatingWhatsApp whatsapp={c.salesWhatsapp} />
        <Analytics />
      </body>
    </html>
  );
}
