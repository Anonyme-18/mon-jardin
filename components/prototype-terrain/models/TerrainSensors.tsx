"use client";

import { useMemo } from "react";
import { SensorNodes } from "@/components/prototype/shared/SensorNodes";
import {
  TERRAIN_SENSORS,
  GREENHOUSE_SENSORS,
} from "@/lib/sensorData";
import { GREENHOUSE_CYCLE_REDUCTION } from "@/lib/terrainData";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";

export function TerrainSensors() {
  const showSensors = useTerrainSimulation((s) => s.showSensors);
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const waterLevel = useTerrainSimulation((s) => s.waterLevel);
  const day = useTerrainSimulation((s) => s.day);

  const sensors = useMemo(
    () =>
      showGreenhouse
        ? [...TERRAIN_SENSORS, ...GREENHOUSE_SENSORS]
        : TERRAIN_SENSORS,
    [showGreenhouse]
  );

  const ghHumidityBoost =
    showGreenhouse && showSensors ? 15 : showGreenhouse ? 10 : 0;

  return (
    <SensorNodes
      sensors={sensors}
      active={showSensors}
      context={{
        water: waterLevel,
        day,
        ghHumidityBoost,
        ghCycleReduction: showGreenhouse ? GREENHOUSE_CYCLE_REDUCTION : 0,
      }}
      htmlDistanceFactor={45}
      nodeScale={0.35}
    />
  );
}
