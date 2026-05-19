import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Globe, Clock, Package, BarChart3, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  { icon: <Truck size={32} />, title: "Freight Transportation", desc: "Reliable full truckload shipping across North America with real-time tracking." },
  { icon: <Globe size={32} />, title: "Long Haul Delivery", desc: "Cross-country routes optimized for speed and maximum efficiency." },
  { icon: <Clock size={32} />, title: "Refrigerated Logistics", desc: "Temperature-controlled freight ensuring product integrity from origin to destination." },
  { icon: <Package size={32} />, title: "Heavy Cargo", desc: "Specialized equipment for oversized and overweight shipments." },
  { icon: <BarChart3 size={32} />, title: "Fleet Solutions", desc: "Dedicated capacity tailored to your specific supply chain needs." },
  { icon: <ShieldCheck size={32} />, title: "Nationwide Shipping", desc: "Comprehensive network covering all 48 contiguous states." },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "1,200+", label: "Daily Deliveries" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Dispatch Support" }
];

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
          {/* Animated highway effect placeholder */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }} />
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
              <span className="text-sm font-bold tracking-widest text-primary">AMERICA'S TRUSTED PARTNER</span>
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
              <Link href="/services" className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(193,18,31,0.3)]">
                EXPLORE SERVICES
              </Link>
              <Link href="/contact" className="px-8 py-4 border border-border bg-background/50 backdrop-blur text-foreground font-bold tracking-widest hover:border-primary/50 transition-all hover:bg-primary/10 hover:scale-105">
                CONTACT US
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block relative h-[600px]"
          >
             {/* Stylized CSS Truck Visual */}
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

      {/* SERVICES SECTION */}
      <section className="py-32 relative z-10 bg-card/50">
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
                whileHover={{ y: -10 }}
                className="p-8 rounded-xl bg-background border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden"
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

      {/* STATS SECTION */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
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
      
      {/* FLEET SECTION */}
      <section className="py-24 bg-card/20">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">OUR FLEET</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {[
              { type: "Dry Van", capacity: "45,000 lbs", best: "General Freight" },
              { type: "Reefer", capacity: "43,000 lbs", best: "Temperature Control" },
              { type: "Flatbed", capacity: "48,000 lbs", best: "Oversized Loads" },
              { type: "Step Deck", capacity: "48,000 lbs", best: "Tall Cargo" }
            ].map((truck, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[400px] snap-center p-8 bg-background border border-white/5 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="h-40 bg-muted mb-6 flex items-center justify-center rounded-lg border border-white/10 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                   <Truck size={64} className="text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{truck.type}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-bold text-primary">{truck.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For:</span>
                    <span className="font-bold text-foreground">{truck.best}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">CLIENT SUCCESS</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>
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
                className="p-8 bg-card/50 backdrop-blur border border-white/5 rounded-xl flex flex-col gap-6"
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

      {/* CTA SECTION */}
      <section className="py-40 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-primary/20 shadow-[0_0_50px_rgba(193,18,31,1)]" />
        
        <div className="container relative z-10 px-6 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight max-w-3xl">
            READY TO MOVE YOUR BUSINESS FORWARD?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-bold tracking-widest text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(193,18,31,0.4)] group">
            START NOW
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
