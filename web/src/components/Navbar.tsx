"use client";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-black flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-pink-600" />
          ++Servicios
        </Link>

        {/* Links principales */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link href="/services" className="hover:text-pink-600 transition">
            Servicios
          </Link>
          <Link href="/categories" className="hover:text-pink-600 transition">
            Categorías
          </Link>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded border hover:bg-neutral-50 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1.5 rounded bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
}
