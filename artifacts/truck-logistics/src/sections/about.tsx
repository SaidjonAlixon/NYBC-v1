import { motion } from "framer-motion";
import { Shield, Target, Zap, Users, CheckCircle2 } from "lucide-react";

export const AboutHero = () => (
  <section className="py-24 md:py-32 relative border-b border-white/5 bg-background overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground"
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
);

export const CompanyStory = () => (
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
            <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*0.1 }} className="flex items-center gap-4 text-foreground font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4"
      >
        {[
          { v: "16", l: "Years in Business" },
          { v: "48", l: "States" },
          { v: "1,200+", l: "Routes" },
          { v: "500+", l: "Drivers" }
        ].map((s, i) => (
          <div key={i} className="bg-background border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center justify-center shadow-lg hover:border-primary/50 transition-all">
            <span className="text-4xl font-bold text-primary mb-2">{s.v}</span>
            <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">{s.l}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export const JourneyTimeline = () => (
  <section className="py-32 bg-background border-y border-white/5">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16">OUR JOURNEY</h2>
      <div className="flex overflow-x-auto gap-8 pb-8 snap-x">
        {[
          { y: "2008", t: "Founded", d: "Started with a single truck." },
          { y: "2010", t: "First 10 trucks", d: "Expanded operations." },
          { y: "2013", t: "Midwest expansion", d: "Opened regional hubs." },
          { y: "2015", t: "National coverage", d: "48 states operational." },
          { y: "2018", t: "Fleet modernization", d: "All new equipment." },
          { y: "2020", t: "AI dispatch", d: "Tech integration." }
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} className="min-w-[250px] snap-center p-6 border border-white/10 bg-card rounded-xl">
            <h3 className="text-4xl font-bold text-primary mb-4">{m.y}</h3>
            <h4 className="text-xl font-bold mb-2 text-foreground">{m.t}</h4>
            <p className="text-muted-foreground">{m.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const CeoMessage = () => (
  <section className="py-32 bg-card/20 relative">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <span className="text-8xl text-primary font-serif leading-none absolute top-10 left-10 opacity-20">"</span>
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug mb-12 text-foreground relative z-10 italic">
        Our drivers don't just move freight. They move America forward. Every mile is a commitment.
      </h2>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 mb-4 border border-primary/50" />
        <h4 className="font-bold text-lg text-foreground">Michael Vance</h4>
        <span className="text-primary font-bold tracking-widest text-sm uppercase">CEO & Founder</span>
      </div>
    </div>
  </section>
);

export const MissionVision = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 border border-white/5 bg-card/20 rounded-2xl hover:border-primary/50 transition-colors group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-3xl font-bold tracking-tighter mb-6 text-foreground group-hover:text-primary transition-colors">OUR MISSION</h3>
        <p className="text-muted-foreground text-lg relative z-10">
          To deliver unmatched reliability and speed in freight transportation, empowering American businesses to operate with absolute confidence in their supply chains. We strive to be the invisible force that makes commerce happen.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-12 border border-white/5 bg-card/20 rounded-2xl hover:border-primary/50 transition-colors group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-3xl font-bold tracking-tighter mb-6 text-foreground group-hover:text-primary transition-colors">OUR VISION</h3>
        <p className="text-muted-foreground text-lg relative z-10">
          To become the benchmark for logistics excellence in North America through technological innovation, uncompromising safety, and relentless dedication to client success. The future of freight is connected, and we are building it.
        </p>
      </motion.div>
    </div>
  </section>
);

export const CoreValues = () => (
  <section className="py-24 bg-card/10">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">CORE VALUES</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Shield size={40} />, title: "SAFETY", desc: "Our highest priority." },
          { icon: <Zap size={40} />, title: "PRECISION", desc: "Exact execution." },
          { icon: <Target size={40} />, title: "RELIABILITY", desc: "Always on time." },
          { icon: <Users size={40} />, title: "INNOVATION", desc: "Tech-driven." },
          { icon: <CheckCircle2 size={40} />, title: "TRANSPARENCY", desc: "Clear communication." }
        ].map((val, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-10 border border-white/5 bg-card rounded-xl text-center hover:bg-background hover:border-primary/30 transition-all group">
            <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">{val.icon}</div>
            <h3 className="text-xl font-bold tracking-widest mb-2">{val.title}</h3>
            <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{val.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const TechnologySection = () => (
  <section className="py-32 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">POWERED BY TECHNOLOGY</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['GPS Fleet Tracking', 'AI Dispatch System', 'Digital Documentation'].map((tech, i) => (
          <div key={i} className="bg-card p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
            <h3 className="text-xl font-bold mb-4">{tech}</h3>
            <div className="h-32 bg-background border border-white/10 rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-bold tracking-widest">[ SYSTEM UI ]</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SafetySection = () => (
  <section className="py-24 bg-card/20">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold tracking-tighter mb-16 text-foreground">SAFETY IS OUR STANDARD</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {['DOT Certified', 'FMCSA Compliant', 'ISO 9001', 'SmartWay Certified'].map((c, i) => (
          <div key={i} className="px-8 py-4 border border-white/10 bg-background rounded-full font-bold tracking-widest text-primary shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            {c}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CompanyStats = () => (
  <section className="py-32 bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
      {[
        { v: "500+", l: "Trucks in Fleet" },
        { v: "48", l: "States Covered" },
        { v: "16", l: "Years Operating" },
        { v: "1.2M+", l: "Miles Monthly" },
        { v: "98.7%", l: "Safety Record" },
        { v: "4.9★", l: "Client Rating" }
      ].map((s, i) => (
        <div key={i}>
          <div className="text-5xl md:text-6xl font-bold mb-2">{s.v}</div>
          <div className="text-sm font-bold tracking-widest opacity-80 uppercase">{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

export const LeadershipSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">LEADERSHIP</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Michael Vance", role: "CEO" },
          { name: "Sarah Chen", role: "VP Operations" },
          { name: "David Miller", role: "Head of Fleet" },
          { name: "Elena Rodriguez", role: "CTO" }
        ].map((member, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col gap-4 group cursor-pointer">
            <div className="aspect-[3/4] bg-card rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-primary/50 transition-all">
              <span className="text-4xl font-bold text-muted-foreground group-hover:text-primary transition-colors">{member.name[0]}</span>
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
);

export const ValuesBanner = () => (
  <section className="py-12 bg-card/50 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee w-max gap-8 text-4xl font-bold tracking-tighter text-muted-foreground/30">
      <span>SAFETY • PRECISION • RELIABILITY • INNOVATION • TRANSPARENCY • EXCELLENCE • INTEGRITY • DEDICATION •</span>
      <span>SAFETY • PRECISION • RELIABILITY • INNOVATION • TRANSPARENCY • EXCELLENCE • INTEGRITY • DEDICATION •</span>
    </div>
  </section>
);
