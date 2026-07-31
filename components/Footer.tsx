export default function Footer() {
  return (
    <footer className="border-t border-line" style={{ backgroundColor: '#117C2E' }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img 
              src="/public/icon.PNG" 
              alt="Fandom" 
              className="h-12 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'font-display text-2xl font-semibold text-white';
                fallback.textContent = 'FANDOM';
                e.target.parentNode.appendChild(fallback);
              }}
            />
          </div>
          <p className="mt-3 text-sm text-white/80">
            Compra y vende boletos para eventos de forma segura. 
            Planes de pago accesibles sin buró de crédito.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Contacto
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-white">
            <p>Paso del Norte Labs</p>
            <p>Ciudad Juárez, Chih., México</p>
            <p className="text-white/60">fandom.soporte@proton.me</p>
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <button 
                onClick={() => window.openLegal?.('terms')}
                className="text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Términos y Condiciones
              </button>
            </li>
            <li>
              <button 
                onClick={() => window.openLegal?.('privacy')}
                className="text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Política de Privacidad
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Fandom - Paso del Norte Labs. Todos los derechos reservados.
      </div>
    </footer>
  );
}