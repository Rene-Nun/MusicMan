"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/context/CartContext";

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

// Mismas dos sucursales que ya aparecen en tus flyers de producto.
const sucursales = [
  {
    id: "raza",
    name: "Sucursal Raza",
    address: "Av. De la Raza No. 4916, Cd. Juárez, Chih.",
    phone: "656 617 9934",
  },
  {
    id: "torres",
    name: "Sucursal Las Torres",
    address: "Av. Las Torres No. 1438, Cd. Juárez, Chih.",
    phone: "656 690 4234",
  },
];

type Sucursal = (typeof sucursales)[number];

type CheckoutStep = "carrito" | "sucursal" | "confirmacion";

// Genera algo con forma de folio real: MM-XXXXXX
function generarNumeroDeReferencia() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `MM-${random}`;
}

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, itemCount, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>("carrito");
  const [selectedSucursalId, setSelectedSucursalId] = useState<string | null>(null);

  // Se llenan al confirmar, porque clearCart() vacía el carrito real y
  // necesitamos seguir mostrando el resumen en el recibo.
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderSucursal, setOrderSucursal] = useState<Sucursal | null>(null);

  const handleConfirmarSucursal = () => {
    const sucursal = sucursales.find((s) => s.id === selectedSucursalId);
    if (!sucursal) return;

    setOrderNumber(generarNumeroDeReferencia());
    setOrderItems(items);
    setOrderTotal(subtotal);
    setOrderSucursal(sucursal);
    clearCart();
    setStep("confirmacion");
  };

  // ---------- Paso 3: recibo de confirmación ----------
  if (step === "confirmacion" && orderNumber && orderSucursal) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-xl px-6 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#117C2E]">
              <CheckIcon />
            </span>
            <h1 className="mt-6 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
              ¡Pedido confirmado!
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Guarda tu número de referencia, lo vas a necesitar para
              recoger tu pedido.
            </p>
          </div>

          <div className="mt-10 rounded-sm border border-dashed border-neutral-300 p-6 text-center sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Número de referencia
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
              {orderNumber}
            </p>
          </div>

          <div className="mt-8 rounded-sm bg-neutral-50 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-neutral-900">
              Recoge tu pedido en
            </h2>
            <p className="mt-2 text-sm font-medium text-neutral-900">
              {orderSucursal.name}
            </p>
            <p className="text-sm text-neutral-500">{orderSucursal.address}</p>
            <p className="text-sm text-neutral-500">Tel. {orderSucursal.phone}</p>

            <div className="mt-4 flex items-start gap-3 border-t border-neutral-200 pt-4">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#79992C]" aria-hidden="true" />
              <p className="text-xs text-neutral-500">
                Te avisaremos cuando tu pedido esté listo. Preséntate con tu
                número de referencia y una identificación.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-neutral-900">
              Resumen del pedido
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 font-display text-lg font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
          </div>

          <Link
            href="/"
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-sm bg-neutral-900 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800"
          >
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  // ---------- Paso 2: elegir sucursal ----------
  if (step === "sucursal") {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-xl px-6 py-12 sm:py-16">
          <button
            type="button"
            onClick={() => setStep("carrito")}
            className="text-sm font-semibold uppercase tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Volver al carrito
          </button>

          <h1 className="mt-4 font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Elige dónde recoger
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Selecciona la sucursal donde quieres recoger tu pedido.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {sucursales.map((sucursal) => {
              const isSelected = selectedSucursalId === sucursal.id;
              return (
                <button
                  key={sucursal.id}
                  type="button"
                  onClick={() => setSelectedSucursalId(sucursal.id)}
                  className={`flex items-start gap-4 rounded-sm border p-5 text-left transition-colors ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-neutral-900 bg-neutral-900"
                        : "border-neutral-300"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {sucursal.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {sucursal.address}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Tel. {sucursal.phone}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6 font-display text-lg font-semibold text-neutral-900">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <button
            type="button"
            disabled={!selectedSucursalId}
            onClick={handleConfirmarSucursal}
            className="mt-6 w-full rounded-sm bg-neutral-900 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Confirmar
          </button>
        </div>
      </main>
    );
  }

  // ---------- Paso 1: carrito ----------
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
              onClick={() => setStep("sucursal")}
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

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}