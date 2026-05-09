import { weddingContent } from "../content/content";
import { Accordion } from "./Accordion";
import { AnimatedSection } from "./AnimatedSection";
import { EditorialDivider } from "./EditorialDivider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function GiftSection() {
  const { gifts } = weddingContent;

  return (
    <AnimatedSection className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading title={gifts.title} />
        <Reveal as="p" className="mt-8 text-xl leading-9 text-deep-brown/75">
          {gifts.body}
        </Reveal>
        <div className="mt-12 text-left shadow-[0_22px_70px_rgba(61,51,42,0.07)]">
          <Accordion title={gifts.accordionTitle}>
            <div className="flex justify-center">
              <img
                src="/images/qr-gift.png"
                alt={gifts.qrAlt}
                className="h-52 w-52 border border-warm-sand bg-white p-4 shadow-[0_18px_45px_rgba(61,51,42,0.10)]"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = "/images/qr-gift.svg";
                }}
              />
            </div>
          </Accordion>
        </div>
      </div>
      <div className="mt-20">
        <EditorialDivider />
      </div>
    </AnimatedSection>
  );
}
