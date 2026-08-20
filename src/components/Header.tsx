"use client";

import { useState } from "react";
import Link from "next/link";
import { MENU_ITEMS } from "@/lib/constants";
import { track } from "@/lib/analytics";

type SalesProps = { name: string; phone: string; whatsapp: string };

export default function Header({ sales }: { sales: SalesProps }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold text-blue-900 leading-none">
              КАЗ<span className="text-blue-500">АЛЬФА</span>ЮГ
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <a
                href={`tel:${sales.phone.replace(/\s+/g, "")}`}
                onClick={() => track("phone_click", { location: "header" })}
                className="text-lg font-bold text-blue-900"
              >
                {sales.phone}
              </a>
              <span className="text-xs text-gray-500">Отдел продаж</span>
            </div>

            <a
              href={`https://wa.me/${sales.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "header" })}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
              title="WhatsApp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045a11.871 11.871 0 001.592 5.973L0 24l6.135-1.61a11.81 11.81 0 005.91 1.586h.005c6.637 0 12.048-5.411 12.052-12.047a11.82 11.82 0 00-3.483-8.48z" />
              </svg>
            </a>

            <Link
              href="/#request-form"
              className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              Запросить КП
            </Link>

            <button
              type="button"
              className="xl:hidden p-2 text-gray-700"
              aria-label="Меню"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <a
                href={`tel:${sales.phone.replace(/\s+/g, "")}`}
                onClick={() => track("phone_click", { location: "mobile_menu" })}
                className="flex-1 text-center bg-blue-900 text-white px-4 py-3 rounded-lg font-bold"
              >
                {sales.phone}
              </a>
              <a
                href={`https://wa.me/${sales.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "mobile_menu" })}
                className="flex-1 text-center bg-green-500 text-white px-4 py-3 rounded-lg font-bold"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
