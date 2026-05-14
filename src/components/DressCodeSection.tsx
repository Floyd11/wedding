import { weddingContent } from "../content/content";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function DressCodeSection() {
  const { dressCode } = weddingContent;

  return (
    <AnimatedSection className="relative bg-soft-rose/16 px-5 py-8 sm:pt-12 sm:pb-16">
      <div className="absolute left-0 top-0 hidden h-full w-px bg-warm-sand/55 sm:block" aria-hidden="true" />
      <div className="absolute right-0 top-0 hidden h-full w-px bg-warm-sand/55 sm:block" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={dressCode.title} tone="light" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:items-stretch">
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <div>
              <Reveal as="p" className="font-serif text-2xl italic text-black">
                {dressCode.weatherTitle}
              </Reveal>
              <ul className="mt-2 flex flex-wrap gap-x-4 font-serif text-2xl italic text-black/80">
                {dressCode.weather.map((item, index) => (
                  <Reveal as="li" key={index} delay={index * 0.05} className="whitespace-nowrap">
                    {item}
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="space-y-4 font-serif text-2xl leading-relaxed text-black/75">
              {dressCode.body.map((paragraph, index) => (
                <Reveal as="p" key={index} delay={index * 0.05}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Palette Image */}
          <Reveal className="flex h-full items-center justify-center">
            <img
              src="/images/IMG_2873.webp"
              alt={dressCode.paletteAlt}
              className="h-auto w-full max-w-[450px] lg:max-w-none lg:scale-110 lg:origin-center"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
      <div className="mt-12">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
