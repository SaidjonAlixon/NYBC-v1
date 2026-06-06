import {
  AboutHero,
  CompanyStory,
  MissionVision,
  CoreValues,
  TechnologySection,
  SafetySection,
  ValuesBanner
} from "@/sections/about";

export default function About() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <CoreValues />
      <TechnologySection />
      <SafetySection />
      <ValuesBanner />
    </main>
  );
}
