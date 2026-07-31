import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-wide text-paper"
        >
          MUSIC<span className="text-brass">MAN</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#catalogo"
            className="text-sm font-medium text-muted transition-colors hover:text-paper"
          >
            Catálogo
          </Link>
          <Link
            href="#catalogo"
            className="hidden rounded-sm border border-brass/60 px-4 py-2 text-sm font-medium text-brass transition-colors hover:bg-brass hover:text-ink sm:inline-block"
          >
            Ver disponibilidad
          </Link>
        </div>
      </nav>
    </header>
  );
}
