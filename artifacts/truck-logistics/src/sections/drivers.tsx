import { motion } from "framer-motion";
import { DollarSign, Map, Truck as TruckIcon, Award, Headphones, CheckCircle2 } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

export const DriversHero = () => (
  <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="container relative z-10 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-6xl lg:text-7xl"
      >
        Keeping Freight Moving — and Drivers{" "}
        <span className="text-primary">Closer to Home.</span>
      </motion.h1>
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <div className="rounded-full border border-white/10 bg-card px-6 py-3 text-sm font-bold tracking-widest">
          FLEET: 2019 OR NEWER
        </div>
        <div className="rounded-full border border-primary bg-primary px-6 py-3 text-sm font-bold tracking-widest text-primary-foreground">
          $250–$1,000 SIGN-ON BONUS
        </div>
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => {
  const benefits = [
    { icon: <DollarSign size={24} />, title: "Top-Tier Pay", desc: "Industry-leading CPM ($0.65-$0.80)." },
    { icon: <Map size={24} />, title: "Flexible Routes", desc: "Choose between local, regional, or OTR depending on your lifestyle." },
    { icon: <TruckIcon size={24} />, title: "Modern Fleet", desc: "Drive 2023–2027 models equipped with premium amenities." },
    { icon: <Award size={24} />, title: "$250–$1,000 Sign-on", desc: "Sign-on bonus for experienced drivers paid out fast." },
    { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Dedicated dispatch and maintenance team always available." },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">BENEFITS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/5 bg-card/30 rounded-xl hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FleetShowcase = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">YOUR OFFICE ON WHEELS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['2023 Freightliner Cascadia', '2025 Kenworth T680', '2027 Peterbilt 579'].map((t, i) => (
          <div key={i} className="bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-colors">
            <div className="h-32 mb-6 flex items-center justify-center"><TruckIcon size={64} className="text-primary/50" /></div>
            <h3 className="text-xl font-bold mb-4">{t}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Automated Transmission</li>
              <li>• Premium Sleeper Cab</li>
              <li>• APU & Inverter Equipped</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const RequirementsSection = () => (
  <section className="py-24 bg-card/20">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">REQUIREMENTS</h2>
      <div className="space-y-4">
        {[
          "Valid Class A CDL License",
          "Clean driving record (no major violations in past 3 years)",
          "Minimum 2+ years of OTR experience",
          "Must pass DOT physical and drug screen"
        ].map((req, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-6 border border-white/5 bg-background rounded-lg">
            <CheckCircle2 className="text-primary shrink-0" size={24} />
            <p className="font-bold text-foreground text-lg">{req}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const DriverTestimonials = () => (
  <section className="py-24 bg-card/30">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">HEAR FROM OUR DRIVERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { q: "Best decision I made was joining AMTRUCK. The pay is real, the support is real.", n: "Marcus T." },
          { q: "Home every weekend, good routes, clean equipment. What more do you need?", n: "Jennifer R." },
          { q: "AMTRUCK treats you like a professional, not just a number.", n: "Carlos M." }
        ].map((t, i) => (
           <div key={i} className="bg-background p-8 rounded-2xl border border-white/5">
             <p className="text-lg italic text-muted-foreground mb-6">"{t.q}"</p>
             <h4 className="font-bold text-foreground">{t.n}</h4>
           </div>
        ))}
      </div>
    </div>
  </section>
);

export const DriverFaq = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">DRIVER FAQ</h2>
      <div className="space-y-4">
        {['Do I need a CDL before applying?', 'What are home time options?', 'How is pay calculated?'].map((q, i) => (
          <div key={i} className="p-6 bg-card border border-white/5 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
            <h3 className="font-bold text-foreground text-lg">{q}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ApplicationCta = () => {
  const { openModal } = useApplicationModal();

  return (
    <section className="py-24 bg-primary text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tighter mb-6 text-primary-foreground">READY TO START YOUR JOURNEY?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8">Apply now and get on the road in 10 days</p>
        <button
          type="button"
          onClick={openModal}
          className="px-10 py-5 bg-background text-foreground font-bold tracking-widest text-lg hover:scale-105 transition-all shadow-xl"
        >
          APPLY TODAY
        </button>
      </div>
    </section>
  );
};
