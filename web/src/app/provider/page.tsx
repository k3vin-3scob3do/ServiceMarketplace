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
import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import NewServiceForm from "./new-service/page";
import { ServiceModel } from "../models/service";
import { getServices } from "@/services/servicesService";
import { getContracts, updateStatus } from "@/services/contractService";
import { ContractModel, ContractStatus } from "../models/contract";
import toast from "react-hot-toast";

export default function ProviderDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceModel | null>(null);

  const [services, setServices] = useState<ServiceModel[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState<string | null>(null);
  const [contracts, setContracts] = useState<ContractModel[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);

  const loadServices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");

      setLoadingServices(true);

      const res = await getServices(null, null, user._id);
      setServices(res.data);
    } catch (error) {
      console.error(error);
      setErrorServices("Error al cargar servicios");
    } finally {
      setLoadingServices(false);
    }
  };

  const loadContracts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");

      setLoadingContracts(true);

      const res = await getContracts(user._id, null, null, null)
      setContracts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingContracts(false);
    }
  };

  const updateContractStatus = async (contractId: string, status: ContractStatus) => {
    try {
      setLoadingContracts(true);
      const res = await updateStatus(contractId, status)
      if(res.intCode === 200) {
        toast.success("Has aceptado el contrato con exito")
        await loadContracts()
      }
    } catch (error) {
      toast.error("Algo salio mal, vuelve a intentar")
      console.error(error);
    } finally {
      setLoadingContracts(false);
    }
  }

  useEffect(() => {
    loadServices();
    loadContracts()
  }, []);

  const openNewServiceModal = () => {
    setServiceToEdit(null);
    setShowModal(true);
  };

  const openEditModal = (service: ServiceModel) => {
    setServiceToEdit(service);
    setShowModal(true);
  };

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
        {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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
        </div> */}

        {/* PUBLICAR NUEVO */}
        <div>
          <button
            onClick={openNewServiceModal}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            <Plus className="w-5 h-5" />
            Publicar Nuevo Servicio
          </button>
        </div>

        {/* TABLA */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Servicios Publicados</h3>

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
                {loadingServices && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Cargando servicios...
                    </td>
                  </tr>
                )}

                {errorServices && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-red-500">
                      {errorServices}
                    </td>
                  </tr>
                )}

                {!loadingServices &&
                  services.map((s) => (
                    <tr key={s._id} className="border-b hover:bg-gray-50">
                      <td className="py-1">
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-gray-500 text-xs">
                            {s.provider_email}
                          </p>
                        </div>
                      </td>

                      <td className="text-center">
                        {s.provider_name ?? "Sin proveedor"}
                      </td>

                      <td className="text-center">{s.category}</td>

                      <td className="text-center">{s.status}</td>

                      <td className="text-center">${s.price}</td>

                      <td className="flex gap-2 justify-center py-2 text-gray-600">
                        <Edit
                          className="w-4 h-4 cursor-pointer hover:text-pink-600"
                          onClick={() => openEditModal(s)}
                        />
                        {/* <Check className="w-4 h-4 cursor-pointer hover:text-green-600" />
                        <X className="w-4 h-4 cursor-pointer hover:text-red-600" />
                        <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" /> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Solicitudes */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h4 className="font-semibold mb-4">Solicitudes Recientes</h4>

              {contracts
                .filter(c => c.status === ContractStatus.REQUESTED)
                .map((c: ContractModel) => (
                  <div key={c._id} className="border rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                        width={32}
                        height={32}
                        alt="Usuario"
                        className="rounded-full"
                      />

                      <div>
                        <p className="font-medium">{c.client_name}</p>
                        <p className="text-sm text-gray-500">{c.service_name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(c.request_date ?? "").toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 bg-green-600 text-white py-1.5 rounded hover:bg-green-700 text-sm"
                        onClick={() => updateContractStatus(c._id!, ContractStatus.IN_PROGRESS)}
                      >
                        Aceptar
                      </button>

                      <button
                        className="flex-1 bg-gray-200 py-1.5 rounded hover:bg-gray-300 text-sm"
                        onClick={() => updateContractStatus(c._id!, ContractStatus.REJECTED)}
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <h4 className="font-semibold mb-4">Contratos Activos</h4>

              {contracts
                .filter(c => c.status === ContractStatus.IN_PROGRESS)
                .map((c: ContractModel) => (
                  <div key={c._id} className="border rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                        width={32}
                        height={32}
                        alt="Usuario"
                        className="rounded-full"
                      />

                      <div>
                        <p className="font-medium">{c.client_name}</p>
                        <p className="text-sm text-gray-500">{c.service_name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(c.request_date ?? "").toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        {/* <p className="text-xs text-gray-400">
                          {new Date(c.createdAt ?? "").toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p> */}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 bg-red-600 text-white py-1.5 rounded hover:bg-red-700 text-sm"
                        onClick={() => updateContractStatus(c._id!, ContractStatus.CANCELED)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg"
            >
              <NewServiceForm
                onClose={() => {
                  setShowModal(false);
                  loadServices();
                }}
                serviceToEdit={serviceToEdit}
              />
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
