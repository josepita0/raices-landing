import {
  motion,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useRef, useEffect } from "react";
import { transition, durations } from "@/lib/motion-tokens";

const easeFocus: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Textos Hero
const headlineLine1 = ["Cuando", "tu", "hijo", "cambia,"];
const headlineLine2 = ["necesitas", "entender", "qué", "está", "pasando."];
const subheadlineWords =
  "Acompañamiento socioeducativo para adolescentes y familias, desde una mirada cercana, profesional y global.".split(
    " ",
  );

// Textos DarkScene (Segunda Escena)
const headlineText =
  "A veces, lo que vemos en un adolescente es solo una parte de lo que está viviendo.";
const supportingText =
  "En RAÍCES miramos más allá de la conducta para comprender su entorno, sus emociones y sus relaciones.";

// Palabra con desenfoque progresivo optimizada para GPU
function ScrollBlurWord({
  word,
  progress,
  range,
  startBlur = 8,
  startOpacity = 0,
  yOffset = 6,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  startBlur?: number;
  startOpacity?: number;
  yOffset?: number;
}) {
  const [start, end] = range;
  const opacity = useTransform(progress, [start, end], [startOpacity, 1]);
  const blurVal = useTransform(progress, [start, end], [startBlur, 0]);
  const y = useTransform(progress, [start, end], [yOffset, 0]);

  // Cuando el desenfoque es <= 0.2px, conmutamos a "none" para liberar el fragment shader
  const filter = useTransform(blurVal, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="inline-block mr-[0.28em] will-change-[opacity,transform] select-none"
    >
      {word}
    </motion.span>
  );
}

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useMotionValue(0);

  // Control de scroll sin layout thrashing
  useEffect(() => {
    let rafId = 0;
    let cachedTop = 0;
    let cachedTotal = 1;

    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      let top = 0;
      let curr: HTMLElement | null = el;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      cachedTop = top;
      cachedTotal = el.offsetHeight - window.innerHeight;
      if (cachedTotal <= 0) cachedTotal = 1;
    };

    const update = () => {
      const current = window.scrollY - cachedTop;
      const fraction = current / cachedTotal;
      const clamped = Math.max(0, Math.min(1, fraction));
      progress.set(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        measure();
        update();
      },
      { passive: true },
    );

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [progress]);

  // Pausar el vídeo en segundo plano cuando la escena marfil ya lo cubre al 100%
  useMotionValueEvent(progress, "change", (latest) => {
    const video = videoRef.current;
    if (!video) return;
    if (latest > 0.32 && !video.paused) {
      video.pause();
    } else if (latest <= 0.32 && video.paused) {
      video.play().catch(() => {});
    }
  });

  // ==========================================
  // TIMELINE 1: FASE HERO (0.00 -> 0.24)
  // ==========================================
  // Al hacer scroll, el contenido del Hero se desvanece suavemente hacia arriba
  const heroContentOpacity = useTransform(progress, [0.08, 0.22], [1, 0]);
  const heroContentY = useTransform(progress, [0.08, 0.22], [0, -32]);
  const heroVideoScale = useTransform(progress, [0, 0.28], [1, 1.05]);

  // ==========================================
  // TIMELINE 2: TRANSICIÓN DISOLVE (0.14 -> 0.30)
  // ==========================================
  // El velo marfil (DarkScene) se funde gradualmente sobre el vídeo sin corte brusco
  const ivoryOverlayOpacity = useTransform(progress, [0.14, 0.28], [0, 1]);
  const bgPosterOpacity = useTransform(progress, [0.14, 0.3], [0, 0.15]);

  // Sombras y formas botánicas orgánicas
  const leftDecoX = useTransform(progress, [0.22, 0.36], [-20, 0]);
  const leftDecoOpacity = useTransform(progress, [0.22, 0.36], [0, 0.35]);

  const rightDecoX = useTransform(progress, [0.24, 0.38], [20, 0]);
  const rightDecoOpacity = useTransform(progress, [0.24, 0.38], [0, 0.25]);

  // Label [ UNA MIRADA DIFERENTE ]
  const labelOpacity = useTransform(progress, [0.25, 0.34], [0, 1]);
  const labelScale = useTransform(progress, [0.25, 0.34], [0.96, 1]);
  const labelY = useTransform(progress, [0.25, 0.34], [8, 0]);

  // ==========================================
  // TIMELINE 3: REVELACIÓN TIPOGRÁFICA (0.32 -> 0.80)
  // ==========================================
  const headlineWords = headlineText.split(" ");
  const headlineStart = 0.32;
  const headlineEnd = 0.58;
  const headlineStep = (headlineEnd - headlineStart) / headlineWords.length;

  const supportingWords = supportingText.split(" ");
  const supportingStart = 0.58;
  const supportingEnd = 0.74;
  const supportingStep =
    (supportingEnd - supportingStart) / supportingWords.length;

  // Cierre de principios
  const closingOpacity = useTransform(progress, [0.74, 0.82], [0, 1]);
  const closingBlur = useTransform(progress, [0.74, 0.82], [6, 0]);
  const closingFilter = useTransform(closingBlur, (v) =>
    v <= 0.2 ? "none" : `blur(${v.toFixed(1)}px)`,
  );
  const closingY = useTransform(progress, [0.74, 0.82], [8, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[320vh] md:h-[360vh] bg-ink"
    >
      {/* Contenedor Sticky que mantiene la experiencia cinematográfica en el viewport */}
      <div className="sticky top-0 flex min-h-[100svh] h-screen w-full flex-col justify-center sm:justify-end overflow-hidden bg-ink">
        {/* ---------------------------------------------------------------- */}
        {/* CAPA 1: VÍDEO HERO CON ENTRADA CINEMATOGRÁFICA                   */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroVideoScale }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition(durations.hero)}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-[center_30%]"
            poster="/images/hero-poster.webp"
            src="/video/hero-loop.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label="Vídeo de fondo mostrando un entorno familiar y natural"
          >
            <source src="/video/hero-loop.webm" type="video/webm" />
          </video>
          {/* Overlay orgánico y sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* CAPA 2: CONTENIDO HERO (Desvanece orgánicamente hacia arriba)     */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 shell px-6 pb-0 sm:pb-16 md:px-12 md:pb-24 pointer-events-auto"
        >
          <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
            {/* Label / Eyebrow Hero centrado en mobile */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, ease: easeFocus, delay: 0.3 }}
              className="flex justify-center sm:justify-start mb-3 sm:mb-4"
            >
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ink/40 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[0.6875rem] font-medium tracking-[0.24em] uppercase text-ivory/80">
                  INTERVENCIÓN SOCIOEDUCATIVA
                </span>
              </div> */}
            </motion.div>

            {/* Headline con aparición progresiva al cargar la página */}
            <h1 className="text-[2.1rem] leading-[1.12] text-ivory sm:text-[3.2rem] md:text-[4.2rem] lg:text-[4.6rem] tracking-tight">
              <span className="inline-block">
                {headlineLine1.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, filter: "blur(14px)", y: 12 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 1.1,
                      ease: easeFocus,
                      delay: 0.55 + i * 0.075,
                    }}
                    className="inline-block mr-[0.26em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>{" "}
              <br className="hidden md:block" />
              <span className="inline-block">
                {headlineLine2.map((w, i) => {
                  const globalIndex = headlineLine1.length + i;
                  return (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, filter: "blur(14px)", y: 12 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{
                        duration: 1.1,
                        ease: easeFocus,
                        delay: 0.55 + globalIndex * 0.075,
                      }}
                      className="inline-block mr-[0.26em]"
                    >
                      {w}
                    </motion.span>
                  );
                })}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 max-w-xl mx-auto sm:mx-0 text-sm sm:text-base leading-relaxed text-ivory/85 md:text-lg">
              {subheadlineWords.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(9px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.85,
                    ease: easeFocus,
                    delay: 1.25 + i * 0.038,
                  }}
                  className="inline-block mr-[0.26em]"
                >
                  {w}
                </motion.span>
              ))}
            </p>

            {/* Botón CTA Mobile (centrado) */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                ease: easeEditorial,
                delay: 1.85,
              }}
              className="mt-6 flex justify-center sm:hidden"
            >
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-medium text-primary-foreground shadow-sm transition-all"
              >
                <span>Primera valoración gratuita</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div> */}

            {/* Botones de acción CTA en desktop */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(6px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.85,
                ease: easeEditorial,
                delay: 1.95,
              }}
              className="mt-9 hidden sm:flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span>Primera valoración</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#proceso"
                className="inline-flex items-center justify-center rounded-full border border-ivory/40 bg-ink/15 px-7 py-3.5 text-sm text-ivory backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory/80 hover:bg-ink/30"
              >
                Conoce cómo trabajamos
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* CAPA 3: SEGUNDA ESCENA / DARKSCENE (Fusión disolve sobre el Hero) */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: ivoryOverlayOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-ivory px-6 py-12 selection:bg-primary/20 pointer-events-none"
        >
          {/* Fotografía ambiental desenfocada del Hero en el fondo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              style={{ opacity: bgPosterOpacity }}
              className="absolute inset-0"
            >
              <img
                src="/images/hero-poster.webp"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover blur-[22px] saturate-[0.85]"
              />
            </motion.div>
            {/* Velo ivory radial suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/90 to-ivory" />
          </div>

          {/* Sombras botánicas orgánicas */}
          <motion.div
            style={{ x: leftDecoX, opacity: leftDecoOpacity }}
            className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 text-moss/25 md:left-4 lg:left-12"
          >
            <svg
              width="280"
              height="420"
              viewBox="0 0 280 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-72 w-auto md:h-96 lg:h-[440px]"
              aria-hidden="true"
            >
              <path
                d="M10 210C35 150 90 95 160 80C140 120 125 170 100 210C65 260 20 310 -10 350C-5 290 0 240 10 210Z"
                fill="currentColor"
              />
              <path
                d="M40 170C80 120 145 80 220 70C190 115 160 165 125 210C85 260 40 300 10 330C15 270 25 220 40 170Z"
                fill="currentColor"
                fillOpacity="0.6"
              />
              <path
                d="M25 250C60 220 110 200 170 205C140 235 110 270 75 305C45 335 15 365 -5 390C5 340 15 290 25 250Z"
                fill="currentColor"
                fillOpacity="0.4"
              />
            </svg>
          </motion.div>

          <motion.div
            style={{ x: rightDecoX, opacity: rightDecoOpacity }}
            className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 text-clay/20 md:right-4 lg:right-12"
          >
            <svg
              width="280"
              height="420"
              viewBox="0 0 280 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-72 w-auto md:h-96 lg:h-[440px]"
              aria-hidden="true"
            >
              <path
                d="M270 210C245 150 190 95 120 80C140 120 155 170 180 210C215 260 260 310 290 350C285 290 280 240 270 210Z"
                fill="currentColor"
              />
              <path
                d="M240 170C200 120 135 80 60 70C90 115 120 165 155 210C195 260 240 300 270 330C265 270 255 220 240 170Z"
                fill="currentColor"
                fillOpacity="0.6"
              />
              <path
                d="M255 250C220 220 170 200 110 205C140 235 170 270 205 305C235 335 265 365 285 390C275 340 265 290 255 250Z"
                fill="currentColor"
                fillOpacity="0.4"
              />
            </svg>
          </motion.div>

          {/* Contenido Central: Revelación progresiva palabra a palabra sedosa */}
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center px-4">
            {/* Label ancla [ UNA MIRADA DIFERENTE ] */}
            <motion.div
              style={{ opacity: labelOpacity, scale: labelScale, y: labelY }}
              className="inline-flex items-center gap-2 rounded-full border border-border/85 bg-card/90 px-4 py-1.5 shadow-xs backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[0.6875rem] font-medium tracking-[0.24em] uppercase text-foreground/75">
                UNA MIRADA DIFERENTE
              </span>
            </motion.div>

            {/* Headline: Palabra a palabra enfocado progresivamente */}
            <h2 className="mt-6 sm:mt-8 font-display text-[1.85rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[4.6rem] leading-[1.12] text-foreground tracking-tight max-w-4xl">
              {headlineWords.map((w, i) => {
                const start = headlineStart + i * headlineStep * 0.85;
                const end = start + headlineStep * 1.35;
                return (
                  <ScrollBlurWord
                    key={i}
                    word={w}
                    progress={progress}
                    range={[start, end]}
                    startBlur={8}
                    startOpacity={0}
                    yOffset={8}
                  />
                );
              })}
            </h2>

            {/* Supporting text: Palabra a palabra */}
            <p className="mt-4 sm:mt-7 max-w-2xl text-sm sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
              {supportingWords.map((w, i) => {
                const start = supportingStart + i * supportingStep * 0.85;
                const end = start + supportingStep * 1.35;
                return (
                  <ScrollBlurWord
                    key={i}
                    word={w}
                    progress={progress}
                    range={[start, end]}
                    startBlur={6}
                    startOpacity={0}
                    yOffset={6}
                  />
                );
              })}
            </p>

            {/* Cierre de principios que culmina nítido y se mantiene cargado */}
            <motion.div
              style={{
                opacity: closingOpacity,
                filter: closingFilter,
                y: closingY,
              }}
              className="mt-6 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-t border-border/70 pt-4 sm:pt-8 text-[11px] sm:text-sm font-medium tracking-wide text-foreground/80 uppercase"
            >
              <span className="text-foreground/70">No juzgar</span>
              <span className="text-primary/60">•</span>
              <span className="text-foreground/70">Comprender el contexto</span>
              <span className="text-primary/60">•</span>
              <span className="text-primary font-semibold">
                Acompañar el cambio
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const FocusReveal = HeroVideo;
