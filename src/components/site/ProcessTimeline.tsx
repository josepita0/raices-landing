import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState } from "react";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { durations } from "@/lib/motion-tokens";

const steps = [
  {
    n: "01",
    tag: "VALORACIÓN",
    title: "Primera valoración gratuita",
    text: "Escuchamos vuestra situación en profundidad, sin prisas, con absoluta confidencialidad y sin ningún compromiso.",
    timeframe: "Paso inicial · 30-45 min",
  },
  {
    n: "02",
    tag: "PLAN DE ACCIÓN",
    title: "Plan de intervención en vuestro entorno",
    text: "Definimos objetivos realistas y una hoja de ruta personalizada. Adaptamos la intervención al momento que vive vuestro hijo/a y a vuestras rutinas familiares.",
    timeframe: "A medida de la familia",
  },
  {
    n: "03",
    tag: "ACOMPAÑAMIENTO",
    title: "Acompañamiento y avances reales",
    text: "Sesiones periódicas presenciales, presencia cercana en el día a día y pautas claras para consolidar una convivencia en calma y duradera.",
    timeframe: "Presencia continua y cercana",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Recorrido extendido con pantalla anclada (sticky) para dar tiempo real a cada paso
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sincronizar el paso activo con el progreso suave del scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveStep(0);
    } else if (latest < 0.7) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  // DESFASE ÓPTICO (Rack Focus)
  const blurVal = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [5, 0, 0, 5],
    {
      clamp: true,
    },
  );
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.7, 1, 1, 0.7],
    { clamp: true },
  );

  // Progreso continuo de la línea viva del hilo conductor que une los 3 pasos
  const lineScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], {
    clamp: true,
  });
  const progressPercent = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    ["0%", "100%"],
    { clamp: true },
  );

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height - window.innerHeight;
    const targetScroll = sectionTop + sectionHeight * (index * 0.4 + 0.1);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="proceso"
      ref={containerRef}
      className="relative h-[250vh] md:h-[300vh] bg-background"
    >
      {/* Viewport Sticky anclado durante el recorrido extendido de los 3 pasos */}
      <div className="sticky top-0 flex min-h-[100svh] h-screen w-full flex-col justify-center overflow-hidden px-4 py-4 sm:px-8 sm:py-8 md:px-12">
        <motion.div
          style={{ filter, opacity }}
          className="shell w-full will-change-[filter,opacity]"
        >
          {/* Cabecera del Proceso con indicador de progreso sincronizado */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-12">
            <MotionReveal
              duration={durations.headline}
              y={20}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="eyebrow text-primary font-semibold text-xs sm:text-sm">
                  MÉTODO TRANSPARENTE
                </p>
              </div>
              <h2 className="text-xl leading-[1.18] text-foreground sm:text-2xl md:text-[3.2rem]">
                Cómo trabajamos: 3 pasos hacia la calma familiar.
              </h2>
              <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm text-muted-foreground md:text-base">
                Un acompañamiento cercano, estructurado y sin rodeos, enfocado
                en dar respuestas prácticas desde el primer día.
              </p>
            </MotionReveal>

            {/* Medidor vivo del hilo conductor en el Proceso */}
            <div className="flex items-center gap-2.5 self-start md:self-end bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-mono font-medium text-foreground">
                  Fase {activeStep + 1} de 3:
                </span>
                <span className="text-[11px] sm:text-xs text-primary font-semibold">
                  {steps[activeStep].tag}
                </span>
              </div>
              <div className="relative h-1.5 sm:h-2 w-24 sm:w-32 md:w-36 rounded-full bg-border overflow-hidden">
                <motion.div
                  style={{ width: progressPercent }}
                  className="h-full bg-primary rounded-full origin-left shadow-[0_0_8px_rgba(192,86,56,0.7)]"
                />
              </div>
            </div>
          </div>

          {/* VISTA MOBILE: Stepper de Fases + Tarjeta Enfocada (sin desbordamiento vertical) */}
          <div className="block md:hidden mt-3">
            {/* Stepper horizontal táctil */}
            <div className="relative flex items-center justify-between mb-3 px-3">
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-border/70 rounded-full" />
              <motion.div
                style={{ scaleX: lineScale }}
                className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] origin-left bg-primary rounded-full shadow-[0_0_8px_rgba(192,86,56,0.7)]"
              />
              {steps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                const isCompleted = activeStep > idx;
                return (
                  <button
                    key={step.n}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all duration-300 ring-4 ring-background ${
                        isCurrent
                          ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_10px_rgba(192,86,56,0.85)]"
                          : isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.n}
                    </span>
                    <span
                      className={`text-[9px] font-mono tracking-wider uppercase transition-colors ${
                        isCurrent
                          ? "text-primary font-bold"
                          : "text-muted-foreground/75"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tarjeta de la fase activa con 100% de información visible */}
            <div className="rounded-2xl border border-primary/50 bg-card p-4 sm:p-5 shadow-md ring-1 ring-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                    PASO {steps[activeStep].n} · {steps[activeStep].tag}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {activeStep + 1} de 3
                </span>
              </div>

              <h3 className="mt-2.5 text-base font-medium text-foreground leading-snug">
                {steps[activeStep].title}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground text-justify">
                {steps[activeStep].text}
              </p>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="text-foreground/80">
                  {steps[activeStep].timeframe}
                </span>
                <span className="text-primary font-semibold">
                  {activeStep === 0 && "Fase inicial"}
                  {activeStep === 1 && "En curso"}
                  {activeStep === 2 && "Consolidación"}
                </span>
              </div>
            </div>
          </div>

          {/* VISTA DESKTOP: Carril continuo de 3 columnas */}
          <div className="hidden md:block relative mt-8">
            {/* Línea horizontal continua en desktop */}
            <div className="absolute left-0 top-0 hidden h-[3px] w-full bg-border/70 md:block rounded-full" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-0 top-0 hidden h-[3px] w-full origin-left bg-primary md:block shadow-[0_0_10px_rgba(192,86,56,0.7)] rounded-full"
            />

            <div className="grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
              {steps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                const isCompleted = activeStep > idx;

                return (
                  <div
                    key={step.n}
                    onClick={() => scrollToStep(idx)}
                    className="relative pl-0 pt-10 transition-all cursor-pointer group"
                  >
                    {/* Nodo reactivo en el eje de la línea */}
                    <span
                      className={`absolute left-0 top-0 -translate-y-[6.5px] h-4 w-4 rounded-full ring-4 ring-background transition-all duration-500 ease-out ${
                        isCurrent
                          ? "bg-primary scale-125 shadow-[0_0_14px_rgba(192,86,56,0.85)]"
                          : isCompleted
                            ? "bg-primary scale-105"
                            : "bg-border scale-90"
                      }`}
                    />

                    {/* Tarjeta del paso */}
                    <div
                      className={`rounded-2xl border p-6 transition-all duration-500 ease-out ${
                        isCurrent
                          ? "bg-card border-primary/50 shadow-md ring-1 ring-primary/20 scale-[1.02]"
                          : isCompleted
                            ? "bg-card/90 border-border/80 opacity-90 hover:opacity-100"
                            : "bg-card/50 border-border/40 opacity-60 hover:opacity-85"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                        <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          {step.tag}
                        </span>
                        <span
                          className={`font-display text-2xl font-semibold transition-colors duration-300 ${
                            isCurrent
                              ? "text-primary"
                              : "text-muted-foreground/70"
                          }`}
                        >
                          {step.n}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg md:text-xl font-normal text-foreground leading-[1.25]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>

                      <div className="mt-4 pt-2 border-t border-border/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <span>{step.timeframe}</span>
                        {isCurrent && (
                          <span className="text-primary font-semibold flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Activo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guía inferior sutil */}
          <div className="mt-4 sm:mt-8 md:mt-10 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-muted-foreground/80 font-mono">
            {activeStep < 2 ? (
              <span>Desliza para avanzar al siguiente paso ↓</span>
            ) : (
              <span className="text-primary/90 font-medium">
                Paso final completado · Desliza para conocer a César López ↓
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
