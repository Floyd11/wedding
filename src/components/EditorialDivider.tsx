type EditorialDividerProps = {
  tone?: "light" | "dark";
};

export function EditorialDivider({ tone = "light" }: EditorialDividerProps) {
  const lineColor = tone === "dark" ? "bg-ivory/28" : "bg-warm-sand/75";
  const markColor = tone === "dark" ? "border-warm-sand/75" : "border-soft-rose/80";

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center gap-5 px-5" aria-hidden="true">
      <span className={`h-px flex-1 ${lineColor}`} />
      <span className={`h-2 w-2 rotate-45 border ${markColor}`} />
      <span className={`h-px flex-1 ${lineColor}`} />
    </div>
  );
}
