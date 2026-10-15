// Generated from Natural Earth (public domain): relief maps in public/images/home/map-*.webp.
// Coordinates are in each map image's pixels. Pins mark the estate's town (approximate).

export type MapPanel = {
  src: string;
  width: number;
  height: number;
  pins: Record<string, [number, number]>;
  labels: { text: string; xy: [number, number] }[];
};

export const EUROPE_MAP: MapPanel = {
  src: "/images/home/map-europe.webp",
  width: 1502,
  height: 990,
  pins: {
    "Château de la Grave": [355.2, 356.4],
    "Viticultores de Lapuebla": [223.7, 585.5],
    "Bodegas Heras Cordón": [224.3, 588],
    "Ferrero Federico": [923.9, 388],
    "Corte Moschina": [1128.7, 316.8],
    Pasetti: [1298.3, 607],
    Zaccagnini: [1303.2, 610.4],
  },
  labels: [
    { text: "France", xy: [548.4, 189] },
    { text: "Spain", xy: [156.7, 810] },
    { text: "Italy", xy: [1149, 513] },
  ],
};

export const SOUTH_AFRICA_MAP: MapPanel = {
  src: "/images/home/map-south-africa.webp",
  width: 923,
  height: 780,
  pins: {
    "Stellenrust Family Vineyards": [150.9, 716],
  },
  labels: [{ text: "South Africa", xy: [453.5, 432] }],
};
