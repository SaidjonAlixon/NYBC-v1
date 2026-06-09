import { motion } from "framer-motion";
import { Shield, Target, Zap, Users, CheckCircle2 } from "lucide-react";

export const AboutHero = () => (
  <section className="pt-40 pb-20 md:pt-56 md:pb-32 bg-background">
    <div className="container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <h1 className="text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-bold tracking-tighter uppercase text-foreground mb-16 md:mb-24">
          Built on <span className="text-primary text-outline">Trust.</span><br />
          Driven by excellence.
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 border-t border-b border-border py-12 md:py-16">
          <div className="lg:col-span-5 lg:pr-16 flex items-center lg:border-r border-border relative">
            <div className="absolute top-0 left-0 w-8 h-1 bg-primary" />
            <p className="text-2xl md:text-4xl leading-tight font-medium text-foreground">
              For over two decades, we've been the backbone of American commerce, delivering on promises with absolute precision and <span className="text-primary italic">unbreakable reliability.</span>
            </p>
          </div>
          
          <div className="lg:col-span-7 lg:pl-16 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
            {[
              { label: "ESTABLISHED", value: "2004" },
              { label: "HEADQUARTERS", value: "KANSAS CITY, MO" },
              { label: "ACTIVE FLEET", value: "1,200+" },
              { label: "STATES COVERED", value: "48" },
              { label: "ON-TIME DELIVERY", value: "99.8%" },
              { label: "CLIENT RETENTION", value: "95%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                className="flex flex-col group"
              >
                <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500 mb-4" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {stat.label}
                </span>
                <span className="text-2xl md:text-4xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const CompanyStory = () => (
  <section className="py-32 bg-background relative border-t border-border">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Sticky Header / Sidebar */}
        <div className="lg:col-span-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-40 flex flex-col gap-12"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                Our <br className="hidden lg:block"/>
                <span className="text-primary">Story</span>
              </h2>
              <div className="mt-8 h-px w-20 bg-primary" />
              <p className="mt-8 text-muted-foreground font-bold tracking-widest uppercase text-xs">A foundation of reliability</p>
            </div>

            {/* Antiqa/Unique Image & Card */}
            <div className="hidden lg:flex flex-col gap-8">
              <div className="relative rounded-[2rem] overflow-hidden group border border-border bg-card p-2 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=800" 
                    alt="Vintage Trucking" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <p className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-2">Heritage</p>
                    <p className="text-white text-2xl font-bold tracking-tight">Built on solid ground since day one.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Content */}
        <div className="lg:col-span-7 lg:col-start-6 space-y-16 text-xl md:text-3xl leading-snug tracking-tight text-foreground font-medium">
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            What started as a small operation with a clear purpose has grown into a trusted local
            and regional trucking partner built on reliability, hard work, and relationships.
          </motion.p>
          
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-muted-foreground">
            Four years ago, we saw a gap in the transportation industry. Many businesses were
            struggling with delayed deliveries, inconsistent communication, and carriers that
            treated regional freight like an afterthought.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="pl-8 border-l-4 border-primary py-4">
            <p className="text-2xl md:text-4xl italic font-bold">
              "We built a company focused on doing the fundamentals exceptionally well."
            </p>
          </motion.div>

          <ul className="space-y-6 text-lg md:text-2xl pt-8">
            {[
              "Showing up strictly on time",
              "Communicating with absolute clarity",
              "Protecting every single load",
              "Building long-term partnerships",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            What makes us different is our commitment to service and people — both our customers and
            our drivers. We know every shipment represents a customer promise, a production
            schedule, or a business deadline.
          </motion.p>
        </div>
      </div>
    </div>
  </section>
);

export const MissionVision = () => (
  <section className="py-32 bg-card">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
          <div className="text-primary font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-4">
            <span>01</span>
            <div className="h-px bg-border flex-1" />
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 group-hover:text-primary transition-colors duration-500">MISSION</h3>
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-medium">
            To deliver unmatched reliability and speed in freight transportation, empowering businesses to operate with absolute confidence. We are the invisible force that makes commerce happen.
          </p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group">
          <div className="text-primary font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-4">
            <span>02</span>
            <div className="h-px bg-border flex-1" />
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 group-hover:text-primary transition-colors duration-500">VISION</h3>
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-medium">
            To become the benchmark for logistics excellence in North America through technological innovation, uncompromising safety, and relentless dedication to client success.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export const CoreValues = () => {
  const values = [
    { icon: <Shield size={40} />, title: "SAFETY", desc: "Our highest priority, uncompromising. We protect our people, cargo, and community at every turn.", span: "md:col-span-6 lg:col-span-5", color: "from-blue-500/10 to-transparent" },
    { icon: <Zap size={40} />, title: "PRECISION", desc: "Exact execution on every route. We leverage data and experience to eliminate guesswork.", span: "md:col-span-6 lg:col-span-7", color: "from-yellow-500/10 to-transparent" },
    { icon: <Target size={40} />, title: "RELIABILITY", desc: "Delivering on our promises, always. When we commit to a timeline, we make it happen.", span: "md:col-span-4 lg:col-span-4", color: "from-primary/10 to-transparent" },
    { icon: <Users size={40} />, title: "INNOVATION", desc: "Driven by advanced technology to continuously improve our fleet, tracking, and communication.", span: "md:col-span-4 lg:col-span-4", color: "from-emerald-500/10 to-transparent" },
    { icon: <CheckCircle2 size={40} />, title: "TRANSPARENCY", desc: "Radical honesty and clear communication. No hidden fees, no obscured routes, just truth.", span: "md:col-span-4 lg:col-span-4", color: "from-purple-500/10 to-transparent" }
  ];

  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none"
          >
            CORE <span className="text-primary text-outline">VALUES</span>
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-1 bg-primary mx-auto mt-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 max-w-6xl mx-auto">
          {values.map((val, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: i * 0.1, duration: 0.6 }} 
              className={`relative bg-card border border-border rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-primary/50 transition-colors duration-500 ${val.span}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-16">
                  <div className="text-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 origin-top-left">
                    {val.icon}
                  </div>
                  <span className="text-6xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors duration-500 select-none leading-none">
                    0{i+1}
                  </span>
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">{val.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">{val.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TechnologySection = () => {
  return null; // Removed in favor of minimal design, or we can keep it ultra minimal. Let's omit to reduce clutter if it's not strictly necessary, or rewrite minimally.
};

export const SafetySection = () => null;
export const ValuesBanner = () => null;
