import { weddingContent } from "../content/content";
import { AnimatedSection } from "./AnimatedSection";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ScheduleSection() {
  const { schedule } = weddingContent;

  return (
    <AnimatedSection className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={schedule.title} />
        <ol className="relative mt-14 border-l border-warm-sand pl-7 sm:ml-20 sm:pl-10">
          {schedule.items.map((item, index) => (
            <Reveal
              as="li"
              key={`${item.time}-${item.text}`}
              delay={index * 0.035}
              className="relative pb-8 last:pb-0"
            >
              <span
                className="absolute -left-[2.08rem] top-2 h-4 w-4 rounded-full border border-soft-rose bg-ivory sm:-left-[3.05rem]"
                aria-hidden="true"
              />
              <div className="grid gap-2 border-b border-warm-sand/55 pb-6 sm:grid-cols-[10rem_1fr] items-center">
                <time className="font-serif text-2xl text-black text-volume-serif">{item.time}</time>
                {item.text ? (
                   <span className="font-serif text-2xl leading-relaxed text-black text-volume-serif">{item.text}</span>
                ) : (
                   <span className="font-serif text-2xl leading-relaxed text-olive-gray text-volume-serif">день свадьбы</span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
