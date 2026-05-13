type EditorialDividerProps = {
  tone?: "light" | "dark";
};

/**
 * French Colonial ornamental divider using the provided SVG asset.
 * The SVG is black by default; we recolor it to warm bronze via CSS filter.
 *
 * Filter math: black (#000) → warm bronze (#C4956A)
 * Generated with: https://codepen.io/sosuke/pen/Pjoqqp
 * Target color #C4956A → hue-rotate + saturate + brightness combination.
 */
export function EditorialDivider({ tone = "light" }: EditorialDividerProps) {
  // Light sections: warm bronze (#C4956A)
  // Dark sections: soft cream (#E8D9C0) so ornament stays visible
  const filter =
    tone === "dark"
      ? // approximate #E8D9C0 from black
      "invert(93%) sepia(12%) saturate(400%) hue-rotate(340deg) brightness(102%) contrast(88%)"
      : // approximate #C4956A from black
      "invert(66%) sepia(28%) saturate(500%) hue-rotate(340deg) brightness(88%) contrast(92%)";

  return (
    <div
      className="w-full flex items-center justify-center py-4 overflow-hidden px-8 md:px-16"
      aria-hidden="true"
    >
      <div className="flex items-center w-full max-w-[2000px]">
        {/* Left Gold Line */}
        <div 
          className="flex-1 h-[1.5px] opacity-80" 
          style={{ 
            backgroundColor: "#B8860B", // Classic metallic gold/bronze
            boxShadow: "0 0 2px rgba(184, 134, 11, 0.2)"
          }} 
        />
        
        {/* Central Shishka Ornament */}
        <div className="relative px-6 flex items-center justify-center">
          <img
            src="/images/shishka.PNG"
            alt=""
            role="presentation"
            className="h-20 md:h-28 w-auto select-none pointer-events-none drop-shadow-sm"
            style={{
              display: "block",
              mixBlendMode: "multiply",
              filter: "contrast(1.1) brightness(1.05)",
            }}
            loading="lazy"
          />
        </div>

        {/* Right Gold Line */}
        <div 
          className="flex-1 h-[1.5px] opacity-80" 
          style={{ 
            backgroundColor: "#B8860B",
            boxShadow: "0 0 2px rgba(184, 134, 11, 0.2)"
          }} 
        />
      </div>
    </div>
  );
}
