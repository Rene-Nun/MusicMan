"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

// Únicos dos ítems con página real por ahora — el resto sigue mandando a
// "#catalogo" hasta que tengan su propia página. Cuando agregues más,
// solo hace falta sumar una línea aquí.
const itemHrefOverrides: Partial<Record<DropdownKey, Record<string, string>>> = {
  categorias: { Guitarras: "/categorias/guitarras" },
  marcas: { Gibson: "/marcas/gibson" },
};

function getItemHref(menuKey: DropdownKey, item: string) {
  return itemHrefOverrides[menuKey]?.[item] ?? "#catalogo";
}

const accountLinks = [
  { label: "Mis compras", href: "/cuenta/compras", icon: BagIcon },
  { label: "Lista de deseos", href: "/cuenta/deseos", icon: HeartIcon },
  { label: "Órdenes personalizadas", href: "/cuenta/personalizadas", icon: ClipboardIcon },
  { label: "Ajustes", href: "/cuenta/ajustes", icon: GearIcon },
  { label: "¿Necesitas ayuda?", href: "/ayuda", icon: HelpIcon },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // panel móvil (hamburguesa)
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null); // mega-menú desktop
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<DropdownKey | null>(null); // acordeón móvil
  const [isAccountOpen, setIsAccountOpen] = useState(false); // panel "Mi cuenta"
  const headerRef = useRef<HTMLElement>(null);

  // Cierra los menús con Escape y bloquea el scroll del body mientras algún panel está abierto
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setOpenMenu(null);
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isMenuOpen || isAccountOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isAccountOpen]);

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
          className="shrink-0 md:-my-2"
        >
          <Image
            src="/logo.PNG"
            alt="MusicMan Logo"
            width={40}
            height={40}
            className="h-10 w-auto md:h-14"
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

                {/* Pestaña flotante con origen en el clic, no una sección completa */}
                <div
                  className={`absolute left-0 top-full z-20 mt-3 w-64 origin-top-left rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-150 ease-out ${
                    openMenu === menu.key
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {menu.items.map((item) => (
                      <Link
                        key={item}
                        href={getItemHref(menu.key, item)}
                        onClick={() => setOpenMenu(null)}
                        className="text-sm text-gray-700 transition-colors hover:text-brass"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
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
            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              aria-label="Mi cuenta"
              aria-haspopup="dialog"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              <AccountIcon />
            </button>
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
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-brass"
              >
                <AccountIcon />
                Mi cuenta
              </button>
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
                            href={getItemHref(menu.key, item)}
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

      {/* Panel "Mi cuenta" — renderizado en un portal para escapar del backdrop-blur del header */}
      <AccountPanel isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </header>
  );
}

function AccountPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  // Evita mismatches de SSR: el portal solo se crea una vez montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mi cuenta"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[420px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header negro */}
        <div className="flex items-center justify-between bg-black px-6 py-5">
          <h2 className="font-display text-xl font-medium text-white">Mi cuenta</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {accountLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-lg px-3 py-4 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors group-hover:bg-brass/10 group-hover:text-brass">
                    <Icon />
                  </span>
                  <span className="flex-1">{label}</span>
                  <ChevronIcon className="h-4 w-4 -rotate-90 text-gray-400 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Espaciador para empujar el botón de cerrar sesión al fondo */}
          <div className="flex-1" />

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-lg border border-red-600 py-3.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>,
    document.body
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

function CloseIcon() {
  return (
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
      <path d="M18 6 6 18M6 6l12 12" />
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

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M12 20s-7-4.4-9.5-8.8C.9 8 2.3 4.7 5.4 4a4.9 4.9 0 0 1 6.6 2 4.9 4.9 0 0 1 6.6-2c3.1.7 4.5 4 3 7.2C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="6" y="4" width="12" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 1.8-2.3 3.5" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}