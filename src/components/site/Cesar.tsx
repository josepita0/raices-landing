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
            className="aspect-[4/5] w-full overflow-hidden will-change-[filter,transform] flex flex-col items-center justify-center bg-sand/70 p-8 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary">
              <span className="font-display text-4xl">CL</span>
            </div>
            <div className="mt-5 max-w-xs">
              <p className="font-display text-2xl text-foreground">César López</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Integrador y Educador Social
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground/75 font-mono">
                Atención presencial en Petrer
              </p>
            </div>
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
              Educador e Integrador Social. Especializado en adolescencia y
              familia.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Amplia trayectoria con adolescentes y a sus familias en el hogar,
              en el instituto y en su entorno real. Mi trabajo no se basa en
              juzgar ni en imponer recetas rápidas, sino en una convicción
              sencilla: primero escuchar y comprender, para después construir
              soluciones sostenibles.
            </p>
          </StaggerItem>

          <StaggerItem>
            <blockquote className="mt-6 border-l-2 border-primary pl-4 py-1.5 italic text-foreground/90 font-display text-xl md:text-2xl">
              &ldquo;El cambio no ocurre de un día para otro. Pero puede empezar
              hoy por una conversación.&rdquo;
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
