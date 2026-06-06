import { motion } from "framer-motion";
import { HeroUsaMap } from "@/components/hero/HeroUsaMap";
import { HERO_SHOWCASE, HERO_SHOWCASE_LAYOUT, HERO_STATS } from "@/components/hero/hero-map-data";
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

      <div className="relative z-20 flex min-h-[min(50dvh,480px)] flex-col items-center justify-center px-4 pb-10 pt-24 text-center md:min-h-[min(46dvh,440px)] md:px-6 md:pt-28 md:pb-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 md:gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-primary sm:text-[11px]">
            <AnimatedWords text="NYBC Trucking · Live nationwide" startDelay={0.05} stagger={0.06} />
          </p>

          <h1 className="font-bold leading-[0.95] tracking-tight">
            <span className="block text-[clamp(2.25rem,9vw,5.25rem)] uppercase text-foreground dark:text-white">
              <AnimatedWords text={headlineLine1} startDelay={0.18} />
            </span>
            <span className="mt-1 block text-[clamp(2.25rem,9vw,5.25rem)] uppercase text-primary">
              <AnimatedWords text={headlineLine2} startDelay={line2Start} />
            </span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg dark:text-white/70">
            <AnimatedWords text={subtitle} startDelay={subtitleStart} stagger={0.05} />
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-4 w-full max-w-6xl px-4 pb-4 md:mt-6 md:px-6 md:pb-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-center sm:gap-4 md:gap-5 lg:gap-6">
          {HERO_SHOWCASE.map((card, i) => {
            const layout = HERO_SHOWCASE_LAYOUT[i];
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative w-full max-w-[340px] shrink-0 overflow-hidden rounded-[1.5rem] border transition-all duration-500",
                  "border-border/80 shadow-[0_16px_44px_rgba(15,23,42,0.14)]",
                  "hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_24px_56px_rgba(15,23,42,0.2)]",
                  "dark:border-white/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
                  layout.size,
                  layout.offset,
                  layout.z,
                  i === 0 && "sm:ml-0 sm:max-w-[300px]",
                  i === 1 && "sm:max-w-[340px]",
                  i === 2 && "sm:mr-0 sm:max-w-[300px]",
                )}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    0{i + 1}
                  </p>
                  <h3 className="mt-1 text-base font-bold tracking-tight text-white md:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/80">{card.sub}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
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
