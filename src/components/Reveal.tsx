import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  as?: "article" | "div" | "li" | "p" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}>;

export function Reveal({ as = "div", children, className = "", delay = 0, style }: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0.62, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
