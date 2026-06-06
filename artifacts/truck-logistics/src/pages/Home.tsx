import {
  HeroSection,
  ServicesSection,
  StatsSection,
  RouteMapSection,
  TestimonialsSection,
  NewsSection,
  CtaSection
} from "@/sections/home";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <HeroSection />
      <div className="h-8 bg-background md:h-12" aria-hidden />
      <ServicesSection />
      <StatsSection />
      <RouteMapSection />
      <TestimonialsSection />
      <NewsSection />
      <CtaSection />
    </main>
  );
}
