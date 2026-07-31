"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#marcas", label: "Marcas" },
  { href: "#categorias", label: "Categorías" },
  { href: "#mas-vendidos", label: "Los más vendidos" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cierra el menú con Escape y bloquea el scroll del body mientras está abierto
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      {/* Fila superior: siempre visible — logo + navegación (desktop) + iconos + hamburguesa (móvil) */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Izquierda: Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-display text-xl font-semibold tracking-wide text-paper"
        >
          MUSIC<span className="text-brass">MAN</span>
        </Link>

        {/* Derecha (desktop): navegación + separador + cuenta + carrito */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
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

          <div className="h-5 w-px bg-line" aria-hidden="true" />

          <div className="flex items-center gap-4">
            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className="text-muted transition-colors hover:text-paper"
            >
              <AccountIcon />
            </Link>
            <Link
              href="/carrito"
              aria-label="Carrito de compras"
              className="relative text-muted transition-colors hover:text-paper"
            >
              <CartIcon />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-ink">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Derecha (móvil): únicamente el botón hamburguesa. Se transforma en X al abrir. */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          className="relative flex h-5 w-6 flex-col justify-between md:hidden"
        >
          <span
            className={`h-px w-full bg-paper transition-transform duration-300 ${
              isMenuOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-paper transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-full bg-paper transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Panel inferior (solo móvil): arriba iconos, línea separadora, abajo navegación */}
      <div
        id="mobile-nav-panel"
        className={`grid overflow-hidden border-line bg-ink transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto max-w-6xl px-6">
            {/* Iconos */}
            <div className="flex items-center gap-6 py-5">
              <Link
                href="/cuenta"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-brass"
              >
                <AccountIcon />
                Mi cuenta
              </Link>
              <Link
                href="/carrito"
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-brass"
              >
                <CartIcon />
                Carrito
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-ink">
                  0
                </span>
              </Link>
            </div>

            {/* Línea separadora sutil */}
            <div className="h-px w-full bg-line" aria-hidden="true" />

            {/* Navegación */}
            <ul className="py-2">
              {navLinks.map((link, i) => (
                <li key={link.href} className={i > 0 ? "border-t border-line" : ""}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between py-4 font-display text-2xl font-medium text-paper transition-colors hover:text-brass"
                  >
                    {link.label}
                    <span className="text-brass opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

function AccountIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 2.5h2l2.6 13a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 6.5h-16" />
    </svg>
  );
}