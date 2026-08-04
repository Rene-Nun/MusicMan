"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductCard, { type Product } from "@/components/ProductCard";

// Precios de referencia basados en MSRP real de Gibson (convertidos a MXN
// aproximado) — ajústalos a tus precios reales de tienda cuando los tengas.
const gibsonProducts: Product[] = [
  {
    id: "gibson-les-paul-standard-60s",
    name: "Les Paul Standard '60s",
    category: "Guitarra eléctrica",
    price: 51999,
    image: "/guitarra1.PNG",
    stock: "en-tienda",
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

export default function GibsonPage() {
  const [tipo, setTipo] = useState<TipoFiltro>("todas");
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFiltro>("todas");
  const [rango, setRango] = useState<RangoPrecio>("todos");
  const [orden, setOrden] = useState<Orden>("relevancia");

  const rangoActivo = rangos.find((r) => r.value === rango)!;

  const productosFiltrados = useMemo(() => {
    let result = gibsonProducts.filter((product) => {
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
      {/* Encabezado de marca */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center sm:py-16">
          <div className="relative h-16 w-40 sm:h-20 sm:w-48">
            <Image
              src="/Gibson.PNG"
              alt="Gibson"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Guitarras Gibson
          </h1>
          <p className="max-w-xl text-sm text-neutral-500">
            Eléctricas y acústicas Gibson disponibles para recoger en
            tienda. Filtra por tipo, precio o disponibilidad.
          </p>
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
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-neutral-500">
              No hay guitarras Gibson que coincidan con estos filtros.
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