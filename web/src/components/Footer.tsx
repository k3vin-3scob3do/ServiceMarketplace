export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-neutral-900 text-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-4 text-sm">
        <div>
          <p className="font-semibold mb-2">ServiceHub</p>
          <p className="text-neutral-400">
            Conecta clientes con proveedores verificados.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Para Clientes</p>
          <ul className="space-y-1 text-neutral-400">
            <li>Buscar Servicios</li><li>Categorías</li><li>Cómo Funciona</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Para Proveedores</p>
          <ul className="space-y-1 text-neutral-400">
            <li>Vender Servicios</li><li>Recursos</li><li>Comunidad</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Soporte</p>
          <ul className="space-y-1 text-neutral-400">
            <li>Centro de Ayuda</li><li>Contacto</li><li>Términos</li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-neutral-400 border-t border-neutral-800 py-4 text-center">
        © 2025 ServiceHub. Todos los derechos reservados.
      </div>
    </footer>
  );
}
