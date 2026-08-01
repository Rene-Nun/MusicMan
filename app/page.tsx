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
      {/* Hero — formato 16:9 dentro de contenedor */}
      <section className="mx-auto mt-8 max-w-6xl px-6 sm:mt-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-sm">
          {/* Panel izquierdo: fondo de color con una foto pequeña centrada */}
          <div className="absolute inset-y-0 left-0 hidden w-1/2 items-center justify-center bg-red-600 lg:flex">
            <div className="relative aspect-[4/5] w-[40%] overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/Smallhero.jpg"
                alt="Detalle de guitarra acústica Musicman"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Imagen grande — mobile: bloque completo; desktop: mitad derecha */}
          <div className="absolute inset-0 lg:left-1/2 lg:w-1/2">
            <Image
              src="/Bighero.jpg"
              alt="Guitarra eléctrica disponible en Musicman"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* Overlay oscuro solo en mobile para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-black/40 lg:hidden" />
          </div>

          {/* Contenido textual centrado sobre la unión de las dos mitades */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              <span className="block font-light italic">Gibson</span>
              <span className="block font-bold">Historic</span>
              <span className="block font-bold">Collection</span>
              <span className="block font-bold">arrives</span>
            </h1>

            <a
              href="#catalogo"
              className="mx-auto mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-[#4CA5E4]"
            >
              Saber más
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Carrusel de Categorías (Movido debajo del Hero) */}
      <section className="mx-auto mt-12 max-w-6xl bg-white px-6 sm:mt-16">
        <h2 className="mb-10 font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Nuestros productos
        </h2>
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
                Elige en línea y recoge en tienda
              </h2>
              <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
                Explora nuestro stock sin salir de casa, elige tu compra y pasa por ella a tu Musicman más cercano.
              </p>
              <a
                href="#catalogo"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
              >
                Ver ubicaciones
              </a>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src="/Tienda.PNG"
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
          Explora por marca
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