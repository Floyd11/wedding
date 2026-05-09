import { motion } from "framer-motion";
import { weddingContent } from "../content/content";

export function HeroSection() {
  const { hero } = weddingContent;
  const [firstName, secondName = ""] = hero.couple.split(" и ");

  function scrollToInvitation() {
    document.getElementById("personal")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="relative isolate min-h-[96svh] overflow-hidden bg-ivory px-5 py-7 text-deep-brown">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-warm-sand/30 to-transparent" />
      <div className="absolute left-5 top-24 hidden h-44 w-px bg-warm-sand/70 sm:block" aria-hidden="true" />
      <div className="absolute right-5 top-24 hidden h-44 w-px bg-warm-sand/70 sm:block" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-28 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-warm-sand/45"
        aria-hidden="true"
      />
      <div className="mx-auto flex min-h-[calc(96svh-3.5rem)] max-w-6xl flex-col justify-between">
        <nav className="relative z-10 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.2em] text-olive-gray sm:text-[0.68rem] sm:tracking-[0.28em]">
          <span>Wedding invitation</span>
          <span>Da Lat</span>
        </nav>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-5xl py-20 text-center sm:py-24"
          initial={{ opacity: 0.72, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-sm:-translate-x-14">
            <motion.p
              className="mx-auto mb-8 max-w-[16rem] text-[0.52rem] uppercase tracking-[0.03em] text-olive-gray sm:max-w-none sm:text-sm sm:tracking-[0.34em]"
              initial={{ opacity: 0.62, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {hero.invitation}
            </motion.p>
            <motion.h1
              className="mx-auto max-w-[16rem] font-serif text-4xl leading-[0.96] text-deep-brown sm:max-w-none sm:text-8xl md:text-9xl lg:text-[9.5rem]"
              initial={{ opacity: 0.68, letterSpacing: "0.02em" }}
              animate={{ opacity: 1, letterSpacing: "0em" }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block">{firstName}</span>
              <span className="block">{secondName ? `и ${secondName}` : ""}</span>
            </motion.h1>
            <motion.div
              className="mx-auto mt-10 flex max-w-xs flex-col items-center gap-4 border-y border-warm-sand/80 py-6 text-lg text-deep-brown/80"
              initial={{ opacity: 0.66, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              <span>{hero.dateIntro}</span>
              <span className="font-serif text-5xl text-deep-brown sm:text-6xl">{hero.date}</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative z-10 grid w-full gap-5 border-t border-warm-sand/70 pt-5 text-sm text-deep-brown/70 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <span>24 августа 2026</span>
          <button
            type="button"
            className="group inline-flex items-center justify-center gap-3 justify-self-start rounded-full border border-warm-sand bg-ivory/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-deep-brown transition hover:border-olive-gray hover:text-olive-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-gray focus-visible:ring-offset-4 focus-visible:ring-offset-ivory sm:justify-self-center"
            onClick={scrollToInvitation}
          >
            Листать дальше
            <span
              aria-hidden="true"
              className="translate-y-0 text-base leading-none transition group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </button>
          <span className="sm:text-right">Вьетнам, Далат</span>
        </div>
      </div>
    </header>
  );
}
