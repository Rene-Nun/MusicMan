export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-paper">
            MUSIC<span className="text-brass">MAN</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            Instrumentos musicales seleccionados a mano. Reserva en línea,
            recoge en tienda el mismo día.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Visítanos
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-paper">
            <p>Av. Tecnológico 1420, Local 4</p>
            <p>Ciudad Juárez, Chih., México</p>
            <p className="text-muted">+52 656 123 4567</p>
            <p className="text-muted">hola@musicman.mx</p>
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Horario de tienda
          </p>
          <ul className="mt-3 space-y-1 text-sm text-paper">
            <li className="flex justify-between gap-4">
              <span className="text-muted">Lun – Vie</span>
              <span>10:00 – 19:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted">Sábado</span>
              <span>10:00 – 17:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted">Domingo</span>
              <span>Cerrado</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-6 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Musicman. Todos los derechos reservados.
      </div>
    </footer>
  );
}
