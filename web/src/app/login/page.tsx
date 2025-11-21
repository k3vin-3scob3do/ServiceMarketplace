"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/userContext";

interface LoginResponse {
  intCode?: number;
  strMessage?: string;
  token?: string;
  detail?: string;
  _id: string;
  role: string;
  email: string;
  name: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await api<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      console.log("Backend detail:", res.data);

      if (!res.ok) {
        const backendMsg =
          res.data.detail ??
          res.data.strMessage ??
          "Correo o contraseña incorrectos";

        toast.error(String(backendMsg));

        return;
      }

      setUser(res.data); 

      toast.success("Inicio de sesión exitoso");

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token ?? "");

      const role = res.data.role;
      if (role === "admin") router.push("/admin");
      else if (role === "provider") router.push("/provider");
      else router.push("/");
    } catch (err: any) {
      console.log("ERROR CATCH:", err);

      const backendMsg =
        (err?.data as any)?.detail ||
        (err?.data as any)?.strMessage ||
        err?.message ||
        "Error al iniciar sesión";

      toast.error(backendMsg);
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Iniciar Sesión
      </h1>

      <form
        onSubmit={submit}
        className="border rounded-xl p-6 space-y-3 shadow-sm bg-white"
      >
        <input
          className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border rounded px-3 py-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Entrando..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        ¿No tienes una cuenta?{" "}
        <Link href="/signup" className="text-pink-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}
