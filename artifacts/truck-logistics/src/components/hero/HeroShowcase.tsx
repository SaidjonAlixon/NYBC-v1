import { motion } from "framer-motion";
import { ArrowRight, Truck, Headphones, Map } from "lucide-react";
import { HERO_SHOWCASE } from "@/components/hero/hero-map-data";
import { cn } from "@/lib/utils";

const icons = [Truck, Headphones, Map] as const;

const cardMotion = [
  { rotate: -4, y: 24, scale: 0.94 },
  { rotate: 0, y: 0, scale: 1.05 },
  { rotate: 4, y: 24, scale: 0.94 },
] as const;

export function HeroShowcase() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
        aria-hidden
      />

      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Operations</p>
        <h2 className="mt-1 text-lg font-bold uppercase tracking-tight text-foreground dark:text-white md:text-xl">
          Built for the road ahead
        </h2>
      </div>

      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth md:grid md:grid-cols-3 md:items-end md:gap-8 md:overflow-visible md:pb-0 [perspective:1200px]">
        {HERO_SHOWCASE.map((card, i) => {
          const Icon = icons[i] ?? Truck;
          const pose = cardMotion[i] ?? cardMotion[0];
          const featured = i === 1;

          return (
            <motion.article
              key={card.title}
              data-showcase-card
              initial={{ opacity: 0, y: 60, rotate: pose.rotate }}
              animate={{ opacity: 1, y: pose.y, rotate: pose.rotate, scale: pose.scale }}
              transition={{ delay: 0.75 + i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: pose.y - 14, scale: featured ? 1.08 : pose.scale + 0.03 }}
              className={cn(
                "group relative min-w-[min(82vw,300px)] shrink-0 snap-center md:min-w-0",
                featured ? "md:z-20" : "md:z-10",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border transition-all duration-500",
                  "border-white/10 bg-[hsl(223_50%_8%)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                  "dark:border-white/12 dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
                  "group-hover:border-primary/50 group-hover:shadow-[0_28px_90px_rgba(0,0,0,0.45),0_0_40px_hsl(var(--primary)/0.15)]",
                  featured && "ring-1 ring-primary/25",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    featured ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[3/4.2] md:aspect-[3/4]",
                  )}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,28,0.15)_0%,rgba(8,14,28,0.55)_45%,rgba(8,14,28,0.95)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,hsl(var(--primary)/0.22)_0%,transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]" />

                  <span className="absolute left-0 top-8 h-12 w-1 rounded-r-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.8)]" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/35 text-primary backdrop-blur-md">
                      <Icon size={16} strokeWidth={2.2} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                      {card.tag}
                    </span>
                  </div>

                  <span
                    className="pointer-events-none absolute -right-2 top-2 select-none font-mono text-[5.5rem] font-black leading-none text-white/[0.06] md:text-[6.5rem]"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">0{i + 1}</p>
                    <h3 className="mt-2 text-xl font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-white/65">{card.sub}</p>

                    <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 transition-colors group-hover:text-primary">
                      <span>Explore</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  <CornerMarks />
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {featured && (
                <div
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-primary/10 blur-2xl"
                  aria-hidden
                />
              )}
            </motion.article>
          );
        })}
      </div>

      <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60 sm:hidden">
        Swipe →
      </p>
    </div>
  );
}

function CornerMarks() {
  const corners = [
    "left-3 top-3 border-l-2 border-t-2",
    "right-3 top-3 border-r-2 border-t-2",
    "left-3 bottom-3 border-b-2 border-l-2",
    "right-3 bottom-3 border-b-2 border-r-2",
  ] as const;

  return (
    <>
      {corners.map((c) => (
        <span
          key={c}
          className={cn(
            "pointer-events-none absolute h-5 w-5 border-primary/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            c,
          )}
          aria-hidden
        />
      ))}
    </>
  );
}
