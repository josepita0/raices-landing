import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { MotionReveal } from "@/components/motion/MotionPrimitives";
import { durations } from "@/lib/motion-tokens";

const steps = [
  {
    n: "01",
    title: "Primera valoración",
    text: "Hablamos por teléfono o videollamada. Escuchamos vuestra situación en profundidad, sin prisas, con absoluta confidencialidad y sin ningún compromiso.",
    range: [0.08, 0.28] as [number, number],
  },
  {
    n: "02",
    title: "Plan de intervención en vuestro entorno",
    text: "Definimos objetivos realistas y una hoja de ruta personalizada. Adaptamos la intervención al momento que vive vuestro hijo/a y a vuestras rutinas familiares.",
    range: [0.35, 0.58] as [number, number],
  },
  {
    n: "03",
    title: "Acompañamiento y avances reales",
    text: "Sesiones periódicas presenciales u online, presencia cercana en el día a día y pautas claras para consolidar una convivencia en calma y duradera.",
    range: [0.65, 0.88] as [number, number],
  },
];

function StepNode({
  progress,
  step,
}: {
  progress: MotionValue<number>;
  step: (typeof steps)[number];
}) {
  const [start, end] = step.range;
  const opacity = useTransform(
    progress,
    [start - 0.12, start + 0.08],
    [0.45, 1],
  );
  const nodeScale = useTransform(
    progress,
    [start - 0.08, start + 0.05],
    [0.85, 1.25],
  );
  const nodeBg = useTransform(
    progress,
    [start - 0.08, start + 0.05],
    ["#E2DDD5", "#C05638"],
  );
  const nodeShadow = useTransform(
    progress,
    [start - 0.08, start + 0.05],
    ["none", "0 0 10px rgba(192,86,56,0.7)"],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="relative pl-8 md:pl-0 md:pt-10 transition-all"
    >
      {/* Nodo reactivo del hilo conductor */}
      <motion.span
        style={{
          scale: nodeScale,
          backgroundColor: nodeBg,
          boxShadow: nodeShadow,
        }}
        className="absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-[6px] rounded-full ring-4 ring-background md:left-0 md:top-0 md:-translate-y-[6px]"
      />
      <span className="font-display text-base font-semibold text-primary">
        {step.n}
      </span>
      <h3 className="mt-2 text-xl font-normal text-foreground md:text-2xl">
        {step.title}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
        {step.text}
      </p>
    </motion.div>
  );
}

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.80", "end 0.50"],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // DESFASE ÓPTICO (Rack Focus)
  const blurVal = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );
  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0.55, 1, 1, 0.55],
  );
  const y = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

  const scale = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative section-pad bg-background"
    >
      <motion.div
        style={{ filter, opacity, y }}
        className="shell will-change-[filter,opacity,transform]"
      >
        <MotionReveal
          duration={durations.headline}
          y={30}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <p className="eyebrow text-primary font-semibold">
              MÉTODO TRANSPARENTE
            </p>
          </div>
          <h2 className="mt-4 text-[2.2rem] leading-[1.12] text-foreground sm:text-[2.8rem] md:text-[3.3rem]">
            Cómo trabajamos: 3 pasos hacia la calma familiar.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Un acompañamiento cercano, estructurado y sin rodeos, enfocado en
            dar respuestas prácticas desde el primer día.
          </p>
        </MotionReveal>

        <div ref={ref} className="relative mt-20 md:mt-24">
          {/* Línea horizontal del hilo conductor en desktop */}
          <div className="absolute left-0 top-0 hidden h-[2px] w-full bg-border/70 md:block" />
          <motion.div
            style={{ scaleX: scale }}
            className="absolute left-0 top-0 hidden h-[2px] w-full origin-left bg-primary md:block shadow-[0_0_8px_rgba(192,86,56,0.6)]"
          />

          {/* Línea vertical del hilo conductor en mobile */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-border/70 md:hidden" />
          <motion.div
            style={{ scaleY: scale }}
            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary md:hidden shadow-[0_0_8px_rgba(192,86,56,0.6)]"
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((s) => (
              <StepNode key={s.n} progress={scrollYProgress} step={s} />
            ))}
          </div>
        </div>

        {/* Hilo conector inferior hacia César López */}
        <div className="mt-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="h-12 w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/80" />
          <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-primary/70">
            QUIÉN OS ACOMPAÑA ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}
