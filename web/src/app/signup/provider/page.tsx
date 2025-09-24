"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function SignupProvider() {
  const r = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    brand: "", category: "", bio: ""
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setLoading(true);
    try {
      await api("/auth/register/provider", { method: "POST", body: JSON.stringify(form) });
      r.push("/#login");
    } catch (e: any) {
      setErr(e.message);
    } finally { setLoading(false); }
  }

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear cuenta (Proveedor)</h1>
      <form onSubmit={submit} className="border rounded-xl p-6 space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Nombre / Responsable"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email"
               value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Teléfono"
               value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Marca/Empresa (opcional)"
               value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Categoría principal (ej. Música)"
               value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Breve descripción"
                  value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Contraseña" type="password"
               value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded">
          {loading ? "Creando..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}
