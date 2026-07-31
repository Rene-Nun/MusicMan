import Image from "next/image";

export default function Footer() {
  return (
    {/* overflow-hidden oculta cualquier excedente que se salga hacia arriba */}
    <footer className="overflow-hidden border-t border-[#0f6a24] bg-[#117C2E]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10">
          
          {/* -mt-10 empuja a la fuerza toda esta columna (logo y texto) hacia arriba */}
          <div className="w-full sm:w-1/3 -mt-10">
            <Image
              src="/icon.PNG"
              alt="MusicMan Logo"
              width={128}
              height={128}
              className="mb-4 h-32 w-auto object-contain"
              unoptimized={true}
              quality={100}
            />
            <p className="text-sm text-white/80">
              Instrumentos musicales seleccionados a mano. Reserva en línea,
              recoge en tienda el mismo día.
            </p>
          </div>

          {/* Columna 2: Visítanos */}
          <div className="w-full sm:w-1/3">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Visítanos
            </p>
            <address className="space-y-1 text-sm not-italic text-white">
              <p>Av. Tecnológico 1420, Local 4</p>
              <p>Ciudad Juárez, Chih., México</p>
              <p className="text-white/70">+52 656 123 4567</p>
              <p className="text-white/70">hola@musicman.mx</p>
            </address>
          </div>

          {/* Columna 3: Horarios */}
          <div className="w-full sm:w-1/3">
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
          </div>

        </div>
      </div>

      <div className="border-t border-[#0f6a24] px-6 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Musicman. Todos los derechos reservados.
      </div>
    </footer>
  );
}