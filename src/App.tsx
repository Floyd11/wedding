import { DressCodeSection } from "./components/DressCodeSection";
import { ExtraSections } from "./components/ExtraSections";
import { GiftSection } from "./components/GiftSection";
import { HeroSection } from "./components/HeroSection";
import { LocationSection } from "./components/LocationSection";
import { PersonalSection } from "./components/PersonalSection";
import { RsvpSection } from "./components/RsvpSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { ScrollProgress } from "./components/ScrollProgress";
import { getGuestBySlug, getSlugFromUrl } from "./lib/guest";

export function App() {
  const slug = getSlugFromUrl(window.location);
  const guest = getGuestBySlug(slug);

  return (
    <main className="min-h-screen overflow-hidden bg-ivory text-black">
      <ScrollProgress />
      <HeroSection />
      <PersonalSection guest={guest} />
      <ExtraSections sections={guest.extraSections ?? []} />
      <LocationSection />
      <RsvpSection key={slug ?? "general"} guest={guest} slug={slug} />
      <GiftSection />
      <DressCodeSection />
      <ScheduleSection />
    </main>
  );
}
