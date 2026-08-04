import type { Metadata } from "next";
import { Oswald, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Musicman — Reserva en línea, recoge en tienda",
  description:
    "Catálogo de guitarras y amplificadores de Musicman. Reserva en línea y recoge tu instrumento en tienda, sin envíos ni esperas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} font-body bg-ink text-paper antialiased`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}