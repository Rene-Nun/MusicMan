import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero — split layout: contenido a la izquierda, imagen a la derecha */}
      <section className="relative border-b border-neutral-200 bg-white">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:items-stretch">
          {/* Columna izquierda: contenido */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:py-20 lg:px-16 lg:py-28">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[#4CA5E4]">
              Click &amp; Collect
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Aparta tu instrumento en línea.{" "}
              <span className="text-[#117C2E]">Pruébalo en tienda</span> hoy
              mismo.
            </h1>
            <p className="mt-6 max-w-md text-base text-neutral-500 sm:text-lg">
              Sin envíos, sin esperas. Reserva cualquier guitarra o
              amplificador de nuestro catálogo y recógelo en Musicman el
              mismo día.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#117C2E]/10 px-4 py-1.5 text-sm font-medium text-[#117C2E]">
                Sin tarjeta de crédito
              </span>
              <span className="rounded-full bg-[#4CA5E4]/10 px-4 py-1.5 text-sm font-medium text-[#2E7AB8]">
                Listo el mismo día
              </span>
            </div>

            <a
              href="#catalogo"
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#117C2E]"
            >
              Ver catálogo
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Columna derecha: imagen a sangre, con velo de marca */}
          <div className="relative order-first h-72 sm:h-96 lg:order-none lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1550985616-10810253b84d?w=1400&q=80"
              alt="Guitarra eléctrica disponible en Musicman"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#117C2E]/50 via-[#117C2E]/0 to-transparent lg:bg-gradient-to-l lg:from-[#117C2E]/10 lg:via-transparent lg:to-transparent" />
          </div>

          {/* Tarjeta flotante sobre la costura — solo desktop */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="pointer-events-auto flex items-center gap-3 rounded-sm border border-neutral-200 bg-white px-5 py-4 shadow-xl">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#79992C]" />
              <p className="text-sm font-medium text-neutral-700">
                +40 marcas disponibles en tienda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Escaparate */}
      <section id="catalogo" className="mx-auto max-w-6xl bg-white px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between border-b border-neutral-200 pb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
              Catálogo disponible
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {products.length} instrumentos listos para recoger en tienda.
            </p>
          </div>
          <span className="hidden h-2 w-2 rounded-full bg-[#79992C] sm:block" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}