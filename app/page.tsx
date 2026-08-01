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

          {/* Contenido: flujo normal en mobile (debajo de la imagen), anclado abajo y centrado sobre el scrim en desktop */}
          <div className="relative z-20 mx-auto max-w-xl bg-white px-6 py-12 text-center sm:px-10 sm:py-16 lg:absolute lg:inset-0 lg:mx-auto lg:flex lg:max-w-2xl lg:flex-col lg:items-center lg:justify-center lg:bg-transparent lg:px-0 lg:py-0 lg:text-center">
            <h1 className="font-display text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-white">
              Aparta tu instrumento en línea.{" "}
              <span className="text-[#117C2E] lg:text-[#4CA5E4]">
                Pruébalo en tienda
              </span>{" "}
              hoy mismo.
            </h1>

            <a
              href="#catalogo"
              className="mx-auto mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#117C2E] lg:bg-white lg:text-neutral-900 lg:hover:bg-[#4CA5E4] lg:hover:text-white"
            >
              Ver catálogo
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Banner — compra en línea, recoge en tienda */}
      <section className="mx-auto mt-12 max-w-6xl px-6 sm:mt-16">
        <div className="grid grid-cols-1 items-center overflow-hidden rounded-sm border border-neutral-200 bg-[#117C2E] lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-10 sm:py-16">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Compra en línea, recoge en tienda
            </h2>
            <a
              href="#catalogo"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
            >
              Visita tu tienda local
            </a>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80"
              alt="Interior de tienda Musicman con instrumentos en exhibición"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
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