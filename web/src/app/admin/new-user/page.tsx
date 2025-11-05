"use client";
import { Save, UserPlus } from "lucide-react";

export default function NewUserForm() {
  return (
    <div className="p-6 space-y-6">
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rol
          </label>
          <select className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none">
            <option value="">Selecciona un rol</option>
            <option value="Proveedor">Proveedor</option>
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado inicial
          </label>
          <select className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none">
            <option value="Pendiente">Pendiente</option>
            <option value="Verificado">Verificado</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          <Save className="w-4 h-4" />
          Guardar usuario
        </button>
      </div>
    </div>
  );
}
