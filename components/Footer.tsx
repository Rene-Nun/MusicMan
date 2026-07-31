import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#0f6a24] bg-[#117C2E]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <Image
            src="/icon.PNG"
            alt="MusicMan Logo"
            width={96}
            height={96}
            className="h-24 w-auto mb-4"
            unoptimized={true}
            quality={100}
          />
          <p className="mt-3 text-sm text-white/80">
            Instrumentos musicales seleccionados a mano. Reserva en línea,
            recoge en tienda el mismo día.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Visítanos
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-white">
            <p>Av. Tecnológico 1420, Local 4</p>
            <p>Ciudad Juárez, Chih., México</p>
            <p className="text-white/70">+52 656 123 4567</p>
            <p className="text-white/70">hola@musicman.mx</p>
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Horario de tienda
          </p>
          <ul className="mt-3 space-y-1 text-sm text-white">
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
        </div>
      </div>

      <div className="border-t border-[#0f6a24] px-6 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Musicman. Todos los derechos reservados.
      </div>
    </footer>
  );
}