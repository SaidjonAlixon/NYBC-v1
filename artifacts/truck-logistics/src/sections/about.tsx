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
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tighter">OUR STORY</h2>
          <div className="mt-4 h-1 w-20 bg-primary" />
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            What started as a small operation with a clear purpose has grown into a trusted local
            and regional trucking partner built on reliability, hard work, and relationships.
          </p>
          <p>
            Four years ago, we saw a gap in the transportation industry. Many businesses were
            struggling with delayed deliveries, inconsistent communication, and carriers that
            treated regional freight like an afterthought. We believed local and regional
            transportation deserved the same level of professionalism and attention as long-haul
            operations.
          </p>
          <p>
            So we built a company focused on doing the fundamentals exceptionally well:
          </p>
        </div>

        <ul className="space-y-3">
          {[
            "showing up on time,",
            "communicating clearly,",
            "protecting every load,",
            "and building long-term partnerships with customers.",
          ].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 font-medium text-foreground"
            >
              <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={20} />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            From day one, our focus has been local and regional freight because we understand the
            importance of fast, dependable service within the communities and businesses we serve.
            Whether it&apos;s same-day deliveries, scheduled routes, dedicated lanes, or
            time-sensitive shipments, our team works with urgency and accountability.
          </p>
          <p>
            One of the things that sets our company apart is the lifestyle we provide for our
            drivers and owner-operators. Unlike traditional over-the-road trucking, our local and
            regional routes allow drivers to stay closer to home and spend more time with their
            families. Many owner-operators choose to work with us because they value the balance
            of building a strong career while still being present for the moments that matter most
            at home.
          </p>
          <p>
            What makes us different is our commitment to service and people — both our customers and
            our drivers. We know every shipment represents a customer promise, a production
            schedule, or a business deadline.
          </p>
          <p className="text-foreground">
            As we continue to grow, our mission remains the same: to provide safe, efficient, and
            dependable local and regional trucking solutions while creating opportunities for
            drivers and owner-operators to succeed without sacrificing time with their families.
          </p>
        </div>
      </motion.div>
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

export const TechnologySection = () => {
  const technologies = [
    {
      title: "GPS Fleet Tracking",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80",
      alt: "Highway network and live fleet route tracking",
    },
    {
      title: "AI Dispatch System",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
      alt: "Dispatch dashboard with freight analytics",
    },
    {
      title: "Digital Documentation",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
      alt: "Digital paperwork and compliance documentation",
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-foreground">POWERED BY TECHNOLOGY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-8"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-primary/20 transition-colors group-hover:bg-primary" />
              <h3 className="mb-4 text-xl font-bold text-foreground">{tech.title}</h3>
              <div className="relative h-40 overflow-hidden rounded-lg border border-white/10 bg-background">
                <img
                  src={tech.image}
                  alt={tech.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SafetySection = () => (
  <section className="py-24 bg-card/20">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold tracking-tighter mb-16 text-foreground">SAFETY IS OUR STANDARD</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {['DOT Certified', 'FMCSA Compliant', 'ISO 9001', 'SmartWay Certified', '24/7 Fleet Assistance'].map((c, i) => (
          <div key={i} className="px-8 py-4 border border-white/10 bg-background rounded-full font-bold tracking-widest text-primary shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            {c}
          </div>
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
