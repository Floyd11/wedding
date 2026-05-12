import type { GuestConfig } from "../types";
import { AnimatedSection } from "./AnimatedSection";
import { weddingContent } from "../content/content";
import { EditorialDivider } from "./EditorialDivider";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";

type PersonalSectionProps = {
  guest: GuestConfig;
};

export function PersonalSection({ guest }: PersonalSectionProps) {
  const { personal } = weddingContent;

  return (
    <AnimatedSection id="personal" className="relative px-5 pb-20 pt-0 sm:pb-28 sm:pt-0">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal as="h2" className="font-serif text-5xl leading-tight text-black sm:text-6xl">
            {guest.greeting}
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-xl font-serif text-2xl leading-relaxed text-black" delay={0.1}>
            {personal.body}
          </Reveal>
        </div>
        <figure className="relative pl-5 pt-5">
          <div className="absolute left-0 top-0 h-[82%] w-[82%] border border-warm-sand" aria-hidden="true" />
          <div className="absolute -bottom-5 right-5 h-24 w-px bg-soft-rose" aria-hidden="true" />
          <ParallaxImage
            src="/images/IMG_2869.PNG"
            alt={personal.imageAlt}
            className="aspect-[4/5] shadow-[0_28px_90px_rgba(61,51,42,0.13)]"
          />
        </figure>
      </div>
      <div className="mt-20">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
