"use client";
import { useState } from "react";
import { Star } from "lucide-react";

interface Service {
  id: number;
  name: string;
  provider: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  includes: string[];
  images: string[];
  delivery: string;
}

const sampleServices: Service[] = [
  {
    id: 1,
    name: "Desarrollo Web Profesional",
    provider: "Juan Pérez",
    price: 500,
    rating: 4.8,
    reviews: 127,
    description:
      "Desarrollo de sitios web modernos y responsivos utilizando las últimas tecnologías. Incluye diseño, desarrollo, hosting y mantenimiento por 3 meses.",
    includes: [
      "Diseño responsive",
      "Optimización SEO",
      "Panel de administración",
      "3 meses de soporte",
    ],
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/150x100",
      "https://placehold.co/150x100",
      "https://placehold.co/150x100",
    ],
    delivery: "15 días",
  },
  {
    id: 2,
    name: "Diseño de Logotipos",
    provider: "María García",
    price: 150,
    rating: 4.5,
    reviews: 87,
    description:
      "Creación de logotipos únicos y profesionales para marcas personales y empresas. Incluye revisión y archivos editables.",
    includes: ["3 propuestas iniciales", "Archivos vectoriales", "Revisión incluida"],
    images: ["https://placehold.co/600x400"],
    delivery: "5 días",
  },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          Servicios Disponibles
        </h2>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelected(service)}
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                Imagen del Servicio
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{service.provider}</p>
                <div className="flex items-center text-sm mt-2 text-gray-800">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="ml-1 text-gray-600">
                    ({service.reviews} reseñas)
                  </span>
                </div>
                <p className="mt-2 font-semibold text-gray-900">${service.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detalle del servicio seleccionado */}
        {selected && (
          <div className="mt-12 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Galería */}
              <div className="md:w-1/2">
                <div className="h-64 bg-gray-200 flex items-center justify-center mb-4 text-gray-700">
                  Galería del Servicio
                </div>
                <div className="flex gap-2">
                  {selected.images.map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-16 bg-gray-200 rounded-md border border-gray-300"
                    />
                  ))}
                </div>
              </div>

              {/* Información */}
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-900">{selected.name}</h3>
                <p className="mt-2 text-gray-800 leading-relaxed">
                  {selected.description}
                </p>

                <div className="mt-4 border p-3 rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-2 text-gray-900">Incluye:</h4>
                  <ul className="text-sm text-gray-800 list-disc list-inside">
                    {selected.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">
                    ${selected.price}
                  </p>
                  <p className="text-sm text-gray-700">
                    Entrega en {selected.delivery}
                  </p>
                </div>

                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  Contratar Servicio
                </button>
              </div>
            </div>

            {/* Reseñas */}
            <div className="mt-10 border-t pt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Reseñas y Calificaciones
              </h4>
              <div className="text-gray-800 text-sm">
                <p className="font-semibold text-xl flex items-center gap-1">
                  {selected.rating}
                  <Star className="inline w-5 h-5 text-yellow-500" />
                </p>
                <p className="text-gray-700">
                  Basado en {selected.reviews} reseñas
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="font-semibold text-gray-900">Ana Rodríguez</p>
                  <p className="text-sm text-gray-800">
                    Excelente servicio, muy profesional y detallista.
                  </p>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="font-semibold text-gray-900">Carlos Mendoza</p>
                  <p className="text-sm text-gray-800">
                    Llegó puntual y cumplió con todo lo prometido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
