"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ServiceModel, ServiceStatus } from "../models/service";
import { getServices } from "@/services/servicesService";
import { requestContract } from "@/services/contractService";
import toast from "react-hot-toast";
import { ContractModel, ContractStatus } from "../models/contract";

/** ⭐ Componente de visualización de estrellas */
function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<SolidStar key={i} className="w-4 h-4 text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<OutlineStar key={i} className="w-4 h-4 text-yellow-400" />);
    } else {
      stars.push(<SolidStar key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

/** ⭐ Selector de estrellas (interactivo para reseñas nuevas) */
function StarSelector({ rating, hoverRating, setRating, setHoverRating }: any) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= (hoverRating || rating);
    stars.push(
      <button
        key={i}
        onMouseEnter={() => setHoverRating(i)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(i)}
        className="focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={filled ? "#facc15" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={filled ? "#facc15" : "#9ca3af"}
          className="w-6 h-6 transition-colors duration-150"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 4.304a.563.563 0 00.424.308l4.757.692a.562.562 0 01.312.959l-3.44 3.354a.563.563 0 00-.162.497l.812 4.73a.562.562 0 01-.815.592L12 17.347l-4.253 2.233a.562.562 0 01-.815-.592l.812-4.73a.563.563 0 00-.162-.497L4.142 9.762a.562.562 0 01.312-.959l4.757-.692a.563.563 0 00.424-.308L11.48 3.5z"
          />
        </svg>
      </button>
    );
  }
  return <div className="flex gap-1">{stars}</div>;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selected, setSelected] = useState<ServiceModel | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const loadServices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      setLoadingServices(true);
      const res = await getServices(null, ServiceStatus.APPROVED, null);
      setServices(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingServices(false);
    }
  };

  const requestService = async (service: ServiceModel) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      const contractData: ContractModel = {
        client_id: user._id,
        service_id: service._id,
        provider_id: service.provider_id,
        description: `El usuario ${user.name} ha contratado el servicio ${service.name} realizado por ${service.provider_name}`,
        status: ContractStatus.REQUESTED,
      };
      const res = await requestContract(contractData);
      if (res.intCode === 200) {
        toast.success("Servicio contratado exitosamente");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingServices(false);
    }
  };

  // Navegación del carrusel
  const nextImage = () => {
    const images = selected?.images;
    if (images && images.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    const images = selected?.images;
    if (images && images.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  // Resetear índice de imagen cuando cambia el servicio seleccionado
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selected]);

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          Servicios Disponibles
        </h2>

        {/* GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: ServiceModel) => {
            return (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                onClick={() => {
                  setSelected(service);
                }}
              >
                <div className="relative w-full h-40 bg-gray-100">
                  {service.images?.[0] && (
                    <Image
                      src={service.images[0]}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {service.provider_name}
                  </p>
                  <div className="flex items-center text-sm mt-2 text-gray-800 gap-1">
                    {/* <StarRating rating={avg || 0} />
                    <span className="font-medium ml-2">{avg.toFixed(1)}</span>
                    <span className="ml-1 text-gray-600">
                      ({service.reviews.length} reseñas)
                    </span> */}
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">
                    ${service.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETALLE DEL SERVICIO SELECCIONADO */}
        {selected && (
          <div className="mt-12 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* GALERÍA CON CARRUSEL */}
              <div className="md:w-1/2 relative">
                <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                  {selected.images && selected.images.length > 0 ? (
                    <>
                      <Image
                        src={selected.images[selectedImageIndex]}
                        alt={`${selected.name} - Imagen ${
                          selectedImageIndex + 1
                        }`}
                        fill
                        className="object-cover"
                      />

                      {/* Botones de navegación del carrusel */}
                      {selected.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                          >
                            <ChevronLeftIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                          >
                            <ChevronRightIcon className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Indicador de posición */}
                      {selected.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {selectedImageIndex + 1} / {selected.images.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No hay imágenes disponibles
                    </div>
                  )}
                </div>

                {/* Miniaturas - Solo mostrar si hay más de 1 imagen */}
                {selected.images && selected.images.length > 1 && (
                  <div className="flex gap-2 mt-3 justify-center overflow-x-auto py-2">
                    {selected.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                          i === selectedImageIndex
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Miniatura ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* INFORMACIÓN DEL SERVICIO */}
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selected.name}
                </h3>
                <p className="mt-2 text-gray-800 leading-relaxed">
                  {selected.description}
                </p>

                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => requestService(selected)}
                >
                  Contratar Servicio
                </button>
              </div>
            </div>

            {/* RESEÑAS */}
            <div className="mt-10 border-t pt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Reseñas y Calificaciones
              </h4>

              {/* BOTÓN ESCRIBIR RESEÑA */}
              {!showReviewBox && (
                <button
                  onClick={() => setShowReviewBox(true)}
                  className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                  ✏️ <span>Escribir Reseña</span>
                </button>
              )}

              {/* FORMULARIO DE RESEÑA */}
              {showReviewBox && (
                <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                  <p className="font-semibold mb-2 text-gray-900">
                    Tu calificación:
                  </p>
                  <StarSelector
                    rating={newRating}
                    hoverRating={hoverRating}
                    setRating={setNewRating}
                    setHoverRating={setHoverRating}
                  />
                  <textarea
                    className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 mt-3"
                    placeholder="Escribe tu reseña aquí..."
                    rows={3}
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
