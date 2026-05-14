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
    <AnimatedSection id="personal" className="relative px-5 pb-12 pt-0 sm:pb-16 sm:pt-0">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal as="h2" className="font-script leading-[1.1] text-black" style={{ fontSize: "clamp(3.2rem, 11vw, 5.8rem)" }}>
            {guest.greeting}
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-xl font-serif text-2xl leading-relaxed text-black" delay={0.1}>
            {personal.body}
          </Reveal>
        </div>
        <figure className="relative">
          <ParallaxImage
            src="/images/IMG_2869.webp"
            alt={personal.imageAlt}
            showRing={false}
            className="w-full h-auto"
          />
        </figure>
      </div>
      <div className="mt-12">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
