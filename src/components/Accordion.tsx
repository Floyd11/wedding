import { useId, useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border-y border-warm-sand/70 bg-ivory/45 px-1">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-deep-brown transition hover:text-olive-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-gray focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-warm-sand text-xl leading-none transition"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div id={contentId} hidden={!isOpen} className="pb-6">
        {children}
      </div>
    </div>
  );
}
