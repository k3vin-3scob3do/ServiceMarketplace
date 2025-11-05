"use client";
import { useState } from "react";
import { Upload, Plus, Save, Send } from "lucide-react";

export default function NewServiceForm() {
  const [images, setImages] = useState<File[]>([]);
  const [availabilityType, setAvailabilityType] = useState("flexible");
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - images.length); // máximo 5
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Publicar nuevo servicio
        </h1>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del servicio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Clases de guitarra para principiantes"
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none">
            <option value="">Selecciona una categoría</option>
            <option value="diseño">Diseño Gráfico</option>
            <option value="web">Desarrollo Web</option>
            <option value="marketing">Marketing Digital</option>
            <option value="fotografia">Fotografía</option>
            <option value="consultoria">Consultoría</option>
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del servicio <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Describe tu servicio, qué incluye, tu experiencia, etc."
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">Mínimo 50 caracteres</p>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select className="border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none">
              <option>USD ($)</option>
              <option>MXN ($)</option>
              <option>EUR (€)</option>
            </select>
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <select className="border rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 outline-none">
              <option>por hora</option>
              <option>por proyecto</option>
            </select>
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
            <p className="text-xs text-gray-400 mt-2">
              Máximo 5 imágenes, JPG o PNG, hasta 5MB cada una
            </p>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-3 mt-4">
            {images.map((file, i) => (
              <div
                key={i}
                className="w-20 h-20 border rounded-md flex items-center justify-center text-xs bg-gray-100"
              >
                IMG {i + 1}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 5 - images.length) }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 border rounded-md flex items-center justify-center text-gray-400 text-xl cursor-pointer hover:bg-gray-50"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Disponibilidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disponibilidad <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={availabilityType === "flexible"}
                onChange={() => setAvailabilityType("flexible")}
              />
              Horario flexible (el cliente propone horarios)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={availabilityType === "specific"}
                onChange={() => setAvailabilityType("specific")}
              />
              Horarios específicos
            </label>
          </div>

          {availabilityType === "specific" && (
            <div className="mt-4 grid grid-cols-8 gap-2 text-center text-sm">
              <span></span>
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                <span key={d} className="text-gray-600 font-medium">
                  {d}
                </span>
              ))}

              {["Mañana", "Tarde"].map((t) => (
                <>
                  <span className="text-gray-600 font-medium">{t}</span>
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                    <input
                      key={`${t}-${d}`}
                      type="checkbox"
                      checked={selectedDays[`${t}-${d}`] || false}
                      onChange={() => toggleDay(`${t}-${d}`)}
                    />
                  ))}
                </>
              ))}
            </div>
          )}
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100 transition">
            <Save className="w-4 h-4" />
            Guardar borrador
          </button>

          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <Send className="w-4 h-4" />
            Publicar servicio
          </button>
        </div>
      </div>
    </main>
  );
}
