import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  loading = "lazy",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        className={`h-[112%] w-full object-cover ${imageClassName}`}
        style={{ y }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-deep-brown/8" />
    </div>
  );
}
