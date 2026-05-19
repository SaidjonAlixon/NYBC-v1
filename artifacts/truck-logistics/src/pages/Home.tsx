import {
  HeroSection,
  MarqueeSection,
  ServicesSection,
  StatsSection,
  HowWeWorkSection,
  IndustriesSection,
  RouteMapSection,
  FleetSection,
  DashboardSection,
  TestimonialsSection,
  NewsSection,
  CtaSection
} from "@/sections/home";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <StatsSection />
      <HowWeWorkSection />
      <IndustriesSection />
      <RouteMapSection />
      <FleetSection />
      <DashboardSection />
      <TestimonialsSection />
      <NewsSection />
      <CtaSection />
    </main>
  );
}
