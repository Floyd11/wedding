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
    <AnimatedSection id="personal" className="relative px-5 py-20 sm:py-28">
      <div className="absolute left-1/2 top-0 hidden h-20 w-px bg-warm-sand/75 sm:block" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-olive-gray">
            {personal.titlePrefix}
          </Reveal>
          <Reveal as="h2" className="font-serif text-5xl leading-tight text-deep-brown sm:text-6xl">
            {guest.greeting}
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-xl text-xl leading-9 text-deep-brown/75" delay={0.1}>
            {personal.body}
          </Reveal>
        </div>
        <figure className="relative pl-5 pt-5">
          <div className="absolute left-0 top-0 h-[82%] w-[82%] border border-warm-sand" aria-hidden="true" />
          <div className="absolute -bottom-5 right-5 h-24 w-px bg-soft-rose" aria-hidden="true" />
          <ParallaxImage
            src="/images/couple.svg"
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
