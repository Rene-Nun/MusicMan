import Image from "next/image";

const branches = [
  {
    name: "Musicman · De La Raza",
    address: "Av. De La Raza No. 4916",
    city: "Cd. Juárez, Chih.",
    phone: "656 617 9934",
  },
  {
    name: "Musicman · Las Torres",
    address: "Av. Las Torres No. 1438",
    city: "Cd. Juárez, Chih.",
    phone: "656 690 4234",
  },
];

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.8h2.5V21h3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.6v2.5a6.6 6.6 0 0 1-3.5-1v6.4a5 5 0 1 1-4.3-4.9v2.6a2.4 2.4 0 1 0 1.8 2.3V3h2.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/526566179934",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M12 3a9 9 0 0 0-7.8 13.4L3 21l4.7-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.8 13.3l-.3-.2-2.8.7.7-2.7-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.7 3.6c-.2 0-.5 0-.6.3-.2.3-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.8-2.1-1.4-.6-.6-1-1.3-1.3-1.9-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.4 0-.6l-.9-2c-.1-.3-.3-.3-.5-.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-[#0f6a24] bg-[#117C2E]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_0.9fr]">

          {/* Marca */}
          <div className="text-center sm:text-left">
            <Image
              src="/icon.PNG"
              alt="MusicMan Logo"
              width={112}
              height={112}
              className="mx-auto -mt-6 mb-3 h-28 w-auto object-contain sm:mx-0"
              unoptimized={true}
              quality={100}
            />
            <p className="text-sm leading-relaxed text-white/80">
              Instrumentos musicales seleccionados a mano. Reserva en línea,
              recoge en tienda el mismo día.
            </p>

            <div className="mt-5 flex justify-center gap-3 sm:justify-start">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sucursales */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Sucursales
            </p>
            <ul className="space-y-5">
              {branches.map((b) => (
                <li key={b.name} className="text-sm">
                  <p className="font-medium text-white">{b.name}</p>
                  <address className="mt-1 space-y-0.5 not-italic text-white/70">
                    <p>{b.address}</p>
                    <p>{b.city}</p>
                    <a
                      href={`tel:+52${b.phone.replace(/\s/g, "")}`}
                      className="inline-block text-white/70 transition-colors hover:text-white"
                    >
                      Tel. {b.phone}
                    </a>
                  </address>
                </li>
              ))}
            </ul>
          </div>

          {/* Horario */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Horario de tienda
            </p>
            <ul className="space-y-1 text-sm text-white">
              <li className="flex justify-between gap-4">
                <span className="text-white/70">Lun – Vie</span>
                <span>10:00 – 19:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-white/70">Sábado</span>
                <span>10:00 – 17:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-white/70">Domingo</span>
                <span>Cerrado</span>
              </li>
            </ul>

            <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-wider text-white/60">
              Contacto
            </p>
            <a
              href="mailto:hola@musicman.mx"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              hola@musicman.mx
            </a>
          </div>

          {/* Enlaces */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Empresa
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/sobre-nosotros" className="text-white/80 transition-colors hover:text-white">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-white/80 transition-colors hover:text-white">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/preguntas-frecuentes" className="text-white/80 transition-colors hover:text-white">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="/garantias" className="text-white/80 transition-colors hover:text-white">
                  Garantías
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#0f6a24]">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-6 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Musicman. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/aviso-de-privacidad" className="transition-colors hover:text-white">
              Aviso de privacidad
            </a>
            <a href="/terminos-y-condiciones" className="transition-colors hover:text-white">
              Términos y condiciones
            </a>
            <a href="/politica-de-cookies" className="transition-colors hover:text-white">
              Política de cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}