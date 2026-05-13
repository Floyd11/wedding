# Project Memory: Wedding Invitation Website

## Core Architecture
- **Framework**: React + Vite + TailwindCSS.
- **Styling Strategy**: Minimalist Luxury / Wedding Premium.
- **Key Libraries**: `framer-motion` for animations, `lucide-react` for icons.

## Design System (2026-05-12)

### Typography
- **Headings & Body**: `Cormorant Infant` (Serif).
- **Accents**: `Great Vibes` (Script) and `Playfair Display`.
- **Global Base Font Size**: `120%` (defined in `styles.css`).
- **Standard Paragraph Size**: `text-2xl font-serif leading-relaxed`.
- **Hero Title Size**: `text-5xl` to `text-6xl`.

### Color Palette
- **Background**: `ivory` (#F8F3EA) with subtle linear-gradient grid.
- **Accents**: `warm-sand` (#D8C7AE), `soft-rose` (#D8B9AA), `olive-gray` (#8A8B76).
- **Text**: Pure `#000000` for high legibility on light background.

### Visual Effects (Luxury Cinematic)
- **Depth**: Multi-layered `drop-shadow` filters applied to the ornate PNG frame (`IMG_2855.PNG`).
- **Separation**: `backdrop-filter: blur(2.5px)` with radial mask under floating cards.
- **Atmosphere**: Radial vignette on Hero and ambient warm glow halos.

## Component Specifics

### HeroSection
- Uses `motion.div` for floating effect.
- Features a centralized ornate card with dynamic scaling.
- Scroll button: `text-[0.65rem]` (40% smaller than default), absolute positioned at bottom.

### ScheduleSection
- Timeline items are vertically centered (`items-center`).
- Dates and descriptions share identical styling (`text-2xl font-serif`).

### PersonalSection
- Image: `IMG_2869.PNG` (Portrait 4:5 aspect).
- Layout: Tightened transition from Hero (removed top padding and vertical line).

### RsvpSection
- Styled radio options with larger inputs (`h-5 w-5`) and `text-2xl` labels.
- Backdrop blurred form container for depth.

## Implementation History (May 12, 2026)
- **Visual Polish**: Re-implemented HeroSection with advanced CSS depth (layered shadows).
- **Consistency**: Batch updated all sections (Personal, Location, Travel, RSVP) to use `text-2xl` for content text.
- **Navigation**: Optimized `smooth-scroll` and removed "transition gaps" between sections.
- **Assets**: Integrated custom PNG assets (`IMG_2855.PNG`, `IMG_2869.PNG`) with proper transparency handling.
