import { motion } from "framer-motion";
import { weddingContent } from "../content/content";

// Production-ready layered shadow filter for the ornate frame PNG
const FRAME_FILTER = [
  "brightness(1.06)",                                   // slight paper brightness lift
  "drop-shadow(0 1px 2px rgba(30,20,10,0.08))",        // contact shadow
  "drop-shadow(0 4px 10px rgba(30,20,10,0.14))",       // near shadow
  "drop-shadow(0 16px 36px rgba(20,14,6,0.20))",       // mid depth
  "drop-shadow(0 40px 80px rgba(10,6,2,0.14))",        // far atmospheric
].join(" ");

const CARD_SIZE = "min(88vw, 85vh, 930px)";

export function HeroSection() {
  const { hero } = weddingContent;
  const [firstName, secondName = ""] = hero.couple.split(" и ");

  function scrollToInvitation() {
    document.getElementById("personal")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-0">

      {/* ── Layer 0: Background photo ── */}
      <div className="absolute inset-0">
        <img
          src="/images/IMG_2833.JPG"
          alt=""
          className="h-full w-full object-cover object-center"
          // Subtle desaturation makes the card pop as the focal point
          style={{ filter: "saturate(0.88) brightness(0.92)" }}
        />
      </div>

      {/* ── Layer 1: Atmospheric background darkening ──
          Vignette that focuses attention on the card center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.32) 100%)",
        }}
      />

      {/* ── Layer 2: Backdrop-blur soft separation zone ──
          Creates the "card floats above" depth separation */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: CARD_SIZE,
          aspectRatio: "1",
          backdropFilter: "blur(2.5px)",
          WebkitBackdropFilter: "blur(2.5px)",
          // Soft-edged mask so blur fades at the ornate frame edges
          maskImage:
            "radial-gradient(ellipse 72% 72% at 50% 50%, black 45%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 72% at 50% 50%, black 45%, transparent 75%)",
        }}
      />

      {/* ── Layer 3: Ambient warm glow halo ──
          Luxury atmospheric separation — warm light around the card */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: `calc(${CARD_SIZE} * 1.15)`,
          aspectRatio: "1",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,248,228,0.18) 0%, rgba(255,244,210,0.07) 45%, transparent 70%)",
        }}
      />

      {/* ── Layer 4: Floating card ── */}
      <motion.div
        className="relative"
        style={{
          width: CARD_SIZE,
          aspectRatio: "1",
          // Static floating lift — card appears above the background plane
          translateY: "-6px",
        }}
        initial={{ opacity: 0, scale: 0.97, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: -6 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Свадебное приглашение"
      >
        {/* PNG ornate frame — layered cinematic shadows */}
        <img
          src="/images/IMG_2855.PNG"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
          style={{ filter: FRAME_FILTER }}
        />

        {/* Text content — inside the frame's central body area */}
        <div
          className="absolute z-20 flex flex-col items-center justify-evenly text-center"
          style={{ inset: "18%" }}
        >
          {/* ПРИГЛАШАЕМ НА СВАДЬБУ */}
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.30em] text-black/80 sm:text-[1rem]">
            {hero.invitation.split(" на ")[0]}
            <br />
            на&nbsp;{hero.invitation.split(" на ")[1]}
          </p>

          {/* Names */}
          <div className="relative flex w-full flex-col items-center">
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-script leading-none text-soft-rose/40"
              style={{ fontSize: "clamp(5rem, 20vw, 9rem)" }}
              aria-hidden="true"
            >
              и
            </span>
            <p
              className="relative font-script leading-[1.05] text-black"
              style={{ fontSize: "clamp(3.2rem, 12vw, 5.8rem)" }}
            >
              {firstName}
            </p>
            <p
              className="relative font-script leading-[1.05] text-black"
              style={{ fontSize: "clamp(3.2rem, 12vw, 5.8rem)" }}
            >
              {secondName}
            </p>
          </div>

          {/* которая состоится */}
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.26em] text-black/80 sm:text-[1rem]">
            {hero.dateIntro}
          </p>

          {/* Date */}
          <p
            className="font-serif font-light leading-none text-black"
            style={{ fontSize: "clamp(1.6rem, 6vw, 2.4rem)" }}
          >
            24.08.2026
          </p>
        </div>
      </motion.div>

      {/* Scroll button */}
      <motion.div
        className="absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <button
          type="button"
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/15 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={scrollToInvitation}
        >
          Листать дальше
          <span aria-hidden="true" className="transition group-hover:translate-y-0.5">↓</span>
        </button>
      </motion.div>
    </header>
  );
}
