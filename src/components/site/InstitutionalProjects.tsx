import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  MotionReveal,
  MotionStagger,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { durations, staggers } from "@/lib/motion-tokens";
import {
  GraduationCap,
  Sparkles,
  Handshake,
  School,
  Compass,
  ArrowRight,
  Building2,
} from "lucide-react";

const proyectos = [
  {
    n: "01",
    icon: GraduationCap,
    title: "Formación socioeducativa",
    text: "Formación especializada dirigida a profesionales y familias.",
    badge: "Profesionales y Familias",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Talleres socioeducativos",
    text: "Talleres adaptados a las necesidades de cada grupo y etapa educativa.",
    badge: "Etapas Educativas",
  },
  {
    n: "03",
    icon: Handshake,
    title: "Mediación y convivencia",
    text: "Programas de mediación, prevención de conflictos y mejora de la convivencia.",
    badge: "Prevención y Clima",
  },
  {
    n: "04",
    icon: School,
    title: "Intervención en centros educativos",
    text: "Actuaciones en colegios e institutos orientadas a la prevención, inclusión, convivencia y acompañamiento del alumnado.",
    badge: "Colegios e IES",
    featured: true,
  },
  {
    n: "05",
    icon: Compass,
    title: "Proyectos educativos a medida",
    text: "Diseñamos y desarrollamos proyectos específicos en función de las necesidades de cada centro, entidad o administración.",
    badge: "Diseño Ad Hoc",
    featured: true,
  },
];

const entidades = [
  "Colegios",
  "Institutos (IES)",
  "Ayuntamientos",
  "Fundaciones",
  "Asociaciones",
  "Empresas",
  "Entidades públicas y privadas",
];

export function InstitutionalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // DESFASE ÓPTICO (Rack Focus): Entrada y salida armónica con la lente cinemática
  const blurVal = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [6, 0, 0, 6]
  );
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [25, 0, 0, -25]);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative section-pad bg-background overflow-hidden"
    >
      <motion.div
        style={{ filter, opacity, y }}
        className="shell will-change-[filter,opacity,transform]"
      >
        {/* Cabecera Editorial de la Sección */}
        <div className="max-w-3xl">
          <MotionReveal duration={durations.reveal} y={20}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="eyebrow text-primary font-semibold">
                COLABORACIÓN INSTITUCIONAL & EDUCATIVA
              </p>
            </div>
          </MotionReveal>

          <MotionReveal duration={durations.headline} delay={0.08} y={24}>
            <h2 className="text-[2.3rem] leading-[1.12] text-foreground sm:text-[2.9rem] md:text-[3.4rem]">
              Proyectos públicos y privados
            </h2>
          </MotionReveal>

          <MotionReveal duration={durations.reveal} delay={0.16} y={20}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-justify md:text-left md:text-lg">
              Diseñamos y desarrollamos proyectos educativos y socioeducativos
              adaptados a las necesidades de cada centro, entidad y colectivo.
            </p>
          </MotionReveal>
        </div>

        {/* Separador temático */}
        <div className="mt-14 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-4">
          <h3 className="font-display text-2xl md:text-3xl text-foreground font-normal">
            ¿Qué proyectos desarrollamos?
          </h3>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest font-medium">
            05 líneas de intervención
          </span>
        </div>

        {/* Bento Grid de los 5 Proyectos */}
        <MotionStagger
          stagger={staggers.cards}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {proyectos.map((proyecto) => {
            const Icon = proyecto.icon;
            const isWide = proyecto.featured;

            return (
              <StaggerItem
                key={proyecto.n}
                className={isWide ? "lg:col-span-1.5" : "lg:col-span-1"}
              >
                <div className="group relative h-full flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_35px_rgba(0,0,0,0.05)]">
                  <div>
                    {/* Top row: Número y Badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-secondary/70 border border-border/60 flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground/80 tracking-widest font-semibold">
                        {proyecto.n}
                      </span>
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-secondary/50 text-[11px] font-mono text-primary font-medium tracking-wide mb-3">
                      {proyecto.badge}
                    </span>

                    <h4 className="text-xl font-sans font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                      {proyecto.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {proyecto.text}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>Área socioeducativa</span>
                    <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary flex items-center gap-1 font-sans font-medium">
                      Consultar <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </MotionStagger>

        {/* Bloque Institucional: ¿Con quién trabajamos? */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-secondary/40 p-7 sm:p-9 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-primary" />
              <p className="eyebrow text-primary text-xs font-semibold">
                RED DE COLABORACIÓN Y COBERTURA
              </p>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
              ¿Con quién trabajamos?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed text-justify md:text-left">
              Trabajamos en estrecha colaboración con centros educativos,
              administraciones públicas, tercer sector y tejido empresarial:
            </p>
          </div>

          {/* Badges / Pills de Entidades */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-2 sm:gap-2.5">
            {entidades.map((entidad) => (
              <span
                key={entidad}
                className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-background/85 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-foreground/90 backdrop-blur-xs transition-all duration-200 hover:border-primary/50 hover:bg-background hover:text-primary shadow-2xs select-none"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {entidad}
              </span>
            ))}
          </div>

          {/* Cierre y llamada a la acción específica */}
          <div className="relative z-10 mt-8 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-xs sm:text-sm text-foreground/80 italic max-w-xl">
              &ldquo;Cada proyecto se adapta al contexto, los objetivos y las
              necesidades de la organización con la que trabajamos.&rdquo;
            </p>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 shrink-0 cursor-pointer"
            >
              <span>Solicitar propuesta para centros</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
