import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const checkpoints = [
  { id: "top", label: "Inicio", n: "01", progress: 0.05 },
  { id: "metodo", label: "Método", n: "02", progress: 0.28 },
  { id: "areas", label: "Situaciones", n: "03", progress: 0.52 },
  { id: "proceso", label: "Proceso", n: "04", progress: 0.72 },
  { id: "cesar", label: "César", n: "05", progress: 0.86 },
  { id: "contacto", label: "Valoración", n: "CTA", progress: 0.98 },
];

export function RootThread() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const [activeCheckpoint, setActiveCheckpoint] = useState("top");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setIsVisible(latest > 0.03);

      let current = checkpoints[0].id;
      for (let i = checkpoints.length - 1; i >= 0; i--) {
        if (latest >= checkpoints[i].progress - 0.06) {
          current = checkpoints[i].id;
          break;
        }
      }
      setActiveCheckpoint(current);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  const lineHeight = useTransform(smoothProgress, [0.03, 0.98], ["0%", "100%"]);

  return (
    <aside
      aria-label="Hilo conductor de la narración"
      className={`fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-none transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center justify-between h-[360px] w-6">
        {/* Línea guía base sutil */}
        <div className="absolute top-2 bottom-2 w-[1.5px] bg-border/80 rounded-full" />

        {/* Hilo conductor vivo dibujado con el scroll */}
        <div className="absolute top-2 bottom-2 w-[2px] overflow-hidden rounded-full origin-top">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-primary/50 via-primary to-primary rounded-full shadow-[0_0_8px_rgba(192,86,56,0.6)]"
          />
        </div>

        {/* Nodos de estación */}
        {checkpoints.map((cp) => {
          const isActive = activeCheckpoint === cp.id;
          return (
            <div
              key={cp.id}
              className="relative z-10 flex items-center group pointer-events-auto"
            >
              <button
                onClick={() => scrollTo(cp.id)}
                className="relative flex items-center justify-center h-5 w-5 rounded-full cursor-pointer focus:outline-hidden"
                aria-label={`Ir a ${cp.label}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-thread-pulse"
                    className="absolute inset-0 rounded-full bg-primary/20 ring-1 ring-primary/40 animate-ping"
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}

                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary scale-125 shadow-[0_0_10px_rgba(192,86,56,0.8)] ring-2 ring-background"
                      : "bg-border/90 hover:bg-primary/60 hover:scale-110"
                  }`}
                />
              </button>

              <div className="absolute left-7 px-2.5 py-1 rounded-md bg-card/95 border border-border/80 text-[11px] font-sans font-medium text-foreground tracking-wide shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="font-mono text-[9px] text-primary mr-1.5">{cp.n}</span>
                <span>{cp.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
