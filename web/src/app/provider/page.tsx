"use client";
import {
  Briefcase,
  DollarSign,
  Star,
  FileText,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import NewServiceForm from "./new-service/page";

export default function ProviderDashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="w-5 h-5 text-pink-600" />
            ++Servicios
          </div>
          <h1 className="text-xl font-semibold">Panel de Proveedor</h1>
          <div className="flex gap-3 items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
              width={28}
              height={28}
              alt="Perfil"
              className="rounded-full"
            />
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* MÉTRICAS PRINCIPALES */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <StatCard
            title="Servicios Publicados"
            value="12"
            icon={<Briefcase className="w-6 h-6 text-gray-600" />}
          />
          <StatCard
            title="Solicitudes Pendientes"
            value="5"
            icon={<FileText className="w-6 h-6 text-gray-600" />}
          />
          <StatCard
            title="Reseña Promedio"
            value={
              <div className="flex items-center gap-1">
                4.7
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            }
          />
          <StatCard
            title="Ingresos Generados"
            value="$2,450"
            icon={<DollarSign className="w-6 h-6 text-gray-600" />}
          />
        </div>

        {/* PUBLICAR NUEVO SERVICIO */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            <Plus className="w-5 h-5" />
            Publicar Nuevo Servicio
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* TABLA DE SERVICIOS */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Servicios Publicados</h3>

            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left py-2">Servicio</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Diseño de Logo",
                    desc: "Creación de identidad visual",
                    categoria: "Diseño Gráfico",
                    precio: "$150",
                    estado: "Activo",
                  },
                  {
                    name: "Desarrollo Web",
                    desc: "Sitio web completo",
                    categoria: "Programación",
                    precio: "$800",
                    estado: "Borrador",
                  },
                  {
                    name: "Consultoría SEO",
                    desc: "Optimización web",
                    categoria: "Marketing",
                    precio: "$300",
                    estado: "Bloqueado",
                  },
                ].map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </td>
                    <td className="text-center">{s.categoria}</td>
                    <td className="text-center">{s.precio}</td>
                    <td className="text-center">
                      <StatusBadge estado={s.estado} />
                    </td>
                    <td className="flex gap-2 justify-center py-2 text-gray-600">
                      <Edit className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                      <Eye className="w-4 h-4 cursor-pointer hover:text-pink-600" />
                      <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SOLICITUDES Y NOTIFICACIONES */}
          <div className="space-y-6">
            {/* Solicitudes recientes */}
            <div className="bg-white rounded-lg shadow p-5">
              <h4 className="font-semibold mb-4">Solicitudes Recientes</h4>
              {[
                {
                  name: "María González",
                  servicio: "Diseño de Logo",
                  fecha: "15 Ene 2025",
                },
                {
                  name: "Carlos Ruiz",
                  servicio: "Desarrollo Web",
                  fecha: "14 Ene 2025",
                },
              ].map((req, i) => (
                <div key={i} className="border rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                      width={32}
                      height={32}
                      alt="Usuario"
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-sm text-gray-500">{req.servicio}</p>
                      <p className="text-xs text-gray-400">{req.fecha}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-green-600 text-white py-1.5 rounded hover:bg-green-700 text-sm">
                      Aceptar
                    </button>
                    <button className="flex-1 bg-gray-200 py-1.5 rounded hover:bg-gray-300 text-sm">
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Notificaciones */}
            <div className="bg-white rounded-lg shadow p-5">
              <h4 className="font-semibold mb-4">Notificaciones</h4>
              <ul className="space-y-3 text-sm">
                <li className="border-b pb-2">
                  <p className="font-medium text-gray-800">
                    📩 Nueva solicitud recibida
                  </p>
                  <p className="text-gray-600">
                    Ana López solicita tu servicio de{" "}
                    <strong>Diseño de Logo</strong>
                  </p>
                  <p className="text-xs text-gray-400">Hace 2 horas</p>
                </li>
                <li className="border-b pb-2">
                  <p className="font-medium text-gray-800">
                    ⭐ Nueva reseña recibida
                  </p>
                  <p className="text-gray-600">
                    Pedro Martín te ha dejado una reseña de 5 estrellas
                  </p>
                  <p className="text-xs text-gray-400">Hace 5 horas</p>
                </li>
                <li>
                  <p className="font-medium text-gray-800">
                    🔄 Servicio actualizado
                  </p>
                  <p className="text-gray-600">
                    Tu servicio <strong>Consultoría SEO</strong> ha sido
                    revisado
                  </p>
                  <p className="text-xs text-gray-400">Hace 1 día</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* MODAL DE NUEVO SERVICIO */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
            >
              {/* Formulario */}
              <NewServiceForm />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

/** Tarjetas superiores */
function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h2 className="text-xl font-bold mt-1">{value}</h2>
      </div>
      <div className="text-gray-600">{icon}</div>
    </div>
  );
}

/** Estado visual */
function StatusBadge({ estado }: { estado: string }) {
  const colors: any = {
    Activo: "bg-green-100 text-green-800",
    Borrador: "bg-yellow-100 text-yellow-800",
    Bloqueado: "bg-gray-800 text-white",
  };
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${
        colors[estado] || "bg-gray-200"
      }`}
    >
      {estado}
    </span>
  );
}
