import Link from "next/link";
export default function SignupIndex() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Elige tu tipo de registro</h1>
      <div className="space-y-3">
        <Link href="/signup/client" className="block border rounded px-4 py-2">👤 Cliente</Link>
        <Link href="/signup/provider" className="block border rounded px-4 py-2">🧰 Proveedor</Link>
      </div>
    </main>
  );
}