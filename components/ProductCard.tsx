"use client";

import Image from "next/image";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: "en-tienda" | "ultima-unidad";
  href?: string;
};

type ProductCardProps = Product & {
  variant?: "dark" | "light";
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  stock,
  variant = "dark",
}: ProductCardProps) {
  const isLight = variant === "light";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-sm transition-colors ${
        isLight
          ? "bg-white"
          : "border border-line bg-panel hover:border-brass/50"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-black/30">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {stock === "ultima-unidad" && (
          <span
            className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
              isLight ? "bg-neutral-900 text-white" : "bg-brass text-ink"
            }`}
          >
            Última unidad
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className={`truncate font-display text-lg font-medium ${isLight ? "text-neutral-900" : "text-paper"}`}>
            {name}
          </h3>
        </div>

        <p className={`mt-auto font-display text-xl ${isLight ? "text-neutral-900" : "text-brass"}`}>
          {price.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 })}
        </p>
      </div>
    </article>
  );
}