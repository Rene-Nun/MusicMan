import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D0C",       // fondo casi negro, madera quemada
        panel: "#171513",     // paneles / cards
        line: "#2A2622",      // bordes sutiles
        paper: "#F3EFE7",     // texto principal, blanco cálido
        muted: "#A79F91",     // texto secundario
        brass: "#C89B3C",     // acento latón (herrajes de instrumentos)
        "brass-dim": "#8A6B2A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(243,239,231,0.045) 1px, transparent 0)",
      },
      backgroundSize: {
        "grain": "22px 22px",
      },
    },
  },
  plugins: [],
};
export default config;
