import { motion } from "motion/react";
import { transition } from "@/lib/motion-tokens";

const nav = [
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Áreas de ayuda", href: "#areas" },
  { label: "Quién acompaña", href: "#cesar" },
  { label: "Proyectos", href: "#proyectos" },
];

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition(0.8, 0.2)}
      className="absolute inset-x-0 top-0 z-30"
    >
      <div className="shell flex items-center justify-between px-6 py-6 md:px-12">
        <a
          href="#top"
          className="group flex items-center gap-3 leading-none"
          aria-label="RAÍCES - Inicio"
        >
          <img src="/logo.webp" alt="RAÍCES" className="h-10 w-12 rounded" />
          <div>
            <span className="font-display text-2xl tracking-tight text-ivory">
              RAÍCES
            </span>
            <span className="block text-[0.625rem] uppercase tracking-[0.26em] text-ivory/70 transition-colors group-hover:text-ivory">
              Intervención socioeducativa
            </span>
          </div>
        </a>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Navegación principal"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ivory/80 transition-colors duration-300 hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="rounded-full border border-ivory/35 bg-ink/20 px-5 py-2.5 text-sm font-medium text-ivory backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory/80 hover:bg-ink/40"
        >
          Primera valoración
        </a>
      </div>
    </motion.header>
  );
}
