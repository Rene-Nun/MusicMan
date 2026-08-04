"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductCard, { type Product } from "@/components/ProductCard";

// Mismos productos e imágenes que ya armamos para la página de Gibson —
// tiene sentido porque las 10 son guitarras. Cuando haya más marcas de
// guitarras, aquí es donde se agregan.
const guitarraProducts: Product[] = [
  {
    id: "gibson-les-paul-standard-60s",
    name: "Les Paul Standard '60s",
    category: "Guitarra eléctrica",
    price: 51999,
    image: "/guitarra1.PNG",
    stock: "en-tienda",
    href: "/producto/les-paul-standard-60s",
  },
  {
    id: "gibson-sg-standard",
    name: "SG Standard",
    category: "Guitarra eléctrica",
    price: 29999,
    image: "/guitarra2.PNG",
    stock: "en-tienda",
  },
  {
    id: "gibson-les-paul-studio",
    name: "Les Paul Studio",
    category: "Guitarra eléctrica",
    price: 27999,
    image: "/guitarra3.PNG",
    stock: "ultima-unidad",
  },
  {
    id: "gibson-es-335",
    name: "ES-335",
    category: "Guitarra eléctrica",
    price: 60999,
    image: "/guitarra4.PNG",
    stock: "en-tienda",
  },
  {
    id: "gibson-flying-v",
    name: "Flying V",
    category: "Guitarra eléctrica",
    price: 40999,
    image: "/guitarra5.PNG",
    stock: "ultima-unidad",
  },
  {
    id: "gibson-explorer",
    name: "Explorer",
    category: "Guitarra eléctrica",
    price: 40999,
    image: "/guitarra6.PNG",
    stock: "en-tienda",
  },
  {
    id: "gibson-j45-standard",
    name: "J-45 Standard",
    category: "Guitarra acústica",
    price: 42999,
    image: "/guitarra7.PNG",
    stock: "en-tienda",
  },
  {
    id: "gibson-hummingbird-standard",
    name: "Hummingbird Standard",
    category: "Guitarra acústica",
    price: 54999,
    image: "/guitarra8.PNG",
    stock: "en-tienda",
  },
  {
    id: "gibson-les-paul-custom",
    name: "Les Paul Custom",
    category: "Guitarra eléctrica",
    price: 82999,
    image: "/guitarra9.PNG",
    stock: "ultima-unidad",
  },
  {
    id: "gibson-sg-special",
    name: "SG Special",
    category: "Guitarra eléctrica",
    price: 25999,
    image: "/guitarra10.PNG",
    stock: "en-tienda",
  },
];

// Reciclado de page.tsx — mismas imágenes que "Por categoría" en el home.
const tiposDeProducto = [
  { name: "Guitarras", src: "/Guitarras.PNG" },
  { name: "Sonido", src: "/Sonido.PNG" },
  { name: "Accesorios", src: "/Accesorios.PNG" },
  { name: "Mantenimiento", src: "/Mantenimiento.PNG" },
  { name: "Merch", src: "/Merch.PNG" },
];

type TipoFiltro = "todas" | "Guitarra eléctrica" | "Guitarra acústica";
type DisponibilidadFiltro = "todas" | "en-tienda" | "ultima-unidad";
type RangoPrecio = "todos" | "menos-30" | "30-50" | "50-70" | "mas-70";
type Orden = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

const rangos: { value: RangoPrecio; label: string; min: number; max: number }[] = [
  { value: "todos", label: "Todos los precios", min: 0, max: Infinity },
  { value: "menos-30", label: "Menos de $30,000", min: 0, max: 30000 },
  { value: "30-50", label: "$30,000 – $50,000", min: 30000, max: 50000 },
  { value: "50-70", label: "$50,000 – $70,000", min: 50000, max: 70000 },
  { value: "mas-70", label: "Más de $70,000", min: 70000, max: Infinity },
];

export default function GuitarrasCategoriaPage() {
  const [tipo, setTipo] = useState<TipoFiltro>("todas");
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFiltro>("todas");
  const [rango, setRango] = useState<RangoPrecio>("todos");
  const [orden, setOrden] = useState<Orden>("relevancia");

  const rangoActivo = rangos.find((r) => r.value === rango)!;

  const productosFiltrados = useMemo(() => {
    let result = guitarraProducts.filter((product) => {
      const coincideTipo = tipo === "todas" || product.category === tipo;
      const coincideDisponibilidad =
        disponibilidad === "todas" || product.stock === disponibilidad;
      const coincidePrecio =
        product.price >= rangoActivo.min && product.price <= rangoActivo.max;

      return coincideTipo && coincideDisponibilidad && coincidePrecio;
    });

    if (orden === "precio-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (orden === "precio-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (orden === "nombre") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [tipo, disponibilidad, rango, orden, rangoActivo]);

  const hayFiltrosActivos =
    tipo !== "todas" || disponibilidad !== "todas" || rango !== "todos";

  const limpiarFiltros = () => {
    setTipo("todas");
    setDisponibilidad("todas");
    setRango("todos");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado de categoría */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-10 sm:py-12">
          <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/Guitarras.PNG"
              alt="Guitarras"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            Guitarras
          </h1>
        </div>
      </section>

      {/* Tipo de producto */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Tipo de producto
          </h2>

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scroll-pl-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tiposDeProducto.map((tipoProducto, index) => (
              <div
                key={tipoProducto.name}
                className={`group flex shrink-0 snap-start flex-col items-center gap-2 ${
                  index !== tiposDeProducto.length - 1 ? "mr-6" : ""
                }`}
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  <Image
                    src={tipoProducto.src}
                    alt={tipoProducto.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  {tipoProducto.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Tipo */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "todas", label: "Todas" },
                  { value: "Guitarra eléctrica", label: "Eléctricas" },
                  { value: "Guitarra acústica", label: "Acústicas" },
                ] as { value: TipoFiltro; label: string }[]
              ).map((opcion) => (
                <button
                  key={opcion.value}
                  type="button"
                  onClick={() => setTipo(opcion.value)}
                  className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    tipo === opcion.value
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {opcion.label}
                </button>
              ))}
            </div>

            <span className="mx-1 hidden h-6 w-px bg-neutral-200 sm:block" aria-hidden="true" />

            {/* Precio */}
            <select
              value={rango}
              onChange={(e) => setRango(e.target.value as RangoPrecio)}
              className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              {rangos.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            {/* Disponibilidad */}
            <select
              value={disponibilidad}
              onChange={(e) => setDisponibilidad(e.target.value as DisponibilidadFiltro)}
              className="rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              <option value="todas">Toda la disponibilidad</option>
              <option value="en-tienda">En tienda</option>
              <option value="ultima-unidad">Última unidad</option>
            </select>

            {/* Orden */}
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="ml-auto rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A–Z</option>
            </select>

            {hayFiltrosActivos && (
              <button
                type="button"
                onClick={limpiarFiltros}
                className="text-xs font-semibold uppercase tracking-wide text-neutral-400 transition-colors hover:text-neutral-900"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <p className="mb-6 text-sm text-neutral-500">
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "guitarra encontrada" : "guitarras encontradas"}
        </p>

        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productosFiltrados.map((product) => (
              <ProductCard key={product.id} {...product} variant="light" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-neutral-500">
              No hay guitarras que coincidan con estos filtros.
            </p>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}