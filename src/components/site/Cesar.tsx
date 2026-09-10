import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  MotionReveal,
  MotionStagger,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { durations, staggers } from "@/lib/motion-tokens";

export function Cesar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: photoProgress } = useScroll({
    target: photoRef,
    offset: ["start 0.90", "center 0.45"],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enfoque óptico de cámara réflex sobre el retrato
  const photoBlur = useTransform(photoProgress, [0.1, 0.75], [7, 0]);
  const photoFilter = useTransform(photoBlur, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );
  const photoScale = useTransform(photoProgress, [0.1, 0.75], [1.05, 1.0]);

  // DESFASE ÓPTICO (Rack Focus) de la sección
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

  return (
    <section
      id="cesar"
      ref={sectionRef}
      className="relative section-pad bg-secondary/55"
    >
      <motion.div
        style={{ filter, opacity, y }}
        className="shell grid gap-12 md:grid-cols-2 md:items-center md:gap-20 will-change-[filter,opacity,transform]"
      >
        <div
          ref={photoRef}
          className="relative overflow-hidden rounded-xl border border-border/80 bg-sand/60 shadow-md"
        >
          <motion.div
            style={{ filter: photoFilter, scale: photoScale }}
            className="aspect-[4/5] w-full overflow-hidden will-change-[filter,transform]"
          >
            <img
              src="/images/cesar.webp"
              alt="César López, Integrador y Educador Social especializado en adolescencia y familia"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <MotionStagger stagger={staggers.team}>
          <StaggerItem>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="eyebrow text-primary font-semibold">
                QUIÉN OS ACOMPAÑA
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <h2 className="mt-4 text-[2.3rem] leading-[1.12] text-foreground sm:text-[2.9rem] md:text-[3.4rem]">
              César López
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 text-lg font-medium text-primary md:text-xl">
              Técnico Superior en Integración Social. Más de 18 años de
              experiencia en contexto socioeducativo.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Durante casi dos décadas he acompañado a adolescentes y familias
              en momentos de dificultad: en el hogar, en el instituto y en su
              entorno más cercano. Esa experiencia me ha enseñado que no hay
              recetas rápidas ni juicios que ayuden. Solo escucha real, criterio
              profesional y un plan de trabajo adaptado a cada familia.
            </p>
          </StaggerItem>

          <StaggerItem>
            <blockquote className="mt-6 border-l-2 border-primary pl-4 py-1.5 italic text-foreground/90 font-display text-xl md:text-2xl">
              &ldquo;El cambio no ocurre de un día para otro. Pero puede empezar
              hoy, con una conversación.&rdquo;
            </blockquote>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 pt-6 border-t border-border/80 flex items-center gap-8">
              <div>
                <p className="font-display text-4xl text-primary md:text-5xl font-normal">
                  Amplia trayectoria
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  experiencia directa
                </p>
              </div>
              <div className="h-10 w-px bg-border/80" />
              <div>
                <p className="font-display text-xl text-foreground font-medium">
                  Petrer
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  Atención presencial
                </p>
              </div>
            </div>
          </StaggerItem>
        </MotionStagger>
      </motion.div>
    </section>
  );
}

export const Trust = () => null;
