"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

const categories = [
  { name: "Guitarras", src: "/Guitarras.PNG" },
  { name: "Percusión", src: "/Percusion.PNG" },
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

const banners = [
  {
    name: "Banner",
    src: "/Banner.PNG",
    overlay: {
      variant: "gradient" as const,
      title: "Si no lo tenemos, lo conseguimos",
      subtitle: "Déjanos la búsqueda a nosotros",
      cta: "Hacer pedido",
    },
  },
  {
    name: "Fest",
    src: "/Fest.PNG",
    overlay: {
      variant: "badge" as const,
      cta: "Saber más",
    },
  },
  {
    name: "Sucursales",
    src: "/Sucursales.PNG",
    overlay: {
      variant: "cta-only" as const,
      cta: "Ver el mapa",
    },
  },
];

// Sangrado hacia la derecha: cuánto le "sobra" al contenedor max-w-6xl centrado
// respecto al borde de pantalla. Se usa como margin-right negativo para que el
// scroll se salga por la derecha, SIN tocar el borde izquierdo (que hereda
// la alineación real del mismo contenedor mx-auto max-w-6xl que usa el hero).
const rightBleed = "max(1.5rem, calc((100vw - 1152px) / 2 + 1.5rem))";

// Inset izquierdo (equivalente al sm:px-6 del hero, con empujón extra en
// desktop). Ni un div "espaciador" como primer hijo del flex, ni padding en
// el propio contenedor con scroll, funcionan de forma confiable en Safari/
// iOS: en ambos casos, apenas carga la página, el navegador ajusta el scroll
// para pegar el primer elemento con "snap-start" al borde, ignorando
// cualquier padding o espaciador previo — por eso no se veía nada hasta
// deslizar manualmente. La solución que sí funciona: poner el margen
// directamente en el PRIMER ELEMENTO REAL (el que tiene snap-start). Como el
// margen es parte de ese mismo elemento, Safari no lo puede saltar.
// IMPORTANTE: estos breakpoints deben coincidir EXACTAMENTE con los del
// hero ("px-0 sm:px-6" — ver más abajo). Antes este valor era
// "ml-6 lg:ml-16", que no coincidía con el hero en ningún punto: en mobile
// el hero tiene 0px de inset pero esto tenía 24px, y al cruzar el
// breakpoint lg (1024px) esto saltaba a 64px mientras el hero se quedaba en
// 24px. Ese desfase es lo que se ve al cambiar el ancho de la ventana
// (Slide Over / Split View / pantalla completa en iPad): el carrusel y el
// hero dejan de coincidir justo al cruzar 1024px de ancho.
const leftInsetFirstItemClass = "sm:ml-6";
const rightInsetLastItemClass = "sm:mr-6";

/**
 * Fix para el bug de Safari/iOS donde el navegador reposiciona el scroll
 * horizontal de un contenedor con overflow-x-auto (con scroll-snap) después
 * de que carga la página, sin importar qué CSS (padding, margin, spacer) se
 * le haya puesto antes del primer elemento.
 *
 * La primera versión de este fix solo forzaba scrollLeft = 0 en un puñado
 * de timers cortos (hasta 150ms). Eso no basta cuando los elementos del
 * carrusel tienen ancho variable que depende de una imagen (como los
 * banners, con `w-auto` según el aspect ratio real de la imagen): en cuanto
 * cada <img> termina de decodificar, el ancho del contenido cambia, el
 * navegador recalcula el snap, y puede volver a mover el scroll — después
 * de que nuestros timers ya habían corrido.
 *
 * Esta versión resetea scrollLeft en TODOS los eventos que pueden disparar
 * ese recálculo:
 *   1. Inmediatamente (useLayoutEffect, antes del paint)
 *   2. En el siguiente frame (requestAnimationFrame)
 *   3. En una serie de timers escalonados (hasta 2s), por si acaso
 *   4. En el evento `load` de CADA <img> dentro del carrusel
 *   5. En el evento `load` de la ventana completa
 *   6. Vía ResizeObserver, si el propio contenedor cambia de tamaño
 *
 * Y se "apaga" en cuanto detecta que el usuario tocó o hizo scroll manual
 * (touchstart / wheel), para no pelearle el control al usuario.
 */
function useScrollResetFix<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let userInteracted = false;

    const forceReset = () => {
      if (el && !userInteracted) {
        el.scrollLeft = 0;
      }
    };

    const markInteracted = () => {
      userInteracted = true;
    };

    el.addEventListener("touchstart", markInteracted, { passive: true });
    el.addEventListener("wheel", markInteracted, { passive: true });

    // 1. Inmediato
    forceReset();

    // 2. Siguiente frame
    const raf = requestAnimationFrame(forceReset);

    // 3. Timers escalonados
    const timeouts = [50, 150, 300, 600, 1000, 2000].map((delay) =>
      setTimeout(forceReset, delay)
    );

    // 4. Load de cada imagen dentro del carrusel (las que aún no cargan)
    const imgs = Array.from(el.querySelectorAll("img"));
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", forceReset);
      }
    });

    // 5. Load de la ventana completa
    window.addEventListener("load", forceReset);

    // 6. Cualquier cambio de tamaño del contenedor
    const resizeObserver = new ResizeObserver(forceReset);
    resizeObserver.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
      imgs.forEach((img) => img.removeEventListener("load", forceReset));
      window.removeEventListener("load", forceReset);
      resizeObserver.disconnect();
      el.removeEventListener("touchstart", markInteracted);
      el.removeEventListener("wheel", markInteracted);
    };
  }, []);

  return ref;
}

export default function Home() {
  const bannersScrollRef = useScrollResetFix<HTMLDivElement>();
  const categoriesScrollRef = useScrollResetFix<HTMLDivElement>();
  const productsScrollRef = useScrollResetFix<HTMLDivElement>();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero — ahora en formato 16:9 dentro de un contenedor (no a pantalla completa) */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-6xl px-0 sm:px-6 sm:pt-8">
          <div className="relative overflow-hidden rounded-sm lg:aspect-[16/6]">
            {/* Panel izquierdo: fondo de color con una foto pequeña centrada — solo desktop */}
            <div className="hidden bg-red-600 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
              <div className="relative aspect-[4/5] w-1/2 overflow-hidden rounded-sm shadow-2xl">
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
              <h1 className="font-display text-4xl leading-tight text-neutral-900 sm:text-5xl lg:text-white">
                <span className="block font-light italic">Gibson</span>
                <span className="block font-bold text-white lg:text-white">Historic</span>
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
        </div>
      </section>

      {/* Banners promocionales — mismo contenedor mx-auto max-w-6xl que el hero para
          garantizar que el borde izquierdo coincide siempre; solo la derecha sangra */}
      <section className="mt-6 bg-white sm:mt-8">
        <div className="mx-auto max-w-6xl">
          <div
            ref={bannersScrollRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              marginRight: `calc(-1 * ${rightBleed})`,
              paddingRight: rightBleed,
            }}
          >
            {banners.map((banner, index) => (
              <a
                key={banner.name}
                href="#catalogo"
                className={`relative h-52 shrink-0 snap-start overflow-hidden rounded-sm sm:h-60 lg:h-64 ${
                  index === 0 ? leftInsetFirstItemClass : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={banner.src} alt={banner.name} className="h-full w-auto" />

                {banner.overlay?.variant === "gradient" && (
                  <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-gradient-to-r from-black/75 via-black/40 to-transparent px-6 sm:px-8">
                    <h3 className="max-w-[60%] font-display text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                      {banner.overlay.title}
                    </h3>
                    <p className="max-w-[60%] text-xs text-white/80 sm:text-sm">
                      {banner.overlay.subtitle}
                    </p>
                    <span className="mt-2 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                      {banner.overlay.cta}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                )}

                {banner.overlay?.variant === "badge" && (
                  <>
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="absolute bottom-4 left-1/2 inline-flex w-fit -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 sm:text-sm">
                      {banner.overlay.cta}
                      <span aria-hidden="true">→</span>
                    </span>
                  </>
                )}

                {banner.overlay?.variant === "cta-only" && (
                  <span className="absolute bottom-4 right-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white drop-shadow sm:text-sm">
                    {banner.overlay.cta}
                    <span aria-hidden="true">→</span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel de Categorías — mismo criterio: contenedor idéntico al hero */}
      <section className="mt-12 bg-white sm:mt-16">
        <h2 className="mx-auto mb-10 max-w-6xl px-6 font-display text-2xl font-semibold text-neutral-900 sm:px-6 sm:text-3xl">
          Nuestros productos
        </h2>
        <div className="mx-auto max-w-6xl">
          <div
            ref={categoriesScrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              marginRight: `calc(-1 * ${rightBleed})`,
              paddingRight: rightBleed,
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group flex shrink-0 snap-start flex-col items-center gap-3 ${
                  index === 0 ? leftInsetFirstItemClass : ""
                }`}
              >
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
        </div>
      </section>

      {/* Banner — compra en línea, recoge en tienda + carrusel de productos */}
      <section className="mx-auto mt-12 max-w-6xl bg-white sm:mt-16">
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
          <div className="py-10 sm:py-12">
            <div
              ref={productsScrollRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`w-48 shrink-0 snap-start sm:w-56 ${
                    index === 0 ? leftInsetFirstItemClass : ""
                  } ${index === products.length - 1 ? "mr-6 lg:mr-16" : ""}`}
                >
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