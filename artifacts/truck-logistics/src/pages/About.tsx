import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Zap, Users, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <main className="w-full flex flex-col bg-background min-h-screen pt-20">
      {/* HERO */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            BUILT ON <span className="text-primary">TRUST.</span><br />
            DRIVEN BY EXCELLENCE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            For over two decades, we've been the backbone of American commerce, delivering on promises with military precision.
          </motion.p>
        </div>
      </section>

      {/* STORY TIMELINE */}
      <section className="py-32 bg-card/30">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold tracking-tighter">OUR STORY</h2>
            <div className="w-20 h-1 bg-primary" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              What started as a single truck operation in 2008 has evolved into one of the nation's premier logistics networks. We didn't just scale our fleet; we reimagined what freight transportation could be by integrating aerospace-grade tracking and predictive analytics.
            </p>
            <ul className="space-y-4">
              {[
                "2008 - Founded with 1 truck",
                "2015 - Expanded to 48 contiguous states",
                "2020 - Launched predictive logistics AI",
                "2024 - Reached 1,200+ daily active routes"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground font-medium">
                  <CheckCircle2 className="text-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] border border-white/10 bg-background rounded-2xl relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
            <Target size={120} className="text-primary/20" />
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 border border-white/5 bg-card/20 rounded-2xl hover:border-primary/50 transition-colors group"
          >
            <h3 className="text-3xl font-bold tracking-tighter mb-4 text-foreground group-hover:text-primary transition-colors">OUR MISSION</h3>
            <p className="text-muted-foreground text-lg">
              To deliver unmatched reliability and speed in freight transportation, empowering American businesses to operate with absolute confidence in their supply chains.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 border border-white/5 bg-card/20 rounded-2xl hover:border-primary/50 transition-colors group"
          >
            <h3 className="text-3xl font-bold tracking-tighter mb-4 text-foreground group-hover:text-primary transition-colors">OUR VISION</h3>
            <p className="text-muted-foreground text-lg">
              To become the benchmark for logistics excellence in North America through technological innovation, uncompromising safety, and relentless dedication to client success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-16">CORE VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={40} />, title: "UNCOMPROMISING SAFETY" },
              { icon: <Zap size={40} />, title: "RELENTLESS SPEED" },
              { icon: <Users size={40} />, title: "RADICAL TRANSPARENCY" }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 bg-card/20 rounded-xl text-center hover:bg-card/40 hover:border-primary/30 transition-all group"
              >
                <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">{val.icon}</div>
                <h3 className="text-xl font-bold tracking-widest">{val.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-card/20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-16">LEADERSHIP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Michael Vance", role: "Chief Executive Officer" },
              { name: "Sarah Chen", role: "VP of Operations" },
              { name: "David Miller", role: "Head of Fleet" },
              { name: "Elena Rodriguez", role: "Chief Technology Officer" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-muted rounded-xl border border-white/5 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                   <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground tracking-tight">{member.name}</h4>
                  <p className="text-primary text-sm font-bold tracking-widest uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
