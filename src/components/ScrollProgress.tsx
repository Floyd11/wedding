import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 h-px bg-warm-sand/45 md:hidden"
        aria-hidden="true"
      >
        <motion.div className="h-full origin-left bg-deep-brown" style={{ scaleX: scale }} />
      </div>
      <div
        className="fixed right-6 top-1/2 z-50 hidden h-40 w-px -translate-y-1/2 bg-warm-sand/55 md:block"
        aria-hidden="true"
      >
        <motion.div className="w-px origin-top bg-deep-brown" style={{ scaleY: scale, height: "100%" }} />
      </div>
    </>
  );
}
