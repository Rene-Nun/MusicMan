"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Mismas categorías y marcas que en page.tsx
const categories = [
  "Guitarras",
  "Percusión",
  "Teclados",
  "Sonido",
  "Aire",
  "Accesorios",
  "Remplazos",
  "Mantenimiento",
  "Merch",
];

const brands = [
  "Vicfirth",
  "Mxr",
  "Marshall",
  "Hartke",
  "Jbl",
  "Ernie",
  "Casio",
  "Prs",
  "Dean",
  "Gibson",
  "Digitech",
  "Pearl",
];

const dropdownMenus = [
  { key: "marcas", label: "Marcas", items: brands },
  { key: "categorias", label: "Categorías", items: categories },
] as const;

type DropdownKey = (typeof dropdownMenus)[number]["key"];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // panel móvil (hamburguesa)
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null); // mega-menú desktop
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<DropdownKey | null>(null); // acordeón móvil
  const headerRef = useRef<HTMLElement>(null);

  // Cierra los menús con Escape y bloquea el scroll del body mientras el panel móvil está abierto
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Cierra el mega-menú de desktop al hacer clic fuera del header
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMenu = dropdownMenus.find((menu) => menu.key === openMenu) ?? null;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-[#FFFFFF] backdrop-blur">
      {/* Fila superior: siempre visible — logo + navegación (desktop) + iconos + hamburguesa (móvil) */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Izquierda: Logo — más grande exclusivamente en desktop */}
        <Link
          href="/"
          onClick={() => {
            setIsMenuOpen(false);
            setOpenMenu(null);
          }}
          className="shrink-0 md:-my-3"
        >
          <Image
            src="/logo.PNG"
            alt="MusicMan Logo"
            width={40}
            height={40}
            className="h-10 w-auto md:h-16"
            priority
            unoptimized={true}
            quality={100}
          />
        </Link>

        {/* Derecha (desktop): navegación + separador + cuenta + carrito */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {dropdownMenus.map((menu) => (
              <li key={menu.key} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu((prev) => (prev === menu.key ? null : menu.key))}
                  aria-expanded={openMenu === menu.key}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  {menu.label}
                  <ChevronIcon
                    className={`h-3 w-3 transition-transform duration-200 ${
                      openMenu === menu.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li>
            ))}
            <li>
              <Link
                href="#mas-vendidos"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Los más vendidos
              </Link>
            </li>
          </ul>

          <div className="h-5 w-px bg-gray-300" aria-hidden="true" />

          <div className="flex items-center gap-4">
            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              <AccountIcon />
            </Link>
            <Link
              href="/carrito"
              aria-label="Carrito de compras"
              className="relative text-gray-600 transition-colors hover:text-gray-900"
            >
              <CartIcon />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-white">
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
            className={`h-px w-full bg-gray-900 transition-transform duration-300 ${
              isMenuOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-gray-900 transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-full bg-gray-900 transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mega-menú (solo desktop): se despliega debajo de todo el header, como cascada */}
      <div
        className={`hidden overflow-hidden bg-white transition-[grid-template-rows] duration-300 ease-in-out md:grid ${
          openMenu ? "grid-rows-[1fr] border-t border-gray-200" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 py-8">
            {activeMenu && (
              <div>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {activeMenu.label}
                </h3>
                <div className="grid grid-cols-4 gap-x-8 gap-y-4 lg:grid-cols-6">
                  {activeMenu.items.map((item) => (
                    <Link
                      key={item}
                      href="#catalogo"
                      onClick={() => setOpenMenu(null)}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-brass"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel inferior (solo móvil): iconos, marcas/categorías en acordeón, navegación */}
      <div
        id="mobile-nav-panel"
        className={`grid overflow-hidden bg-[#FFFFFF] transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "grid-rows-[1fr] border-t border-gray-200" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto max-w-6xl px-6">
            {/* Iconos */}
            <div className="flex items-center gap-6 py-5">
              <Link
                href="/cuenta"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-brass"
              >
                <AccountIcon />
                Mi cuenta
              </Link>
              <Link
                href="/carrito"
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-brass"
              >
                <CartIcon />
                Carrito
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-semibold text-white">
                  0
                </span>
              </Link>
            </div>

            {/* Línea separadora sutil */}
            <div className="h-px w-full bg-gray-200" aria-hidden="true" />

            {/* Navegación */}
            <ul className="py-2">
              {dropdownMenus.map((menu) => (
                <li key={menu.key} className="border-t border-gray-200 first:border-t-0">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedMenu((prev) => (prev === menu.key ? null : menu.key))
                    }
                    aria-expanded={mobileExpandedMenu === menu.key}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-medium text-gray-900 transition-colors hover:text-brass"
                  >
                    {menu.label}
                    <ChevronIcon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        mobileExpandedMenu === menu.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                      mobileExpandedMenu === menu.key ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {menu.items.map((item) => (
                          <Link
                            key={item}
                            href="#catalogo"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileExpandedMenu(null);
                            }}
                            className="text-sm text-gray-600 transition-colors hover:text-brass"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <li className="border-t border-gray-200">
                <Link
                  href="#mas-vendidos"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between py-4 font-display text-2xl font-medium text-gray-900 transition-colors hover:text-brass"
                >
                  Los más vendidos
                  <span className="text-brass opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
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