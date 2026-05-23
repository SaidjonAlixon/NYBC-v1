import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { HeroUsaMap } from "@/components/hero/HeroUsaMap";
import { HERO_STATS } from "@/components/hero/hero-map-data";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { openModal } = useApplicationModal();

  return (
    <section className="relative flex h-[calc(100dvh-5.75rem)] flex-col overflow-hidden md:h-[calc(100dvh-7.5rem)]">
      {/* Full-bleed map — background, not a side panel */}
      <HeroUsaMap variant="hero-immersive" />

      {/* Readability overlays */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/35 to-background/92 dark:from-background/90 dark:via-background/45 dark:to-background/95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_48%,transparent_0%,hsl(var(--background)/0.65)_72%)] dark:bg-[radial-gradient(ellipse_at_50%_48%,transparent_0%,hsl(var(--background)/0.72)_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-background to-transparent"
        aria-hidden
      />

      {/* Editorial content — vertically centered above stats rail */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 text-center md:px-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:gap-5 md:gap-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md dark:border-primary/40 dark:bg-primary/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary sm:text-[11px]">
              Live · NYBC Trucking
            </span>
          </div>

          <h1 className="font-bold leading-[0.9] tracking-tight text-foreground">
            <span className="block text-[clamp(2.35rem,9.5vw,5.5rem)] uppercase">Freight</span>
            <span className="mt-0.5 block text-[clamp(2.35rem,9.5vw,5.5rem)] text-primary">in motion</span>
          </h1>

          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:max-w-xl sm:text-base">
            NYBC Trucking moves cargo coast to coast with modern fleets, 24/7 dispatch, and
            lanes you can see updating in real time.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_12px_48px_hsl(var(--primary)/0.4)] transition-transform hover:scale-[1.02] sm:px-8 sm:py-3.5"
            >
              Start application
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <Link
              href="/drivers"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-colors sm:px-8 sm:py-3.5",
                "border-border/80 bg-background/70 text-foreground hover:border-primary/50",
                "dark:border-white/15 dark:bg-background/50",
              )}
            >
              Explore careers
              <ChevronRight size={18} />
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Bottom metrics rail — pinned to hero bottom, visible at 100% zoom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className={cn(
          "relative z-10 shrink-0 border-t backdrop-blur-xl",
          "border-border/60 bg-background/75",
          "dark:border-white/10 dark:bg-background/80",
        )}
      >
        <div className="container mx-auto grid grid-cols-2 divide-border/60 md:grid-cols-4 md:divide-x dark:divide-white/10">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-3 text-center sm:px-4 md:py-3.5",
                i === 0 && "border-r border-border/60 dark:border-white/10 md:border-r-0",
                i === 1 && "md:border-r md:border-border/60 dark:md:border-white/10",
              )}
            >
              <p className="font-mono text-xl font-bold text-foreground sm:text-2xl md:text-[1.65rem]">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
          <div className="col-span-2 flex flex-col items-center justify-center border-t border-border/60 px-3 py-3 text-center dark:border-white/10 sm:px-4 md:col-span-1 md:border-t-0 md:py-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Network status
            </p>
            <p className="mt-1 flex items-center justify-center gap-2 text-sm font-bold text-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              All lanes active
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
