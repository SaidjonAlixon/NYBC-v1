import {
  AboutHero,
  CompanyStory,
  JourneyTimeline,
  CeoMessage,
  MissionVision,
  CoreValues,
  TechnologySection,
  SafetySection,
  CompanyStats,
  LeadershipSection,
  ValuesBanner
} from "@/sections/about";

export default function About() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <AboutHero />
      <CompanyStory />
      <JourneyTimeline />
      <CeoMessage />
      <MissionVision />
      <CoreValues />
      <TechnologySection />
      <SafetySection />
      <CompanyStats />
      <LeadershipSection />
      <ValuesBanner />
    </main>
  );
}
