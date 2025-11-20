"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { User, Mail, Lock, Phone, Briefcase, Type, Loader2 } from "lucide-react";
import { UserModel, UserRole, UserStatus } from "@/app/models/user";
import { registerUser } from "@/services/userService";

export default function SignupProvider() {
  const r = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const userData: UserModel = {
        ...form,
        role: UserRole. PROVIDER,
        status: UserStatus.PENDING
      };

      const res = await registerUser(userData);  
      console.log("Registrado proveedor:", res);
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
      <h1 className="text-2xl font-semibold mb-6 text-center">Crear cuenta (Proveedor)</h1>

      <form onSubmit={submit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre o responsable</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="Ej. Juan Pérez"
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
              placeholder="proveedor@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="+52 555 555 5555"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Marca */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Marca o empresa</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="Ej. LimpiaExpress"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
          </div>
        </div> */}

        {/* Categoría */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Categoría principal</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Type className="w-4 h-4 text-gray-500 mr-2" />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              placeholder="Ej. Música, Fontanería..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
        </div> */}

        {/* Bio */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Breve descripción</label>
          <textarea
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pink-500 outline-none resize-none text-black placeholder-gray-400"
            rows={3}
            placeholder="Describe tu experiencia o servicios..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div> */}

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
