import { AdditionalSections } from "./components/AdditionalSections";
import { DressCodeSection } from "./components/DressCodeSection";
import { GiftSection } from "./components/GiftSection";
import { HeroSection } from "./components/HeroSection";
import { LocationSection } from "./components/LocationSection";
import { PersonalSection } from "./components/PersonalSection";
import { RsvpSection } from "./components/RsvpSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { ScrollProgress } from "./components/ScrollProgress";
import { getSlugFromLocation, resolveGuest } from "./lib/guest";

export function App() {
  const slug = getSlugFromLocation(window.location);
  const { guest } = resolveGuest(slug);

  return (
    <main className="min-h-screen overflow-hidden bg-ivory text-deep-brown">
      <ScrollProgress />
      <HeroSection />
      <PersonalSection guest={guest} />
      <AdditionalSections sections={guest.additionalSections ?? []} />
      <LocationSection />
      <RsvpSection key={slug ?? "general"} guest={guest} slug={slug} />
      <GiftSection />
      <DressCodeSection />
      <ScheduleSection />
    </main>
  );
}
