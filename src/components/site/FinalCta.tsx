import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  MotionReveal,
  MotionStagger,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { staggers } from "@/lib/motion-tokens";

export function FinalCta() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // El hilo conductor vivo cruza el horizonte nocturno y toca el botón principal
  const threadLength = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);

  return (
    <div ref={sectionRef} className="relative bg-background">
      {/* TRANSICIÓN CINEMÁTICA: El Horizonte Curvo Nocturno */}
      <div className="relative w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-28 text-ink preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C420,15 1020,15 1440,120 L1440,120 L0,120 Z"
            fill="#1E1C1A"
          />
        </svg>

        {/* Hilo conductor atravesando el centro del horizonte nocturno */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-full flex flex-col items-center">
          <svg
            width="12"
            height="100%"
            viewBox="0 0 12 120"
            fill="none"
            className="overflow-visible"
          >
            <motion.path
              d="M 6,0 L 6,120"
              stroke="#C05638"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: threadLength }}
              className="drop-shadow-[0_0_8px_rgba(192,86,56,0.8)]"
            />
          </svg>
        </div>
      </div>

      <section
        id="contacto"
        className="section-pad bg-ink text-ivory relative z-20 pt-8 sm:pt-12 md:pt-16"
      >
        <div className="shell max-w-3xl">
          <MotionStagger stagger={staggers.cta}>
            <StaggerItem>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="eyebrow text-ivory/70">
                  PRIMER PASO SIN COMPROMISO
                </p>
              </div>
              <h2 className="mt-2 text-[2.3rem] leading-[1.12] text-ivory sm:text-[3rem] md:text-[3.6rem]">
                Dar el primer paso también es cuidar de tu familia.
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
                Cuéntanos qué estáis viviendo en casa. Haremos una primera
                valoración para conocer vuestra situación en profundidad, con
                cercanía, sin prisas y sin ningún coste ni compromiso.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* Botón principal donde desemboca el hilo conductor */}
                {/* <div className="relative group">
                  <a
                    href="mailto:[Por definir]?subject=Primera%20valoración%20gratuita%20-%20RAÍCES"
                    className="relative z-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(192,86,56,0.6)]"
                  >
                    <span>Solicitar primera valoración gratuita</span>
                    <span className="transition-transform duration-280 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <span className="absolute -inset-1 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors pointer-events-none" />
                </div> */}

                <a
                  href="tel:+34645207373"
                  className="inline-flex items-center rounded-full border border-ivory/30 px-6 py-4 text-sm font-medium text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory/70 hover:bg-ivory/5"
                >
                  Llamar al 645 20 73 73
                </a>
                <a
                  href="https://wa.me/34645207373?text=Hola%20César,%20me%20gustaría%20solicitar%20una%20primera%20valoración%20gratuita%20para%20mi%20familia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm font-medium text-emerald-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500/20"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Escribir por WhatsApp</span>
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-ivory/15 pt-8 text-sm text-ivory/70">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>
                    Atención presencial en Av. Prevere Conrado Poveda 2, Petrer
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>100% Confidencial y sin compromiso</span>
                </div>
              </div>
            </StaggerItem>
          </MotionStagger>
        </div>
      </section>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-14 text-ivory md:px-12">
      <MotionReveal duration={0.7} y={0}>
        <div className="shell grid gap-8 border-t border-ivory/15 pt-12 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="RAÍCES · Intervención socioeducativa"
              width={48}
              height={40}
              className="h-10 w-12 rounded object-contain"
            />
            <div>
              <p className="font-display text-2xl tracking-tight">RAÍCES</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/60">
                Intervención Socioeducativa
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-ivory/50">
                <a href="/aviso-legal" className="hover:text-ivory transition-colors">
                  Aviso Legal
                </a>
                <span>·</span>
                <a href="/privacidad" className="hover:text-ivory transition-colors">
                  Privacidad
                </a>
                <span>·</span>
                <a href="/cookies" className="hover:text-ivory transition-colors">
                  Cookies
                </a>
              </div>
              <p className="mt-3 text-xs text-ivory/40">
                © {new Date().getFullYear()} RAÍCES. Todos los derechos
                reservados.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-start md:justify-end">
            <a
              href="https://pitass.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em] text-ivory/40 transition-colors duration-300 hover:text-ivory/70"
              aria-label="Diseñado y desarrollado por José Pita — pitass.com"
            >
              <span>Diseñado y desarrollado por</span>
              <img
                src="/creator-logo.webp"
                alt="José Pita"
                width={108}
                height={36}
                loading="lazy"
                decoding="async"
                className="w-auto opacity-60 transition-opacity duration-300 group-hover:opacity-100 h-[3rem]"
              />
            </a>
          </div>
        </div>
      </MotionReveal>
    </footer>
  );
}
