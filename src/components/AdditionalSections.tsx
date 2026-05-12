import type { AdditionalSection } from "../types";
import { AnimatedSection } from "./AnimatedSection";
import { Reveal } from "./Reveal";

type AdditionalSectionsProps = {
  sections: AdditionalSection[];
};

export function AdditionalSections({ sections }: AdditionalSectionsProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <AnimatedSection className="px-5 py-16">
      <div className="mx-auto max-w-4xl space-y-8 border-y border-warm-sand bg-white/25 px-5 py-10 shadow-[0_18px_60px_rgba(61,51,42,0.06)] sm:px-8">
        {sections.map((section) => (
          <Reveal as="article" key={section.title}>
            <h2 className="font-serif text-3xl text-black">{section.title}</h2>
            <p className="mt-4 text-lg leading-8 text-black/75">{section.body}</p>
          </Reveal>
        ))}
      </div>
    </AnimatedSection>
  );
}
