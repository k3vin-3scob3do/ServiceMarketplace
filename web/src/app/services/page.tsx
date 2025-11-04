"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

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
      "https://i.pinimg.com/736x/2b/8d/68/2b8d6820549b3279691229f9c42fc455.jpg",
      "https://cdn-media-1.freecodecamp.org/images/1*Aq7TXpuzXp8lTX0Dhxw_DQ.png",
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
    includes: [
      "3 propuestas iniciales",
      "Archivos vectoriales",
      "Revisión incluida",
    ],
    images: [
      "https://cdn-media-1.freecodecamp.org/images/1*Aq7TXpuzXp8lTX0Dhxw_DQ.png",
    ],
    delivery: "5 días",
  },
];

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
  const [selected, setSelected] = useState<Service | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [reviews, setReviews] = useState([
    {
      name: "Ana Rodríguez",
      text: "Excelente servicio, muy profesional y detallista.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      text: "Llegó puntual y cumplió con todo lo prometido.",
      rating: 4,
    },
    {
      name: "Laura Pérez",
      text: "Servicio excepcional, muy detallista y profesional.",
      rating: 5,
    },
  ]);

  const [averageRating, setAverageRating] = useState(() => {
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return reviews.length ? total / reviews.length : 0;
  });

  useEffect(() => {
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = reviews.length ? total / reviews.length : 0;
    setAverageRating(Number(avg.toFixed(1)));
  }, [reviews]);

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
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
              onClick={() => setSelected(service)}
            >
              {/* Imagen principal del servicio */}
              <div className="relative w-full h-40">
                <Image
                  src={service.images[0]}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{service.provider}</p>
                <div className="flex items-center text-sm mt-2 text-gray-800 gap-1">
                  <StarRating rating={service.rating} />
                  <span className="font-medium ml-2">{service.rating}</span>
                  <span className="ml-1 text-gray-600">
                    ({service.reviews} reseñas)
                  </span>
                </div>
                <p className="mt-2 font-semibold text-gray-900">
                  ${service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detalle del servicio seleccionado */}
        {selected && (
          <div className="mt-12 bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Galería con carrusel */}
              <div className="md:w-1/2 relative">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selected.images[selectedImageIndex]}
                    alt={selected.name}
                    fill
                    className="object-cover transition-all duration-300"
                  />

                  {/* Botón anterior */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? selected.images.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  >
                    ‹
                  </button>

                  {/* Botón siguiente */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev === selected.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                  >
                    ›
                  </button>
                </div>

                {/* Miniaturas */}
                <div className="flex gap-2 mt-3 justify-center">
                  {selected.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden border-2 ${
                        i === selectedImageIndex
                          ? "border-pink-500"
                          : "border-transparent"
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
              </div>

              {/* Información */}
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selected.name}
                </h3>
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

              <div className="text-gray-800 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={averageRating} />
                  <p className="font-semibold text-xl">
                    {averageRating.toFixed(1)}
                  </p>
                </div>
                <p className="text-gray-700">
                  Basado en {reviews.length} reseñas
                </p>
              </div>

              {/* Botón para escribir reseña */}
              {!showReviewBox && (
                <button
                  onClick={() => setShowReviewBox(true)}
                  className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                  ✏️ <span>Escribir Reseña</span>
                </button>
              )}

              {/* Caja de texto */}
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
                      onClick={() => {
                        if (newReview.trim() && newRating > 0) {
                          setReviews((prev) => [
                            ...prev,
                            {
                              name: "Usuario Anónimo",
                              text: newReview,
                              rating: newRating,
                            },
                          ]);
                          setNewReview("");
                          setNewRating(0);
                          setShowReviewBox(false);
                        } else {
                          alert(
                            "Por favor selecciona una calificación y escribe una reseña."
                          );
                        }
                      }}
                      className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
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

              {/* Lista de reseñas */}
              <div className="mt-4 space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="border rounded-lg p-3 bg-gray-50">
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg
                          key={j}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={j < r.rating ? "#facc15" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke={j < r.rating ? "#facc15" : "#9ca3af"}
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
                    <p className="text-sm text-gray-800">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
