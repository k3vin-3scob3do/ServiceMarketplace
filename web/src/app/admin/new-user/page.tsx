"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser, updateUser } from "@/services/userService";
import { UserModel } from "@/app/models/user";

export default function NewUserForm({
  onClose,
  user, // <-- NUEVO: usuario a editar
}: {
  onClose: () => void;
  user?: UserModel | null;
}) {
  const r = useRouter();
  const isEdit = !!user; // Detecta si es edición

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- FORMULARIO INICIAL ---
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "cliente", // <- valor default válido
    status: "pendiente", // <- valor default válido
  });

  // --- CARGAR DATOS AL EDITAR ---
  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        password: "",
        phone: user.phone ?? "",
        role: user.role ?? "cliente", // <- FIX
        status: user.status ?? "pendiente", // <- FIX
      });
    }
  }, [user]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      let res;

      if (isEdit) {
        // --- EDITAR ---
        const payload = { ...form };
        if (!payload.password) delete (payload as any).password;

        if (!user || !user._id) {
          toast.error("No se puede editar: el usuario no tiene ID.");
          return;
        }

        const res = await updateUser(user._id, payload);

        toast.success("Usuario actualizado correctamente");
      } else {
        // --- CREAR ---
        res = await registerUser(form);
        toast.success("Usuario registrado correctamente");
      }

      if (!res) {
        toast.error("Falló la comunicación con el servidor");
        return;
      }

      const { intCode, strMessage } = res;

      if (intCode === 200) {
        onClose?.();
        r.refresh();
      } else {
        toast.error(strMessage || "Error en operación");
      }
    } catch (error: any) {
      let backendMsg =
        error?.response?.data?.detail ||
        error?.response?.data?.msg ||
        "Ocurrió un error";

      if (Array.isArray(backendMsg)) {
        backendMsg = backendMsg.map((e: any) => e.msg).join(", ");
      }

      setErr(String(backendMsg));
      toast.error(String(backendMsg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-pink-600" />
          {isEdit ? "Editar usuario" : "Registrar nuevo usuario"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              value={form.email}
              disabled={isEdit} // no se edita email
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Rol */}
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
              <option value="proveedor">Proveedor</option>
              <option value="cliente">Cliente</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña {isEdit && "(opcional)"}
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none text-black"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              {...(!isEdit && { required: true })}
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
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

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <div className="flex justify-end pt-4 border-t">
          <button
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Save className="w-4 h-4" />
            {loading
              ? "Guardando..."
              : isEdit
              ? "Actualizar"
              : "Guardar usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}
