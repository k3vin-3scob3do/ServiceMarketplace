"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { registerUser } from "@/services/userService";
import { UserModel, UserRole, UserStatus } from "@/app/models/user";

export default function SignupClient() {
  const r = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const userData: UserModel = {
        ...form,
        role: UserRole.CLIENT,
        status: UserStatus.PENDING
      };

      const res = await registerUser(userData);  
      console.log("Registrado cliente:", res);
      if(res.intCode === 200){
        r.push("/#login");
      }
    } catch (error: any) {
      console.log("Error al registrarte");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border text-black">
      <h1 className="text-2xl font-semibold mb-6 text-center">Crear cuenta (Cliente)</h1>

      <form onSubmit={submit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="Ej. Ana García López"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="usuario@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono (opcional)</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="+52 555 555 5555"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}

        {/* Botón */}
        <button
          disabled={loading}
          className="w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>
    </main>
  );
}
