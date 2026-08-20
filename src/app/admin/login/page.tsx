"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const next = params.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } else {
      setError("Неверный пароль");
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-32 max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Вход в админ-панель</h1>
      <form onSubmit={submit} className="space-y-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
