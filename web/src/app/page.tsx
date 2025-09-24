"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Search, User, Briefcase } from "lucide-react";

export default function HomePage() {
  const r = useRouter();
  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await api<{ access_token: string; token_type: string }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) }
      );
      localStorage.setItem("token", res.access_token); // TODO: pasar a cookie httpOnly
      r.push("/services");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1678203699263-917199c725b2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVybyUyMGltYWdlfGVufDB8fDB8fHww')" }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold">
            Encuentra el servicio perfecto para tu negocio
          </h1>
          <p className="mt-3 text-lg text-gray-200">
            Conecta con profesionales verificados y contrata servicios de
            calidad
          </p>

          {/* Search mejorado */}
          <div className="mt-8 flex justify-center">
            <div className="flex w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="¿Qué servicio necesitas?"
                className="flex-grow px-4 py-3 bg-white text-black focus:outline-none"
              />
              <button className="px-6 bg-pink-600 text-white hover:bg-pink-700 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN + SIGNUP */}
      <section id="login" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Acceso y Registro
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Card Login */}
            <form
              onSubmit={onLogin}
              className="border rounded-xl p-6 bg-white shadow-sm text-gray-900"
            >
              <h3 className="font-semibold mb-4">Iniciar Sesión</h3>

              <label className="text-sm">Email</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="correo@ejemplo.com"
                required
              />

              <label className="text-sm">Contraseña</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
              />

              {err && <p className="text-sm text-red-600 mb-2">{err}</p>}

              <button
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded hover:opacity-90"
              >
                {loading ? "Entrando..." : "Iniciar Sesión"}
              </button>
            </form>

            {/* Card Registro */}
            <div className="border rounded-xl p-6 bg-white shadow-sm text-gray-900">
              <h3 className="font-semibold mb-4">Registro</h3>

              <div className="space-y-3">
                <Link
                  href="/signup/client"
                  className="flex items-center justify-center gap-2 border rounded px-4 py-3 hover:bg-neutral-50"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span>Registrarse como Cliente</span>
                </Link>

                <Link
                  href="/signup/provider"
                  className="flex items-center justify-center gap-2 border rounded px-4 py-3 hover:bg-neutral-50"
                >
                  <Briefcase className="w-5 h-5 text-pink-600" />
                  <span>Registrarse como Proveedor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
