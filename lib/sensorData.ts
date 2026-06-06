export type SensorKind = "water" | "humidity" | "temperature" | "light" | "ph";

export interface SensorReading {
  id: string;
  label: string;
  kind: SensorKind;
  position: [number, number, number];
  getValue: (ctx: Record<string, number>) => string;
  unit: string;
}

export const HOME_SENSORS: SensorReading[] = [
  {
    id: "s-water",
    label: "Niveau eau",
    kind: "water",
    position: [1.35, 2.95, -0.45],
    unit: "%",
    getValue: (ctx) => String(Math.round(ctx.water ?? 80)),
  },
  {
    id: "s-humidity",
    label: "Humidité substrat",
    kind: "humidity",
    position: [0, 1.2, -0.35],
    unit: "%",
    getValue: (ctx) => String(Math.round(55 + (ctx.water ?? 0) * 0.35)),
  },
  {
    id: "s-temp",
    label: "Température air",
    kind: "temperature",
    position: [-1.2, 1.8, -0.3],
    unit: "°C",
    getValue: (ctx) => String(Math.round(28 + (ctx.day ?? 0) * 0.08)),
  },
  {
    id: "s-light",
    label: "Luminosité",
    kind: "light",
    position: [0.8, 0.9, 0.2],
    unit: " lux",
    getValue: () => "12 400",
  },
  {
    id: "s-ph",
    label: "pH substrat",
    kind: "ph",
    position: [-1.6, 0.2, 0.35],
    unit: "",
    getValue: () => "6.4",
  },
];

export const TERRAIN_SENSORS: SensorReading[] = [
  {
    id: "t-water",
    label: "Cuve centrale",
    kind: "water",
    position: [0, 5.8, 0],
    unit: "%",
    getValue: (ctx) => String(Math.round(ctx.water ?? 85)),
  },
  {
    id: "t-temp-ne",
    label: "Temp. NE",
    kind: "temperature",
    position: [40, 2, 40],
    unit: "°C",
    getValue: (ctx) => String(Math.round(31 + (ctx.day ?? 0) * 0.05)),
  },
  {
    id: "t-hum-nw",
    label: "Humidité NW",
    kind: "humidity",
    position: [-40, 1.5, 40],
    unit: "%",
    getValue: (ctx) => String(Math.round(48 + (ctx.water ?? 0) * 0.4)),
  },
  {
    id: "t-light-se",
    label: "Luminosité SE",
    kind: "light",
    position: [40, 2, -40],
    unit: " lux",
    getValue: () => "18 200",
  },
  {
    id: "t-hum-sw",
    label: "Humidité SW",
    kind: "humidity",
    position: [-40, 1.5, -40],
    unit: "%",
    getValue: (ctx) => String(Math.round(52 + (ctx.water ?? 0) * 0.35)),
  },
  {
    id: "t-ph-center",
    label: "pH sol",
    kind: "ph",
    position: [15, 1, 15],
    unit: "",
    getValue: () => "6.2",
  },
];

export const GREENHOUSE_SENSORS: SensorReading[] = [
  {
    id: "gh-temp",
    label: "Temp. serre",
    kind: "temperature",
    position: [28, 2.5, 28],
    unit: "°C",
    getValue: () => "34",
  },
  {
    id: "gh-humidity",
    label: "Humidité serre",
    kind: "humidity",
    position: [32, 2, 32],
    unit: "%",
    getValue: () => "72",
  },
];

export const SENSOR_COLORS: Record<SensorKind, string> = {
  water: "#4A9BB5",
  humidity: "#2ECC71",
  temperature: "#E67E22",
  light: "#F1C40F",
  ph: "#9B59B6",
};
