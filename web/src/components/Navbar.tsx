"use client";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a className="font-bold text-lg flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-pink-600" />
          ++Servicios
        </a>
        <div className="flex gap-6 text-gray-700 font-medium">
          <a href="#">Servicios</a>
          <a href="#">Categorías</a>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded border">Iniciar Sesión</button>
          <button className="px-4 py-1.5 rounded bg-pink-600 text-white hover:bg-pink-700">
            Registrarse
          </button>
        </div>
      </nav>
    </header>
  );
}
