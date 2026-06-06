export type PlantType =
  | "tomate"
  | "piment"
  | "laitue"
  | "oignon"
  | "chou"
  | "herbes";

export interface PlantConfig {
  emoji: string;
  label: string;
  cycleDays: number;
  yieldKg: number;
  color: string;
}

export const PLANTS: Record<PlantType, PlantConfig> = {
  tomate: {
    emoji: "🍅",
    label: "Tomate",
    cycleDays: 55,
    yieldKg: 2.8,
    color: "#E74C3C",
  },
  piment: {
    emoji: "🌶",
    label: "Piment",
    cycleDays: 60,
    yieldKg: 0.6,
    color: "#E67E22",
  },
  laitue: {
    emoji: "🥬",
    label: "Laitue",
    cycleDays: 45,
    yieldKg: 1.5,
    color: "#27AE60",
  },
  oignon: {
    emoji: "🧅",
    label: "Oignon",
    cycleDays: 50,
    yieldKg: 1.8,
    color: "#F39C12",
  },
  chou: {
    emoji: "🥦",
    label: "Chou",
    cycleDays: 55,
    yieldKg: 2.0,
    color: "#2ECC71",
  },
  herbes: {
    emoji: "🌿",
    label: "Herbes",
    cycleDays: 30,
    yieldKg: 0.8,
    color: "#1ABC9C",
  },
};

export const PLANT_TYPES = Object.keys(PLANTS) as PlantType[];

export const TOTAL_SLOTS = 24;
export const GRID_ROWS = 4;
export const GRID_COLS = 6;
export const ROW_HEIGHTS = [0.6, 1.2, 1.8, 2.4] as const;
export const FRAME_WIDTH = 3;
export const FRAME_HEIGHT = 2.5;

export const FCFA_PER_KG = 650;

export function getSlotPosition(index: number): [number, number, number] {
  const row = Math.floor(index / GRID_COLS);
  const col = index % GRID_COLS;
  const x =
    -FRAME_WIDTH / 2 + 0.3 + (col * (FRAME_WIDTH - 0.6)) / (GRID_COLS - 1);
  const y = ROW_HEIGHTS[row] - 0.1;
  const z = -0.35;
  return [x, y, z];
}

export function getGrowthProgress(
  plantedDay: number | null,
  plantType: PlantType | null,
  currentDay: number
): number {
  if (plantedDay === null || !plantType) return 0;
  const cycle = PLANTS[plantType].cycleDays;
  return Math.min(1, Math.max(0, (currentDay - plantedDay) / cycle));
}

export function getPhaseLabel(progress: number): string {
  if (progress <= 0) return "Germination";
  if (progress < 0.35) return "Germination";
  if (progress < 0.65) return "Croissance";
  if (progress < 1) return "Floraison";
  return "Récolte !";
}
