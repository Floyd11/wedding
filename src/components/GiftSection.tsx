import { weddingContent } from "../content/content";
import { Accordion } from "./Accordion";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GiftSection() {
  const { gifts } = weddingContent;

  return (
    <AnimatedSection className="relative px-5 py-8 lg:pt-12 lg:pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading title={gifts.title} />
        <Reveal as="p" className="mt-8 font-serif text-2xl leading-relaxed text-black/75">
          {gifts.body}
        </Reveal>
        <div className="mt-12 text-left shadow-[0_22px_70px_rgba(61,51,42,0.07)]">
          <Accordion title={gifts.accordionTitle}>
            <div className="flex flex-col items-center justify-center gap-12 py-4 sm:flex-row sm:items-start sm:gap-16">
              {gifts.qrCodes.map((qr, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={qr.src}
                      alt={qr.alt}
                      className="h-52 w-52 border border-warm-sand bg-white p-3 shadow-[0_18px_45px_rgba(61,51,42,0.10)] transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {qr.label && (
                    <p className="mt-4 font-serif text-sm tracking-wider text-black/60 uppercase">
                      {qr.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
      <div className="mt-12">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
