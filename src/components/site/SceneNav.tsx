import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const scenes = [
  { id: "top", label: "Inicio", number: "01" },
  { id: "metodo", label: "Método", number: "02" },
  { id: "areas", label: "Situaciones", number: "03" },
  { id: "proceso", label: "Proceso", number: "04" },
  { id: "cesar", label: "César", number: "05" },
  { id: "proyectos", label: "Proyectos", number: "06" },
  { id: "contacto", label: "Valoración", number: "CTA" },
];

export function SceneNav() {
  const [activeId, setActiveId] = useState("top");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 250);

      // En un Stacking Deck, la sección activa es la última (en orden DOM) cuya parte superior ha llegado a la zona de visión
      const reversedScenes = [...scenes].reverse();
      const current = reversedScenes.find((s) => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.40;
      });

      if (current) {
        setActiveId(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto hidden md:flex"
          aria-label="Navegación de escenas cinemáticas"
        >
          <div className="flex items-center gap-1 rounded-full border border-black/[0.08] bg-ivory/80 backdrop-blur-md px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
            <span className="hidden sm:inline-block pl-2 pr-3 text-[10px] font-mono tracking-widest uppercase text-muted-foreground border-r border-border/60">
              ESCENA
            </span>

            <div className="flex items-center gap-1">
              {scenes.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`relative px-3 py-1.5 text-xs rounded-full font-medium transition-colors cursor-pointer select-none ${
                      isActive
                        ? "text-primary-foreground font-semibold"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-scene-indicator"
                        className="absolute inset-0 rounded-full bg-primary shadow-xs"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] opacity-75">{s.number}</span>
                      <span className="hidden md:inline">{s.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
