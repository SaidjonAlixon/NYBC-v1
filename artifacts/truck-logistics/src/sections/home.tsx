import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Truck, Globe, Map, Clock, Package, BarChart3, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { HeroUsaMap } from "@/components/hero/HeroUsaMap";
export { HeroSection } from "@/components/hero/HeroSection";

export const ServicesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const services = [
    { icon: <Truck size={32} />, title: "Freight", desc: "Dependable local and regional freight transportation with on-time deliveries." },
    { icon: <Map size={32} />, title: "Regional", desc: "Regional delivery routes designed for efficiency and fast transit times." },
    { icon: <Clock size={32} />, title: "Refrigerated", desc: "Temperature-controlled transportation solutions that protect sensitive freight." },
    { icon: <Package size={32} />, title: "Heavy Cargo", desc: "Specialized hauling solutions for heavy equipment and oversized shipments." },
    { icon: <BarChart3 size={32} />, title: "Fleet", desc: "Flexible fleet solutions tailored to support recurring routes." },
    { icon: <Globe size={32} />, title: "Nationwide", desc: "Expanded shipping coverage connecting local freight across the country." },
  ];

  return (
    <section className="py-32 relative z-10 bg-background border-b border-border overflow-hidden">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">OUR CAPABILITIES</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[550px] gap-4 md:gap-6">
          {services.map((service, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-6 md:p-8 ${
                  isActive 
                    ? "flex-[4] bg-primary shadow-2xl scale-[1.02] md:scale-100" 
                    : "flex-1 bg-card border border-border hover:bg-muted"
                }`}
              >
                {/* Massive Background Icon when Active */}
                <div className={`absolute -right-10 -bottom-10 transition-all duration-1000 ${isActive ? "opacity-10 scale-150 text-black" : "opacity-0"}`}>
                  {service.icon}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-6 h-full">
                  <div className={`shrink-0 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                    isActive ? "w-16 h-16 bg-white/20 text-white" : "w-12 h-12 bg-primary/10 text-primary"
                  }`}>
                    {service.icon}
                  </div>
                  
                  <div className={`flex-1 transition-all duration-500 overflow-hidden ${
                    isActive ? "opacity-100 max-h-[200px]" : "opacity-0 max-h-0 md:max-h-full md:opacity-100"
                  }`}>
                    <div className="flex flex-col justify-end h-full">
                      <h3 className={`font-bold tracking-tight mb-2 uppercase whitespace-nowrap transition-all duration-500 ${
                        isActive ? "text-3xl text-white" : "text-xl text-foreground md:-rotate-90 md:origin-bottom-left md:translate-x-6 md:-translate-y-8"
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`text-white/80 text-lg leading-relaxed transition-all duration-500 delay-100 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 hidden md:block"
                      }`}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
    <section className="py-24 bg-card relative overflow-hidden border-b border-border">
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15, type: "spring" }}
              className="flex flex-col items-center justify-center p-6 border-b border-border md:border-b-0"
            >
              <span className="text-5xl md:text-8xl font-bold tracking-tighter text-foreground mb-4">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-bold tracking-widest text-primary uppercase">{stat.label}</span>
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
    <section className="py-32 bg-background border-b border-border">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">HOW WE DELIVER EXCELLENCE</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>
        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring" }}
              className="flex flex-col md:flex-row items-center md:even:flex-row-reverse gap-8 md:gap-16 group"
            >
              <div className="text-[8rem] font-bold tracking-tighter leading-none text-muted/20 group-hover:text-primary transition-colors duration-500">
                {step.num}
              </div>
              <div className={`flex-1 ${idx % 2 === 0 ? "md:text-left text-center" : "text-center md:text-right"}`}>
                <h3 className="text-3xl font-bold tracking-tight mb-4 uppercase text-foreground">{step.title}</h3>
                <p className="text-xl text-muted-foreground">{step.desc}</p>
              </div>
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
    <section className="py-32 bg-background border-b border-border">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">INDUSTRIES WE POWER</h2>
          <div className="w-24 h-1 bg-primary" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col border-b border-border pb-8 group cursor-pointer"
            >
              <div className="flex justify-between items-end">
                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">{ind.title}</h3>
                <Package className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-300" />
              </div>
              <p className="text-muted-foreground font-bold tracking-widest text-sm uppercase mt-4">{ind.stat}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RouteMapSection = () => {
  return (
    <section className="relative overflow-hidden bg-card py-32 border-b border-border">
      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="mb-8 text-4xl font-bold tracking-tighter md:text-6xl uppercase">
              OUR NATIONAL COVERAGE
            </h2>
            <div className="mb-8 h-1 w-24 bg-primary" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              NYBC Trucking connects coast-to-coast through eight strategic hubs — with live freight lanes
              across all 48 continental states. We are always moving.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroUsaMap variant="coverage" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const FleetSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trucks = [
    { type: "Dry Van", capacity: "45,000 lbs", best: "General Freight", routes: "All 48 States" },
    { type: "Reefer", capacity: "43,000 lbs", best: "Temperature Control", routes: "Fresh & Frozen" },
    { type: "Flatbed", capacity: "48,000 lbs", best: "Oversized Loads", routes: "Heavy Industry" },
    { type: "Step Deck", capacity: "48,000 lbs", best: "Tall Cargo", routes: "Construction" },
    { type: "Tanker", capacity: "44,000 lbs", best: "Liquid Freight", routes: "Energy Sector" },
  ];

  return (
    <section className="py-32 bg-background border-b border-border overflow-hidden">
      <div className="container px-6 mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">OUR PREMIUM FLEET</h2>
            <div className="w-24 h-1 bg-primary" />
          </div>
          <p className="hidden md:block text-muted-foreground text-sm font-bold tracking-widest uppercase">SWIPE TO EXPLORE →</p>
        </motion.div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-8 px-6 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {trucks.map((truck, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="min-w-[85vw] md:min-w-[450px] snap-center shrink-0 group relative cursor-pointer"
          >
            <div className="h-[300px] bg-card border border-border flex items-center justify-center p-8 transition-colors group-hover:border-primary/50 relative overflow-hidden">
              <Truck size={120} className="text-muted/20 absolute -right-10 -bottom-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 w-full text-left">
                <span className="text-primary font-bold tracking-widest text-xs mb-4 block uppercase">{truck.routes}</span>
                <h3 className="text-3xl font-bold uppercase leading-none mb-6 text-foreground">{truck.type}</h3>
                <ul className="space-y-2 text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  <li>Capacity: {truck.capacity}</li>
                  <li>Best For: {truck.best}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const DashboardSection = () => {
  return (
    <section className="py-32 bg-card border-b border-border">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">LIVE OPERATIONS CENTER</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-background border border-border p-8 md:p-16 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            <div className="space-y-12">
              <div>
                <h4 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4">ACTIVE SHIPMENTS</h4>
                <div className="flex items-center gap-4">
                  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-6xl font-bold text-foreground">347</motion.span>
                  <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4">FLEET UTILIZATION</h4>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-6xl font-bold text-primary">94%</motion.span>
              </div>
            </div>
            <div className="flex flex-col justify-end min-h-[200px] gap-4">
              <h4 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4 text-center">WEEKLY VOLUME</h4>
              <div className="flex justify-between items-end h-40 gap-4">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="w-full bg-foreground hover:bg-primary transition-colors cursor-pointer" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-8">LIVE DISPATCHES</h4>
              <div className="space-y-6">
                {["Dallas → Chicago", "Miami → Atlanta", "Seattle → Denver", "New York → Boston"].map((route, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex justify-between items-center text-lg border-b border-border pb-4">
                    <span className="text-foreground font-bold">{route}</span>
                    <span className="text-green-500 text-xs font-bold tracking-widest">EN ROUTE</span>
                  </motion.div>
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
    <section className="py-32 bg-background border-b border-border">
      <div className="container px-6 mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">CLIENT SUCCESS</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { name: "John D.", role: "Supply Chain Dir.", text: "AMTRUCK's precision and reliability transformed our distribution network." },
            { name: "Sarah M.", role: "Operations VP", text: "The realtime tracking and 24/7 support gives us unparalleled peace of mind." },
            { name: "Robert K.", role: "CEO", text: "They don't just move freight, they optimize the entire logistics process." }
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col text-left group"
            >
              <div className="flex gap-2 text-primary mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />)}
              </div>
              <p className="text-2xl font-medium leading-relaxed italic text-foreground mb-8 group-hover:text-primary transition-colors duration-300">"{testimonial.text}"</p>
              <div>
                <h4 className="font-bold text-xl uppercase tracking-tight">{testimonial.name}</h4>
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">{testimonial.role}</span>
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
    { tag: "Technology", title: "The Future of American Freight: AI-Powered Dispatch", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80", alt: "Dispatch dashboard and freight technology" },
    { tag: "Safety", title: "2024 Safety Compliance Guide for OTR Drivers", image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=500&fit=crop&q=80", alt: "Semi truck on the highway" },
    { tag: "Market Trends", title: "Why Cold Chain Logistics is America's Fastest Growing Sector", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&q=80", alt: "Warehouse logistics and cold chain operations" },
  ];
  return (
    <section className="py-32 bg-card border-b border-border">
      <div className="container px-6 mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">WEEKLY NEWS</h2>
            <div className="w-24 h-1 bg-primary" />
          </div>
          <p className="max-w-md text-muted-foreground font-medium text-lg">
            Fresh updates from the road — fleet news, safety tips, and market trends every week.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((art, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-muted mb-8">
                <img src={art.image} alt={art.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-primary mb-4 block uppercase">{art.tag}</span>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">{art.title}</h3>
                <span className="text-sm font-bold tracking-widest text-foreground flex items-center gap-4 group-hover:gap-6 transition-all uppercase">READ MORE <ArrowRight size={20} /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA_TRUCK_IMAGE = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&q=80";

export const CtaSection = () => (
  <section className="relative flex items-center justify-center overflow-hidden bg-background py-48">
    <img src={CTA_TRUCK_IMAGE} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-background/80" />

    <div className="container relative z-10 flex flex-col items-center px-6 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="mb-16 max-w-4xl text-5xl font-bold leading-tight tracking-tighter text-foreground md:text-8xl uppercase"
      >
        READY TO MOVE YOUR BUSINESS FORWARD?
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-6 border-b-2 border-primary pb-2 text-2xl md:text-4xl font-bold tracking-widest text-foreground uppercase hover:text-primary transition-colors"
        >
          CONTACT US
          <ArrowRight size={32} className="transition-transform group-hover:translate-x-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
