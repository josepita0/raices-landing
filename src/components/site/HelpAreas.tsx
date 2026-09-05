import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { durations } from "@/lib/motion-tokens";

const situaciones = [
  {
    n: "01",
    tag: "CONVIVENCIA",
    title: "Conflictos y desconexión en casa",
    sintoma: "Gritos, portazos, discusiones diarias por normas básicas y una distancia emocional que parece insalvable.",
    hacia: "Acuerdos respetados, desescalada de tensiones y un clima de serenidad y diálogo en el hogar.",
  },
  {
    n: "02",
    tag: "TECNOLOGÍA",
    title: "Aislamiento, pantallas y desmotivación",
    sintoma: "Horas encerrado/a en la habitación, pérdida de interés por los estudios y dependencia constante de redes y móviles.",
    hacia: "Uso consciente de la tecnología, recuperación de rutinas y proyectos de futuro motivadores.",
  },
  {
    n: "03",
    tag: "EMOCIONES",
    title: "Inseguridad, frustración y baja autoestima",
    sintoma: "Respuestas a la defensiva, cambios bruscos de humor, tristeza oculta o sensación de no encajar con sus iguales.",
    hacia: "Gestión sana de emociones, mayor autoconocimiento y seguridad para afrontar los retos cotidianos.",
  },
  {
    n: "04",
    tag: "ENTORNO SOCIAL",
    title: "Dificultades en el instituto y relaciones",
    sintoma: "Caída drástica del rendimiento escolar, desinterés en clase, presión social o situaciones de acoso (bullying).",
    hacia: "Estabilidad académica, habilidades asertivas y relaciones de amistad saludables y protectoras.",
  },
];

export function HelpAreas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScrollX, setMaxScrollX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // DESFASE ÓPTICO (Rack Focus): Entrada y salida suave con foco de lente
  const blurVal = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [5, 0, 0, 5]);
  const filter = useTransform(blurVal, (v) => (v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`));
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0.65, 1, 1, 0.65]);

  useEffect(() => {
    const calculateWidth = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxDelta = Math.max(0, trackWidth - viewportWidth + 64);
      setMaxScrollX(maxDelta);
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Paneo horizontal guiado por el hilo conductor
  const x = useTransform(scrollYProgress, [0.08, 0.88], [0, -maxScrollX]);
  const progressPercent = useTransform(scrollYProgress, [0.08, 0.88], ["0%", "100%"]);

  return (
    <section
      id="areas"
      ref={containerRef}
      className="relative h-[300vh] md:h-[350vh] bg-gradient-to-b from-ivory via-sand/40 to-sand/65"
    >
      {/* Viewport Sticky anclado que transforma el scroll vertical en barrido horizontal */}
      <div className="sticky top-0 flex min-h-[100svh] h-screen w-full flex-col justify-center overflow-hidden px-6 py-8 md:px-12">
        
        {/* Contenedor con Rack Focus óptico */}
        <motion.div
          style={{ filter, opacity }}
          className="w-full will-change-[filter,opacity]"
        >
          {/* Cabecera del Plano */}
          <div className="shell mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <MotionReveal duration={durations.headline} y={20} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="eyebrow text-primary font-semibold">
                  FOTOGRAMAS DE LA REALIDAD FAMILIAR
                </p>
              </div>
              <h2 className="text-[2.2rem] leading-[1.1] text-foreground sm:text-[2.8rem] md:text-[3.2rem]">
                ¿Qué situación estáis viviendo en casa?
              </h2>
            </MotionReveal>

            {/* Medidor de Fotograma Panorámico con acento de Hilo Conductor */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Desliza el metraje
              </span>
              <div className="relative h-2 w-28 md:w-36 rounded-full bg-border overflow-hidden">
                <motion.div
                  style={{ width: progressPercent }}
                  className="h-full bg-primary rounded-full origin-left shadow-[0_0_8px_rgba(192,86,56,0.7)]"
                />
              </div>
            </div>
          </div>

          {/* Carril de Fotogramas Horizontales (Film Strip) */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 items-stretch will-change-transform pr-16"
          >
            {situaciones.map((s, index) => (
              <article
                key={s.n}
                className="group relative flex w-[85vw] sm:w-[500px] md:w-[560px] shrink-0 flex-col justify-between rounded-xl border border-border/80 bg-card p-7 sm:p-8 md:p-9 shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <span className="rounded-full bg-secondary/80 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {s.tag}
                    </span>
                    <span className="font-display text-2xl md:text-3xl text-primary font-semibold">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-normal text-foreground sm:text-2xl md:text-[1.75rem] leading-[1.18]">
                    {s.title}
                  </h3>

                  <div className="mt-6 rounded-lg bg-secondary/50 p-4 sm:p-5 border border-border/40">
                    <span className="text-[0.6875rem] uppercase tracking-wider font-semibold text-muted-foreground block">
                      De lo que ocurre hoy en casa:
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                      {s.sintoma}
                    </p>
                  </div>

                  <div className="mt-3.5 rounded-lg bg-primary/10 p-4 sm:p-5 border border-primary/25 transition-colors group-hover:bg-primary/15">
                    <span className="text-[0.6875rem] uppercase tracking-wider font-semibold text-primary block flex items-center gap-1.5">
                      <span>Hacia dónde avanzamos con RAÍCES</span>
                      <span>→</span>
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground font-medium">
                      {s.hacia}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    <span>Consultar este caso con César</span>
                    <span className="transition-transform duration-280 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <span className="text-xs text-muted-foreground/60 font-mono">
                    {index + 1} / {situaciones.length}
                  </span>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
