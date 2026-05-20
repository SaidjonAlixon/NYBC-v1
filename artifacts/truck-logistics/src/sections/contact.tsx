import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Navigation2, Clock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const ContactHero = () => (
  <section className="py-32 relative overflow-hidden border-b border-white/5 bg-background">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 uppercase text-foreground">
        LET'S MOVE FORWARD <span className="text-primary">TOGETHER</span>
      </motion.h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Ready to optimize your supply chain? Our logistics experts are standing by.
      </p>
    </div>
  </section>
);

export const ContactOptions = () => {
  const options = [
    { d: "Sales & Quotes", e: "sales@amtruck.com", p: "1-800-555-0100" },
    { d: "Dispatch Center", e: "dispatch@amtruck.com", p: "1-800-555-0199" },
    { d: "Driver Recruitment", e: "drivers@amtruck.com", p: "1-800-555-0200" },
    { d: "Customer Support", e: "support@amtruck.com", p: "1-800-555-0300" },
  ];
  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">REACH THE RIGHT TEAM</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((o, i) => (
            <div key={i} className="p-8 border border-white/5 bg-background rounded-2xl hover:border-primary/50 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-foreground">{o.d}</h3>
              <p className="text-muted-foreground text-sm mb-2">{o.e}</p>
              <p className="text-primary font-bold">{o.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const OfficeLocations = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">OUR LOCATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { c: "Dallas, TX (HQ)", a: "1234 Logistics Blvd, Dallas TX 75201" },
          { c: "Los Angeles, CA", a: "5678 Freight Ave, Los Angeles CA 90001" },
          { c: "Chicago, IL", a: "9012 Transport St, Chicago IL 60601" }
        ].map((l, i) => (
          <div key={i} className="p-8 border border-white/5 bg-card/30 rounded-2xl flex items-start gap-4">
            <MapPin className="text-primary shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-2 text-foreground">{l.c}</h3>
              <p className="text-muted-foreground">{l.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactMap = () => (
  <section className="py-24 bg-card/10">
    <div className="container mx-auto px-6">
      <div className="h-[500px] rounded-2xl overflow-hidden border border-white/10 relative bg-background flex items-center justify-center">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
         <span className="text-muted-foreground font-bold tracking-widest">[ INTERACTIVE DARK MAP ]</span>
      </div>
    </div>
  </section>
);

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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="p-12 border border-white/5 bg-card/30 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold tracking-tighter mb-8 text-foreground">SEND A MESSAGE</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground">FULL NAME</label>
                <input {...register("name", { required: true })} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground">COMPANY</label>
                <input {...register("company")} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground">EMAIL</label>
                <input type="email" {...register("email", { required: true })} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-muted-foreground">SERVICE TYPE</label>
                <select {...register("service")} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                  <option>Freight Quote</option>
                  <option>Fleet Solutions</option>
                  <option>General Inquiry</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-muted-foreground">MESSAGE</label>
              <textarea rows={5} {...register("message")} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-foreground" />
            </div>
            {error && (
              <p className="text-sm text-destructive font-semibold tracking-wide">{error}</p>
            )}
            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all">
              {submitted ? "MESSAGE SENT SUCCESSFULLY" : "SEND INQUIRY"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const BusinessHours = () => (
  <section className="py-24 bg-card/20">
    <div className="container mx-auto px-6 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-background p-8 rounded-2xl border border-white/5">
        <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2"><Clock className="text-primary"/> Office Hours</h3>
        <p className="text-muted-foreground mb-2">Mon-Fri: 8:00 AM - 6:00 PM CT</p>
        <p className="text-muted-foreground">Sat: 9:00 AM - 3:00 PM CT</p>
      </div>
      <div className="bg-background p-8 rounded-2xl border border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <h3 className="font-bold text-xl mb-4 text-foreground relative z-10">Dispatch Center</h3>
        <p className="text-muted-foreground mb-4 relative z-10">24 Hours / 7 Days a week</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold tracking-widest relative z-10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> DISPATCH ONLINE
        </div>
      </div>
    </div>
  </section>
);

export const ResponseTimeline = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold tracking-tighter mb-16 text-foreground">HOW WE HANDLE YOUR INQUIRY</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {['Submit Inquiry', 'Team Review (2hrs)', 'Full Response & Pricing (4hrs)'].map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-card border border-primary text-primary flex items-center justify-center font-bold text-xl">
              {i+1}
            </div>
            <span className="font-bold text-foreground">{step}</span>
            {i !== 2 && <ArrowRight className="hidden md:block text-muted-foreground ml-4" />}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactFaq = () => (
  <section className="py-24 bg-card/10">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">FREQUENTLY ASKED QUESTIONS</h2>
      <div className="space-y-4">
        {['How quickly can you arrange a pickup?', 'Do you provide real-time tracking?', 'What is your service area?'].map((q, i) => (
          <div key={i} className="p-6 bg-background border border-white/5 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
            <h3 className="font-bold text-foreground text-lg">{q}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactCta = () => (
  <section className="py-32 bg-primary text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-5xl font-bold tracking-tighter mb-8 text-primary-foreground">START YOUR SHIPMENT TODAY</h2>
      <button className="px-10 py-5 bg-background text-foreground font-bold tracking-widest text-lg hover:scale-105 transition-all shadow-xl">
        GET A FREE QUOTE
      </button>
    </div>
  </section>
);
