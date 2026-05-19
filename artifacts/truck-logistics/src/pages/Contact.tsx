import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Navigation2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 3000);
  };

  const contactInfo = [
    { icon: <Phone size={24} />, title: "DISPATCH", detail: "1-800-555-0199" },
    { icon: <Mail size={24} />, title: "EMAIL", detail: "operations@amtruck.com" },
    { icon: <MapPin size={24} />, title: "HQ", detail: "Dallas, TX - Logistics Hub" },
    { icon: <Navigation2 size={24} />, title: "HOURS", detail: "24/7/365 Operations" },
  ];

  return (
    <main className="w-full flex flex-col bg-background min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase"
          >
            Move Forward <span className="text-primary">Together</span>
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to optimize your supply chain? Our logistics experts are standing by.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 border border-white/5 bg-card/20 rounded-xl"
                  >
                    <div className="text-primary mb-4">{info.icon}</div>
                    <h4 className="font-bold tracking-widest text-sm mb-1">{info.title}</h4>
                    <p className="text-muted-foreground">{info.detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="h-[300px] rounded-xl overflow-hidden border border-white/10 relative bg-muted">
                 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold tracking-widest">
                   [ INTERACTIVE DARK MAP EMBED ]
                 </div>
              </div>
            </div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 border border-white/5 bg-card/30 rounded-2xl"
            >
              <h3 className="text-2xl font-bold tracking-tighter mb-8">REQUEST A QUOTE</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground">COMPANY / NAME</label>
                  <input {...register("name", { required: true })} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-muted-foreground">EMAIL</label>
                    <input type="email" {...register("email", { required: true })} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-muted-foreground">PHONE</label>
                    <input {...register("phone", { required: true })} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground">FREIGHT DETAILS</label>
                  <textarea rows={4} {...register("message")} className="w-full bg-background border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold tracking-widest hover:bg-primary/90 transition-all">
                  {submitted ? "MESSAGE SENT" : "SEND INQUIRY"}
                </button>
              </form>
            </motion.div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
