"use client";

import Link from "next/link";
import { Briefcase, Shield, Store, User } from "lucide-react";
import { useUser } from "@/app/context/userContext";

export default function Navbar() {
  const { user: currentUser, logout } = useUser();

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-black flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-pink-600" />
          ++Servicios
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link href="/services" className="hover:text-pink-600 transition">
            Servicios
          </Link>

          {currentUser?.role === "cliente" && (
            <Link href="/user" className="flex items-center gap-1 hover:text-pink-600 transition">
              <User className="w-4 h-4" /> Panel Usuario
            </Link>
          )}

          {currentUser?.role === "proveedor" && (
            <Link href="/provider" className="flex items-center gap-1 hover:text-pink-600 transition">
              <Store className="w-4 h-4" /> Panel Proveedor
            </Link>
          )}

          {currentUser?.role === "administrador" && (
            <Link href="/admin" className="flex items-center gap-1 hover:text-pink-600 transition">
              <Shield className="w-4 h-4" /> Panel Admin
            </Link>
          )}
        </div>

        {/* BOTONES */}
        {!currentUser ? (
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-1.5 rounded border hover:bg-neutral-50 text-black transition">
              Iniciar Sesión
            </Link>
            <Link href="/signup" className="px-4 py-1.5 rounded bg-pink-600 text-white hover:bg-pink-700 transition">
              Registrarse
            </Link>
          </div>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
}
