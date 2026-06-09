import { motion } from "framer-motion";
import { HeroUsaMap } from "@/components/hero/HeroUsaMap";
import { HeroShowcase } from "@/components/hero/HeroShowcase";
import { HERO_STATS } from "@/components/hero/hero-map-data";
import { cn } from "@/lib/utils";

const wordEase = [0.22, 1, 0.36, 1] as const;

function AnimatedWords({
  text,
  className,
  startDelay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: startDelay + i * stagger,
            duration: 0.48,
            ease: wordEase,
          }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const headlineLine1 = "Built For Regional.";
  const headlineLine2 = "Trusted Nationally";
  const subtitle =
    "Reliable transportation solutions tailored for dependable local and regional freight operations.";
  const line1WordCount = headlineLine1.split(" ").length;
  const line2Start = 0.18 + line1WordCount * 0.07 + 0.08;
  const subtitleStart = line2Start + headlineLine2.split(" ").length * 0.07 + 0.12;

  return (
    <section
      className={cn(
        "relative min-h-[100dvh] overflow-hidden transition-colors duration-500",
        "bg-gradient-to-b from-slate-50 via-white to-slate-100 text-foreground",
        "dark:bg-none dark:bg-[hsl(223_55%_9%)] dark:text-white",
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.22]">
        <HeroUsaMap variant="hero-immersive" />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-b from-white/90 via-white/55 to-slate-100/95",
          "dark:from-[hsl(223_55%_9%)] dark:via-[hsl(223_50%_11%)/0.92] dark:to-[hsl(223_55%_8%)]",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,hsl(var(--primary)/0.08)_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_20%,hsl(var(--primary)/0.12)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-20 container mx-auto flex min-h-[min(70dvh,620px)] flex-col justify-center px-6 pb-10 pt-32">
        <div className="flex w-full max-w-3xl flex-col items-start gap-8 text-left">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 border-b border-primary pb-2 pr-8">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">Live Nationwide Tracking</p>
          </motion.div>

          <h1 className="font-bold leading-[0.85] tracking-tighter">
            <span className="block text-[clamp(3.5rem,8vw,8rem)] uppercase text-foreground">
              Built For<br/>Regional.
            </span>
            <span className="mt-2 block text-[clamp(3.5rem,8vw,8rem)] uppercase text-primary text-outline">
              Trusted<br/>Nationally.
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="max-w-xl text-xl md:text-2xl font-medium leading-relaxed text-muted-foreground mt-4">
            Reliable transportation solutions tailored for dependable local and regional freight operations.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
        <HeroShowcase />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className={cn(
          "relative z-10 border-t backdrop-blur-md transition-colors duration-500",
          "border-border/80 bg-white/80",
          "dark:border-white/10 dark:bg-[hsl(223_50%_7%)]/90",
        )}
      >
        <div
          className={cn(
            "container mx-auto grid grid-cols-2 md:grid-cols-4",
            "divide-border/80 dark:divide-white/10 md:divide-x",
          )}
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center justify-center px-4 py-4 text-center md:py-5",
                i === 0 && "border-r border-border/80 dark:border-white/10 md:border-r-0",
                i === 1 && "md:border-r md:border-border/80 dark:md:border-white/10",
              )}
            >
              <p className="font-mono text-xl font-bold text-foreground sm:text-2xl dark:text-white">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
          <div className="col-span-2 flex flex-col items-center justify-center border-t border-border/80 px-4 py-4 text-center dark:border-white/10 md:col-span-1 md:border-t-0 md:py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground dark:text-white/50">
              Network status
            </p>
            <p className="mt-1 flex items-center justify-center gap-2 text-sm font-bold text-foreground dark:text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              All lanes active
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
