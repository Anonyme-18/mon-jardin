/** Configuration du terrain — 1 hectare, kits ménage répétés */

import {
  FRAME_WIDTH,
  FRAME_HEIGHT,
  TOTAL_SLOTS,
  GRID_ROWS,
  GRID_COLS,
} from "@/lib/plantData";

export const HECTARE_SIZE = 100;
export const ROW_GAP = 0.3;

/** Dimensions d'un kit ménage (prototype cour) */
export const UNIT_WIDTH = FRAME_WIDTH;
export const UNIT_DEPTH = 0.85;

/** Rangées parallèles le long de Z, espacées le long de X */
export const ROW_PITCH = UNIT_DEPTH + ROW_GAP;
export const MODULE_PITCH = UNIT_WIDTH + ROW_GAP;

export const ROW_COUNT = Math.floor(HECTARE_SIZE / ROW_PITCH);
export const MODULES_PER_ROW = Math.floor(HECTARE_SIZE / MODULE_PITCH);

export const TOTAL_UNITS = ROW_COUNT * MODULES_PER_ROW;
export const FIELD_OFFSET = HECTARE_SIZE / 2;

export const DETAIL_RADIUS = 32;
export const DETAIL_RADIUS_SQ = DETAIL_RADIUS * DETAIL_RADIUS;

export const TANK = {
  radius: 2.8,
  height: 5.5,
  position: [0, 0, 0] as [number, number, number],
};

export const COLORS = {
  soil: "#B8956A",
  soilDark: "#8B6914",
  wood: "#8B7355",
  pot: "#2C1810",
  plant: "#27AE60",
  tank: "#1B5E3B",
  tankLight: "#27AE60",
  pipe: "#E8E8E8",
  pipeGreen: "#2E7D52",
  sky: "#87CEEB",
  fog: "#E8DFD0",
};

export interface UnitCell {
  key: string;
  row: number;
  module: number;
  x: number;
  z: number;
  seed: number;
}

export function getUnitPosition(row: number, module: number): [number, number, number] {
  const x = -FIELD_OFFSET + UNIT_DEPTH / 2 + row * ROW_PITCH;
  const z =
    -FIELD_OFFSET +
    UNIT_WIDTH / 2 +
    module * MODULE_PITCH +
    (HECTARE_SIZE - MODULES_PER_ROW * MODULE_PITCH) / 2;
  return [x, 0, z];
}

export function buildUnitGrid(): UnitCell[] {
  const cells: UnitCell[] = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let mod = 0; mod < MODULES_PER_ROW; mod++) {
      const [x, , z] = getUnitPosition(row, mod);
      cells.push({
        key: `${row}-${mod}`,
        row,
        module: mod,
        x,
        z,
        seed: row * MODULES_PER_ROW + mod,
      });
    }
  }
  return cells;
}

export const ALL_UNITS = buildUnitGrid();

export function estimatePlantCount(): number {
  return TOTAL_UNITS * TOTAL_SLOTS;
}

export function estimateYieldKg(): number {
  return Math.round(TOTAL_UNITS * 12 * 0.15 * 4);
}

/** @deprecated use getUnitPosition */
export function getRowX(index: number): number {
  return getUnitPosition(index, 0)[0];
}

export const SEGMENTS_PER_ROW = MODULES_PER_ROW;
export const TIERS = GRID_ROWS;

export const TOTAL_KITS = TOTAL_UNITS;
export const GREENHOUSE_AREA = 768;
export const GREENHOUSE_CYCLE_REDUCTION = 0.12;
