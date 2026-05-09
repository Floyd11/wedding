import { weddingContent } from "../content/content";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function LocationSection() {
  const { location } = weddingContent;

  return (
    <AnimatedSection className="relative bg-white/35 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={location.title} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ParallaxImage
            src="/images/location.svg"
            alt={location.locationImageAlt}
            className="aspect-[16/11] shadow-[0_28px_80px_rgba(61,51,42,0.10)]"
          />
          <div className="pb-2">
            <Reveal as="p" className="font-serif text-4xl leading-tight text-deep-brown">
              {location.city}
            </Reveal>
            <Reveal as="p" className="mt-6 text-xl leading-9 text-deep-brown/75" delay={0.1}>
              {location.description}
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-warm-sand pt-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal as="h3" className="font-serif text-4xl text-deep-brown">
            {location.travelTitle}
          </Reveal>
          <div>
            <Reveal as="p" className="text-lg leading-8 text-deep-brown/75">
              {location.travelIntro}
            </Reveal>
            <ul className="mt-8 space-y-4">
              {location.travelItems.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={index * 0.06}
                  className="border-l border-soft-rose pl-5 text-lg leading-8 text-deep-brown"
                >
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
