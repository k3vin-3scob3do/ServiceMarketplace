"use client";
import { ServiceStatus } from "@/app/models/service";
import { UserModel, UserRole, UserStatus } from "@/app/models/user";
import { registerService } from "@/services/servicesService";
import { registerUser } from "@/services/userService";
import { Save, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewUserForm() {
  const r = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "", status: ""});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await registerUser(form);  
      console.log("Registrado cliente:", res);
      if(res.intCode === 200){
        r.push("/admin");
      }
    } catch (error: any) {
      console.log("Error al registrarte");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-pink-600" />
          Registrar nuevo usuario
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              placeholder="Ej. Ana García"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              placeholder="usuario@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select 
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="proveedor">Proveedor</option>
              <option value="cliente">Cliente</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              placeholder="+34 666 123 456"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado inicial
            </label>
            <select 
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="verificado">Verificado</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <Save className="w-4 h-4" />
            Guardar usuario
          </button>
        </div>
      </form>
    </div>
  );
}
