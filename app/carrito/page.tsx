"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

// Vacío por ahora — cuando conectemos el carrito real, esto se llena desde
// tu fuente de verdad (Notion, contexto, lo que uses para persistirlo).
const initialCartItems: CartItem[] = [];

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export default function CarritoPage() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Tu carrito está vacío
          </h1>
          <p className="mt-3 max-w-md text-sm text-neutral-500">
            Explora el catálogo y agrega instrumentos, audio o accesorios
            para recoger en tienda.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
          >
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Tu carrito
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          {itemCount} {itemCount === 1 ? "producto" : "productos"}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Lista de productos */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-sm border border-neutral-200 p-4 sm:gap-6 sm:p-5"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-neutral-100 sm:h-28 sm:w-28">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-500">
                      {item.category}
                    </p>
                    <h3 className="font-display text-lg font-medium text-neutral-900">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-sm border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1.5 text-neutral-900 transition-colors hover:bg-neutral-100"
                        aria-label={`Restar una unidad de ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1.5 text-neutral-900 transition-colors hover:bg-neutral-100"
                        aria-label={`Sumar una unidad de ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display text-lg text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="self-start text-xs font-semibold uppercase tracking-wide text-neutral-400 transition-colors hover:text-neutral-900"
                  aria-label={`Quitar ${item.name} del carrito`}
                >
                  Quitar
                </button>
              </div>
            ))}

            <Link
              href="/"
              className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:text-[#4CA5E4]"
            >
              ← Seguir comprando
            </Link>
          </div>

          {/* Resumen */}
          <div className="h-fit rounded-sm bg-neutral-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-neutral-900">
              Resumen
            </h2>

            <div className="mt-6 flex items-center justify-between text-sm text-neutral-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-2 flex items-start justify-between gap-4 text-sm text-neutral-600">
              <span>Entrega</span>
              <span className="text-right text-[#117C2E]">
                Recoge gratis en tienda
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 font-display text-lg font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-sm bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
            >
              Finalizar compra
            </button>

            <p className="mt-4 text-xs text-neutral-500">
              Elige tu sucursal al finalizar la compra y recoge sin costo de
              envío.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}