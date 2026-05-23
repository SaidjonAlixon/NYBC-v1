import { memo, useEffect, useMemo, useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usaMap from "@svg-maps/usa";
import { useTheme } from "@/hooks/useTheme";

type MapLocation = { id: string; name: string; path: string };
import { cn } from "@/lib/utils";
import {
  CITIES,
  ROUTES,
  ROTATING_HUBS,
  GLASS_CARDS_TOP,
  GLASS_CARD_BOTTOM,
  COVERAGE_STATS,
  cityById,
  routePath,
  MAP_VIEWBOX,
  MAP_VIEWBOX_COVERAGE,
  type CityId,
  type RotatingHub,
} from "./hero-map-data";

const CONTINENTAL_IDS = new Set([
  "al", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "id", "il", "in", "ia",
  "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv",
  "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd",
  "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy", "dc",
]);

type HeroUsaMapProps = {
  variant?: "hero" | "hero-panel" | "hero-immersive" | "coverage";
};

function CityTooltip({
  city,
  isDark,
  x: px,
  y: py,
}: {
  city: (typeof CITIES)[0];
  isDark: boolean;
  x?: number;
  y?: number;
}) {
  const label = city.label.toUpperCase();
  const w = label.length * 6.2 + 20;
  const h = 24;
  const cx = px ?? city.x;
  const cy = py ?? city.y;
  const x = cx - w / 2;
  const y = cy - 44;

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
        x={cx}
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

function hubFill(color: "red" | "green", isDark: boolean) {
  return color === "red"
    ? isDark
      ? "hsl(var(--primary))"
      : "hsl(355 72% 46%)"
    : isDark
      ? "hsl(152 65% 42%)"
      : "hsl(152 45% 38%)";
}

function BlinkingHubMarker({
  hub,
  index,
  isDark,
  uid,
  isHovered,
  onHover,
}: {
  hub: RotatingHub;
  index: number;
  isDark: boolean;
  uid: string;
  isHovered: boolean;
  onHover: (active: boolean, cityId: CityId) => void;
}) {
  const [cityIndex, setCityIndex] = useState(index % hub.sequence.length);
  const [lit, setLit] = useState(index % 3 !== 1);

  const city = cityById(hub.sequence[cityIndex]);
  const fill = hubFill(hub.color, isDark);
  const filter =
    hub.color === "red" ? `url(#${uid}-glow-red)` : `url(#${uid}-glow-green)`;
  const visible = lit || isHovered;
  const onMs = 2000 + index * 260;
  const offMs = 950 + index * 110;

  useEffect(() => {
    if (isHovered) return;

    if (lit) {
      const timer = window.setTimeout(() => setLit(false), onMs);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setCityIndex((i) => (i + 1) % hub.sequence.length);
      setLit(true);
    }, offMs);

    return () => window.clearTimeout(timer);
  }, [lit, isHovered, onMs, offMs, hub.sequence.length]);

  return (
    <g
      filter={visible ? filter : undefined}
      className="cursor-pointer"
      onMouseEnter={() => onHover(true, hub.sequence[cityIndex])}
      onMouseLeave={() => onHover(false, hub.sequence[cityIndex])}
      onFocus={() => onHover(true, hub.sequence[cityIndex])}
      onBlur={() => onHover(false, hub.sequence[cityIndex])}
      role="button"
      tabIndex={0}
      aria-label={city.label}
    >
      <circle cx={city.x} cy={city.y} r={22} fill="transparent" />
      <title>{city.label}</title>
      <motion.g
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.55,
        }}
        transition={{ duration: 0.38, ease: "easeOut" }}
        style={{ transformOrigin: `${city.x}px ${city.y}px` }}
      >
        <motion.circle
          cx={city.x}
          cy={city.y}
          r={20}
          fill={fill}
          animate={
            visible && !isHovered
              ? { opacity: [0.35, 0.6, 0.35], scale: [1, 1.18, 1] }
              : { opacity: isHovered ? 0.65 : 0.5, scale: isHovered ? 1.15 : 1 }
          }
          transition={
            visible && !isHovered
              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
        <motion.circle
          cx={city.x}
          cy={city.y}
          r={6.5}
          fill={fill}
          stroke={isDark ? "hsl(0 0% 100% / 0.35)" : "hsl(0 0% 100% / 0.9)"}
          strokeWidth={1.25}
        />
        <circle cx={city.x} cy={city.y} r={3} className="fill-white" />
      </motion.g>
    </g>
  );
}

function UsaMapSvg({
  isDark,
  uid,
  hoveredCity,
  setHoveredCity,
  hoveredHubId,
  setHoveredHubId,
  hoveredHubCity,
  setHoveredHubCity,
  viewBox = MAP_VIEWBOX,
  emphasis = "hero",
}: {
  isDark: boolean;
  uid: string;
  hoveredCity: CityId | null;
  setHoveredCity: (id: CityId | null) => void;
  hoveredHubId?: string | null;
  setHoveredHubId?: (id: string | null) => void;
  hoveredHubCity?: CityId | null;
  setHoveredHubCity?: (id: CityId | null) => void;
  viewBox?: string;
  emphasis?: "hero" | "coverage" | "immersive";
}) {
  const isImmersive = emphasis === "immersive";
  const isCoverage = emphasis === "coverage";
  const isMapBold = isCoverage || isImmersive;
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
      preserveAspectRatio={
        emphasis === "coverage" || emphasis === "immersive" ? "xMidYMid slice" : "xMidYMid meet"
      }
    >
      <defs>
        <filter id={`${uid}-glow-red`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isImmersive ? 5 : isCoverage ? 5 : 4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-glow-green`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isImmersive ? 4 : 3} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`${uid}-route-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor={isDark ? "hsl(var(--primary))" : "hsl(355 75% 48%)"}
            stopOpacity={isDark ? 0.95 : isImmersive ? 0.72 : 0.55}
          />
          <stop
            offset="100%"
            stopColor={isDark ? "hsl(215 90% 60%)" : "hsl(215 40% 55%)"}
            stopOpacity={isDark ? 0.55 : isImmersive ? 0.5 : 0.35}
          />
        </linearGradient>
      </defs>

      <g
        className={cn(
          "transition-[fill,stroke] duration-500",
          isDark
            ? isImmersive
              ? "[&_path]:fill-[hsl(222_47%_16%/0.58)]"
              : isCoverage
                ? "[&_path]:fill-[hsl(222_47%_11%/0.72)]"
                : "[&_path]:fill-[hsl(222_47%_9%/0.55)]"
            : isImmersive
              ? "[&_path]:fill-[hsl(210_18%_86%/0.82)]"
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
                ? isImmersive
                  ? "stroke-white/40 hover:stroke-white/55"
                  : isCoverage
                    ? "stroke-white/25 hover:stroke-white/40"
                    : "stroke-white/[0.14] hover:stroke-white/25"
                : isImmersive
                  ? "stroke-slate-500/90 hover:stroke-slate-600"
                  : isCoverage
                    ? "stroke-slate-400/95 hover:stroke-slate-500"
                    : "stroke-slate-300/90 hover:stroke-slate-400",
            )}
            strokeWidth={isImmersive ? 1.5 : isCoverage ? 1.35 : 1}
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
            strokeWidth={
              isImmersive ? (isDark ? 2.25 : 1.85) : isCoverage ? (isDark ? 1.75 : 1.4) : isDark ? 1.25 : 1
            }
            strokeLinecap="round"
            strokeDasharray={isMapBold ? "5 8" : "6 10"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0.15, 1, 0.15],
              opacity: isDark
                ? isImmersive
                  ? [0.45, 0.9, 0.45]
                  : isCoverage
                    ? [0.35, 0.85, 0.35]
                    : [0.25, 0.65, 0.25]
                : isImmersive
                  ? [0.5, 0.88, 0.5]
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

      {ROUTES.slice(0, isImmersive ? 6 : 4).map((route, i) => {
        const from = cityById(route.from);
        const to = cityById(route.to);
        return (
          <motion.circle
            key={`shipment-${route.from}-${route.to}`}
            r={isImmersive ? (isDark ? 4 : 3.5) : isCoverage ? (isDark ? 4.5 : 4) : isDark ? 3.5 : 3}
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

      {isImmersive
        ? ROTATING_HUBS.map((hub, i) => (
            <BlinkingHubMarker
              key={hub.id}
              hub={hub}
              index={i}
              isDark={isDark}
              uid={uid}
              isHovered={hoveredHubId === hub.id}
              onHover={(active, cityId) => {
                setHoveredHubId?.(active ? hub.id : null);
                setHoveredHubCity?.(active ? cityId : null);
              }}
            />
          ))
        : CITIES.map((city, i) => {
            const isRed = city.color === "red";
            const isHovered = hoveredCity === city.id;
            const fill = hubFill(city.color, isDark);
            const filter = isRed ? `url(#${uid}-glow-red)` : `url(#${uid}-glow-green)`;
            const pulseR = isCoverage ? 20 : 16;
            const coreR = isCoverage ? 7.5 : 5.5;
            const hitR = isCoverage ? 28 : 22;

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
                <circle cx={city.x} cy={city.y} r={hitR} fill="transparent" />
                <title>{city.label}</title>
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={pulseR}
                  fill={fill}
                  initial={{ opacity: 0.18 }}
                  animate={{
                    opacity: isHovered ? 0.5 : [0.18, 0.35, 0.18],
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
                  r={coreR}
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
                <circle cx={city.x} cy={city.y} r={isCoverage ? 3.5 : 2.5} className="fill-white" />
              </g>
            );
          })}

      <AnimatePresence>
        {isImmersive && hoveredHubCity ? (
          <CityTooltip
            key={hoveredHubCity}
            city={cityById(hoveredHubCity)}
            isDark={isDark}
          />
        ) : hoveredCity ? (
          <CityTooltip
            key={hoveredCity}
            city={cityById(hoveredCity)}
            isDark={isDark}
          />
        ) : null}
      </AnimatePresence>
    </svg>
  );
}

function HeroUsaMapInner({ variant = "hero" }: HeroUsaMapProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredCity, setHoveredCity] = useState<CityId | null>(null);
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);
  const [hoveredHubCity, setHoveredHubCity] = useState<CityId | null>(null);
  const uid = useId().replace(/:/g, "");
  const isCoverage = variant === "coverage";
  const isHeroPanel = variant === "hero-panel";
  const isHeroImmersive = variant === "hero-immersive";

  if (isHeroImmersive) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-auto absolute left-1/2 top-[46%] h-[min(88vh,860px)] w-[min(145vw,1500px)] max-w-none -translate-x-1/2 -translate-y-1/2",
            "sm:h-[min(92vh,920px)] sm:w-[min(150vw,1600px)]",
          )}
        >
          <UsaMapSvg
            isDark={isDark}
            uid={uid}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
            hoveredHubId={hoveredHubId}
            setHoveredHubId={setHoveredHubId}
            hoveredHubCity={hoveredHubCity}
            setHoveredHubCity={setHoveredHubCity}
            emphasis="immersive"
          />
        </div>
      </div>
    );
  }

  if (isHeroPanel) {
    return (
      <div className="relative h-full min-h-[280px] w-full sm:min-h-[340px] lg:min-h-[400px]">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] transition-colors duration-500",
            isDark
              ? "bg-[radial-gradient(ellipse_at_55%_45%,hsl(var(--primary)/0.2)_0%,transparent_58%)]"
              : "bg-[radial-gradient(ellipse_at_55%_45%,hsl(var(--primary)/0.1)_0%,transparent_60%)]",
          )}
        />
        <div className="relative z-10 flex h-full items-center justify-center p-2 sm:p-4">
          <div className="h-full w-full max-h-[420px] scale-[1.04] lg:scale-[1.08]">
            <UsaMapSvg
              isDark={isDark}
              uid={uid}
              hoveredCity={hoveredCity}
              setHoveredCity={setHoveredCity}
              emphasis="coverage"
            />
          </div>
        </div>
      </div>
    );
  }

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
