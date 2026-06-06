import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Truck, Globe, Map, Clock, Package, BarChart3, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { HeroUsaMap } from "@/components/hero/HeroUsaMap";
export { HeroSection } from "@/components/hero/HeroSection";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Truck size={32} />,
      title: "Freight Transportation",
      desc: "Dependable local and regional freight transportation with on-time deliveries, responsive communication, and real-time shipment visibility.",
    },
    {
      icon: <Map size={32} />,
      title: "Regional Delivery",
      desc: "Regional delivery routes designed for efficiency, fast transit times, and consistent service across neighboring states.",
    },
    {
      icon: <Clock size={32} />,
      title: "Refrigerated Logistics",
      desc: "Temperature-controlled transportation solutions that protect sensitive freight from pickup to final delivery.",
    },
    {
      icon: <Package size={32} />,
      title: "Heavy Cargo",
      desc: "Specialized hauling solutions for heavy equipment, industrial materials, and oversized regional shipments.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Fleet Solutions",
      desc: "Flexible fleet solutions tailored to support recurring routes, dedicated deliveries, and growing transportation demands.",
    },
    {
      icon: <Globe size={32} />,
      title: "Nationwide Shipping",
      desc: "Expanded shipping coverage through trusted logistics partnerships, connecting local freight to destinations across the country.",
    },
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
    <section className="relative overflow-hidden bg-background py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-60"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tighter md:text-5xl"
          >
            OUR NATIONAL COVERAGE
          </motion.h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-primary" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            NYBC Trucking connects coast-to-coast through eight strategic hubs — with live freight lanes
            across all 48 continental states.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card/40 shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-card/30 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-20"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <HeroUsaMap variant="coverage" />
        </motion.div>
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
    {
      tag: "Technology",
      title: "The Future of American Freight: AI-Powered Dispatch",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
      alt: "Dispatch dashboard and freight technology",
    },
    {
      tag: "Safety",
      title: "2024 Safety Compliance Guide for OTR Drivers",
      image:
        "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=500&fit=crop&q=80",
      alt: "Semi truck on the highway",
    },
    {
      tag: "Market Trends",
      title: "Why Cold Chain Logistics is America's Fastest Growing Sector",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&q=80",
      alt: "Warehouse logistics and cold chain operations",
    },
  ];
  return (
    <section className="py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">WEEKLY NEWS</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Fresh updates from the road — fleet news, safety tips, and market trends every week.
          </p>
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
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={art.image}
                  alt={art.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
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

const CTA_TRUCK_IMAGE =
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop&q=80";

export const CtaSection = () => (
  <section className="relative flex items-center justify-center overflow-hidden bg-background py-40">
    <img
      src={CTA_TRUCK_IMAGE}
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/72 to-background/92 dark:from-[hsl(223_55%_9%)]/94 dark:via-[hsl(223_55%_9%)]/78 dark:to-[hsl(223_55%_9%)]/94" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.45)_100%)]" />

    <div className="container relative z-10 flex flex-col items-center px-6 text-center">
      <h2 className="mb-8 max-w-3xl text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-6xl">
        READY TO MOVE YOUR BUSINESS FORWARD?
      </h2>
      <Link
        href="/contact"
        className="group inline-flex items-center gap-4 bg-primary px-10 py-5 text-lg font-bold tracking-widest text-primary-foreground shadow-[0_0_30px_rgba(193,18,31,0.4)] transition-all hover:scale-105 hover:bg-primary/90"
      >
        CONTACT US
        <ArrowRight className="transition-transform group-hover:translate-x-2" />
      </Link>
    </div>
  </section>
);
