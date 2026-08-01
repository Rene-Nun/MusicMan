import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import Image from "next/image";

const categories = [
  { name: "Guitarras", src: "/Guitarras.PNG" },
  { name: "Percusión", src: "/Percusion.PNG" }, // <- Ruta sin acento
  { name: "Teclados", src: "/Teclados.PNG" },
  { name: "Sonido", src: "/Sonido.PNG" },
  { name: "Aire", src: "/Aire.PNG" },
  { name: "Accesorios", src: "/Accesorios.PNG" },
  { name: "Remplazos", src: "/Remplazos.PNG" },
  { name: "Mantenimiento", src: "/Mantenimiento.PNG" },
  { name: "Merch", src: "/Merch.PNG" },
];

const brands = [
  { name: "Vicfirth", src: "/Vicfirth.PNG" },
  { name: "Mxr", src: "/Mxr.PNG" },
  { name: "Marshall", src: "/Marshall.PNG" },
  { name: "Hartke", src: "/Hartke.PNG" },
  { name: "Jbl", src: "/Jbl.PNG" },
  { name: "Ernie", src: "/Ernie.PNG" },
  { name: "Casio", src: "/Casio.PNG" },
  { name: "Prs", src: "/Prs.PNG" },
  { name: "Dean", src: "/Dean.PNG" },
  { name: "Gibson", src: "/Gibson.PNG" },
  { name: "Digitech", src: "/Digitech.PNG" },
  { name: "Pearl", src: "/Pearl.PNG" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero — panel de color con foto pequeña | imagen grande a sangre | texto flotando sobre la costura */}
      <section className="relative border-b border-neutral-200 bg-white lg:overflow-hidden">
        <div className="relative lg:h-[640px]">
          {/* Panel izquierdo: fondo de color con una foto pequeña centrada — solo desktop */}
          <div className="hidden bg-red-600 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
            <div className="relative h-2/3 w-2/3 overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/Smallhero.jpg"
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
              src="/Bighero.jpg"
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

      {/* Carrusel de Categorías (Movido debajo del Hero) */}
      <section className="mx-auto mt-12 max-w-6xl bg-white px-6 sm:mt-16">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category, index) => (
            <div key={index} className="group flex shrink-0 snap-start flex-col items-center gap-3">
              <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                <Image
                  src={category.src}
                  alt={`Categoría ${category.name}`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-medium text-neutral-900">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Banner — compra en línea, recoge en tienda + carrusel de productos */}
      <section className="mx-auto mt-12 max-w-6xl bg-white px-6 sm:mt-16">
        <div className="overflow-hidden rounded-sm border border-neutral-200 bg-[#79992C]">
          <div className="grid grid-cols-1 items-center bg-[#117C2E] lg:grid-cols-2">
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

          {/* Carrusel de productos — fondo #79992C, cards en blanco */}
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {products.map((product) => (
                <div key={product.id} className="w-48 shrink-0 snap-start sm:w-56">
                  <ProductCard {...product} variant="light" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Explora nuestras marcas */}
      <section className="mx-auto mt-12 max-w-6xl bg-white px-6 py-4 sm:mt-16">
        <h2 className="mb-10 font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Explora nuestras marcas
        </h2>

        <div className="grid grid-cols-3 gap-x-2 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <div key={index} className="group flex flex-col items-center gap-3">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-black shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-40 sm:w-40">
                <div className="relative h-28 w-28 sm:h-36 sm:w-36">
                  <Image
                    src={brand.src}
                    alt={`Marca ${brand.name}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-900">
                {brand.name}
              </span>
            </div>
          ))}
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
    </main>
  );
}