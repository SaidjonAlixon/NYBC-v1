import {
  ContactHero,
  ContactOptions,
  OfficeLocations,
  ContactMap,
  ContactForm,
  BusinessHours,
  ResponseTimeline,
  ContactFaq,
  ContactCta
} from "@/sections/contact";

export default function Contact() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      <ContactHero />
      <ContactOptions />
      <OfficeLocations />
      <ContactMap />
      <ContactForm />
      <BusinessHours />
      <ResponseTimeline />
      <ContactFaq />
      <ContactCta />
    </main>
  );
}
