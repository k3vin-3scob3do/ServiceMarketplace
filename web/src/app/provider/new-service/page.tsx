"use client";
import { useState, useEffect } from "react";
import { Upload, Send } from "lucide-react";
import {
  ServiceCategory,
  ServiceModel,
  ServiceStatus,
} from "@/app/models/service";
import { registerService, updateService } from "@/services/servicesService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewServiceForm({
  onClose,
  serviceToEdit = null,
}: {
  onClose: () => void;
  serviceToEdit?: ServiceModel | null;
}) {
  const r = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [availabilityType, setAvailabilityType] = useState("flexible");

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    images: [] as string[],
  });

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  //  CARGAR DATOS SI ES EDICIÓN
  // -----------------------------
  useEffect(() => {
    if (serviceToEdit) {
      setForm({
        name: serviceToEdit.name,
        category: serviceToEdit.category,
        description: serviceToEdit.description,
        price: serviceToEdit.price,
        images: serviceToEdit.images || [],
      });
    }
  }, [serviceToEdit]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - images.length);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");

      const uploadedUrls = images.map((file, index) => {
        return `https://fake-storage.com/uploads/${Date.now()}_${index}_${file.name}`;
      });

      const serviceData: ServiceModel = {
        ...form,
        images: [...form.images, ...uploadedUrls],
        provider_id: user._id,
      };

      let res;

      // -----------------------------
      //       CREAR SERVICIO
      // -----------------------------
      if (!serviceToEdit) {
        serviceData.status = ServiceStatus.PENDING;
        res = await registerService(serviceData);

        if (res.intCode === 200) {
          toast.success("Servicio publicado correctamente");
        }
      }

      // -----------------------------
      //       ACTUALIZAR SERVICIO
      // -----------------------------
      else {
        res = await updateService(serviceToEdit._id!, serviceData);

        if (res.intCode === 200) {
          toast.success("Servicio actualizado");
        }
      }

      if (typeof onClose === "function") onClose();
      r.refresh();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">
        {serviceToEdit ? "Editar servicio" : "Publicar nuevo servicio"}
      </h2>

      <form onSubmit={submit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del servicio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ej. Clases de guitarra para principiantes"
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as ServiceCategory,
              })
            }
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
            required
          >
            <option value="">Selecciona una categoría</option>
            {Object.values(ServiceCategory)
              .filter((c) => c !== ServiceCategory.ALL)
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del servicio <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="border rounded-lg p-2.5">$</div>
            <input
              type="number"
              value={form.price === 0 ? '' : form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              placeholder="0.00"
              className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imágenes del servicio
          </label>

          <div className="border-2 border-dashed rounded-lg p-6 text-center text-gray-500">
            <Upload className="mx-auto mb-2 w-6 h-6 text-gray-400" />
            <p className="text-sm">Arrastra y suelta tus imágenes aquí</p>
            <p className="text-sm my-1">o</p>

            <label className="inline-block bg-gray-100 px-4 py-1.5 rounded cursor-pointer hover:bg-gray-200 text-sm">
              Seleccionar archivos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {/* Mostrar imágenes existentes */}
            {form.images.map((img, i) => (
              <div
                key={"old_" + i}
                className="w-20 h-20 border rounded-md flex items-center justify-center bg-gray-100 text-xs"
              >
                IMG {i + 1}
              </div>
            ))}

            {/* Nuevas imágenes */}
            {images.map((file, i) => (
              <div
                key={"new_" + i}
                className="w-20 h-20 border rounded-md flex items-center justify-center bg-gray-100 text-xs"
              >
                NEW {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* BOTÓN */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <Send className="w-4 h-4" />
            {serviceToEdit ? "Actualizar servicio" : "Publicar servicio"}
          </button>
        </div>
      </form>
    </div>
  );
}
