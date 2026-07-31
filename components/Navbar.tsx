import Link from "next/link";

const navLinks = [
  { href: "#marcas", label: "Marcas" },
  { href: "#categorias", label: "Categorías" },
  { href: "#mas-vendidos", label: "Los más vendidos" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Izquierda: Logo */}
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-wide text-paper"
        >
          MUSIC<span className="text-brass">MAN</span>
        </Link>

        {/* Derecha: navegación + cuenta + carrito */}
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Separador entre navegación e íconos */}
          <div className="hidden h-5 w-px bg-line md:block" aria-hidden="true" />

          <div className="flex items-center gap-4">
            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className="text-muted transition-colors hover:text-paper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="5" />
              </svg>
            </Link>

            <Link
              href="/carrito"
              aria-label="Carrito de compras"
              className="relative text-muted transition-colors hover:text-paper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.5 2.5h2l2.6 13a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 6.5h-16" />
              </svg>
              {/* Contador de artículos — conectar a estado del carrito */}
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-ink">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}