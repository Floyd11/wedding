import { weddingContent } from "../content/content";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function DressCodeSection() {
  const { dressCode } = weddingContent;

  return (
    <AnimatedSection className="relative bg-deep-brown px-5 py-20 text-ivory sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-ivory/20" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={dressCode.title} tone="dark" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal as="p" className="text-lg font-semibold text-ivory">
              {dressCode.weatherTitle}
            </Reveal>
            <ul className="mt-5 space-y-2 text-xl leading-8 text-ivory/80">
              {dressCode.weather.map((item, index) => (
                <Reveal as="li" key={item} delay={index * 0.05}>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="space-y-5 text-lg leading-8 text-ivory/78">
            {dressCode.body.map((paragraph, index) => (
              <Reveal as="p" key={paragraph} delay={index * 0.05}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ParallaxImage
            src="/images/dress-palette.svg"
            alt={dressCode.paletteAlt}
            className="aspect-[4/3]"
          />
          <ParallaxImage
            src="/images/dress-examples.svg"
            alt={dressCode.examplesAlt}
            className="aspect-[4/3]"
          />
        </div>
      </div>
      <div className="mt-20">
        <EditorialDivider tone="dark" />
      </div>
    </AnimatedSection>
  );
}
