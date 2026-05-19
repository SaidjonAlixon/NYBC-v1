import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Truck, ShieldCheck, Globe, Clock, Package, BarChart3, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)] bg-[length:100%_100%] bg-center" />
      {/* Animated dots */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-50" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>
    </div>
    
    <div className="container relative z-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 w-max">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-bold tracking-widest text-primary">AMERICA'S TRUSTED LOGISTICS PARTNER</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
          DRIVEN BY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
            PRECISION.
          </span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-lg">
          Powering the American supply chain with state-of-the-art fleet logistics, unparalleled reliability, and next-generation tracking.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link href="/contact" className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(193,18,31,0.3)]">
            GET A FREE QUOTE
          </Link>
          <Link href="/contact" className="px-8 py-4 border border-border bg-background/50 backdrop-blur text-foreground font-bold tracking-widest hover:border-primary/50 transition-all hover:bg-primary/10 hover:scale-105">
            CALL DISPATCH
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="hidden lg:block relative h-[600px]"
      >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-[100px] rounded-full" />
            <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(193,18,31,0.5)]">
              <path d="M100,200 L300,200 L350,100 L700,100 L750,250 L100,250 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" className="animate-[dash_3s_linear_infinite]" />
              <rect x="200" y="230" width="60" height="60" rx="30" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="4" />
              <rect x="600" y="230" width="60" height="60" rx="30" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="4" />
              <line x1="0" y1="280" x2="800" y2="280" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="20 10" className="opacity-50" />
            </svg>
          </div>
      </motion.div>
    </div>
  </section>
);

export const MarqueeSection = () => {
  const companies = ["WALMART LOGISTICS", "HOME DEPOT SUPPLY", "AMAZON FREIGHT", "TARGET CORP", "TESLA MOTORS", "COSTCO WHOLESALE", "FORD SUPPLY CHAIN", "BOEING FREIGHT", "CATERPILLAR", "3M LOGISTICS", "JOHN DEERE", "GENERAL MILLS"];
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden bg-card/20">
      <div className="container px-6 mx-auto mb-8 text-center">
        <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase">TRUSTED BY LEADING COMPANIES</h3>
      </div>
      <div className="flex flex-col gap-6 relative">
        <div className="flex whitespace-nowrap animate-marquee w-max gap-6">
          {[...companies, ...companies].map((c, i) => (
            <div key={i} className="px-6 py-3 border border-border bg-background rounded-full font-bold tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm">
              {c}
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marquee-reverse w-max gap-6 ml-[-100px]">
          {[...companies, ...companies].reverse().map((c, i) => (
            <div key={i} className="px-6 py-3 border border-border bg-background rounded-full font-bold tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const services = [
    { icon: <Truck size={32} />, title: "Freight Transportation", desc: "Reliable full truckload shipping across North America with real-time tracking." },
    { icon: <Globe size={32} />, title: "Long Haul Delivery", desc: "Cross-country routes optimized for speed and maximum efficiency." },
    { icon: <Clock size={32} />, title: "Refrigerated Logistics", desc: "Temperature-controlled freight ensuring product integrity from origin to destination." },
    { icon: <Package size={32} />, title: "Heavy Cargo", desc: "Specialized equipment for oversized and overweight shipments." },
    { icon: <BarChart3 size={32} />, title: "Fleet Solutions", desc: "Dedicated capacity tailored to your specific supply chain needs." },
    { icon: <ShieldCheck size={32} />, title: "Nationwide Shipping", desc: "Comprehensive network covering all 48 contiguous states." },
  ];
  return (
    <section className="py-32 relative z-10 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">OUR CAPABILITIES</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform origin-left">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const StatsSection = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "1,200+", label: "Daily Deliveries" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "48", label: "States Covered" }
  ];
  return (
    <section className="py-24 border-y border-white/5 relative overflow-hidden bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_100%)] opacity-5" />
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6"
            >
              <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HowWeWorkSection = () => {
  const steps = [
    { num: "01", title: "BOOK", desc: "Submit your shipment request online or via dispatch." },
    { num: "02", title: "PLAN", desc: "Our team creates optimized route and assigns fleet." },
    { num: "03", title: "TRACK", desc: "Real-time GPS monitoring every mile of the journey." },
    { num: "04", title: "DELIVER", desc: "On-time, in-perfect-condition, guaranteed." },
  ];
  return (
    <section className="py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">HOW WE DELIVER EXCELLENCE</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-border z-0" />
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(193,18,31,0.3)] transition-all">
                <span className="text-2xl font-bold text-primary">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold tracking-widest mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const IndustriesSection = () => {
  const industries = [
    { title: "Retail & E-Commerce", stat: "2M+ pallets/year" },
    { title: "Construction", stat: "Heavy materials" },
    { title: "Medical & Pharma", stat: "Temp controlled" },
    { title: "Food & Beverage", stat: "Fresh delivery" },
    { title: "Manufacturing", stat: "JIT logistics" },
    { title: "Automotive", stat: "Parts supply" }
  ];
  return (
    <section className="py-32 bg-card/20">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">INDUSTRIES WE POWER</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-card border border-white/5 rounded-xl hover:border-primary transition-all hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20">
                <Package className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{ind.title}</h3>
              <p className="text-muted-foreground font-medium">{ind.stat}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RouteMapSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">OUR NATIONAL COVERAGE</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16" />
        <div className="h-[400px] md:h-[600px] w-full bg-card/50 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          <p className="text-muted-foreground font-bold tracking-widest">[ INTERACTIVE USA MAP ]</p>
        </div>
      </div>
    </section>
  );
};

export const FleetSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const onWheel = (e: WheelEvent) => {
      const atStart = el.scrollLeft === 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;

      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  const trucks = [
    { type: "Dry Van", capacity: "45,000 lbs", best: "General Freight", routes: "All 48 States" },
    { type: "Reefer", capacity: "43,000 lbs", best: "Temperature Control", routes: "Fresh & Frozen" },
    { type: "Flatbed", capacity: "48,000 lbs", best: "Oversized Loads", routes: "Heavy Industry" },
    { type: "Step Deck", capacity: "48,000 lbs", best: "Tall Cargo", routes: "Construction" },
    { type: "Tanker", capacity: "44,000 lbs", best: "Liquid Freight", routes: "Energy Sector" },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-card/20 border-y border-white/5">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">OUR PREMIUM FLEET</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm tracking-widest">SCROLL TO EXPLORE</p>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trucks.map((truck, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[300px] md:min-w-[420px] snap-center p-8 bg-background border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(193,18,31,0.15)] group flex-shrink-0"
            >
              <div className="h-44 bg-card mb-6 flex items-center justify-center rounded-lg border border-white/5 relative overflow-hidden group-hover:border-primary/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Truck size={72} className="text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-300" />
                </motion.div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-primary/20 border border-primary/30">
                  <span className="text-xs font-bold text-primary tracking-widest">{truck.routes}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">{truck.type}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="font-bold text-primary">{truck.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Best For:</span>
                  <span className="font-bold text-foreground">{truck.best}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {trucks.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / trucks.length;
                el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              }}
              className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors duration-200"
              data-testid={`button-fleet-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const DashboardSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">LIVE OPERATIONS CENTER</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-card rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="bg-background/50 p-6 rounded-lg border border-white/5">
                <h4 className="text-sm font-bold tracking-widest text-muted-foreground mb-2">ACTIVE SHIPMENTS</h4>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-foreground">347</span>
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
              <div className="bg-background/50 p-6 rounded-lg border border-white/5">
                <h4 className="text-sm font-bold tracking-widest text-muted-foreground mb-2">FLEET UTILIZATION</h4>
                <span className="text-4xl font-bold text-primary">94%</span>
              </div>
            </div>
            <div className="bg-background/50 p-6 rounded-lg border border-white/5 flex flex-col justify-end min-h-[200px] gap-2">
               <div className="flex justify-between items-end h-32 gap-2">
                 {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                   <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i*0.1 }} className="w-full bg-primary/50 rounded-t-sm" />
                 ))}
               </div>
            </div>
            <div className="bg-background/50 p-6 rounded-lg border border-white/5 overflow-hidden">
               <h4 className="text-sm font-bold tracking-widest text-muted-foreground mb-4">LIVE DISPATCHES</h4>
               <div className="space-y-4">
                 {["Dallas → Chicago", "Miami → Atlanta", "Seattle → Denver", "New York → Boston"].map((route, i) => (
                   <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                     <span className="text-foreground font-medium">{route}</span>
                     <span className="text-green-500 text-xs tracking-widest">EN ROUTE</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-card/10">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">CLIENT SUCCESS</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "John D.", role: "Supply Chain Dir.", text: "AMTRUCK's precision and reliability transformed our distribution network." },
            { name: "Sarah M.", role: "Operations VP", text: "The realtime tracking and 24/7 support gives us unparalleled peace of mind." },
            { name: "Robert K.", role: "CEO", text: "They don't just move freight, they optimize the entire logistics process." }
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-background border border-white/5 rounded-xl flex flex-col gap-6 text-left"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg italic text-muted-foreground">"{testimonial.text}"</p>
              <div>
                <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                <span className="text-sm text-primary tracking-widest">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsSection = () => {
  const articles = [
    { tag: "Technology", title: "The Future of American Freight: AI-Powered Dispatch" },
    { tag: "Safety", title: "2024 Safety Compliance Guide for OTR Drivers" },
    { tag: "Market Trends", title: "Why Cold Chain Logistics is America's Fastest Growing Sector" }
  ];
  return (
    <section className="py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">INDUSTRY INSIGHTS</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer border border-white/5 bg-card/20 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="h-48 bg-muted relative overflow-hidden group-hover:bg-primary/20 transition-colors">
                 <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold tracking-widest text-primary mb-2 block">{art.tag}</span>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{art.title}</h3>
                <span className="text-sm font-bold tracking-widest text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors">READ MORE <ArrowRight size={16} /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CtaSection = () => (
  <section className="py-40 relative flex items-center justify-center overflow-hidden bg-background">
    <div className="absolute inset-0 bg-primary/5" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-primary/20 shadow-[0_0_50px_rgba(193,18,31,1)]" />
    
    <div className="container relative z-10 px-6 text-center flex flex-col items-center">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight max-w-3xl text-foreground">
        READY TO MOVE YOUR BUSINESS FORWARD?
      </h2>
      <div className="flex gap-4">
        <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-bold tracking-widest text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(193,18,31,0.4)] group">
          GET A FREE QUOTE
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 border border-white/10 bg-card text-foreground font-bold tracking-widest text-lg hover:border-primary/50 transition-all hover:scale-105 group">
          CALL DISPATCH
        </Link>
      </div>
    </div>
  </section>
);
