import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <div className="text-6xl font-bold text-blue-900 mb-4">404</div>
      <h1 className="text-2xl font-bold mb-4">Страница не найдена</h1>
      <p className="text-gray-600 mb-8">
        Возможно, страница была перемещена. Вернитесь на главную или воспользуйтесь контактами.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
          На главную
        </Link>
        <Link href="/contacts" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
          Контакты
        </Link>
      </div>
    </div>
  );
}
