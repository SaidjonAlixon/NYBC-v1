export type CityId =
  | "new-york"
  | "chicago"
  | "dallas"
  | "miami"
  | "los-angeles"
  | "atlanta"
  | "seattle"
  | "denver";

export type CityNode = {
  id: CityId;
  label: string;
  x: number;
  y: number;
  color: "red" | "green";
};

/** Continental US crop with padding — hero */
export const MAP_VIEWBOX = "275 22 970 558";

/** Tighter crop — coverage card fills width */
export const MAP_VIEWBOX_COVERAGE = "318 42 892 498";

/** City coords from state path anchors on the SVG map */
export const CITIES: CityNode[] = [
  { id: "new-york", label: "New York", x: 1080, y: 155, color: "red" },
  { id: "chicago", label: "Chicago", x: 905, y: 225, color: "green" },
  { id: "dallas", label: "Dallas", x: 792, y: 425, color: "red" },
  { id: "miami", label: "Miami", x: 1065, y: 495, color: "green" },
  { id: "los-angeles", label: "Los Angeles", x: 355, y: 355, color: "red" },
  { id: "atlanta", label: "Atlanta", x: 1025, y: 415, color: "green" },
  { id: "seattle", label: "Seattle", x: 448, y: 108, color: "green" },
  { id: "denver", label: "Denver", x: 662, y: 275, color: "red" },
];

export const ROUTES: { from: CityId; to: CityId; delay: number }[] = [
  { from: "new-york", to: "chicago", delay: 0 },
  { from: "chicago", to: "dallas", delay: 0.4 },
  { from: "dallas", to: "los-angeles", delay: 0.8 },
  { from: "miami", to: "atlanta", delay: 0.2 },
  { from: "seattle", to: "denver", delay: 0.6 },
  { from: "denver", to: "chicago", delay: 1 },
];

export const GLASS_CARDS_TOP = [
  { title: "99.8% On-Time", sub: "Industry-leading reliability" },
  { title: "24/7 Dispatch", sub: "Live fleet coordination" },
] as const;

export const GLASS_CARD_BOTTOM = {
  title: "Nationwide Coverage",
  sub: "48-state freight network",
} as const;

export const COVERAGE_STATS = [
  { title: "48 States", sub: "Continental freight coverage" },
  { title: "8 Major Hubs", sub: "NY · CHI · DAL · MIA · LA · ATL · SEA · DEN" },
  { title: "Live Lanes", sub: "Animated route monitoring" },
] as const;

export function cityById(id: CityId) {
  return CITIES.find((c) => c.id === id)!;
}

export function routePath(from: CityNode, to: CityNode) {
  const mx = (from.x + to.x) / 2;
  const my = Math.min(from.y, to.y) - 40;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}
