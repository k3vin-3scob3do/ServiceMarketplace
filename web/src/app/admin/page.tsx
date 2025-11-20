"use client";

import {
  Users,
  Briefcase,
  Handshake,
  Lock,
  Edit,
  UserPlus,
  Eye,
  X,
  Check,
} from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import NewUserForm from "./new-user/page";

import { UserModel, UserRole, UserStatus } from "../models/user";
import { getUsers, updateUser } from "@/services/userService";

import {
  ServiceCategory,
  ServiceModel,
  ServiceStatus,
} from "../models/service";

import {
  getServices,
  updateService,
  updateServiceStatus,
} from "@/services/servicesService";

import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserModel | null>(null);

  const [users, setUsers] = useState<UserModel[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  const [services, setServices] = useState<ServiceModel[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState<string | null>(null);

  const [filterRole, setFilterRole] = useState<UserRole>(UserRole.ALL);
  const [filterStatus, setFilterStatus] = useState<UserStatus>(UserStatus.ALL);

  const [filterCategory, setFilterCategory] = useState<ServiceCategory>(
    ServiceCategory.ALL
  );
  const [filterStatusService, setFilterStatusService] = useState<ServiceStatus>(
    ServiceStatus.ALL
  );

  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );

  // ---------------------------------------------------
  // CARGAR USUARIOS
  // ---------------------------------------------------
  const loadUsers = async () => {
    try {
      setLoadingUsers(true);

      const roleParam = filterRole !== UserRole.ALL ? filterRole : undefined;
      const statusParam =
        filterStatus !== UserStatus.ALL ? filterStatus : undefined;

      const res = await getUsers(roleParam, statusParam);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      setErrorUsers("Error al cargar usuarios");
    } finally {
      setLoadingUsers(false);
    }
  };

  // ---------------------------------------------------
  // CARGAR SERVICIOS
  // ---------------------------------------------------
  const loadServices = async () => {
    try {
      setLoadingServices(true);

      const categoryParam =
        filterCategory !== ServiceCategory.ALL ? filterCategory : undefined;
      const statusParam =
        filterStatusService !== ServiceStatus.ALL
          ? filterStatusService
          : undefined;

      const res = await getServices(categoryParam, statusParam);
      setServices(res.data);
    } catch (error) {
      console.error(error);
      setErrorServices("Error al cargar servicios");
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filterRole, filterStatus]);

  useEffect(() => {
    loadServices();
  }, [filterCategory, filterStatusService]);

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

          <Users className="w-6 h-6 text-gray-700" />
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* ---------------------------------------------------
          GESTIÓN DE USUARIOS
        --------------------------------------------------- */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
              <p className="text-sm text-gray-600">
                Administra usuarios, roles y permisos
              </p>
            </div>

            <button
              onClick={() => {
                setEditingUser(null);
                setShowUserModal(true);
              }}
              className="bg-pink-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm hover:bg-pink-700"
            >
              <UserPlus className="w-4 h-4" />
              Nuevo Usuario
            </button>
          </div>

          {/* FILTROS */}
          <div className="flex gap-3 mb-4">
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole)}
            >
              <option value="all">Todos los roles</option>
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
              <option value="administrador">Administrador</option>
            </select>

            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as UserStatus)}
            >
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="verificado">Verificado</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>

          {/* TABLA DE USUARIOS */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registro</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loadingUsers && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Cargando usuarios...
                  </td>
                </tr>
              )}

              {!loadingUsers &&
                users.map((u, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </td>

                    <td className="text-center">{u.role}</td>
                    <td className="text-center">{u.status}</td>

                    <td className="text-center">
                      {new Date(u.register_date || "").toLocaleDateString(
                        "es-MX"
                      )}
                    </td>

                    <td className="flex gap-2 justify-center py-2 text-gray-600">
                      {/* EDITAR USUARIO */}
                      <Edit
                        className="w-4 h-4 cursor-pointer hover:text-pink-600"
                        onClick={() => {
                          setEditingUser(u);
                          setShowUserModal(true);
                        }}
                      />

                      {/* VERIFICAR */}
                      <Check
                        className="w-4 h-4 cursor-pointer hover:text-green-600"
                        onClick={async () => {
                          const res = await updateUser(u._id!, {
                            status: "verificado",
                          });
                          if (res?.intCode === 200) loadUsers();
                        }}
                      />

                      {/* BLOQUEAR / DESBLOQUEAR */}
                      <Lock
                        className="w-4 h-4 cursor-pointer hover:text-gray-700"
                        onClick={async () => {
                          const newStatus =
                            u.status === "bloqueado"
                              ? "verificado"
                              : "bloqueado";

                          const res = await updateUser(u._id!, {
                            status: newStatus,
                          });
                          if (res?.intCode === 200) loadUsers();
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ---------------------------------------------------
          GESTIÓN DE SERVICIOS
        --------------------------------------------------- */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-3">Gestión de Servicios</h3>

          {/* FILTROS */}
          <div className="flex gap-3 mb-4">
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value as ServiceCategory)
              }
            >
              <option value="all">Todas las categorías</option>
              <option value="tecnologia">Tecnología</option>
              <option value="educacion">Educación</option>
              <option value="salud">Salud</option>
              <option value="hogar">Hogar</option>
              <option value="negocios">Negocios</option>
              <option value="transporte">Transporte</option>
              <option value="creatividad">Creatividad</option>
              <option value="marketing">Marketing</option>
              <option value="otro">Otro</option>
            </select>

            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={filterStatusService}
              onChange={(e) =>
                setFilterStatusService(e.target.value as ServiceStatus)
              }
            >
              <option value="all">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>

          {/* TABLA DE SERVICIOS */}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Servicio</th>
                <th>Proveedor</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Precio</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loadingServices && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Cargando servicios...
                  </td>
                </tr>
              )}

              {!loadingServices &&
                services.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-gray-500">
                        {s.provider_email}
                      </p>
                    </td>

                    <td className="text-center">
                      {s.provider_name ?? "Sin proveedor"}
                    </td>

                    <td className="text-center">{s.category}</td>
                    <td className="text-center">{s.status}</td>
                    <td className="text-center">${s.price}</td>

                    <td className="flex gap-2 justify-center py-2 text-gray-600">
                      {/* APROBAR */}
                      <Check
                        className="w-4 h-4 cursor-pointer hover:text-green-600"
                        onClick={async () => {
                          const res = await updateServiceStatus(
                            s._id!,
                            ServiceStatus.APPROVED
                          );
                          if (res?.data?.intCode === 200) {
                            toast.success("Servicio aprobado");
                            loadServices(); // <-- AQUÍ REFRESCA
                          }
                        }}
                      />
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-red-600"
                        onClick={async () => {
                          const res = await updateServiceStatus(
                            s._id!,
                            ServiceStatus.REJECTED
                          );
                          if (res?.data?.intCode === 200) {
                            toast.success("Servicio rechazado");
                            loadServices(); // <-- AQUÍ TAMBIÉN REFRESCA
                          }
                        }}
                      />

                      {/* VER DETALLES */}
                      <Eye
                        className="w-4 h-4 cursor-pointer hover:text-blue-600"
                        onClick={() => setSelectedService(s)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* MODAL: DETALLES DE SERVICIO */}
        {selectedService && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-3">{selectedService.name}</h2>

              {selectedService.images?.length ? (
                <Image
                  src={selectedService.images[0]}
                  alt="img"
                  width={500}
                  height={300}
                  className="rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}

              <p className="text-sm">
                <strong>Categoría:</strong> {selectedService.category}
              </p>
              <p className="text-sm">
                <strong>Proveedor:</strong> {selectedService.provider_name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {selectedService.provider_email}
              </p>
              <p className="text-sm mb-3">
                <strong>Descripción:</strong> {selectedService.description}
              </p>

              <button
                onClick={() => setSelectedService(null)}
                className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* MODAL: CREAR / EDITAR USUARIO */}
        {showUserModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => {
              setShowUserModal(false);
              setEditingUser(null);
            }}
          >
            <div
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <NewUserForm
                user={editingUser}
                onClose={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                  loadUsers();
                }}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

// ---------------------------------------------------
// COMPONENTE PARA ESTADÍSTICAS
// ---------------------------------------------------

function StatCard({ title, value, icon, change }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>

        <p
          className={`text-sm ${
            change.startsWith("-") ? "text-red-500" : "text-green-600"
          }`}
        >
          {change}
        </p>
      </div>

      <div className="text-gray-600">{icon}</div>
    </div>
  );
}
