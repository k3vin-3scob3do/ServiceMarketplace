"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { ServiceModel, ServiceStatus, ServiceCategory } from "../models/service";
import { ReviewModel } from "../models/review";
import { getServices } from "@/services/servicesService";
import { requestContract } from "@/services/contractService";
import { getReviews, registerReview } from "@/services/reviewService";
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
  const [filteredServices, setFilteredServices] = useState<ServiceModel[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selected, setSelected] = useState<ServiceModel | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  
  // Estados para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const loadServices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      setLoadingServices(true);
      const res = await getServices(null, ServiceStatus.APPROVED, null);
      if (res.intCode === 200) {
        setServices(res.data);
        applyFilters(res.data, searchQuery, selectedCategory);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los servicios");
    } finally {
      setLoadingServices(false);
    }
  };

  // Aplicar filtros localmente
  const applyFilters = (servicesList: ServiceModel[], query: string, category: ServiceCategory | "") => {
    let filtered = servicesList;

    // Filtro por búsqueda
    if (query) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.provider_name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filtro por categoría
    if (category) {
      filtered = filtered.filter(service => service.category === category);
    }

    setFilteredServices(filtered);
  };

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadServices();
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (category: ServiceCategory | "") => {
    setSelectedCategory(category);
    applyFilters(services, searchQuery, category);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setFilteredServices(services);
  };

  // const loadReviews = async (serviceId: string) => {
  //   try {
  //     setLoadingReviews(true);
  //     const res = await getReviewsByService(serviceId);
  //     if (res.intCode === 200) {
  //       setReviews(res.data || []);
  //     }
  //   } catch (error) {
  //     console.error("Error loading reviews:", error);
  //     toast.error("Error al cargar las reseñas");
  //   } finally {
  //     setLoadingReviews(false);
  //   }
  // };

  const requestService = async (service: ServiceModel) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      
      if (!user._id) {
        toast.error("Debes iniciar sesión para contratar un servicio");
        return;
      }

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
      toast.error("Error al contratar el servicio");
    }
  };

  const submitReview = async () => {
    if (!selected) return;

    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      
      if (!user._id) {
        toast.error("Debes iniciar sesión para escribir una reseña");
        return;
      }

      if (newRating === 0) {
        toast.error("Por favor selecciona una calificación");
        return;
      }

      if (!newReview.trim()) {
        toast.error("Por favor escribe una reseña");
        return;
      }

      const reviewData: ReviewModel = {
        service_id: selected._id!,
        user_id: user._id,
        user_name: user.name || "Usuario Anónimo",
        rating: newRating,
        comment: newReview.trim(),
      };

      const res = await registerReview(reviewData)
      
      if (res.intCode === 200) {
        toast.success("Reseña publicada exitosamente");
        loadReviews()
        setNewReview("");
        setNewRating(0);
        setShowReviewBox(false);
        
        // Recargar las reseñas
        // await loadReviews(selected._id!);
      } else {
        toast.error("Error al publicar la reseña");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error al publicar la reseña");
    }
  };

  const loadReviews = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      
      const res = await getReviews(selected?._id, user._id);
      if (res.intCode === 200) {
        setReviews(res.data)
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar reseñas");
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
    if (selected) {
      loadReviews();
    }
  }, [selected]);

  useEffect(() => {
    loadServices();
  }, []);

  // Calcular promedio de calificaciones
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER CON BÚSQUEDA Y FILTROS */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Servicios Disponibles
          </h2>

          {/* BARRA DE BÚSQUEDA */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar servicios por nombre, descripción o proveedor..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
              >
                <FunnelIcon className="h-5 w-5" />
                Filtros
              </button>
            </div>
          </form>

          {/* FILTROS DESPLEGABLES */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow border mb-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory | "")}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Todas las categorías</option>
                    {Object.values(ServiceCategory)
                      .filter(cat => cat !== ServiceCategory.ALL)
                      .map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>

                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="self-end text-sm text-pink-600 hover:text-pink-700 underline"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CONTADOR DE RESULTADOS */}
          <div className="text-sm text-gray-600 mb-4">
            {filteredServices.length} {filteredServices.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}
            {(searchQuery || selectedCategory) && (
              <span className="ml-2">
                {searchQuery && `para "${searchQuery}"`}
                {searchQuery && selectedCategory && ' en '}
                {selectedCategory && `categoría ${selectedCategory}`}
              </span>
            )}
          </div>
        </div>

        {/* GRID DE SERVICIOS */}
        {loadingServices ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando servicios...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-4">
              {services.length === 0 
                ? "No hay servicios disponibles en este momento" 
                : "No se encontraron servicios que coincidan con tu búsqueda"
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Ver todos los servicios
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service: ServiceModel) => {
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">
                        {service.name}
                      </h3>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-2">
                        {service.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {service.provider_name}
                    </p>
                    <p className="font-semibold text-gray-900">
                      ${service.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DETALLE DEL SERVICIO SELECCIONADO */}
        {selected && (
          <div className="mt-12 bg-white shadow-md rounded-lg p-6">
            {/* ... (el resto del código del modal de detalles permanece igual) */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* GALERÍA CON CARRUSEL */}
              <div className="md:w-1/2 relative">
                <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                  {selected.images && selected.images.length > 0 ? (
                    <>
                      <Image
                        src={selected.images[selectedImageIndex]}
                        alt={`${selected.name} - Imagen ${selectedImageIndex + 1}`}
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selected.name}
                  </h3>
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded">
                    {selected.category}
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed mb-4">
                  {selected.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">Proveedor:</p>
                  <p className="font-medium">{selected.provider_name}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-gray-900">
                    ${selected.price}
                  </p>
                </div>

                <button
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
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

              {/* RESUMEN DE CALIFICACIONES */}
              <div className="text-gray-800 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={averageRating} />
                  <p className="font-semibold text-xl">{averageRating.toFixed(1)}</p>
                </div>
                <p className="text-gray-700">
                  Basado en {reviews.length} reseñas
                </p>
              </div>

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

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={submitReview}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                      Enviar
                    </button>
                    <button
                      onClick={() => {
                        setNewReview("");
                        setNewRating(0);
                        setShowReviewBox(false);
                      }}
                      className="border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* LISTA DE RESEÑAS */}
              <div className="mt-4 space-y-3">
                {loadingReviews ? (
                  <div className="text-center py-4">Cargando reseñas...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No hay reseñas aún. Sé el primero en opinar.
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="border rounded-lg p-3 bg-gray-50">
                      <p className="font-semibold text-gray-900">
                        {review.user_name}
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-gray-800">{review.comment}</p>
                      {review.created_at && (
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}