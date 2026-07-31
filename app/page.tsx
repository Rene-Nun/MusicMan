import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero — panel de color con foto pequeña | imagen grande a sangre | texto flotando sobre la costura */}
      <section className="relative border-b border-neutral-200 bg-white lg:overflow-hidden">
        <div className="relative lg:h-[640px]">
          {/* Panel izquierdo: fondo de color con una foto pequeña centrada — solo desktop */}
          <div className="hidden bg-[#117C2E] lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
            <div className="relative h-2/3 w-2/3 overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1558098329-a11cff621064?w=800&q=80"
                alt="Detalle de guitarra acústica Musicman"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Imagen grande a sangre — mobile: bloque superior; desktop: mitad derecha */}
          <div className="relative h-72 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1550985616-10810253b84d?w=1400&q=80"
              alt="Guitarra eléctrica disponible en Musicman"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Contenido: flujo normal en mobile (debajo de la imagen), tarjeta flotando sobre la costura en desktop */}
          <div className="relative z-20 mx-auto max-w-xl bg-white px-6 py-12 sm:px-10 sm:py-16 lg:absolute lg:inset-0 lg:m-auto lg:h-fit lg:max-w-md lg:rounded-sm lg:px-10 lg:py-10 lg:shadow-2xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[#4CA5E4]">
              Click &amp; Collect
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl">
              Aparta tu instrumento en línea.{" "}
              <span className="text-[#117C2E]">Pruébalo en tienda</span> hoy
              mismo.
            </h1>
            <p className="mt-6 text-base text-neutral-500 sm:text-lg">
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