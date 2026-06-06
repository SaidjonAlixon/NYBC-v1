import {
  DriversHero,
  BenefitsSection,
  FleetShowcase,
  RequirementsSection,
  DriverTestimonials,
  DriverFaq,
  ApplicationCta
} from "@/sections/drivers";

export default function Drivers() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <DriversHero />
      <BenefitsSection />
      <FleetShowcase />
      <RequirementsSection />
      <DriverTestimonials />
      <DriverFaq />
      <ApplicationCta />
    </main>
  );
}
