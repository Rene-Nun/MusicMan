"use client";

import Image from "next/image";
import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: "en-tienda" | "ultima-unidad";
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
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  const isLight = variant === "light";

  async function handleReserve() {
    setIsReserving(true);

    // TODO: Conectar a webhook de Make.com para mandar a Notion.
    // Ejemplo de payload esperado por el escenario de Make:
    // await fetch(process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ productId: id, productName: name, price, requestedAt: new Date().toISOString() }),
    // });

    setIsReserving(false);
    setReserved(true);
  }

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-sm border transition-colors ${
        isLight
          ? "border-transparent bg-white"
          : "border-line bg-panel hover:border-brass/50"
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
          <p className={`text-xs uppercase tracking-wider ${isLight ? "text-neutral-500" : "text-muted"}`}>
            {category}
          </p>
          <h3 className={`truncate font-display text-lg font-medium ${isLight ? "text-neutral-900" : "text-paper"}`}>
            {name}
          </h3>
        </div>

        <p className={`mt-auto font-display text-xl ${isLight ? "text-neutral-900" : "text-brass"}`}>
          {price.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 })}
        </p>

        <button
          onClick={handleReserve}
          disabled={isReserving || reserved}
          className={`mt-1 w-full rounded-sm px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
            isLight
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "bg-brass text-ink hover:bg-paper"
          }`}
        >
          {reserved ? "Reservado ✓" : isReserving ? "Reservando..." : "Reservar y Recoger en Tienda"}
        </button>
      </div>
    </article>
  );
}