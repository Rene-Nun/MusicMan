import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";

export default function Home() {
  return (
    <>
      {/* Hero — fondo blanco, acentos de marca en azul y verde */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
        {/* Bloque decorativo: referencia sutil a los dos colores del logo */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4CA5E4]/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#79992C]/10" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[#4CA5E4]">
            Click &amp; Collect
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
            Aparta tu instrumento en línea.{" "}
            <span className="text-[#117C2E]">Pruébalo en tienda</span> hoy mismo.
          </h1>
          <p className="mt-6 max-w-xl text-base text-neutral-500 sm:text-lg">
            Sin envíos, sin esperas. Reserva cualquier guitarra o amplificador
            de nuestro catálogo y recógelo en Musicman el mismo día.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#117C2E]/10 px-4 py-1.5 text-sm font-medium text-[#117C2E]">
              Sin tarjeta de crédito
            </span>
            <span className="rounded-full bg-[#4CA5E4]/10 px-4 py-1.5 text-sm font-medium text-[#2E7AB8]">
              Listo el mismo día
            </span>
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