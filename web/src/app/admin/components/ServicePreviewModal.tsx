"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { ServiceModel } from "@/app/models/service";

export default function ServicePreviewModal({
  service,
  onClose,
}: {
  service: ServiceModel | null;
  onClose: () => void;
}) {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg shadow-lg p-6"
      >
        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Vista del Servicio</h2>

        {/* Imagen si existe */}
        {/* IMÁGENES DEL SERVICIO */}
        {service.images && service.images.length > 0 && (
          <div className="w-full mb-4">
            <Image
              src={service.images[0]}
              alt="preview"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full"
            />
          </div>
        )}

        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-700">Nombre</p>
            <p className="text-gray-900">{service.name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Proveedor</p>
            <p className="text-gray-900">
              {service.provider_name || "Sin proveedor"}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Email del proveedor</p>
            <p className="text-gray-900">{service.provider_email}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Categoría</p>
            <p className="text-gray-900">{service.category}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Descripción</p>
            <p className="text-gray-900 whitespace-pre-line">
              {service.description || "Sin descripción"}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Precio</p>
            <p className="text-gray-900">${service.price}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700">Estado</p>
            <p className="text-gray-900">{service.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
