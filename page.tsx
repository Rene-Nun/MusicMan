import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-grain-overlay border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-brass">
            Click & Collect
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-paper sm:text-6xl">
            Aparta tu instrumento en línea. Pruébalo en tienda hoy mismo.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            Sin envíos, sin esperas. Reserva cualquier guitarra o amplificador
            de nuestro catálogo y recógelo en Musicman el mismo día.
          </p>
        </div>
      </section>

      {/* Escaparate */}
      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
              Catálogo disponible
            </h2>
            <p className="mt-2 text-sm text-muted">
              {products.length} instrumentos listos para recoger en tienda.
            </p>
          </div>
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
