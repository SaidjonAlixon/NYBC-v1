import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const ContactHero = () => (
  <section className="pt-40 pb-20 md:pt-56 md:pb-32 bg-background border-b border-border">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
        <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.85] font-bold tracking-tighter uppercase text-foreground">
          LET'S MOVE FORWARD <br/><span className="text-primary text-outline">TOGETHER</span>
        </h1>
        <p className="mt-12 text-xl md:text-3xl text-muted-foreground font-medium max-w-2xl leading-tight">
          Ready to optimize your supply chain? Our logistics experts are standing by.
        </p>
      </motion.div>
    </div>
  </section>
);

const CONTACT_PHONE = "+18166088636";
const CONTACT_PHONE_DISPLAY = "+1 (816) 608-8636";

export const ContactOptions = () => {
  const options = [
    { d: "Sales & Quotes", e: "sales@amtruck.com", p: CONTACT_PHONE_DISPLAY },
    { d: "Dispatch Center", e: "dispatch@amtruck.com", p: CONTACT_PHONE_DISPLAY },
    { d: "Driver Recruitment", e: "drivers@amtruck.com", p: CONTACT_PHONE_DISPLAY },
    { d: "Customer Support", e: "support@amtruck.com", p: CONTACT_PHONE_DISPLAY },
  ];
  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase lg:sticky lg:top-40">DIRECTORY</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {options.map((o, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-end justify-between py-10 border-b border-border group">
                  <div>
                    <h3 className="font-bold text-2xl md:text-3xl tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">{o.d}</h3>
                    <p className="text-muted-foreground text-lg font-medium">{o.e}</p>
                  </div>
                  <a href={`tel:${CONTACT_PHONE}`} className="mt-4 md:mt-0 text-xl md:text-2xl font-bold tracking-tight text-foreground transition-all hover:text-primary hover:-translate-y-1">
                    {o.p}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OfficeLocations = () => null; // Consolidating into BusinessHours

export const ContactMap = () => null; // Removing heavy map block for minimal aesthetic

export const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: Record<string, string>) => {
    setError(null);
    try {
      const { submitContactMessage } = await import("@/lib/api");
      await submitContactMessage({
        name: data.name,
        company: data.company,
        email: data.email,
        message: `[${data.service}] ${data.message ?? ""}`.trim(),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 3000);
    } catch {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase lg:sticky lg:top-40">INQUIRY</h2>
          </div>
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-4">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Full Name</label>
                  <input {...register("name", { required: true })} className="w-full bg-transparent border-b-2 border-border pb-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="John Doe" />
                </div>
                <div className="flex-1 space-y-4">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Company</label>
                  <input {...register("company")} className="w-full bg-transparent border-b-2 border-border pb-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="Logistics Inc." />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-4">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Email Address</label>
                  <input type="email" {...register("email", { required: true })} className="w-full bg-transparent border-b-2 border-border pb-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary transition-colors text-foreground" placeholder="john@example.com" />
                </div>
                <div className="flex-1 space-y-4">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Service Type</label>
                  <select {...register("service")} className="w-full bg-transparent border-b-2 border-border pb-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary transition-colors text-foreground appearance-none cursor-pointer">
                    <option className="bg-background text-foreground">Freight Quote</option>
                    <option className="bg-background text-foreground">Fleet Solutions</option>
                    <option className="bg-background text-foreground">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Message</label>
                <textarea rows={3} {...register("message")} className="w-full bg-transparent border-b-2 border-border pb-4 text-xl md:text-2xl font-medium focus:outline-none focus:border-primary transition-colors resize-none text-foreground" placeholder="How can we help?" />
              </div>
              
              {error && (
                <p className="text-sm text-destructive font-bold tracking-wide">{error}</p>
              )}
              
              <div className="pt-8 flex justify-end">
                <button type="submit" className="inline-flex items-center gap-4 text-2xl font-bold tracking-widest uppercase hover:text-primary transition-colors group">
                  {submitted ? "MESSAGE SENT" : "SUBMIT INQUIRY"}
                  {!submitted && <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BusinessHours = () => (
  <section className="py-32 bg-background">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">HEADQUARTERS</h3>
        <p className="text-3xl font-bold tracking-tight mb-2">Kansas City, MO</p>
        <p className="text-xl text-muted-foreground font-medium">1800 Genessee St Suite 230<br/>Kansas City, MO 64102</p>
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">OPERATIONAL HOURS</h3>
        <div className="flex justify-between items-end border-b border-border pb-4 mb-4">
          <p className="text-2xl font-bold tracking-tight">Dispatch Center</p>
          <p className="text-lg text-primary font-bold">24/7</p>
        </div>
        <div className="flex justify-between items-end border-b border-border pb-4">
          <p className="text-2xl font-bold tracking-tight">Corporate Office</p>
          <p className="text-lg text-muted-foreground font-medium text-right">Mon-Fri: 8AM - 6PM<br/>Sat: 9AM - 3PM</p>
        </div>
      </div>
    </div>
  </section>
);

export const ContactCta = () => null; // Removed, redundant with form above
