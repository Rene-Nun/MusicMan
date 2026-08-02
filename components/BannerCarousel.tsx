"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

/**
 * Carrusel de banners promocionales.
 *
 * Principio de diseño (después de varias rondas fallidas con margin-right
 * negativo + snap + hacks de JS para Safari): la forma más simple de
 * garantizar que el primer banner quede alineado con el hero es que AMBOS
 * usen literalmente el mismo contenedor — "mx-auto max-w-6xl px-0 sm:px-6".
 * No hay margin en el primer hijo, no hay padding-right calculado, no hay
 * variable CSS compartida entre dos sistemas distintos: el scroll ocurre
 * DENTRO del mismo padding que ya define el hero, así que no hay nada que
 * pueda desincronizarse.
 *
 * Tampoco usa scroll-snap: fue la fuente original del bug en Safari/iOS
 * (el navegador reposicionaba el scroll al cargar para "snapear" el primer
 * elemento, ignorando cualquier margin/padding previo). Sin snap, ese
 * comportamiento no se dispara. El scroll es libre (touch/trackpad) más
 * las flechas de abajo para desktop.
 */
export default function BannerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-6 bg-white sm:mt-8">
      <div className="mx-auto max-w-6xl px-0 sm:px-6">
        <div className="mb-3 flex items-center justify-between px-6 sm:px-0">
          <h2 className="font-display text-xl font-semibold text-neutral-900 sm:text-2xl">
            Promociones
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-6 pb-2 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {banners.map((banner) => (
            <a
              key={banner.name}
              href="#catalogo"
              className="relative h-52 shrink-0 overflow-hidden rounded-sm sm:h-60 lg:h-64"
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
  );
}