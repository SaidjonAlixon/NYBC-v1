import { memo, useMemo, useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usaMap from "@svg-maps/usa";
import { useTheme } from "@/hooks/useTheme";

type MapLocation = { id: string; name: string; path: string };
import { cn } from "@/lib/utils";
import {
  CITIES,
  ROUTES,
  GLASS_CARDS_TOP,
  GLASS_CARD_BOTTOM,
  COVERAGE_STATS,
  cityById,
  routePath,
  MAP_VIEWBOX,
  MAP_VIEWBOX_COVERAGE,
  type CityId,
} from "./hero-map-data";

const CONTINENTAL_IDS = new Set([
  "al", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "id", "il", "in", "ia",
  "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv",
  "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd",
  "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy", "dc",
]);

type HeroUsaMapProps = {
  variant?: "hero" | "coverage";
};

function CityTooltip({
  city,
  isDark,
}: {
  city: (typeof CITIES)[0];
  isDark: boolean;
}) {
  const label = city.label.toUpperCase();
  const w = label.length * 6.2 + 20;
  const h = 24;
  const x = city.x - w / 2;
  const y = city.y - 44;

  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18 }}
      pointerEvents="none"
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        className={cn(
          isDark
            ? "fill-[hsl(222_47%_11%/0.95)] stroke-white/15"
            : "fill-white/95 stroke-slate-200/90",
        )}
        strokeWidth={1}
      />
      <text
        x={city.x}
        y={y + 16}
        textAnchor="middle"
        className={cn(
          "select-none font-bold tracking-widest",
          isDark ? "fill-foreground" : "fill-slate-800",
        )}
        style={{ fontSize: 10 }}
      >
        {label}
      </text>
    </motion.g>
  );
}

function GlassStatCard({
  title,
  sub,
  isDark,
  className,
}: {
  title: string;
  sub: string;
  isDark: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3.5 py-2.5 backdrop-blur-md transition-colors duration-500",
        isDark
          ? "border-white/10 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "border-slate-200/80 bg-white/70 shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-widest",
          isDark ? "text-foreground" : "text-slate-800",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-0.5 text-[10px] leading-snug",
          isDark ? "text-muted-foreground" : "text-slate-500",
        )}
      >
        {sub}
      </p>
    </div>
  );
}

function UsaMapSvg({
  isDark,
  uid,
  hoveredCity,
  setHoveredCity,
  viewBox = MAP_VIEWBOX,
  emphasis = "hero",
}: {
  isDark: boolean;
  uid: string;
  hoveredCity: CityId | null;
  setHoveredCity: (id: CityId | null) => void;
  viewBox?: string;
  emphasis?: "hero" | "coverage";
}) {
  const isCoverage = emphasis === "coverage";
  const states = useMemo(
    () =>
      (usaMap.locations as MapLocation[]).filter((loc) =>
        CONTINENTAL_IDS.has(loc.id),
      ),
    [],
  );

  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full max-h-full max-w-full"
      aria-label="NYBC Trucking USA network map"
      role="img"
      preserveAspectRatio={isCoverage ? "xMidYMid slice" : "xMidYMid meet"}
    >
      <defs>
        <filter id={`${uid}-glow-red`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isCoverage ? 5 : 4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-glow-green`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`${uid}-route-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor={isDark ? "hsl(var(--primary))" : "hsl(355 75% 48%)"}
            stopOpacity={isDark ? 0.9 : 0.55}
          />
          <stop
            offset="100%"
            stopColor={isDark ? "hsl(215 90% 60%)" : "hsl(215 40% 55%)"}
            stopOpacity={isDark ? 0.5 : 0.35}
          />
        </linearGradient>
      </defs>

      <g
        className={cn(
          "transition-[fill,stroke] duration-500",
          isDark
            ? isCoverage
              ? "[&_path]:fill-[hsl(222_47%_11%/0.72)]"
              : "[&_path]:fill-[hsl(222_47%_9%/0.55)]"
            : isCoverage
              ? "[&_path]:fill-[hsl(210_20%_94%/0.95)]"
              : "[&_path]:fill-[hsl(210_25%_96%/0.85)]",
        )}
      >
        {states.map((state) => (
          <path
            key={state.id}
            d={state.path}
            className={cn(
              "transition-[stroke] duration-500",
              isDark
                ? isCoverage
                  ? "stroke-white/25 hover:stroke-white/40"
                  : "stroke-white/[0.14] hover:stroke-white/25"
                : isCoverage
                  ? "stroke-slate-400/95 hover:stroke-slate-500"
                  : "stroke-slate-300/90 hover:stroke-slate-400",
            )}
            strokeWidth={isCoverage ? 1.35 : 1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {ROUTES.map((route) => {
        const from = cityById(route.from);
        const to = cityById(route.to);
        const d = routePath(from, to);
        return (
          <motion.path
            key={`${route.from}-${route.to}`}
            d={d}
            fill="none"
            stroke={`url(#${uid}-route-gradient)`}
            strokeWidth={isCoverage ? (isDark ? 1.75 : 1.4) : isDark ? 1.25 : 1}
            strokeLinecap="round"
            strokeDasharray={isCoverage ? "5 8" : "6 10"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0.15, 1, 0.15],
              opacity: isDark
                ? isCoverage
                  ? [0.35, 0.85, 0.35]
                  : [0.25, 0.65, 0.25]
                : isCoverage
                  ? [0.3, 0.65, 0.3]
                  : [0.2, 0.5, 0.2],
              strokeDashoffset: [0, -32],
            }}
            transition={{
              pathLength: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: route.delay,
              },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: route.delay },
              strokeDashoffset: {
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
                delay: route.delay,
              },
            }}
          />
        );
      })}

      {ROUTES.slice(0, 4).map((route, i) => {
        const from = cityById(route.from);
        const to = cityById(route.to);
        return (
          <motion.circle
            key={`shipment-${route.from}-${route.to}`}
            r={isCoverage ? (isDark ? 4.5 : 4) : isDark ? 3.5 : 3}
            fill={isDark ? "hsl(var(--primary))" : "hsl(355 70% 45%)"}
            className={isDark ? "opacity-90" : "opacity-70"}
            animate={{
              cx: [from.x, to.x, from.x],
              cy: [from.y, to.y, from.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 7 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: route.delay + 0.5,
            }}
          />
        );
      })}

      {CITIES.map((city, i) => {
        const isRed = city.color === "red";
        const isHovered = hoveredCity === city.id;
        const fill = isRed
          ? isDark
            ? "hsl(var(--primary))"
            : "hsl(355 72% 46%)"
          : isDark
            ? "hsl(152 65% 42%)"
            : "hsl(152 45% 38%)";
        const filter = isRed ? `url(#${uid}-glow-red)` : `url(#${uid}-glow-green)`;

        return (
          <g
            key={city.id}
            filter={filter}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredCity(city.id)}
            onMouseLeave={() => setHoveredCity(null)}
            onFocus={() => setHoveredCity(city.id)}
            onBlur={() => setHoveredCity(null)}
            role="button"
            tabIndex={0}
            aria-label={city.label}
          >
              <circle cx={city.x} cy={city.y} r={isCoverage ? 26 : 22} fill="transparent" />
              <title>{city.label}</title>
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={isCoverage ? 18 : 16}
              fill={fill}
              initial={{ opacity: 0.12 }}
              animate={{
                opacity: isHovered ? 0.4 : [0.12, 0.28, 0.12],
                scale: isHovered ? 1.4 : [1, 1.35, 1],
              }}
              transition={{
                duration: isHovered ? 0.2 : 3.2,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
                delay: isHovered ? 0 : i * 0.25,
              }}
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            />
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={isCoverage ? 6.5 : 5.5}
                fill={fill}
              animate={{ scale: isHovered ? 1.25 : [1, 1.15, 1] }}
              transition={{
                duration: isHovered ? 0.2 : 2.4,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
                delay: isHovered ? 0 : i * 0.2,
              }}
              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
            />
              <circle cx={city.x} cy={city.y} r={isCoverage ? 3 : 2.5} className="fill-white" />
          </g>
        );
      })}

      <AnimatePresence>
        {hoveredCity && (
          <CityTooltip
            key={hoveredCity}
            city={cityById(hoveredCity)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}

function HeroUsaMapInner({ variant = "hero" }: HeroUsaMapProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredCity, setHoveredCity] = useState<CityId | null>(null);
  const uid = useId().replace(/:/g, "");
  const isCoverage = variant === "coverage";

  if (isCoverage) {
    return (
      <div className="relative min-h-[500px] w-full md:min-h-[580px] lg:min-h-[620px]">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-colors duration-500",
            isDark
              ? "bg-[radial-gradient(ellipse_at_50%_42%,hsl(var(--primary)/0.18)_0%,transparent_62%)]"
              : "bg-[radial-gradient(ellipse_at_50%_42%,hsl(var(--primary)/0.08)_0%,transparent_65%)]",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-[4%] rounded-full blur-[70px] transition-colors duration-500",
            isDark ? "bg-primary/12" : "bg-primary/6",
          )}
        />

        <div className="absolute inset-x-0 top-0 bottom-[76px] z-10 flex items-center justify-center overflow-hidden px-1 sm:bottom-[84px] sm:px-2 md:bottom-[88px]">
          <UsaMapSvg
            isDark={isDark}
            uid={uid}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
            viewBox={MAP_VIEWBOX_COVERAGE}
            emphasis="coverage"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-stretch justify-center gap-2 border-t border-border bg-background/80 px-3 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-background/70 sm:gap-3 sm:px-5 sm:py-4 md:px-6">
          {COVERAGE_STATS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
              className="min-w-[140px] flex-1"
            >
              <GlassStatCard
                title={card.title}
                sub={card.sub}
                isDark={isDark}
                className="h-full text-center md:text-left"
              />
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-20 hidden flex-col gap-1.5 rounded-lg border border-border/80 bg-background/70 px-2.5 py-2 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm dark:border-white/10 dark:bg-background/60 sm:flex md:right-4 md:top-4 md:text-[10px]">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Primary hub
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Regional hub
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[480px] w-full flex-col overflow-visible sm:h-[540px] lg:h-[min(72vh,680px)] lg:min-h-[600px]">
      <div
        className={cn(
          "pointer-events-none absolute inset-[2%] rounded-full blur-[90px] transition-colors duration-500",
          isDark
            ? "bg-[radial-gradient(circle,hsl(var(--primary)/0.22)_0%,hsl(220_60%_18%/0.35)_45%,transparent_72%)]"
            : "bg-[radial-gradient(circle,hsl(var(--primary)/0.08)_0%,hsl(210_30%_92%/0.9)_50%,transparent_72%)]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500",
          isDark ? "opacity-40" : "opacity-70",
          "bg-[radial-gradient(ellipse_at_60%_40%,hsl(215_80%_45%/0.12),transparent_55%)]",
        )}
      />

      <div className="relative z-10 flex shrink-0 items-start justify-between gap-3 pb-1">
        {GLASS_CARDS_TOP.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
          >
            <GlassStatCard title={card.title} sub={card.sub} isDark={isDark} className="max-w-[176px]" />
          </motion.div>
        ))}
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-visible py-1">
        <div className="h-full w-full scale-[1.06] lg:scale-[1.1]">
          <UsaMapSvg
            isDark={isDark}
            uid={uid}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
          />
        </div>
      </div>

      <motion.div
        className="relative z-10 shrink-0 pt-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <GlassStatCard
          title={GLASS_CARD_BOTTOM.title}
          sub={GLASS_CARD_BOTTOM.sub}
          isDark={isDark}
          className="max-w-[176px]"
        />
      </motion.div>

      <motion.div
        className={cn(
          "pointer-events-none absolute bottom-[6%] right-[8%] h-16 w-16 rounded-full blur-2xl",
          isDark ? "bg-primary/20" : "bg-primary/10",
        )}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export const HeroUsaMap = memo(HeroUsaMapInner);
