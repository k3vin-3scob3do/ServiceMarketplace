"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      }) as { role?: string | null };

      // Ejemplo: redirigir según el rol del usuario
      const role = res?.role;
      if (role === "admin") router.push("/admin");
      else if (role === "provider") router.push("/provider");
      else router.push("/");

    } catch (e: any) {
      setErr(e.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h1>

      <form onSubmit={submit} className="border rounded-xl p-6 space-y-3 shadow-sm bg-white">
        <input
          className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Entrando..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        ¿No tienes una cuenta?{" "}
        <Link href="/signup" className="text-pink-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}
