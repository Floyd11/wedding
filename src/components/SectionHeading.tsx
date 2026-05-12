type SectionHeadingProps = {
  kicker?: string;
  title: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ kicker, title, align = "center", tone = "light" }: SectionHeadingProps) {
  const titleColor = tone === "dark" ? "text-ivory" : "text-black";
  const kickerColor = tone === "dark" ? "text-warm-sand" : "text-olive-gray";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker ? (
        <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.28em] ${kickerColor}`}>
          {kicker}
        </p>
      ) : null}
      <h2 className={`font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl ${titleColor}`}>
        {title}
      </h2>
      <span
        className={`mt-6 inline-block h-px w-20 ${tone === "dark" ? "bg-warm-sand/70" : "bg-soft-rose/80"}`}
        aria-hidden="true"
      />
    </div>
  );
}
