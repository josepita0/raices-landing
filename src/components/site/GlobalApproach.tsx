import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  MotionReveal,
  MotionStagger,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { durations, staggers } from "@/lib/motion-tokens";

const pilares = [
  {
    n: "01",
    title: "En el hogar y su rutina",
    text: "Intervenimos en el espacio real de convivencia para desescalar tensiones diarias, acordar límites claros y recuperar los momentos compartidos en calma.",
  },
  {
    n: "02",
    title: "Con el adolescente",
    text: "Construimos un vínculo de confianza basado en la escucha activa y el respeto. Sin etiquetas ni juicios, conectando con sus inquietudes y emociones.",
  },
  {
    n: "03",
    title: "Con vosotros (la familia)",
    text: "Os dotamos de pautas prácticas, comprensibles y sostenibles para recuperar el liderazgo afectivo y restaurar la comunicación en casa.",
  },
];

export function GlobalApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Escucha del scroll a lo largo de la presencia de la sección
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax botánico lateral
  const leftLeafX = useTransform(scrollYProgress, [0, 0.6], [-30, 10]);
  const rightLeafX = useTransform(scrollYProgress, [0, 0.6], [30, -10]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.6], [1.06, 1.0]);

  // DESFASE ÓPTICO (Rack Focus): Entrada suave desde DarkScene y salida hacia Situaciones
  const blurVal = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.55, 1, 1, 0.55],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [30, 0, 0, -30],
  );

  // Dibujo del brote inicial del hilo conductor conectando la escena anterior
  const rootDraw = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="relative section-pad bg-ivory overflow-hidden transition-colors"
    >
      {/* 
        HILO CONDUCTOR VIVO: Brote superior que emerge de DarkScene 
        Guía la mirada desde la oscuridad hacia la claridad del hogar
      */}
      <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-12 h-20 pointer-events-none z-20 flex flex-col items-center">
        <svg
          width="24"
          height="80"
          viewBox="0 0 24 80"
          fill="none"
          className="overflow-visible"
        >
          <motion.path
            d="M 12,0 C 12,25 6,45 12,80"
            stroke="#C05638"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: rootDraw }}
            className="drop-shadow-[0_0_6px_rgba(192,86,56,0.6)]"
          />
          <motion.circle
            cx="12"
            cy="80"
            r="3.5"
            fill="#C05638"
            style={{ scale: rootDraw, opacity: rootDraw }}
            className="drop-shadow-[0_0_8px_rgba(192,86,56,0.8)]"
          />
        </svg>
      </div>

      {/* Elementos botánicos en parallax */}
      <motion.div
        style={{ x: leftLeafX }}
        className="pointer-events-none absolute -left-12 top-20 text-moss/20 md:-left-8 md:top-28"
        aria-hidden="true"
      >
        <svg
          width="240"
          height="360"
          viewBox="0 0 240 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-64 w-auto md:h-80 blur-[1px]"
        >
          <path
            d="M10 180C30 130 80 80 140 70C120 105 110 145 90 180C60 225 20 270 -5 305C-2 250 2 210 10 180Z"
            fill="currentColor"
          />
          <path
            d="M35 145C70 100 125 70 190 60C165 100 140 140 110 180C75 225 35 260 10 285C14 235 22 190 35 145Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ x: rightLeafX }}
        className="pointer-events-none absolute -right-12 bottom-28 text-clay/15 md:-right-8 md:bottom-36"
        aria-hidden="true"
      >
        <svg
          width="240"
          height="360"
          viewBox="0 0 240 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-64 w-auto md:h-80 blur-[1px]"
        >
          <path
            d="M230 180C210 130 160 80 100 70C120 105 130 145 150 180C180 225 220 270 245 305C242 250 238 210 230 180Z"
            fill="currentColor"
          />
          <path
            d="M205 145C170 100 115 70 50 60C75 100 100 140 130 180C165 225 205 260 230 285C226 235 218 190 205 145Z"
            fill="currentColor"
            fillOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Contenedor escénico con DESFASE ÓPTICO (Rack Focus) */}
      <motion.div
        style={{ filter, opacity: contentOpacity, y: contentY }}
        className="shell relative z-10 will-change-[filter,opacity,transform]"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
          {/* Fotografía de la cocina con marco orgánico y zoom sutil */}
          <div className="relative overflow-hidden rounded-xl shadow-sm border border-border/70 bg-sand/40">
            <motion.div
              style={{ scale: imgScale }}
              className="aspect-[4/5] w-full overflow-hidden"
            >
              <img
                src="/images/friends.webp"
                alt="Madre y adolescente conversando con calma en la cocina de casa"
                width={1280}
                height={720}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div>
            <MotionReveal duration={durations.headline} y={24}>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="eyebrow text-primary font-semibold">
                  NUESTRA PROPUESTA DE VALOR
                </p>
              </div>
              <h2 className="mt-4 text-[2.2rem] leading-[1.12] text-foreground sm:text-[2.8rem] md:text-[3.3rem]">
                La intervención no termina en consulta.
                <br />
                <span className="text-primary font-normal">
                  Llevamos el cambio al contexto real.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                En Raíces podemos trabajar en consulta, pero nuestro valor diferencial está en trasladar la intervención allí donde las dificultades se manifiestan: en el hogar, en el centro educativo y en las rutinas cotidianas.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Una vez identificadas las necesidades, nos diferenciamos en llevar la intervención cuando el caso lo necesita, directamente al contexto real, observando las dinámicas que influyen en la situación y poniendo en práctica estrategias adaptadas a cada persona y familia.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Porque comprender lo que ocurre es el primer paso. Trabajarlo en la realidad cotidiana es lo que permite consolidar el cambio.
              </p>
            </MotionReveal>
          </div>
        </div>

        {/* Pilares con acento del hilo conductor */}
        <MotionStagger
          className="mt-20 grid gap-8 border-t border-border/80 pt-12 md:grid-cols-3"
          stagger={staggers.process}
        >
          {pilares.map((p) => (
            <StaggerItem key={p.n} y={22}>
              <div className="group rounded-xl border border-border/70 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-semibold text-primary">
                    {p.n}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                </div>
                <h3 className="mt-3 text-xl font-normal text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {p.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </MotionStagger>

        {/* Hilo conector inferior hacia la siguiente sección (Situaciones) */}
        <div className="mt-16 flex flex-col items-center justify-center pointer-events-none">
          <div className="h-12 w-[2px] bg-gradient-to-b from-primary/20 via-primary to-primary/80" />
          <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-primary/70">
            FOTOGRAMAS FAMILIARES ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}
