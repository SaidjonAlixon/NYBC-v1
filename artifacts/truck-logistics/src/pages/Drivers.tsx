import {
  DriversHero,
  DriverLife,
  BenefitsSection,
  EarningsSection,
  FleetShowcase,
  RequirementsSection,
  OnboardingTimeline,
  DriverTestimonials,
  DriverFaq,
  ApplicationForm,
  ApplicationCta
} from "@/sections/drivers";

export default function Drivers() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <DriversHero />
      <DriverLife />
      <BenefitsSection />
      <EarningsSection />
      <FleetShowcase />
      <RequirementsSection />
      <OnboardingTimeline />
      <DriverTestimonials />
      <DriverFaq />
      <ApplicationForm />
      <ApplicationCta />
    </main>
  );
}
