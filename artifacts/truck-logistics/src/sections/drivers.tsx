import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Map, Truck as TruckIcon, Award, Headphones, CheckCircle2, ArrowRight, Calendar, Heart, Wallet } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

export const DriversHero = () => (
  <section className="pt-40 pb-20 md:pt-56 md:pb-32 bg-background border-b border-border overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left Side: Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <h1 className="text-[clamp(3rem,6vw,8rem)] leading-[0.85] font-bold tracking-tighter uppercase text-foreground">
            Keeping freight moving <br />
            and drivers <span className="text-primary text-outline">closer</span> to home.
          </h1>
          
          <div className="mt-12 flex flex-wrap gap-8 items-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Fleet: 2023 or newer
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              $1,000 Sign-on Bonus
            </div>
          </div>
        </motion.div>

        {/* Right Side: Filled Empty Space with Premium Bento Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {/* Massive Top Card */}
            <div className="col-span-2 bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden group hover:border-primary/50 transition-colors duration-500">
              <div className="relative z-10">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block flex items-center gap-2">
                  <DollarSign size={14} /> Top Tier Pay
                </span>
                <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground mb-2 group-hover:scale-105 origin-left transition-transform duration-500">$100k+</h3>
                <p className="text-muted-foreground font-medium text-sm md:text-base uppercase tracking-widest">Average yearly earnings</p>
              </div>
              <DollarSign size={160} className="absolute -right-10 -bottom-10 text-muted-foreground/5 group-hover:text-primary/5 transition-colors duration-500 group-hover:-rotate-12" />
            </div>

            {/* Bottom Left Card */}
            <div className="bg-card border border-border p-8 rounded-[2rem] shadow-xl flex flex-col justify-between group hover:border-primary/50 transition-colors duration-500">
              <Award size={40} className="text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <div>
                <h4 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-1">Weekly</h4>
                <p className="text-xs md:text-sm text-muted-foreground font-bold uppercase tracking-widest">Home Time</p>
              </div>
            </div>

            {/* Bottom Right Solid Card */}
            <div className="bg-primary p-8 rounded-[2rem] shadow-xl flex flex-col justify-between text-primary-foreground group overflow-hidden relative">
              <div className="relative z-10">
                <CheckCircle2 size={40} className="mb-8 group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <h4 className="text-3xl md:text-4xl font-black tracking-tighter mb-1">100%</h4>
                  <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-90">No Touch</p>
                </div>
              </div>
              <CheckCircle2 size={120} className="absolute -right-8 -bottom-8 text-black/10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export const BenefitsSection = () => {
  const [active, setActive] = useState(0);

  const benefits = [
    { icon: <DollarSign size={80} />, title: "TOP-TIER PAY", desc: "Industry-leading CPM. Earn what you deserve with zero hidden deductions. We prioritize driver compensation above all else.", img: "/TOP TRI.png" },
    { icon: <Map size={80} />, title: "FLEXIBLE ROUTES", desc: "Local, regional, or OTR. You decide the balance that fits your life and your family's needs perfectly.", img: "/FLEXIBLE.png" },
    { icon: <TruckIcon size={80} />, title: "MODERN FLEET", desc: "Drive 2023–2027 models equipped with premium amenities, automatic transmissions, and advanced safety systems.", img: "/MODREN.png" },
    { icon: <Award size={80} />, title: "SIGN-ON BONUS", desc: "Up to $1,000 for experienced drivers, paid out fast to welcome you to the family right from day one.", img: "/BONUS.png" },
    { icon: <Headphones size={80} />, title: "24/7 SUPPORT", desc: "Dedicated dispatch and maintenance team, always on call to ensure you're never left stranded on the road.", img: "/SUPPORT.png" },
    { icon: <Calendar size={80} />, title: "PAID TIME OFF", desc: "Generous vacation, sick days, and paid holidays to keep you refreshed and focused on what matters most.", img: "/VOLVO.png" },
    { icon: <Heart size={80} />, title: "HEALTH INSURANCE", desc: "Comprehensive medical, dental, and vision coverage for you and your family, starting within 30 days.", img: "/PETERBILT.png" },
    { icon: <Wallet size={80} />, title: "RETIREMENT PLAN", desc: "Robust 401(k) plan with company match to secure your future and reward your long-term dedication.", img: "/BONUS.png" },
  ];

  return (
    <section className="py-32 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none text-center md:text-left">
            DRIVER <span className="text-primary text-outline">BENEFITS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[600px]">
          {/* Left Side: Interactive List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {benefits.map((b, i) => (
              <div 
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`py-5 px-8 cursor-pointer border-l-4 transition-all duration-500 flex items-center justify-between group ${active === i ? "border-primary bg-background/50" : "border-transparent hover:bg-muted/50"}`}
              >
                <h3 className={`text-xl md:text-2xl font-bold tracking-tight uppercase transition-all duration-500 ${active === i ? "text-foreground translate-x-2" : "text-muted-foreground"}`}>
                  {b.title}
                </h3>
                <ArrowRight className={`transition-all duration-500 ${active === i ? "opacity-100 text-primary translate-x-0" : "opacity-0 -translate-x-4"}`} size={24} />
              </div>
            ))}
          </div>

          {/* Right Side: Dynamic Display Panel */}
          <div className="lg:col-span-7 h-full">
            <div className="sticky top-40 bg-background border border-border rounded-[2rem] shadow-2xl overflow-hidden h-[500px] md:h-[600px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-end p-10 md:p-16"
                >
                  {/* Background Image & Gradient */}
                  <div className="absolute inset-0 bg-muted/20">
                    <img 
                      src={benefits[active].img} 
                      alt={benefits[active].title} 
                      className="w-full h-full object-cover opacity-60" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-primary mb-8 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                      {benefits[active].icon}
                    </div>
                    <span className="text-primary font-bold tracking-[0.3em] text-sm mb-4 block uppercase drop-shadow-md">
                      Benefit 0{active + 1}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-6 drop-shadow-lg">
                      {benefits[active].title}
                    </h3>
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-md">
                      {benefits[active].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FleetShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? current.clientWidth : 550;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const trucks = [
    { name: '2023 FREIGHTLINER CASCADIA', img: '/MODREN.png' },
    { name: '2025 KENWORTH T680', img: '/FLEXIBLE.png' },
    { name: '2027 PETERBILT 579', img: '/PETERBILT.png' },
    { name: '2024 VOLVO VNL 860', img: '/VOLVO.png' },
  ];

  return (
    <section className="py-32 bg-background border-y border-border overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
              YOUR OFFICE <br/> <span className="text-muted-foreground/30">ON WHEELS</span>
            </h2>
            <div className="mt-8 w-24 h-1 bg-primary" />
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-sm font-bold tracking-[0.2em] text-primary uppercase hidden md:block">
              Swipe to explore
            </motion.p>
            <div className="flex gap-4">
              <button onClick={() => scroll("left")} className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:border-primary">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scroll("right")} className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:border-primary">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 md:gap-10 px-6 md:px-12 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar relative z-10 scroll-smooth w-full"
      >
        {trucks.map((t, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="min-w-[90vw] md:min-w-[600px] h-[600px] snap-center shrink-0 group relative overflow-hidden rounded-[2rem] border border-border shadow-2xl bg-card"
          >
            {/* Fallback color if image fails */}
            <div className="absolute inset-0 bg-muted/20" />
            
            <img 
              src={t.img} 
              alt={t.name} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Dark gradient so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
              <span className="text-primary font-black tracking-widest text-2xl mb-4 block">0{i+1}</span>
              <h3 className="text-3xl md:text-5xl font-bold uppercase leading-none mb-6 text-white group-hover:text-primary transition-colors duration-500">{t.name}</h3>
              
              <ul className="space-y-4 text-sm font-bold text-white tracking-widest uppercase">
                <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-primary"/> Automated Transmission</li>
                <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-primary"/> Premium Sleeper Cab</li>
                <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-primary"/> APU & Inverter Equipped</li>
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const RequirementsSection = () => (
  <section className="py-32 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">REQUIREMENTS</h2>
        <div className="space-y-6 text-left inline-block">
          {[
            "Valid Class A CDL License",
            "Clean driving record (no major violations in past 3 years)",
            "Minimum 2+ years of verifiable OTR or Regional experience",
            "Must pass DOT physical and comprehensive drug screen"
          ].map((req, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 group">
              <CheckCircle2 className="text-primary shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
              <p className="font-medium text-foreground text-xl md:text-2xl tracking-tight">{req}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const DriverTestimonials = () => null; // Removed to keep it highly minimal

export const DriverFaq = () => null;

export const ApplicationCta = () => {
  const { openModal } = useApplicationModal();

  return (
    <section className="py-32 bg-background border-t border-border text-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-[0.85]">
          READY TO START<br/><span className="text-primary">YOUR JOURNEY?</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium">Apply now and get on the road in 10 days.</p>
        <button
          type="button"
          onClick={() => openModal()}
          className="inline-flex items-center gap-4 border-b-2 border-primary pb-2 text-2xl font-bold tracking-widest uppercase hover:text-primary transition-colors group"
        >
          APPLY TODAY
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};
