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
    text: "Hablamos por teléfono o videollamada. Escuchamos vuestra situación en profundidad, sin prisas, con absoluta confidencialidad y sin ningún compromiso.",
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
    text: "Sesiones periódicas presenciales u online, presencia cercana en el día a día y pautas claras para consolidar una convivencia en calma y duradera.",
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
    } else if (latest < 0.70) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  // DESFASE ÓPTICO (Rack Focus)
  const blurVal = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [5, 0, 0, 5], {
    clamp: true,
  });
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.7, 1, 1, 0.7],
    { clamp: true }
  );

  // Progreso continuo de la línea viva del hilo conductor que une los 3 pasos
  const lineScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], {
    clamp: true,
  });
  const progressPercent = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    ["0%", "100%"],
    { clamp: true }
  );

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height - window.innerHeight;
    const targetScroll = sectionTop + sectionHeight * (index * 0.40 + 0.10);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="proceso"
      ref={containerRef}
      className="relative h-[250vh] md:h-[300vh] bg-background"
    >
      {/* Viewport Sticky anclado durante el recorrido extendido de los 3 pasos */}
      <div className="sticky top-0 flex min-h-[100svh] h-screen w-full flex-col justify-center overflow-hidden px-6 py-8 md:px-12">
        <motion.div
          style={{ filter, opacity }}
          className="shell w-full will-change-[filter,opacity]"
        >
          {/* Cabecera del Proceso con indicador de progreso sincronizado */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
            <MotionReveal
              duration={durations.headline}
              y={24}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="eyebrow text-primary font-semibold">
                  MÉTODO TRANSPARENTE
                </p>
              </div>
              <h2 className="text-[2rem] leading-[1.12] text-foreground sm:text-[2.6rem] md:text-[3.2rem]">
                Cómo trabajamos: 3 pasos hacia la calma familiar.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Un acompañamiento cercano, estructurado y sin rodeos, enfocado en
                dar respuestas prácticas desde el primer día.
              </p>
            </MotionReveal>

            {/* Medidor vivo del hilo conductor en el Proceso */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start md:self-end bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-foreground">
                  Fase {activeStep + 1} de 3:
                </span>
                <span className="text-xs text-primary font-semibold">
                  {steps[activeStep].tag}
                </span>
              </div>
              <div className="relative h-2 w-32 md:w-36 rounded-full bg-border overflow-hidden">
                <motion.div
                  style={{ width: progressPercent }}
                  className="h-full bg-primary rounded-full origin-left shadow-[0_0_8px_rgba(192,86,56,0.7)]"
                />
              </div>
            </div>
          </div>

          {/* Carril de la Línea Viva del Proceso */}
          <div className="relative mt-4 md:mt-8">
            {/* Línea horizontal continua en desktop */}
            <div className="absolute left-0 top-0 hidden h-[3px] w-full bg-border/70 md:block rounded-full" />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-0 top-0 hidden h-[3px] w-full origin-left bg-primary md:block shadow-[0_0_10px_rgba(192,86,56,0.7)] rounded-full"
            />

            {/* Línea vertical continua en mobile */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-border/70 md:hidden rounded-full" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-0 top-0 h-full w-[3px] origin-top bg-primary md:hidden shadow-[0_0_10px_rgba(192,86,56,0.7)] rounded-full"
            />

            <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
              {steps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                const isCompleted = activeStep > idx;

                return (
                  <div
                    key={step.n}
                    onClick={() => scrollToStep(idx)}
                    className="relative pl-8 md:pl-0 md:pt-10 transition-all cursor-pointer group"
                  >
                    {/* Nodo reactivo en el eje de la línea */}
                    <span
                      className={`absolute left-0 top-2 md:top-0 -translate-x-[6.5px] md:-translate-y-[6.5px] h-4 w-4 rounded-full ring-4 ring-background transition-all duration-500 ease-out ${
                        isCurrent
                          ? "bg-primary scale-125 shadow-[0_0_14px_rgba(192,86,56,0.85)]"
                          : isCompleted
                          ? "bg-primary scale-105"
                          : "bg-border scale-90"
                      }`}
                    />

                    {/* Tarjeta del paso */}
                    <div
                      className={`rounded-2xl border p-5 md:p-6 transition-all duration-500 ease-out ${
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
                            isCurrent ? "text-primary" : "text-muted-foreground/70"
                          }`}
                        >
                          {step.n}
                        </span>
                      </div>

                      <h3 className="mt-3 text-base font-normal text-foreground sm:text-lg md:text-xl leading-[1.25]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
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
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground/80 font-mono">
            {activeStep < 2 ? (
              <span>Desliza para continuar hacia el siguiente paso ↓</span>
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
