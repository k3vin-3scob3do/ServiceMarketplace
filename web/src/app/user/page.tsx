"use client";
import { useState } from "react";
import Image from "next/image";
import { Briefcase, Bell, CheckCircle, Pencil, Lock, User } from "lucide-react";

export default function UserPanel() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Ana García López",
    email: "ana.garcia@email.com",
    phone: "+34 666 123 456",
    password: "********",
    photo: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
  });

  const [services] = useState([
    {
      name: "Limpieza del hogar",
      provider: "María Rodríguez",
      date: "15 Ene 2025, 10:00",
      status: "Pendiente",
      rating: 5,
    },
    {
      name: "Reparación fontanería",
      provider: "Carlos Martín",
      date: "12 Ene 2025, 16:30",
      status: "Activo",
      rating: 5,
    },
    {
      name: "Jardinería",
      provider: "Luis Fernández",
      date: "8 Ene 2025, 09:00",
      status: "Finalizado",
      rating: 4,
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      text: "Servicio de jardinería confirmado",
      time: "Hace 2 horas",
      read: false,
    },
    {
      text: "Recordatorio: servicio mañana a las 10:00",
      time: "Hace 1 día",
      read: false,
    },
    {
      text: "Servicio de electricidad cancelado",
      time: "Hace 3 días",
      read: true,
    },
  ]);

  const markAllRead = () =>
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  interface FieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    type?: string;
  }

  function Field({
    label,
    value,
    onChange,
    disabled,
    type = "text",
  }: FieldProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          className="w-full border rounded px-3 py-2 mt-1 text-black"
          disabled={disabled}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="w-5 h-5 text-pink-600" />
            ++Servicios
          </div>
          <h1 className="text-xl font-semibold">Panel de Usuario</h1>
          <div className="flex gap-3 items-center">
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </nav>
      </header>

      {/* CONTENIDO */}
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* DATOS PERSONALES */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Datos Personales</h2>
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="flex items-center gap-2 bg-pink-600 text-white px-3 py-1.5 rounded hover:bg-pink-700 transition"
            >
              <Pencil className="w-4 h-4" />
              {editMode ? "Guardar" : "Editar"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex gap-4 items-center">
              <Image
                src={user.photo}
                alt="Foto de perfil"
                width={70}
                height={70}
                className="rounded-full border"
              />
              <button className="text-sm text-pink-600 hover:underline">
                Cambiar foto
              </button>
            </div>

            <div></div>

            <Field
              label="Nombre completo"
              value={user.name}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, name: v })}
            />
            <Field
              label="Email"
              value={user.email}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, email: v })}
            />
            <Field
              label="Teléfono"
              value={user.phone}
              disabled={!editMode}
              onChange={(v) => setUser({ ...user, phone: v })}
            />
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 mt-1 text-black pr-10"
                disabled={!editMode}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              {!editMode && (
                <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-9" />
              )}
            </div>
          </div>
        </div>

        {/* SERVICIOS CONTRATADOS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Servicios Contratados</h2>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{s.name}</h3>
                  <p className="text-sm text-gray-600">
                    {s.provider} • {s.date}
                  </p>
                  <Stars rating={s.rating} />
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full mt-2 sm:mt-0 ${
                    s.status === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : s.status === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NOTIFICACIONES */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notificaciones</h2>
            <button
              onClick={markAllRead}
              className="text-sm text-gray-600 hover:underline"
            >
              Marcar todas como leídas
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Bell
                    className={`w-4 h-4 ${
                      n.read ? "text-gray-400" : "text-pink-600"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm ${
                        n.read ? "text-gray-600" : "text-gray-900 font-medium"
                      }`}
                    >
                      {n.text}
                    </p>
                    <p className="text-xs text-gray-400">{n.time}</p>
                  </div>
                </div>
                <CheckCircle
                  className={`w-4 h-4 ${
                    n.read ? "text-gray-400" : "text-green-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/** 🔹 Input genérico estilizado */
function Field({ label, value, onChange, disabled, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full border rounded px-3 py-2 mt-1 text-black"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/** 🔹 Estrellas de reseña */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center mt-1">
      {Array.from({ length: 5 }).map((_, j) => (
        <svg
          key={j}
          xmlns="http://www.w3.org/2000/svg"
          fill={j < rating ? "#facc15" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={j < rating ? "#facc15" : "#9ca3af"}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 4.304a.563.563 0 00.424.308l4.757.692a.562.562 0 01.312.959l-3.44 3.354a.563.563 0 00-.162.497l.812 4.73a.562.562 0 01-.815.592L12 17.347l-4.253 2.233a.562.562 0 01-.815-.592l.812-4.73a.563.563 0 00-.162-.497L4.142 9.762a.562.562 0 01.312-.959l4.757-.692a.563.563 0 00.424-.308L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}
