"use client";
import { Users, Briefcase, Handshake, TrendingUp, Lock, Edit, UserPlus, Eye, X, Check } from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="w-5 h-5 text-pink-600" />
            ++Servicios
          </div>
          <h1 className="text-xl font-semibold">Panel de Administrador</h1>
          <div className="flex gap-3 items-center">
            <Users className="w-6 h-6 text-gray-700" />
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* MÉTRICAS PRINCIPALES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Total Contrataciones"
            value="2,847"
            icon={<Handshake className="w-6 h-6 text-gray-600" />}
            change="+12.5%"
          />
          <StatCard
            title="Servicios Publicados"
            value="1,234"
            icon={<Briefcase className="w-6 h-6 text-gray-600" />}
            change="-8.3%"
          />
          <StatCard
            title="Usuarios Registrados"
            value="5,692"
            icon={<Users className="w-6 h-6 text-gray-600" />}
            change="-2.1%"
          />
        </div>

        {/* SERVICIOS Y PROVEEDORES DESTACADOS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold mb-4">Servicios Más Contratados</h3>
            {[
              { name: "Desarrollo Web", count: 456 },
              { name: "Diseño Gráfico", count: 389 },
              { name: "Marketing Digital", count: 312 },
              { name: "Consultoría", count: 234 },
              { name: "Fotografía", count: 178 },
            ].map((s, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="font-medium">{s.count}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-pink-600 h-2 rounded-full"
                    style={{ width: `${(s.count / 456) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold mb-4">Top Proveedores</h3>
            {[
              { rank: 1, name: "María González", category: "Desarrollo Web", contracts: 89, change: "+15%" },
              { rank: 2, name: "Carlos Ruiz", category: "Diseño Gráfico", contracts: 76, change: "+8%" },
              { rank: 3, name: "Ana López", category: "Marketing Digital", contracts: 64, change: "-3%" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-gray-700">{p.rank}</div>
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{p.contracts} contratos</p>
                  <p className="text-xs text-gray-500">{p.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GESTIÓN DE USUARIOS */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
              <p className="text-sm text-gray-600">Administra usuarios, roles y permisos de la plataforma</p>
            </div>
            <button className="flex items-center gap-2 bg-pink-600 text-white px-3 py-1.5 rounded hover:bg-pink-700 text-sm">
              <UserPlus className="w-4 h-4" />
              Nuevo Usuario
            </button>
          </div>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="border rounded-md px-3 py-1 w-full text-sm"
            />
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Todos los roles</option>
              <option>Proveedor</option>
              <option>Cliente</option>
            </select>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Todos los estados</option>
              <option>Verificado</option>
              <option>Pendiente</option>
              <option>Bloqueado</option>
            </select>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "María González", email: "maria@email.com", rol: "Proveedor", estado: "Verificado", fecha: "15 Ene 2025" },
                { name: "Carlos Ruiz", email: "carlos@email.com", rol: "Cliente", estado: "Pendiente", fecha: "12 Ene 2025" },
                { name: "Ana López", email: "ana@email.com", rol: "Proveedor", estado: "Bloqueado", fecha: "08 Ene 2025" },
              ].map((u, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-gray-500 text-xs">{u.email}</p>
                    </div>
                  </td>
                  <td className="text-center">{u.rol}</td>
                  <td className="text-center">{u.estado}</td>
                  <td className="text-center">{u.fecha}</td>
                  <td className="flex gap-2 justify-center py-2 text-gray-600">
                    <Edit className="w-4 h-4 cursor-pointer hover:text-pink-600" />
                    <Check className="w-4 h-4 cursor-pointer hover:text-green-600" />
                    <Lock className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GESTIÓN DE SERVICIOS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Gestión de Servicios</h3>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="border rounded-md px-3 py-1 w-full text-sm"
            />
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Todas las categorías</option>
              <option>Diseño</option>
              <option>Web</option>
            </select>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Todos los estados</option>
              <option>Aprobado</option>
              <option>Pendiente</option>
              <option>Rechazado</option>
            </select>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Servicio</th>
                <th>Proveedor</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { servicio: "Diseño de Logo Profesional", proveedor: "María González", categoria: "Diseño Gráfico", estado: "Pendiente", precio: "$150" },
                { servicio: "Desarrollo Web Responsive", proveedor: "Carlos Ruiz", categoria: "Desarrollo Web", estado: "Aprobado", precio: "$500" },
              ].map((s, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    <div>
                      <p className="font-medium">{s.servicio}</p>
                      <p className="text-gray-500 text-xs">Proyecto reciente</p>
                    </div>
                  </td>
                  <td className="text-center">{s.proveedor}</td>
                  <td className="text-center">{s.categoria}</td>
                  <td className="text-center">{s.estado}</td>
                  <td className="text-center">{s.precio}</td>
                  <td className="flex gap-2 justify-center py-2 text-gray-600">
                    <Check className="w-4 h-4 cursor-pointer hover:text-green-600" />
                    <X className="w-4 h-4 cursor-pointer hover:text-red-600" />
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

/** 🔹 Componente de tarjeta de estadística */
function StatCard({ title, value, icon, change }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        <p className={`text-sm ${change.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
          {change}
        </p>
      </div>
      <div className="text-gray-600">{icon}</div>
    </div>
  );
}
