import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Map, Truck as TruckIcon, Award, Headphones, ShieldPlus } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Drivers() {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 3000);
  };

  const benefits = [
    { icon: <DollarSign size={24} />, title: "Top-Tier Pay", desc: "Industry-leading CPM and weekly performance bonuses." },
    { icon: <Map size={24} />, title: "Flexible Routes", desc: "Choose between local, regional, or long-haul depending on your lifestyle." },
    { icon: <TruckIcon size={24} />, title: "Modern Fleet", desc: "Drive 2022 or newer models equipped with premium amenities." },
    { icon: <Award size={24} />, title: "Sign-on Bonus", desc: "$5,000 sign-on bonus for experienced drivers." },
    { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Dedicated dispatch team always available." },
    { icon: <ShieldPlus size={24} />, title: "Full Benefits", desc: "Comprehensive health, dental, and 401(k) matching." },
  ];

  return (
    <main className="w-full flex flex-col bg-background min-h-screen pt-20">
      <section className="py-24 text-center border-b border-white/5 bg-card/20">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase"
          >
            Drive With The <span className="text-primary">Best</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join one of America's fastest-growing logistics companies. We treat our drivers like the backbone of our business, because they are.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-card/30 rounded-xl hover:border-primary/50 transition-colors flex flex-col items-start text-left"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">REQUIREMENTS</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>
          <div className="space-y-6">
            {[
              "Valid Class A CDL License",
              "Clean driving record (no major violations in past 3 years)",
              "Minimum 2+ years of OTR experience",
              "Must pass DOT physical and drug screen",
              "Professional, responsible, and safety-oriented mindset"
            ].map((req, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 border border-white/5 bg-card/20 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="font-medium text-foreground">{req}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-card/10 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">APPLY NOW</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-widest text-muted-foreground">FULL NAME</label>
                <input {...register("name", { required: true })} className="w-full bg-background border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-widest text-muted-foreground">PHONE</label>
                <input {...register("phone", { required: true })} className="w-full bg-background border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest text-muted-foreground">EMAIL</label>
              <input type="email" {...register("email", { required: true })} className="w-full bg-background border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-widest text-muted-foreground">EXPERIENCE</label>
                <select {...register("experience")} className="w-full bg-background border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                  <option value="1-2">1-2 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-widest text-muted-foreground">CDL TYPE</label>
                <select {...register("cdl")} className="w-full bg-background border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground appearance-none">
                  <option value="A">Class A</option>
                  <option value="B">Class B</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all mt-4">
              {submitted ? "APPLICATION RECEIVED" : "SUBMIT APPLICATION"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
