import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/10 bg-[#0c1220]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Venuvyy Events home">
          <Logo variant="dark" size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm text-slate-300 transition hover:text-[#d4af37]">
            Services
          </a>
          <a href="#custom-planning" className="text-sm text-slate-300 transition hover:text-[#d4af37]">
            Custom
          </a>
          <a href="#consultation" className="text-sm text-slate-300 transition hover:text-[#d4af37]">
            Contact
          </a>
        </nav>
        <a
          href="#consultation"
          className="rounded-full bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] px-5 py-2 text-sm font-medium text-[#1a1a1b] shadow-lg shadow-[#d4af37]/20 transition hover:opacity-90"
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
