import { motion } from "framer-motion";
import { DollarSign, Map, Truck as TruckIcon, Award, Headphones, ShieldPlus, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const DriversHero = () => (
  <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="container relative z-10 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 uppercase text-foreground">
        DRIVE WITH THE <span className="text-primary">BEST</span>
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        <div className="px-6 py-3 bg-card border border-white/10 rounded-full font-bold tracking-widest text-sm">AVG INCOME: $85,000/YR</div>
        <div className="px-6 py-3 bg-card border border-white/10 rounded-full font-bold tracking-widest text-sm">FLEET: 2022 OR NEWER</div>
        <div className="px-6 py-3 bg-primary text-primary-foreground border border-primary rounded-full font-bold tracking-widest text-sm">$5,000 SIGN-ON BONUS</div>
      </div>
    </div>
  </section>
);

export const DriverLife = () => (
  <section className="py-32 bg-card/20">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-24 text-foreground">THE AMTRUCK DRIVER EXPERIENCE</h2>
      <div className="space-y-24">
        {[
          { t: "Premium Cab Experience", d: "Modern amenities, sleeper comfort, latest tech." },
          { t: "Nationwide Routes", d: "You choose your territory, home time options." },
          { t: "Financial Freedom", d: "Competitive pay, bonuses, retirement plan." }
        ].map((feat, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-foreground">{feat.t}</h3>
              <p className="text-muted-foreground text-lg">{feat.d}</p>
            </div>
            <div className="flex-1 h-[300px] w-full bg-background border border-white/5 rounded-2xl flex items-center justify-center">
              <span className="text-muted-foreground font-bold tracking-widest">[ IMAGE ]</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => {
  const benefits = [
    { icon: <DollarSign size={24} />, title: "Top-Tier Pay", desc: "Industry-leading CPM ($0.65-$0.80) and weekly bonuses." },
    { icon: <Map size={24} />, title: "Flexible Routes", desc: "Choose between local, regional, or OTR depending on your lifestyle." },
    { icon: <TruckIcon size={24} />, title: "Modern Fleet", desc: "Drive 2022+ models equipped with premium amenities." },
    { icon: <Award size={24} />, title: "$5K Sign-on", desc: "$5,000 sign-on bonus for experienced drivers paid out fast." },
    { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Dedicated dispatch and maintenance team always available." },
    { icon: <ShieldPlus size={24} />, title: "Full Benefits", desc: "Comprehensive health, dental, and 401(k) matching day one." },
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

export const EarningsSection = () => (
  <section className="py-32 bg-card/30 border-y border-white/5">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">WHAT YOU CAN EARN</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-background p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold tracking-widest text-muted-foreground mb-2">BASE PAY RANGE</h4>
            <div className="text-4xl font-bold text-primary">$65,000 - $95,000/yr</div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground">Weekly Performance Bonus</span>
              <span className="font-bold text-primary">Up to $500</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground">Fuel Efficiency Bonus</span>
              <span className="font-bold text-primary">Included</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-foreground">Health Premium Cost</span>
              <span className="font-bold text-primary">$0</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
           <h4 className="text-sm font-bold tracking-widest text-muted-foreground mb-2">INDUSTRY COMPARISON</h4>
           <div>
             <div className="flex justify-between text-sm mb-1"><span className="font-bold">AMTRUCK</span><span className="text-primary font-bold">$0.75 CPM</span></div>
             <div className="w-full h-3 bg-card rounded-full overflow-hidden"><div className="w-[90%] h-full bg-primary" /></div>
           </div>
           <div>
             <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">National Average</span><span className="text-muted-foreground font-bold">$0.55 CPM</span></div>
             <div className="w-full h-3 bg-card rounded-full overflow-hidden"><div className="w-[65%] h-full bg-muted-foreground" /></div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

export const FleetShowcase = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">YOUR OFFICE ON WHEELS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['2022 Freightliner Cascadia', '2023 Kenworth T680', '2022 Peterbilt 579'].map((t, i) => (
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

export const OnboardingTimeline = () => (
  <section className="py-32 bg-background border-t border-white/5">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">YOUR JOURNEY TO THE ROAD</h2>
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
        {[
          { step: "1", title: "Apply Online", time: "Day 1" },
          { step: "2", title: "Background & License Check", time: "Days 2-3" },
          { step: "3", title: "Orientation & Training", time: "Days 4-7" },
          { step: "4", title: "Fleet Assignment", time: "Day 8" },
          { step: "5", title: "First Route", time: "Day 10" }
        ].map((s, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(193,18,31,0.2)]">
              {s.step}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-white/10 bg-card">
              <span className="text-primary font-bold tracking-widest text-xs mb-2 block">{s.time}</span>
              <h3 className="font-bold text-xl text-foreground">{s.title}</h3>
            </div>
          </div>
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

export const ApplicationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 3000);
  };

  return (
    <section className="py-32 bg-card/10 border-y border-white/5 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">SUBMIT APPLICATION</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-background p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-muted-foreground">FULL NAME</label>
              <input {...register("name", { required: true })} className="w-full bg-card border border-white/5 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-muted-foreground">PHONE</label>
              <input {...register("phone", { required: true })} className="w-full bg-card border border-white/5 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-muted-foreground">EMAIL</label>
            <input type="email" {...register("email", { required: true })} className="w-full bg-card border border-white/5 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-muted-foreground">EXPERIENCE</label>
              <select {...register("experience")} className="w-full bg-card border border-white/5 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                <option value="1-2">1-2 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-muted-foreground">ROUTE PREFERENCE</label>
              <select {...register("route")} className="w-full bg-card border border-white/5 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="OTR">OTR</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all mt-4">
            {submitted ? "APPLICATION RECEIVED" : "SUBMIT APPLICATION"}
          </button>
        </form>
      </div>
    </section>
  );
};

export const ApplicationCta = () => (
  <section className="py-24 bg-primary text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter mb-6 text-primary-foreground">READY TO START YOUR JOURNEY?</h2>
      <p className="text-xl text-primary-foreground/80 mb-8">Apply now and get on the road in 10 days</p>
      <button className="px-10 py-5 bg-background text-foreground font-bold tracking-widest text-lg hover:scale-105 transition-all shadow-xl">
        APPLY TODAY
      </button>
    </div>
  </section>
);
