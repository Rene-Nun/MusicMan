"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard, { type Product } from "@/components/ProductCard";

// Producto de muestra — tomado del "inventario" que ya armamos para
// Gibson / Guitarras. Cuando exista la fuente real de datos, esta página
// se vuelve app/producto/[slug]/page.tsx y esto se reemplaza por un fetch.
const product = {
  id: "gibson-les-paul-standard-60s",
  name: "Les Paul Standard '60s",
  brand: "Gibson",
  brandLogo: "/Gibson.PNG",
  category: "Guitarra eléctrica",
  price: 51999,
  image: "/guitarra1.PNG",
  stock: "en-tienda" as const,
  description:
    "La Les Paul Standard '60s recupera las proporciones y el perfil de mástil delgado que hicieron icónica a la Les Paul original de esa década. Tapa de arce figurado sobre cuerpo de caoba, un par de Burstbucker que entregan el clásico tono cálido y con carácter de Gibson, y acabado en laca de nitrocelulosa que envejece con el instrumento.",
};

// Especificaciones reales del modelo — ajusta si tu unidad en tienda varía.
const specs = [
  { label: "Cuerpo", value: "Caoba con tapa de arce figurado (AAA)" },
  { label: "Mástil", value: "Caoba, perfil '60s Slim Taper" },
  { label: "Diapasón", value: "Palisandro, 22 trastes" },
  { label: "Escala", value: "24.75 pulgadas" },
  { label: "Pastillas", value: "Burstbucker 61R (mástil) / 61T (puente)" },
  { label: "Herrajes", value: "Níquel" },
  { label: "Acabado", value: "Laca de nitrocelulosa" },
  { label: "Incluye", value: "Estuche rígido Gibson" },
];

// Otras guitarras del mismo "inventario" de muestra.
const relatedProducts: Product[] = [
  {
    id: "gibson-sg-standard",
    name: "SG Standard",
    category: "Guitarra eléctrica",
    price: 29999,
    image: "/guitarra2.PNG",
    stock: "en-tienda",
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
    id: "gibson-les-paul-custom",
    name: "Les Paul Custom",
    category: "Guitarra eléctrica",
    price: 82999,
    image: "/guitarra9.PNG",
    stock: "ultima-unidad",
  },
];

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export default function ProductoLesPaulPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-white">
      {/* Migas de pan */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/marcas/gibson" className="transition-colors hover:text-neutral-900">
            Gibson
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>
      </div>

      {/* Producto */}
      <section className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Imagen */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-neutral-100">
              {product.stock === "ultima-unidad" && (
                <span className="absolute left-4 top-4 z-10 rounded-sm bg-neutral-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Última unidad
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="relative h-6 w-20">
              <Image
                src={product.brandLogo}
                alt={product.brand}
                fill
                className="object-contain object-left"
              />
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">{product.category}</p>

            <p className="mt-6 font-display text-3xl text-neutral-900">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>

            {/* Cantidad + agregar al carrito */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-sm border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-neutral-900 transition-colors hover:bg-neutral-100"
                  aria-label="Restar una unidad"
                >
                  −
                </button>
                <span className="min-w-[1.5rem] text-center text-sm font-medium text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-neutral-900 transition-colors hover:bg-neutral-100"
                  aria-label="Sumar una unidad"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="flex-1 rounded-sm bg-neutral-900 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
              >
                Agregar al carrito
              </button>
            </div>

            {/* Recoge en tienda */}
            <div className="mt-6 flex items-start gap-3 rounded-sm bg-neutral-50 p-4">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#79992C]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Disponible para recoger en tienda
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Elige tu sucursal al finalizar la compra. Sin costo de
                  envío.
                </p>
              </div>
            </div>

            {/* Características */}
            <div className="mt-10 border-t border-neutral-200 pt-8">
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Características
              </h2>
              <dl className="mt-4 divide-y divide-neutral-100">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-6 py-2.5 text-sm"
                  >
                    <dt className="text-neutral-500">{spec.label}</dt>
                    <dd className="text-right font-medium text-neutral-900">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* También te puede interesar */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="mb-10 font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
          También te puede interesar
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedProducts.map((related) => (
            <ProductCard key={related.id} {...related} variant="light" />
          ))}
        </div>
      </section>
    </main>
  );
}